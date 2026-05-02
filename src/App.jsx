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

// Hero images — imported at 1920 w WebP (the largest variant served to desktop) so
// the preload step warms the exact same cache entries the hero slideshow will consume.
import aerialImg      from './assets/arielview1.jpg?w=1920&format=webp&quality=90'
import outsideView2   from './assets/outside-view2.jpeg?w=1920&format=webp&quality=90'
import upViewImg      from './assets/up-view.jpg?w=1920&format=webp&quality=90'
import outsideViewImg from './assets/outside-view.jpg?w=1920&format=webp&quality=90'
import logoImg        from './assets/logo.jpeg'

const PRELOAD_IMAGES = [aerialImg, outsideView2, upViewImg, outsideViewImg, logoImg]

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
