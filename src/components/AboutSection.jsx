import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Waves, Sofa, Sparkles, Sunrise, Shield, Leaf, Star } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { getT } from '../i18n/translations.js'
import cheetahIcon from '../assets/cheetah.png'

const CARD_ICONS = [Waves, Sofa, Sparkles, Sunrise, Shield, Leaf, Star]

export default function AboutSection() {
  const { lang } = useLanguage()
  const t = getT(lang)
  const ab = t.about

  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.3, triggerOnce: true })
  const { ref: cardsRef, inView: cardsInView }   = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section className="about-section section" id="about">
      <div className="container">
        {/* Header */}
        <div
          ref={headerRef}
          className={`about-section__header${headerInView ? ' is-visible' : ''}`}
        >
          <span className="eyebrow">{ab.eyebrow}</span>
          <div className="about-section__divider-wrap">
            <span className="about-section__divider-line" />
            <img src={cheetahIcon} alt="" className="about-section__divider-icon" aria-hidden="true" />
            <span className="about-section__divider-line" />
          </div>
          <h2 className="section-title">{ab.title}</h2>
          <p className="about-section__intro">{ab.intro}</p>
        </div>

        {/* Spine layout */}
        <div className="about-section__spine-wrap" ref={cardsRef}>
          <div className="about-section__spine" aria-hidden="true" />

          {ab.cards.map((card, i) => {
            const Icon = CARD_ICONS[i % CARD_ICONS.length]
            const isLeft = i % 2 === 0

            return (
              <motion.div
                key={i}
                className={`about-section__card about-section__card--${isLeft ? 'left' : 'right'}`}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                animate={cardsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="about-section__card-icon">
                  <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div className="about-section__card-body">
                  <h3 className="about-section__card-title">{card.title}</h3>
                  <p className="about-section__card-desc">{card.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="about-section__cta-wrap">
          <a href="/#about" className="btn btn-primary">{ab.cta}</a>
        </div>
      </div>

      <style>{`
        .about-section__header {
          text-align: center;
          margin-bottom: clamp(40px, 6vw, 64px);
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .about-section__header.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .about-section__divider-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin: 16px auto;
          max-width: 320px;
        }
        .about-section__divider-line {
          flex: 1;
          height: 1px;
          background: var(--color-teal);
          opacity: 0.5;
        }
        .about-section__divider-icon {
          width: 36px;
          height: 36px;
          object-fit: contain;
          opacity: 0.7;
        }
        .about-section__intro {
          max-width: 600px;
          margin: 20px auto 0;
          font-size: 1rem;
          color: var(--color-text-muted);
          line-height: 1.75;
        }
        .about-section__spine-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 28px;
          padding: 0 0 8px;
        }
        .about-section__spine {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 5px;
          background: linear-gradient(to bottom, var(--color-teal), rgba(88,176,196,0.2));
          border-radius: 3px;
          transform: translateX(-50%);
        }
        .about-section__card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          background: #fff;
          border: 1px solid rgba(86,51,17,0.08);
          border-radius: 4px;
          padding: 24px;
          width: 42%;
          box-shadow: 0 4px 24px rgba(86,51,17,0.06);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .about-section__card:hover {
          box-shadow: 0 8px 32px rgba(88,176,196,0.15);
          transform: translateY(-2px);
        }
        .about-section__card--left {
          align-self: flex-start;
          margin-right: auto;
        }
        .about-section__card--right {
          align-self: flex-end;
          margin-left: auto;
        }
        .about-section__card-icon {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(88,176,196,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-teal);
        }
        .about-section__card-title {
          font-family: var(--font-eyebrow);
          font-size: 0.88rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--color-espresso);
          margin-bottom: 6px;
          text-transform: uppercase;
        }
        .about-section__card-desc {
          font-size: 0.88rem;
          color: var(--color-text-muted);
          line-height: 1.65;
        }
        .about-section__cta-wrap {
          text-align: center;
          margin-top: clamp(40px, 6vw, 60px);
        }
        @media (max-width: 900px) {
          .about-section__spine {
            display: none;
          }
          .about-section__card,
          .about-section__card--left,
          .about-section__card--right {
            width: 100%;
            align-self: auto;
            margin: 0;
          }
        }
      `}</style>
    </section>
  )
}
