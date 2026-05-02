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

// Sequence order and zoom direction as specified
const SEQUENCE = [
  { src: seqImg1, zoom: 'in',  alt: 'Aerial view of Duma Suites - Watamu coastline' },
  { src: seqImg2, zoom: 'out', alt: 'Duma Suites exterior, Watamu' },
  { src: seqImg3, zoom: 'in',  alt: 'Duma Suites upward architectural view' },
  { src: seqImg4, zoom: 'out', alt: 'Duma Suites outdoor coastal view' },
]

// Duration each image is displayed (ms)
const SLIDE_MS = 7000

// Animation delays aligned to the preload curtain reveal
const DELAYS = {
  heading:  2.55,
  subtitle: 3.05,
  cta:      3.3,
  scroll:   3.85,
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

          <motion.h1
            className="hero__heading"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: DELAYS.heading }}
          >
            <span className="hero__heading-brand">DUMA</span>
            <span className="hero__heading-sub">COASTAL LUXURY REDEFINED</span>
          </motion.h1>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: DELAYS.subtitle }}
          >
            A refined escape along Watamu&apos;s coastline.
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
          animation-duration: 6.2s;
          animation-delay: 0.8s;
          animation-timing-function: ease-in-out;
          animation-fill-mode: both;
          animation-name: none;
        }
        .hero__seq-img--active {
          opacity: 1;
        }
        .hero__seq-img--active.hero__seq-img--zoom-in {
          animation-name: seqZoomIn;
        }
        .hero__seq-img--active.hero__seq-img--zoom-out {
          animation-name: seqZoomOut;
        }
        /* Very slow, barely perceptible zoom — noticeable only on close attention */
        @keyframes seqZoomIn {
          from { transform: scale(1.00); }
          to   { transform: scale(1.04); }
        }
        @keyframes seqZoomOut {
          from { transform: scale(1.04); }
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
          font-family: var(--font-title);
          margin: 0 0 1.2rem;
          line-height: 1;
        }
        /* DUMA — reduced ~2 px from previous max */
        .hero__heading-brand {
          display: block;
          font-size: clamp(4.25rem, 8.5vw, 7.875rem);
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.04em;
          line-height: 1;
          text-shadow: 0 2px 48px rgba(0, 0, 0, 0.25);
        }
        /* COASTAL LUXURY REDEFINED — exactly matches DUMA, italic only difference */
        .hero__heading-sub {
          display: block;
          font-size: clamp(4.25rem, 8.5vw, 7.875rem);
          font-weight: 700;
          font-style: italic;
          color: #ffffff;
          letter-spacing: 0.04em;
          margin-top: 0.08rem;
          line-height: 1;
          text-shadow: 0 2px 48px rgba(0, 0, 0, 0.25);
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
           DESKTOP  ≥ 1025px  — Split layout
           Left 45%: ambient blur + content
           Right 55%: cinematic image sequence
        ───────────────────────────────────────────── */
        @media (min-width: 1025px) {
          .hero {
            display: flex;
            flex-direction: row;
            min-height: 100svh;
          }
          /* Image panel — right column */
          .hero__image-panel {
            flex: 0 0 55%;
            z-index: 1;
            order: 2;
          }
          /*
            Gradient blend dissolves the hard left edge of the image panel
            into the dark ambient background of the content side.
          */
          .hero__image-blend {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 22%;
            height: 100%;
            background: linear-gradient(
              to right,
              rgba(9, 7, 4, 0.95) 0%,
              rgba(9, 7, 4, 0.60) 40%,
              transparent 100%
            );
            z-index: 2;
            pointer-events: none;
          }
          /* Content panel — left column, transparent so ambient shows through */
          .hero__content-panel {
            flex: 0 0 45%;
            position: relative;
            z-index: 2;
            order: 1;
            align-items: center;
          }
          .hero__content {
            padding: clamp(80px, 10vh, 130px) clamp(28px, 4.5vw, 72px) clamp(60px, 7vh, 100px);
            max-width: 540px;
          }
        }

        /* ─────────────────────────────────────────────
           TABLET  641 – 1024px  — Layered full-width
           Background: blurred ambient (full viewport)
           Foreground: cinematic sequence (full viewport, contain)
           Content: centred gradient overlay at bottom
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
          /* Sequence fills the full viewport; contain keeps full images visible */
          .hero__image-panel {
            position: absolute;
            inset: 0;
            z-index: 1;
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
          .hero__heading-brand,
          .hero__heading-sub {
            font-size: clamp(3rem, 7vw, 5.5rem);
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
          .hero__heading-brand {
            font-size: clamp(2.8rem, 11vw, 4rem);
            color: #ffffff;
            text-shadow: 0 2px 32px rgba(0, 0, 0, 0.45);
          }
          .hero__heading-sub {
            font-size: clamp(2.8rem, 11vw, 4rem);
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
