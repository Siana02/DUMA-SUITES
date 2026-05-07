import { useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Maximize2, BedDouble, Users, Check, Mail, MessageCircle,
  Wifi, Tv, Bath, Utensils, Calendar, Clock,
  Shield, AirVent, Sparkles, Sofa, Sunrise, UtensilsCrossed,
  PawPrint, Cigarette, ArrowLeft, ArrowRight, TowelRack, Star,
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { getT } from '../i18n/translations.js'

import heroImg from '../assets/nighttime-ariel-view.jpg'
import aboutImg from '../assets/infinity-pool-ocean-view.jpg'
import cheetahIcon from '../assets/cheetah.png'
import coastalPreviewImg from '../assets/coastal-haven-suite-lounge-couch.JPEG'
import serenityPreviewImg from '../assets/serenity-villa-tv-and-kitchen-view.JPEG'

import g1  from '../assets/arielview1.jpg'
import g2  from '../assets/infinity-pool-ocean-view.jpg'
import g3  from '../assets/infinity-pool-sunset-view.jpg'
import g4  from '../assets/nighttime-ariel-view.jpg'
import g5  from '../assets/nighttime-groundfloor-poolview.jpg'
import g6  from '../assets/daytime-groundfloor-poolview.jpg'
import g7  from '../assets/up-view.jpg'
import g8  from '../assets/outside-view.jpg'
import g9  from '../assets/outside-view2.jpeg'
import g10 from '../assets/ghepard-towers-outside-gate.jpg'
import g11 from '../assets/effortless-luxury.JPEG'
import g12 from '../assets/pools-of-serenity.JPEG'

const GALLERY = [g1,g2,g3,g4,g5,g6,g7,g8,g9,g10,g11,g12]
const DEFAULT_IMAGE_WIDTH = 352
const GALLERY_LABELS = [
  'Aerial view','Infinity pool ocean view','Infinity pool sunset view','Nighttime aerial view',
  'Nighttime ground floor pool view','Daytime ground floor pool view','Up view',
  'Outside view','Outside view 2','Ghepard Towers gate','Effortless luxury','Pools of serenity',
]

const AMENITY_ICONS = [
  BedDouble, Bath, Maximize2, Star, UtensilsCrossed, Sofa,
  Sofa,
  Sunrise,
  ({ size, strokeWidth, className }) => <span className={className} style={{ fontSize: size, lineHeight: 1 }}>🌅</span>,
  Sunrise,
  Utensils, UtensilsCrossed,
  ({ size, strokeWidth, className }) => <span className={className} style={{ fontSize: size, lineHeight: 1 }}>🪟</span>,
  Wifi, Sparkles, AirVent, Tv, TowelRack,
]

const POLICY_ICONS = [Clock, Clock, Calendar, Shield, PawPrint, Cigarette]

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] },
  }
}

export default function PenthouseSuiteSofiaPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const navigate = useNavigate()
  const { lang } = useLanguage()
  const t = getT(lang)
  const pt = t.suites.penthouse
  const tc = t.suites.coastal
  const ts = t.suites.serenity

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
        <title>{pt.metaTitle}</title>
        <meta name="description" content={pt.metaDesc} />
      </Helmet>

      <main id="penthouse-suite-sofia-page">

        {/* ── a) Hero ── */}
        <section className="ph-hero">
          <img src={heroImg} alt="Penthouse Suite Sofia nighttime aerial view" className="ph-hero__bg" />
          <div className="ph-hero__overlay" aria-hidden="true" />
          <div className="ph-hero__content">
            <motion.span
              className="ph-hero__eyebrow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            >
              {pt.heroEyebrow}
            </motion.span>
            <motion.h1
              className="ph-hero__title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              {pt.heroTitle}
            </motion.h1>
            <motion.p
              className="ph-hero__tagline"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {pt.heroTagline}
            </motion.p>
            <motion.div
              className="ph-hero__ctas"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42, ease: [0.4, 0, 0.2, 1] }}
            >
              <a href="#inquire" className="btn btn-primary">
                <Calendar size={14} strokeWidth={1.8} aria-hidden="true" />
                {pt.heroCta1}
              </a>
              <a href="#gallery" className="btn btn-inverse-light">
                {pt.heroCta2}
                <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── b) About ── */}
        <section className="ph-about section" id="about">
          <div className="container">
            <motion.div className="ph-about__stats-strip" {...fadeUp(0)}>
              <div className="ph-about__stat"><Maximize2 size={15} strokeWidth={1.5} /><span>{pt.sqm}</span></div>
              <div className="ph-about__stat"><BedDouble size={15} strokeWidth={1.5} /><span>{pt.beds}</span></div>
              <div className="ph-about__stat"><Users size={15} strokeWidth={1.5} /><span>{pt.guests}</span></div>
              <div className="ph-about__stat"><Calendar size={15} strokeWidth={1.5} /><span>{pt.minStay}</span></div>
            </motion.div>

            <div className="ph-about__inner">
              <motion.div className="ph-about__left" {...fadeUp(0.08)}>
                <span className="eyebrow">{pt.aboutEyebrow}</span>
                <h2 className="section-title ph-about__title">{pt.aboutTitle}</h2>
                <p className="ph-about__text">{pt.aboutText1}</p>
                <p className="ph-about__text">{pt.aboutText2}</p>
                <a href="#inquire" className="btn btn-primary ph-about__cta">
                  <Calendar size={14} strokeWidth={1.8} aria-hidden="true" />
                  {pt.aboutCta}
                </a>

                <div className="ph-about__highlights-card">
                  <h3 className="ph-about__highlights-title">{pt.highlightsTitle}</h3>
                  <ul className="ph-highlights">
                    {pt.highlights.map((h) => (
                      <li key={h} className="ph-highlights__item">
                        <Check size={14} strokeWidth={1.75} className="ph-highlights__icon" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <motion.div className="ph-about__img-col" {...fadeUp(0.16)}>
                <div className="ph-about__img-wrap">
                  <img src={aboutImg} alt="Penthouse Suite Sofia infinity pool ocean view" className="ph-about__img" />
                  <div className="ph-about__img-overlay" aria-hidden="true" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── c) Gallery ── */}
        <section className="ph-gallery section section--secondary" id="gallery">
          <div className="container">
            <motion.span className="eyebrow text-center" {...fadeUp(0)}>
              {pt.galleryEyebrow}
            </motion.span>
            <motion.h2 className="section-title ph-gallery__title" {...fadeUp(0.1)}>
              {pt.galleryTitle}
            </motion.h2>
          </div>
          <motion.div className="ph-gallery__strip-wrapper" {...fadeUp(0.2)}>
            <button
              className="ph-gallery__arrow ph-gallery__arrow--prev"
              onClick={galleryScrollPrev}
              aria-label="Previous photos"
              onMouseEnter={() => { galleryPausedRef.current = true }}
              onMouseLeave={() => { galleryPausedRef.current = false }}
            >
              <ArrowLeft size={18} strokeWidth={1.8} />
            </button>
            <div
              className="ph-gallery__track-wrap"
              onMouseEnter={() => { galleryPausedRef.current = true }}
              onMouseLeave={() => { galleryPausedRef.current = false }}
            >
              <div className="ph-gallery__inner" ref={galleryTrackRef}>
                {[...GALLERY, ...GALLERY].map((img, i) => (
                  <div key={i} className="ph-gallery__item">
                    <img src={img} alt={GALLERY_LABELS[i % GALLERY.length]} className="ph-gallery__img" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
            <button
              className="ph-gallery__arrow ph-gallery__arrow--next"
              onClick={galleryScrollNext}
              aria-label="Next photos"
              onMouseEnter={() => { galleryPausedRef.current = true }}
              onMouseLeave={() => { galleryPausedRef.current = false }}
            >
              <ArrowRight size={18} strokeWidth={1.8} />
            </button>
          </motion.div>
          <div className="container ph-gallery__cta-wrap">
            <motion.a href="#inquire" className="btn btn-primary" {...fadeUp(0.1)}>
              {pt.galleryCta}
              <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
            </motion.a>
          </div>
        </section>

        {/* ── d) Amenities ── */}
        <section className="ph-amenities section" id="amenities">
          <div className="container">
            <motion.span className="eyebrow text-center ph-amenities__eyebrow" {...fadeUp(0)}>
              {pt.amenitiesEyebrow}
            </motion.span>
            <motion.h2 className="section-title ph-amenities__title" {...fadeUp(0.1)}>
              {pt.amenitiesTitle}
            </motion.h2>
            <div className="ph-amenities__grid">
              {pt.amenities.map((label, i) => {
                const Icon = AMENITY_ICONS[i] || Wifi
                return (
                  <motion.div
                    key={label}
                    className="ph-amenity"
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5, delay: i * 0.07, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <div className="ph-amenity__icon-wrap">
                      <Icon size={22} strokeWidth={1.5} className="ph-amenity__icon" />
                    </div>
                    <span className="ph-amenity__label">{label}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── e) Policies ── */}
        <section className="ph-policies section section--secondary" id="policies">
          <div className="container">
            <motion.span className="eyebrow text-center ph-policies__eyebrow" {...fadeUp(0)}>
              {pt.policiesEyebrow}
            </motion.span>
            <motion.h2 className="section-title ph-policies__title" {...fadeUp(0.1)}>
              {pt.policiesTitle}
            </motion.h2>
            <motion.div className="ph-policies__grid" {...fadeUp(0.2)}>
              {pt.policies.map(({ label, value }, idx) => {
                const Icon = POLICY_ICONS[idx] || Clock
                return (
                  <div key={label} className="ph-policy">
                    <Icon size={18} strokeWidth={1.5} className="ph-policy__icon" />
                    <div>
                      <span className="ph-policy__label">{label}</span>
                      <span className="ph-policy__value">{value}</span>
                    </div>
                  </div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ── f) Inquire ── */}
        <section className="ph-inquire section section--dark" id="inquire">
          <div className="container ph-inquire__inner">
            <motion.span className="ph-inquire__eyebrow" {...fadeUp(0)}>
              {pt.inquireEyebrow}
            </motion.span>
            <motion.h2 className="ph-inquire__title" {...fadeUp(0.1)}>
              {pt.inquireTitle}
            </motion.h2>
            <motion.p className="ph-inquire__subtitle" {...fadeUp(0.2)}>
              {pt.inquireSub}
            </motion.p>
            <motion.div className="ph-inquire__ctas" {...fadeUp(0.3)}>
              <a href="mailto:reservations@dumasuites.com" className="btn btn-primary">
                <Mail size={16} strokeWidth={1.5} />
                {pt.inquireEmail}
              </a>
              <a href="https://wa.me/254710933025" target="_blank" rel="noopener noreferrer" className="btn btn-inverse-light">
                <MessageCircle size={16} strokeWidth={1.5} />
                {pt.inquireWhatsapp}
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── g) Explore Suites ── */}
        <section className="ph-suites section" id="explore-suites">
          <div className="container">
            <motion.span className="eyebrow text-center" {...fadeUp(0)}>
              {pt.suitesEyebrow}
            </motion.span>
            <motion.h2 className="section-title ph-suites__title" {...fadeUp(0.1)}>
              {pt.suitesTitle}
            </motion.h2>
            <div className="ph-suites__grid">
              <motion.div className="ph-suite-card" {...fadeUp(0.22)} onClick={() => navigate('/suites/coastal-haven')} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate('/suites/coastal-haven') } }}>
                <div className="ph-suite-card__img-wrap">
                  <img src={coastalPreviewImg} alt={tc.heroTitle} className="ph-suite-card__img" loading="eager" />
                </div>
                <div className="ph-suite-card__body">
                  <p className="ph-suite-card__tagline">{pt.coastalTagline}</p>
                  <h3 className="ph-suite-card__name">{tc.heroTitle}</h3>
                  <a href="/suites/coastal-haven" className="btn btn-inverse ph-suite-card__btn" onClick={e => { e.stopPropagation(); navigate('/suites/coastal-haven') }}>
                    {pt.viewSuiteBtn}
                  </a>
                </div>
              </motion.div>
              <motion.div className="ph-suite-card" {...fadeUp(0.32)} onClick={() => navigate('/suites/serenity-villa')} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate('/suites/serenity-villa') } }}>
                <div className="ph-suite-card__img-wrap">
                  <img src={serenityPreviewImg} alt={ts.heroTitle} className="ph-suite-card__img" loading="eager" />
                </div>
                <div className="ph-suite-card__body">
                  <p className="ph-suite-card__tagline">{pt.serenityTagline}</p>
                  <h3 className="ph-suite-card__name">{ts.heroTitle}</h3>
                  <a href="/suites/serenity-villa" className="btn btn-inverse ph-suite-card__btn" onClick={e => { e.stopPropagation(); navigate('/suites/serenity-villa') }}>
                    {pt.viewSuiteBtn}
                  </a>
                </div>
              </motion.div>
              <motion.div className="ph-suite-card" {...fadeUp(0.42)} onClick={() => navigate('/suites/penthouse-suite-1-sofia')} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate('/suites/penthouse-suite-1-sofia') } }}>
                <div className="ph-suite-card__img-wrap">
                  <img src={heroImg} alt={pt.heroTitle} className="ph-suite-card__img" loading="eager" />
                  <div className="ph-suite-card__badge">{pt.badgeCurrent}</div>
                </div>
                <div className="ph-suite-card__body">
                  <p className="ph-suite-card__tagline">{pt.penthouseTagline}</p>
                  <h3 className="ph-suite-card__name">{pt.heroTitle}</h3>
                  <a href="/suites/penthouse-suite-1-sofia" className="btn btn-inverse ph-suite-card__btn" onClick={e => { e.stopPropagation(); navigate('/suites/penthouse-suite-1-sofia') }}>
                    {pt.viewSuiteBtn}
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      </main>

      <style>{`
        /* ── Hero ── */
        .ph-hero {
          position: relative;
          height: 100svh;
          min-height: 560px;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }
        .ph-hero__bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .ph-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 60%, transparent 100%);
        }
        .ph-hero__content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 760px;
          padding: 0 24px 64px;
          margin: 0 auto;
          text-align: center;
          color: #fff;
        }
        .ph-hero__eyebrow {
          display: block;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-accent, #c9a96e);
          margin-bottom: 14px;
        }
        .ph-hero__title {
          font-family: var(--font-serif, Georgia, serif);
          font-size: clamp(2.2rem, 5.5vw, 3.8rem);
          font-weight: 400;
          line-height: 1.08;
          letter-spacing: -0.01em;
          margin: 0 0 16px;
        }
        .ph-hero__tagline {
          font-size: clamp(0.9rem, 2vw, 1.1rem);
          opacity: 0.88;
          margin: 0 0 32px;
          line-height: 1.5;
        }
        .ph-hero__ctas {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* ── About ── */
        .ph-about__stats-strip {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 48px;
          padding: 24px;
          background: var(--color-surface, #faf9f7);
          border-radius: 12px;
          border: 1px solid var(--color-border, #e8e3dc);
        }
        @media (min-width: 600px) {
          .ph-about__stats-strip { grid-template-columns: repeat(4, 1fr); }
        }
        .ph-about__stat {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--color-text-muted, #7a7065);
        }
        .ph-about__inner {
          display: grid;
          gap: 48px;
        }
        @media (min-width: 900px) {
          .ph-about__inner { grid-template-columns: 1fr 1fr; align-items: start; }
        }
        .ph-about__title { margin-bottom: 20px; }
        .ph-about__text {
          font-size: 1rem;
          line-height: 1.72;
          color: var(--color-text-body, #4a453f);
          margin-bottom: 16px;
        }
        .ph-about__cta { margin-top: 8px; }
        .ph-about__highlights-card {
          margin-top: 32px;
          padding: 24px;
          background: var(--color-surface, #faf9f7);
          border-radius: 12px;
          border: 1px solid var(--color-border, #e8e3dc);
        }
        .ph-about__highlights-title {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-text-muted, #7a7065);
          margin: 0 0 16px;
        }
        .ph-highlights { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .ph-highlights__item { display: flex; align-items: flex-start; gap: 10px; font-size: 0.9rem; line-height: 1.5; color: var(--color-text-body, #4a453f); }
        .ph-highlights__icon { color: var(--color-accent, #c9a96e); flex-shrink: 0; margin-top: 2px; }
        .ph-about__img-col {}
        .ph-about__img-wrap { position: relative; border-radius: 12px; overflow: hidden; aspect-ratio: 4/5; }
        .ph-about__img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .ph-about__img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 60%);
        }

        /* ── Gallery ── */
        .ph-gallery__title { text-align: center; margin-bottom: 32px; }
        .ph-gallery__strip-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        .ph-gallery__track-wrap { flex: 1; overflow: hidden; }
        .ph-gallery__inner {
          display: flex;
          gap: 12px;
          will-change: transform;
          width: max-content;
        }
        .ph-gallery__item {
          flex-shrink: 0;
          width: 340px;
          height: 260px;
          border-radius: 10px;
          overflow: hidden;
        }
        .ph-gallery__img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .ph-gallery__arrow {
          position: absolute;
          z-index: 4;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.6);
          background: rgba(0,0,0,0.45);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }
        .ph-gallery__arrow:hover { background: rgba(0,0,0,0.72); }
        .ph-gallery__arrow--prev { left: 8px; }
        .ph-gallery__arrow--next { right: 8px; }
        .ph-gallery__cta-wrap { display: flex; justify-content: center; margin-top: 32px; }

        /* ── Amenities ── */
        .ph-amenities__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 16px;
          margin-top: 32px;
        }
        .ph-amenity {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 20px 12px;
          background: var(--color-surface, #faf9f7);
          border: 1px solid var(--color-border, #e8e3dc);
          border-radius: 12px;
          text-align: center;
        }
        .ph-amenity__icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--color-accent-light, #f5efe6);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ph-amenity__icon { color: var(--color-accent, #c9a96e); }
        .ph-amenity__label { font-size: 0.8rem; font-weight: 500; color: var(--color-text-body, #4a453f); line-height: 1.3; }

        /* ── Policies ── */
        .ph-policies__grid {
          display: grid;
          gap: 16px;
          margin-top: 32px;
        }
        @media (min-width: 640px) { .ph-policies__grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .ph-policies__grid { grid-template-columns: repeat(3, 1fr); } }
        .ph-policy {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 20px;
          background: var(--color-surface, #faf9f7);
          border: 1px solid var(--color-border, #e8e3dc);
          border-radius: 12px;
        }
        .ph-policy__icon { color: var(--color-accent, #c9a96e); flex-shrink: 0; margin-top: 2px; }
        .ph-policy__label {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-text-muted, #7a7065);
          margin-bottom: 4px;
        }
        .ph-policy__value { font-size: 0.9rem; color: var(--color-text-body, #4a453f); line-height: 1.4; }

        /* ── Inquire ── */
        .ph-inquire__inner { text-align: center; max-width: 560px; margin: 0 auto; }
        .ph-inquire__eyebrow {
          display: block;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-accent, #c9a96e);
          margin-bottom: 14px;
        }
        .ph-inquire__title {
          font-family: var(--font-serif, Georgia, serif);
          font-size: clamp(1.6rem, 3.5vw, 2.4rem);
          font-weight: 400;
          color: #fff;
          margin: 0 0 16px;
        }
        .ph-inquire__subtitle { color: rgba(255,255,255,0.78); font-size: 1rem; margin-bottom: 32px; }
        .ph-inquire__ctas { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

        /* ── Explore Suites ── */
        .ph-suites__title { text-align: center; margin-bottom: 40px; }
        .ph-suites__grid {
          display: grid;
          gap: 24px;
        }
        @media (min-width: 760px) { .ph-suites__grid { grid-template-columns: repeat(2, 1fr); } }
        .ph-suite-card {
          border-radius: 14px;
          overflow: hidden;
          background: var(--color-surface, #faf9f7);
          border: 1px solid var(--color-border, #e8e3dc);
          cursor: pointer;
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .ph-suite-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.1); transform: translateY(-3px); }
        .ph-suite-card__img-wrap { position: relative; aspect-ratio: 4/3; overflow: hidden; }
        .ph-suite-card__img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease; }
        .ph-suite-card:hover .ph-suite-card__img { transform: scale(1.04); }
        .ph-suite-card__badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: var(--color-accent, #c9a96e);
          color: #fff;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 20px;
        }
        .ph-suite-card__body { padding: 20px 22px 24px; }
        .ph-suite-card__tagline {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-accent, #c9a96e);
          margin: 0 0 8px;
        }
        .ph-suite-card__name {
          font-family: var(--font-serif, Georgia, serif);
          font-size: 1.25rem;
          font-weight: 400;
          color: var(--color-text-heading, #1a1714);
          margin: 0 0 16px;
        }
        .ph-suite-card__btn { width: 100%; justify-content: center; }
      `}</style>
    </>
  )
}
