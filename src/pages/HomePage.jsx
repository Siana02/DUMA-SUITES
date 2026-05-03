import HeroSection from '../components/HeroSection'
import GMMessageSection from '../components/GMMessageSection'
import SuiteHighlightsSection from '../components/SuiteHighlightsSection'
import SuitesPreviewSection from '../components/SuitesPreviewSection'
import AmenitiesSection from '../components/AmenitiesSection'
import ReviewsSection from '../components/ReviewsSection'
import CTASection from '../components/CTASection'

export default function HomePage({ ready }) {
  return (
    <main id="main-content">
      <HeroSection ready={ready} />
      <GMMessageSection />
      <SuiteHighlightsSection />
      <SuitesPreviewSection />
      <AmenitiesSection />
      <ReviewsSection />
      <CTASection />
    </main>
  )
}
