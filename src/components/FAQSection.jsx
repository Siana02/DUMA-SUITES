import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { getT } from '../i18n/translations.js'

export default function FAQSection() {
  const { lang } = useLanguage()
  const t = getT(lang)
  const faq = t.faq

  const [openIndex, setOpenIndex] = useState(null)
  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.3, triggerOnce: true })

  const toggle = (i) => setOpenIndex(prev => prev === i ? null : i)

  return (
    <section className="faq-section section" id="faq">
      <div className="container" style={{ maxWidth: 760 }}>
        <div
          ref={headerRef}
          className={`faq-section__header${headerInView ? ' is-visible' : ''}`}
        >
          <span className="eyebrow">{faq.eyebrow}</span>
          <h2 className="section-title">{faq.title}</h2>
        </div>

        <div className="faq-section__list" role="list">
          {faq.items.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                className={`faq-item${isOpen ? ' faq-item--open' : ''}`}
                role="listitem"
              >
                <button
                  className="faq-item__question"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                >
                  <span>{item.q}</span>
                  <motion.span
                    className="faq-item__chevron"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    aria-hidden="true"
                  >
                    <ChevronDown size={18} strokeWidth={1.5} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      role="region"
                      aria-labelledby={`faq-question-${i}`}
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="faq-item__answer">
                        <p>{item.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="faq-section__cta-wrap">
          <p className="faq-section__cta-intro">{faq.ctaIntro}</p>
          <a
            href="#contact"
            className="faq-section__cta btn btn-primary"
            onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            {faq.cta}
            <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>

      <style>{`
        .faq-section__header {
          text-align: center;
          margin-bottom: clamp(32px, 5vw, 48px);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .faq-section__header.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .faq-section__list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .faq-item {
          border-bottom: 1px solid rgba(86,51,17,0.12);
        }
        .faq-item:first-child {
          border-top: 1px solid rgba(86,51,17,0.12);
        }
        .faq-item__question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 20px 0;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          font-family: var(--font-title);
          font-size: clamp(0.95rem, 1.5vw, 1.1rem);
          font-weight: 600;
          color: var(--color-espresso);
          transition: color 0.25s ease;
        }
        .faq-item--open .faq-item__question {
          color: var(--color-teal);
        }
        .faq-item__chevron {
          flex-shrink: 0;
          color: var(--color-teal);
          display: flex;
        }
        .faq-item__answer {
          padding-bottom: 20px;
        }
        .faq-item__answer p {
          font-size: 0.93rem;
          color: var(--color-text-muted);
          line-height: 1.75;
          padding-left: 16px;
          border-left: 3px solid var(--color-teal);
        }
        .faq-section__cta-wrap {
          margin-top: clamp(40px, 6vw, 56px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          text-align: center;
        }
        .faq-section__cta-intro {
          font-family: var(--font-title);
          font-size: clamp(1rem, 1.8vw, 1.2rem);
          color: var(--color-espresso);
          opacity: 0.82;
        }
        .faq-section__cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
      `}</style>
    </section>
  )
}
