import { useRef, useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

import gm1        from '../assets/General-manager1.jpg'
import gm2        from '../assets/General-managers2.jpg'
import night      from '../assets/nighttime-ariel-view.jpg'
import poolOcean  from '../assets/infinity-pool-ocean-view.jpg'
import groundPool from '../assets/nighttime-groundfloor-poolview.jpg'

// ── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, amount: 0.2 },
  transition:  { duration: 0.75, delay, ease: [0.4, 0, 0.2, 1] },
})

// ── Peeling photo — opaque overlay slides away to reveal the image ───────────
function PeelingPhoto({ src, alt, className, delay = 0 }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })
  return (
    <div
      ref={ref}
      className={`gm-photo ${className}${inView ? ' is-peeled' : ''}`}
      style={{ '--peel-delay': `${delay}s` }}
    >
      <div className="gm-peel-overlay" aria-hidden="true" />
      <img src={src} alt={alt} />
    </div>
  )
}

const VIDEO_BASE_SRC =
  'https://player.vimeo.com/video/1188952042' +
  '?badge=0&autopause=0&player_id=0&app_id=58479' +
  '&byline=0&title=0&portrait=0&dnt=1'

export default function GMMessageSection() {
  const { ref } = useInView({ threshold: 0.1, triggerOnce: true })

  // Track when the video is in / out of the viewport
  const iframeRef = useRef(null)
  const hasAutoplayedRef = useRef(false)
  const [videoSrc, setVideoSrc] = useState(VIDEO_BASE_SRC)

  // Lower threshold so video pauses soon after it leaves view
  const { ref: videoRef, inView: videoInView } = useInView({ threshold: 0.15 })

  // Play once on first entry; pause when scrolled out; resume on re-entry
  useEffect(() => {
    const post = (method, value) => {
      const msg = value !== undefined ? { method, value } : { method }
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify(msg),
        'https://player.vimeo.com'
      )
    }

    if (videoInView) {
      if (!hasAutoplayedRef.current) {
        hasAutoplayedRef.current = true
        setVideoSrc(`${VIDEO_BASE_SRC}&autoplay=1`)
      } else {
        post('play')
      }
    } else if (hasAutoplayedRef.current) {
      post('pause')
    }
  }, [videoInView])

  // Listen for Vimeo finish event → reset to start so end screen never shows
  useEffect(() => {
    const onMsg = (e) => {
      if (e.origin !== 'https://player.vimeo.com') return
      if (e.source !== iframeRef.current?.contentWindow) return
      try {
        const data = JSON.parse(e.data)
        if (data.event === 'finish') {
          const win = iframeRef.current?.contentWindow
          if (!win) return
          const post = (method, value) => {
            const msg = value !== undefined ? { method, value } : { method }
            win.postMessage(JSON.stringify(msg), 'https://player.vimeo.com')
          }
          post('pause')
          post('setCurrentTime', 0)
        }
      } catch { /* ignore parse errors */ }
    }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [])

  // Register for finish event once the iframe is ready
  const handleIframeLoad = () => {
    setTimeout(() => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ method: 'addEventListener', value: 'finish' }),
        'https://player.vimeo.com'
      )
    }, 500)
  }

  return (
    <section className="gm-section section section--premium" id="experience" ref={ref}>

      {/* ── Section eyebrow ── */}
      <motion.span className="eyebrow gm-eyebrow" {...fadeUp(0)}>
        A Word from the General Manager
      </motion.span>

      {/* ─────────────────────────────────────────────────────────────────────
          EDITORIAL LAYOUT
          - Mobile  : single column, 2 inline images (gm1 + night)
          - Tablet  : 70% text block, images alternate left/right (gm1 + night)
          - Desktop : 60% text column; 5 images in side margins (magazine spread)
      ───────────────────────────────────────────────────────────────────────── */}
      <div className="gm-layout">

        {/* ── Left margin images (desktop only) ── */}
        <aside className="gm-margin gm-margin--left" aria-hidden="true">
          {/* Large hero image */}
          <PeelingPhoto
            src={gm1}
            alt="General Manager Andrea Boemo"
            className="gm-photo--large gm-photo--tilt-l"
            delay={0.15}
          />
          {/* Small accent overlapping */}
          <PeelingPhoto
            src={poolOcean}
            alt="Infinity pool ocean view"
            className="gm-photo--small gm-photo--tilt-r gm-photo--overlap-up"
            delay={0.35}
          />
        </aside>

        {/* ── Centre text column ── */}
        <article className="gm-body">

          {/* Opening quote ── large decorative glyph */}
          <motion.div className="gm-quote-glyph" aria-hidden="true" {...fadeUp(0.1)}>❝</motion.div>

          {/* Paragraph 1 */}
          <motion.p className="gm-para gm-para--lead" {...fadeUp(0.2)}>
            At Duma Suites, we do not merely offer accommodation&thinsp;—&thinsp;we craft
            moments. Every sunrise over the Indian Ocean, every breeze that
            carries the scent of the sea, is intentionally woven into the fabric
            of your stay.
          </motion.p>

          {/* Inline image 1 — mobile & tablet only (hidden on desktop) */}
          <PeelingPhoto
            src={gm1}
            alt="General Manager Andrea Boemo"
            className="gm-photo--inline gm-photo--tilt-l"
            delay={0.28}
          />

          {/* Paragraph 2 */}
          <motion.p className="gm-para" {...fadeUp(0.32)}>
            Our team has dedicated itself to redefining what coastal luxury
            means&thinsp;—&thinsp;not through grandeur alone, but through the quiet confidence
            of perfection in every detail. From the linen on your bed to the
            last light of a Watamu sunset, nothing is left to chance.
          </motion.p>

          {/* Inline image 2 — mobile & tablet only (hidden on desktop) */}
          <PeelingPhoto
            src={night}
            alt="Nighttime aerial view of Duma Suites"
            className="gm-photo--inline gm-photo--tilt-r"
            delay={0.40}
          />

          {/* Paragraph 3 */}
          <motion.p className="gm-para" {...fadeUp(0.44)}>
            Watamu is more than a destination; it is a state of mind. Whether
            you arrive seeking adventure along the reef or simply the profound
            peace of the horizon at dusk, Duma Suites will meet you exactly where
            you are — and exceed every expectation you carry.
          </motion.p>

          {/* Closing line */}
          <motion.p className="gm-para gm-para--closing" {...fadeUp(0.52)}>
            Welcome to our home. Watch the short introduction below to see what awaits you.
          </motion.p>

          {/* ── Attribution ── */}
          <motion.div className="gm-attribution" {...fadeUp(0.60)}>
            {/* Name in Parisienne */}
            <p className="gm-name">Andrea Boemo</p>

            {/* Title */}
            <p className="gm-title-label">General Manager, Duma Suites</p>
          </motion.div>

          {/* ── Intro Video ── */}
          <motion.div className="gm-video-wrap" {...fadeUp(0.72)} ref={videoRef}>
            <div className="gm-video-card">
              <div className="gm-video-label" aria-hidden="true">
                <span className="gm-video-line" />
                <span className="gm-video-tag">A Short Introduction</span>
                <span className="gm-video-line" />
              </div>
              <div className="gm-video-frame">
                <iframe
                  ref={iframeRef}
                  src={videoSrc}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                  title="intro-video"
                  onLoad={handleIframeLoad}
                />
              </div>
            </div>
          </motion.div>

        </article>

        {/* ── Right margin images (desktop only) ── */}
        <aside className="gm-margin gm-margin--right" aria-hidden="true">
          {/* Medium portrait */}
          <PeelingPhoto
            src={gm2}
            alt="General Manager Andrea Boemo portrait"
            className="gm-photo--medium gm-photo--tilt-r"
            delay={0.25}
          />
          {/* Medium landscape overlapping */}
          <PeelingPhoto
            src={night}
            alt="Nighttime aerial view"
            className="gm-photo--medium gm-photo--tilt-l gm-photo--overlap-up"
            delay={0.42}
          />
          {/* Small accent at bottom */}
          <PeelingPhoto
            src={groundPool}
            alt="Nighttime ground floor pool view"
            className="gm-photo--small gm-photo--tilt-r"
            delay={0.55}
          />
        </aside>

      </div>

      <style>{`
        /* ── Section shell ── */
        .gm-section {
          background-color: var(--color-bg-premium);
          position: relative;
          overflow: hidden;
        }
        .gm-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at 50% 0%,
            rgba(86, 51, 17, 0.08) 0%,
            transparent 70%
          );
          pointer-events: none;
        }

        /* ── Eyebrow ── */
        .gm-eyebrow {
          display: block;
          text-align: center;
          margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
          color: var(--color-espresso);
          opacity: 0.7;
          font-size: clamp(0.62rem, 1vw, 0.75rem);
          letter-spacing: 0.22em;
        }

        /* ── Layout grid ── */
        .gm-layout {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-areas: 'body';
          gap: 0;
          max-width: 1280px;
          margin-inline: auto;
        }

        /* ── Margin asides — hidden until desktop ── */
        .gm-margin { display: none; }

        /* ── Text body — card treatment for readability ── */
        .gm-body {
          grid-area: body;
          max-width: 70ch;
          margin-inline: auto;
          width: 100%;
          background: rgba(247, 241, 229, 0.58);
          border-radius: 4px;
          padding: clamp(24px, 4vw, 52px) clamp(20px, 4vw, 52px);
          box-shadow: 0 4px 32px rgba(86, 51, 17, 0.08);
          border: 1px solid rgba(212, 194, 168, 0.5);
        }

        /* ── Decorative quote glyph ── */
        .gm-quote-glyph {
          font-family: var(--font-title);
          font-size: clamp(4rem, 10vw, 7rem);
          color: var(--color-teal);
          opacity: 0.22;
          line-height: 1;
          user-select: none;
          text-align: center;
          margin-bottom: -0.35em;
        }

        /* ── Paragraph styles ── */
        .gm-para {
          font-family: var(--font-title);
          font-size: clamp(1rem, 1.9vw, 1.45rem);
          font-style: italic;
          font-weight: 400;
          color: var(--color-espresso);
          line-height: 1.8;
          margin-bottom: clamp(1.2rem, 2.5vw, 1.8rem);
          quotes: none;
        }
        .gm-para--lead {
          font-size: clamp(1.12rem, 2.2vw, 1.65rem);
          font-weight: 300;
          line-height: 1.85;
          /* Teal left border accent to highlight lead para */
          border-left: 3px solid var(--color-teal);
          padding-left: clamp(14px, 2vw, 22px);
          margin-left: -3px;
        }
        .gm-para--closing {
          font-size: clamp(0.98rem, 1.8vw, 1.35rem);
          font-style: italic;
          color: var(--color-text-muted);
          margin-top: 0.25rem;
          margin-bottom: 0;
          line-height: 1.75;
        }

        /* ── Photo wrapper — shared base ── */
        .gm-photo {
          position: relative;
          overflow: hidden;
          box-shadow: 6px 8px 28px rgba(86, 51, 17, 0.22);
          outline: 2px solid rgba(212, 194, 168, 0.55);
          outline-offset: -2px;
          flex-shrink: 0;
          transition:
            transform 0.45s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.45s ease;
        }
        .gm-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* ── Peel overlay ── */
        .gm-peel-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: var(--color-bg-premium);
          transform: translateY(0%);
          transition: transform 0.75s ease-in-out var(--peel-delay, 0s);
          pointer-events: none;
        }
        .gm-photo.is-peeled .gm-peel-overlay { transform: translateY(-101%); }

        .gm-photo--inline.gm-photo--tilt-l { --base-rot: -1.5deg; transform: rotate(var(--base-rot)); }
        .gm-photo--inline.gm-photo--tilt-r { --base-rot:  1.5deg; transform: rotate(var(--base-rot)); }

        /* ── Inline images (mobile + tablet only) ── */
        .gm-photo--inline {
          width: min(44%, 180px);
          aspect-ratio: 4 / 5;
          margin-bottom: 1.2rem;
        }
        .gm-photo--inline.gm-photo--tilt-l {
          float: left;
          margin-right: 16px;
          shape-outside: margin-box;
        }
        .gm-photo--inline.gm-photo--tilt-r {
          float: right;
          margin-left: 16px;
          shape-outside: margin-box;
        }

        /* Clear floats */
        .gm-body::after { content: ''; display: table; clear: both; }

        /* ── Attribution ── */
        .gm-attribution {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.45rem;
          margin-top: clamp(1.8rem, 3vw, 2.8rem);
          padding-top: clamp(1.4rem, 2.5vw, 2rem);
          clear: both;
          /* Decorative separator using box border */
          border-top: 1px solid rgba(86, 51, 17, 0.15);
          position: relative;
        }
        /* Small ornament on the divider */
        .gm-attribution::before {
          content: '✦';
          position: absolute;
          top: -0.65em;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(247, 241, 229, 0.85);
          padding: 0 10px;
          color: var(--color-teal);
          font-size: 0.75rem;
          line-height: 1;
        }
        .gm-name {
          font-family: var(--font-gm);
          font-size: clamp(1.7rem, 3.5vw, 2.6rem);
          color: var(--color-espresso);
          line-height: 1.15;
          text-align: center;
        }
        .gm-title-label {
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: 0.68rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-teal);
          text-align: center;
        }

        /* ── Intro Video — dark card ── */
        .gm-video-wrap {
          margin-top: clamp(2rem, 3.5vw, 3rem);
          clear: both;
        }
        .gm-video-card {
          background: rgba(22, 16, 10, 0.88);
          border-radius: 6px;
          padding: clamp(16px, 2.5vw, 28px);
          box-shadow: 0 12px 48px rgba(0,0,0,0.28);
        }
        .gm-video-label {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 1rem;
        }
        .gm-video-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.18);
        }
        .gm-video-tag {
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #ffffff;   /* ← white as requested */
          white-space: nowrap;
        }
        .gm-video-frame {
          position: relative;
          width: 100%;
          padding-bottom: 56.6%;
          border-radius: 3px;
          overflow: hidden;
          background: #000;
        }
        .gm-video-frame iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        /* ─────────────────────────────────────────────
           TABLET  768 – 1199px
        ───────────────────────────────────────────── */
        @media (min-width: 768px) and (max-width: 1199px) {
          .gm-layout { padding-inline: var(--section-px); }
          .gm-body   { max-width: 72vw; }
          .gm-photo--inline { width: min(36%, 220px); }
          .gm-peel-overlay  { transition-duration: 0.9s; }
          .gm-photo.is-peeled .gm-peel-overlay { transform: translate(101%, -101%); }
        }

        /* ─────────────────────────────────────────────
           DESKTOP  ≥ 1200px — magazine with side margins
        ───────────────────────────────────────────── */
        @media (min-width: 1200px) {
          .gm-layout {
            grid-template-columns: 260px 1fr 260px;
            grid-template-areas: 'left body right';
            align-items: start;
            gap: 0 40px;
            padding-inline: var(--section-px);
          }
          .gm-margin {
            display: flex;
            flex-direction: column;
            gap: 96px;
            padding-top: 3rem;
          }
          .gm-margin--left  { grid-area: left;  align-items: flex-end;   }
          .gm-margin--right { grid-area: right; align-items: flex-start; }
          .gm-body {
            grid-area: body;
            max-width: 62ch;
            margin-inline: auto;
          }
          .gm-photo--inline { display: none; }
          .gm-peel-overlay  { transition-duration: 1.1s; }
          .gm-photo.is-peeled .gm-peel-overlay { transform: translateX(101%); }

          .gm-photo--large  { width: 100%; max-width: 320px; aspect-ratio: 3 / 4; }
          .gm-photo--medium { width: 100%; max-width: 240px; aspect-ratio: 4 / 5; }
          .gm-photo--small  { width: 100%; max-width: 180px; aspect-ratio: 1 / 1; }
          .gm-photo--overlap-up { margin-top: 0; }

          .gm-margin--left  .gm-photo--tilt-l { --base-rot: -3deg;   transform: rotate(var(--base-rot)); }
          .gm-margin--left  .gm-photo--tilt-r { --base-rot:  2.5deg; transform: rotate(var(--base-rot)); }
          .gm-margin--right .gm-photo--tilt-r { --base-rot:  3deg;   transform: rotate(var(--base-rot)); }
          .gm-margin--right .gm-photo--tilt-l { --base-rot: -2deg;   transform: rotate(var(--base-rot)); }
          .gm-photo:hover {
            transform: translateY(-5px) rotate(var(--base-rot, 0deg));
            box-shadow: 8px 14px 40px rgba(86, 51, 17, 0.30);
          }

          /* Wider video on desktop */
          .gm-video-wrap { margin-inline: -3rem; }
        }
      `}</style>
    </section>
  )
}

