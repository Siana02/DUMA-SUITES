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
