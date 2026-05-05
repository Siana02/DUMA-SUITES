import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PreloadScreen from './components/PreloadScreen'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AllSuitesPage from './pages/AllSuitesPage'
import CoastalHavenPage from './pages/CoastalHavenPage'
import SerenityVillaPage from './pages/SerenityVillaPage'
import GalleryPage from './pages/GalleryPage'
import HouseRulesPage from './pages/HouseRulesPage'
import AboutPage from './pages/AboutPage'
import BlogPage from './pages/BlogPage'
import Article1Page from './pages/Article1Page'
import Article2Page from './pages/Article2Page'
import ContactPage from './pages/ContactPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsOfServicePage from './pages/TermsOfServicePage'

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
      <Helmet>
        <title>Duma Suites | Luxury Coastal Living in Watamu</title>
        <meta
          name="description"
          content="Duma Suites – Luxury Coastal Living in Watamu. Nestled in the heart of Watamu within the prestigious Ghepard Towers, offering an exceptional blend of modern elegance, comfort, and prime coastal living."
        />
      </Helmet>

      {!preloadDone && (
        <PreloadScreen
          onComplete={() => setPreloadDone(true)}
          images={PRELOAD_IMAGES}
        />
      )}

      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage ready={preloadDone} />} />
        <Route path="/suites" element={<AllSuitesPage />} />
        <Route path="/suites/coastal-haven" element={<CoastalHavenPage />} />
        <Route path="/suites/serenity-villa" element={<SerenityVillaPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/house-rules" element={<HouseRulesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/top-5-activities-watamu" element={<Article1Page />} />
        <Route path="/blog/coastal-swahili-dishes" element={<Article2Page />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
