import enFallback from '../../locales/en/translation.json'

export const SUPPORTED_LANGUAGES = ['en', 'it', 'de', 'fr', 'es']

const loaders = {
  en: () => import('../../locales/en/translation.json'),
  it: () => import('../../locales/it/translation.json'),
  de: () => import('../../locales/de/translation.json'),
  fr: () => import('../../locales/fr/translation.json'),
  es: () => import('../../locales/es/translation.json'),
}

const cache = { en: enFallback }

export const normalizeLanguage = (lang) =>
  SUPPORTED_LANGUAGES.includes(lang) ? lang : 'en'

export async function loadTranslations(lang) {
  const normalized = normalizeLanguage(lang)
  if (!cache[normalized]) {
    const mod = await loaders[normalized]()
    cache[normalized] = mod.default
  }
  return cache[normalized]
}

export function getT(lang) {
  const normalized = normalizeLanguage(lang)
  return cache[normalized] || cache.en
}
