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
      schema: 'collection',
    },
    '/suites/coastal-haven': {
      title: t.suites.coastal.metaTitle,
      description: t.suites.coastal.metaDesc,
      image: coastalImage,
      type: 'website',
      schema: 'suite',
    },
    '/suites/serenity-villa': {
      title: t.suites.serenity.metaTitle,
      description: t.suites.serenity.metaDesc,
      image: serenityImage,
      type: 'website',
      schema: 'suite',
    },
    '/suites/penthouse-suite-1-sofia': {
      title: t.suites.penthouse.metaTitle,
      description: t.suites.penthouse.metaDesc,
      image: penthouseImage,
      type: 'website',
      schema: 'suite',
    },
    '/suites/penthouse-suite-2-chiara': {
      title: t.suites.chiara.metaTitle,
      description: t.suites.chiara.metaDesc,
      image: chiaraImage,
      type: 'website',
      schema: 'suite',
    },
    '/suites/suite-lucia': {
      title: t.suites.lucia.metaTitle,
      description: t.suites.lucia.metaDesc,
      image: luciaImage,
      type: 'website',
      schema: 'suite',
    },
    '/suites/suite-roma': {
      title: t.suites.roma.metaTitle,
      description: t.suites.roma.metaDesc,
      image: romaImage,
      type: 'website',
      schema: 'suite',
    },
    '/gallery': {
      title: `${t.gallery.title} | Duma Suites`,
      description: t.gallery.sub,
      image: galleryImage,
      type: 'website',
      schema: 'collection',
    },
    '/about': {
      title: `${t.about.title} | Duma Suites`,
      description: t.about.intro,
      image: aboutImage,
      type: 'website',
      schema: 'webpage',
    },
    '/blog': {
      title: t.blog.metaTitle,
      description: t.blog.metaDesc,
      image: aboutImage,
      type: 'website',
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
      schema: 'contact',
    },
    '/house-rules': {
      title: `${t.houseRules.title} | Duma Suites`,
      description: t.houseRules.subtitle,
      image: aboutImage,
      type: 'website',
      schema: 'webpage',
      robots: 'noindex, follow',
    },
    '/privacy-policy': {
      title: t.privacyPolicy.metaTitle,
      description: t.privacyPolicy.heroSub,
      image: aboutImage,
      type: 'website',
      schema: 'webpage',
      robots: 'noindex, follow',
    },
    '/terms-of-service': {
      title: t.termsOfService.metaTitle,
      description: t.termsOfService.heroSub,
      image: aboutImage,
      type: 'website',
      schema: 'webpage',
      robots: 'noindex, follow',
    },
    '/cookies': {
      title: t.cookies.metaTitle,
      description: t.cookies.metaDesc,
      image: aboutImage,
      type: 'website',
      schema: 'webpage',
      robots: 'noindex, follow',
    },
  }

  return {
    ...defaultMeta,
    ...routeMap[pathname],
    locale: locales[lang] || locales.en,
  }
}
