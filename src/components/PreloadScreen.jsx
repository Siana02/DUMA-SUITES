import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import logoImg from '../assets/logo.jpeg'

// Timeline — Split Word Reveal:
//   0.20 s  DUMA slides in from left                   (0.65 s)
//   0.55 s  SUITES text slides in from right           (0.65 s)
//   1.10 s  rule lines draw outward from SUITES        (0.80 s)
//   0.90 s  WATAMU slides in from below                (0.65 s)
//   1.55 s  shimmer sweeps across                      (0.75 s CSS anim)
//   2.38 s  whole screen begins fading out
//   3.40 s  component unmounts (onComplete)

const TOTAL_MS = 3400
const TOTAL_S  = TOTAL_MS / 1000
const SLIDE    = { ease: [0.25, 0.46, 0.45, 0.94], duration: 0.65 }
const DUMA_LS  = '0.22em'

// ── Irregular honeycomb background ───────────────────────────────────────────
// Reference frame: 1440 × 900. SVG will be stretched to fill the viewport via
// preserveAspectRatio="xMidYMid slice".
// Polygon points are pre-computed at module load so there is no per-render trig.
function _hexPoints(cx, cy, r) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6  // pointy-top orientation
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`
  }).join(' ')
}

const HEXAGONS = [
  // Large corners — filled
  { points: _hexPoints(118,  124, 62), op: 0.07, fill: true  },
  { points: _hexPoints(1312, 778, 58), op: 0.07, fill: true  },
  // Large corners — outline
  { points: _hexPoints(64,   724, 76), op: 0.05, fill: false },
  { points: _hexPoints(1398, 152, 68), op: 0.04, fill: false },
  // Mid-edge — filled
  { points: _hexPoints(1184, 858, 46), op: 0.06, fill: true  },
  { points: _hexPoints(622,  878, 38), op: 0.05, fill: true  },
  { points: _hexPoints(352,  820, 32), op: 0.06, fill: true  },
  // Mid-edge — outline
  { points: _hexPoints(278,  62,  42), op: 0.05, fill: false },
  { points: _hexPoints(724,  44,  34), op: 0.04, fill: false },
  { points: _hexPoints(1054, 74,  24), op: 0.04, fill: false },
  // Scattered interior
  { points: _hexPoints(1254, 452, 28), op: 0.05, fill: true  },
  { points: _hexPoints(202,  402, 22), op: 0.04, fill: false },
  { points: _hexPoints(866,  272, 20), op: 0.05, fill: true  },
  { points: _hexPoints(650,  452, 16), op: 0.03, fill: false },
  // Accent — slightly larger outline near edges
  { points: _hexPoints(1382, 500, 54), op: 0.04, fill: false },
  { points: _hexPoints(80,   282, 44), op: 0.04, fill: false },
]

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
  // Keep stable refs to props so the once-only effect never needs them in its deps.
  const onCompleteRef = useRef(onComplete)
  const imagesRef     = useRef(images)
  useEffect(() => {
    onCompleteRef.current = onComplete
    imagesRef.current     = images
  })

  // Track whether the animation timer has elapsed and images have loaded.
  // onComplete is only called once BOTH conditions are true.
  const animDoneRef   = useRef(false)
  const imagesDoneRef = useRef(false)
  const calledRef     = useRef(false)

  // Real per-image progress → spring-smoothed value drives the progress bar.
  const rawProgress    = useMotionValue(0)
  const smoothProgress = useSpring(rawProgress, { stiffness: 55, damping: 20 })

  function tryComplete() {
    if (animDoneRef.current && imagesDoneRef.current && !calledRef.current) {
      calledRef.current = true
      document.body.style.overflow = ''
      onCompleteRef.current()
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    // 1. Animation timer — minimum display duration
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      className="preload"
      aria-hidden="true"
      animate={{ opacity: [1, 1, 0] }}
      transition={{ duration: TOTAL_S, times: [0, 0.70, 1], ease: 'easeInOut' }}
    >
      {/* ── Irregular honeycomb background ── */}
      <svg
        className="preload__hex-bg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        focusable="false"
      >
        {HEXAGONS.map((h, i) => (
          <polygon
            key={i}
            points={h.points}
            fill={h.fill ? '#563311' : 'none'}
            stroke={h.fill ? 'none' : '#563311'}
            strokeWidth={h.fill ? 0 : 1.5}
            opacity={h.op}
          />
        ))}
      </svg>

      {/* ── Shimmer stripe — sweeps left → right once at 1.55 s ── */}
      <div className="preload__shimmer" />

      {/* ── Brand lockup ── */}
      <div className="preload__brand">

        {/* Logo mark */}
        <motion.img
          className="preload__logo"
          src={logoImg}
          alt="Duma Suites"
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* DUMA — slides in from left */}
        <motion.p
          className="preload__duma"
          initial={{ opacity: 0, x: -48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...SLIDE, delay: 0.20 }}
        >
          DUMA
        </motion.p>

        {/* SUITES row: text slides in; rules draw outward afterward */}
        <div className="preload__suites-row">
          {/* Left rule — draws leftward from text after SUITES is visible */}
          <motion.span
            className="preload__rule preload__rule--left"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.80, delay: 1.10, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: 'right center' }}
          />

          {/* SUITES text — slides in from right */}
          <motion.span
            className="preload__suites"
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...SLIDE, delay: 0.55 }}
          >
            S U I T E S
          </motion.span>

          {/* Right rule — draws rightward from text after SUITES is visible */}
          <motion.span
            className="preload__rule preload__rule--right"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.80, delay: 1.10, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: 'left center' }}
          />
        </div>

        {/* WATAMU — slides in from below */}
        <motion.p
          className="preload__watamu"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SLIDE, delay: 0.90 }}
        >
          W A T A M U
        </motion.p>

      </div>

      {/* ── Loading label ── */}
      <motion.span
        className="preload__loading-label"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.55, 0.55, 0] }}
        transition={{ duration: TOTAL_S, times: [0, 0.25, 0.80, 1], ease: 'easeInOut' }}
      >
        Preparing your stay
      </motion.span>

      {/* ── Progress bar — driven by real image-loading progress ── */}
      <div className="preload__progress-track" aria-hidden="true">
        <motion.div
          className="preload__progress-fill"
          style={{ scaleX: smoothProgress, transformOrigin: 'left center' }}
        />
      </div>

      <style>{`
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

        /* ── Honeycomb SVG ── */
        .preload__hex-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        /* ── Shimmer — diagonal stripe sweeps across the screen once ── */
        .preload__shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 35%,
            rgba(255, 255, 255, 0.28) 50%,
            transparent 65%
          );
          transform: translateX(-100%);
          animation: preload-shimmer 0.75s ease-in-out forwards;
          animation-delay: 1.55s;
          pointer-events: none;
          z-index: 1;
        }
        @keyframes preload-shimmer {
          from { transform: translateX(-100%); }
          to   { transform: translateX(100%); }
        }

        /* ── Brand lockup ── */
        .preload__brand {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.55rem;
          text-align: center;
          pointer-events: none;
          user-select: none;
        }

        /* ── Logo mark ── */
        .preload__logo {
          width: clamp(60px, 10vw, 88px);
          height: clamp(60px, 10vw, 88px);
          object-fit: contain;
          border-radius: 50%;
          margin-bottom: 0.35rem;
          user-select: none;
          pointer-events: none;
        }

        /* DUMA */
        .preload__duma {
          font-family: var(--font-title);
          font-size: clamp(2.6rem, 7vw, 5.5rem);
          font-weight: 300;
          letter-spacing: ${DUMA_LS};
          text-transform: uppercase;
          color: var(--color-espresso);
          line-height: 1;
          padding-right: ${DUMA_LS};
        }

        /* SUITES row */
        .preload__suites-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 100%;
          justify-content: center;
        }
        .preload__rule {
          display: block;
          flex: 1;
          max-width: clamp(50px, 9vw, 130px);
          height: 1px;
        }
        .preload__rule--left {
          background: linear-gradient(to right, transparent, var(--color-espresso));
        }
        .preload__rule--right {
          background: linear-gradient(to left, transparent, var(--color-espresso));
        }
        .preload__suites {
          font-family: var(--font-title);
          font-size: clamp(1.15rem, 3vw, 2.4rem);
          font-weight: 400;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: var(--color-espresso);
          line-height: 1;
          white-space: nowrap;
          padding-right: 0.42em;
        }

        /* WATAMU */
        .preload__watamu {
          font-family: var(--font-title);
          font-size: clamp(0.7rem, 1.8vw, 1.3rem);
          font-weight: 300;
          letter-spacing: 0.48em;
          text-transform: uppercase;
          color: var(--color-espresso);
          opacity: 0.72;
          line-height: 1;
          padding-right: 0.48em;
        }

        /* ── Loading label ── */
        .preload__loading-label {
          position: absolute;
          bottom: 36px;
          left: 50%;
          transform: translateX(-50%);
          font-family: var(--font-nav);
          font-size: 0.52rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--color-espresso);
          white-space: nowrap;
          pointer-events: none;
          z-index: 2;
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
            #c9a96e 60%,
            #e8d5b0 100%
          );
        }
      `}</style>
    </motion.div>
  )
}

