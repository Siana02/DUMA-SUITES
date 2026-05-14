const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xykoavab'
const FORM_SUBMISSION_ERROR_MESSAGE = 'Message failed to send. Please try again.'

function formatFormspreeMessage({ name, email, telephone = '', message }) {
  return `
Name: ${name}
Email: ${email}
Telephone: ${telephone || 'N/A'}

Message:
${message}
  `
}

function normalizeSubmissionInput({ name, email, telephone = '', message }) {
  return {
    name: name?.trim() || '',
    email: email?.trim() || '',
    telephone: telephone?.trim() || '',
    message: message?.trim() || '',
  }
}

function createFormspreePayload({ name, email, telephone, message }) {
  return {
    email,
    message: formatFormspreeMessage({ name, email, telephone, message }),
  }
}

export async function submitContactForm({ name, email, telephone = '', message, honeypot = '' } = {}) {
  if (honeypot?.trim()) {
    throw new Error(FORM_SUBMISSION_ERROR_MESSAGE)
  }

  const normalizedForm = normalizeSubmissionInput({ name, email, telephone, message })
  if (!normalizedForm.name || !normalizedForm.email || !normalizedForm.message) {
    throw new Error(FORM_SUBMISSION_ERROR_MESSAGE)
  }

  console.log('Submitting form to Formspree...')
  console.log({
    name: normalizedForm.name,
    email: normalizedForm.email,
    telephone: normalizedForm.telephone,
    message: normalizedForm.message,
  })

  const payload = createFormspreePayload(normalizedForm)

  let response
  try {
    response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
  } catch (error) {
    console.error('Formspree submission failed', error)
    window.alert(FORM_SUBMISSION_ERROR_MESSAGE)
    throw new Error(FORM_SUBMISSION_ERROR_MESSAGE, { cause: error })
  }

  if (!response.ok) {
    let responsePayload
    try {
      responsePayload = await response.json()
    } catch {
      responsePayload = { status: response.status, statusText: response.statusText }
    }
    console.error('Formspree submission failed', responsePayload)
    window.alert(FORM_SUBMISSION_ERROR_MESSAGE)
    throw new Error(FORM_SUBMISSION_ERROR_MESSAGE)
  }

  console.log('Formspree submission successful')
}

export function createContactFormSubmitHandler({ form, setIsSubmitting, setSubmitError, setSubmitted }) {
  return async e => {
    e.preventDefault()
    setSubmitError('')
    setIsSubmitting(true)

    try {
      await submitContactForm({
        name: form.name,
        email: form.email,
        telephone: form.phone,
        message: form.message,
        honeypot: form.website,
      })
      setSubmitted(true)
    } catch (error) {
      setSubmitError(error?.message || FORM_SUBMISSION_ERROR_MESSAGE)
    } finally {
      setIsSubmitting(false)
    }
  }
}

export { FORMSPREE_ENDPOINT, FORM_SUBMISSION_ERROR_MESSAGE }

export function getFormSubmissionErrorMessage(error, fallbackMessage) {
  if (!error) return fallbackMessage
  return error?.message || fallbackMessage
}
