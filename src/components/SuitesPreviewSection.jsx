import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { Maximize2, BedDouble, Users, ArrowLeft, ArrowRight } from 'lucide-react'
import { useT } from '../i18n/useT.js'

import cheetahIcon from '../assets/cheetah.png'
import coastalPreview from '../assets/coastal-haven-suite-lounge-couch.JPEG'
import serenityPreview from '../assets/serenity-villa-tv-and-kitchen-view.JPEG'
import penthousePreview from '../assets/penthouse-suite-view-from-outside.jpg'

// Static metadata: images & hrefs only
const SUITE_META = [
  { id: 'penthouse-suite-1-sofia', href: '/suites/penthouse-suite-1-sofia', image: penthousePreview },
  { id: 'coastal-haven', href: '/suites/coastal-haven', image: coastalPreview },
  { id: 'serenity-villa', href: '/suites/serenity-villa', image: serenityPreview },
]

const AUTO_ADVANCE_MS = 7000

export default function SuitesPreviewSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const navigate = useNavigate()
  const sp = useT().suitesPreview

  // Merge static metadata with translated suite data
  const suites = SUITE_META.map((meta, i) => ({ ...meta, ...sp.suites[i] }))

  const { ref: sectionRef, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  const goTo = useCallback((index) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }, [current])

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((c) => (c + 1) % suites.length)
  }, [suites.length])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((c) => (c - 1 + suites.length) % suites.length)
  }, [suites.length])

  useEffect(() => {
    const timer = setInterval(next, AUTO_ADVANCE_MS)
    return () => clearInterval(timer)
  }, [next])

  const suite = suites[current]

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] },
  })

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? '6%' : '-6%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? '-6%' : '6%', opacity: 0 }),
  }

  return (
    <section className="sp-section section" id="suites-preview" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="sp-header">
          <motion.span className="eyebrow sp-eyebrow" {...fadeUp(0)}>
            {sp.eyebrow}
          </motion.span>

          <motion.div className="sp-divider" {...fadeUp(0.1)} aria-hidden="true">
            <span className="sp-divider__line sp-divider__line--left" />
            <img src={cheetahIcon} alt="" className="sp-divider__cheetah" />
            <span className="sp-divider__line sp-divider__line--right" />
          </motion.div>

          <motion.h2 className="section-title sp-title" {...fadeUp(0.18)}>
            {sp.title}
          </motion.h2>

          <motion.p className="sp-intro" {...fadeUp(0.26)}>
            {sp.intro}
          </motion.p>
        </div>

        {/* Carousel */}
        <motion.div className="sp-carousel" aria-label="Suite preview carousel" {...fadeUp(0.34)}>
          {/* Arrow buttons — outside image on desktop/tablet */}
          <button
            className="sp-arrow sp-arrow--prev"
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Previous suite"
          >
            <ArrowLeft size={20} strokeWidth={1.8} />
          </button>
          <button
            className="sp-arrow sp-arrow--next"
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Next suite"
          >
            <ArrowRight size={20} strokeWidth={1.8} />
          </button>

          {/* Slide */}
          <div className="sp-slide-wrapper">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={suite.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                className="sp-slide"
                onClick={() => navigate(suite.href)}
                role="button"
                tabIndex={0}
                aria-label={`View ${suite.name} details`}
                onKeyDown={(e) => e.key === 'Enter' && navigate(suite.href)}
              >
                <img
                  src={suite.image}
                  alt={suite.name}
                  className="sp-slide__img"
                />

                {/* Bottom-left overlay — transparent, white text */}
                <div className="sp-slide__overlay">
                  <h3 className="sp-slide__name">{suite.name}</h3>
                  <p className="sp-slide__tagline">{suite.tagline}</p>
                  <div className="sp-slide__details">
                    <span className="sp-slide__detail">
                      <Maximize2 size={13} strokeWidth={1.5} aria-hidden="true" />
                      {suite.size}
                    </span>
                    <span className="sp-slide__detail">
                      <BedDouble size={13} strokeWidth={1.5} aria-hidden="true" />
                      {suite.beds}
                    </span>
                    <span className="sp-slide__detail">
                      <Users size={13} strokeWidth={1.5} aria-hidden="true" />
                      {suite.guests}
                    </span>
                  </div>
                </div>

                {/* Mobile-only name at top-left */}
                <div className="sp-slide__mobile-name" aria-hidden="true">
                  <h3 className="sp-slide__mobile-name__text">{suite.name}</h3>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="sp-dots" role="tablist" aria-label="Suite slides">
            {suites.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to ${s.name}`}
                className={`sp-dot${i === current ? ' sp-dot--active' : ''}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div className="sp-cta-wrap" {...fadeUp(0.44)}>
          <a href="/suites" className="sp-cta-btn">
            {sp.viewAll}
            <span className="sp-cta-btn__arrow" aria-hidden="true">&rarr;</span>
          </a>
        </motion.div>
      </div>

      <style>{`
        .sp-section {
          background-color: var(--color-bg-tertiary);
          overflow: hidden;
        }

        /* ── Header ── */
        .sp-header {
          text-align: center;
          max-width: 640px;
          margin-inline: auto;
          margin-bottom: clamp(32px, 5vw, 56px);
        }
        .sp-eyebrow {
          display: block;
          text-align: center;
          margin-bottom: 0.5rem;
        }
        .sp-divider {
          display: flex;
          align-items: center;
          gap: 14px;
          max-width: 380px;
          margin-inline: auto;
          margin-bottom: 1.2rem;
        }
        .sp-divider__line {
          flex: 1;
          height: 1px;
        }
        .sp-divider__line--left {
          background: linear-gradient(to right, transparent, var(--color-teal));
        }
        .sp-divider__line--right {
          background: linear-gradient(to left, transparent, var(--color-teal));
        }
        .sp-divider__cheetah {
          width: 2.2rem;
          height: 2.2rem;
          opacity: 0.72;
          flex-shrink: 0;
        }
        .sp-title {
          text-align: center;
          letter-spacing: 0.05em;
          margin: 0 0 0.75rem;
        }
        .sp-intro {
          font-family: var(--font-body);
          font-size: clamp(0.9rem, 1.4vw, 1rem);
          color: var(--color-text-muted);
          line-height: 1.7;
          margin: 0;
        }

        /* ── Carousel wrapper — extra horizontal padding for outside arrows ── */
        .sp-carousel {
          max-width: 960px;
          margin-inline: auto;
          position: relative;
          padding-inline: 60px;
        }

        .sp-slide-wrapper {
          position: relative;
          overflow: hidden;
        }

        /* ── Slide ── */
        .sp-slide {
          position: relative;
          cursor: pointer;
          overflow: hidden;
          display: block;
        }
        .sp-slide__img {
          width: 100%;
          height: 480px;
          object-fit: cover;
          display: block;
          transition: transform 600ms ease;
        }
        .sp-slide:hover .sp-slide__img {
          transform: scale(1.05);
        }

        /* ── Overlay — transparent, white text, bottom-left ── */
        .sp-slide__overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          padding: 20px 24px;
          max-width: 380px;
          /* Subtle gradient for readability without blocking view */
          background: linear-gradient(
            to right,
            rgba(0,0,0,0.52) 0%,
            rgba(0,0,0,0.18) 70%,
            transparent 100%
          );
        }
        .sp-slide__name {
          font-family: var(--font-title);
          font-size: clamp(1.4rem, 2.5vw, 2rem);
          font-weight: 600;
          color: #fff;
          margin: 0 0 6px;
          line-height: 1.15;
          text-shadow: 0 2px 8px rgba(0,0,0,0.4);
        }
        .sp-slide__tagline {
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.85);
          margin: 0 0 10px;
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
        }
        .sp-slide__details {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 16px;
        }
        .sp-slide__detail {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-body);
          font-size: 0.76rem;
          color: rgba(255,255,255,0.88);
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
        }
        .sp-slide__detail svg {
          color: rgba(255,255,255,0.7);
          flex-shrink: 0;
        }

        /* ── Mobile name top-left — hidden on desktop/tablet ── */
        .sp-slide__mobile-name {
          display: none;
        }

        /* ── Arrow buttons — frosted glass, outside image ── */
        .sp-arrow {
          position: absolute;
          top: calc(50% - 22px); /* centre relative to image, not dots */
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.35);
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: var(--color-espresso);
          transition:
            background var(--transition-base),
            border-color var(--transition-base),
            transform 0.3s ease,
            box-shadow var(--transition-base);
          z-index: 10;
          border-radius: 2px;
        }
        .sp-arrow:hover {
          background: rgba(201,169,110,0.88);
          border-color: rgba(201,169,110,0.9);
          color: #fff;
          transform: translateY(-50%) scale(1.06);
          box-shadow: 0 4px 20px rgba(201,169,110,0.4);
        }
        .sp-arrow--prev {
          left: 4px;
        }
        .sp-arrow--next {
          right: 4px;
        }

        /* ── Dots ── */
        .sp-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 20px;
        }
        .sp-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          background-color: var(--color-bg-premium);
          transition: background-color var(--transition-base), transform var(--transition-base);
          padding: 0;
        }
        .sp-dot--active {
          background-color: var(--color-teal);
          transform: scale(1.25);
        }

        /* ── CTA — suite-highlights-style slide-fill ── */
        .sp-cta-wrap {
          text-align: center;
          margin-top: clamp(28px, 4vw, 44px);
        }
        .sp-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-nav);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-espresso);
          text-decoration: none;
          padding: 14px 36px;
          border: 1.5px solid rgba(86, 51, 17, 0.4);
          border-radius: 3px;
          position: relative;
          overflow: hidden;
          isolation: isolate;
          transition: border-color 0.3s ease, color 0.3s ease,
                      transform 0.28s ease, box-shadow 0.3s ease;
        }
        .sp-cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--color-teal);
          transform: translateX(-110%) skewX(-20deg);
          transition: transform 0.52s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: -1;
        }
        .sp-cta-btn:hover::before {
          transform: translateX(0%) skewX(-20deg);
        }
        .sp-cta-btn:hover {
          border-color: var(--color-teal);
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(201, 169, 110, 0.28);
        }
        .sp-cta-btn__arrow {
          display: inline-block;
          transition: transform 0.25s ease;
          font-style: normal;
        }
        .sp-cta-btn:hover .sp-cta-btn__arrow {
          transform: translateX(5px);
        }

        /* ── Mobile ≤ 639px ── */
        @media (max-width: 639px) {
          /* Full-vw carousel — remove horizontal padding */
          .sp-section .container {
            padding-inline: 0;
          }
          .sp-carousel {
            max-width: 100vw;
            padding-inline: 0;
          }
          .sp-slide-wrapper {
            overflow: hidden;
          }
          .sp-slide__img {
            width: 100vw;
            height: 75vw;
            object-fit: cover;
          }

          /* Mobile overlay — bottom gradient for text readability */
          .sp-slide__overlay {
            background: linear-gradient(
              to top,
              rgba(0,0,0,0.48) 0%,
              rgba(0,0,0,0.12) 65%,
              transparent 100%
            );
            padding: 12px 16px;
            max-width: 100%;
          }
          /* Hide name in overlay — it's shown at top via mobile-name element */
          .sp-slide__overlay .sp-slide__name {
            display: none;
          }

          /* Mobile name — top-left on image */
          .sp-slide__mobile-name {
            display: block;
            position: absolute;
            top: 16px;
            left: 16px;
            z-index: 5;
          }
          .sp-slide__mobile-name__text {
            font-family: var(--font-title);
            font-size: clamp(1.2rem, 5vw, 1.6rem);
            font-weight: 600;
            color: #fff;
            line-height: 1.15;
            text-shadow: 0 2px 8px rgba(0,0,0,0.55);
            margin: 0;
          }

          /* Mobile arrows — inside image at sides */
          .sp-arrow {
            top: calc(37.5vw);
          }
          .sp-arrow--prev { left: 8px; }
          .sp-arrow--next { right: 8px; }

          /* Mobile dots */
          .sp-dots {
            margin-top: 14px;
          }

          /* Mobile CTA — restore container padding for CTA row */
          .sp-cta-wrap {
            padding-inline: var(--section-px);
          }
        }

        /* ── Tablet 640–959px — arrows outside image ── */
        @media (min-width: 640px) and (max-width: 959px) {
          .sp-carousel {
            padding-inline: 52px;
          }
          .sp-slide__img {
            height: 380px;
          }
          .sp-arrow--prev { left: 2px; }
          .sp-arrow--next { right: 2px; }
        }
      `}</style>
    </section>
  )
}
