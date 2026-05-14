const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xykoavab'

function buildContactMessage({ name, email, telephone = '', message }) {
  return [
    `Name: ${name}`,
    `Email: ${email}`,
    `Telephone: ${telephone || 'N/A'}`,
    '',
    'Message:',
    message,
  ].join('\n')
}

export async function submitContactForm({ name, email, telephone = '', message }) {
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    throw new Error('Name, email, and message are required')
  }

  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      message: buildContactMessage({ name, email, telephone, message }),
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Form submission failed with status ${response.status}${errorText ? `: ${errorText}` : ''}`)
  }
}

export { FORMSPREE_ENDPOINT }
