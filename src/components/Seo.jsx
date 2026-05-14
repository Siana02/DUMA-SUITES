import { Helmet } from 'react-helmet-async'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useT } from '../i18n/useT.js'
import { getRouteSeo, SITE_URL } from '../seo/getRouteSeo.js'

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

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Duma Suites',
        description: 'Luxury suites and penthouses in Watamu, Kenya.',
        inLanguage: lang,
      },
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: meta.title,
        description: meta.description,
        inLanguage: lang,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        primaryImageOfPage: { '@type': 'ImageObject', url: image },
      },
      meta.schema === 'article'
        ? {
            '@type': 'Article',
            headline: meta.title,
            description: meta.description,
            image: [image],
            mainEntityOfPage: canonical,
            inLanguage: lang,
            publisher: {
              '@type': 'Organization',
              name: 'Duma Suites',
              url: SITE_URL,
            },
          }
        : {
            '@type': 'LodgingBusiness',
            name: 'Duma Suites',
            description: meta.description,
            url: canonical,
            image,
            email: 'reservations@dumasuites.com',
            telephone: '+254710933025',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Ghepard Towers',
              addressLocality: 'Watamu',
              addressRegion: 'Kilifi County',
              addressCountry: 'KE',
            },
          },
    ],
  }

  return (
    <Helmet>
      <html lang={lang} />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="robots" content={meta.robots} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={meta.type} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
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
