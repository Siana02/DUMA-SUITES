import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

// Each hero image is imported at two resolutions via vite-imagetools, which converts
// the source JPEGs to WebP at build time.  The browser picks the appropriate size:
//   640w  → mobile / narrow viewports
//  1920w  → tablet and desktop
//
// NOTE: All four source images are portrait (1200 × 1600, 3∶4).
// On desktop (landscape viewport) we use object-fit: contain so the entire image is
// visible from the first frame — no crops.  Subtle side-fade gradients blend the dark
// letterbox areas into the hero background for a cinematic look.
// On mobile the portrait images naturally fill the phone screen (object-fit: cover).

import aerial640    from '../assets/arielview1.jpg?w=640&format=webp&quality=92'
import aerial1920   from '../assets/arielview1.jpg?w=1920&format=webp&quality=90'
import outside2_640  from '../assets/outside-view2.jpeg?w=640&format=webp&quality=92'
import outside2_1920 from '../assets/outside-view2.jpeg?w=1920&format=webp&quality=90'
import upView640    from '../assets/up-view.jpg?w=640&format=webp&quality=92'
import upView1920   from '../assets/up-view.jpg?w=1920&format=webp&quality=90'
import outside640   from '../assets/outside-view.jpg?w=640&format=webp&quality=92'
import outside1920  from '../assets/outside-view.jpg?w=1920&format=webp&quality=90'

const SLIDES = [
  { small: aerial640,     large: aerial1920,    zoom: 'in',  alt: 'Aerial view of Duma Suites Watamu' },
  { small: outside2_640,  large: outside2_1920, zoom: 'out', alt: 'Duma Suites exterior — outside view' },
  { small: upView640,     large: upView1920,    zoom: 'in',  alt: 'Architectural up-view of Duma Suites' },
  { small: outside640,    large: outside1920,   zoom: 'out', alt: 'Duma Suites outdoor living' },
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            {/*
              <picture> serves the right WebP size to each device.
              object-fit: contain (desktop) → full portrait image visible, no crop.
              object-fit: cover   (mobile)  → fills phone screen naturally.
            */}
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet={slide.small}
                type="image/webp"
              />
              <source srcSet={slide.large} type="image/webp" />
              <img
                className="hero__slide-img"
                src={slide.large}
                alt={slide.alt}
                loading={index === 0 ? 'eager' : 'auto'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                draggable={false}
              />
            </picture>
          </motion.div>
        </AnimatePresence>

        {/* Bottom gradient for text legibility */}
        <div className="hero__gradient" aria-hidden="true" />
        {/* Side fades: blend the dark letterbox bars into the background */}
        <div className="hero__side-fades" aria-hidden="true" />
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
          /*
           * Near-black background colour that shows in the letterbox bars
           * beside the portrait images on wide desktop screens.
           */
          background-color: #090704;
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
          will-change: opacity, transform;
          /*
           * GPU-compositing hints: force the slide onto its own layer so the
           * browser uses its highest-quality texture sampler when scaling.
           */
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        /*
         * The <img> fills its parent slide div.
         *
         * Desktop (> 768 px): object-fit: contain
         *   → The full portrait image is always visible.  Dark background colour
         *     shows in the letterbox bars on the sides.
         *
         * Mobile (≤ 768 px): object-fit: cover (media query below)
         *   → The portrait image fills the phone screen naturally.
         */
        .hero__slide-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          display: block;
          /* Highest-quality scaling in every browser */
          image-rendering: -webkit-optimize-contrast;
          image-rendering: smooth;
          image-rendering: high-quality;
          -ms-interpolation-mode: bicubic;
          user-select: none;
          pointer-events: none;
        }
        @media (max-width: 768px) {
          .hero__slide-img {
            object-fit: cover;
          }
        }

        /*
         * Ken Burns — both directions start at scale(1) = "full view".
         * The first 25 % is a static hold so the image is seen at its
         * natural scale before the zoom begins.
         * Scale is intentionally subtle (1.0 → 1.06 / 0.97) so the
         * contain-mode image stays fully visible throughout.
         */
        .hero__slide--zoom-in {
          animation: heroZoomIn 6s ease forwards;
        }
        .hero__slide--zoom-out {
          animation: heroZoomOut 6s ease forwards;
        }
        @keyframes heroZoomIn {
          0%,  25% { transform: scale(1.00); }
          100%     { transform: scale(1.06); }
        }
        @keyframes heroZoomOut {
          0%,  25% { transform: scale(1.00); }
          100%     { transform: scale(0.97); }
        }

        /* Bottom gradient overlay for text legibility */
        .hero__gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(86, 51, 17, 0.65) 0%,
            rgba(86, 51, 17, 0.22) 38%,
            transparent 68%
          );
          pointer-events: none;
        }

        /*
         * Side-fade overlays — fade the letterbox bars (visible on desktop when
         * portrait images don't fill the full width) into the dark background.
         * Hidden on mobile where cover mode fills the full viewport.
         */
        .hero__side-fades {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to right, #090704 0%, transparent 18%),
            linear-gradient(to left,  #090704 0%, transparent 18%);
          pointer-events: none;
        }
        @media (max-width: 768px) {
          .hero__side-fades { display: none; }
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

