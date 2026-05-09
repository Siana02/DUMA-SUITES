import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowLeft, ArrowRight, Info } from 'lucide-react'
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

const CAROUSEL_BREAKPOINT = 768
const AUTO_CYCLE_MS = 7000
const MOBILE_CARD_THRESHOLD = 0.2

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
  const { ref, inView } = useInView({ threshold: MOBILE_CARD_THRESHOLD, triggerOnce: false })

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
  const deckItems = exc.items.slice(0, EXCURSION_IMAGES.length)
  const cardCount = deckItems.length

  const [isCarouselMode, setIsCarouselMode] = useState(false)
  const [activeDeckIndex, setActiveDeckIndex] = useState(0)
  const viewportRef = useRef(null)

  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.3, triggerOnce: true })

  // Keep breakpoint mode in sync with window width
  useEffect(() => {
    const check = () => setIsCarouselMode(window.innerWidth >= CAROUSEL_BREAKPOINT)
    window.addEventListener('resize', check, { passive: true })
    check() // resolve any mount-time mismatch
    return () => window.removeEventListener('resize', check)
  }, [])

  // Tablet/desktop: auto-cycle cards every 7 seconds
  useEffect(() => {
    if (!isCarouselMode || cardCount <= 1) return
    const timer = window.setInterval(() => {
      setActiveDeckIndex(prev => (prev + 1) % cardCount)
    }, AUTO_CYCLE_MS)
    return () => window.clearInterval(timer)
  }, [isCarouselMode, cardCount, activeDeckIndex])

  // Sync horizontal scroll position when active index changes
  useEffect(() => {
    if (!isCarouselMode) return
    const viewport = viewportRef.current
    if (!viewport) return
    viewport.scrollTo({
      left: activeDeckIndex * viewport.clientWidth,
      behavior: 'smooth',
    })
  }, [activeDeckIndex, isCarouselMode])

  // Keep active index in sync with manual horizontal touch/trackpad scroll
  useEffect(() => {
    if (!isCarouselMode) return
    const viewport = viewportRef.current
    if (!viewport) return

    let rafId = null

    const onScroll = () => {
      if (rafId !== null) return
      rafId = window.requestAnimationFrame(() => {
        const width = viewport.clientWidth
        if (!width) {
          rafId = null
          return
        }
        const nextIndex = Math.round(viewport.scrollLeft / width)
        const clamped = Math.max(0, Math.min(cardCount - 1, nextIndex))
        setActiveDeckIndex(prev => (prev === clamped ? prev : clamped))
        rafId = null
      })
    }

    viewport.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      viewport.removeEventListener('scroll', onScroll)
      if (rafId !== null) window.cancelAnimationFrame(rafId)
    }
  }, [isCarouselMode, cardCount])

  const goPrev = () => {
    setActiveDeckIndex(prev => (prev - 1 + cardCount) % cardCount)
  }

  const goNext = () => {
    setActiveDeckIndex(prev => (prev + 1) % cardCount)
  }

  return (
    <section
      className="exc-section section"
      id="excursions"
    >
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
        {!isCarouselMode ? (
          <div className="exc-section__list">
            {deckItems.map((item, i) => (
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
          /* ── Tablet/desktop: full-width horizontal carousel ── */
          <div className="exc-carousel-shell">
            <button type="button" className="exc-carousel__arrow exc-carousel__arrow--left" onClick={goPrev} aria-label="Previous excursion">
              <ArrowLeft size={18} strokeWidth={1.8} />
            </button>
            <button type="button" className="exc-carousel__arrow exc-carousel__arrow--right" onClick={goNext} aria-label="Next excursion">
              <ArrowRight size={18} strokeWidth={1.8} />
            </button>
            <div ref={viewportRef} className="exc-carousel__viewport">
              <div className="exc-carousel__track">
                {deckItems.map((item, i) => {
                  const isLeft = i % 2 === 0
                  return (
                    <div
                      key={i}
                      className={`exc-card exc-card--${isLeft ? 'left' : 'right'} exc-carousel__card`}
                    >
                      <CardInner item={item} images={EXCURSION_IMAGES[i]} cta={exc.cta} />
                    </div>
                  )
                })}
              </div>
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

        /* ── Tablet / desktop: horizontal carousel ───────────── */
        @media (min-width: 768px) {
          .exc-carousel-shell {
            position: relative;
            width: 100vw;
            margin-left: calc(50% - 50vw);
            margin-right: calc(50% - 50vw);
          }
          .exc-carousel__viewport {
            overflow-x: auto;
            overflow-y: hidden;
            scroll-snap-type: x mandatory;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .exc-carousel__viewport::-webkit-scrollbar {
            display: none;
          }
          .exc-carousel__track {
            display: flex;
          }
          .exc-carousel__card {
            flex: 0 0 100%;
            width: 100%;
            min-height: clamp(440px, 52vw, 620px);
            border-radius: 0;
            scroll-snap-align: start;
          }
          .exc-carousel__arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 3;
            width: 44px;
            height: 44px;
            border: 1px solid rgba(255,255,255,0.6);
            border-radius: 999px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: rgba(16,16,16,0.55);
            color: #fff;
            cursor: pointer;
            backdrop-filter: blur(2px);
            transition: background 0.25s ease, border-color 0.25s ease;
          }
          .exc-carousel__arrow:hover {
            background: rgba(16,16,16,0.8);
            border-color: #fff;
          }
          .exc-carousel__arrow--left {
            left: clamp(10px, 2vw, 24px);
          }
          .exc-carousel__arrow--right {
            right: clamp(10px, 2vw, 24px);
          }
        }

        /* ── Mobile: simple vertical list ───────────────────── */
        .exc-section__list {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        @media (max-width: 767px) {
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
