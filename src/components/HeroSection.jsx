import { motion } from 'framer-motion'

// Primary hero image — served at two resolutions via vite-imagetools (WebP).
// Desktop/tablet: 1920w  |  Mobile: 640w
import heroSmall from '../assets/outside-view2.jpeg?w=640&format=webp&quality=92'
import heroLarge from '../assets/outside-view2.jpeg?w=1920&format=webp&quality=90'

// Animation delays aligned to the preload curtain reveal
const DELAYS = {
  eyebrow:  2.3,
  heading:  2.55,
  subtitle: 3.05,
  cta:      3.3,
  scroll:   3.85,
}

export default function HeroSection({ ready = false }) {
  const imgClass = `hero__image-img${ready ? ' hero__image-img--ready' : ''}`

  return (
    <section className="hero" id="home">

      {/*
        Ambient blurred background layer.
        Desktop  → visible only on the left 45% (right panel covers it).
        Tablet   → covers the full viewport as a blurred BG behind the sharp image.
        Mobile   → hidden (not needed for stacked layout).
      */}
      <div className="hero__ambient" aria-hidden="true">
        <picture>
          <source media="(max-width: 640px)" srcSet={heroSmall} type="image/webp" />
          <source srcSet={heroLarge} type="image/webp" />
          <img
            className="hero__ambient-img"
            src={heroLarge}
            alt=""
            draggable={false}
          />
        </picture>
        <div className="hero__ambient-overlay" />
      </div>

      {/*
        Primary sharp image panel.
        Desktop  → right 55%, object-fit: contain (full portrait visible, no crop).
        Tablet   → absolute, fills viewport, object-fit: contain (centred).
        Mobile   → top of stacked layout, object-fit: cover.
      */}
      <div className="hero__image-panel">
        <picture>
          <source media="(max-width: 640px)" srcSet={heroSmall} type="image/webp" />
          <source srcSet={heroLarge} type="image/webp" />
          <img
            className={imgClass}
            src={heroLarge}
            alt="Duma Suites – premium coastal villa exterior, Watamu"
            loading="eager"
            fetchPriority="high"
            draggable={false}
          />
        </picture>
      </div>

      {/*
        Content panel.
        Desktop  → left 45%, sits over the blurred ambient.
        Tablet   → absolute bottom overlay, centred text.
        Mobile   → below the image, light background.
      */}
      <div className="hero__content-panel">
        <div className="hero__content">

          <motion.span
            className="hero__eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: DELAYS.eyebrow }}
          >
            Watamu · Indian Ocean
          </motion.span>

          <motion.h1
            className="hero__heading"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: DELAYS.heading }}
          >
            <span className="hero__heading-brand">DUMA</span>
            <span className="hero__heading-sub">Coastal luxury, redefined.</span>
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

        /* Ambient blurred background */
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

        /* Primary sharp image */
        .hero__image-panel {
          overflow: hidden;
          position: relative;
        }
        .hero__image-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          display: block;
          pointer-events: none;
          user-select: none;
          /* Zoom animation — starts paused, runs once ready=true */
          animation: heroZoomIn 16s ease forwards;
          animation-play-state: paused;
        }
        .hero__image-img--ready {
          animation-play-state: running;
        }
        @keyframes heroZoomIn {
          from { transform: scale(1.00); }
          to   { transform: scale(1.06); }
        }

        /* Content panel */
        .hero__content-panel {
          display: flex;
        }
        .hero__content {
          width: 100%;
        }

        /* Typography */
        .hero__eyebrow {
          display: block;
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: 0.78rem;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.60);
          margin-bottom: 1.25rem;
        }
        .hero__heading {
          font-family: var(--font-title);
          margin: 0 0 1.2rem;
          line-height: 1;
        }
        .hero__heading-brand {
          display: block;
          font-size: clamp(4.5rem, 9vw, 8rem);
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.04em;
          line-height: 1;
          text-shadow: 0 2px 48px rgba(0, 0, 0, 0.25);
        }
        .hero__heading-sub {
          display: block;
          font-size: clamp(1.05rem, 1.8vw, 1.55rem);
          font-weight: 300;
          font-style: italic;
          color: rgba(255, 255, 255, 0.76);
          letter-spacing: 0.05em;
          margin-top: 0.55rem;
          line-height: 1.4;
        }
        .hero__subtitle {
          font-family: var(--font-lora);
          font-size: clamp(0.88rem, 1.3vw, 1rem);
          color: rgba(255, 255, 255, 0.58);
          line-height: 1.85;
          margin-bottom: 2.4rem;
          letter-spacing: 0.02em;
        }

        /* CTA */
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

        /* Scroll indicator */
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
           Right 55%: sharp primary image
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
           Foreground: sharp contain image (full viewport)
           Content: centred overlay at bottom
        ───────────────────────────────────────────── */
        @media (min-width: 641px) and (max-width: 1024px) {
          .hero {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            min-height: 100svh;
          }
          /* Lighter overlay on tablet for image visibility */
          .hero__ambient-overlay {
            background: rgba(9, 7, 4, 0.50);
          }
          /* Sharp image fills viewport — contain so full image is visible */
          .hero__image-panel {
            position: absolute;
            inset: 0;
            z-index: 1;
          }
          .hero__image-img {
            object-fit: contain;
          }
          /* Content sits at the bottom as a gradient overlay */
          .hero__content-panel {
            position: relative;
            z-index: 3;
            width: 100%;
            justify-content: center;
            background: linear-gradient(
              to top,
              rgba(9, 7, 4, 0.88) 0%,
              rgba(9, 7, 4, 0.38) 55%,
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
        }

        /* ─────────────────────────────────────────────
           MOBILE  ≤ 640px  — Stacked layout
           Image at top, content below on light bg
        ───────────────────────────────────────────── */
        @media (max-width: 640px) {
          .hero {
            display: flex;
            flex-direction: column;
            min-height: 100svh;
            background-color: var(--color-bg-primary);
          }
          /* Ambient not needed on mobile */
          .hero__ambient {
            display: none;
          }
          /* Image at top — cover fills the fixed-height container */
          .hero__image-panel {
            position: relative;
            width: 100%;
            height: clamp(240px, 52vw, 370px);
            flex-shrink: 0;
            z-index: 0;
          }
          .hero__image-img {
            object-fit: cover;
            height: 100%;
            width: 100%;
          }
          /* Content below image on light background */
          .hero__content-panel {
            flex: 1;
            position: relative;
            z-index: 1;
            align-items: flex-start;
          }
          .hero__content {
            padding: 32px 24px 72px;
          }
          /* Adapt typography for light background */
          .hero__eyebrow {
            color: var(--color-teal);
          }
          .hero__heading-brand {
            color: var(--color-espresso);
            text-shadow: none;
          }
          .hero__heading-sub {
            color: rgba(86, 51, 17, 0.74);
          }
          .hero__subtitle {
            color: var(--color-text-muted);
          }
          .hero__cta {
            color: var(--color-espresso);
            border-color: rgba(86, 51, 17, 0.42);
          }
          .hero__cta:hover {
            background-color: var(--color-espresso);
            border-color: var(--color-espresso);
            color: #ffffff;
            box-shadow: 0 5px 18px rgba(86, 51, 17, 0.22);
          }
          /* Hide scroll indicator on mobile */
          .hero__scroll {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
