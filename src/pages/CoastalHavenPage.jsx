import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Maximize2, BedDouble, Users, Check, Mail, MessageCircle,
  Wifi, Tv, Bath, Waves, Utensils, Calendar, Clock, CreditCard,
  Shield, AirVent, Sparkles, Sofa, Sunrise, UtensilsCrossed,
  Shirt, Fan, PawPrint, Cigarette, ArrowLeft, ArrowRight, TowelRack,
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { getT } from '../i18n/translations.js'

import heroImg from '../assets/1bedroom-coastal-haven-suite-preview.JPEG'
import serenityPreview from '../assets/serenity-villa-3bedroomsuite-preview.JPEG'
import gm2Img from '../assets/General-managers2.jpg'
import cheetahIcon from '../assets/cheetah.png'
import serenityPreviewImg from '../assets/serenity-villa-tv-and-kitchen-view.JPEG'
import penthousePreviewImg from '../assets/penthouse-suite-view-from-outside.jpg'

// Gallery images — ordered: beds → kitchen/lounge → outdoor/views → entrance → closet → bathroom
import g1  from '../assets/coastal-haven-suite-kingsize-bed.JPEG'
import g2  from '../assets/coastal-haven-suite-kingsize-bed-sideview.JPEG'
import g3  from '../assets/coastal-haven-suite-kingsize-bed-sideview2.JPEG'
import g4  from '../assets/coastal-haven-suite-bedroom-interior.JPEG'
import g5  from '../assets/coastal-haven-suite-breakfast-counter.JPEG'
import g6  from '../assets/coastal-haven-suite-kitchenette.JPEG'
import g7  from '../assets/coastal-haven-suite-kitchenette-lounge-area.JPEG'
import g8  from '../assets/coastal-haven-suite-lounge-couch.JPEG'
import g9  from '../assets/coastal-haven-suite-lounge-couch-upclose.JPEG'
import g10 from '../assets/coastal-haven-suite-lounge-tv-area-upclose.JPEG'
import g11 from '../assets/coastal-haven-suite-outdoor-view.JPEG'
import g12 from '../assets/coastal-haven-outside-chair.JPEG'
import g13 from '../assets/coastal-haven-suite-outside-room-view.JPEG'
import g14 from '../assets/coastal-haven-suite-nighttime-poolview.JPEG'
import g15 from '../assets/coastal-haven-suite-entrance-from-inside-view.JPEG'
import g16 from '../assets/coastal-haven-suite-kitchen-to-bedroom-door-view.JPEG'
import g17 from '../assets/coastal-haven-suite-closet-area.JPEG'
import g18 from '../assets/coastal-haven-suite-shower.JPEG'
import g19 from '../assets/coastal-haven-suite-washroom.JPEG'

const GALLERY = [g1,g2,g3,g4,g5,g6,g7,g8,g9,g10,g11,g12,g13,g14,g15,g16,g17,g18,g19]
const DEFAULT_IMAGE_WIDTH = 352 // 340px image + 12px gap, used as scroll-step fallback
const GALLERY_LABELS = [
  'King bed','King bed side view','King bed side view 2','Bedroom interior',
  'Breakfast counter','Kitchenette','Kitchenette lounge area',
  'Lounge couch','Lounge couch close-up','TV area close-up',
  'Outdoor view','Outside chair','Outside room view','Night pool view',
  'Entrance from inside','Kitchen to bedroom door','Closet area',
  'Shower','Washroom',
]

const AMENITY_ICONS = [
  BedDouble, Bath, UtensilsCrossed, Sofa, Sunrise, Waves,
  Wifi, Sparkles, AirVent, Tv, Utensils, Shirt,
  ({ size, strokeWidth, className }) => <span className={className} style={{ fontSize: size, lineHeight: 1 }}>⛱</span>,
  TowelRack,
  Fan,
]

const POLICY_ICONS = [Clock, Clock, Calendar, CreditCard, Shield, PawPrint, Cigarette]

const TOUR_VIDEO_BASE =
  'https://player.vimeo.com/video/1190451724' +
  '?badge=0&autopause=0&player_id=0&app_id=58479' +
  '&byline=0&title=0&portrait=0&dnt=1&playsinline=1'

// Vimeo requires a brief delay after iframe load before it can receive postMessage listeners
const VIMEO_IFRAME_READY_DELAY = 500

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] },
  }
}

export default function CoastalHavenPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const navigate = useNavigate()
  const { lang } = useLanguage()
  const t = getT(lang)
  const tc = t.suites.coastal
  const ts = t.suites.serenity

  // Video play/pause logic — plays on hover and when fully in view
  const tourIframeRef = useRef(null)
  const tourHasPlayedRef = useRef(false)
  const tourIsHoveredRef = useRef(false)
  const tourInViewRef = useRef(false)
  const [tourVideoSrc, setTourVideoSrc] = useState(TOUR_VIDEO_BASE)

  // threshold: 0.85 — treat video as "fully in view" when 85% is visible
  const { ref: tourRef, inView: tourInView } = useInView({ threshold: 0.85 })

  const postTour = useCallback((method, value) => {
    const msg = value !== undefined ? { method, value } : { method }
    tourIframeRef.current?.contentWindow?.postMessage(
      JSON.stringify(msg), 'https://player.vimeo.com'
    )
  }, [])

  const tryPlayTour = useCallback(() => {
    if (!tourHasPlayedRef.current) {
      tourHasPlayedRef.current = true
      setTourVideoSrc(`${TOUR_VIDEO_BASE}&autoplay=1`)
    } else {
      postTour('play')
    }
  }, [postTour])

  useEffect(() => {
    tourInViewRef.current = tourInView
    if (tourInView) {
      tryPlayTour()
    } else if (tourHasPlayedRef.current && !tourIsHoveredRef.current) {
      postTour('pause')
    }
  }, [tourInView, tryPlayTour, postTour])

  const handleTourMouseEnter = useCallback(() => {
    tourIsHoveredRef.current = true
    tryPlayTour()
  }, [tryPlayTour])

  const handleTourMouseLeave = useCallback(() => {
    tourIsHoveredRef.current = false
    if (!tourInViewRef.current) {
      postTour('pause')
    }
  }, [postTour])

  // When the video ends → reset to start so the end screen never shows
  useEffect(() => {
    const onMsg = (e) => {
      if (e.origin !== 'https://player.vimeo.com') return
      if (e.source !== tourIframeRef.current?.contentWindow) return
      try {
        const data = JSON.parse(e.data)
        if (data.event === 'finish') {
          const win = tourIframeRef.current?.contentWindow
          if (!win) return
          win.postMessage(JSON.stringify({ method: 'pause' }), 'https://player.vimeo.com')
          win.postMessage(JSON.stringify({ method: 'setCurrentTime', value: 0 }), 'https://player.vimeo.com')
        }
      } catch { /* ignore */ }
    }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [])

  // Subscribe to the finish event once the player is ready
  const handleTourIframeLoad = () => {
    setTimeout(() => {
      tourIframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ method: 'addEventListener', value: 'finish' }),
        'https://player.vimeo.com'
      )
    }, VIMEO_IFRAME_READY_DELAY)
  }

  const galleryTrackRef    = useRef(null)
  const galleryPosRef      = useRef(0)
  const galleryPausedRef   = useRef(false)
  const galleryRafRef      = useRef(null)
  const galleryHalfRef     = useRef(0)

  useEffect(() => {
    const track = galleryTrackRef.current
    if (!track) return
    const timer = setTimeout(() => {
      galleryHalfRef.current = track.scrollWidth / 2
      const step = () => {
        if (!galleryPausedRef.current) {
          galleryPosRef.current += 0.5
          if (galleryPosRef.current >= galleryHalfRef.current) galleryPosRef.current -= galleryHalfRef.current
          track.style.transform = `translateX(-${galleryPosRef.current}px)`
        }
        galleryRafRef.current = requestAnimationFrame(step)
      }
      galleryRafRef.current = requestAnimationFrame(step)
    }, 100)
    return () => { clearTimeout(timer); cancelAnimationFrame(galleryRafRef.current) }
  }, [])

  const galleryScrollNext = useCallback(() => {
    const half = galleryHalfRef.current || 1
    const step = galleryTrackRef.current ? galleryTrackRef.current.scrollWidth / 2 / GALLERY.length : DEFAULT_IMAGE_WIDTH
    galleryPosRef.current = (galleryPosRef.current + step) % half
    if (galleryTrackRef.current) galleryTrackRef.current.style.transform = `translateX(-${galleryPosRef.current}px)`
  }, [])

  const galleryScrollPrev = useCallback(() => {
    const half = galleryHalfRef.current || 1
    const step = galleryTrackRef.current ? galleryTrackRef.current.scrollWidth / 2 / GALLERY.length : DEFAULT_IMAGE_WIDTH
    galleryPosRef.current = ((galleryPosRef.current - step) % half + half) % half
    if (galleryTrackRef.current) galleryTrackRef.current.style.transform = `translateX(-${galleryPosRef.current}px)`
  }, [])

  return (
    <>
      <Helmet>
        <title>{tc.metaTitle}</title>
        <meta name="description" content={tc.metaDesc} />
      </Helmet>

      <main id="coastal-haven-page">

        {/* ── a) Hero ── */}
        <section className="ch-hero">
          <img src={heroImg} alt="Duma Suite Anna outdoor view" className="ch-hero__bg" />
          <div className="ch-hero__overlay" aria-hidden="true" />
          <div className="ch-hero__content">
            <motion.span
              className="ch-hero__eyebrow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            >
              {tc.heroEyebrow}
            </motion.span>
            <motion.h1
              className="ch-hero__title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              {tc.heroTitle}
            </motion.h1>
            <motion.p
              className="ch-hero__tagline"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {tc.heroTagline}
            </motion.p>
            <motion.div
              className="ch-hero__ctas"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42, ease: [0.4, 0, 0.2, 1] }}
            >
              <a href="#inquire" className="btn btn-primary">
                <Calendar size={14} strokeWidth={1.8} aria-hidden="true" />
                {tc.heroCta1}
              </a>
              <a href="#gallery" className="btn btn-inverse-light">
                {tc.heroCta2}
                <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── b) About ── */}
        <section className="ch-about section" id="about">
          <div className="container">
            {/* At-a-glance stats strip: 2×2 on mobile, 1 row on desktop */}
            <motion.div className="ch-about__stats-strip" {...fadeUp(0)}>
              <div className="ch-about__stat"><Maximize2 size={15} strokeWidth={1.5} /><span>{tc.sqm}</span></div>
              <div className="ch-about__stat"><BedDouble size={15} strokeWidth={1.5} /><span>{tc.beds}</span></div>
              <div className="ch-about__stat"><Users size={15} strokeWidth={1.5} /><span>{tc.guests}</span></div>
              <div className="ch-about__stat"><Calendar size={15} strokeWidth={1.5} /><span>{tc.minStay}</span></div>
            </motion.div>

            <div className="ch-about__inner">
              {/* Left: text content */}
              <motion.div className="ch-about__left" {...fadeUp(0.08)}>
                <span className="eyebrow">{tc.aboutEyebrow}</span>
                <h2 className="section-title ch-about__title">{tc.aboutTitle}</h2>
                <p className="ch-about__text">{tc.aboutText1}</p>
                <p className="ch-about__text">{tc.aboutText2}</p>
                <a href="#inquire" className="btn btn-primary ch-about__cta">
                  <Calendar size={14} strokeWidth={1.8} aria-hidden="true" />
                  {tc.aboutCta}
                </a>
              </motion.div>

              {/* Right: atmospheric image */}
              <motion.div className="ch-about__img-col" {...fadeUp(0.16)}>
                <div className="ch-about__img-wrap">
                  <img src={gm2Img} alt="Duma Suite Anna room" className="ch-about__img" />
                  <div className="ch-about__img-overlay" aria-hidden="true" />
                </div>
              </motion.div>
            </div>

            {/* Highlights row — below the two-column section on all screens */}
            <motion.div className="ch-about__highlights-row" {...fadeUp(0.2)}>
              <div className="ch-about__image-card">
                <div className="ch-about__highlights-img-wrap">
                  <img
                    src={g14}
                    alt="Duma Suite Anna nighttime pool view"
                    className="ch-about__highlights-img"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="ch-about__highlights-card">
                <h3 className="ch-about__highlights-title">{tc.highlightsTitle}</h3>
                <ul className="ch-highlights">
                  {tc.highlights.map((h) => (
                    <li key={h} className="ch-highlights__item">
                      <Check size={14} strokeWidth={1.75} className="ch-highlights__icon" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Mobile/tablet-only booking CTA */}
            <motion.div className="ch-about__mobile-cta" {...fadeUp(0.28)}>
              <a href="#inquire" className="btn btn-primary">
                <Calendar size={14} strokeWidth={1.8} aria-hidden="true" />
                {tc.aboutBookCta}
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── c) Gallery ── */}
        <section className="ch-gallery section section--secondary" id="gallery">
          <div className="container">
            <motion.span className="eyebrow text-center" {...fadeUp(0)}>
              {tc.galleryEyebrow}
            </motion.span>
            <motion.h2 className="section-title ch-gallery__title" {...fadeUp(0.1)}>
              {tc.galleryTitle}
            </motion.h2>
            <motion.p className="ch-gallery__desc" {...fadeUp(0.18)}>
              {tc.galleryDesc}
            </motion.p>
          </div>
          <motion.div className="ch-gallery__strip-wrapper" {...fadeUp(0.2)}>
            <button
              className="ch-gallery__arrow ch-gallery__arrow--prev"
              onClick={galleryScrollPrev}
              aria-label="Previous photos"
              onMouseEnter={() => { galleryPausedRef.current = true }}
              onMouseLeave={() => { galleryPausedRef.current = false }}
            >
              <ArrowLeft size={18} strokeWidth={1.8} />
            </button>
            <div
              className="ch-gallery__track-wrap"
              onMouseEnter={() => { galleryPausedRef.current = true }}
              onMouseLeave={() => { galleryPausedRef.current = false }}
            >
              <div className="ch-gallery__inner" ref={galleryTrackRef}>
                {[...GALLERY, ...GALLERY].map((img, i) => (
                  <div key={i} className="ch-gallery__item">
                    <img src={img} alt={GALLERY_LABELS[i % GALLERY.length]} className="ch-gallery__img" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
            <button
              className="ch-gallery__arrow ch-gallery__arrow--next"
              onClick={galleryScrollNext}
              aria-label="Next photos"
              onMouseEnter={() => { galleryPausedRef.current = true }}
              onMouseLeave={() => { galleryPausedRef.current = false }}
            >
              <ArrowRight size={18} strokeWidth={1.8} />
            </button>
          </motion.div>
          <div className="container ch-gallery__cta-wrap">
            <motion.a href="#inquire" className="btn btn-primary" {...fadeUp(0.1)}>
              {tc.galleryCta}
              <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
            </motion.a>
          </div>
        </section>

        {/* ── d) Room Tour Video ── */}
        <section className="ch-tour section" id="room-tour">
          <div className="container">
            <motion.span className="eyebrow text-center" {...fadeUp(0)}>
              {tc.tourEyebrow}
            </motion.span>
            <motion.h2 className="section-title ch-tour__title" {...fadeUp(0.1)}>
              {tc.tourTitle}
            </motion.h2>
            <motion.p className="ch-tour__subtitle" {...fadeUp(0.18)}>
              {tc.tourSub}
            </motion.p>
            <motion.div className="ch-tour__frame-wrap" {...fadeUp(0.26)} ref={tourRef}
              onMouseEnter={handleTourMouseEnter}
              onMouseLeave={handleTourMouseLeave}>
              {/* Vertical 9:16 video — constrained width for portrait display */}
              <div className="ch-tour__frame">
                <iframe
                  ref={tourIframeRef}
                  src={tourVideoSrc}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  preload="metadata"
                  title="coastal-haven-suite-room-tour"
                  onLoad={handleTourIframeLoad}
                />
              </div>
            </motion.div>
            {/* Post-tour CTA */}
            <motion.div className="ch-tour__cta-wrap" {...fadeUp(0.34)}>
              <a href="/contact" className="btn btn-primary">{tc.tourCta}</a>
            </motion.div>
          </div>
        </section>
        <section className="ch-amenities section" id="amenities">
          <div className="container">
            <motion.span className="eyebrow text-center ch-amenities__eyebrow" {...fadeUp(0)}>
              {tc.amenitiesEyebrow}
            </motion.span>
            <motion.h2 className="section-title ch-amenities__title" {...fadeUp(0.1)}>
              {tc.amenitiesTitle}
            </motion.h2>
            <div className="ch-amenities__grid">
              {tc.amenities.map((label, i) => {
                const Icon = AMENITY_ICONS[i] || Wifi
                return (
                  <motion.div
                    key={label}
                    className="ch-amenity"
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5, delay: i * 0.07, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <div className="ch-amenity__icon-wrap">
                      <Icon size={22} strokeWidth={1.5} className="ch-amenity__icon" />
                    </div>
                    <span className="ch-amenity__label">{label}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── e) Policies ── */}
        <section className="ch-policies section section--secondary" id="policies">
          <div className="container">
            <motion.span className="eyebrow text-center ch-policies__eyebrow" {...fadeUp(0)}>
              {tc.policiesEyebrow}
            </motion.span>
            <motion.h2 className="section-title ch-policies__title" {...fadeUp(0.1)}>
              {tc.policiesTitle}
            </motion.h2>
            <motion.div className="ch-policies__grid" {...fadeUp(0.2)}>
              {tc.policies.map(({ label, value }, idx) => {
                const Icon = POLICY_ICONS[idx] || Clock
                return (
                  <div key={label} className="ch-policy">
                    <Icon size={18} strokeWidth={1.5} className="ch-policy__icon" />
                    <div>
                      <span className="ch-policy__label">{label}</span>
                      <span className="ch-policy__value">{value}</span>
                    </div>
                  </div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ── f) Inquire ── */}
        <section className="ch-inquire section section--dark" id="inquire">
          <div className="container ch-inquire__inner">
            <motion.span className="ch-inquire__eyebrow" {...fadeUp(0)}>
              {tc.inquireEyebrow}
            </motion.span>
            <motion.h2 className="ch-inquire__title" {...fadeUp(0.1)}>
              {tc.inquireTitle}
            </motion.h2>
            <motion.p className="ch-inquire__subtitle" {...fadeUp(0.2)}>
              {tc.inquireSub}
            </motion.p>
            <motion.div className="ch-inquire__ctas" {...fadeUp(0.3)}>
              <a href="mailto:reservations@dumasuites.com" className="btn btn-primary">
                <Mail size={16} strokeWidth={1.5} />
                {tc.inquireEmail}
              </a>
              <a href="https://wa.me/254710933025" target="_blank" rel="noopener noreferrer" className="btn btn-inverse-light">
                <MessageCircle size={16} strokeWidth={1.5} />
                {tc.inquireWhatsapp}
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── g) Suite Preview — all suites ── */}
        <section className="ch-suites section section--secondary" id="all-suites">
          <div className="container">
            <motion.span className="eyebrow text-center ch-suites__eyebrow" {...fadeUp(0)}>
              {tc.suitesEyebrow}
            </motion.span>

            {/* Cheetah icon divider */}
            <motion.div className="ch-suites__divider" {...fadeUp(0.08)} aria-hidden="true">
              <span className="ch-suites__divider-line ch-suites__divider-line--left" />
              <img src={cheetahIcon} alt="" className="ch-suites__divider-icon" />
              <span className="ch-suites__divider-line ch-suites__divider-line--right" />
            </motion.div>

            <motion.h2 className="section-title ch-suites__title" {...fadeUp(0.15)}>
              {tc.suitesTitle}
            </motion.h2>

            <div className="ch-suites__grid">
              {/* Coastal Haven card */}
              <motion.div className="ch-suite-card" {...fadeUp(0.22)} onClick={() => navigate('/suites/coastal-haven')} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate('/suites/coastal-haven') } }}>
                <div className="ch-suite-card__img-wrap">
                  <img src={heroImg} alt={tc.heroTitle} className="ch-suite-card__img" loading="eager" />
                  <div className="ch-suite-card__badge">{tc.badgeCurrent}</div>
                </div>
                <div className="ch-suite-card__body">
                  <p className="ch-suite-card__tagline">{tc.coastalTagline}</p>
                  <h3 className="ch-suite-card__name">{tc.heroTitle}</h3>
                  <a href="/suites/coastal-haven" className="btn btn-inverse ch-suite-card__btn" onClick={e => { e.stopPropagation(); navigate('/suites/coastal-haven') }}>
                    {tc.viewSuiteBtn}
                  </a>
                </div>
              </motion.div>

              {/* Serenity Villa card */}
              <motion.div className="ch-suite-card" {...fadeUp(0.32)} onClick={() => navigate('/suites/serenity-villa')} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate('/suites/serenity-villa') } }}>
                <div className="ch-suite-card__img-wrap">
                  <img src={serenityPreviewImg} alt={ts.heroTitle} className="ch-suite-card__img" loading="eager" />
                </div>
                <div className="ch-suite-card__body">
                  <p className="ch-suite-card__tagline">{tc.serenityTagline}</p>
                  <h3 className="ch-suite-card__name">{ts.heroTitle}</h3>
                  <a href="/suites/serenity-villa" className="btn btn-inverse ch-suite-card__btn" onClick={e => { e.stopPropagation(); navigate('/suites/serenity-villa') }}>
                    {tc.viewSuiteBtn}
                  </a>
                </div>
              </motion.div>
              <motion.div className="ch-suite-card" {...fadeUp(0.42)} onClick={() => navigate('/suites/penthouse-suite-1-sofia')} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate('/suites/penthouse-suite-1-sofia') } }}>
                <div className="ch-suite-card__img-wrap">
                  <img src={penthousePreviewImg} alt="Penthouse Suite Sofia" className="ch-suite-card__img" loading="eager" />
                </div>
                <div className="ch-suite-card__body">
                  <p className="ch-suite-card__tagline">{tc.penthouseTagline}</p>
                  <h3 className="ch-suite-card__name">Penthouse Suite Sofia</h3>
                  <a href="/suites/penthouse-suite-1-sofia" className="btn btn-inverse ch-suite-card__btn" onClick={e => { e.stopPropagation(); navigate('/suites/penthouse-suite-1-sofia') }}>
                    {tc.viewSuiteBtn}
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      </main>

      <style>{`
        /* ── Hero ── */
        .ch-hero {
          position: relative;
          height: 100vh;
          min-height: 560px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .ch-hero__bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform-origin: center center;
          animation: ch-hero-zoom 8s ease-out forwards;
        }
        @keyframes ch-hero-zoom {
          from { transform: scale(1); }
          to   { transform: scale(1.05); }
        }
        .ch-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.18) 0%,
            rgba(0,0,0,0.52) 50%,
            rgba(0,0,0,0.44) 100%
          );
        }
        .ch-hero__content {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 0 var(--section-px);
          max-width: 700px;
        }
        .ch-hero__eyebrow {
          display: block;
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: clamp(0.75rem, 1.3vw, 0.9rem);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #c9a96e;
          margin-bottom: 1rem;
        }
        .ch-hero__title {
          font-family: var(--font-serif, Georgia, serif);
          font-size: clamp(2.2rem, 5.5vw, 3.8rem);
          font-weight: 400;
          color: #fff;
          line-height: 1.08;
          letter-spacing: -0.01em;
          margin: 0 0 16px;
        }
        .ch-hero__tagline {
          font-family: var(--font-body);
          font-size: clamp(0.9rem, 1.5vw, 1.1rem);
          color: rgba(255,255,255,0.82);
          margin: 0 0 2rem;
          line-height: 1.6;
          max-width: 500px;
          margin-inline: auto;
          margin-bottom: 2rem;
        }
        .ch-hero__ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
        }
        @media (min-width: 768px) and (max-width: 1199px) {
          .ch-hero { height: 90vh; }
        }
        @media (max-width: 767px) {
          .ch-hero { height: 85vh; }
        }

        /* ── About ── */
        .ch-about__stats-strip {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          margin-bottom: clamp(28px, 4vw, 44px);
          padding: 14px 24px;
          background: rgba(201,169,110,0.08);
          border: 1px solid rgba(201,169,110,0.22);
          border-radius: 3px;
        }
        .ch-about__stat {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          font-family: var(--font-nav);
          font-size: 0.64rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-espresso);
          padding: 10px 12px;
        }
        .ch-about__stat svg { color: var(--color-teal); flex-shrink: 0; }
        .ch-about__stat-divider { display: none; }
        @media (min-width: 640px) {
          .ch-about__stats-strip {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: nowrap;
          }
          .ch-about__stat {
            padding: 4px 20px;
          }
          .ch-about__stat-divider {
            display: block;
            width: 1px;
            height: 18px;
            background: rgba(86,51,17,0.2);
            flex-shrink: 0;
          }
        }
        @media (min-width: 1100px) {
          .ch-about__stat { padding: 4px 24px; }
        }
        .ch-about__inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(28px, 4vw, 44px);
          align-items: start;
        }
        .ch-about__title { margin: 0.5rem 0 1.25rem; }
        .ch-about__text {
          font-family: var(--font-body);
          font-size: clamp(0.92rem, 1.4vw, 1.05rem);
          color: var(--color-text-muted);
          line-height: 1.8;
          margin-bottom: 1rem;
        }
        .ch-about__cta { margin-top: 0.75rem; display: inline-flex; align-items: center; }
        @media (max-width: 899px) {
          .ch-about__cta { display: none; }
        }
        /* Highlights row — below about__inner on all breakpoints */
        .ch-about__highlights-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-top: clamp(16px, 2.4vw, 24px);
        }
        @media (min-width: 900px) {
          .ch-about__highlights-row {
            grid-template-columns: 0.9fr 1.1fr;
            align-items: stretch;
            gap: 18px;
          }
        }
        @media (max-width: 899px) {
          .ch-about__image-card { order: 2; }
          .ch-about__highlights-card { order: 1; }
        }
        .ch-about__image-card {
          padding: 12px;
          background: var(--color-surface, #faf9f7);
          border-radius: 14px;
          border: 1px solid var(--color-border, #e8e3dc);
          box-shadow: 0 8px 28px rgba(0,0,0,0.06);
          display: flex;
          flex-direction: column;
        }
        .ch-about__highlights-img-wrap {
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid var(--color-border, #e8e3dc);
          box-shadow: 0 10px 24px rgba(0,0,0,0.12);
          min-height: 230px;
          flex: 1;
        }
        @media (max-width: 767px) {
          .ch-about__image-card { max-height: 340px; }
        }
        .ch-about__highlights-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        /* Highlights card — now inside highlights-row */
        .ch-about__highlights-card {
          margin-top: 0;
          padding: 22px;
          background: var(--color-surface, #faf9f7);
          border-radius: 14px;
          border: 1px solid var(--color-border, #e8e3dc);
          box-shadow: 0 8px 28px rgba(0,0,0,0.06);
        }
        .ch-about__mobile-cta {
          display: flex;
          justify-content: center;
          margin-top: 28px;
        }
        @media (min-width: 900px) {
          .ch-about__mobile-cta { display: none; }
        }
        .ch-about__highlights-title {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-text-muted, #7a7065);
          margin: 0 0 16px;
        }
        /* Right image column — visible on all breakpoints */
        .ch-about__img-wrap {
          position: relative;
          overflow: hidden;
          border-radius: 14px;
          aspect-ratio: 16/10;
          box-shadow: 0 14px 36px rgba(0,0,0,0.18);
        }
        .ch-about__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 600ms ease;
        }
        .ch-about__img-wrap:hover .ch-about__img { transform: scale(1.04); }
        .ch-about__img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(86,51,17,0.18) 0%, transparent 50%);
          pointer-events: none;
        }
        @keyframes ch-about-mobile-image-enter {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 899px) {
          .ch-about__img-col {
            display: block;
            width: min(100%, 620px);
            margin-inline: auto;
            animation: ch-about-mobile-image-enter 680ms cubic-bezier(0.4, 0, 0.2, 1) both;
          }
          .ch-about__img-wrap {
            width: 100%;
            aspect-ratio: 16/10;
            max-height: clamp(220px, 56vw, 320px);
          }
        }
        @media (min-width: 900px) {
          .ch-about__inner {
            grid-template-columns: 1.05fr 0.95fr;
            align-items: stretch;
          }
          .ch-about__img-wrap {
            aspect-ratio: unset;
            height: 100%;
            min-height: 400px;
          }
        }
        .ch-highlights { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; }
        @media (min-width: 980px) {
          .ch-highlights { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        .ch-highlights__item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.88rem;
          color: var(--color-text-body);
          line-height: 1.5;
          padding: 8px 10px;
          border-radius: 10px;
          background: rgba(201, 169, 110, 0.08);
        }
        .ch-highlights__icon {
          color: var(--color-accent, #c9a96e);
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* ── Gallery ── */
        .ch-gallery__title {
          text-align: center;
          margin: 0.5rem 0 0.75rem;
        }
        .ch-gallery__desc {
          font-family: var(--font-body);
          font-size: clamp(0.9rem, 1.5vw, 1.05rem);
          color: var(--color-text-muted);
          line-height: 1.75;
          max-width: 560px;
          margin: 0 auto 2rem;
          text-align: center;
          font-style: italic;
        }
        .ch-gallery__strip-wrapper {
          position: relative;
        }
        .ch-gallery__track-wrap {
          overflow: hidden;
          cursor: default;
        }
        .ch-gallery__inner {
          display: flex;
          gap: 12px;
          will-change: transform;
        }
        .ch-gallery__item {
          flex-shrink: 0;
          overflow: hidden;
          border-radius: 2px;
        }
        .ch-gallery__img {
          width: 340px;
          height: 300px;
          object-fit: cover;
          display: block;
          transition: transform 500ms ease;
          pointer-events: none;
          user-select: none;
        }
        .ch-gallery__item:hover .ch-gallery__img {
          transform: scale(1.07);
        }
        .ch-gallery__arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--color-espresso);
          transition: background var(--transition-base), border-color var(--transition-base), color var(--transition-base), transform 0.3s ease, box-shadow var(--transition-base);
        }
        .ch-gallery__arrow:hover {
          background: var(--color-teal);
          border-color: var(--color-teal);
          color: #fff;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 4px 20px rgba(201,169,110,0.45);
        }
        .ch-gallery__arrow--prev { left: clamp(8px, 2vw, 20px); }
        .ch-gallery__arrow--next { right: clamp(8px, 2vw, 20px); }
        .ch-gallery__cta-wrap {
          text-align: center;
          padding-top: 2rem;
        }

        /* ── Room Tour Video ── */
        .ch-tour__title {
          text-align: center;
          margin: 0.5rem 0 0.75rem;
        }
        .ch-tour__subtitle {
          font-family: var(--font-body);
          font-size: clamp(0.9rem, 1.4vw, 1rem);
          color: var(--color-text-muted);
          text-align: center;
          margin: 0 auto 2.5rem;
          max-width: 480px;
          line-height: 1.7;
        }


/* Full viewport video on all screen sizes */
.ch-tour__frame-wrap {
  display: block;
  width: 100vw;
  margin-left: calc((100% - 100vw) / 2);
  height: 100vh;
}

.ch-tour__frame {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  overflow: hidden;
}

.ch-tour__frame iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
  object-fit: contain;
}

/* Mobile — full viewport, cover fill */
@media (max-width: 767px) {
  .ch-tour__frame-wrap {
    width: 100vw;
    margin-left: calc((100% - 100vw) / 2);
    height: 100vh;
  }
  .ch-tour__frame {
    height: 100%;
  }
  .ch-tour__frame iframe {
    object-fit: cover;
  }
}

        .ch-tour__cta-wrap {
          text-align: center;
          margin-top: 2.5rem;
        }

        /* ── Amenities ── */
        .ch-amenities__eyebrow,
        .ch-amenities__title {
          text-align: center;
          display: block;
        }
        .ch-amenities__title { margin: 0.5rem 0 2rem; }
        .ch-amenities__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 20px;
        }
        .ch-amenity {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 24px 16px;
          background: var(--color-bg-secondary);
          text-align: center;
          cursor: default;
          border-radius: 3px;
          transition:
            transform 0.28s ease,
            box-shadow 0.28s ease;
        }
        .ch-amenity:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 28px rgba(0,0,0,0.08);
        }
        .ch-amenity__icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(201, 169, 110, 0.12);
          border: 1px solid rgba(201, 169, 110, 0.28);
          flex-shrink: 0;
          transition:
            background 0.28s ease,
            border-color 0.28s ease,
            box-shadow 0.28s ease;
        }
        .ch-amenity:hover .ch-amenity__icon-wrap {
          background: var(--color-teal);
          border-color: var(--color-teal);
          box-shadow: 0 6px 16px rgba(88, 176, 196, 0.35);
        }
        .ch-amenity__icon {
          color: var(--color-teal);
          transition: color 0.28s ease;
        }
        .ch-amenity:hover .ch-amenity__icon {
          color: #fff;
        }
        .ch-amenity__label {
          font-family: var(--font-body);
          font-size: 0.82rem;
          color: var(--color-text-body);
        }

        /* ── Policies ── */
        .ch-policies__eyebrow,
        .ch-policies__title {
          text-align: center;
          display: block;
        }
        .ch-policies__title { margin: 0.5rem 0 2rem; }
        .ch-policies__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 16px;
          max-width: 960px;
          margin-inline: auto;
        }
        .ch-policy {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px 20px;
          background: var(--color-bg-primary);
        }
        .ch-policy__icon { color: var(--color-teal); flex-shrink: 0; margin-top: 2px; }
        .ch-policy div {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .ch-policy__label {
          font-family: var(--font-nav);
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }
        .ch-policy__value {
          font-family: var(--font-body);
          font-size: 0.92rem;
          color: var(--color-espresso);
          font-weight: 500;
        }

        /* ── Inquire ── */
        .ch-inquire__inner {
          text-align: center;
        }
        .ch-inquire__eyebrow {
          display: block;
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: clamp(0.75rem, 1.3vw, 0.9rem);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c9a96e;
          margin-bottom: 1rem;
        }
        .ch-inquire__title {
          font-family: var(--font-title);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 400;
          color: #fff;
          margin: 0 0 1rem;
        }
        .ch-inquire__subtitle {
          font-family: var(--font-body);
          font-size: clamp(0.92rem, 1.5vw, 1.05rem);
          color: rgba(255,255,255,0.72);
          max-width: 480px;
          margin: 0 auto 2rem;
          line-height: 1.7;
        }
        .ch-inquire__ctas {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 14px;
        }

        /* ── Suite Preview ── */
        .ch-suites__eyebrow { display: block; }
        .ch-suites__divider {
          display: flex;
          align-items: center;
          gap: 14px;
          max-width: 360px;
          margin: 0.6rem auto 0.8rem;
        }
        .ch-suites__divider-line {
          flex: 1;
          height: 1px;
        }
        .ch-suites__divider-line--left {
          background: linear-gradient(to right, transparent, var(--color-teal));
        }
        .ch-suites__divider-line--right {
          background: linear-gradient(to left, transparent, var(--color-teal));
        }
        .ch-suites__divider-icon {
          width: 2rem;
          height: 2rem;
          opacity: 0.72;
          flex-shrink: 0;
        }
        .ch-suites__title { text-align: center; margin: 0.5rem 0 2.5rem; }
        .ch-suites__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          max-width: 760px;
          margin-inline: auto;
        }
        .ch-suite-card {
          cursor: pointer;
          background: var(--color-bg-primary);
          border: 1px solid rgba(201,169,110,0.18);
          border-radius: 3px;
          overflow: hidden;
          transition: box-shadow 0.35s ease, transform 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .ch-suite-card:hover {
          box-shadow: 0 16px 48px rgba(86,51,17,0.18);
          transform: translateY(-4px);
        }
        .ch-suite-card__img-wrap {
          position: relative;
          overflow: hidden;
          aspect-ratio: 16/9;
        }
        .ch-suite-card__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }
        .ch-suite-card:hover .ch-suite-card__img {
          transform: scale(1.06);
        }
        .ch-suite-card__badge {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 3;
          background: var(--color-teal);
          color: #fff;
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 2px;
        }
        .ch-suite-card__body {
          padding: 20px 24px;
          text-align: center;
        }
        .ch-suite-card__tagline {
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-teal);
          margin: 0 0 6px;
        }
        .ch-suite-card__name {
          font-family: var(--font-title);
          font-size: clamp(1.3rem, 2.5vw, 1.8rem);
          font-weight: 400;
          color: var(--color-espresso);
          margin: 0 0 16px;
        }
        .ch-suite-card__btn { display: inline-block; }
        @media (min-width: 760px) {
          .ch-suites__grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </>
  )
}
