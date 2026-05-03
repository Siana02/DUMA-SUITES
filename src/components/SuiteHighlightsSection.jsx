import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Waves, BedDouble, Leaf, Star } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

import poolsImg   from '../assets/pools-of-serenity.JPEG'
import swahiliImg from '../assets/swahili-elegance.JPEG'
import natureImg  from '../assets/nature & security.JPEG'
import luxuryImg  from '../assets/effortless-luxury.JPEG'
import cheetahIcon from '../assets/cheetah.png'

// ─────────────────────────────────────────────────────────────────────────────
// Card data
// ─────────────────────────────────────────────────────────────────────────────
const CARDS = [
  {
    id: 'pools',
    Icon: Waves,
    title: 'Pools of Serenity',
    points: [
      'Infinity rooftop pool',
      'Ground floor leisure pool',
      'Outdoor showers',
      'Ocean-facing poolside deck',
      'Evening illuminated pool area',
    ],
    image: poolsImg,
    imageAlt: 'Infinity pool at Duma Suites',
    overlayTitle: 'Pools of Serenity',
    overlayText: 'Dive into tranquillity above the Indian Ocean.',
  },
  {
    id: 'swahili',
    Icon: BedDouble,
    title: 'Swahili Elegance',
    points: [
      'Authentic Swahili-inspired interiors',
      'King beds with premium linens',
      'Air conditioning & ceiling fans',
      'Private en-suite bathrooms',
      'Daily housekeeping service',
    ],
    image: swahiliImg,
    imageAlt: 'Swahili-inspired suite interior at Duma Suites',
    overlayTitle: 'Swahili Elegance',
    overlayText: 'Coastal craftsmanship in every detail.',
  },
  {
    id: 'nature',
    Icon: Leaf,
    title: 'Nature & Security',
    points: [
      'Steps from the beach',
      'Lush tropical gardens',
      '24/7 on-site security',
      'Private parking',
      'Serene natural surroundings',
    ],
    image: natureImg,
    imageAlt: 'Tropical gardens and beach proximity at Duma Suites',
    overlayTitle: 'Nature & Security',
    overlayText: 'Peace of mind, naturally.',
  },
  {
    id: 'luxury',
    Icon: Star,
    title: 'Effortless Luxury',
    points: [
      'Daily turndown & cleaning',
      'High-speed Wi-Fi throughout',
      'Seamless online booking',
      'Curated guest experiences',
    ],
    image: luxuryImg,
    imageAlt: 'Effortless luxury experience at Duma Suites',
    overlayTitle: 'Effortless Luxury',
    overlayText: 'Where every need is anticipated.',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Animation helpers
// ─────────────────────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, amount: 0.2 },
  transition:  { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] },
})

// ─────────────────────────────────────────────────────────────────────────────
// Individual flip card
// ─────────────────────────────────────────────────────────────────────────────
function HighlightCard({ card, index }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const { Icon } = card

  const { ref: inViewRef, inView } = useInView({ threshold: 0.5, triggerOnce: true })

  // Auto-flip tease on touch/no-hover devices when card enters viewport
  useEffect(() => {
    if (!inView) return
    if (!window.matchMedia('(hover: none)').matches) return
    let t2
    const t1 = setTimeout(() => {
      setIsFlipped(true)
      t2 = setTimeout(() => setIsFlipped(false), 1500)
    }, index * 120 + 350)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [inView, index])

  const handleToggle = () => setIsFlipped(f => !f)
  const handleKey    = e => (e.key === 'Enter' || e.key === ' ') && handleToggle()

  return (
    <motion.div
      ref={inViewRef}
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.32, ease: 'easeOut' } }}
      className={`sh-card${isFlipped ? ' is-flipped' : ''}`}
      onClick={handleToggle}
      onKeyDown={handleKey}
      role="button"
      tabIndex={0}
      aria-pressed={isFlipped}
      aria-label={`${card.title} — tap to flip`}
    >
      <div className="sh-card__inner">

        {/* ── FRONT ── */}
        <div className="sh-card__face sh-card__front">
          <div className="sh-card__icon-wrap">
            <Icon className="sh-card__icon" aria-hidden="true" />
          </div>
          <h3 className="sh-card__title">{card.title}</h3>
          <ul className="sh-card__points">
            {card.points.map((pt, i) => (
              <li key={`${card.id}-pt-${i}`} className="sh-card__point">
                <span className="sh-card__bullet" aria-hidden="true">✦</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
          <p className="sh-card__hint" aria-hidden="true">tap to reveal ↩</p>
        </div>

        {/* ── BACK ── */}
        <div className="sh-card__face sh-card__back">
          <img
            src={card.image}
            alt={card.imageAlt}
            className="sh-card__bg-img"
            loading="lazy"
          />
          <div className="sh-card__overlay">
            <h3 className="sh-card__overlay-title">{card.overlayTitle}</h3>
            <p  className="sh-card__overlay-text">{card.overlayText}</p>
          </div>
        </div>

      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────────────────
export default function SuiteHighlightsSection() {
  return (
    <section className="sh-section section section--secondary" id="suite-highlights">

      {/* ── Header ── */}
      <div className="sh-header">

        {/* Eyebrow */}
        <motion.span className="eyebrow sh-eyebrow" {...fadeUp(0)}>
          Suite Highlights
        </motion.span>

        {/* Cheetah icon + fading lines */}
        <motion.div className="sh-divider" {...fadeUp(0.12)} aria-hidden="true">
          <span className="sh-divider__line sh-divider__line--left" />
          <img src={cheetahIcon} alt="" className="sh-divider__cheetah" />
          <span className="sh-divider__line sh-divider__line--right" />
        </motion.div>

        {/* Main title */}
        <motion.h2 className="section-title sh-title" {...fadeUp(0.22)}>
          The Duma Experience
        </motion.h2>

      </div>

      {/* ── Card grid ── */}
      <div className="sh-grid">
        {CARDS.map((card, i) => (
          <HighlightCard key={card.id} card={card} index={i} />
        ))}
      </div>

      <style>{`
        /* ══════════════════════════════════════════════
           SECTION SHELL
        ══════════════════════════════════════════════ */
        .sh-section {
          text-align: center;
          overflow: hidden;
        }

        /* ══════════════════════════════════════════════
           HEADER
        ══════════════════════════════════════════════ */
        .sh-header {
          max-width: 700px;
          margin-inline: auto;
          margin-bottom: clamp(40px, 6vw, 72px);
        }

        .sh-eyebrow {
          display: block;
          text-align: center;
          margin-bottom: 0.5rem;
        }

        /* ── Cheetah + fading lines ── */
        .sh-divider {
          display: flex;
          align-items: center;
          gap: 14px;
          max-width: 380px;
          margin-inline: auto;
          margin-bottom: 1.4rem;
        }
        .sh-divider__line {
          flex: 1;
          height: 1px;
        }
        .sh-divider__line--left {
          background: linear-gradient(to right, transparent, var(--color-teal));
        }
        .sh-divider__line--right {
          background: linear-gradient(to left,  transparent, var(--color-teal));
        }
        .sh-divider__cheetah {
          width: 1rem;
          height: 1rem;
          opacity: 0.72;
          color: var(--color-teal);
          flex-shrink: 0;
        }

        /* ── Main title ── */
        .sh-title {
          text-align: center;
          letter-spacing: 0.05em;
          margin: 0;
        }

        /* ══════════════════════════════════════════════
           CARD GRID
        ══════════════════════════════════════════════ */
        .sh-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(18px, 3vw, 28px);
          max-width: 1300px;
          margin-inline: auto;
        }

        /* ══════════════════════════════════════════════
           CARD SHELL  — perspective wrapper
        ══════════════════════════════════════════════ */
        .sh-card {
          perspective: 1200px;
          height: clamp(380px, 55vw, 420px);
          cursor: pointer;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
          outline: none;
        }
        .sh-card:focus-visible {
          outline: 2px solid var(--color-teal);
          outline-offset: 4px;
          border-radius: 4px;
        }

        /* ── Inner rotating element ── */
        .sh-card__inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.4s ease;
          border-radius: 4px;
        }

        /* JS-driven flip (all devices — click/tap) */
        .sh-card.is-flipped .sh-card__inner {
          transform: rotateY(180deg);
          box-shadow: 0 24px 64px rgba(86, 51, 17, 0.28);
        }

        /* CSS hover flip — pointer devices only */
        @media (hover: hover) {
          .sh-card:hover .sh-card__inner {
            transform: rotateY(180deg);
            box-shadow: 0 24px 64px rgba(86, 51, 17, 0.28);
          }
          /* Hide tap hint on pointer devices */
          .sh-card__hint {
            display: none;
          }
        }

        /* ── Shared face ── */
        .sh-card__face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 4px;
          overflow: hidden;
        }

        /* ══════════════════════════════════════════════
           FRONT FACE
        ══════════════════════════════════════════════ */
        .sh-card__front {
          background-color: var(--color-bg-primary);
          border: 1px solid rgba(201, 169, 110, 0.28);
          box-shadow: var(--shadow-card);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: clamp(18px, 3vw, 28px) clamp(16px, 2.5vw, 26px);
          gap: 10px;
          text-align: center;
        }

        /* ── Icon circle ── */
        .sh-card__icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(201, 169, 110, 0.12);
          border: 1px solid rgba(201, 169, 110, 0.32);
          flex-shrink: 0;
          transition: background 0.35s ease, border-color 0.35s ease,
                      transform 0.35s ease;
        }
        .sh-card__icon {
          width: 26px;
          height: 26px;
          color: var(--color-teal);
          stroke-width: 1.5;
          transition: color 0.35s ease, transform 0.35s ease;
        }

        /* ── Icon inverse when flipped — all devices ── */
        .sh-card.is-flipped .sh-card__icon-wrap {
          background: var(--color-teal);
          border-color: var(--color-teal);
          transform: scale(1.1);
        }
        .sh-card.is-flipped .sh-card__icon {
          color: var(--color-bg-primary);
          transform: scale(1.05);
        }

        /* Icon inverse + scale on hover (pointer devices — front visible) */
        @media (hover: hover) {
          .sh-card:not(.is-flipped):hover .sh-card__icon-wrap {
            background: var(--color-teal);
            border-color: var(--color-teal);
            transform: scale(1.1);
          }
          .sh-card:not(.is-flipped):hover .sh-card__icon {
            color: var(--color-bg-primary);
            transform: scale(1.05);
          }
        }

        /* ── Card title (front) ── */
        .sh-card__title {
          font-family: var(--font-nav);
          font-size: clamp(0.78rem, 1.3vw, 0.82rem);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-espresso);
          font-weight: 500;
          margin: 0;
          line-height: 1.3;
        }

        /* ── Bullet points ── */
        .sh-card__points {
          display: flex;
          flex-direction: column;
          gap: 5px;
          text-align: center;
          width: 100%;
          align-items: center;
        }
        .sh-card__point {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 7px;
          font-family: var(--font-body);
          font-size: clamp(0.84rem, 1.3vw, 0.92rem);
          color: var(--color-text-body);
          line-height: 1.5;
        }
        .sh-card__bullet {
          color: var(--color-teal);
          font-size: 0.52rem;
          margin-top: 0.32em;
          flex-shrink: 0;
        }

        /* ── Tap hint (touch devices) ── */
        .sh-card__hint {
          font-family: var(--font-body);
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          color: var(--color-teal);
          opacity: 0.6;
          margin-top: auto;
        }

        /* ══════════════════════════════════════════════
           BACK FACE
        ══════════════════════════════════════════════ */
        .sh-card__back {
          transform: rotateY(180deg);
        }
        .sh-card__bg-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .sh-card__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 40%,
            rgba(10, 8, 5, 0.55) 100%
          );
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding: 24px 20px;
          text-align: center;
        }
        .sh-card__overlay-title {
          font-family: var(--font-nav);
          font-size: clamp(0.72rem, 1.4vw, 0.85rem);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #fff;
          font-weight: 500;
          margin-bottom: 7px;
        }
        .sh-card__overlay-text {
          font-family: var(--font-title);
          font-size: clamp(0.88rem, 1.5vw, 1.1rem);
          font-style: italic;
          color: rgba(255, 255, 255, 0.88);
          line-height: 1.55;
        }

        /* ══════════════════════════════════════════════
           TABLET  768–1199px
        ══════════════════════════════════════════════ */
        @media (min-width: 768px) {
          .sh-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .sh-card {
            height: 420px;
          }
          .sh-card__icon-wrap { width: 64px; height: 64px; }
          .sh-card__icon      { width: 28px; height: 28px; }
        }

        /* ══════════════════════════════════════════════
           DESKTOP  ≥ 1200px
        ══════════════════════════════════════════════ */
        @media (min-width: 1200px) {
          .sh-grid {
            grid-template-columns: repeat(4, 1fr);
          }
          .sh-card {
            height: 400px;
          }
          .sh-card__icon-wrap { width: 72px; height: 72px; }
          .sh-card__icon      { width: 32px; height: 32px; }
          /* Desktop: revert to left-aligned list */
          .sh-card__points { text-align: left; align-items: flex-start; }
          .sh-card__point  { justify-content: flex-start; }
          .sh-card__point { font-size: 0.84rem; }
          .sh-card__title { font-size: 0.82rem; }
        }
      `}</style>
    </section>
  )
}
