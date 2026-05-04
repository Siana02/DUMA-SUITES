import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  Maximize2, BedDouble, Users, Check, Mail, Phone,
  Wifi, Wind, Tv, Coffee, Bath, Waves, Utensils, Calendar, Clock,
  Home, Mountain, Star, Leaf, Shield, Heart,
} from 'lucide-react'

import heroImg from '../assets/1bedroom-coastal-haven-suite-preview.JPEG'
import serenityPreview from '../assets/serenity-villa-3bedroomsuite-preview.JPEG'

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
const GALLERY_LABELS = [
  'King bed','King bed side view','King bed side view 2','Bedroom interior',
  'Breakfast counter','Kitchenette','Kitchenette lounge area',
  'Lounge couch','Lounge couch close-up','TV area close-up',
  'Outdoor view','Outside chair','Outside room view','Night pool view',
  'Entrance from inside','Kitchen to bedroom door','Closet area',
  'Shower','Washroom',
]

const AMENITIES = [
  { icon: BedDouble,  label: 'King-size bed' },
  { icon: Bath,       label: 'En-suite bathroom' },
  { icon: Coffee,     label: 'Full kitchenette' },
  { icon: Home,       label: 'Private lounge' },
  { icon: Mountain,   label: 'Balcony' },
  { icon: Waves,      label: 'Pool view' },
  { icon: Wifi,       label: 'High-speed Wi-Fi' },
  { icon: Star,       label: 'Daily housekeeping' },
  { icon: Wind,       label: 'Air conditioning' },
  { icon: Tv,         label: 'Smart TV' },
  { icon: Utensils,   label: 'In-suite dining' },
  { icon: Leaf,       label: 'Premium linens' },
]

const POLICIES = [
  { icon: Clock,    label: 'Check-in',      value: '2:00 PM' },
  { icon: Clock,    label: 'Check-out',     value: '10:00 AM' },
  { icon: Calendar, label: 'Minimum stay',  value: '2 nights' },
  { icon: Shield,   label: 'Cancellation',  value: '1 month notice · 50% refund + 50% redeemable within 6 months' },
  { icon: Heart,    label: 'Pets',          value: 'Small pets welcome' },
  { icon: Wind,     label: 'Smoking',       value: 'Balcony & lobby only' },
]

const HIGHLIGHTS = [
  'Stunning ocean and pool vistas',
  'Elegant king-size bed with premium linens',
  'Fully equipped kitchenette for in-suite dining',
  'En-suite bathroom with rain shower',
  'Private lounge with smart TV',
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

export default function CoastalHavenPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const galleryRef = useRef(null)
  const navigate = useNavigate()

  // Auto-scroll gallery
  useEffect(() => {
    const el = galleryRef.current
    if (!el) return
    const step = 1.2
    let paused = false
    const onEnter = () => { paused = true }
    const onLeave = () => { paused = false }
    const onTouch = () => { paused = true }
    const id = setInterval(() => {
      if (paused) return
      el.scrollLeft += step
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
        el.scrollLeft = 0
      }
    }, 16)
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    el.addEventListener('touchstart', onTouch, { passive: true })
    return () => {
      clearInterval(id)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
      el.removeEventListener('touchstart', onTouch)
    }
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
          <div className="ch-hero__overlay" />
          <div className="ch-hero__content">
            <motion.span className="ch-hero__eyebrow" {...fadeUp(0.1)}>
              1-Bedroom Suite
            </motion.span>
            <motion.h1 className="ch-hero__title" {...fadeUp(0.22)}>
              Coastal Haven Suite
            </motion.h1>
            <motion.div className="ch-hero__specs" {...fadeUp(0.34)}>
              <span><Maximize2 size={14} strokeWidth={1.5} />25 sq m</span>
              <span><BedDouble size={14} strokeWidth={1.5} />1 King Bed</span>
              <span><Users size={14} strokeWidth={1.5} />2+ Guests</span>
            </motion.div>
            <motion.div className="ch-hero__ctas" {...fadeUp(0.44)}>
              <a href="#inquire" className="btn btn-primary">Book a Stay</a>
              <a href="#gallery" className="btn btn-inverse-light">View Gallery</a>
            </motion.div>
          </div>
        </section>

        {/* ── b) About ── */}
        <section className="ch-about section" id="about">
          <div className="container ch-about__inner">
            <motion.div className="ch-about__left" {...fadeUp(0)}>
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
            <motion.div className="ch-about__right" {...fadeUp(0.15)}>
              <h3 className="ch-about__highlights-title">Suite Highlights</h3>
              <ul className="ch-highlights">
                {HIGHLIGHTS.map((h) => (
                  <li key={h} className="ch-highlights__item">
                    <Check size={16} strokeWidth={2} className="ch-highlights__icon" />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
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
          <motion.div className="ch-gallery__track" ref={galleryRef} {...fadeUp(0.2)}>
            {GALLERY.map((img, i) => (
              <div key={i} className="ch-gallery__item">
                <img src={img} alt={GALLERY_LABELS[i]} className="ch-gallery__img" />
              </div>
            ))}
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
            <motion.div className="ch-tour__frame-wrap" {...fadeUp(0.26)}>
              {/* Vertical 9:16 video — constrained width for portrait display */}
              <div className="ch-tour__frame">
                <iframe
                  src="https://player.vimeo.com/video/1188952533?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;muted=1&amp;loop=1"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                  title="coastal-haven-suite-room-tour"
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

        {/* ── g) More Suites ── */}
        <section className="ch-more section section--secondary" id="more-suites">
          <div className="container">
            <motion.span className="eyebrow text-center ch-more__eyebrow" {...fadeUp(0)}>
              Continue Exploring
            </motion.span>
            <motion.h2 className="section-title ch-more__title" {...fadeUp(0.1)}>
              Explore More
            </motion.h2>
            <motion.div
              className="ch-more__card"
              {...fadeUp(0.2)}
              onClick={() => navigate('/suites/serenity-villa')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate('/suites/serenity-villa')}
            >
              <div className="ch-more__img-wrap">
                <img src={serenityPreview} alt="Serenity Villa Suite" className="ch-more__img" />
                <div className="ch-more__overlay">
                  <p className="ch-more__tagline">3-Bedroom · Luxury Family Retreat</p>
                  <h3 className="ch-more__name">Serenity Villa Suite</h3>
                  <div className="ch-more__specs">
                    <span><Maximize2 size={13} strokeWidth={1.5} />75 sq m</span>
                    <span><BedDouble size={13} strokeWidth={1.5} />3 King Beds</span>
                    <span><Users size={13} strokeWidth={1.5} />6+ Guests</span>
                  </div>
                </div>
              </div>
              <div className="ch-more__footer">
                <a href="/suites/serenity-villa" className="btn btn-inverse ch-more__btn">
                  View Suite
                </a>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <style>{`
        /* ── Hero ── */
        .ch-hero {
          position: relative;
          height: 90vh;
          min-height: 520px;
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
        }
        .ch-hero__overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.35);
        }
        .ch-hero__content {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 0 var(--section-px);
        }
        .ch-hero__eyebrow {
          display: block;
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: clamp(0.7rem, 1.2vw, 0.9rem);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-teal);
          margin-bottom: 1rem;
        }
        .ch-hero__title {
          font-family: var(--font-title);
          font-size: clamp(2.5rem, 7vw, 5.5rem);
          font-weight: 400;
          color: #fff;
          line-height: 1.05;
          margin: 0 0 1.25rem;
        }
        .ch-hero__specs {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px 24px;
          margin-bottom: 2rem;
        }
        .ch-hero__specs span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-body);
          font-size: 0.88rem;
          color: rgba(255,255,255,0.88);
        }
        .ch-hero__specs svg { color: var(--color-teal); }
        .ch-hero__ctas {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
        }

        /* ── About ── */
        .ch-about__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 6vw, 72px);
          align-items: start;
        }
        .ch-about__title {
          margin: 0.5rem 0 1.25rem;
        }
        .ch-about__text {
          font-family: var(--font-body);
          font-size: clamp(0.92rem, 1.4vw, 1.05rem);
          color: var(--color-text-muted);
          line-height: 1.8;
          margin-bottom: 1rem;
        }
        .ch-about__cta { margin-top: 0.75rem; }
        .ch-about__highlights-title {
          font-family: var(--font-nav);
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-espresso);
          margin-bottom: 1.25rem;
        }
        .ch-highlights {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .ch-highlights__item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-family: var(--font-body);
          font-size: 0.92rem;
          color: var(--color-text-body);
          line-height: 1.5;
        }
        .ch-highlights__icon {
          color: var(--color-teal);
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* ── Gallery ── */
        .ch-gallery__title {
          text-align: center;
          margin: 0.5rem 0 2rem;
        }
        .ch-gallery__track {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding: 0 var(--section-px) 16px;
          scroll-behavior: smooth;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .ch-gallery__track::-webkit-scrollbar { display: none; }
        .ch-gallery__item {
          flex-shrink: 0;
        }
        .ch-gallery__img {
          width: 340px;
          height: 260px;
          object-fit: cover;
          display: block;
        }
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

        /* ── More Suites ── */
        .ch-more__eyebrow,
        .ch-more__title {
          text-align: center;
          display: block;
        }
        .ch-more__title { margin: 0.5rem 0 2rem; }
        .ch-more__card {
          max-width: 640px;
          margin-inline: auto;
          cursor: pointer;
        }
        .ch-more__img-wrap {
          position: relative;
          overflow: hidden;
        }
        .ch-more__img {
          width: 100%;
          height: 380px;
          object-fit: cover;
          display: block;
          transition: transform 600ms ease;
        }
        .ch-more__card:hover .ch-more__img {
          transform: scale(1.04);
        }
        .ch-more__overlay {
          position: absolute;
          bottom: 24px;
          left: 24px;
          background-color: rgba(247, 241, 229, 0.96);
          padding: 14px 18px;
        }
        .ch-more__tagline {
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-teal);
          margin: 0 0 5px;
        }
        .ch-more__name {
          font-family: var(--font-title);
          font-size: clamp(1.2rem, 2.5vw, 1.7rem);
          font-weight: 600;
          color: var(--color-espresso);
          margin: 0 0 8px;
        }
        .ch-more__specs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 14px;
        }
        .ch-more__specs span {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }
        .ch-more__specs svg { color: var(--color-teal); }
        .ch-more__footer {
          padding: 16px 0 0;
          display: flex;
          justify-content: center;
        }

        @media (max-width: 900px) {
          .ch-about__inner { grid-template-columns: 1fr; }
        }
        @media (max-width: 639px) {
          .ch-hero { height: 85vh; }
          .ch-more__img { height: 260px; }
          .ch-more__overlay { bottom: 12px; left: 12px; right: 12px; }
        }
      `}</style>
    </>
  )
}
