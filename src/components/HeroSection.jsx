import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Ambient blurred background — served at two resolutions via vite-imagetools (WebP).
import ambientSmall from '../assets/outside-view2.jpeg?w=640&format=webp&quality=92'
import ambientLarge from '../assets/outside-view2.jpeg?w=1920&format=webp&quality=90'

// Cinematic image sequence (right panel, desktop)
import seqImg1 from '../assets/arielview1.jpg?w=1920&format=webp&quality=90'
import seqImg2 from '../assets/outside-view2.jpeg?w=1920&format=webp&quality=90'
import seqImg3 from '../assets/up-view.jpg?w=1920&format=webp&quality=90'
import seqImg4 from '../assets/outside-view.jpg?w=1920&format=webp&quality=90'

// Sequence order — all zoom-out per design spec
const SEQUENCE = [
  { src: seqImg1, zoom: 'out', alt: 'Aerial view of Duma Suites - Watamu coastline' },
  { src: seqImg2, zoom: 'out', alt: 'Duma Suites exterior, Watamu' },
  { src: seqImg3, zoom: 'out', alt: 'Duma Suites upward architectural view' },
  { src: seqImg4, zoom: 'out', alt: 'Duma Suites outdoor coastal view' },
]

// Duration each image is displayed (ms)
const SLIDE_MS = 7000

// Animation delays aligned to the preload curtain reveal
const DELAYS = {
  heading:  2.55,
  subtitle: 4.05,   // starts 0.5 s before the last title letter finishes
  cta:      4.55,
  scroll:   5.0,
}

// ── Framer Motion variants for letter-by-letter title reveal ─────────────────
// Container staggerChildren drives all letter spans in both heading lines.
const TITLE_CONTAINER = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.065,  // 65 ms between each letter → ~2 s total for 24 chars
      delayChildren:   DELAYS.heading,
    },
  },
}
const LETTER_VARIANT = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

/** Splits `text` into individual animated letter spans. */
function AnimatedLetters({ text, keyPrefix }) {
  return text.split('').map((char, i) => (
    <motion.span
      key={`${keyPrefix}-${i}`}
      variants={LETTER_VARIANT}
      style={{ display: 'inline-block' }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  ))
}

export default function HeroSection({ ready = false }) {
  const [activeIdx, setActiveIdx] = useState(0)

  // Start cycling images only after the preload curtain has lifted
  useEffect(() => {
    if (!ready) return
    const interval = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % SEQUENCE.length)
    }, SLIDE_MS)
    return () => clearInterval(interval)
  }, [ready])

  return (
    <section className="hero" id="home">

      {/*
        Ambient blurred background layer.
        Desktop  → visible only on the left 45% (right panel covers it).
        Tablet   → covers the full viewport as a blurred BG behind the sharp image.
        Mobile   → sits at z-index 0 behind the cover-fill cinematic images (not visible).
      */}
      <div className="hero__ambient" aria-hidden="true">
        <picture>
          <source media="(max-width: 640px)" srcSet={ambientSmall} type="image/webp" />
          <source srcSet={ambientLarge} type="image/webp" />
          <img
            className="hero__ambient-img"
            src={ambientLarge}
            alt=""
            draggable={false}
          />
        </picture>
        <div className="hero__ambient-overlay" />
      </div>

      {/*
        Cinematic image sequence panel.
        Desktop  → right 55%, images cross-fade every 7 s with slow zoom.
        Tablet   → absolute, fills viewport, same sequence.
        Mobile   → absolute, fills full 100vw × 100vh as background.
      */}
      <div className="hero__image-panel">
        {/* Fill layer — same images, cover-fit, slight blur; fills dark gaps
            that appear around portrait images (desktop only, z-index 0) */}
        {SEQUENCE.map((item, idx) => (
          <img
            key={`fill-${idx}`}
            className={[
              'hero__seq-fill',
              activeIdx === idx ? 'hero__seq-fill--active' : '',
            ].filter(Boolean).join(' ')}
            src={item.src}
            alt=""
            aria-hidden={true}
            draggable={false}
          />
        ))}
        {SEQUENCE.map((item, idx) => (
          <img
            key={idx}
            className={[
              'hero__seq-img',
              `hero__seq-img--zoom-${item.zoom}`,
              activeIdx === idx ? 'hero__seq-img--active' : '',
            ].filter(Boolean).join(' ')}
            src={item.src}
            alt={activeIdx === idx ? item.alt : ''}
            draggable={false}
          />
        ))}
        {/* Soft gradient blend — desktop only, dissolves the hard left edge */}
        <div className="hero__image-blend" aria-hidden="true" />
      </div>

      {/*
        Content panel.
        Desktop  → left 45%, sits over the blurred ambient.
        Tablet   → absolute bottom overlay, centred text.
        Mobile   → gradient scrim at bottom, text overlaid on cinematic bg.
      */}
      <div className="hero__content-panel">
        <div className="hero__content">

          {/*
            Letter-by-letter title reveal.
            The motion.h1 acts as the stagger container; each motion.span is
            one character. aria-label on the h1 preserves screen-reader access
            while the aria-hidden spans handle the visual split.
          */}
          <motion.h1
            className="hero__heading"
            aria-label="The Art of Coastal Luxury"
            variants={TITLE_CONTAINER}
            initial="hidden"
            animate="visible"
          >
            <span className="hero__heading-top" aria-hidden="true">
              <AnimatedLetters text="THE ART OF" keyPrefix="top" />
            </span>
            <span className="hero__heading-main" aria-hidden="true">
              <em>
                <AnimatedLetters text="COASTAL LUXURY" keyPrefix="main" />
              </em>
            </span>
          </motion.h1>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: DELAYS.subtitle }}
          >
            Discover Watamu&apos;s most refined seaside retreat.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: DELAYS.cta }}
          >
            <a href="#suites" className="hero__cta">
              Explore Suites
              <span className="hero__cta-arrow" aria-hidden="true">→</span>
            </a>
          </motion.div>

        </div>
      </div>

      {/* ── Scroll indicator (hidden on mobile) ── */}
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
          ↓
        </motion.span>
      </motion.a>

      <style>{`
        /* ─────────────────────────────────────────────
           Shared / base
        ───────────────────────────────────────────── */
        .hero {
          position: relative;
          overflow: hidden;
          background-color: #090704;
        }

        /* ── Ambient blurred background ── */
        .hero__ambient {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }
        .hero__ambient-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: blur(28px);
          transform: scale(1.12);
          image-rendering: auto;
          pointer-events: none;
          user-select: none;
        }
        .hero__ambient-overlay {
          position: absolute;
          inset: 0;
          background: rgba(9, 7, 4, 0.76);
        }

        /* ── Image panel ── */
        .hero__image-panel {
          overflow: hidden;
          position: relative;
        }

        /*
          Cinematic image sequence.
          All 4 images live inside the panel, stacked absolutely on top of
          each other. Only the active one is visible (opacity 1). A 1.4 s
          opacity transition produces a smooth cinematic crossfade with no
          harsh cuts. The zoom animation restarts each time an image becomes
          active because the browser sees animation-name change from "none"
          to the target name — so every active-cycle is a fresh animation.
          fill-mode: both ensures zoom-out images sit at their "from" scale
          (1.04) during the fade-in delay, avoiding a visible snap.
        */

        /* ── Fill layer: hidden on all breakpoints; cover mode removes need for it ── */
        .hero__seq-fill {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: none;
          pointer-events: none;
          user-select: none;
          opacity: 0;
          transition: opacity 1.4s ease;
          filter: blur(14px);
          transform: scale(1.10);
          z-index: 0;
        }
        .hero__seq-fill--active {
          opacity: 1;
        }
        .hero__seq-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          display: block;
          pointer-events: none;
          user-select: none;
          opacity: 0;
          transition: opacity 1.4s ease;
          will-change: transform, opacity;
          animation-duration: 14s;
          animation-delay: 0.8s;
          animation-timing-function: ease-in-out;
          animation-fill-mode: both;
          animation-name: none;
          z-index: 1;
        }
        .hero__seq-img--active {
          opacity: 1;
        }
        /* All active images use zoom-out — very slow, barely perceptible */
        .hero__seq-img--active.hero__seq-img--zoom-out {
          animation-name: seqZoomOut;
        }
        /* Very slow zoom-out — starts slightly larger, gently recedes */
        @keyframes seqZoomOut {
          from { transform: scale(1.06); }
          to   { transform: scale(1.00); }
        }

        /* Soft gradient blend overlay — desktop only, dissolves the left edge */
        .hero__image-blend {
          display: none;
        }

        /* ── Content panel ── */
        .hero__content-panel {
          display: flex;
        }
        .hero__content {
          width: 100%;
        }

        /* ── Typography ── */
        .hero__heading {
          font-family: var(--font-dm-serif);
          margin: 0 0 1.2rem;
          line-height: 1.05;
        }
        /* THE ART OF — upper line */
        .hero__heading-top {
          display: block;
          font-size: clamp(2.4rem, 4.8vw, 5rem);
          font-weight: 400;
          font-style: normal;
          color: #ffffff;
          letter-spacing: 0.04em;
          line-height: 1.05;
          text-shadow: 0 2px 48px rgba(0, 0, 0, 0.25);
        }
        /* COASTAL LUXURY — lower line, italic */
        .hero__heading-main {
          display: block;
          font-size: clamp(2.4rem, 4.8vw, 5rem);
          font-weight: 400;
          line-height: 1.05;
          text-shadow: 0 2px 48px rgba(0, 0, 0, 0.25);
        }
        .hero__heading-main em {
          font-style: italic;
          color: #ffffff;
        }
        .hero__subtitle {
          font-family: var(--font-lora);
          font-size: clamp(0.88rem, 1.3vw, 1rem);
          color: rgba(255, 255, 255, 0.58);
          line-height: 1.85;
          margin-bottom: 2.4rem;
          letter-spacing: 0.02em;
        }

        /* ── CTA ── */
        .hero__cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-nav);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #ffffff;
          text-decoration: none;
          padding: 14px 32px;
          border: 1.5px solid rgba(255, 255, 255, 0.45);
          border-radius: 3px;
          transition:
            background-color 0.3s ease,
            border-color 0.3s ease,
            color 0.3s ease,
            transform 0.28s ease,
            box-shadow 0.3s ease;
        }
        .hero__cta:hover {
          background-color: var(--color-teal);
          border-color: var(--color-teal);
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(201, 169, 110, 0.30);
        }
        .hero__cta-arrow {
          display: inline-block;
          transition: transform 0.25s ease;
          font-style: normal;
        }
        .hero__cta:hover .hero__cta-arrow {
          transform: translateX(4px);
        }

        /* ── Scroll indicator ── */
        .hero__scroll {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255, 255, 255, 0.48);
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 10;
          font-size: 1.25rem;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .hero__scroll:hover {
          color: var(--color-teal);
        }

        /* ─────────────────────────────────────────────
           DESKTOP  ≥ 1025px  — Seamless one-canvas layout
           Base: full-hero ambient image (slight blur)
           Left  45%: frosted glass panel over image, warm + translucent
           Right 55%: images fill container fully (cover), zoom-out only
        ───────────────────────────────────────────── */
        @media (min-width: 1025px) {
          .hero {
            display: flex;
            flex-direction: row;
            min-height: 100svh;
          }

          /* Reduce ambient blur — image base should be visible, not fully opaque */
          .hero__ambient-img {
            filter: blur(10px);
            transform: scale(1.06);
          }
          /* Remove dark overlay on desktop — frosted effect replaces it */
          .hero__ambient-overlay {
            background: transparent;
          }

          /* Image panel — right column */
          .hero__image-panel {
            flex: 0 0 55%;
            z-index: 1;
            order: 2;
          }

          /* Cover-fill on desktop: images fill the right panel with no gaps.
             Slight cropping is acceptable per design spec. */
          .hero__seq-img {
            object-fit: cover;
            object-position: center;
          }

          /* Fill layer stays hidden — cover mode eliminates dark-gap problem */
          .hero__seq-fill {
            display: none;
          }

          /* Blend gradient removed per design spec */
          .hero__image-blend {
            display: none;
          }

          /* Content panel — left column */
          .hero__content-panel {
            flex: 0 0 45%;
            position: relative;
            z-index: 2;
            order: 1;
            align-items: center;
            /* Frosted glass: warm translucent overlay + blur over the ambient image */
            backdrop-filter: blur(16px) saturate(1.15);
            -webkit-backdrop-filter: blur(16px) saturate(1.15);
            background: rgba(247, 241, 229, 0.42);
          }
          .hero__content {
            padding: clamp(80px, 10vh, 130px) clamp(28px, 4.5vw, 72px) clamp(60px, 7vh, 100px);
            max-width: 540px;
          }

          /* On the frosted light panel, use dark (espresso) text */
          .hero__heading-top,
          .hero__heading-main em {
            color: var(--color-espresso);
            text-shadow: none;
          }
          .hero__subtitle {
            color: rgba(86, 51, 17, 0.78);
          }
          .hero__cta {
            color: var(--color-espresso);
            border-color: rgba(86, 51, 17, 0.40);
          }
          .hero__cta:hover {
            background-color: var(--color-espresso);
            border-color: var(--color-espresso);
            color: #ffffff;
            box-shadow: 0 8px 28px rgba(86, 51, 17, 0.22);
          }
          .hero__cta:hover .hero__cta-arrow {
            transform: translateX(4px);
          }
        }

        /* ─────────────────────────────────────────────
           TABLET  641 – 1024px  — Full-width cinematic
           Full-viewport image (cover), centered text overlay at bottom.
           No left/right split.
        ───────────────────────────────────────────── */
        @media (min-width: 641px) and (max-width: 1024px) {
          .hero {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            min-height: 100svh;
          }
          .hero__ambient-overlay {
            background: rgba(9, 7, 4, 0.50);
          }
          /* Sequence fills the full viewport */
          .hero__image-panel {
            position: absolute;
            inset: 0;
            z-index: 1;
          }
          /* Cover-fill: images fill the full width with no letterboxing */
          .hero__seq-img {
            object-fit: cover;
            object-position: center;
          }
          /* Content sits at the bottom as a gradient overlay */
          .hero__content-panel {
            position: relative;
            z-index: 3;
            width: 100%;
            justify-content: center;
            background: linear-gradient(
              to top,
              rgba(9, 7, 4, 0.92) 0%,
              rgba(9, 7, 4, 0.40) 55%,
              transparent 100%
            );
            padding-top: 100px;
          }
          .hero__content {
            padding: 48px clamp(20px, 6vw, 80px) 64px;
            max-width: 640px;
            text-align: center;
            margin-inline: auto;
          }
          .hero__cta {
            margin-inline: auto;
          }
          /* Scale heading down proportionally for tablet viewport */
          .hero__heading-top,
          .hero__heading-main em {
            font-size: clamp(2rem, 6vw, 4.5rem);
          }
        }

        /* ─────────────────────────────────────────────
           MOBILE  ≤ 640px  — Full-screen cinematic
           Images fill 100 vw × 100 vh as background.
           Title / subtitle / CTA overlay at bottom.
        ───────────────────────────────────────────── */
        @media (max-width: 640px) {
          .hero {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            min-height: 100svh;
            background-color: #090704;
          }
          /* Cinematic sequence fills the full viewport on mobile */
          .hero__image-panel {
            position: absolute;
            inset: 0;
            z-index: 1;
            height: auto;
            width: auto;
            flex-shrink: unset;
          }
          /* Cover-fill so the full screen is always occupied */
          .hero__seq-img {
            object-fit: cover;
          }
          /*
            Gradient scrim: deep dark at the bottom (where text lives)
            fading up to near-transparent, so the image breathes at the top.
          */
          .hero__content-panel {
            position: relative;
            z-index: 3;
            width: 100%;
            flex: none;
            justify-content: center;
            background: linear-gradient(
              to top,
              rgba(9, 7, 4, 0.96) 0%,
              rgba(9, 7, 4, 0.72) 40%,
              rgba(9, 7, 4, 0.25) 70%,
              transparent 100%
            );
            padding-top: 110px;
          }
          .hero__content {
            padding: 32px 28px 80px;
            text-align: center;
          }
          /* White text — now on a dark cinematic background */
          .hero__heading-top {
            font-size: clamp(1.8rem, 9vw, 3.2rem);
            color: #ffffff;
            text-shadow: 0 2px 32px rgba(0, 0, 0, 0.45);
          }
          .hero__heading-main em {
            font-size: clamp(1.8rem, 9vw, 3.2rem);
            color: #ffffff;
            text-shadow: 0 2px 32px rgba(0, 0, 0, 0.45);
          }
          .hero__subtitle {
            color: rgba(255, 255, 255, 0.65);
          }
          .hero__cta {
            color: #ffffff;
            border-color: rgba(255, 255, 255, 0.45);
            margin-inline: auto;
          }
          .hero__cta:hover {
            background-color: var(--color-teal);
            border-color: var(--color-teal);
            color: #ffffff;
            box-shadow: 0 5px 18px rgba(88, 176, 196, 0.30);
          }
          /* Keep scroll indicator hidden on mobile — content fills screen */
          .hero__scroll {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
