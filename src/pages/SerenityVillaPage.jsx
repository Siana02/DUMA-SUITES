import { useEffect, useRef, useCallback, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  Maximize2, BedDouble, Users, Check, Mail, MessageCircle,
  Wifi, Tv, Bath, Utensils, Leaf, Calendar, Clock, CreditCard,
  Shield, AirVent, Sparkles, Sofa, Sunrise, UtensilsCrossed,
  Sun, Fan, PawPrint, Cigarette, ArrowLeft, ArrowRight, TowelRack,
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { getT } from '../i18n/translations.js'

import heroImg from '../assets/serenity-villa-outdoor-terrace.JPEG'
import coastalPreview from '../assets/1bedroom-coastal-haven-suite-preview.JPEG'
import serenityAboutImg from '../assets/serenity-villa-outdoor-lounge-upclose.JPEG'
import cheetahIcon from '../assets/cheetah.png'
import serenityPreviewImg from '../assets/serenity-villa-tv-and-kitchen-view.JPEG'
import penthousePreviewImg from '../assets/penthouse-suite-view-of-rooftop-pool-and-ocean.jpg'

// Gallery images — reordered: bedrooms → closet → lounge/dining → outdoor → kitchen → entrance → bathroom → 1stfloor-view (last)
import g1  from '../assets/serenity-villa-1st-bedroom-view1.JPEG'
import g2  from '../assets/serenity-villa-1st-bedroom-view2.JPEG'
import g3  from '../assets/serenity-villa-2ndbedroom-view1.JPEG'
import g4  from '../assets/serenity-villa-2ndbedroom-view2.JPEG'
import g5  from '../assets/serenity-villa-2ndbedroom-view3.JPEG'
import g6  from '../assets/serenity-villa-3rdbedroom-view1.JPEG'
import g7  from '../assets/serenity-villa-3rdbedroom-view2.JPEG'
import g8  from '../assets/serenity-villa-closet-view1.JPEG'
import g9  from '../assets/serenity-villa-indoor-lounge-area-upclose.JPEG'
import g10 from '../assets/serenity-villa-lounge-dining-area-view1.JPEG'
import g11 from '../assets/serenity-villa-dining-table-view1.JPEG'
import g12 from '../assets/serenity-villa-dining-upclose.JPEG'
import g13 from '../assets/serenity-villa-art-showcase.JPEG'
import g14 from '../assets/serenity-villa-outdoor-garden-view.JPEG'
import g15 from '../assets/serenity-villa-outdoor-lounge-upclose.JPEG'
import g16 from '../assets/serenity-villa-outdoor-seating-view1.JPEG'
import g17 from '../assets/serenity-villa-balcony-view1.JPEG'
import g18 from '../assets/serenity-villa-tv-and-kitchen-view.JPEG'
import g19 from '../assets/serenity-villa-full-kitchen-view.JPEG'
import g20 from '../assets/serenity-villa-kitchen-cupboard.JPEG'
import g21 from '../assets/serenity-villa-entrance-view-main.JPEG'
import g22 from '../assets/serenity-villa-entrance-view-from-outside.JPEG'
import g23 from '../assets/serenity-villa-entrance-view-from-inside.JPEG'
import g24 from '../assets/serenity-villa-entrance-from-inside-with-tv-view.JPEG'
import g25 from '../assets/serenity-villa-private-shower1.JPEG'
import g26 from '../assets/serenity-villa-washroom-view1.JPEG'
import g27 from '../assets/serenity-villa-washroom2.JPEG'
import g28 from '../assets/serenity-villa-1stfloor-view.JPEG'

const GALLERY = [g1,g2,g3,g4,g5,g6,g7,g8,g9,g10,g11,g12,g13,g14,g15,g16,g17,g18,g19,g20,g21,g22,g23,g24,g25,g26,g27,g28]
const DEFAULT_IMAGE_WIDTH = 352 // 340px image + 12px gap, used as scroll-step fallback
const GALLERY_LABELS = [
  '1st bedroom view 1','1st bedroom view 2',
  '2nd bedroom view 1','2nd bedroom view 2','2nd bedroom view 3',
  '3rd bedroom view 1','3rd bedroom view 2',
  'Closet view',
  'Indoor lounge','Lounge dining area','Dining table','Dining upclose','Art showcase',
  'Outdoor garden','Outdoor lounge','Outdoor seating','Balcony view',
  'TV and kitchen overview','Full kitchen','Kitchen cupboard',
  'Entrance main','Entrance from outside','Entrance from inside','Entrance with TV',
  'Private shower','Washroom','Washroom 2',
  '1st floor view',
]

const AMENITY_ICONS = [
  BedDouble, Bath, Utensils, Sun, Leaf, UtensilsCrossed,
  Sofa, Sunrise, Wifi, Sparkles, AirVent, Tv,
  ({ size, strokeWidth, className }) => <span className={className} style={{ fontSize: size, lineHeight: 1 }}>⛱</span>,
  TowelRack,
  Fan,
]

const POLICY_ICONS = [Clock, Clock, Calendar, CreditCard, Shield, PawPrint, Cigarette]

const TOUR_VIDEO_BASE =
  'https://player.vimeo.com/video/1189024643' +
  '?badge=0&autopause=0&player_id=0&app_id=58479' +
  '&byline=0&title=0&portrait=0&muted=1&dnt=1'

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

export default function SerenityVillaPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const navigate = useNavigate()
  const { lang } = useLanguage()
  const t = getT(lang)
  const ts = t.suites.serenity
  const tc = t.suites.coastal

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

  const tourIframeRef = useRef(null)
  const tourHasPlayedRef = useRef(false)
  const [tourVideoSrc, setTourVideoSrc] = useState(TOUR_VIDEO_BASE)
  const { ref: tourRef, inView: tourInView } = useInView({ threshold: 0.15 })

  useEffect(() => {
    const post = (method, value) => {
      const msg = value !== undefined ? { method, value } : { method }
      tourIframeRef.current?.contentWindow?.postMessage(JSON.stringify(msg), 'https://player.vimeo.com')
    }
    if (tourInView) {
      if (!tourHasPlayedRef.current) {
        tourHasPlayedRef.current = true
        setTourVideoSrc(`${TOUR_VIDEO_BASE}&autoplay=1`)
      } else {
        post('play')
      }
    } else if (tourHasPlayedRef.current) {
      post('pause')
    }
  }, [tourInView])

  // When the video ends
  useEffect(() => {
    const onMsg = (e) => {
      if (e.origin !== 'https://player.vimeo.com') return
      if (e.source !== tourIframeRef.current?.contentWindow) return
      try {
        const data = JSON.parse(e.data)
        if (data.event === 'finish') {
          const win = tourIframeRef.current?.contentWindow
          if (!win) return
          const post = (method, value) => {
            const msg = value !== undefined ? { method, value } : { method }
            win.postMessage(JSON.stringify(msg), 'https://player.vimeo.com')
          }
          post('pause')
          post('setCurrentTime', 0)
        }
      } catch { /* ignore */ }
    }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [])

  const handleTourIframeLoad = () => {
    setTimeout(() => {
      tourIframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ method: 'addEventListener', value: 'finish' }),
        'https://player.vimeo.com'
      )
    }, VIMEO_IFRAME_READY_DELAY)
  }

  return (
    <>
      <Helmet>
        <title>{ts.metaTitle}</title>
        <meta name="description" content={ts.metaDesc} />
      </Helmet>

      <main id="serenity-villa-page">

        {/* ── a) Hero ── */}
        <section className="sv-hero">
          <img src={heroImg} alt="Duma Suite Alice outdoor terrace" className="sv-hero__bg" />
          <div className="sv-hero__overlay" aria-hidden="true" />
          <div className="sv-hero__content">
            <motion.span
              className="sv-hero__eyebrow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            >
              {ts.heroEyebrow}
            </motion.span>
            <motion.h1
              className="sv-hero__title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              {ts.heroTitle}
            </motion.h1>
            <motion.p
              className="sv-hero__tagline"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {ts.heroTagline}
            </motion.p>
            <motion.div
              className="sv-hero__ctas"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42, ease: [0.4, 0, 0.2, 1] }}
            >
              <a href="#inquire" className="btn btn-primary">
                <Calendar size={14} strokeWidth={1.8} aria-hidden="true" />
                {ts.heroCta1}
              </a>
              <a href="#gallery" className="btn btn-inverse-light">
                {ts.heroCta2}
                <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── b) About ── */}
        <section className="sv-about section" id="about">
          <div className="container">
            {/* At-a-glance stats strip: 2×2 on mobile, 1 row on desktop */}
            <motion.div className="sv-about__stats-strip" {...fadeUp(0)}>
              <div className="sv-about__stat"><Maximize2 size={15} strokeWidth={1.5} /><span>{ts.sqm}</span></div>
              <div className="sv-about__stat"><BedDouble size={15} strokeWidth={1.5} /><span>{ts.beds}</span></div>
              <div className="sv-about__stat"><Users size={15} strokeWidth={1.5} /><span>{ts.guests}</span></div>
              <div className="sv-about__stat"><Calendar size={15} strokeWidth={1.5} /><span>{ts.minStay}</span></div>
            </motion.div>

            <div className="sv-about__inner">
              {/* Left: text + highlights */}
              <motion.div className="sv-about__left" {...fadeUp(0.08)}>
                <span className="eyebrow">{ts.aboutEyebrow}</span>
                <h2 className="section-title sv-about__title">{ts.aboutTitle}</h2>
                <p className="sv-about__text">{ts.aboutText1}</p>
                <p className="sv-about__text">{ts.aboutText2}</p>
                <a href="#inquire" className="btn btn-primary sv-about__cta">
                  <Calendar size={14} strokeWidth={1.8} aria-hidden="true" />
                  {ts.aboutCta}
                </a>

                {/* Highlights card — moved into left column */}
                <div className="sv-about__highlights-card">
                  <h3 className="sv-about__highlights-title">{ts.highlightsTitle}</h3>
                  <ul className="sv-highlights">
                    {ts.highlights.map((h) => (
                      <li key={h} className="sv-highlights__item">
                        <Check size={14} strokeWidth={1.75} className="sv-highlights__icon" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Right: atmospheric image */}
              <motion.div className="sv-about__img-col" {...fadeUp(0.16)}>
                <div className="sv-about__img-wrap">
                  <img src={serenityAboutImg} alt="Three Bedroom Suite outdoor lounge" className="sv-about__img" />
                  <div className="sv-about__img-overlay" aria-hidden="true" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── c) Gallery ── */}
        <section className="sv-gallery section section--secondary" id="gallery">
          <div className="container">
            <motion.span className="eyebrow text-center" {...fadeUp(0)}>
              {ts.galleryEyebrow}
            </motion.span>
            <motion.h2 className="section-title sv-gallery__title" {...fadeUp(0.1)}>
              {ts.galleryTitle}
            </motion.h2>
            <motion.p className="sv-gallery__desc" {...fadeUp(0.18)}>
              {ts.galleryDesc}
            </motion.p>
          </div>
          <motion.div className="sv-gallery__strip-wrapper" {...fadeUp(0.2)}>
            <button
              className="sv-gallery__arrow sv-gallery__arrow--prev"
              onClick={galleryScrollPrev}
              aria-label="Previous photos"
              onMouseEnter={() => { galleryPausedRef.current = true }}
              onMouseLeave={() => { galleryPausedRef.current = false }}
            >
              <ArrowLeft size={18} strokeWidth={1.8} />
            </button>
            <div
              className="sv-gallery__track-wrap"
              onMouseEnter={() => { galleryPausedRef.current = true }}
              onMouseLeave={() => { galleryPausedRef.current = false }}
            >
              <div className="sv-gallery__inner" ref={galleryTrackRef}>
                {[...GALLERY, ...GALLERY].map((img, i) => (
                  <div key={i} className="sv-gallery__item">
                    <img src={img} alt={GALLERY_LABELS[i % GALLERY.length]} className="sv-gallery__img" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
            <button
              className="sv-gallery__arrow sv-gallery__arrow--next"
              onClick={galleryScrollNext}
              aria-label="Next photos"
              onMouseEnter={() => { galleryPausedRef.current = true }}
              onMouseLeave={() => { galleryPausedRef.current = false }}
            >
              <ArrowRight size={18} strokeWidth={1.8} />
            </button>
          </motion.div>
          <div className="container sv-gallery__cta-wrap">
            <motion.a href="#inquire" className="btn btn-primary" {...fadeUp(0.1)}>
              {ts.galleryCta}
              <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
            </motion.a>
          </div>
        </section>

        {/* ── d) Room Tour Video ── */}
        <section className="sv-tour section section--secondary" id="room-tour">
          <div className="container">
            <motion.span className="eyebrow text-center" {...fadeUp(0)}>
              {ts.tourEyebrow}
            </motion.span>
            <motion.h2 className="section-title sv-tour__title" {...fadeUp(0.1)}>
              {ts.tourTitle}
            </motion.h2>
            <motion.p className="sv-tour__subtitle" {...fadeUp(0.18)}>
              {ts.tourSub}
            </motion.p>
            <motion.div className="sv-tour__frame-wrap" {...fadeUp(0.26)} ref={tourRef}>
              {/* Portrait 9:16 video — matches coastal haven framing */}
              <div className="sv-tour__frame">
                <iframe
                  ref={tourIframeRef}
                  src={tourVideoSrc}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                  title="serenity-villa-room-tour"
                  onLoad={handleTourIframeLoad}
                />
              </div>
            </motion.div>
            {/* Post-tour CTA */}
            <motion.div className="sv-tour__cta-wrap" {...fadeUp(0.34)}>
              <a href="/contact" className="btn btn-primary">{ts.tourCta}</a>
            </motion.div>
          </div>
        </section>

        {/* ── e) Amenities ── */}
        <section className="sv-amenities section" id="amenities">
          <div className="container">
            <motion.span className="eyebrow text-center sv-amenities__eyebrow" {...fadeUp(0)}>
              {ts.amenitiesEyebrow}
            </motion.span>
            <motion.h2 className="section-title sv-amenities__title" {...fadeUp(0.1)}>
              {ts.amenitiesTitle}
            </motion.h2>
            <div className="sv-amenities__grid">
              {ts.amenities.map((label, i) => {
                const Icon = AMENITY_ICONS[i] || Wifi
                return (
                  <motion.div
                    key={label}
                    className="sv-amenity"
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5, delay: i * 0.07, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <div className="sv-amenity__icon-wrap">
                      <Icon size={22} strokeWidth={1.5} className="sv-amenity__icon" />
                    </div>
                    <span className="sv-amenity__label">{label}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── f) Policies ── */}
        <section className="sv-policies section section--secondary" id="policies">
          <div className="container">
            <motion.span className="eyebrow text-center sv-policies__eyebrow" {...fadeUp(0)}>
              {ts.policiesEyebrow}
            </motion.span>
            <motion.h2 className="section-title sv-policies__title" {...fadeUp(0.1)}>
              {ts.policiesTitle}
            </motion.h2>
            <motion.div className="sv-policies__grid" {...fadeUp(0.2)}>
              {ts.policies.map(({ label, value }, idx) => {
                const Icon = POLICY_ICONS[idx] || Clock
                return (
                  <div key={label} className="sv-policy">
                    <Icon size={18} strokeWidth={1.5} className="sv-policy__icon" />
                    <div>
                      <span className="sv-policy__label">{label}</span>
                      <span className="sv-policy__value">{value}</span>
                    </div>
                  </div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ── g) Inquire ── */}
        <section className="sv-inquire section section--dark" id="inquire">
          <div className="container sv-inquire__inner">
            <motion.span className="sv-inquire__eyebrow" {...fadeUp(0)}>
              {ts.inquireEyebrow}
            </motion.span>
            <motion.h2 className="sv-inquire__title" {...fadeUp(0.1)}>
              {ts.inquireTitle}
            </motion.h2>
            <motion.p className="sv-inquire__subtitle" {...fadeUp(0.2)}>
              {ts.inquireSub}
            </motion.p>
            <motion.div className="sv-inquire__ctas" {...fadeUp(0.3)}>
              <a href="mailto:reservations@dumasuites.com" className="btn btn-primary">
                <Mail size={16} strokeWidth={1.5} />
                {ts.inquireEmail}
              </a>
              <a href="https://wa.me/254710933025" target="_blank" rel="noopener noreferrer" className="btn btn-inverse-light">
                <MessageCircle size={16} strokeWidth={1.5} />
                {ts.inquireWhatsapp}
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── h) Suite Preview — all suites ── */}
        <section className="sv-suites section section--secondary" id="all-suites">
          <div className="container">
            <motion.span className="eyebrow text-center sv-suites__eyebrow" {...fadeUp(0)}>
              {ts.suitesEyebrow}
            </motion.span>

            {/* Cheetah icon divider */}
            <motion.div className="sv-suites__divider" {...fadeUp(0.08)} aria-hidden="true">
              <span className="sv-suites__divider-line sv-suites__divider-line--left" />
              <img src={cheetahIcon} alt="" className="sv-suites__divider-icon" />
              <span className="sv-suites__divider-line sv-suites__divider-line--right" />
            </motion.div>

            <motion.h2 className="section-title sv-suites__title" {...fadeUp(0.15)}>
              {ts.suitesTitle}
            </motion.h2>

            <div className="sv-suites__grid">
              {/* Coastal Haven card */}
              <motion.div className="sv-suite-card" {...fadeUp(0.22)} onClick={() => navigate('/suites/coastal-haven')} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate('/suites/coastal-haven') } }}>
                <div className="sv-suite-card__img-wrap">
                  <img src={coastalPreview} alt={tc.heroTitle} className="sv-suite-card__img" loading="eager" />
                </div>
                <div className="sv-suite-card__body">
                  <p className="sv-suite-card__tagline">{ts.coastalTagline}</p>
                  <h3 className="sv-suite-card__name">{tc.heroTitle}</h3>
                  <a href="/suites/coastal-haven" className="btn btn-inverse sv-suite-card__btn" onClick={e => { e.stopPropagation(); navigate('/suites/coastal-haven') }}>
                    {ts.viewSuiteBtn}
                  </a>
                </div>
              </motion.div>

              {/* Serenity Villa card */}
              <motion.div className="sv-suite-card" {...fadeUp(0.32)} onClick={() => navigate('/suites/serenity-villa')} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate('/suites/serenity-villa') } }}>
                <div className="sv-suite-card__img-wrap">
                  <img src={serenityPreviewImg} alt={ts.heroTitle} className="sv-suite-card__img" loading="eager" />
                  <div className="sv-suite-card__badge">{ts.badgeCurrent}</div>
                </div>
                <div className="sv-suite-card__body">
                  <p className="sv-suite-card__tagline">{ts.serenityTagline}</p>
                  <h3 className="sv-suite-card__name">{ts.heroTitle}</h3>
                  <a href="/suites/serenity-villa" className="btn btn-inverse sv-suite-card__btn" onClick={e => { e.stopPropagation(); navigate('/suites/serenity-villa') }}>
                    {ts.viewSuiteBtn}
                  </a>
                </div>
              </motion.div>
              <motion.div className="sv-suite-card" {...fadeUp(0.42)} onClick={() => navigate('/suites/penthouse-suite-1-sofia')} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate('/suites/penthouse-suite-1-sofia') } }}>
                <div className="sv-suite-card__img-wrap">
                  <img src={penthousePreviewImg} alt="Penthouse Suite Sofia" className="sv-suite-card__img" loading="eager" />
                </div>
                <div className="sv-suite-card__body">
                  <p className="sv-suite-card__tagline">{ts.penthouseTagline}</p>
                  <h3 className="sv-suite-card__name">Penthouse Suite Sofia</h3>
                  <a href="/suites/penthouse-suite-1-sofia" className="btn btn-inverse sv-suite-card__btn" onClick={e => { e.stopPropagation(); navigate('/suites/penthouse-suite-1-sofia') }}>
                    {ts.viewSuiteBtn}
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      </main>

      <style>{`
        /* ── Hero ── */
        .sv-hero {
          position: relative;
          height: 100vh;
          min-height: 560px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .sv-hero__bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform-origin: center center;
          animation: sv-hero-zoom 8s ease-out forwards;
        }
        @keyframes sv-hero-zoom {
          from { transform: scale(1); }
          to   { transform: scale(1.05); }
        }
        .sv-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.18) 0%,
            rgba(0,0,0,0.52) 50%,
            rgba(0,0,0,0.44) 100%
          );
        }
        .sv-hero__content {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 0 var(--section-px);
          max-width: 700px;
        }
        .sv-hero__eyebrow {
          display: block;
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: clamp(0.75rem, 1.3vw, 0.9rem);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #c9a96e;
          margin-bottom: 1rem;
        }
        .sv-hero__title {
          font-family: var(--font-title);
          font-size: clamp(3rem, 7.5vw, 6rem);
          font-weight: 400;
          color: #fff;
          line-height: 1.05;
          margin: 0 0 1rem;
        }
        .sv-hero__tagline {
          font-family: var(--font-body);
          font-size: clamp(0.9rem, 1.5vw, 1.1rem);
          color: rgba(255,255,255,0.82);
          margin: 0 auto 2rem;
          line-height: 1.6;
          max-width: 500px;
        }
        .sv-hero__ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
        }
        @media (min-width: 768px) and (max-width: 1199px) {
          .sv-hero { height: 90vh; }
        }
        @media (max-width: 767px) {
          .sv-hero { height: 85vh; }
          .sv-hero__title { font-size: clamp(2.4rem, 9vw, 3.8rem); }
        }

        /* ── About ── */
        .sv-about__stats-strip {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          margin-bottom: clamp(28px, 4vw, 44px);
          padding: 14px 24px;
          background: rgba(201,169,110,0.08);
          border: 1px solid rgba(201,169,110,0.22);
          border-radius: 3px;
        }
        .sv-about__stat {
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
        .sv-about__stat svg { color: var(--color-teal); flex-shrink: 0; }
        .sv-about__stat-divider { display: none; }
        @media (min-width: 640px) {
          .sv-about__stats-strip {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: nowrap;
          }
          .sv-about__stat { padding: 4px 20px; }
          .sv-about__stat-divider {
            display: block;
            width: 1px;
            height: 18px;
            background: rgba(86,51,17,0.2);
            flex-shrink: 0;
          }
        }
        @media (min-width: 1100px) {
          .sv-about__stat { padding: 4px 24px; }
        }
        .sv-about__inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(28px, 4vw, 44px);
          align-items: start;
        }
        .sv-about__title { margin: 0.5rem 0 1.25rem; }
        .sv-about__text {
          font-family: var(--font-body);
          font-size: clamp(0.92rem, 1.4vw, 1.05rem);
          color: var(--color-text-muted);
          line-height: 1.8;
          margin-bottom: 1rem;
        }
        .sv-about__cta { margin-top: 0.75rem; display: inline-flex; align-items: center; }
        /* Highlights card inside left column */
        .sv-about__highlights-card {
          background: var(--color-bg-secondary);
          border: 1px solid rgba(201,169,110,0.18);
          border-radius: 4px;
          padding: clamp(20px, 3vw, 32px);
          margin-top: 2rem;
        }
        .sv-about__highlights-title {
          font-family: var(--font-nav);
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-espresso);
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid rgba(86,51,17,0.12);
        }
        .sv-highlights { display: flex; flex-direction: column; gap: 10px; }
        .sv-highlights__item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--color-text-body);
          line-height: 1.5;
          padding: 8px 10px;
          border-radius: 3px;
          transition: background 0.2s ease;
        }
        .sv-highlights__item:hover { background: rgba(201,169,110,0.08); }
        .sv-highlights__icon {
          color: var(--color-teal);
          flex-shrink: 0;
          margin-top: 2px;
          background: rgba(201,169,110,0.12);
          padding: 3px;
          border-radius: 50%;
          box-sizing: content-box;
        }
        /* Right image column */
        .sv-about__img-col { display: none; }
        .sv-about__img-wrap {
          position: relative;
          overflow: hidden;
          border-radius: 3px;
          height: 100%;
          min-height: 400px;
        }
        .sv-about__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 600ms ease;
        }
        .sv-about__img-wrap:hover .sv-about__img { transform: scale(1.04); }
        .sv-about__img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(86,51,17,0.18) 0%, transparent 50%);
          pointer-events: none;
        }
        @media (min-width: 900px) {
          .sv-about__inner {
            grid-template-columns: 1.05fr 0.95fr;
            align-items: stretch;
          }
          .sv-about__img-col { display: block; }
        }

        /* ── Gallery ── */
        .sv-gallery__title {
          text-align: center;
          margin: 0.5rem 0 0.75rem;
        }
        .sv-gallery__desc {
          font-family: var(--font-body);
          font-size: clamp(0.9rem, 1.5vw, 1.05rem);
          color: var(--color-text-muted);
          line-height: 1.75;
          max-width: 560px;
          margin: 0 auto 2rem;
          text-align: center;
          font-style: italic;
        }
        .sv-gallery__strip-wrapper {
          position: relative;
        }
        .sv-gallery__track-wrap {
          overflow: hidden;
          cursor: default;
        }
        .sv-gallery__inner {
          display: flex;
          gap: 12px;
          will-change: transform;
        }
        .sv-gallery__item {
          flex-shrink: 0;
          overflow: hidden;
          border-radius: 2px;
        }
        .sv-gallery__img {
          width: 340px;
          height: 300px;
          object-fit: cover;
          display: block;
          transition: transform 500ms ease;
          pointer-events: none;
          user-select: none;
        }
        .sv-gallery__item:hover .sv-gallery__img {
          transform: scale(1.07);
        }
        .sv-gallery__arrow {
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
        .sv-gallery__arrow:hover {
          background: var(--color-teal);
          border-color: var(--color-teal);
          color: #fff;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 4px 20px rgba(201,169,110,0.45);
        }
        .sv-gallery__arrow--prev { left: clamp(8px, 2vw, 20px); }
        .sv-gallery__arrow--next { right: clamp(8px, 2vw, 20px); }
        .sv-gallery__cta-wrap {
          text-align: center;
          padding-top: 2rem;
        }

        /* ── Room Tour Video ── */
        .sv-tour__title {
          text-align: center;
          margin: 0.5rem 0 0.75rem;
        }
        .sv-tour__subtitle {
          font-family: var(--font-body);
          font-size: clamp(0.9rem, 1.4vw, 1rem);
          color: var(--color-text-muted);
          text-align: center;
          margin: 0 auto 2.5rem;
          max-width: 480px;
          line-height: 1.7;
        }
     .sv-tour__frame-wrap {
  display: flex;
  width: 100%;
  justify-content: center;
}

/* Portrait 9:16 video — same as coastal haven */
.sv-tour__frame {
  position: relative;
  width: 100%;
  aspect-ratio: 9/16;   /* match phone portrait ratio */
  background: #000;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 12px 50px rgba(86, 51, 17, 0.2);
}

.sv-tour__frame iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;    /* default for mobile */
  border: none;
}

/* Desktop & laptops — show full video without cropping */
@media (min-width: 1024px) {
  .sv-tour__frame {
    width: 100%;
    max-width: 560px;   /* constrain width so it’s comfortable */
  }
  .sv-tour__frame iframe {
    object-fit: contain; /* show entire video top-to-bottom */
  }
}

/* Mobile — keep full width and cover */
@media (max-width: 640px) {
  .sv-tour__frame {
    max-width: 100%;
    aspect-ratio: 9/16;
  }
}


        .sv-tour__cta-wrap {
          text-align: center;
          margin-top: 2.5rem;
        }

        /* ── Amenities ── */
        .sv-amenities__eyebrow,
        .sv-amenities__title { text-align: center; display: block; }
        .sv-amenities__title { margin: 0.5rem 0 2rem; }
        .sv-amenities__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 20px;
        }
        .sv-amenity {
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
            background-color 0.32s ease,
            transform 0.32s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.32s ease;
        }
        .sv-amenity:hover {
          background-color: var(--color-teal);
          transform: scale(1.06);
          box-shadow: 0 10px 30px rgba(201, 169, 110, 0.32);
        }
        .sv-amenity__icon-wrap {
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
            background 0.32s ease,
            border-color 0.32s ease;
        }
        .sv-amenity:hover .sv-amenity__icon-wrap {
          background: rgba(255, 255, 255, 0.22);
          border-color: rgba(255, 255, 255, 0.45);
        }
        .sv-amenity__icon {
          color: var(--color-teal);
          transition: color 0.32s ease;
        }
        .sv-amenity:hover .sv-amenity__icon {
          color: #fff;
        }
        .sv-amenity__label {
          font-family: var(--font-body);
          font-size: 0.82rem;
          color: var(--color-text-body);
          transition: color 0.32s ease;
        }
        .sv-amenity:hover .sv-amenity__label {
          color: #fff;
        }

        /* ── Policies ── */
        .sv-policies__eyebrow,
        .sv-policies__title { text-align: center; display: block; }
        .sv-policies__title { margin: 0.5rem 0 2rem; }
        .sv-policies__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 16px;
          max-width: 960px;
          margin-inline: auto;
        }
        .sv-policy {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px 20px;
          background: var(--color-bg-primary);
        }
        .sv-policy__icon { color: var(--color-teal); flex-shrink: 0; margin-top: 2px; }
        .sv-policy div { display: flex; flex-direction: column; gap: 2px; }
        .sv-policy__label {
          font-family: var(--font-nav);
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }
        .sv-policy__value {
          font-family: var(--font-body);
          font-size: 0.92rem;
          color: var(--color-espresso);
          font-weight: 500;
        }

        /* ── Inquire ── */
        .sv-inquire__inner { text-align: center; }
        .sv-inquire__eyebrow {
          display: block;
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: clamp(0.75rem, 1.3vw, 0.9rem);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c9a96e;
          margin-bottom: 1rem;
        }
        .sv-inquire__title {
          font-family: var(--font-title);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 400;
          color: #fff;
          margin: 0 0 1rem;
        }
        .sv-inquire__subtitle {
          font-family: var(--font-body);
          font-size: clamp(0.92rem, 1.5vw, 1.05rem);
          color: rgba(255,255,255,0.72);
          max-width: 480px;
          margin: 0 auto 2rem;
          line-height: 1.7;
        }
        .sv-inquire__ctas {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 14px;
        }

        /* ── Suite Preview ── */
        .sv-suites__eyebrow { display: block; }
        .sv-suites__divider {
          display: flex;
          align-items: center;
          gap: 14px;
          max-width: 360px;
          margin: 0.6rem auto 0.8rem;
        }
        .sv-suites__divider-line {
          flex: 1;
          height: 1px;
        }
        .sv-suites__divider-line--left {
          background: linear-gradient(to right, transparent, var(--color-teal));
        }
        .sv-suites__divider-line--right {
          background: linear-gradient(to left, transparent, var(--color-teal));
        }
        .sv-suites__divider-icon {
          width: 2rem;
          height: 2rem;
          opacity: 0.72;
          flex-shrink: 0;
        }
        .sv-suites__title { text-align: center; margin: 0.5rem 0 2.5rem; }
        .sv-suites__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          max-width: 760px;
          margin-inline: auto;
        }
        .sv-suite-card {
          cursor: pointer;
          background: var(--color-bg-primary);
          border: 1px solid rgba(201,169,110,0.18);
          border-radius: 3px;
          overflow: hidden;
          transition: box-shadow 0.35s ease, transform 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .sv-suite-card:hover {
          box-shadow: 0 16px 48px rgba(86,51,17,0.18);
          transform: translateY(-4px);
        }
        .sv-suite-card__img-wrap {
          position: relative;
          overflow: hidden;
          aspect-ratio: 16/9;
        }
        .sv-suite-card__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }
        .sv-suite-card:hover .sv-suite-card__img {
          transform: scale(1.06);
        }
        .sv-suite-card__shutters {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          pointer-events: none;
          z-index: 2;
        }
        .sv-suite-card__shutters span {
          flex: 1;
          background: var(--color-espresso);
          transform: scaleX(1);
          transform-origin: left center;
          transition: transform 0.45s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .sv-suite-card__shutters span:nth-child(2) { transition-delay: 0.05s; }
        .sv-suite-card__shutters span:nth-child(3) { transition-delay: 0.10s; }
        .sv-suite-card__shutters span:nth-child(4) { transition-delay: 0.15s; }
        .sv-suite-card:hover .sv-suite-card__shutters span {
          transform: scaleX(0);
        }
        .sv-suite-card__badge {
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
        .sv-suite-card__body {
          padding: 20px 24px;
          text-align: center;
        }
        .sv-suite-card__tagline {
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-teal);
          margin: 0 0 6px;
        }
        .sv-suite-card__name {
          font-family: var(--font-title);
          font-size: clamp(1.3rem, 2.5vw, 1.8rem);
          font-weight: 400;
          color: var(--color-espresso);
          margin: 0 0 16px;
        }
        .sv-suite-card__btn { display: inline-block; }
        @media (min-width: 760px) {
          .sv-suites__grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </>
  )
}
