import { useState, useRef, useEffect, useCallback } from 'react'
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

const DESKTOP_BREAKPOINT = 768
const MOBILE_CARD_THRESHOLD = 0.2
// Minimum ms between successive card advances (prevents rapid skipping on a
// single flick — the timeout is cleared when the lock is released so that
// the very next wheel tick after an unlock is never dropped).
const WHEEL_DEBOUNCE_MS = 700
// Minimum vertical swipe distance (px) needed to advance one card on touch.
const TOUCH_THRESHOLD_PX = 50
// How long (ms) to suppress re-locking after programmatically scrolling past
// the section.  Must be long enough for the scroll + IntersectionObserver
// callback to have settled.
const UNLOCK_COOLDOWN_MS = 800
// Full-view tolerance (px) to avoid floating point/layout jitter near 100%.
const FULL_VIEW_TOLERANCE_PX = 0

// ─────────────────────────────────────────────────────────────────────────────
// Shared card markup — identical visual design on desktop and mobile
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// Mobile card — fade + slide-up + scale on viewport entry
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// Main section
// ─────────────────────────────────────────────────────────────────────────────
export default function ExcursionsSection() {
  const { lang } = useLanguage()
  const t = getT(lang)
  const exc = t.excursions
  const deckItems = exc.items.slice(0, EXCURSION_IMAGES.length)
  const cardCount = deckItems.length

  // Initialise synchronously so there's no flash of the mobile layout on
  // desktop between the first render and the first useEffect run.
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' && window.innerWidth >= DESKTOP_BREAKPOINT
  )
  const [activeDeckIndex, setActiveDeckIndex] = useState(0)

  // ── refs ──────────────────────────────────────────────────────────────────
  const sectionRef     = useRef(null)   // the <section> element (receives events)
  const deckRef        = useRef(null)   // the card container (observed for intersection)
  const isLockedRef    = useRef(false)  // true while page scroll is intercepted
  const cooldownRef    = useRef(false)  // true briefly after releasing the lock
  const wheelTimerRef  = useRef(null)   // debounce timer for wheel events
  const touchStartYRef = useRef(null)   // Y position at touchstart
  const scrollDirectionRef = useRef(1)  // 1: down, -1: up
  const lastScrollYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0)
  // Mirror of activeDeckIndex for use inside event-handler closures without
  // re-creating those handlers on every state change.
  const activeIdxRef   = useRef(0)

  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.3, triggerOnce: true })

  // Keep mirror ref in sync with React state
  useEffect(() => { activeIdxRef.current = activeDeckIndex }, [activeDeckIndex])

  // ── Breakpoint detection ───────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT)
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  // Release the lock when switching to mobile (e.g. window resize)
  useEffect(() => {
    if (!isDesktop) isLockedRef.current = false
  }, [isDesktop])

  // Track scroll direction so full-view lock can start from card 0 (down)
  // or from the last card (up).
  useEffect(() => {
    if (!isDesktop) return
    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastScrollYRef.current
      if (delta !== 0) scrollDirectionRef.current = delta > 0 ? 1 : -1
      lastScrollYRef.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isDesktop])

  // ── Helpers ────────────────────────────────────────────────────────────────

  // Programmatically scroll the window so the section is just off-screen in
  // the given direction, then impose a cooldown so the IntersectionObserver
  // callback does not immediately re-lock.
  const scrollPast = useCallback((direction) => {
    const section = sectionRef.current
    if (!section) return
    const sectionTop = section.getBoundingClientRect().top + window.scrollY
    if (direction > 0) {
      // Move to just below the section's bottom edge
      window.scrollTo(0, sectionTop + section.offsetHeight + 2)
    } else {
      // Move to just above the section's top edge
      window.scrollTo(0, Math.max(0, sectionTop - 2))
    }
  }, [])

  // Try to advance/retreat the active card index.
  // Returns true if the step was consumed, false if the edge was reached.
  const step = useCallback((direction) => {
    const next = activeIdxRef.current + direction
    if (next >= 0 && next < cardCount) {
      setActiveDeckIndex(next)
      return true
    }
    return false
  }, [cardCount])

  // Unlock page scroll and scroll programmatically past the section.
  const releaseLock = useCallback((direction) => {
    isLockedRef.current = false
    cooldownRef.current = true

    if (wheelTimerRef.current) {
      clearTimeout(wheelTimerRef.current)
      wheelTimerRef.current = null
    }

    // Clear cooldown after enough time for IO callback to have settled
    setTimeout(() => { cooldownRef.current = false }, UNLOCK_COOLDOWN_MS)

    scrollPast(direction)
  }, [scrollPast])

  // ── Event handlers (stable refs via useCallback) ───────────────────────────

  // Wheel — must be registered as non-passive so preventDefault() works.
  const handleWheel = useCallback((e) => {
    if (!isLockedRef.current) return
    e.preventDefault()
    if (wheelTimerRef.current) return   // still within debounce window

    const direction = e.deltaY >= 0 ? 1 : -1
    if (!step(direction)) {
      releaseLock(direction)
    } else {
      wheelTimerRef.current = setTimeout(
        () => { wheelTimerRef.current = null },
        WHEEL_DEBOUNCE_MS
      )
    }
  }, [step, releaseLock])

  // Touch — record start position (passive is fine here)
  const handleTouchStart = useCallback((e) => {
    if (!isLockedRef.current) return
    touchStartYRef.current = e.touches[0].clientY
  }, [])

  // Touch move — prevent native scroll while locked (must be non-passive)
  const handleTouchMove = useCallback((e) => {
    if (!isLockedRef.current || touchStartYRef.current === null) return
    e.preventDefault()
  }, [])

  // Touch end — compute swipe delta and advance/retreat
  const handleTouchEnd = useCallback((e) => {
    if (!isLockedRef.current || touchStartYRef.current === null) return
    const deltaY = touchStartYRef.current - e.changedTouches[0].clientY
    touchStartYRef.current = null
    if (Math.abs(deltaY) < TOUCH_THRESHOLD_PX) return
    const direction = deltaY > 0 ? 1 : -1
    if (!step(direction)) releaseLock(direction)
  }, [step, releaseLock])

  // Keyboard — ArrowDown/Up and PageDown/Up advance the deck; all other keys
  // pass through so Tab, Enter, Space etc. remain fully functional.
  const handleKeyDown = useCallback((e) => {
    if (!isLockedRef.current) return
    let direction = 0
    if (e.key === 'ArrowDown' || e.key === 'PageDown') direction = 1
    if (e.key === 'ArrowUp'   || e.key === 'PageUp')   direction = -1
    if (!direction) return
    e.preventDefault()
    if (!step(direction)) releaseLock(direction)
  }, [step, releaseLock])

  // ── Attach / detach event listeners ───────────────────────────────────────
  useEffect(() => {
    if (!isDesktop) return
    const section = sectionRef.current
    if (!section) return

    // wheel and touchmove MUST be non-passive to call preventDefault
    section.addEventListener('wheel',      handleWheel,      { passive: false })
    section.addEventListener('touchstart', handleTouchStart, { passive: true })
    section.addEventListener('touchmove',  handleTouchMove,  { passive: false })
    section.addEventListener('touchend',   handleTouchEnd,   { passive: true })
    window .addEventListener('keydown',    handleKeyDown)

    return () => {
      section.removeEventListener('wheel',      handleWheel)
      section.removeEventListener('touchstart', handleTouchStart)
      section.removeEventListener('touchmove',  handleTouchMove)
      section.removeEventListener('touchend',   handleTouchEnd)
      window .removeEventListener('keydown',    handleKeyDown)
      if (wheelTimerRef.current) {
        clearTimeout(wheelTimerRef.current)
        wheelTimerRef.current = null
      }
    }
  }, [isDesktop, handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd, handleKeyDown])

  // ── IntersectionObserver — lock/unlock based on deck visibility ────────────
  useEffect(() => {
    if (!isDesktop) return
    const deck = deckRef.current
    if (!deck) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const rect = entry.boundingClientRect
        const fullyVisible =
          rect.top >= -FULL_VIEW_TOLERANCE_PX &&
          rect.bottom <= window.innerHeight + FULL_VIEW_TOLERANCE_PX

        if (fullyVisible && !cooldownRef.current && !isLockedRef.current) {
          const scrollingDown = scrollDirectionRef.current > 0
          const startIndex = scrollingDown ? 0 : cardCount - 1
          setActiveDeckIndex(startIndex)
          activeIdxRef.current = startIndex
          isLockedRef.current  = true
        } else if (!fullyVisible) {
          isLockedRef.current = false
        }
      })
    }, { threshold: [0, 1] })

    observer.observe(deck)
    return () => observer.disconnect()
  }, [isDesktop, cardCount])

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
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
        {!isDesktop ? (
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
          /* ── Desktop/tablet: scroll-intercepted card deck ── */
          <div ref={deckRef} className="exc-deck">
            {deckItems.map((item, i) => {
              const isLeft = i % 2 === 0
              const isRevealed = i <= activeDeckIndex
              return (
                <div
                  key={i}
                  className={`exc-card exc-card--${isLeft ? 'left' : 'right'} exc-deck-card${isRevealed ? ' is-revealed' : ''}`}
                  style={{ zIndex: i + 1 }}
                >
                  <CardInner item={item} images={EXCURSION_IMAGES[i]} cta={exc.cta} />
                </div>
              )
            })}
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

        /* ── Desktop/tablet: scroll-intercepted card deck ────── */
        @media (min-width: 768px) {
          /* Container — fills the viewport so each card is fully in view.
             Cards are absolutely stacked inside; no scroll space needed. */
          .exc-deck {
            position: relative;
            width: 100%;
            min-height: 100vh;
            overflow: hidden;
          }
          /* Each card fills the deck container and is stacked by z-index.
             Default: waiting below the fold. */
          .exc-deck-card {
            position: absolute;
            inset: 0;
            height: 100%;
            min-height: unset;
            will-change: transform;
            transform: translateY(100%);
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }
          /* Revealed: current card and all already-seen cards stay in place. */
          .exc-deck-card.is-revealed {
            transform: translateY(0%);
          }
          /* Image side: fill the full height of the card (no aspect-ratio lock) */
          .exc-deck-card .exc-card__img-side {
            aspect-ratio: unset;
            height: 100%;
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
