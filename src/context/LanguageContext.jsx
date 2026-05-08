import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { SUPPORTED_LANGUAGES, loadTranslations, normalizeLanguage } from '../i18n/translations.js'

const getInitialLang = () => normalizeLanguage(localStorage.getItem('duma-lang') || 'en')

export const LanguageContext = createContext({
  lang: 'en',
  setLanguage: () => {},
  toggleLang: () => {},
  languages: SUPPORTED_LANGUAGES,
})

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)

  useEffect(() => {
    let active = true
    loadTranslations(lang)
      .then(() => {})
      .catch(async () => {
        await loadTranslations('en')
        if (active) {
          setLang('en')
        }
      })
    return () => {
      active = false
    }
  }, [lang])

  const setLanguage = useCallback(
    async (nextLang) => {
      const normalized = normalizeLanguage(nextLang)
      if (normalized === lang) return
      try {
        await loadTranslations(normalized)
        localStorage.setItem('duma-lang', normalized)
        setLang(normalized)
      } catch {
        await loadTranslations('en')
        localStorage.setItem('duma-lang', 'en')
        setLang('en')
      }
    },
    [lang],
  )

  const toggleLang = useCallback(() => {
    const idx = SUPPORTED_LANGUAGES.indexOf(lang)
    const next = SUPPORTED_LANGUAGES[(idx + 1) % SUPPORTED_LANGUAGES.length]
    setLanguage(next)
  }, [lang, setLanguage])

  const value = useMemo(
    () => ({ lang, setLanguage, toggleLang, languages: SUPPORTED_LANGUAGES }),
    [lang, setLanguage, toggleLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => useContext(LanguageContext)
