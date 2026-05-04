import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Maximize2, BedDouble, Users, Check, Mail, Phone,
  Wifi, Tv, Bath, Waves, Utensils, Calendar, Clock,
  Shield, AirVent, Sparkles, Sofa, Sunrise, UtensilsCrossed,
  Shirt, Fan, PawPrint, Cigarette, ArrowLeft, ArrowRight,
} from 'lucide-react'

import heroImg from '../assets/1bedroom-coastal-haven-suite-preview.JPEG'
import serenityPreview from '../assets/serenity-villa-3bedroomsuite-preview.JPEG'
import { FaUmbrellaBeach } from 'react-icons/fa'
import { GiTowel } from 'react-icons/gi'
import coastalAboutImg from '../assets/coastal-haven-suite-outdoor-view.JPEG'
import cheetahIcon from '../assets/cheetah.png'
import serenityPreviewImg from '../assets/serenity-villa-tv-and-kitchen-view.JPEG'

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

const AMENITIES = [
  { icon: BedDouble,       label: 'King-size bed' },
  { icon: Bath,            label: 'En-suite bathroom' },
  { icon: UtensilsCrossed, label: 'Full kitchenette' },
  { icon: Sofa,            label: 'Private lounge' },
  { icon: Sunrise,         label: 'Balcony' },
  { icon: Waves,           label: 'Pool view' },
  { icon: Wifi,            label: 'High-speed Wi-Fi' },
  { icon: Sparkles,        label: 'Daily housekeeping' },
  { icon: AirVent,         label: 'Air conditioning' },
  { icon: Tv,              label: 'Smart TV' },
  { icon: Utensils,        label: 'In-suite dining' },
  { icon: Shirt,           label: 'Premium linens' },
  { icon: FaUmbrellaBeach, label: 'Sunbeds' },
  { icon: GiTowel,         label: 'Towels provided' },
  { icon: Fan,             label: 'Ceiling fans' },
]

const POLICIES = [
  { icon: Clock,     label: 'Check-in',      value: '2:00 PM' },
  { icon: Clock,     label: 'Check-out',     value: '10:00 AM' },
  { icon: Calendar,  label: 'Minimum stay',  value: '2 nights' },
  { icon: Shield,    label: 'Cancellation',  value: '1 month notice · 50% refund + 50% redeemable within 6 months' },
  { icon: PawPrint,  label: 'Pets',          value: 'Small pets welcome' },
  { icon: Cigarette, label: 'Smoking',       value: 'Balcony & lobby only' },
]

const HIGHLIGHTS = [
  'Stunning ocean and pool vistas',
  'Elegant king-size bed with premium linens',
  'Fully equipped kitchenette for in-suite dining',
  'En-suite bathroom with rain shower',
  'Private lounge with smart TV',
  'Daily housekeeping and turndown service',
]

const TOUR_VIDEO_BASE =
  'https://player.vimeo.com/video/1188952533' +
  '?badge=0&autopause=0&player_id=0&app_id=58479' +
  '&byline=0&title=0&portrait=0&muted=1&dnt=1'

const INTRO_VIDEO_BASE =
  'https://player.vimeo.com/video/1189029033' +
  '?badge=0&autopause=0&player_id=0&app_id=58479' +
  '&byline=0&title=0&portrait=0&muted=1&dnt=1'

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

  // Video pause-on-scroll logic
  const tourIframeRef = useRef(null)
  const tourHasPlayedRef = useRef(false)
  const [tourVideoSrc, setTourVideoSrc] = useState(TOUR_VIDEO_BASE)

  // Lower threshold → pauses sooner when scrolled out of view
  const { ref: tourRef, inView: tourInView } = useInView({ threshold: 0.15 })

  const introIframeRef = useRef(null)
  const introHasPlayedRef = useRef(false)
  const [introVideoSrc, setIntroVideoSrc] = useState(INTRO_VIDEO_BASE)
  const { ref: introRef, inView: introInView } = useInView({ threshold: 0.15 })

  useEffect(() => {
    const post = (method, value) => {
      const msg = value !== undefined ? { method, value } : { method }
      tourIframeRef.current?.contentWindow?.postMessage(
        JSON.stringify(msg), 'https://player.vimeo.com'
      )
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

  useEffect(() => {
    const post = (method, value) => {
      const msg = value !== undefined ? { method, value } : { method }
      introIframeRef.current?.contentWindow?.postMessage(JSON.stringify(msg), 'https://player.vimeo.com')
    }
    if (introInView) {
      if (!introHasPlayedRef.current) {
        introHasPlayedRef.current = true
        setIntroVideoSrc(`${INTRO_VIDEO_BASE}&autoplay=1&loop=1`)
      } else {
        post('play')
      }
    } else if (introHasPlayedRef.current) {
      post('pause')
    }
  }, [introInView])

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

  // Subscribe to the finish event once the player is ready
  const handleTourIframeLoad = () => {
    setTimeout(() => {
      tourIframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ method: 'addEventListener', value: 'finish' }),
        'https://player.vimeo.com'
      )
    }, 500)
  }

  const handleIntroIframeLoad = () => {
    setTimeout(() => {
      introIframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ method: 'addEventListener', value: 'finish' }),
        'https://player.vimeo.com'
      )
    }, 500)
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
        <title>Coastal Haven Suite | Duma Suites Watamu</title>
        <meta name="description" content="1-Bedroom Coastal Haven Suite at Duma Suites, Watamu. Intimate luxury with pool views, king bed, kitchenette and private lounge." />
      </Helmet>

      <main id="coastal-haven-page">

        {/* ── a) Hero ── */}
        <section className="ch-hero">
          <img src={heroImg} alt="Coastal Haven Suite outdoor view" className="ch-hero__bg" />
          <div className="ch-hero__content">
            <motion.span
              className="ch-hero__eyebrow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            >
              1-Bedroom Suite
            </motion.span>
            <motion.h1
              className="ch-hero__title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              Coastal Haven Suite
            </motion.h1>
            <motion.p
              className="ch-hero__tagline"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              Intimate coastal luxury with ocean and pool views
            </motion.p>
            <motion.div
              className="ch-hero__ctas"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42, ease: [0.4, 0, 0.2, 1] }}
            >
              <a href="#inquire" className="btn btn-primary">Book a Stay</a>
              <a href="#gallery" className="btn btn-inverse-light">View Gallery</a>
            </motion.div>
          </div>
        </section>

        {/* ── NEW: Intro Video Section ── */}
        <section className="ch-intro section" id="intro">
          <div className="ch-intro__inner container">
            <motion.span className="eyebrow ch-intro__eyebrow" {...fadeUp(0)}>
              Experience Duma Suites
            </motion.span>
            <motion.h2 className="section-title ch-intro__title" {...fadeUp(0.1)}>
              A Glimpse of What Awaits
            </motion.h2>
            <motion.p className="ch-intro__desc" {...fadeUp(0.18)}>
              Discover the spirit of Duma Suites — where coastal luxury meets effortless serenity.
            </motion.p>
            <motion.div className="ch-intro__video-wrap" {...fadeUp(0.26)} ref={introRef}>
              <div className="ch-intro__video-frame">
                <iframe
                  ref={introIframeRef}
                  src={introVideoSrc}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                  title="duma-suites-intro"
                  onLoad={handleIntroIframeLoad}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── b) About ── */}
        <section className="ch-about section" id="about">
          <div className="container">
            {/* At-a-glance stats strip */}
            <motion.div className="ch-about__stats-strip" {...fadeUp(0)}>
              <div className="ch-about__stat"><Maximize2 size={15} strokeWidth={1.5} /><span>25 sq m</span></div>
              <div className="ch-about__stat-divider" aria-hidden="true" />
              <div className="ch-about__stat"><BedDouble size={15} strokeWidth={1.5} /><span>1 King Bed</span></div>
              <div className="ch-about__stat-divider" aria-hidden="true" />
              <div className="ch-about__stat"><Users size={15} strokeWidth={1.5} /><span>2+ Guests</span></div>
              <div className="ch-about__stat-divider" aria-hidden="true" />
              <div className="ch-about__stat"><Calendar size={15} strokeWidth={1.5} /><span>2 Night Min</span></div>
            </motion.div>

            <div className="ch-about__inner">
              {/* Left: text */}
              <motion.div className="ch-about__left" {...fadeUp(0.08)}>
                <span className="eyebrow">About this Suite</span>
                <h2 className="section-title ch-about__title">An Intimate Coastal Retreat</h2>
                <p className="ch-about__text">
                  The Coastal Haven Suite is a beautifully appointed one-bedroom sanctuary nestled within Ghepard Towers,
                  offering sweeping views of the infinity pool and the Indian Ocean beyond. Crafted for couples and solo
                  travellers seeking a refined escape, every detail has been considered — from the plush king-size bed
                  to the fully equipped kitchenette and private lounge.
                </p>
                <p className="ch-about__text">
                  Wake to golden morning light filtering through floor-to-ceiling windows, and unwind evenings on your
                  private balcony as the ocean breeze rolls in. This is coastal luxury, distilled.
                </p>
                <a href="#inquire" className="btn btn-primary ch-about__cta">Check Availability</a>
              </motion.div>

              {/* Center: atmospheric image */}
              <motion.div className="ch-about__img-col" {...fadeUp(0.16)}>
                <div className="ch-about__img-wrap">
                  <img src={coastalAboutImg} alt="Coastal Haven outdoor view" className="ch-about__img" />
                  <div className="ch-about__img-overlay" aria-hidden="true" />
                </div>
              </motion.div>

              {/* Right: highlights card */}
              <motion.div className="ch-about__right" {...fadeUp(0.22)}>
                <div className="ch-about__highlights-card">
                  <h3 className="ch-about__highlights-title">Suite Highlights</h3>
                  <ul className="ch-highlights">
                    {HIGHLIGHTS.map((h) => (
                      <li key={h} className="ch-highlights__item">
                        <Check size={14} strokeWidth={1.75} className="ch-highlights__icon" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── c) Gallery ── */}
        <section className="ch-gallery section section--secondary" id="gallery">
          <div className="container">
            <motion.span className="eyebrow text-center" {...fadeUp(0)}>
              Photo Gallery
            </motion.span>
            <motion.h2 className="section-title ch-gallery__title" {...fadeUp(0.1)}>
              Inside the Suite
            </motion.h2>
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
              Book a Stay
            </motion.a>
          </div>
        </section>

        {/* ── d) Room Tour Video ── */}
        <section className="ch-tour section" id="room-tour">
          <div className="container">
            <motion.span className="eyebrow text-center" {...fadeUp(0)}>
              Room Tour
            </motion.span>
            <motion.h2 className="section-title ch-tour__title" {...fadeUp(0.1)}>
              Experience the Suite
            </motion.h2>
            <motion.p className="ch-tour__subtitle" {...fadeUp(0.18)}>
              Take a cinematic walkthrough of your coastal retreat.
            </motion.p>
            <motion.div className="ch-tour__frame-wrap" {...fadeUp(0.26)} ref={tourRef}>
              {/* Vertical 9:16 video — constrained width for portrait display */}
              <div className="ch-tour__frame">
                <iframe
                  ref={tourIframeRef}
                  src={tourVideoSrc}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                  title="coastal-haven-suite-room-tour"
                  onLoad={handleTourIframeLoad}
                />
              </div>
            </motion.div>
          </div>
        </section>
        <section className="ch-amenities section" id="amenities">
          <div className="container">
            <motion.span className="eyebrow text-center ch-amenities__eyebrow" {...fadeUp(0)}>
              What's Included
            </motion.span>
            <motion.h2 className="section-title ch-amenities__title" {...fadeUp(0.1)}>
              Suite Amenities
            </motion.h2>
            <div className="ch-amenities__grid">
              {AMENITIES.map(({ icon: Icon, label }, i) => (
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
              ))}
            </div>
          </div>
        </section>

        {/* ── e) Policies ── */}
        <section className="ch-policies section section--secondary" id="policies">
          <div className="container">
            <motion.span className="eyebrow text-center ch-policies__eyebrow" {...fadeUp(0)}>
              Policies &amp; Check-in
            </motion.span>
            <motion.h2 className="section-title ch-policies__title" {...fadeUp(0.1)}>
              Know Before You Go
            </motion.h2>
            <motion.div className="ch-policies__grid" {...fadeUp(0.2)}>
              {POLICIES.map(({ icon: Icon, label, value }) => (
                <div key={label} className="ch-policy">
                  <Icon size={18} strokeWidth={1.5} className="ch-policy__icon" />
                  <div>
                    <span className="ch-policy__label">{label}</span>
                    <span className="ch-policy__value">{value}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── f) Inquire ── */}
        <section className="ch-inquire section section--dark" id="inquire">
          <div className="container ch-inquire__inner">
            <motion.span className="ch-inquire__eyebrow" {...fadeUp(0)}>
              Reservations
            </motion.span>
            <motion.h2 className="ch-inquire__title" {...fadeUp(0.1)}>
              Reserve Your Stay
            </motion.h2>
            <motion.p className="ch-inquire__subtitle" {...fadeUp(0.2)}>
              Ready to experience coastal luxury? Contact us to check availability and rates.
            </motion.p>
            <motion.div className="ch-inquire__ctas" {...fadeUp(0.3)}>
              <a href="mailto:reservations@dumasuites.com" className="btn btn-primary">
                <Mail size={16} strokeWidth={1.5} />
                Email Us
              </a>
              <a href="tel:+254700000000" className="btn btn-inverse-light">
                <Phone size={16} strokeWidth={1.5} />
                Call / WhatsApp
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── g) Suite Preview — all suites ── */}
        <section className="ch-suites section section--secondary" id="all-suites">
          <div className="container">
            <motion.span className="eyebrow text-center ch-suites__eyebrow" {...fadeUp(0)}>
              Our Suites
            </motion.span>

            {/* Cheetah icon divider */}
            <motion.div className="ch-suites__divider" {...fadeUp(0.08)} aria-hidden="true">
              <span className="ch-suites__divider-line ch-suites__divider-line--left" />
              <img src={cheetahIcon} alt="" className="ch-suites__divider-icon" />
              <span className="ch-suites__divider-line ch-suites__divider-line--right" />
            </motion.div>

            <motion.h2 className="section-title ch-suites__title" {...fadeUp(0.15)}>
              Explore All Suites
            </motion.h2>

            <div className="ch-suites__grid">
              {/* Coastal Haven card */}
              <motion.div className="ch-suite-card" {...fadeUp(0.22)} onClick={() => navigate('/suites/coastal-haven')} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate('/suites/coastal-haven') } }}>
                <div className="ch-suite-card__img-wrap">
                  <img src={heroImg} alt="Coastal Haven Suite" className="ch-suite-card__img" />
                  {/* Shutter overlay — 4 horizontal shutters */}
                  <div className="ch-suite-card__shutters" aria-hidden="true">
                    <span /><span /><span /><span />
                  </div>
                  <div className="ch-suite-card__badge">Current Suite</div>
                </div>
                <div className="ch-suite-card__body">
                  <p className="ch-suite-card__tagline">1-Bedroom · Intimate Coastal Retreat</p>
                  <h3 className="ch-suite-card__name">Coastal Haven Suite</h3>
                  <a href="/suites/coastal-haven" className="btn btn-inverse ch-suite-card__btn" onClick={e => { e.stopPropagation(); navigate('/suites/coastal-haven') }}>
                    View Suite →
                  </a>
                </div>
              </motion.div>

              {/* Serenity Villa card */}
              <motion.div className="ch-suite-card" {...fadeUp(0.32)} onClick={() => navigate('/suites/serenity-villa')} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate('/suites/serenity-villa') } }}>
                <div className="ch-suite-card__img-wrap">
                  <img src={serenityPreviewImg} alt="Serenity Villa Suite" className="ch-suite-card__img" />
                  <div className="ch-suite-card__shutters" aria-hidden="true">
                    <span /><span /><span /><span />
                  </div>
                </div>
                <div className="ch-suite-card__body">
                  <p className="ch-suite-card__tagline">3-Bedroom · Luxury Family Retreat</p>
                  <h3 className="ch-suite-card__name">Serenity Villa Suite</h3>
                  <a href="/suites/serenity-villa" className="btn btn-inverse ch-suite-card__btn" onClick={e => { e.stopPropagation(); navigate('/suites/serenity-villa') }}>
                    View Suite →
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
          height: 88vh;
          min-height: 520px;
          display: flex;
          align-items: flex-end;
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
        .ch-hero__content {
          position: relative;
          z-index: 1;
          background: rgba(22, 14, 6, 0.78);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          padding: clamp(14px, 2vw, 20px) clamp(18px, 2.5vw, 28px);
          margin: 0 clamp(20px, 5vw, 80px) clamp(32px, 5vh, 64px);
          max-width: 520px;
        }
        .ch-hero__eyebrow {
          display: block;
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: clamp(0.65rem, 1.1vw, 0.82rem);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-teal);
          margin-bottom: 0.6rem;
        }
        .ch-hero__title {
          font-family: var(--font-title);
          font-size: clamp(2rem, 5.5vw, 4.2rem);
          font-weight: 400;
          color: #fff;
          line-height: 1.05;
          margin: 0 0 0.65rem;
        }
        .ch-hero__tagline {
          font-family: var(--font-body);
          font-size: clamp(0.8rem, 1.3vw, 0.95rem);
          color: rgba(255,255,255,0.78);
          margin: 0 0 1.25rem;
          line-height: 1.5;
        }
        .ch-hero__ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        @media (min-width: 768px) and (max-width: 1199px) {
          .ch-hero { height: 76vh; }
        }
        @media (max-width: 767px) {
          .ch-hero { height: 66vh; }
          .ch-hero__content { max-width: 100%; margin: 0 16px 28px; }
        }

        /* ── Intro Video Section ── */
        .ch-intro__inner {
          max-width: 1100px;
          text-align: center;
        }
        .ch-intro__eyebrow { display: block; }
        .ch-intro__title { margin: 0.5rem 0 1rem; }
        .ch-intro__desc {
          font-family: var(--font-body);
          font-size: clamp(0.92rem, 1.4vw, 1.05rem);
          color: var(--color-text-muted);
          max-width: 65%;
          margin: 0 auto 2.5rem;
          line-height: 1.75;
        }
        .ch-intro__video-wrap {
          max-width: 1000px;
          margin-inline: auto;
        }
        .ch-intro__video-frame {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%;
          border-radius: 4px;
          overflow: hidden;
          background: #000;
          box-shadow: 0 16px 64px rgba(86, 51, 17, 0.2);
        }
        .ch-intro__video-frame iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
        }
        @media (max-width: 768px) {
          .ch-intro__desc { max-width: 90%; }
        }

        /* ── About ── */
        .ch-about__stats-strip {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
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
          gap: 7px;
          font-family: var(--font-nav);
          font-size: 0.64rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-espresso);
          padding: 4px 20px;
        }
        .ch-about__stat svg { color: var(--color-teal); flex-shrink: 0; }
        .ch-about__stat-divider {
          width: 1px;
          height: 18px;
          background: rgba(86,51,17,0.2);
          flex-shrink: 0;
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
        .ch-about__cta { margin-top: 0.75rem; display: inline-block; }
        /* Center image column */
        .ch-about__img-col { display: none; }
        .ch-about__img-wrap {
          position: relative;
          overflow: hidden;
          border-radius: 3px;
          aspect-ratio: 3/4;
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
        /* Right: highlights card */
        .ch-about__highlights-card {
          background: var(--color-bg-secondary);
          border: 1px solid rgba(201,169,110,0.18);
          border-radius: 4px;
          padding: clamp(20px, 3vw, 32px);
        }
        .ch-about__highlights-title {
          font-family: var(--font-nav);
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-espresso);
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid rgba(86,51,17,0.12);
        }
        .ch-highlights { display: flex; flex-direction: column; gap: 10px; }
        .ch-highlights__item {
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
        .ch-highlights__item:hover { background: rgba(201,169,110,0.08); }
        .ch-highlights__icon {
          color: var(--color-teal);
          flex-shrink: 0;
          margin-top: 2px;
          background: rgba(201,169,110,0.12);
          padding: 3px;
          border-radius: 50%;
          box-sizing: content-box;
        }
        @media (min-width: 900px) {
          .ch-about__inner {
            grid-template-columns: 1fr 1fr;
          }
          .ch-about__img-col { display: block; }
        }
        @media (min-width: 1100px) {
          .ch-about__inner {
            grid-template-columns: 1.1fr 0.7fr 1fr;
          }
          .ch-about__stat { padding: 4px 24px; }
        }

        /* ── Gallery ── */
        .ch-gallery__title {
          text-align: center;
          margin: 0.5rem 0 2rem;
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
          height: 260px;
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
        .ch-tour__frame-wrap {
          display: flex;
          justify-content: center;
        }
        /* Portrait 9:16 video — constrained to a comfortable width */
        .ch-tour__frame {
          position: relative;
          width: 100%;
          max-width: 420px;
          padding-bottom: min(177.78%, 100vh);
          background: #000;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 12px 50px rgba(86, 51, 17, 0.2);
        }
        .ch-tour__frame iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
        }
        @media (min-width: 1024px) {
          .ch-tour__frame { max-width: 560px; }
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
            background-color 0.32s ease,
            transform 0.32s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.32s ease;
        }
        .ch-amenity:hover {
          background-color: var(--color-teal);
          transform: scale(1.06);
          box-shadow: 0 10px 30px rgba(201, 169, 110, 0.32);
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
            background 0.32s ease,
            border-color 0.32s ease;
        }
        .ch-amenity:hover .ch-amenity__icon-wrap {
          background: rgba(255, 255, 255, 0.22);
          border-color: rgba(255, 255, 255, 0.45);
        }
        .ch-amenity__icon {
          color: var(--color-teal);
          transition: color 0.32s ease;
        }
        .ch-amenity:hover .ch-amenity__icon {
          color: #fff;
        }
        .ch-amenity__label {
          font-family: var(--font-body);
          font-size: 0.82rem;
          color: var(--color-text-body);
          transition: color 0.32s ease;
        }
        .ch-amenity:hover .ch-amenity__label {
          color: #fff;
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
          font-size: clamp(0.7rem, 1.2vw, 0.85rem);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-teal);
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
        .ch-suite-card__shutters {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          pointer-events: none;
          z-index: 2;
        }
        .ch-suite-card__shutters span {
          flex: 1;
          background: var(--color-espresso);
          transform: scaleX(1);
          transform-origin: left center;
          transition: transform 0.45s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .ch-suite-card__shutters span:nth-child(2) { transition-delay: 0.05s; }
        .ch-suite-card__shutters span:nth-child(3) { transition-delay: 0.10s; }
        .ch-suite-card__shutters span:nth-child(4) { transition-delay: 0.15s; }
        .ch-suite-card:hover .ch-suite-card__shutters span {
          transform: scaleX(0);
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
