import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

import aerialImg      from '../assets/arielview1.jpg'
import outsideView2   from '../assets/outside-view2.jpeg'
import upViewImg      from '../assets/up-view.JPEG'
import outsideViewImg from '../assets/outside-view.jpg'

const SLIDES = [
  { src: aerialImg,      zoom: 'in',  alt: 'Aerial view of Duma Suites Watamu' },
  { src: outsideView2,   zoom: 'out', alt: 'Duma Suites exterior — outside view' },
  { src: upViewImg,      zoom: 'in',  alt: 'Architectural up-view of Duma Suites' },
  { src: outsideViewImg, zoom: 'out', alt: 'Duma Suites outdoor living' },
]

const SLIDE_MS = 4000 // ms each slide is visible

export default function HeroSection() {
  const [index, setIndex]     = useState(0)
  const [slideKey, setSlideKey] = useState(0) // increment to force fresh CSS animation

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % SLIDES.length)
      setSlideKey(k => k + 1)
    }, SLIDE_MS)
    return () => clearInterval(id)
  }, [])

  const slide = SLIDES[index]

  return (
    <section className="hero" id="home">
      {/* ── Cinematic image sequence ── */}
      <div className="hero__images" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div
            key={slideKey}
            className={`hero__slide hero__slide--zoom-${slide.zoom}`}
            style={{ backgroundImage: `url(${slide.src})` }}
            role="img"
            aria-label={slide.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </AnimatePresence>

        {/* Bottom gradient for text legibility */}
        <div className="hero__gradient" aria-hidden="true" />
      </div>

      {/* ── Hero content ── */}
      <div className="hero__content">
        <motion.span
          className="hero__eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.3 }}
        >
          Watamu · Indian Ocean
        </motion.span>

        <motion.h1
          className="hero__heading"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 2.6 }}
        >
          Where Coastal Luxury Meets
          <br />
          <em>Timeless Serenity</em>
        </motion.h1>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.0 }}
        >
          Experience Watamu&apos;s most refined seaside escape.
        </motion.p>

        <motion.div
          className="hero__ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 3.3 }}
        >
          <a href="#suites" className="btn hero__btn-primary">
            Explore Suites
          </a>
          <a href="#gallery" className="btn hero__btn-outline">
            View Gallery
          </a>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.a
        href="#suites"
        className="hero__scroll"
        aria-label="Scroll to suites"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.9, duration: 0.6 }}
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown size={24} strokeWidth={1.5} />
        </motion.span>
      </motion.a>

      <style>{`
        /* ── Layout ── */
        .hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        /* ── Images ── */
        .hero__images {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hero__slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          will-change: opacity, transform;
        }
        /* Ken Burns — zoom IN (scale 1 → 1.08) */
        .hero__slide--zoom-in {
          animation: heroZoomIn 5s ease forwards;
        }
        /* Ken Burns — zoom OUT (scale 1.08 → 1) */
        .hero__slide--zoom-out {
          animation: heroZoomOut 5s ease forwards;
        }
        @keyframes heroZoomIn {
          from { transform: scale(1); }
          to   { transform: scale(1.08); }
        }
        @keyframes heroZoomOut {
          from { transform: scale(1.08); }
          to   { transform: scale(1); }
        }

        /* Bottom gradient overlay */
        .hero__gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(86, 51, 17, 0.60) 0%,
            rgba(86, 51, 17, 0.22) 38%,
            transparent 68%
          );
          pointer-events: none;
        }

        /* ── Content ── */
        .hero__content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 160px var(--section-px) 120px;
          max-width: 820px;
          width: 100%;
        }
        .hero__eyebrow {
          display: inline-block;
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: 0.8rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.78);
          margin-bottom: 1.25rem;
        }
        .hero__heading {
          font-family: var(--font-title);
          font-size: clamp(2.6rem, 6.5vw, 5rem);
          font-weight: 300;
          color: #ffffff;
          line-height: 1.12;
          margin-bottom: 1.5rem;
        }
        .hero__heading em {
          font-style: italic;
          color: rgba(255, 255, 255, 0.92);
        }
        .hero__subtitle {
          font-family: var(--font-lora);
          font-size: clamp(1rem, 1.6vw, 1.15rem);
          color: rgba(255, 255, 255, 0.80);
          line-height: 1.75;
          max-width: 500px;
          margin-inline: auto;
          margin-bottom: 2.5rem;
        }

        /* ── CTAs ── */
        .hero__ctas {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .hero__btn-primary {
          background-color: var(--color-teal);
          color: #fff;
          border-radius: 8px;
          font-size: 0.7rem;
          padding: 14px 38px;
          transition:
            background-color var(--transition-base),
            transform var(--transition-base);
        }
        .hero__btn-primary:hover {
          background-color: var(--color-teal-dark);
          color: #fff;
          transform: scale(1.02) translateY(-1px);
        }
        .hero__btn-outline {
          background-color: transparent;
          color: #fff;
          border: 1.5px solid rgba(255, 255, 255, 0.72);
          border-radius: 8px;
          font-size: 0.7rem;
          padding: 14px 38px;
          transition:
            background-color var(--transition-base),
            color var(--transition-base),
            border-color var(--transition-base),
            transform var(--transition-base);
        }
        .hero__btn-outline:hover {
          background-color: #fff;
          color: var(--color-espresso);
          border-color: #fff;
          transform: scale(1.02) translateY(-1px);
        }

        /* ── Scroll indicator ── */
        .hero__scroll {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255, 255, 255, 0.60);
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 2;
          transition: color var(--transition-base);
        }
        .hero__scroll:hover {
          color: rgba(255, 255, 255, 0.92);
        }

        /* ── Mobile ── */
        @media (max-width: 600px) {
          .hero__ctas {
            flex-direction: column;
            align-items: center;
          }
          .hero__btn-primary,
          .hero__btn-outline {
            width: 100%;
            max-width: 280px;
            justify-content: center;
          }
          /* Slower zoom on mobile to avoid motion sickness */
          .hero__slide--zoom-in,
          .hero__slide--zoom-out {
            animation-duration: 8s;
          }
        }
      `}</style>
    </section>
  )
}

