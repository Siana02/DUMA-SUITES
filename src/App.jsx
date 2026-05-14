import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import PreloadScreen from './components/PreloadScreen'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import PwaInstallPrompt from './components/PwaInstallPrompt'
import Seo from './components/Seo'
import HomePage from './pages/HomePage'
import AllSuitesPage from './pages/AllSuitesPage'
import CoastalHavenPage from './pages/CoastalHavenPage'
import SerenityVillaPage from './pages/SerenityVillaPage'
import PenthouseSuiteSofiaPage from './pages/PenthouseSuiteSofia'
import SuiteChiaraPage from './pages/SuiteChiaraPage'
import SuiteLuciaPage from './pages/SuiteLuciaPage'
import SuiteRomaPage from './pages/SuiteRomaPage'
import GalleryPage from './pages/GalleryPage'
import HouseRulesPage from './pages/HouseRulesPage'
import AboutPage from './pages/AboutPage'
import BlogPage from './pages/BlogPage'
import Article1Page from './pages/Article1Page'
import Article2Page from './pages/Article2Page'
import ContactPage from './pages/ContactPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsOfServicePage from './pages/TermsOfServicePage'
import CookiesPage from './pages/CookiesPage'
import { ALL_SUITES_ROUTE, SUITE_ROUTES } from './constants/suiteRoutes'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

// Hero cinematic sequence images — preloaded so the slideshow is seamless
import heroImg1 from './assets/arielview1.jpg?w=1920&format=webp&quality=90'
import heroImg2 from './assets/outside-view2.jpeg?w=1920&format=webp&quality=90'
import heroImg3 from './assets/up-view.jpg?w=1920&format=webp&quality=90'
import heroImg4 from './assets/outside-view.jpg?w=1920&format=webp&quality=90'

const PRELOAD_IMAGES = [heroImg1, heroImg2, heroImg3, heroImg4]

function App() {
  const [preloadDone, setPreloadDone] = useState(false)

  return (
    <>
      <Seo />

      {!preloadDone && (
        <PreloadScreen
          onComplete={() => setPreloadDone(true)}
          images={PRELOAD_IMAGES}
        />
      )}

      <ScrollToTop />
      <Navbar />
      <PwaInstallPrompt preloadDone={preloadDone} />

      <Routes>
        <Route path="/" element={<HomePage ready={preloadDone} />} />
        <Route path={ALL_SUITES_ROUTE} element={<AllSuitesPage />} />
        <Route path={SUITE_ROUTES.ANNA} element={<CoastalHavenPage />} />
        <Route path={SUITE_ROUTES.ALICE} element={<SerenityVillaPage />} />
        <Route path={SUITE_ROUTES.SOFIA} element={<PenthouseSuiteSofiaPage />} />
        <Route path={SUITE_ROUTES.CHIARA} element={<SuiteChiaraPage />} />
        <Route path={SUITE_ROUTES.LUCIA} element={<SuiteLuciaPage />} />
        <Route path={SUITE_ROUTES.ROMA} element={<SuiteRomaPage />} />
        <Route path="/suites/coastal-haven" element={<Navigate to={SUITE_ROUTES.ANNA} replace />} />
        <Route path="/suites/serenity-villa" element={<Navigate to={SUITE_ROUTES.ALICE} replace />} />
        <Route path="/suites/penthouse-suite-1-sofia" element={<Navigate to={SUITE_ROUTES.SOFIA} replace />} />
        <Route path="/suites/penthouse-suite-2-chiara" element={<Navigate to={SUITE_ROUTES.CHIARA} replace />} />
        <Route path="/suites/suite-lucia" element={<Navigate to={SUITE_ROUTES.LUCIA} replace />} />
        <Route path="/suites/suite-roma" element={<Navigate to={SUITE_ROUTES.ROMA} replace />} />
        <Route path="/suite-chiara" element={<Navigate to={SUITE_ROUTES.CHIARA} replace />} />
        <Route path="/suite-lucia" element={<Navigate to={SUITE_ROUTES.LUCIA} replace />} />
        <Route path="/suite-roma" element={<Navigate to={SUITE_ROUTES.ROMA} replace />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/house-rules" element={<HouseRulesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/top-5-activities-watamu" element={<Article1Page />} />
        <Route path="/blog/coastal-swahili-dishes" element={<Article2Page />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/cookies" element={<CookiesPage />} />
      </Routes>

      <Footer />
      <CookieBanner preloadDone={preloadDone} />
    </>
  )
}

export default App
