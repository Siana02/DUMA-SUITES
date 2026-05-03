import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { Maximize2, BedDouble, Users, ChevronLeft, ChevronRight } from 'lucide-react'

import cheetahIcon from '../assets/cheetah.png'
import coastalPreview from '../assets/1bedroom-coastal-haven-suite-preview.JPEG'
import serenityPreview from '../assets/serenity-villa-3bedroomsuite-preview.JPEG'

const SUITES = [
  {
    id: 'coastal-haven',
    name: 'Coastal Haven Suite',
    tagline: '1-Bedroom · Intimate Coastal Retreat',
    size: '25 sq m',
    beds: '1 King Bed',
    guests: '2+ Guests',
    href: '/suites/coastal-haven',
    image: coastalPreview,
  },
  {
    id: 'serenity-villa',
    name: 'Serenity Villa Suite',
    tagline: '3-Bedroom · Luxury Family Retreat',
    size: '75 sq m',
    beds: '3 King Beds',
    guests: '6+ Guests',
    href: '/suites/serenity-villa',
    image: serenityPreview,
  },
]

const AUTO_ADVANCE_MS = 7000

export default function SuitesPreviewSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const navigate = useNavigate()

  const { ref: sectionRef, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  const goTo = useCallback((index) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }, [current])

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((c) => (c + 1) % SUITES.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((c) => (c - 1 + SUITES.length) % SUITES.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, AUTO_ADVANCE_MS)
    return () => clearInterval(timer)
  }, [next])

  const suite = SUITES[current]

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
            Suites Preview
          </motion.span>

          <motion.div className="sp-divider" {...fadeUp(0.1)} aria-hidden="true">
            <span className="sp-divider__line sp-divider__line--left" />
            <img src={cheetahIcon} alt="" className="sp-divider__cheetah" />
            <span className="sp-divider__line sp-divider__line--right" />
          </motion.div>

          <motion.h2 className="section-title sp-title" {...fadeUp(0.18)}>
            The Duma Suites
          </motion.h2>

          <motion.p className="sp-intro" {...fadeUp(0.26)}>
            Discover refined living spaces designed for coastal serenity.
          </motion.p>
        </div>

        {/* Carousel */}
        <motion.div className="sp-carousel" aria-label="Suite preview carousel" {...fadeUp(0.34)}>
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

                {/* Bottom-left overlay */}
                <div className="sp-slide__overlay">
                  <p className="sp-slide__tagline">{suite.tagline}</p>
                  <h3 className="sp-slide__name">{suite.name}</h3>
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
              </motion.div>
            </AnimatePresence>

            {/* Arrow buttons */}
            <button
              className="sp-arrow sp-arrow--prev"
              onClick={(e) => { e.stopPropagation(); prev() }}
              aria-label="Previous suite"
            >
              <ChevronLeft size={20} strokeWidth={2} />
            </button>
            <button
              className="sp-arrow sp-arrow--next"
              onClick={(e) => { e.stopPropagation(); next() }}
              aria-label="Next suite"
            >
              <ChevronRight size={20} strokeWidth={2} />
            </button>
          </div>

          {/* Dots */}
          <div className="sp-dots" role="tablist" aria-label="Suite slides">
            {SUITES.map((s, i) => (
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
          <a href="/suites" className="btn btn-primary sp-cta">
            Explore All Suites
          </a>
        </motion.div>
      </div>

      <style>{`
        .sp-section {
          background-color: var(--color-bg-secondary);
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

        /* ── Carousel wrapper ── */
        .sp-carousel {
          max-width: 960px;
          margin-inline: auto;
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

        /* ── Overlay (bottom-left, cream bg) ── */
        .sp-slide__overlay {
          position: absolute;
          bottom: 28px;
          left: 28px;
          background-color: rgba(247, 241, 229, 0.96);
          padding: 16px 20px;
          border-radius: 0;
          max-width: 340px;
        }
        .sp-slide__tagline {
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-teal);
          margin: 0 0 6px;
        }
        .sp-slide__name {
          font-family: var(--font-title);
          font-size: clamp(1.4rem, 2.5vw, 2rem);
          font-weight: 600;
          color: var(--color-espresso);
          margin: 0 0 10px;
          line-height: 1.15;
        }
        .sp-slide__details {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 18px;
        }
        .sp-slide__detail {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-body);
          font-size: 0.78rem;
          color: var(--color-text-muted);
        }
        .sp-slide__detail svg {
          color: var(--color-teal);
          flex-shrink: 0;
        }

        /* ── Arrow buttons ── */
        .sp-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: var(--color-espresso);
          color: #fff;
          border: none;
          cursor: pointer;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color var(--transition-base);
          z-index: 10;
        }
        .sp-arrow:hover {
          background-color: var(--color-teal);
        }
        .sp-arrow--prev {
          left: 16px;
        }
        .sp-arrow--next {
          right: 16px;
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

        /* ── CTA ── */
        .sp-cta-wrap {
          text-align: center;
          margin-top: clamp(28px, 4vw, 44px);
        }

        /* ── Mobile ── */
        @media (max-width: 639px) {
          .sp-slide__img {
            height: 300px;
          }
          .sp-slide__overlay {
            bottom: 16px;
            left: 16px;
            right: 16px;
            max-width: none;
          }
          .sp-arrow {
            width: 36px;
            height: 36px;
          }
          .sp-arrow--prev { left: 8px; }
          .sp-arrow--next { right: 8px; }
        }
      `}</style>
    </section>
  )
}
