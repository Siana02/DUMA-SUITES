import { useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, ArrowRight, Star, ThumbsUp, Flame, Fish, Anchor, Wheat, ChefHat, UtensilsCrossed, Quote as QuoteIcon, Lightbulb } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { getT } from '../i18n/translations.js'
import heroImg     from '../assets/coastal-swahili-dishes.webp'
import cheetahIcon from '../assets/cheetah.png'
import prevArticleImg from '../assets/dolphin-watching-watamu.jpg'

// Static per-dish icons (non-translatable)
const DISH_ICONS = [Flame, Fish, Anchor, Wheat, ChefHat, UtensilsCrossed]
const DISH_NUMBERS = ['01', '02', '03', '04', '05', '06']

function CheetahDivider() {
  return (
    <div className="art2-divider" aria-hidden="true">
      <span className="art2-divider__line" />
      <img src={cheetahIcon} alt="" className="art2-divider__icon" />
      <span className="art2-divider__line" />
    </div>
  )
}

export default function Article2Page() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const { lang } = useLanguage()
  const a2 = getT(lang).article2

  // Merge static icons/numbers with translated dish data
  const dishes = a2.dishes.map((dish, i) => ({
    ...dish,
    number: DISH_NUMBERS[i],
    icon: DISH_ICONS[i],
  }))

  return (
    <>
      <Helmet>
        <title>{a2.metaTitle}</title>
        <meta name="description" content={a2.metaDesc} />
      </Helmet>

      <main style={{ paddingTop: 80 }}>

        {/* Hero */}
        <div className="art2-hero" ref={heroRef}>
          <div className="art2-hero__img-wrap">
            <motion.img src={heroImg} alt="Coastal Swahili dishes" className="art2-hero__img" style={{ y: heroImgY, scale: 1.1 }} />
            <div className="art2-hero__overlay" aria-hidden="true" />
          </div>
          <div className="art2-hero__content">
            <motion.span
              className="eyebrow art2-hero__eyebrow"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {a2.heroEyebrow}
            </motion.span>
            <motion.h1
              className="art2-hero__title"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.22 }}
            >
              {a2.heroTitle}
            </motion.h1>
            <motion.p
              className="art2-hero__sub"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.36 }}
            >
              {a2.heroSub}
            </motion.p>
          </div>
        </div>

        {/* Social Proof */}
        <section className="art2-proof">
          <div className="container art2-proof__grid">
            <motion.div
              className="art2-proof__item"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55 }}
            >
              <Star size={24} className="art2-proof__icon" aria-hidden="true" />
              <div>
                <span className="art2-proof__value">4.9 / 5</span>
                <span className="art2-proof__label">{a2.proofRating}</span>
              </div>
            </motion.div>
            <motion.div
              className="art2-proof__item"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <ThumbsUp size={24} className="art2-proof__icon" aria-hidden="true" />
              <div>
                <span className="art2-proof__value">98%</span>
                <span className="art2-proof__label">{a2.proofReturn}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Intro */}
        <section className="art2-intro section">
          <div className="container art2-intro__inner">
            <motion.h2
              className="art2-intro__title"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65 }}
            >
              {a2.introTitle}
            </motion.h2>
            <motion.p
              className="art2-intro__text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              {a2.introText}
            </motion.p>
            <motion.div
              className="art2-concierge-note"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: 0.15 }}
            >
              <span className="art2-concierge-note__label">{a2.conciergeLabel}</span>
              <p className="art2-concierge-note__text">
                {a2.conciergeText}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Guest voices */}
        <section className="art2-voices section">
          <div className="container art2-voices__inner">
            <span className="art2-voices__eyebrow">{a2.voicesEyebrow}</span>
            <div className="art2-voices__grid">
              {a2.quotes.map((q, i) => (
                <motion.blockquote
                  key={i}
                  className={`art2-voice art2-voice--${q.variant}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <QuoteIcon size={18} className="art2-voice__quote-icon" aria-hidden="true" />
                  <p className="art2-voice__text">{q.text}</p>
                  <footer className="art2-voice__footer">
                    <span className="art2-voice__author-pill">{q.author}</span>
                    <span className="art2-voice__origin-pill">{q.origin}</span>
                    <span className="art2-voice__platform-pill">{q.platform}</span>
                  </footer>
                </motion.blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* Dish list */}
        <section className="art2-list section section--secondary">
          <div className="container art2-list__inner">
            {dishes.map((dish, i) => (
              <motion.div
                key={i}
                className="art2-item"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="art2-item__head">
                  <span className="art2-item__number">{dish.number}</span>
                  {dish.icon && <dish.icon size={16} className="art2-item__icon" aria-hidden="true" />}
                  <h2 className="art2-item__title">{dish.title}</h2>
                </div>
                {/* Dish pill badges */}
                <div className="art2-item__badges">
                  {dish.badges.map((b) => (
                    <span key={b} className="art2-item__badge">{b}</span>
                  ))}
                </div>
                <p className="art2-item__pull">&ldquo;{dish.pullQuote}&rdquo;</p>
                <p className="art2-item__desc">{dish.desc}</p>
              </motion.div>
            ))}

            {/* Food insider tips */}
            <motion.div
              className="art2-tips"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65 }}
            >
              <span className="art2-tips__label">
                <Lightbulb size={14} aria-hidden="true" /> {a2.tipsLabel}
              </span>
              <ul className="art2-tips__list">
                {a2.foodTips.map((tip, i) => (
                  <li key={i} className="art2-tips__item">
                    <Lightbulb size={13} className="art2-tips__item-icon" aria-hidden="true" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <CheetahDivider />
          </div>
        </section>
        <section className="art2-closing section">
          <div className="container" style={{ maxWidth: 720 }}>
            <motion.div
              className="art2-closing__inner"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="art2-closing__title">{a2.closingTitle}</h3>
              <p className="art2-closing__text">
                {a2.closingText}
              </p>
              <a
                href="/#contact"
                className="art2-closing__cta btn btn-primary"
              >
                {a2.closingCta}
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Previous article teaser */}
        <section className="art2-prev-article section section--secondary">
          <div className="container">
            <CheetahDivider />
            <motion.div
              className="art2-prev-wrap"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65 }}
            >
              <Link to="/blog/top-5-activities-watamu" className="art2-prev-card">
                <div className="art2-prev-card__img-wrap">
                  <img src={prevArticleImg} alt="Top activities on the Watamu coast" className="art2-prev-card__img" loading="lazy" />
                  <div className="art2-prev-card__overlay" aria-hidden="true" />
                  <span className="art2-prev-card__category">{a2.prevCategory}</span>
                </div>
                <div className="art2-prev-card__body">
                  <span className="art2-prev-card__eyebrow">{a2.prevEyebrow}</span>
                  <h3 className="art2-prev-card__title">{a2.prevTitle}</h3>
                  <p className="art2-prev-card__excerpt">
                    {a2.prevExcerpt}
                  </p>
                  <span className="art2-prev-card__cta">
                    {a2.prevCta} <ArrowRight size={13} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Coming soon */}
        <section className="art2-coming-soon section section--secondary">
          <div className="container">
            <span className="art2-cs__eyebrow">{a2.moreFromEyebrow}</span>
            <div className="art2-cs__grid">
              <motion.div
                className="art2-cs__card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
              >
                <span className="art2-cs__badge">{a2.comingSoon}</span>
                <h4 className="art2-cs__title">{a2.cs1Title}</h4>
                <p className="art2-cs__desc">{a2.cs1Desc}</p>
                <div className="art2-cs__pills">
                  <span className="art2-cs__pill art2-cs__pill--food">Food</span>
                  <span className="art2-cs__pill art2-cs__pill--local">Local Picks</span>
                  <span className="art2-cs__pill art2-cs__pill--culture">Culture</span>
                </div>
              </motion.div>
              <motion.div
                className="art2-cs__card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="art2-cs__badge">{a2.comingSoon}</span>
                <h4 className="art2-cs__title">{a2.cs2Title}</h4>
                <p className="art2-cs__desc">{a2.cs2Desc}</p>
                <div className="art2-cs__pills">
                  <span className="art2-cs__pill art2-cs__pill--food">Seafood</span>
                  <span className="art2-cs__pill art2-cs__pill--travel">Travel</span>
                  <span className="art2-cs__pill art2-cs__pill--local">Authentic</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="art2-nav section">
          <div className="container art2-nav__inner">
            <Link to="/blog/top-5-activities-watamu" className="art2-nav__back">
              <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
              {a2.prevArticle}
            </Link>
            <Link to="/blog" className="art2-nav__next">
              {a2.backToStories}
              <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </section>

      </main>

      <style>{`
        /* ── Hero ── */
        .art2-hero {
          position: relative;
          width: 100%;
          height: clamp(360px, 50vw, 580px);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .art2-hero__img-wrap {
          position: absolute;
          inset: 0;
        }
        .art2-hero__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 40%;
        }
        .art2-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(10,6,2,0.28) 0%, rgba(10,6,2,0.65) 100%);
        }
        .art2-hero__content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 0 clamp(16px, 5vw, 48px);
          max-width: 820px;
        }
        .art2-hero__eyebrow {
          display: block;
          color: rgba(255,255,255,0.8);
          letter-spacing: 0.22em;
          margin-bottom: 14px;
        }
        .art2-hero__title {
          font-family: var(--font-title);
          font-size: clamp(1.7rem, 4.2vw, 3.2rem);
          font-weight: 300;
          letter-spacing: 0.03em;
          color: #fff;
          line-height: 1.15;
          margin: 0 0 16px;
        }
        .art2-hero__sub {
          font-family: var(--font-body);
          font-size: clamp(0.88rem, 1.5vw, 1rem);
          color: rgba(255,255,255,0.78);
          line-height: 1.65;
        }

        /* ── Intro ── */
        .art2-intro__inner {
          max-width: 860px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(24px, 3vw, 36px);
        }
        .art2-intro__text {
          font-size: clamp(0.95rem, 1.6vw, 1.1rem);
          color: var(--color-text-muted);
          line-height: 1.8;
          text-align: center;
          max-width: 680px;
        }
        .art2-concierge-note {
          background: rgba(88,176,196,0.08);
          border-left: 3px solid var(--color-teal);
          border-radius: 0 4px 4px 0;
          padding: clamp(14px, 2vw, 22px) clamp(16px, 2.5vw, 28px);
          width: 100%;
        }
        .art2-concierge-note__label {
          display: block;
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-teal);
          margin-bottom: 8px;
        }
        .art2-concierge-note__text {
          font-size: 0.88rem;
          color: var(--color-text-muted);
          line-height: 1.75;
        }

        /* ── Cheetah divider ── */
        .art2-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin: clamp(24px, 4vw, 44px) auto;
          max-width: 220px;
          width: 100%;
        }
        .art2-divider__line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--color-teal), transparent);
          opacity: 0.55;
        }
        .art2-divider__icon {
          width: 26px;
          height: 26px;
          object-fit: contain;
          opacity: 0.7;
        }

        /* ── Dish items ── */
        .art2-list__inner {
          max-width: 800px;
        }
        .art2-item {
          padding: clamp(28px, 4vw, 48px) 0;
          border-bottom: 1px solid rgba(86,51,17,0.08);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .art2-item:last-of-type {
          border-bottom: none;
          padding-bottom: 0;
        }
        .art2-item__head {
          display: flex;
          align-items: baseline;
          gap: 16px;
        }
        .art2-item__number {
          font-family: var(--font-nav);
          font-size: 0.62rem;
          letter-spacing: 0.18em;
          color: var(--color-teal);
          flex-shrink: 0;
        }
        .art2-item__title {
          font-family: var(--font-title);
          font-size: clamp(1.2rem, 2.2vw, 1.65rem);
          font-weight: 600;
          color: var(--color-espresso);
          line-height: 1.2;
        }
        .art2-item__pull {
          font-family: var(--font-title);
          font-size: clamp(0.98rem, 1.7vw, 1.15rem);
          font-style: italic;
          font-weight: 300;
          color: var(--color-teal);
          line-height: 1.6;
          border-left: 2px solid var(--color-teal);
          padding-left: clamp(12px, 1.5vw, 18px);
          margin-left: calc(0.62rem * 2 + 16px + 1ch);
        }
        .art2-item__desc {
          font-size: 0.92rem;
          color: var(--color-text-muted);
          line-height: 1.85;
          padding-left: calc(0.62rem * 2 + 16px + 1ch);
        }

        /* ── Closing ── */
        .art2-closing__inner {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        .art2-closing__title {
          font-family: var(--font-title);
          font-size: clamp(1.4rem, 2.8vw, 2rem);
          font-weight: 400;
          color: var(--color-espresso);
        }
        .art2-closing__text {
          font-size: 0.93rem;
          color: var(--color-text-muted);
          line-height: 1.8;
          max-width: 560px;
        }
        .art2-closing__cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        /* ── Prev article teaser ── */
        .art2-prev-wrap {
          max-width: 680px;
          margin-inline: auto;
        }
        .art2-prev-card {
          display: grid;
          grid-template-columns: 1fr;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 4px 28px rgba(86,51,17,0.1);
          text-decoration: none;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .art2-prev-card:hover {
          box-shadow: 0 8px 40px rgba(88,176,196,0.2);
          transform: translateY(-3px);
        }
        .art2-prev-card__img-wrap {
          position: relative;
          aspect-ratio: 16 / 7;
          overflow: hidden;
        }
        .art2-prev-card__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.55s ease;
        }
        .art2-prev-card:hover .art2-prev-card__img {
          transform: scale(1.04);
        }
        .art2-prev-card__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.5));
        }
        .art2-prev-card__category {
          position: absolute;
          top: 12px;
          left: 12px;
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #fff;
          background: var(--color-teal);
          padding: 4px 12px;
          border-radius: 100px;
        }
        .art2-prev-card__body {
          background: var(--color-bg-primary);
          padding: clamp(16px, 2.5vw, 28px);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .art2-prev-card__eyebrow {
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-teal);
        }
        .art2-prev-card__title {
          font-family: var(--font-title);
          font-size: clamp(1.1rem, 2vw, 1.45rem);
          font-weight: 600;
          color: var(--color-espresso);
          line-height: 1.25;
        }
        .art2-prev-card__excerpt {
          font-size: 0.87rem;
          color: var(--color-text-muted);
          line-height: 1.75;
        }
        .art2-prev-card__cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-nav);
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-teal);
          margin-top: 4px;
        }

        /* ── Navigation ── */
        .art2-nav__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .art2-nav__back,
        .art2-nav__next {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-nav);
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-espresso);
          text-decoration: none;
          transition: color 0.25s ease;
        }
        .art2-nav__back:hover,
        .art2-nav__next:hover {
          color: var(--color-teal);
        }

        @media (min-width: 768px) {
          .art2-prev-card {
            grid-template-columns: 280px 1fr;
          }
          .art2-prev-card__img-wrap {
            aspect-ratio: auto;
          }
          .art2-voices__grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .art2-cs__grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* ── Social Proof Bar ── */
        .art2-proof {
          background: var(--color-espresso);
          padding: clamp(16px, 2vw, 24px) 0;
        }
        .art2-proof__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
          overflow: hidden;
          max-width: 640px;
        }
        .art2-proof__item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: clamp(14px, 2vw, 22px) clamp(20px, 3vw, 36px);
          background: var(--color-espresso);
          transition: background 0.25s ease;
        }
        .art2-proof__item:hover {
          background: rgba(86,51,17,0.9);
        }
        .art2-proof__icon {
          color: #c9a96e;
          flex-shrink: 0;
        }
        .art2-proof__value {
          display: block;
          font-family: var(--font-title);
          font-size: clamp(1.5rem, 2.8vw, 2rem);
          font-weight: 600;
          color: #fff;
          line-height: 1;
        }
        .art2-proof__label {
          display: block;
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          margin-top: 5px;
        }

        /* ── Intro title ── */
        .art2-intro__title {
          font-family: var(--font-title);
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 400;
          color: var(--color-espresso);
          text-align: center;
          line-height: 1.2;
        }

        /* ── Guest Voices ── */
        .art2-voices__inner {
          max-width: 1040px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(20px, 2.5vw, 32px);
        }
        .art2-voices__eyebrow {
          font-family: var(--font-nav);
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-teal);
        }
        .art2-voices__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          width: 100%;
        }
        .art2-voice {
          margin: 0;
          padding: clamp(18px, 2.5vw, 28px);
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .art2-voice:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(86,51,17,0.1);
        }
        .art2-voice--teal     { background: rgba(88,176,196,0.09); border-left: 3px solid var(--color-teal); }
        .art2-voice--espresso { background: rgba(86,51,17,0.06);   border-left: 3px solid var(--color-espresso); }
        .art2-voice--sand     { background: rgba(201,169,110,0.11); border-left: 3px solid #c9a96e; }
        .art2-voice__quote-icon { color: var(--color-teal); opacity: 0.6; flex-shrink: 0; }
        .art2-voice--espresso .art2-voice__quote-icon { color: var(--color-espresso); }
        .art2-voice--sand     .art2-voice__quote-icon { color: #c9a96e; }
        .art2-voice__text {
          font-family: var(--font-title);
          font-size: clamp(0.95rem, 1.7vw, 1.08rem);
          font-style: italic;
          font-weight: 300;
          color: var(--color-espresso);
          line-height: 1.7;
          margin: 0;
        }
        .art2-voice__footer {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px;
        }
        .art2-voice__author-pill {
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-espresso);
          background: rgba(86,51,17,0.08);
          padding: 4px 11px;
          border-radius: 100px;
        }
        .art2-voice__origin-pill {
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-teal);
          background: rgba(88,176,196,0.1);
          padding: 4px 11px;
          border-radius: 100px;
        }
        .art2-voice__platform-pill {
          font-family: var(--font-nav);
          font-size: 0.56rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #c9a96e;
          background: rgba(201,169,110,0.12);
          border: 1px solid rgba(201,169,110,0.3);
          padding: 4px 11px;
          border-radius: 100px;
        }

        /* ── Dish icon ── */
        .art2-item__icon {
          color: var(--color-teal);
          flex-shrink: 0;
        }

        /* ── Dish badge pills ── */
        .art2-item__badges {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 2px;
          padding-left: calc(0.62rem * 2 + 16px + 1ch);
        }
        .art2-item__badge {
          font-family: var(--font-nav);
          font-size: 0.55rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-teal);
          background: rgba(88,176,196,0.1);
          border: 1px solid rgba(88,176,196,0.25);
          padding: 4px 11px;
          border-radius: 100px;
          white-space: nowrap;
          transition: background 0.2s ease;
        }
        .art2-item__badge:nth-child(3n+2) {
          color: var(--color-espresso);
          background: rgba(86,51,17,0.07);
          border-color: rgba(86,51,17,0.18);
        }
        .art2-item__badge:nth-child(3n+3) {
          color: #c9a96e;
          background: rgba(201,169,110,0.1);
          border-color: rgba(201,169,110,0.25);
        }

        /* ── Insider Tips ── */
        .art2-tips {
          background: rgba(201,169,110,0.08);
          border: 1px solid rgba(201,169,110,0.28);
          border-radius: 6px;
          padding: clamp(18px, 2.5vw, 28px) clamp(18px, 2.5vw, 32px);
          margin-bottom: 16px;
        }
        .art2-tips__label {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c9a96e;
          margin-bottom: 16px;
        }
        .art2-tips__list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .art2-tips__item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.88rem;
          color: var(--color-espresso);
          line-height: 1.7;
        }
        .art2-tips__item-icon {
          color: #c9a96e;
          flex-shrink: 0;
          margin-top: 3px;
        }

        /* ── Coming Soon teasers ── */
        .art2-cs__eyebrow {
          display: block;
          font-family: var(--font-nav);
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-teal);
          text-align: center;
          margin-bottom: clamp(20px, 3vw, 32px);
        }
        .art2-cs__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          max-width: 720px;
          margin-inline: auto;
        }
        .art2-cs__card {
          border: 1.5px dashed rgba(86,51,17,0.18);
          border-radius: 6px;
          padding: clamp(20px, 3vw, 32px);
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: rgba(86,51,17,0.02);
          transition: border-color 0.25s ease, background 0.25s ease;
        }
        .art2-cs__card:hover {
          border-color: rgba(88,176,196,0.35);
          background: rgba(88,176,196,0.04);
        }
        .art2-cs__badge {
          font-family: var(--font-nav);
          font-size: 0.55rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #c9a96e;
          background: rgba(201,169,110,0.12);
          border: 1px solid rgba(201,169,110,0.28);
          padding: 4px 12px;
          border-radius: 100px;
          align-self: flex-start;
        }
        .art2-cs__title {
          font-family: var(--font-title);
          font-size: clamp(1.05rem, 2vw, 1.35rem);
          font-weight: 600;
          color: var(--color-espresso);
          line-height: 1.25;
          opacity: 0.72;
        }
        .art2-cs__desc {
          font-size: 0.87rem;
          color: var(--color-text-muted);
          line-height: 1.7;
          opacity: 0.7;
        }
        .art2-cs__pills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }
        .art2-cs__pill {
          font-family: var(--font-nav);
          font-size: 0.55rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 4px 11px;
          border-radius: 100px;
          opacity: 0.75;
        }
        .art2-cs__pill--food    { color: var(--color-teal);    background: rgba(88,176,196,0.1);  border: 1px solid rgba(88,176,196,0.22); }
        .art2-cs__pill--local   { color: #c9a96e;              background: rgba(201,169,110,0.1); border: 1px solid rgba(201,169,110,0.22); }
        .art2-cs__pill--culture { color: var(--color-espresso); background: rgba(86,51,17,0.07);  border: 1px solid rgba(86,51,17,0.18); }
        .art2-cs__pill--travel  { color: #3d7fb5;              background: rgba(61,127,181,0.1);  border: 1px solid rgba(61,127,181,0.22); }
      `}</style>
    </>
  )
}
