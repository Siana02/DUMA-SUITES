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
    throw new Error('Form submission failed')
  }
}

export { FORMSPREE_ENDPOINT }
