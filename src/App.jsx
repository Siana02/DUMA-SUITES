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

// Hero images — imported as high-quality WebP (matching HeroSection) so the preload
// warms the exact same cache entries the slideshow will consume.
import aerialImg      from './assets/arielview1.jpg?format=webp&quality=98'
import outsideView2   from './assets/outside-view2.jpeg?format=webp&quality=98'
import upViewImg      from './assets/up-view.jpg?format=webp&quality=98'
import outsideViewImg from './assets/outside-view.jpg?format=webp&quality=98'

// The logo is imported directly inside PreloadScreen where it is displayed.
const PRELOAD_IMAGES = [aerialImg, outsideView2, upViewImg, outsideViewImg]

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
        <HeroSection ready={preloadDone} />
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
