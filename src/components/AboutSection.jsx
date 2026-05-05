import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Waves, Sofa, Sparkles, Sunrise, Shield, Leaf, Star } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { getT } from '../i18n/translations.js'
import cheetahIcon from '../assets/cheetah.png'

const CARD_ICONS = [Waves, Sofa, Sparkles, Sunrise, Shield, Leaf, Star]

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, amount: 0.2 },
  transition:  { duration: 0.65, delay, ease: [0.4, 0, 0.2, 1] },
})

function ValueCard({ card, index, activeCard, setActiveCard, totalCards, isPage }) {
  const Icon = CARD_ICONS[index % CARD_ICONS.length]
  const isLeft   = index % 2 === 0
  const isActive = activeCard === index

  const { ref: cardRef, inView: cardInView } = useInView({
    threshold: 0.55,
    triggerOnce: false,
  })

  // Mobile/tablet: auto-activate as card scrolls into view
  useEffect(() => {
    if (cardInView) setActiveCard(index)
  }, [cardInView, index, setActiveCard])

  const displayDesc = isPage ? card.desc : card.shortDesc

  return (
    <div
      className={`as-row as-row--${isLeft ? 'left' : 'right'}`}
      ref={cardRef}
    >
      {/* Spine node — desktop only (hidden on mobile via CSS) */}
      <div className={`as-node${isActive ? ' as-node--lit' : ''}`} aria-hidden="true">
        <span className="as-node__pulse" />
      </div>

      {/* Horizontal connector — desktop only, stops at card outer border */}
      <div
        className={`as-connector as-connector--${isLeft ? 'left' : 'right'}${isActive ? ' as-connector--lit' : ''}`}
        aria-hidden="true"
      />

      {/* Card */}
      <motion.div
        className={`as-card as-card--${isLeft ? 'left' : 'right'}${isActive ? ' as-card--active' : ''}`}
        {...fadeUp(0.05 * index)}
        onMouseEnter={() => setActiveCard(index)}
        onMouseLeave={() => setActiveCard(null)}
        onFocus={() => setActiveCard(index)}
        onBlur={() => setActiveCard(null)}
      >
        <div className={`as-card__icon${isActive ? ' as-card__icon--lit' : ''}`}>
          <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
        </div>
        <div className="as-card__body">
          <h3 className="as-card__title">{card.title}</h3>
          <p className="as-card__desc">{displayDesc}</p>
        </div>
      </motion.div>

      {/* Mobile-only static connector toward next card — always visible */}
      {index < totalCards - 1 && (
        <div className={`as-mob-conn${isActive ? ' as-mob-conn--active' : ''}`} aria-hidden="true">
          <span className="as-mob-conn__line" />
          {isActive && <span className="as-mob-conn__dot" />}
        </div>
      )}
    </div>
  )
}

export default function AboutSection({ isPage = false }) {
  const { lang } = useLanguage()
  const t = getT(lang)
  const ab = t.about
  const [activeCard, setActiveCard] = useState(null)

  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <section className="as-section section" id="about">
      <div className="container">

        {/* ── Header ── */}
        <div
          ref={headerRef}
          className={`as-header${headerInView ? ' is-visible' : ''}`}
        >
          <span className="eyebrow as-eyebrow">{ab.eyebrow}</span>
          <div className="as-divider-wrap" aria-hidden="true">
            <span className="as-divider-line" />
            <img src={cheetahIcon} alt="" className="as-divider-icon" />
            <span className="as-divider-line" />
          </div>
          <h2 className="section-title as-title">{ab.title}</h2>
          <p className="as-intro">{ab.intro}</p>
        </div>

        {/* ── Cards eyebrow bridge ── */}
        <motion.div className="as-bridge" {...fadeUp(0)}>
          <span className="eyebrow as-cards-eyebrow">{ab.cardsEyebrow}</span>
          <p className="as-transition-line">{ab.transitionLine}</p>
        </motion.div>

        {/* ── Spine layout ── */}
        <div className="as-spine-wrap">
          {/* Desktop spine line */}
          <div className="as-spine" aria-hidden="true" />

          {ab.cards.map((card, i) => (
            <ValueCard
              key={i}
              card={card}
              index={i}
              activeCard={activeCard}
              setActiveCard={setActiveCard}
              totalCards={ab.cards.length}
              isPage={isPage}
            />
          ))}
        </div>

        {/* ── Explore More block ── */}
        <motion.div className="as-expand" {...fadeUp(0.1)}>
          <p className="as-expand__text">{ab.expandText}</p>
          {isPage ? (
            <a href="/house-rules" className="btn btn-outline as-expand__cta">
              House Guidelines
              <span className="as-expand__arrow" aria-hidden="true">→</span>
            </a>
          ) : (
            <a href="/about" className="btn btn-primary as-expand__cta">
              {ab.cta}
              <span className="as-expand__arrow" aria-hidden="true">→</span>
            </a>
          )}
        </motion.div>
      </div>

      <style>{`
        /* ── Section ── */
        .as-section {
          background-color: var(--color-bg-primary);
        }

        /* ── Header ── */
        .as-header {
          text-align: center;
          margin-bottom: clamp(32px, 5vw, 52px);
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .as-header.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .as-eyebrow {
          letter-spacing: 0.18em;
        }
        .as-divider-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin: 14px auto;
          max-width: 300px;
        }
        .as-divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--color-teal), transparent);
          opacity: 0.6;
        }
        .as-divider-icon {
          width: 32px; height: 32px;
          object-fit: contain;
          opacity: 0.7;
        }
        .as-title {
          text-align: center;
        }
        .as-intro {
          max-width: 620px;
          margin: 18px auto 0;
          font-size: clamp(0.9rem, 1.4vw, 1rem);
          color: var(--color-text-muted);
          line-height: 1.8;
        }

        /* ── Bridge ── */
        .as-bridge {
          text-align: center;
          margin-bottom: clamp(28px, 4vw, 44px);
        }
        .as-cards-eyebrow {
          display: block;
          letter-spacing: 0.22em;
          margin-bottom: 10px;
        }
        .as-transition-line {
          font-family: var(--font-eyebrow, 'Playfair Display', serif);
          font-style: italic;
          font-size: clamp(0.88rem, 1.3vw, 1rem);
          color: var(--color-text-muted);
          opacity: 0.8;
          margin: 0;
        }

        /* ── Spine wrap ── */
        .as-spine-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0;
          padding-bottom: 16px;
        }

        /* Desktop vertical spine line */
        .as-spine {
          position: absolute;
          left: 50%;
          top: 24px;
          bottom: 24px;
          width: 2px;
          background: linear-gradient(
            to bottom,
            var(--color-teal) 0%,
            rgba(88,176,196,0.35) 100%
          );
          border-radius: 2px;
          transform: translateX(-50%);
          pointer-events: none;
        }

        /* ── Row ── */
        .as-row {
          position: relative;
          display: flex;
          align-items: center;
          margin-bottom: clamp(24px, 3.5vw, 40px);
          min-height: 80px;
        }

        /* ── Spine node ── */
        .as-node {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid var(--color-teal);
          z-index: 2;
          transition: background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .as-node--lit {
          background: var(--color-teal);
          border-color: var(--color-teal);
          box-shadow: 0 0 0 6px rgba(88,176,196,0.18), 0 0 14px rgba(88,176,196,0.4);
        }
        .as-node__pulse {
          display: none;
        }
        .as-node--lit .as-node__pulse {
          display: block;
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1.5px solid rgba(88,176,196,0.45);
          animation: as-pulse 1.4s ease-out infinite;
        }
        @keyframes as-pulse {
          0%   { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        /*
          Desktop horizontal connector
          ─────────────────────────────
          Cards are 44 % wide, flush to their respective edge (margin-right/left: auto).
          Spine node centre = 50 %.
          Node is 14 px wide → left edge ≈ 50% − 7px, right edge ≈ 50% + 7px.

          Left-card gap:  card right-edge (44%) → node left-edge (50%−7px)
          Right-card gap: node right-edge (50%+7px) → card left-edge (100%−44% = 56%)

          We use left + right shorthand (no width) so the connector is
          bounded precisely between the two elements, never overlapping the card.
        */
        .as-connector {
          position: absolute;
          top: 50%;
          height: 1.5px;
          background: rgba(88,176,196,0.28);
          transition: background 0.3s ease, box-shadow 0.3s ease;
          z-index: 1;
        }
        .as-connector--left {
          left: 44%;
          right: calc(50% + 7px);
        }
        .as-connector--right {
          left: calc(50% + 7px);
          right: 44%;
        }
        .as-connector--lit {
          background: var(--color-teal);
          box-shadow: 0 0 6px rgba(88,176,196,0.35);
        }

        /* ── Card ── */
        .as-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          background: #fff;
          border: 1px solid rgba(86,51,17,0.08);
          border-radius: 6px;
          padding: clamp(18px, 2.5vw, 26px);
          width: 44%;
          box-shadow: 0 4px 20px rgba(86,51,17,0.06);
          cursor: default;
          transition:
            box-shadow 0.3s ease,
            transform 0.3s ease,
            border-color 0.3s ease;
        }
        .as-card--left  { margin-right: auto; }
        .as-card--right { margin-left: auto;  }
        .as-card--active,
        .as-card:hover {
          box-shadow: 0 8px 32px rgba(88,176,196,0.18);
          border-color: rgba(88,176,196,0.4);
          transform: translateY(-3px);
        }

        /* Icon — lights up when card or node is active */
        .as-card__icon {
          flex-shrink: 0;
          width: 44px; height: 44px;
          border-radius: 50%;
          background: rgba(88,176,196,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-teal);
          transition: background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
        }
        .as-card__icon--lit,
        .as-card--active .as-card__icon,
        .as-card:hover   .as-card__icon {
          background: var(--color-teal);
          color: #fff;
          box-shadow: 0 0 14px rgba(88,176,196,0.5);
        }

        .as-card__title {
          font-family: var(--font-eyebrow);
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: var(--color-espresso);
          margin: 0 0 6px;
        }
        .as-card__desc {
          font-size: 0.875rem;
          color: var(--color-text-muted);
          line-height: 1.7;
          margin: 0;
        }

        /* Mobile connector — hidden on desktop */
        .as-mob-conn {
          display: none;
        }

        /* ── Explore More ── */
        .as-expand {
          text-align: center;
          margin-top: clamp(40px, 5vw, 60px);
          padding: clamp(28px, 4vw, 44px) clamp(20px, 4vw, 40px);
          background: rgba(88,176,196,0.05);
          border: 1px solid rgba(88,176,196,0.15);
          border-radius: 6px;
          max-width: 640px;
          margin-inline: auto;
        }
        .as-expand__text {
          font-size: clamp(0.88rem, 1.3vw, 0.98rem);
          color: var(--color-text-muted);
          line-height: 1.75;
          margin: 0 0 22px;
          font-style: italic;
        }
        .as-expand__cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .as-expand__arrow {
          display: inline-block;
          transition: transform 0.25s ease;
        }
        .as-expand__cta:hover .as-expand__arrow {
          transform: translateX(5px);
        }
        .btn-outline {
          font-family: var(--font-nav);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-espresso);
          padding: 13px 32px;
          border: 1.5px solid rgba(86,51,17,0.38);
          border-radius: 3px;
          background: transparent;
          cursor: pointer;
          transition: border-color 0.3s, color 0.3s, background 0.3s;
        }
        .btn-outline:hover {
          border-color: var(--color-teal);
          color: var(--color-teal);
          background: rgba(88,176,196,0.06);
        }

        /* ══════════════════════════════════════
           Mobile / tablet  (≤ 900px)
           ══════════════════════════════════════
           • Desktop spine + node + connector hidden
           • Cards stack full-width
           • as-mob-conn shown as always-visible static
             vertical fade-line with space between cards
           • Active: pulsing dot travels down the line
             and card icon lights up
        */
        @media (max-width: 900px) {
          .as-spine     { display: none; }
          .as-node      { display: none; }
          .as-connector { display: none; }

          .as-row {
            flex-direction: column;
            align-items: stretch;
            margin-bottom: 0;
          }

          .as-card,
          .as-card--left,
          .as-card--right {
            width: 100%;
            margin: 0;
          }
          .as-card--active {
            transform: scale(1.015);
            border-color: rgba(88,176,196,0.5);
            box-shadow:
              0 0 0 3px rgba(88,176,196,0.12),
              0 8px 28px rgba(88,176,196,0.14);
          }

          /* Static connector — always visible, creates breathing space */
          .as-mob-conn {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            height: 44px;
            pointer-events: none;
            overflow: visible;
          }
          .as-mob-conn__line {
            width: 1.5px;
            flex: 1;
            background: linear-gradient(
              to bottom,
              rgba(88,176,196,0.35) 0%,
              rgba(88,176,196,0.15) 100%
            );
            border-radius: 2px;
          }

          /* Pulsing dot — only when active */
          .as-mob-conn__dot {
            position: absolute;
            left: 50%;
            top: 0;
            transform: translateX(-50%);
            width: 8px; height: 8px;
            border-radius: 50%;
            background: var(--color-teal);
            animation: as-dot-travel 1.3s ease-in-out infinite;
          }
          @keyframes as-dot-travel {
            0%   { top: 0;    opacity: 0;   transform: translateX(-50%) scale(0.6); }
            15%  { opacity: 1;              transform: translateX(-50%) scale(1);   }
            80%  { opacity: 1;              transform: translateX(-50%) scale(1);   }
            100% { top: 100%; opacity: 0;   transform: translateX(-50%) scale(0.6); }
          }

          .as-spine-wrap { gap: 0; }
        }
      `}</style>
    </section>
  )
}

