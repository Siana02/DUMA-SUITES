export const ALL_SUITES_ROUTE = '/suites'

export const SUITE_ROUTES = Object.freeze({
  ANNA: '/duma-suite-anna',
  ALICE: '/duma-suite-alice',
  SOFIA: '/duma-penthouse-sofia',
  CHIARA: '/duma-penthouse-chiara',
  LUCIA: '/duma-suite-lucia',
  ROMA: '/duma-suite-roma',
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
