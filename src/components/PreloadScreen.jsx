import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// ── Timeline ─────────────────────────────────────────────────────────────────
//   0.25 s  DUMA fades in + rises                       (1.0 s)
//   1.40 s  gold shimmer sweeps through DUMA            (0.85 s CSS)
//   1.10 s  "suites ● watamu" fades in + rises          (0.9 s)
//   2.38 s  whole screen begins scaling up + fading out
//   3.40 s  component unmounts (onComplete)

const TOTAL_MS = 3400
const TOTAL_S  = TOTAL_MS / 1000

/**
 * Start loading an array of image URLs into the browser cache.
 * Calls onProgress(fraction) after each image finishes (0 … 1).
 * Calls onDone() once every image has loaded or errored.
 */
function startPreloadImages(urls, onProgress, onDone) {
  if (urls.length === 0) { onProgress(1); onDone(); return }
  let loaded = 0
  urls.forEach((src) => {
    const img = new Image()
    img.fetchPriority = 'high'
    const handleSettle = () => {
      loaded++
      onProgress(loaded / urls.length)
      if (loaded === urls.length) onDone()
    }
    img.onload  = handleSettle
    img.onerror = handleSettle  // never block on a broken image
    img.src = src
  })
}

export default function PreloadScreen({ onComplete, images = [] }) {
  // Keep stable refs to props so the once-only effect never needs them in deps.
  const onCompleteRef = useRef(onComplete)
  const imagesRef     = useRef(images)
  useEffect(() => {
    onCompleteRef.current = onComplete
    imagesRef.current     = images
  })

  const animDoneRef   = useRef(false)
  const imagesDoneRef = useRef(false)
  const calledRef     = useRef(false)

  // Real per-image progress → spring-smoothed value drives the progress bar.
  const rawProgress    = useMotionValue(0)
  const smoothProgress = useSpring(rawProgress, { stiffness: 55, damping: 20 })

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    function tryComplete() {
      if (animDoneRef.current && imagesDoneRef.current && !calledRef.current) {
        calledRef.current = true
        document.body.style.overflow = ''
        onCompleteRef.current()
      }
    }

    // 1. Minimum display duration — animation timer
    const timer = setTimeout(() => {
      animDoneRef.current = true
      tryComplete()
    }, TOTAL_MS)

    // 2. Eagerly load all images while the animation plays; update progress bar
    startPreloadImages(
      imagesRef.current,
      (fraction) => rawProgress.set(fraction),
      () => {
        imagesDoneRef.current = true
        tryComplete()
      }
    )

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [rawProgress])

  return (
    // Phase 4 — Exit: slight scale-up + fade out
    <motion.div
      className="preload"
      aria-hidden="true"
      animate={{ opacity: [1, 1, 0], scale: [1, 1, 1.04] }}
      transition={{ duration: TOTAL_S, times: [0, 0.70, 1], ease: 'easeInOut' }}
    >
      {/* ── Brand lockup ── */}
      <div className="preload__brand">

        {/* Phase 1 — DUMA: fade in + upward motion */}
        <motion.div
          className="preload__duma-wrap"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="preload__duma">DUMA</p>
          {/*
            Phase 2 — Shimmer: gold light sweeps left → right through "DUMA".
            Implemented as an absolutely-positioned div inside the overflow:hidden
            wrapper so it is clipped exactly to the text bounding box.
          */}
          <div className="preload__duma-shimmer" aria-hidden="true" />
        </motion.div>

        {/* Phase 3 — "suites ● watamu": fades in upward after DUMA */}
        <motion.p
          className="preload__sub"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.10, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          suites&nbsp;&#x25CF;&nbsp;watamu
        </motion.p>

      </div>

      {/* ── Progress bar — driven by real image-loading progress ── */}
      <div className="preload__progress-track" aria-hidden="true">
        <motion.div
          className="preload__progress-fill"
          style={{ scaleX: smoothProgress, transformOrigin: 'left center' }}
        />
      </div>

      <style>{`
        /* ── Screen ── */
        .preload {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--color-bg-primary);
          overflow: hidden;
        }

        /* ── Brand lockup ── */
        .preload__brand {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          text-align: center;
          pointer-events: none;
          user-select: none;
        }

        /* ── DUMA wrapper — clips the shimmer to the text box ── */
        .preload__duma-wrap {
          position: relative;
          overflow: hidden;
          line-height: 1;
          /* Padding so overflow:hidden doesn't clip ascenders/descenders */
          padding: 0.08em 0;
        }

        /* ── DUMA text ── */
        .preload__duma {
          font-family: var(--font-title);
          font-size: clamp(3.4rem, 10vw, 7.5rem);
          font-weight: 300;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--color-espresso);
          line-height: 1;
          /* Shift right by half the letter-spacing so the word is optically centered */
          padding-right: 0.28em;
          margin: 0;
        }

        /*
         * Phase 2 — Shimmer
         * A semi-transparent gold band sweeps left → right through DUMA.
         * Starts off the left edge, ends off the right edge.
         * delay: 1.4 s — DUMA is fully visible by ~1.25 s (0.25 delay + 1.0 duration).
         */
        .preload__duma-shimmer {
          position: absolute;
          top: 0;
          left: -55%;
          width: 45%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent               0%,
            rgba(201, 169, 110, 0.30) 40%,
            rgba(255, 255, 240, 0.55) 50%,
            rgba(201, 169, 110, 0.30) 60%,
            transparent               100%
          );
          animation: dumaShimmer 0.85s ease-in-out 1.4s 1 forwards;
          pointer-events: none;
        }
        @keyframes dumaShimmer {
          from { left: -55%; }
          to   { left: 120%; }
        }

        /* ── "suites ● watamu" ── */
        .preload__sub {
          font-family: var(--font-title);
          font-size: clamp(0.72rem, 1.8vw, 1.1rem);
          font-weight: 300;
          letter-spacing: 0.40em;
          /* Shift right by half the letter-spacing to optically center */
          padding-right: 0.40em;
          text-transform: lowercase;
          color: var(--color-espresso);
          opacity: 0.65;
          line-height: 1;
          margin: 0;
        }

        /* ── Progress track + fill ── */
        .preload__progress-track {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: rgba(86, 51, 17, 0.10);
          z-index: 3;
          pointer-events: none;
        }
        .preload__progress-fill {
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to right,
            var(--color-espresso) 0%,
            #c9a96e               60%,
            #e8d5b0               100%
          );
        }
      `}</style>
    </motion.div>
  )
}
