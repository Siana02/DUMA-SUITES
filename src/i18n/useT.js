import { useLanguage } from '../context/LanguageContext.jsx'
import { getT } from './translations.js'

/**
 * Returns the current translation object. Re-renders automatically when
 * the active language changes OR when an async locale file finishes loading
 * (de/fr/es) — because useContext subscribes to the full context value,
 * including translationVersion, ensuring all consumers always display the
 * correct language.
 */
export function useT() {
  const { lang } = useLanguage()
  return getT(lang)
}
