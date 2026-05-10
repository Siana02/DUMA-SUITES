export const ALL_SUITES_ROUTE = '/suites'

export const SUITE_ROUTES = Object.freeze({
  ANNA: '/suites/coastal-haven',
  ALICE: '/suites/serenity-villa',
  SOFIA: '/suites/penthouse-suite-1-sofia',
  CHIARA: '/suites/penthouse-suite-2-chiara',
  LUCIA: '/suites/suite-lucia',
  ROMA: '/suites/suite-roma',
})

export const SUITE_ROUTE_ORDER = Object.freeze([
  SUITE_ROUTES.SOFIA,
  SUITE_ROUTES.ANNA,
  SUITE_ROUTES.ALICE,
  SUITE_ROUTES.CHIARA,
  SUITE_ROUTES.LUCIA,
  SUITE_ROUTES.ROMA,
])

export const SUITE_NAV_ORDER = Object.freeze([
  SUITE_ROUTES.ANNA,
  SUITE_ROUTES.ALICE,
  SUITE_ROUTES.SOFIA,
  SUITE_ROUTES.CHIARA,
  SUITE_ROUTES.LUCIA,
  SUITE_ROUTES.ROMA,
  ALL_SUITES_ROUTE,
])
