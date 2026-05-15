import aboutImage from '../assets/infinity-pool-ocean-view.jpg'
import articleOneImage from '../assets/dolphin-watching-watamu.jpg'
import articleTwoImage from '../assets/coastal-swahili-dishes.webp'
import coastalImage from '../assets/1bedroom-coastal-haven-suite-preview.JPEG'
import contactImage from '../assets/infinity-pool-ocean-view.jpg'
import galleryImage from '../assets/arielview1.jpg'
import homeImage from '../assets/outside-view2.jpeg'
import penthouseImage from '../assets/penthouse-suite-view-from-outside.jpg'
import chiaraImage from '../assets/suite-chiara-outside-terrace-lounge-chairs-with-view.jpeg'
import luciaImage from '../assets/suite-lucia-hero-page-section-background-image.jpeg'
import romaImage from '../assets/suite-roma-kitchen-with-decor-wall-view.jpeg'
import serenityImage from '../assets/serenity-villa-tv-and-kitchen-view.JPEG'
import { SUITE_ROUTES } from '../constants/suiteRoutes'

export const SITE_URL = 'https://dumasuites.com'

export function getRouteSeo(pathname, t, lang) {
  const locales = {
    en: 'en_GB',
    it: 'it_IT',
    de: 'de_DE',
    fr: 'fr_FR',
    es: 'es_ES',
  }

  const defaultMeta = {
    title: `Duma Suites | ${t.hero.eyebrow}`,
    description: t.hero.subtitle,
    image: homeImage,
    type: 'website',
    robots: 'index, follow',
    keywords: 'Duma Suites, Watamu hotel, luxury suites Watamu, boutique accommodation Kenya, beach suites Watamu',
    schema: 'lodging',
    locale: locales[lang] || locales.en,
  }

  const routeMap = {
    '/': defaultMeta,
    '/suites': {
      title: `${t.suites.all.heroTitle} | Duma Suites`,
      description: t.suites.all.heroSub,
      image: homeImage,
      type: 'website',
      keywords: 'Watamu suites, luxury apartments Watamu, family suites Kenya, penthouse Watamu, Duma Suites accommodation',
      schema: 'collection',
    },
    [SUITE_ROUTES.ANNA]: {
      title: t.suites.coastal.metaTitle,
      description: t.suites.coastal.metaDesc,
      image: coastalImage,
      type: 'website',
      keywords: 'Duma Suite Anna, 1 bedroom suite Watamu, luxury couple suite Watamu, pool view suite Kenya',
      schema: 'suite',
      canonicalPath: SUITE_ROUTES.ANNA,
    },
    [SUITE_ROUTES.ALICE]: {
      title: t.suites.serenity.metaTitle,
      description: t.suites.serenity.metaDesc,
      image: serenityImage,
      type: 'website',
      keywords: 'Duma Suite Alice, 3 bedroom suite Watamu, family luxury suite Watamu, terrace suite Kenya',
      schema: 'suite',
      canonicalPath: SUITE_ROUTES.ALICE,
    },
    [SUITE_ROUTES.SOFIA]: {
      title: t.suites.penthouse.metaTitle,
      description: t.suites.penthouse.metaDesc,
      image: penthouseImage,
      type: 'website',
      keywords: 'Duma Penthouse Sofia, luxury penthouse Watamu, sea view penthouse Kenya, rooftop terrace suite',
      schema: 'suite',
      canonicalPath: SUITE_ROUTES.SOFIA,
    },
    [SUITE_ROUTES.CHIARA]: {
      title: t.suites.chiara.metaTitle,
      description: t.suites.chiara.metaDesc,
      image: chiaraImage,
      type: 'website',
      keywords: 'Duma Penthouse Chiara, Watamu penthouse suite, luxury sea view suite Kenya, 3 bedroom penthouse',
      schema: 'suite',
      canonicalPath: SUITE_ROUTES.CHIARA,
    },
    [SUITE_ROUTES.LUCIA]: {
      title: t.suites.lucia.metaTitle,
      description: t.suites.lucia.metaDesc,
      image: luciaImage,
      type: 'website',
      keywords: 'Duma Suite Lucia, 2 bedroom suite Watamu, sea facing suite Kenya, luxury coastal stay',
      schema: 'suite',
      canonicalPath: SUITE_ROUTES.LUCIA,
    },
    [SUITE_ROUTES.ROMA]: {
      title: t.suites.roma.metaTitle,
      description: t.suites.roma.metaDesc,
      image: romaImage,
      type: 'website',
      keywords: 'Duma Suite Momme, 2 bedroom luxury suite Watamu, architectural suite Kenya, terrace suite Watamu',
      schema: 'suite',
      canonicalPath: SUITE_ROUTES.ROMA,
    },
    '/duma-suite-roma': {
      title: t.suites.roma.metaTitle,
      description: t.suites.roma.metaDesc,
      image: romaImage,
      type: 'website',
      schema: 'suite',
      canonicalPath: SUITE_ROUTES.ROMA,
    },
    '/suites/coastal-haven': {
      title: t.suites.coastal.metaTitle,
      description: t.suites.coastal.metaDesc,
      image: coastalImage,
      type: 'website',
      schema: 'suite',
      canonicalPath: SUITE_ROUTES.ANNA,
    },
    '/suites/serenity-villa': {
      title: t.suites.serenity.metaTitle,
      description: t.suites.serenity.metaDesc,
      image: serenityImage,
      type: 'website',
      schema: 'suite',
      canonicalPath: SUITE_ROUTES.ALICE,
    },
    '/suites/penthouse-suite-1-sofia': {
      title: t.suites.penthouse.metaTitle,
      description: t.suites.penthouse.metaDesc,
      image: penthouseImage,
      type: 'website',
      schema: 'suite',
      canonicalPath: SUITE_ROUTES.SOFIA,
    },
    '/suites/penthouse-suite-2-chiara': {
      title: t.suites.chiara.metaTitle,
      description: t.suites.chiara.metaDesc,
      image: chiaraImage,
      type: 'website',
      schema: 'suite',
      canonicalPath: SUITE_ROUTES.CHIARA,
    },
    '/suites/suite-lucia': {
      title: t.suites.lucia.metaTitle,
      description: t.suites.lucia.metaDesc,
      image: luciaImage,
      type: 'website',
      schema: 'suite',
      canonicalPath: SUITE_ROUTES.LUCIA,
    },
    '/suites/suite-roma': {
      title: t.suites.roma.metaTitle,
      description: t.suites.roma.metaDesc,
      image: romaImage,
      type: 'website',
      schema: 'suite',
      canonicalPath: SUITE_ROUTES.ROMA,
    },
    '/suite-chiara': {
      title: t.suites.chiara.metaTitle,
      description: t.suites.chiara.metaDesc,
      image: chiaraImage,
      type: 'website',
      schema: 'suite',
      canonicalPath: SUITE_ROUTES.CHIARA,
    },
    '/suite-lucia': {
      title: t.suites.lucia.metaTitle,
      description: t.suites.lucia.metaDesc,
      image: luciaImage,
      type: 'website',
      schema: 'suite',
      canonicalPath: SUITE_ROUTES.LUCIA,
    },
    '/suite-roma': {
      title: t.suites.roma.metaTitle,
      description: t.suites.roma.metaDesc,
      image: romaImage,
      type: 'website',
      schema: 'suite',
      canonicalPath: SUITE_ROUTES.ROMA,
    },
    '/gallery': {
      title: `${t.gallery.title} | Duma Suites`,
      description: t.gallery.sub,
      image: galleryImage,
      type: 'website',
      keywords: 'Duma Suites gallery, Watamu resort photos, luxury suite images, beachfront accommodation Kenya',
      schema: 'collection',
    },
    '/about': {
      title: `${t.about.title} | Duma Suites`,
      description: t.about.intro,
      image: aboutImage,
      type: 'website',
      keywords: 'about Duma Suites, Watamu boutique hotel, luxury accommodation Kenya coast',
      schema: 'webpage',
    },
    '/blog': {
      title: t.blog.metaTitle,
      description: t.blog.metaDesc,
      image: aboutImage,
      type: 'website',
      keywords: 'Watamu travel guide, Duma Suites blog, Kenya coast activities, Watamu tips',
      schema: 'collection',
    },
    '/blog/top-5-activities-watamu': {
      title: t.article1.metaTitle,
      description: t.article1.metaDesc,
      image: articleOneImage,
      type: 'article',
      schema: 'article',
    },
    '/blog/coastal-swahili-dishes': {
      title: t.article2.metaTitle,
      description: t.article2.metaDesc,
      image: articleTwoImage,
      type: 'article',
      schema: 'article',
    },
    '/contact': {
      title: `${t.contact.title} | Duma Suites`,
      description: t.contact.sub,
      image: contactImage,
      type: 'website',
      keywords: 'book Duma Suites, Watamu accommodation reservations, contact Duma Suites, Kenya coast stay',
      schema: 'contact',
    },
    '/house-rules': {
      title: `${t.houseRules.title} | Duma Suites`,
      description: t.houseRules.subtitle,
      image: aboutImage,
      type: 'website',
      keywords: 'Duma Suites house rules, Watamu hotel policy',
      schema: 'webpage',
    },
    '/privacy-policy': {
      title: t.privacyPolicy.metaTitle,
      description: t.privacyPolicy.heroSub,
      image: aboutImage,
      type: 'website',
      keywords: 'Duma Suites privacy policy, Watamu accommodation privacy',
      schema: 'webpage',
    },
    '/terms-of-service': {
      title: t.termsOfService.metaTitle,
      description: t.termsOfService.heroSub,
      image: aboutImage,
      type: 'website',
      keywords: 'Duma Suites terms of service, booking terms Watamu',
      schema: 'webpage',
    },
    '/cookies': {
      title: t.cookies.metaTitle,
      description: t.cookies.metaDesc,
      image: aboutImage,
      type: 'website',
      keywords: 'Duma Suites cookie policy, Watamu website cookies',
      schema: 'webpage',
    },
  }

  return {
    ...defaultMeta,
    ...routeMap[pathname],
    locale: locales[lang] || locales.en,
  }
}
