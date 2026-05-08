import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Info } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { getT } from '../i18n/translations.js'

import cheetahIcon from '../assets/cheetah.png'
import gediMain    from '../assets/gedi-ruins-excursion.JPEG'
import gediOverlay from '../assets/gedi-ruins-monkey-excursion.JPEG'
import elephantMain    from '../assets/upclose-elephant.JPEG'
import elephantOverlay from '../assets/elephant-watching.JPEG'
import dhowMain    from '../assets/sunset-dhow-cruise.JPEG'
import dhowOverlay from '../assets/sunset-view.JPEG'
import hellsMain    from '../assets/hells-kitchen-marafa1.jpeg'
import hellsOverlay from '../assets/hells-kitchen-marafa2.jpeg'

const EXCURSION_IMAGES = [
  { main: gediMain,     overlay: gediOverlay },
  { main: elephantMain, overlay: elephantOverlay },
  { main: dhowMain,     overlay: dhowOverlay },
  { main: hellsMain,    overlay: hellsOverlay },
]

const N_CARDS = 4
// Scroll distance allocated per card-to-card transition (in viewport heights)
const SCROLL_PER_TRANSITION_VH = 0.85

// Shared card markup — identical visual design on both desktop and mobile
function CardInner({ item, images, cta }) {
  return (
    <>
      <div className="exc-card__img-side">
        <img src={images.main} alt={item.title} className="exc-card__main-img" loading="lazy" />
        <span className="exc-card__badge">{item.badge}</span>
      </div>

      <div className="exc-card__text-side">
        <div className="exc-card__text-bg">
          <img src={images.overlay} alt="" className="exc-card__overlay-img" aria-hidden="true" loading="lazy" />
          <div className="exc-card__overlay-dark" aria-hidden="true" />
        </div>
        <div className="exc-card__content">
          <h3 className="exc-card__title">{item.title}</h3>
          <p className="exc-card__desc">{item.desc}</p>
          <a
            href="#contact"
            className="exc-card__cta"
            onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
            <span>{cta}</span>
          </a>
        </div>
      </div>
    </>
  )
}

// Mobile card: fade + slide-up + scale as it enters the viewport
function MobileExcursionCard({ item, images, index, cta }) {
  const isLeft = index % 2 === 0
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false })

  return (
    <motion.div
      ref={ref}
      className={`exc-card exc-card--${isLeft ? 'left' : 'right'}`}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
      transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
    >
      <CardInner item={item} images={images} cta={cta} />
    </motion.div>
  )
}

export default function ExcursionsSection() {
  const { lang } = useLanguage()
  const t = getT(lang)
  const exc = t.excursions

  // isMobile: ≤768 px → normal scroll + fade animation; ≥769 px → stacked deck
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  )

  const deckOuterRef  = useRef(null)
  const deckStickyRef = useRef(null)
  const cardRefs      = useRef([])

  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.3, triggerOnce: true })

  // Keep isMobile in sync with window width
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', check, { passive: true })
    check() // resolve any mount-time mismatch
    return () => window.removeEventListener('resize', check)
  }, [])

  // Desktop stacked-deck: scroll-driven translateY
  useEffect(() => {
    if (isMobile) return

    const outer  = deckOuterRef.current
    const sticky = deckStickyRef.current
    if (!outer || !sticky) return

    // Outer height = one card height + scroll space for (N-1) transitions.
    // Each transition gets SCROLL_PER_TRANSITION_VH × 100vh of scroll distance.
    const setOuterHeight = () => {
      const cardH = sticky.offsetHeight
      outer.style.height = `${cardH + (N_CARDS - 1) * SCROLL_PER_TRANSITION_VH * window.innerHeight}px`
    }
    setOuterHeight()

    // Map scroll progress (0→1) to translateY for each card.
    // Card 0 is always at translateY(0).
    // Card i (i=1…N-1) slides from translateY(100%) → translateY(0%)
    // during progress segment [(i-1)/(N-1), i/(N-1)].
    const handleScroll = () => {
      const rect        = outer.getBoundingClientRect()
      const totalScroll = outer.offsetHeight - sticky.offsetHeight
      const scrolled    = Math.max(0, -rect.top)
      const progress    = totalScroll > 0 ? Math.min(1, scrolled / totalScroll) : 0

      cardRefs.current.forEach((el, i) => {
        if (!el) return
        if (i === 0) {
          el.style.transform = 'translateY(0%)'
          return
        }
        const segStart  = (i - 1) / (N_CARDS - 1)
        const segEnd    = i       / (N_CARDS - 1)
        // Normalise overall progress to a 0-1 value local to this card's segment
        const seg       = Math.max(0, Math.min(1, (progress - segStart) / (segEnd - segStart)))
        el.style.transform = `translateY(${(1 - seg) * 100}%)`
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', setOuterHeight, { passive: true })
    handleScroll() // set initial positions

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', setOuterHeight)
    }
  }, [isMobile])

  return (
    <section className="exc-section section" id="excursions">
      <div className="container">
        <div
          ref={headerRef}
          className={`exc-section__header${headerInView ? ' is-visible' : ''}`}
        >
          <span className="eyebrow">{exc.eyebrow}</span>

          <div className="exc-cheetah-divider" aria-hidden="true">
            <span className="exc-cheetah-divider__line" />
            <img src={cheetahIcon} alt="" className="exc-cheetah-divider__icon" />
            <span className="exc-cheetah-divider__line" />
          </div>

          <h2 className="section-title">{exc.title}</h2>
          <div className="exc-section__note">
            <Info size={14} strokeWidth={1.5} aria-hidden="true" />
            <span>{exc.note}</span>
          </div>
        </div>

        {/* ── Mobile: simple stacked list with fade/slide/scale ── */}
        {isMobile ? (
          <div className="exc-section__list">
            {exc.items.map((item, i) => (
              <MobileExcursionCard
                key={i}
                item={item}
                images={EXCURSION_IMAGES[i]}
                index={i}
                cta={exc.cta}
              />
            ))}
          </div>
        ) : (
          /* ── Desktop/tablet: stacked card-deck ── */
          <div ref={deckOuterRef} className="exc-deck-outer">
            <div ref={deckStickyRef} className="exc-deck-sticky">
              {exc.items.map((item, i) => {
                const isLeft = i % 2 === 0
                return (
                  <div
                    key={i}
                    ref={el => { if (el) cardRefs.current[i] = el; else delete cardRefs.current[i] }}
                    className={`exc-card exc-card--${isLeft ? 'left' : 'right'} exc-deck-card`}
                    style={{ zIndex: i + 1 }}
                  >
                    <CardInner item={item} images={EXCURSION_IMAGES[i]} cta={exc.cta} />
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <style>{`
        /* ── Header ─────────────────────────────────────────── */
        .exc-section__header {
          text-align: center;
          margin-bottom: clamp(40px, 6vw, 64px);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .exc-section__header.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Cheetah divider ─────────────────────────────────── */
        .exc-cheetah-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin: 12px auto 16px;
          max-width: 280px;
        }
        .exc-cheetah-divider__line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--color-teal), transparent);
          opacity: 0.6;
        }
        .exc-cheetah-divider__icon {
          width: 28px;
          height: 28px;
          object-fit: contain;
          opacity: 0.75;
        }

        /* ── Note pill ───────────────────────────────────────── */
        .exc-section__note {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: var(--color-teal);
          background: rgba(88,176,196,0.1);
          padding: 8px 16px;
          border-radius: 100px;
          border: 1px solid rgba(88,176,196,0.3);
          margin-top: 16px;
        }

        /* ── Card base (shared between desktop & mobile) ─────── */
        .exc-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 440px;
          overflow: hidden;
          border-radius: 4px;
          position: relative;
          z-index: 0;
          isolation: isolate;
          background: #101010;
          box-shadow: 0 8px 40px rgba(86,51,17,0.1);
        }
        .exc-card--right {
          direction: rtl;
        }
        .exc-card--right > * {
          direction: ltr;
        }
        .exc-card__img-side {
          position: relative;
          overflow: hidden;
          aspect-ratio: 4 / 3;
        }
        .exc-card__main-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .exc-card:hover .exc-card__main-img {
          transform: scale(1.04);
        }
        .exc-card__badge {
          position: absolute;
          top: 16px;
          left: 16px;
          font-family: var(--font-nav);
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: var(--color-teal);
          color: #fff;
          padding: 5px 14px;
          border-radius: 100px;
        }
        .exc-card__text-side {
          position: relative;
          overflow: hidden;
          background: #101010;
        }
        .exc-card__text-bg {
          position: absolute;
          inset: 0;
        }
        .exc-card__overlay-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .exc-card__overlay-dark {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.62);
        }
        .exc-card__content {
          position: relative;
          z-index: 1;
          padding: clamp(28px, 4vw, 48px);
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 16px;
        }
        .exc-card__title {
          font-family: var(--font-title);
          font-size: clamp(1.4rem, 2.5vw, 2rem);
          font-weight: 600;
          color: #fff;
          line-height: 1.2;
        }
        .exc-card__desc {
          font-size: 0.88rem;
          color: rgba(255,255,255,0.82);
          line-height: 1.7;
        }
        .exc-card__cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-nav);
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-teal);
          text-decoration: none;
          border: 1px solid var(--color-teal);
          padding: 10px 20px;
          border-radius: 3px;
          width: fit-content;
          transition: background 0.25s ease, color 0.25s ease;
        }
        .exc-card__cta:hover {
          background: var(--color-teal);
          color: #fff;
        }

        /* ── Desktop / tablet: stacked card-deck ────────────── */
        @media (min-width: 769px) {
          /* Outer: height is set dynamically by JS */
          .exc-deck-outer {
            width: 100%;
          }
          /* Sticky viewport frame — height driven by card aspect ratio */
          .exc-deck-sticky {
            position: sticky;
            top: 90px;
            overflow: hidden;
            height: clamp(440px, 55vw, 580px);
          }
          /* Each card fills the sticky frame and is absolutely stacked */
          .exc-deck-card {
            position: absolute;
            inset: 0;
            height: 100%;
            min-height: unset;
          }
          /* Cards 2-4 start hidden below (card 1 is always visible) */
          .exc-deck-card:not(:first-child) {
            transform: translateY(100%);
          }
        }

        /* ── Mobile: simple vertical list ───────────────────── */
        .exc-section__list {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        @media (max-width: 768px) {
          .exc-card {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .exc-card--right {
            direction: ltr;
          }
          .exc-card__text-side {
            min-height: 280px;
          }
          .exc-card__img-side {
            aspect-ratio: auto;
          }
          .exc-card__main-img {
            position: relative;
            inset: auto;
            height: auto;
            display: block;
          }
        }
      `}</style>
    </section>
  )
}
