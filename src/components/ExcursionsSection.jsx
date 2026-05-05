import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Info } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { getT } from '../i18n/translations.js'

import cheetahIcon from '../assets/cheetah.png'
import gediMain    from '../assets/gedi-ruins-excursion.JPEG'
import gediOverlay from '../assets/gedi-ruins-monkey-excursion.JPEG'
import elephantMain    from '../assets/upclose-elephant.JPEG'
import elephantOverlay from '../assets/elephant-watching.JPEG'
import dhowMain    from '../assets/sunset-dhow-cruise.JPEG'
import dhowOverlay from '../assets/sunset-view.JPEG'

const EXCURSION_IMAGES = [
  { main: gediMain,     overlay: gediOverlay },
  { main: elephantMain, overlay: elephantOverlay },
  { main: dhowMain,     overlay: dhowOverlay },
]

function ExcursionCardWithT({ item, images, index, inView, cta }) {
  const isLeft = index % 2 === 0

  return (
    <motion.div
      className={`exc-card exc-card--${isLeft ? 'left' : 'right'}`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="exc-card__img-side">
        <img src={images.main} alt={item.title} className="exc-card__main-img" loading="lazy" />
        <span className="exc-card__badge">{item.badge}</span>
      </div>

      <div className="exc-card__text-side">
        <div className="exc-card__text-bg">
          <img src={images.overlay} alt="" className="exc-card__overlay-img" aria-hidden="true" loading="lazy" />
          <div className="exc-card__overlay-dark" aria-hidden="true" />
        </div>
        <div className="exc-card__content">
          <h3 className="exc-card__title">{item.title}</h3>
          <p className="exc-card__desc">{item.desc}</p>
          <a
            href="#contact"
            className="exc-card__cta"
            onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
            <span>{cta}</span>
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function ExcursionsSection() {
  const { lang } = useLanguage()
  const t = getT(lang)
  const exc = t.excursions

  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.3, triggerOnce: true })
  const { ref: listRef,   inView: listInView }   = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section className="exc-section section" id="excursions">
      <div className="container">
        <div
          ref={headerRef}
          className={`exc-section__header${headerInView ? ' is-visible' : ''}`}
        >
          <span className="eyebrow">{exc.eyebrow}</span>

          <div className="exc-cheetah-divider" aria-hidden="true">
            <span className="exc-cheetah-divider__line" />
            <img src={cheetahIcon} alt="" className="exc-cheetah-divider__icon" />
            <span className="exc-cheetah-divider__line" />
          </div>

          <h2 className="section-title">{exc.title}</h2>
          <div className="divider" />
          <div className="exc-section__note">
            <Info size={14} strokeWidth={1.5} aria-hidden="true" />
            <span>{exc.note}</span>
          </div>
        </div>

        <div className="exc-section__list" ref={listRef}>
          {exc.items.map((item, i) => (
            <ExcursionCardWithT
              key={i}
              item={item}
              images={EXCURSION_IMAGES[i]}
              index={i}
              inView={listInView}
              cta={exc.cta}
            />
          ))}
        </div>
      </div>

      <style>{`
        .exc-section__header {
          text-align: center;
          margin-bottom: clamp(40px, 6vw, 64px);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .exc-section__header.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .exc-cheetah-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin: 12px auto 16px;
          max-width: 280px;
        }
        .exc-cheetah-divider__line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--color-teal), transparent);
          opacity: 0.6;
        }
        .exc-cheetah-divider__icon {
          width: 28px;
          height: 28px;
          object-fit: contain;
          opacity: 0.75;
        }
        .exc-section__note {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: var(--color-teal);
          background: rgba(88,176,196,0.1);
          padding: 8px 16px;
          border-radius: 100px;
          border: 1px solid rgba(88,176,196,0.3);
          margin-top: 16px;
        }
        .exc-section__list {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        .exc-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 440px;
          overflow: hidden;
          border-radius: 4px;
          box-shadow: 0 8px 40px rgba(86,51,17,0.1);
        }
        .exc-card--right {
          direction: rtl;
        }
        .exc-card--right > * {
          direction: ltr;
        }
        .exc-card__img-side {
          position: relative;
          overflow: hidden;
        }
        .exc-card__main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .exc-card:hover .exc-card__main-img {
          transform: scale(1.04);
        }
        .exc-card__badge {
          position: absolute;
          top: 16px;
          left: 16px;
          font-family: var(--font-nav);
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: var(--color-teal);
          color: #fff;
          padding: 5px 14px;
          border-radius: 100px;
        }
        .exc-card__text-side {
          position: relative;
          overflow: hidden;
        }
        .exc-card__text-bg {
          position: absolute;
          inset: 0;
        }
        .exc-card__overlay-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .exc-card__overlay-dark {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.62);
        }
        .exc-card__content {
          position: relative;
          z-index: 1;
          padding: clamp(28px, 4vw, 48px);
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 16px;
        }
        .exc-card__title {
          font-family: var(--font-title);
          font-size: clamp(1.4rem, 2.5vw, 2rem);
          font-weight: 600;
          color: #fff;
          line-height: 1.2;
        }
        .exc-card__desc {
          font-size: 0.88rem;
          color: rgba(255,255,255,0.82);
          line-height: 1.7;
        }
        .exc-card__cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-nav);
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-teal);
          text-decoration: none;
          border: 1px solid var(--color-teal);
          padding: 10px 20px;
          border-radius: 3px;
          width: fit-content;
          transition: background 0.25s ease, color 0.25s ease;
        }
        .exc-card__cta:hover {
          background: var(--color-teal);
          color: #fff;
        }
        @media (max-width: 768px) {
          .exc-card {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .exc-card--right {
            direction: ltr;
          }
          .exc-card__img-side {
            height: 260px;
          }
          .exc-card__text-side {
            min-height: 280px;
          }
        }
        @media (max-width: 480px) {
          .exc-card__img-side {
            height: 220px;
          }
        }
      `}</style>
    </section>
  )
}
