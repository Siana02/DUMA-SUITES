import { createContext, useContext, useEffect, useState } from 'react'
import i18n from '../i18n/i18n.js'
import { setDynamicTranslation } from '../i18n/translations.js'

const SUPPORTED_LANGUAGES = ['en', 'it', 'de', 'fr', 'es']

const getSupportedLanguage = (value) => {
  if (!value || typeof value !== 'string') return null
  const base = value.toLowerCase().split('-')[0]
  return SUPPORTED_LANGUAGES.includes(base) ? base : null
}

const getInitialLanguage = () => {
  const saved = getSupportedLanguage(localStorage.getItem('duma-lang'))
  if (saved) return saved

  const detected =
    getSupportedLanguage(navigator.language) ||
    navigator.languages?.map(getSupportedLanguage).find(Boolean)

  return detected || 'en'
}

export const LanguageContext = createContext({
  lang: 'en',
  setLanguage: () => {},
  supportedLanguages: SUPPORTED_LANGUAGES,
})

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const initialLang = getInitialLanguage()
    i18n.changeLanguage(initialLang)
    return initialLang
  })
  const [translationVersion, setTranslationVersion] = useState(0)

  useEffect(() => {
    if (lang === 'en' || lang === 'it') return
    let canceled = false

    fetch(`/locales/${lang}/translation.json`)
      .then((response) => (response.ok ? response.json() : null))
      .then((dynamicTranslation) => {
        if (!dynamicTranslation || canceled) return
        setDynamicTranslation(lang, dynamicTranslation)
        setTranslationVersion((v) => v + 1)
      })
      .catch((error) => {
        console.warn(`Failed to load locale file for "${lang}"`, error)
      })

    return () => {
      canceled = true
    }
  }, [lang])

  const setLanguage = (nextLang) => {
    const targetLang = SUPPORTED_LANGUAGES.includes(nextLang) ? nextLang : 'en'
    localStorage.setItem('duma-lang', targetLang)
    i18n.changeLanguage(targetLang)
    setLang(targetLang)
  }

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLanguage,
        supportedLanguages: SUPPORTED_LANGUAGES,
        translationVersion,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
