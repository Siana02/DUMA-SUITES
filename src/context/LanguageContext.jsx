import { createContext, useContext, useState } from 'react'

export const LanguageContext = createContext({ lang: 'en', toggleLang: () => {} })

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('duma-lang') || 'en')
  const toggleLang = () =>
    setLang(l => {
      const n = l === 'en' ? 'it' : 'en'
      localStorage.setItem('duma-lang', n)
      return n
    })
  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
