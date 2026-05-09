import { useRef, useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { ArrowRight, BedDouble } from 'lucide-react'
import { useT } from '../i18n/useT.js'

import gm1        from '../assets/General-manager1.jpg'
import gm2        from '../assets/General-managers2.jpg'
import night      from '../assets/nighttime-ariel-view.jpg'
import poolOcean  from '../assets/infinity-pool-ocean-view.jpg'
import groundPool from '../assets/nighttime-groundfloor-poolview.jpg'
import gallery12  from '../assets/gallery-image12.JPEG'

// ── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, amount: 0.2 },
  transition:  { duration: 0.75, delay, ease: [0.4, 0, 0.2, 1] },
})

// ── Peeling photo — opaque overlay slides away to reveal the image ───────────
// peel direction: 'left' slides overlay to the left, 'right' to the right
function PeelingPhoto({ src, alt, className, delay = 0, peel = 'right' }) {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true })
  return (
    <div
      ref={ref}
      className={`gm-photo ${className}${inView ? ' is-peeled' : ''}`}
      style={{ '--peel-delay': `${delay}s`, '--peel-dir': peel === 'left' ? '-101%' : '101%' }}
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
  const t = useT().gm

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

      {/* ── Warm welcome intro ── */}
      <motion.p className="gm-welcome-intro" {...fadeUp(0)}>
        {t.welcome}
      </motion.p>

      {/* ── Section eyebrow ── */}
      <motion.span className="eyebrow gm-eyebrow" {...fadeUp(0.08)}>
        {t.eyebrow}
      </motion.span>

      {/* ─────────────────────────────────────────────────────────────────────
          EDITORIAL LAYOUT
          - Mobile  : single column, 2 inline images (gm1 + night)
          - Tablet  : 70% text block, images alternate left/right (gm1 + night)
          - Desktop : 60% text column; 6 images in side margins (magazine spread)
            Left  (3): gm1 large-hero, poolOcean small, gallery12 medium
            Right (3): gm2 medium-large, night small, groundPool medium
      ───────────────────────────────────────────────────────────────────────── */}
      <div className="gm-layout">

        {/* ── Left margin images (desktop only) ── */}
        <aside className="gm-margin gm-margin--left" aria-hidden="true">
          {/* Hero large — 400px, peels rightward */}
          <PeelingPhoto
            src={gm1}
            alt="Duma Suites coastal property"
            className="gm-photo--hero gm-photo--tilt-l"
            delay={0.15}
            peel="right"
          />
          {/* Small accent — peels leftward, slight overlap */}
          <PeelingPhoto
            src={poolOcean}
            alt="Infinity pool ocean view"
            className="gm-photo--small gm-photo--tilt-r gm-photo--offset-r"
            delay={0.38}
            peel="left"
          />
          {/* Medium — 6th image, gallery-image12 */}
          <PeelingPhoto
            src={gallery12}
            alt="Duma Suites gallery"
            className="gm-photo--medium gm-photo--tilt-l"
            delay={0.58}
            peel="right"
          />
        </aside>

        {/* ── Centre text column ── */}
        <article className="gm-body">

          {/* Opening quote ── large decorative glyph */}
          <motion.div className="gm-quote-glyph" aria-hidden="true" {...fadeUp(0.1)}>❝</motion.div>

          {/* Paragraph 1 */}
          <motion.p className="gm-para gm-para--lead" {...fadeUp(0.2)}>
            {t.para1}
          </motion.p>

          {/* Inline image 1 — mobile & tablet only (hidden on desktop) */}
          <PeelingPhoto
            src={gm1}
            alt="Duma Suites coastal property"
            className="gm-photo--inline gm-photo--tilt-l"
            delay={0.28}
            peel="right"
          />

          {/* Paragraph 2 */}
          <motion.p className="gm-para" {...fadeUp(0.32)}>
            {t.para2}
          </motion.p>

          {/* Inline image 2 — mobile & tablet only (hidden on desktop) */}
          <PeelingPhoto
            src={night}
            alt="Nighttime aerial view of Duma Suites"
            className="gm-photo--inline gm-photo--tilt-r"
            delay={0.40}
            peel="left"
          />

          {/* Paragraph 3 */}
          <motion.p className="gm-para" {...fadeUp(0.44)}>
            {t.para3}
          </motion.p>

          {/* Closing line */}
          <motion.p className="gm-para gm-para--closing" {...fadeUp(0.52)}>
            {t.closing}
          </motion.p>

          {/* ── Attribution ── */}
          <motion.div className="gm-attribution" {...fadeUp(0.60)}>
            <p className="gm-name">{t.gmName}</p>
            <p className="gm-title-label">{t.gmTitle}</p>
          </motion.div>

        </article>

        {/* ── Right margin images (desktop only) ── */}
        <aside className="gm-margin gm-margin--right" aria-hidden="true">
          {/* Medium-large portrait, peels left */}
          <PeelingPhoto
            src={gm2}
            alt="Duma Suites Watamu"
            className="gm-photo--medium-lg gm-photo--tilt-r"
            delay={0.25}
            peel="left"
          />
          {/* Small accent overlapping, peels right */}
          <PeelingPhoto
            src={night}
            alt="Nighttime aerial view"
            className="gm-photo--small gm-photo--tilt-l gm-photo--offset-l"
            delay={0.45}
            peel="right"
          />
          {/* Medium, peels left */}
          <PeelingPhoto
            src={groundPool}
            alt="Nighttime ground floor pool view"
            className="gm-photo--medium gm-photo--tilt-r"
            delay={0.62}
            peel="left"
          />
        </aside>

      </div>

      {/* ── Intro Video — lives outside the column grid so it can be truly wide ── */}
      <motion.div className="gm-video-wrap" {...fadeUp(0.72)} ref={videoRef}>
        <div className="gm-video-card">
          <div className="gm-video-label" aria-hidden="true">
            <span className="gm-video-line" />
            <span className="gm-video-tag">{t.videoLabel}</span>
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

      {/* ── Post-video CTA ── */}
      <motion.div className="gm-video-cta" {...fadeUp(0.82)}>
        <a href="/suites" className="btn btn-primary">
          <BedDouble size={14} strokeWidth={1.8} aria-hidden="true" />
          {t.videoCta}
        </a>
      </motion.div>

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

        /* ── Warm welcome intro ── */
        .gm-welcome-intro {
          text-align: center;
          font-family: var(--font-gm);
          font-size: clamp(1.25rem, 2.8vw, 2rem);
          color: var(--color-teal);
          margin-bottom: 0.5rem;
          letter-spacing: 0.02em;
          line-height: 1.4;
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
          max-width: 1440px;
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
          /* 6-8px blur, 25% opacity drop shadow + edge-lift border offset */
          box-shadow: 7px 9px 28px rgba(86, 51, 17, 0.25);
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

        /* ── Peel overlay — horizontal slide using --peel-dir variable ── */
        .gm-peel-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: var(--color-bg-premium);
          transform: translateX(0%);
          transition: transform 1.1s cubic-bezier(0.76, 0, 0.24, 1) var(--peel-delay, 0s);
          pointer-events: none;
        }
        .gm-photo.is-peeled .gm-peel-overlay {
          transform: translateX(var(--peel-dir, 101%));
        }

        /* Subtle rotation on the peel overlay itself for tactile feel */
        .gm-photo.is-peeled .gm-peel-overlay {
          transform: translateX(var(--peel-dir, 101%)) rotate(1deg);
        }

        /* ── Inline tilt resets (mobile/tablet) ── */
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
          border-top: 1px solid rgba(86, 51, 17, 0.15);
          position: relative;
        }
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
          padding-inline: var(--section-px, clamp(16px, 5vw, 48px));
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
          color: #ffffff;
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

        /* ── Post-video CTA ── */
        .gm-video-cta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
          margin-top: clamp(1.5rem, 3vw, 2.5rem);
          padding-inline: var(--section-px, clamp(16px, 5vw, 48px));
        }

        /* Mobile: video fills nearly full width for maximum impact */
        @media (max-width: 767px) {
          .gm-video-wrap {
            padding-inline: 0;
          }
          .gm-video-card {
            border-radius: 0;
          }
          .gm-video-frame {
            padding-bottom: 62%;
            border-radius: 0;
          }
        }

        /* ─────────────────────────────────────────────
           TABLET  768 – 1199px
        ───────────────────────────────────────────── */
        @media (min-width: 768px) and (max-width: 1199px) {
          .gm-layout { padding-inline: var(--section-px); }
          .gm-body   { max-width: 72vw; }
          .gm-photo--inline { width: min(36%, 220px); }
          .gm-peel-overlay  { transition-duration: 0.9s; }
          .gm-photo.is-peeled .gm-peel-overlay {
            transform: translateX(var(--peel-dir, 101%)) rotate(1deg);
          }
        }

        /* ─────────────────────────────────────────────
           DESKTOP  ≥ 1200px — magazine with 6-image spread
        ───────────────────────────────────────────── */
        @media (min-width: 1200px) {
          .gm-layout {
            grid-template-columns: clamp(280px, 22vw, 340px) 1fr clamp(280px, 22vw, 340px);
            grid-template-areas: 'left body right';
            align-items: start;
            gap: 0 40px;
            padding-inline: var(--section-px);
          }
          .gm-margin {
            display: flex;
            flex-direction: column;
            gap: 40px;
            padding-top: 3rem;
          }
          .gm-margin--left  { grid-area: left;  align-items: flex-end;   }
          .gm-margin--right { grid-area: right; align-items: flex-start; }

          /* ── Body: no card box — text flows freely with pictures ── */
          .gm-body {
            grid-area: body;
            max-width: none;
            width: 100%;
            margin-inline: 0;
            background: none;
            border: none;
            border-radius: 0;
            box-shadow: none;
            padding: clamp(1.5rem, 2.5vw, 3rem) clamp(8px, 1.5vw, 24px) 0;
          }

          .gm-photo--inline { display: none; }
          .gm-peel-overlay  { transition-duration: 1.15s; }
          .gm-photo.is-peeled .gm-peel-overlay {
            transform: translateX(var(--peel-dir, 101%)) rotate(1.5deg);
          }

          /* Sizes — varied for magazine collage effect */
          .gm-photo--hero      { width: 100%; max-width: 400px; aspect-ratio: 3 / 4; }
          .gm-photo--medium-lg { width: 100%; max-width: 310px; aspect-ratio: 4 / 5; }
          .gm-photo--medium    { width: 100%; max-width: 290px; aspect-ratio: 4 / 5; }
          .gm-photo--small     { width: 100%; max-width: 200px; aspect-ratio: 1 / 1; }

          /* Offset helpers for asymmetric placement */
          .gm-photo--offset-r { align-self: flex-end;   margin-top: -16px; }
          .gm-photo--offset-l { align-self: flex-start; margin-top: -16px; }

          /* Tilt angles — cutout editorial vibe */
          .gm-margin--left  .gm-photo--tilt-l { --base-rot: -2.5deg; transform: rotate(var(--base-rot)); }
          .gm-margin--left  .gm-photo--tilt-r { --base-rot:  2deg;   transform: rotate(var(--base-rot)); }
          .gm-margin--right .gm-photo--tilt-r { --base-rot:  3deg;   transform: rotate(var(--base-rot)); }
          .gm-margin--right .gm-photo--tilt-l { --base-rot: -2deg;   transform: rotate(var(--base-rot)); }

          /* Hover lift */
          .gm-photo:hover {
            transform: translateY(-6px) rotate(var(--base-rot, 0deg));
            box-shadow: 8px 14px 40px rgba(86, 51, 17, 0.30);
          }

          /* Attribution ornament bg must match the section background (no card behind it now) */
          .gm-attribution::before {
            background: var(--color-bg-premium);
          }

          /* ── Video: truly large, floating below the magazine columns ── */
          .gm-video-wrap {
            margin-top: clamp(3.5rem, 6vw, 6rem);
            max-width: 1200px;
            margin-inline: auto;
            padding-inline: var(--section-px);
          }
          .gm-video-card {
            padding: clamp(20px, 2vw, 32px);
          }
        }
      `}</style>
    </section>
  )
}

