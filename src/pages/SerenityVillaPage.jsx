import { useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  Maximize2, BedDouble, Users, Check, Mail, Phone,
  Wifi, Tv, Bath, Utensils, Leaf, Calendar, Clock,
  Shield, AirVent, Sparkles, Sofa, Sunrise, UtensilsCrossed,
  Sun, Fan, PawPrint, Cigarette, ArrowLeft, ArrowRight,
} from 'lucide-react'

import heroImg from '../assets/serenity-villa-outdoor-terrace.JPEG'
import coastalPreview from '../assets/1bedroom-coastal-haven-suite-preview.JPEG'
import { FaUmbrellaBeach } from 'react-icons/fa'
import { GiTowel } from 'react-icons/gi'
import serenityAboutImg from '../assets/serenity-villa-outdoor-lounge-upclose.JPEG'

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

const AMENITIES = [
  { icon: BedDouble,       label: '3 King bedrooms' },
  { icon: Bath,            label: 'Multiple en-suites' },
  { icon: Utensils,        label: 'Full kitchen' },
  { icon: Sun,             label: 'Outdoor terrace' },
  { icon: Leaf,            label: 'Garden views' },
  { icon: UtensilsCrossed, label: 'Formal dining area' },
  { icon: Sofa,            label: 'Living room' },
  { icon: Sunrise,         label: 'Spacious balcony' },
  { icon: Wifi,            label: 'High-speed Wi-Fi' },
  { icon: Sparkles,        label: 'Daily housekeeping' },
  { icon: AirVent,         label: 'Air conditioning' },
  { icon: Tv,              label: 'Smart TVs' },
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
  'Three spacious king bedrooms',
  'Multiple en-suite bathrooms',
  'Fully-equipped kitchen for self-catering',
  'Private outdoor terrace with garden views',
  'Multiple lounges and dining areas',
  'Spacious balcony for sunset evenings',
  'Daily housekeeping and turndown service',
]

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
        <title>Serenity Villa Suite | Duma Suites Watamu</title>
        <meta name="description" content="3-Bedroom Serenity Villa Suite at Duma Suites, Watamu. Spacious luxury villa with full kitchen, outdoor terrace and garden views." />
      </Helmet>

      <main id="serenity-villa-page">

        {/* ── a) Hero ── */}
        <section className="sv-hero">
          <img src={heroImg} alt="Serenity Villa outdoor terrace" className="sv-hero__bg" />
          <div className="sv-hero__overlay" />
          <div className="sv-hero__content">
            <motion.span className="sv-hero__eyebrow" {...fadeUp(0.1)}>
              3-Bedroom Villa
            </motion.span>
            <motion.h1 className="sv-hero__title" {...fadeUp(0.22)}>
              Serenity Villa Suite
            </motion.h1>
            <motion.div className="sv-hero__specs" {...fadeUp(0.34)}>
              <span><Maximize2 size={14} strokeWidth={1.5} />75 sq m</span>
              <span><BedDouble size={14} strokeWidth={1.5} />3 King Beds</span>
              <span><Users size={14} strokeWidth={1.5} />6+ Guests</span>
            </motion.div>
            <motion.div className="sv-hero__ctas" {...fadeUp(0.44)}>
              <a href="#inquire" className="btn btn-primary">Book a Stay</a>
              <a href="#gallery" className="btn btn-inverse-light">View Gallery</a>
            </motion.div>
          </div>
        </section>

        {/* ── b) About ── */}
        <section className="sv-about section" id="about">
          <div className="container">
            {/* At-a-glance stats strip */}
            <motion.div className="sv-about__stats-strip" {...fadeUp(0)}>
              <div className="sv-about__stat"><Maximize2 size={15} strokeWidth={1.5} /><span>75 sq m</span></div>
              <div className="sv-about__stat-divider" aria-hidden="true" />
              <div className="sv-about__stat"><BedDouble size={15} strokeWidth={1.5} /><span>3 King Beds</span></div>
              <div className="sv-about__stat-divider" aria-hidden="true" />
              <div className="sv-about__stat"><Users size={15} strokeWidth={1.5} /><span>6+ Guests</span></div>
              <div className="sv-about__stat-divider" aria-hidden="true" />
              <div className="sv-about__stat"><Calendar size={15} strokeWidth={1.5} /><span>2 Night Min</span></div>
            </motion.div>

            <div className="sv-about__inner">
              {/* Left: text */}
              <motion.div className="sv-about__left" {...fadeUp(0.08)}>
                <span className="eyebrow">About this Villa</span>
                <h2 className="section-title sv-about__title">A Sprawling Family Retreat</h2>
                <p className="sv-about__text">
                  The Serenity Villa Suite redefines space and comfort within Ghepard Towers. This expansive
                  three-bedroom villa is designed for families and groups who refuse to compromise on luxury —
                  offering a full kitchen, multiple en-suite bathrooms, a sweeping outdoor terrace, and lush
                  garden views at every turn.
                </p>
                <p className="sv-about__text">
                  Gather around the formal dining table, relax in the indoor lounge, or step out onto the
                  private terrace for a morning coffee surrounded by the sights and sounds of Watamu's
                  coastline. This is the full villa experience — refined, spacious, and unforgettable.
                </p>
                <a href="#inquire" className="btn btn-primary sv-about__cta">Check Availability</a>
              </motion.div>

              {/* Center: atmospheric image */}
              <motion.div className="sv-about__img-col" {...fadeUp(0.16)}>
                <div className="sv-about__img-wrap">
                  <img src={serenityAboutImg} alt="Serenity Villa outdoor lounge" className="sv-about__img" />
                  <div className="sv-about__img-overlay" aria-hidden="true" />
                </div>
              </motion.div>

              {/* Right: highlights card */}
              <motion.div className="sv-about__right" {...fadeUp(0.22)}>
                <div className="sv-about__highlights-card">
                  <h3 className="sv-about__highlights-title">Villa Highlights</h3>
                  <ul className="sv-highlights">
                    {HIGHLIGHTS.map((h) => (
                      <li key={h} className="sv-highlights__item">
                        <Check size={14} strokeWidth={2.5} className="sv-highlights__icon" />
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
        <section className="sv-gallery section section--secondary" id="gallery">
          <div className="container">
            <motion.span className="eyebrow text-center" {...fadeUp(0)}>
              Photo Gallery
            </motion.span>
            <motion.h2 className="section-title sv-gallery__title" {...fadeUp(0.1)}>
              Inside the Villa
            </motion.h2>
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
              Book a Stay
            </motion.a>
          </div>
        </section>

        {/* ── d) Amenities ── */}
        <section className="sv-amenities section" id="amenities">
          <div className="container">
            <motion.span className="eyebrow text-center sv-amenities__eyebrow" {...fadeUp(0)}>
              What's Included
            </motion.span>
            <motion.h2 className="section-title sv-amenities__title" {...fadeUp(0.1)}>
              Villa Amenities
            </motion.h2>
            <div className="sv-amenities__grid">
              {AMENITIES.map(({ icon: Icon, label }, i) => (
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
              ))}
            </div>
          </div>
        </section>

        {/* ── e) Policies ── */}
        <section className="sv-policies section section--secondary" id="policies">
          <div className="container">
            <motion.span className="eyebrow text-center sv-policies__eyebrow" {...fadeUp(0)}>
              Policies &amp; Check-in
            </motion.span>
            <motion.h2 className="section-title sv-policies__title" {...fadeUp(0.1)}>
              Know Before You Go
            </motion.h2>
            <motion.div className="sv-policies__grid" {...fadeUp(0.2)}>
              {POLICIES.map(({ icon: Icon, label, value }) => (
                <div key={label} className="sv-policy">
                  <Icon size={18} strokeWidth={1.5} className="sv-policy__icon" />
                  <div>
                    <span className="sv-policy__label">{label}</span>
                    <span className="sv-policy__value">{value}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── f) Inquire ── */}
        <section className="sv-inquire section section--dark" id="inquire">
          <div className="container sv-inquire__inner">
            <motion.span className="sv-inquire__eyebrow" {...fadeUp(0)}>
              Reservations
            </motion.span>
            <motion.h2 className="sv-inquire__title" {...fadeUp(0.1)}>
              Reserve Your Stay
            </motion.h2>
            <motion.p className="sv-inquire__subtitle" {...fadeUp(0.2)}>
              Ready to experience coastal luxury? Contact us to check availability and rates.
            </motion.p>
            <motion.div className="sv-inquire__ctas" {...fadeUp(0.3)}>
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

        {/* ── g) More Suites ── */}
        <section className="sv-more section section--secondary" id="more-suites">
          <div className="container">
            <motion.span className="eyebrow text-center sv-more__eyebrow" {...fadeUp(0)}>
              Continue Exploring
            </motion.span>
            <motion.h2 className="section-title sv-more__title" {...fadeUp(0.1)}>
              Explore More
            </motion.h2>
            <motion.div
              className="sv-more__card"
              {...fadeUp(0.2)}
              onClick={() => navigate('/suites/coastal-haven')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate('/suites/coastal-haven')}
            >
              <div className="sv-more__img-wrap">
                <img src={coastalPreview} alt="Coastal Haven Suite" className="sv-more__img" />
                <div className="sv-more__overlay">
                  <p className="sv-more__tagline">1-Bedroom · Intimate Coastal Retreat</p>
                  <h3 className="sv-more__name">Coastal Haven Suite</h3>
                  <div className="sv-more__specs">
                    <span><Maximize2 size={13} strokeWidth={1.5} />25 sq m</span>
                    <span><BedDouble size={13} strokeWidth={1.5} />1 King Bed</span>
                    <span><Users size={13} strokeWidth={1.5} />2+ Guests</span>
                  </div>
                </div>
              </div>
              <div className="sv-more__footer">
                <a href="/suites/coastal-haven" className="btn btn-inverse sv-more__btn">
                  View Suite
                </a>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <style>{`
        /* ── Hero ── */
        .sv-hero {
          position: relative;
          height: 90vh;
          min-height: 520px;
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
        }
        .sv-hero__overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.35);
        }
        .sv-hero__content {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 0 var(--section-px);
        }
        .sv-hero__eyebrow {
          display: block;
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: clamp(0.7rem, 1.2vw, 0.9rem);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-teal);
          margin-bottom: 1rem;
        }
        .sv-hero__title {
          font-family: var(--font-title);
          font-size: clamp(2.5rem, 7vw, 5.5rem);
          font-weight: 400;
          color: #fff;
          line-height: 1.05;
          margin: 0 0 1.25rem;
        }
        .sv-hero__specs {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px 24px;
          margin-bottom: 2rem;
        }
        .sv-hero__specs span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-body);
          font-size: 0.88rem;
          color: rgba(255,255,255,0.88);
        }
        .sv-hero__specs svg { color: var(--color-teal); }
        .sv-hero__ctas {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
        }

        /* ── About ── */
        .sv-about__stats-strip {
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
        .sv-about__stat {
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
        .sv-about__stat svg { color: var(--color-teal); flex-shrink: 0; }
        .sv-about__stat-divider {
          width: 1px;
          height: 18px;
          background: rgba(86,51,17,0.2);
          flex-shrink: 0;
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
        .sv-about__cta { margin-top: 0.75rem; display: inline-block; }
        /* Center image column */
        .sv-about__img-col { display: none; }
        .sv-about__img-wrap {
          position: relative;
          overflow: hidden;
          border-radius: 3px;
          aspect-ratio: 3/4;
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
        /* Right: highlights card */
        .sv-about__highlights-card {
          background: var(--color-bg-secondary);
          border: 1px solid rgba(201,169,110,0.18);
          border-radius: 4px;
          padding: clamp(20px, 3vw, 32px);
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
        @media (min-width: 900px) {
          .sv-about__inner {
            grid-template-columns: 1fr 1fr;
          }
          .sv-about__img-col { display: block; }
        }
        @media (min-width: 1100px) {
          .sv-about__inner {
            grid-template-columns: 1.1fr 0.7fr 1fr;
          }
          .sv-about__stat { padding: 4px 24px; }
        }

        /* ── Gallery ── */
        .sv-gallery__title {
          text-align: center;
          margin: 0.5rem 0 2rem;
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
          height: 260px;
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
          font-size: clamp(0.7rem, 1.2vw, 0.85rem);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-teal);
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

        /* ── More Suites ── */
        .sv-more__eyebrow,
        .sv-more__title { text-align: center; display: block; }
        .sv-more__title { margin: 0.5rem 0 2rem; }
        .sv-more__card {
          max-width: 640px;
          margin-inline: auto;
          cursor: pointer;
        }
        .sv-more__img-wrap {
          position: relative;
          overflow: hidden;
        }
        .sv-more__img {
          width: 100%;
          height: 380px;
          object-fit: cover;
          display: block;
          transition: transform 600ms ease;
        }
        .sv-more__card:hover .sv-more__img { transform: scale(1.04); }
        .sv-more__overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          padding: 20px 24px;
          max-width: 380px;
          background: linear-gradient(
            to right,
            rgba(0,0,0,0.52) 0%,
            rgba(0,0,0,0.18) 70%,
            transparent 100%
          );
        }
        .sv-more__tagline {
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.85);
          margin: 0 0 5px;
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
        }
        .sv-more__name {
          font-family: var(--font-title);
          font-size: clamp(1.2rem, 2.5vw, 1.7rem);
          font-weight: 600;
          color: #fff;
          margin: 0 0 8px;
          text-shadow: 0 2px 8px rgba(0,0,0,0.4);
        }
        .sv-more__specs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 14px;
        }
        .sv-more__specs span {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: rgba(255,255,255,0.88);
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
        }
        .sv-more__specs svg { color: rgba(255,255,255,0.7); }
        .sv-more__footer {
          padding: 16px 0 0;
          display: flex;
          justify-content: center;
        }

        @media (max-width: 639px) {
          .sv-hero { height: 85vh; }
          .sv-more__img { height: 260px; }
          .sv-more__overlay {
            max-width: 100%;
            background: linear-gradient(
              to top,
              rgba(0,0,0,0.48) 0%,
              rgba(0,0,0,0.12) 65%,
              transparent 100%
            );
          }
        }
      `}</style>
    </>
  )
}
