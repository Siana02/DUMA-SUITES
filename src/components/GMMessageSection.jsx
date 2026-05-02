import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

export default function GMMessageSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section className="gm-section section section--premium" id="experience">
      <div className="container">
        <div ref={ref} className="gm-section__inner">
          {/* Decorative quote mark */}
          <motion.div
            className="gm-section__quote-mark"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            aria-hidden="true"
          >
            ❝
          </motion.div>

          {/* Message */}
          <motion.blockquote
            className="gm-section__message"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            At Duma Suites, we do not merely offer accommodation — we craft
            moments. Every sunrise over the Indian Ocean, every breeze that
            carries the scent of the sea, every detail of our service is
            intentionally designed to leave an indelible impression on your
            soul. Welcome to our home.
          </motion.blockquote>

          {/* Attribution */}
          <motion.div
            className="gm-section__attribution"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="gm-section__divider" aria-hidden="true" />
            <p className="gm-section__name">Amara Wanjiku</p>
            <p className="gm-section__title">General Manager, Duma Suites</p>
          </motion.div>
        </div>
      </div>

      <style>{`
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
            ellipse at center,
            rgba(86, 51, 17, 0.04) 0%,
            transparent 70%
          );
          pointer-events: none;
        }
        .gm-section__inner {
          max-width: 820px;
          margin-inline: auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }
        .gm-section__quote-mark {
          font-family: var(--font-title);
          font-size: clamp(4rem, 8vw, 7rem);
          color: var(--color-espresso);
          opacity: 0.15;
          line-height: 1;
          user-select: none;
        }
        .gm-section__message {
          font-family: var(--font-title);
          font-size: clamp(1.3rem, 2.5vw, 1.9rem);
          font-style: italic;
          font-weight: 400;
          color: var(--color-espresso);
          line-height: 1.65;
          quotes: none;
        }
        .gm-section__attribution {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        .gm-section__divider {
          width: 48px;
          height: 1.5px;
          background-color: var(--color-teal);
        }
        .gm-section__name {
          font-family: var(--font-gm);
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          color: var(--color-espresso);
          line-height: 1.2;
        }
        .gm-section__title {
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: 0.75rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-teal);
        }
      `}</style>
    </section>
  )
}
