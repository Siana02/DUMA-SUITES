import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// Timeline — Split Word Reveal:
//   0.20 s  DUMA slides in from left          (0.65 s)
//   0.55 s  SUITES row (+ rule lines) slides in from right (0.65 s)
//   0.90 s  WATAMU slides in from below       (0.65 s)
//   1.55 s  shimmer sweeps across             (0.75 s CSS anim)
//   2.38 s  whole screen begins fading out
//   3.40 s  component unmounts (onComplete)

const TOTAL_MS   = 3400
const TOTAL_S    = TOTAL_MS / 1000
const SLIDE      = { ease: [0.25, 0.46, 0.45, 0.94], duration: 0.65 }
const DUMA_LS    = '0.22em'   // letter-spacing for DUMA; also used as padding-right compensation

/**
 * Preload an array of image URLs into the browser cache.
 * Returns a Promise that resolves once every image has loaded (or errored).
 */
function preloadImages(urls) {
  return Promise.all(
    urls.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image()
          img.fetchPriority = 'high'
          img.onload = resolve
          img.onerror = resolve  // resolve even on error so we never block forever
          img.src = src
        })
    )
  )
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

  function tryComplete() {
    if (animDoneRef.current && imagesDoneRef.current && !calledRef.current) {
      calledRef.current = true
      document.body.style.overflow = ''
      onCompleteRef.current()
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    // 1. Animation timer
    const timer = setTimeout(() => {
      animDoneRef.current = true
      tryComplete()
    }, TOTAL_MS)

    // 2. Eagerly load all images while the animation plays
    preloadImages(imagesRef.current).then(() => {
      imagesDoneRef.current = true
      tryComplete()
    })

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <motion.div
      className="preload"
      aria-hidden="true"
      animate={{ opacity: [1, 1, 0] }}
      transition={{ duration: TOTAL_S, times: [0, 0.70, 1], ease: 'easeInOut' }}
    >
      {/* Shimmer stripe — sweeps left → right once at 1.55 s */}
      <div className="preload__shimmer" />

      {/* Brand lockup */}
      <div className="preload__brand">

        {/* DUMA — slides in from left */}
        <motion.p
          className="preload__duma"
          initial={{ opacity: 0, x: -48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...SLIDE, delay: 0.20 }}
        >
          DUMA
        </motion.p>

        {/* ——— SUITES ——— slides in from right; rule lines stay visible throughout */}
        <motion.div
          className="preload__suites-row"
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...SLIDE, delay: 0.55 }}
        >
          <span className="preload__rule preload__rule--left" />
          <span className="preload__suites">S U I T E S</span>
          <span className="preload__rule preload__rule--right" />
        </motion.div>

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

      <style>{`
        .preload {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--color-bg-primary);
        }

        /* Shimmer — diagonal stripe sweeps across the screen once */
        .preload__shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 35%,
            rgba(255, 255, 255, 0.26) 50%,
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

        /* Brand */
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

        /* DUMA — reduced letter-spacing */
        .preload__duma {
          font-family: var(--font-title);
          font-size: clamp(2.6rem, 7vw, 5.5rem);
          font-weight: 300;
          letter-spacing: ${DUMA_LS};
          text-transform: uppercase;
          color: var(--color-espresso);
          line-height: 1;
          padding-right: ${DUMA_LS}; /* compensate trailing letter-spacing gap */
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
          opacity: 0.45;
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
      `}</style>
    </motion.div>
  )
}
