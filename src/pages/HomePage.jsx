import HeroSection from '../components/HeroSection'
import GMMessageSection from '../components/GMMessageSection'
import SuiteHighlightsSection from '../components/SuiteHighlightsSection'
import SuitesPreviewSection from '../components/SuitesPreviewSection'
import GalleryStripSection from '../components/GalleryStripSection'
import AboutSection from '../components/AboutSection'
import VideoStripSection from '../components/VideoStripSection'
import FAQSection from '../components/FAQSection'
import ReviewsSection from '../components/ReviewsSection'
import ArticlesSection from '../components/ArticlesSection'
import ExcursionsSection from '../components/ExcursionsSection'
import ContactSection from '../components/ContactSection'
import CTASection from '../components/CTASection'

export default function HomePage({ ready }) {
  return (
    <main id="main-content">
      <HeroSection ready={ready} />
      <GMMessageSection />
      <SuiteHighlightsSection />
      <SuitesPreviewSection />
      <GalleryStripSection />
      <AboutSection />
      <VideoStripSection />
      <FAQSection />
      <ReviewsSection />
      <ArticlesSection />
      <ExcursionsSection />
      <ContactSection />
      <CTASection />
    </main>
  )
}
