const DEFAULT_FORMSPREE_ENDPOINT = 'https://formspree.io/f/xykoavab'
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim() || DEFAULT_FORMSPREE_ENDPOINT
const REQUEST_TIMEOUT_MS = 12000

function getRequestSignal(signal) {
  if (typeof AbortSignal?.timeout !== 'function') {
    return signal
  }
  const timeoutSignal = AbortSignal.timeout(REQUEST_TIMEOUT_MS)
  if (signal && typeof AbortSignal?.any === 'function') {
    return AbortSignal.any([signal, timeoutSignal])
  }
  return signal || timeoutSignal
}

function normalizePayload({ name, email, telephone = '', message }) {
  return {
    name: name.trim(),
    email: email.trim(),
    telephone: telephone.trim(),
    message: message.trim(),
    _replyto: email.trim(),
    _subject: `Website enquiry from ${name.trim()}`,
  }
}

async function parseFormspreeError(response) {
  const responseType = response.headers.get('content-type') || ''
  const isJson = responseType.includes('application/json')
  const body = isJson ? await response.json().catch(() => null) : await response.text().catch(() => '')
  const errors = Array.isArray(body?.errors) ? body.errors : []
  const messageFromErrors = errors.map(({ field, message }) => (field ? `${field}: ${message}` : message)).join('; ')
  const message = messageFromErrors || body?.error || body?.message || (typeof body === 'string' ? body : '')
  return {
    status: response.status,
    requestId: response.headers.get('x-request-id') || '',
    message: message || `Form submission failed with status ${response.status}`,
  }
}

async function submitJson(payload, signal) {
  return fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    signal: getRequestSignal(signal),
  })
}

async function submitUrlEncoded(payload, signal) {
  const form = new URLSearchParams()
  Object.entries(payload).forEach(([key, value]) => {
    form.set(key, value)
  })
  return fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: form.toString(),
    signal: getRequestSignal(signal),
  })
}

function mapTransportError(error) {
  if (error?.name === 'AbortError') {
    const timeoutError = new Error('Form request timed out')
    timeoutError.diagnosticCode = 'request_timeout'
    return timeoutError
  }
  const networkError = new Error('Network error while contacting Formspree')
  networkError.diagnosticCode = 'network_unreachable'
  return networkError
}

export async function submitContactForm({ name, email, telephone = '', message, honeypot = '', signal } = {}) {
  if (honeypot?.trim()) {
    const spamError = new Error('Blocked by anti-spam honeypot')
    spamError.diagnosticCode = 'spam_blocked'
    throw spamError
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    const validationError = new Error('Name, email, and message are required')
    validationError.diagnosticCode = 'validation_failed'
    throw validationError
  }

  const payload = normalizePayload({ name, email, telephone, message })

  let response
  let firstTransportError
  try {
    response = await submitJson(payload, signal)
  } catch (error) {
    firstTransportError = mapTransportError(error)
  }

  if (!response || (!response.ok && [400, 415, 422].includes(response.status))) {
    try {
      response = await submitUrlEncoded(payload, signal)
    } catch (error) {
      throw firstTransportError || mapTransportError(error)
    }
  }

  if (!response.ok) {
    const errorDetails = await parseFormspreeError(response)
    const error = new Error(errorDetails.message)
    error.status = errorDetails.status
    error.requestId = errorDetails.requestId
    error.diagnosticCode = 'formspree_rejected'
    throw error
  }

  return {
    status: response.status,
    requestId: response.headers.get('x-request-id') || '',
  }
}

export function getFormSubmissionErrorMessage(error, fallbackMessage) {
  if (!error) return fallbackMessage

  if (error.diagnosticCode === 'spam_blocked') {
    return 'Submission blocked by anti-spam checks.'
  }
  if (error.diagnosticCode === 'network_unreachable') {
    return `${fallbackMessage} (Network cannot reach Formspree endpoint.)`
  }
  if (error.diagnosticCode === 'request_timeout') {
    return `${fallbackMessage} (Form submission timed out.)`
  }
  if (error.status === 422 || error.status === 400) {
    return `${fallbackMessage} (Formspree rejected the payload. Check required fields in dashboard.)`
  }
  if (error.status === 429) {
    return `${fallbackMessage} (Rate limited by Formspree; try again shortly.)`
  }
  if (error.status === 401 || error.status === 403 || error.status === 404) {
    return `${fallbackMessage} (Form endpoint not accepted. Verify Form ID and activation in Formspree dashboard.)`
  }

  return fallbackMessage
}

export { FORMSPREE_ENDPOINT }
