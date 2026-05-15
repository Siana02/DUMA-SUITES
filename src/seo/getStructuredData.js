import { SITE_URL, getRouteSeo } from './getRouteSeo.js'
import { SUITE_ROUTES } from '../constants/suiteRoutes.js'

const HOTEL_AGGREGATE_RATING = null

const SUITE_SCHEMA_BY_ROUTE = {
  [SUITE_ROUTES.ANNA]: {
    name: 'Duma Suite Anna',
    bedrooms: 1,
    maxGuests: 2,
    sizeSqm: 70,
    features: ['Balcony', 'Sea view', 'Pool view'],
  },
  [SUITE_ROUTES.ALICE]: {
    name: 'Duma Suite Alice',
    bedrooms: 3,
    maxGuests: 6,
    sizeSqm: 135,
    features: ['Terrace', 'Balcony', 'Garden view'],
  },
  [SUITE_ROUTES.SOFIA]: {
    name: 'Duma Penthouse Sofia',
    bedrooms: 3,
    maxGuests: 6,
    sizeSqm: 150,
    features: ['Rooftop terrace', 'Balcony', 'Sea view'],
  },
  [SUITE_ROUTES.CHIARA]: {
    name: 'Duma Penthouse Chiara',
    bedrooms: 3,
    maxGuests: 6,
    sizeSqm: 135,
    features: ['Terrace', 'Balcony', 'Sea view'],
  },
  [SUITE_ROUTES.LUCIA]: {
    name: 'Duma Suite Lucia',
    bedrooms: 2,
    maxGuests: 4,
    sizeSqm: 100,
    features: ['Terrace', 'Balcony', 'Sea view'],
  },
  [SUITE_ROUTES.ROMA]: {
    name: 'Duma Suite Momme',
    bedrooms: 2,
    maxGuests: 4,
    sizeSqm: 120,
    features: ['Terrace', 'Balcony', 'Sea view'],
  },
}

function toAbsoluteUrl(value) {
  return new URL(value, SITE_URL).toString()
}

function getHotelSchema(imageUrls) {
  return {
    '@type': 'Hotel',
    '@id': `${SITE_URL}/#hotel`,
    name: 'Duma Suites',
    description: 'Luxury boutique suites in Watamu',
    url: SITE_URL,
    image: imageUrls,
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Watamu',
      addressRegion: 'Kilifi County',
      addressCountry: 'KE',
    },
    location: {
      '@type': 'Place',
      name: 'Watamu, Kenya',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Watamu',
        addressCountry: 'KE',
      },
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'reservations',
      email: 'reservations@dumasuites.com',
    },
    ...(HOTEL_AGGREGATE_RATING ? { aggregateRating: HOTEL_AGGREGATE_RATING } : {}),
  }
}

function getSuiteSchema(pathname, canonical, meta) {
  const route = meta.canonicalPath || pathname
  const suite = SUITE_SCHEMA_BY_ROUTE[route]
  if (!suite) return null

  return {
    '@type': 'HotelRoom',
    '@id': `${canonical}#hotel-room`,
    name: suite.name,
    description: meta.description,
    url: canonical,
    image: [toAbsoluteUrl(meta.image)],
    isPartOf: { '@id': `${SITE_URL}/#hotel` },
    numberOfBedrooms: {
      '@type': 'QuantitativeValue',
      value: suite.bedrooms,
    },
    occupancy: {
      '@type': 'QuantitativeValue',
      maxValue: suite.maxGuests,
    },
    floorSize: {
      '@type': 'QuantitativeValue',
      value: suite.sizeSqm,
      unitCode: 'MTK',
    },
    amenityFeature: suite.features.map((feature) => ({
      '@type': 'LocationFeatureSpecification',
      name: feature,
      value: true,
    })),
  }
}

export function getStructuredData({ pathname, canonical, lang, t }) {
  const meta = getRouteSeo(pathname, t, lang)
  const defaultImage = toAbsoluteUrl(meta.image)

  const imageUrls = Array.from(new Set([
    defaultImage,
    ...Object.values(SUITE_ROUTES).map((route) => toAbsoluteUrl(getRouteSeo(route, t, lang).image)),
  ]))

  const suiteSchema = getSuiteSchema(pathname, canonical, meta)

  return {
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
      getHotelSchema(imageUrls),
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: meta.title,
        description: meta.description,
        inLanguage: lang,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        primaryImageOfPage: { '@type': 'ImageObject', url: defaultImage },
      },
      meta.schema === 'article'
        ? {
            '@type': 'Article',
            headline: meta.title,
            description: meta.description,
            image: [defaultImage],
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
            image: defaultImage,
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
      ...(suiteSchema ? [suiteSchema] : []),
    ],
  }
}
