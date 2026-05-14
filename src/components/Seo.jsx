import { Helmet } from 'react-helmet-async'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useT } from '../i18n/useT.js'
import { getRouteSeo, SITE_URL } from '../seo/getRouteSeo.js'
import { getStructuredData } from '../seo/getStructuredData.js'

function toAbsoluteUrl(value) {
  return new URL(value, SITE_URL).toString()
}

export default function Seo() {
  const location = useLocation()
  const { lang } = useLanguage()
  const t = useT()

  const meta = useMemo(
    () => getRouteSeo(location.pathname, t, lang),
    [lang, location.pathname, t],
  )

  const canonical = toAbsoluteUrl(meta.canonicalPath || location.pathname)
  const image = toAbsoluteUrl(meta.image)
  const alternateLocales = ['en_GB', 'it_IT', 'de_DE', 'fr_FR', 'es_ES'].filter((locale) => locale !== meta.locale)

  const structuredData = getStructuredData({
    pathname: location.pathname,
    canonical,
    lang,
    t,
  })

  return (
    <Helmet>
      <html lang={lang} />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      <meta name="robots" content={meta.robots} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={meta.type} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={meta.title} />
      <meta property="og:site_name" content="Duma Suites" />
      <meta property="og:locale" content={meta.locale} />
      {alternateLocales.map((locale) => (
        <meta key={locale} property="og:locale:alternate" content={locale} />
      ))}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={image} />

      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  )
}
