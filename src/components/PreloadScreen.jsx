import { useEffect } from 'react'
import { motion } from 'framer-motion'

// Timeline:
//   0.3 – 1.1 s  brand text fades in
//   1.1 – 1.7 s  brand text holds
//   1.8 s         curtain panels start sliding outward (1.4 s)
//   1.8 – 3.2 s  brand text fades out while curtains open
//   3.4 s         component unmounts (onComplete)

const PANEL_EASE   = [0.76, 0, 0.24, 1]
const TOTAL_MS     = 3400
const TOTAL_S      = TOTAL_MS / 1000

export default function PreloadScreen({ onComplete }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(() => {
      document.body.style.overflow = ''
      onComplete()
    }, TOTAL_MS)
    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [onComplete])

  return (
    <div className="preload" aria-hidden="true">
      {/* Left curtain panel */}
      <motion.div
        className="preload__panel preload__panel--left"
        initial={{ x: 0 }}
        animate={{ x: '-100%' }}
        transition={{ duration: 1.4, delay: 1.8, ease: PANEL_EASE }}
      />

      {/* Right curtain panel */}
      <motion.div
        className="preload__panel preload__panel--right"
        initial={{ x: 0 }}
        animate={{ x: '100%' }}
        transition={{ duration: 1.4, delay: 1.8, ease: PANEL_EASE }}
      />

      {/* Brand lockup — visible until curtains fully open */}
      <motion.div
        className="preload__brand"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: [0, 1, 1, 0], y: [18, 0, 0, -10] }}
        transition={{ duration: TOTAL_S, times: [0, 0.23, 0.60, 1], ease: 'easeInOut' }}
      >
        {/* Line 1 — D U M A (largest, wide letter-spacing) */}
        <p className="preload__duma">D U M A</p>

        {/* Line 2 — ——— SUITES ——— (fading rule lines) */}
        <div className="preload__suites-row">
          <span className="preload__rule preload__rule--left" />
          <span className="preload__suites">S U I T E S</span>
          <span className="preload__rule preload__rule--right" />
        </div>

        {/* Line 3 — WATAMU (smallest) */}
        <p className="preload__watamu">W A T A M U</p>
      </motion.div>

      <style>{`
        .preload {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .preload__panel {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 51%;          /* slight overlap avoids hair-line gap */
          background-color: var(--color-bg-primary);
        }
        .preload__panel--left  { left: 0; }
        .preload__panel--right { right: 0; }

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

        /* Line 1 */
        .preload__duma {
          font-family: var(--font-title);
          font-size: clamp(2.6rem, 7vw, 5.5rem);
          font-weight: 300;
          letter-spacing: 0.55em;
          text-transform: uppercase;
          color: var(--color-espresso);
          line-height: 1;
          padding-right: 0.55em; /* compensate trailing letter-spacing */
        }

        /* Line 2 */
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

        /* Line 3 */
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
    </div>
  )
}
