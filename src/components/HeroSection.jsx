import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

// ── Responsive image imports ────────────────────────────────────────────────
// Each hero image is imported at three widths so the browser can pick the
// smallest file that still looks sharp for the current viewport.
// vite-imagetools converts JPEG → WebP and resizes at build time.

import aerialImg_sm      from '../assets/arielview1.jpg?format=webp&quality=88&width=800'
import aerialImg_md      from '../assets/arielview1.jpg?format=webp&quality=93&width=1440'
import aerialImg_lg      from '../assets/arielview1.jpg?format=webp&quality=98'

import outsideView2_sm   from '../assets/outside-view2.jpeg?format=webp&quality=88&width=800'
import outsideView2_md   from '../assets/outside-view2.jpeg?format=webp&quality=93&width=1440'
import outsideView2_lg   from '../assets/outside-view2.jpeg?format=webp&quality=98'

import upViewImg_sm      from '../assets/up-view.jpg?format=webp&quality=88&width=800'
import upViewImg_md      from '../assets/up-view.jpg?format=webp&quality=93&width=1440'
import upViewImg_lg      from '../assets/up-view.jpg?format=webp&quality=98'

import outsideViewImg_sm from '../assets/outside-view.jpg?format=webp&quality=88&width=800'
import outsideViewImg_md from '../assets/outside-view.jpg?format=webp&quality=93&width=1440'
import outsideViewImg_lg from '../assets/outside-view.jpg?format=webp&quality=98'

const SLIDES = [
  {
    src:    aerialImg_lg,
    srcSet: `${aerialImg_sm} 800w, ${aerialImg_md} 1440w, ${aerialImg_lg} 2560w`,
    zoom: 'in',
    alt: 'Aerial view of Duma Suites Watamu',
  },
  {
    src:    outsideView2_lg,
    srcSet: `${outsideView2_sm} 800w, ${outsideView2_md} 1440w, ${outsideView2_lg} 2560w`,
    zoom: 'out',
    alt: 'Duma Suites exterior — outside view',
  },
  {
    src:    upViewImg_lg,
    srcSet: `${upViewImg_sm} 800w, ${upViewImg_md} 1440w, ${upViewImg_lg} 2560w`,
    zoom: 'in',
    alt: 'Architectural up-view of Duma Suites',
  },
  {
    src:    outsideViewImg_lg,
    srcSet: `${outsideViewImg_sm} 800w, ${outsideViewImg_md} 1440w, ${outsideViewImg_lg} 2560w`,
    zoom: 'out',
    alt: 'Duma Suites outdoor living',
  },
]

const SLIDE_MS = 4000 // ms each slide is visible

// Animation delays aligned to the preload curtain reveal (panels open at ~1.8s)
const DELAYS = {
  eyebrow:  2.3,
  heading:  2.6,
  subtitle: 3.0,
  ctas:     3.3,
  scroll:   3.9,
}

export default function HeroSection({ ready = false }) {
  const [index, setIndex]       = useState(0)
  const [slideKey, setSlideKey] = useState(0) // increment to force fresh CSS animation

  // Don't start the slide rotation until the preloader has finished so that
  // the very first image is presented at its natural (un-zoomed) scale.
  useEffect(() => {
    if (!ready) return
    const id = setInterval(() => {
      setIndex(i => (i + 1) % SLIDES.length)
      setSlideKey(k => k + 1)
    }, SLIDE_MS)
    return () => clearInterval(id)
  }, [ready])

  const slide = SLIDES[index]

  return (
    <section className="hero" id="home">
      {/* ── Cinematic image sequence ── */}
      <div className="hero__images" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div
            key={slideKey}
            className={`hero__slide hero__slide--zoom-${slide.zoom}${ready ? ' hero__slide--running' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            {/*
             * <img> with srcset lets the browser download only the resolution
             * it needs for the current viewport — full quality on desktop,
             * lighter file on mobile — while object-fit: cover preserves the
             * cinematic full-bleed framing.
             */}
            <img
              className="hero__slide-img"
              src={slide.src}
              srcSet={slide.srcSet}
              sizes="100vw"
              alt={slide.alt}
              draggable="false"
              fetchPriority={index === 0 ? 'high' : 'auto'}
            />
          </motion.div>
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
          transition={{ duration: 0.8, delay: DELAYS.eyebrow }}
        >
          Watamu · Indian Ocean
        </motion.span>

        <motion.h1
          className="hero__heading"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: DELAYS.heading }}
        >
          Where Coastal Luxury Meets
          <br />
          <em>Timeless Serenity</em>
        </motion.h1>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: DELAYS.subtitle }}
        >
          Experience Watamu's most refined seaside escape.
        </motion.p>

        <motion.div
          className="hero__ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: DELAYS.ctas }}
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
        transition={{ delay: DELAYS.scroll, duration: 0.6 }}
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
          /*
           * Expand each slide 8 % beyond the viewport on every edge.
           * This gives the zoom-out animation room to shrink without
           * revealing empty space — 0.90 × 116 % ≈ 104 % still covers.
           */
          inset: -8%;
          overflow: hidden;
          will-change: opacity, transform;
          /*
           * GPU-compositing hints: force the slide onto its own layer so the
           * browser uses its highest-quality texture sampler when scaling.
           */
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        /* The <img> fills its container with cover-fit, identical to the old
           background-size:cover approach but compatible with srcset / sizes. */
        .hero__slide-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          pointer-events: none;
          image-rendering: -webkit-optimize-contrast; /* Safari  */
          image-rendering: smooth;                    /* Firefox */
          image-rendering: high-quality;              /* Chrome / Edge */
        }
        /*
         * Ken Burns — both directions start at scale(1) = "full view".
         * The first 25 % of the animation is a hold so the image is seen
         * at its natural scale before the zoom begins (25 % of 6 s ≈ 1.5 s dwell).
         * translateZ(0) stays on the class; only scale changes in the keyframes.
         *
         * Animations start PAUSED so the first slide holds at scale(1) while the
         * preloader is visible.  Adding hero__slide--running (when ready=true)
         * resumes them — because the animation was paused at its 0 % keyframe
         * (scale 1), it always begins from the fully-framed starting position.
         */
        .hero__slide--zoom-in {
          animation: heroZoomIn 6s ease forwards;
          animation-play-state: paused;
        }
        .hero__slide--zoom-out {
          animation: heroZoomOut 6s ease forwards;
          animation-play-state: paused;
        }
        .hero__slide--zoom-in.hero__slide--running,
        .hero__slide--zoom-out.hero__slide--running {
          animation-play-state: running;
        }
        @keyframes heroZoomIn {
          0%   { transform: scale(1);    }
          25%  { transform: scale(1);    }
          100% { transform: scale(1.12); }
        }
        @keyframes heroZoomOut {
          0%   { transform: scale(1);    }
          25%  { transform: scale(1);    }
          100% { transform: scale(0.90); }
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

