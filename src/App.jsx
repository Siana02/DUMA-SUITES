import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import PreloadScreen from './components/PreloadScreen'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import GMMessageSection from './components/GMMessageSection'
import SuitesSection from './components/SuitesSection'
import AmenitiesSection from './components/AmenitiesSection'
import ReviewsSection from './components/ReviewsSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

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
        <PreloadScreen onComplete={() => setPreloadDone(true)} />
      )}

      <Navbar />

      <main id="main-content">
        <HeroSection />
        <GMMessageSection />
        <SuitesSection />
        <AmenitiesSection />
        <ReviewsSection />
        <CTASection />
      </main>

      <Footer />
    </>
  )
}

export default App
