import { useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, ArrowRight, Star, ThumbsUp, Anchor, Waves, Fish, Landmark, Binoculars, TreeDeciduous, Quote as QuoteIcon, Lightbulb } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useT } from '../i18n/useT.js'
import heroImg      from '../assets/dolphin-watching-watamu.jpg'
import cheetahIcon  from '../assets/cheetah.png'
import gediImg      from '../assets/gedi-ruins-excursion.JPEG'
import elephantImg  from '../assets/elephant-watching.JPEG'
import swahiliImg   from '../assets/coastal-swahili-dishes.webp'

// Static per-activity metadata: icon and image (non-translatable)
const ACTIVITY_META = [
  { number: '01', icon: Anchor, image: heroImg, imageAlt: 'Dolphin watching on Safari Blue, Watamu coast' },
  { number: '02', icon: Waves, image: null, imageAlt: '' },
  { number: '03', icon: Fish, image: null, imageAlt: '' },
  { number: '04', icon: Landmark, image: gediImg, imageAlt: 'Gedi Ruins ancient Swahili city near Watamu' },
  { number: '05', icon: Binoculars, image: elephantImg, imageAlt: 'Elephants at Tsavo National Park near Watamu' },
  { number: '06', icon: TreeDeciduous, image: null, imageAlt: '' },
]

const COMING_SOON_PILLS = {
  en: {
    first: ['Travel', 'Beaches', 'Nature', 'Family'],
    second: ['Marine', 'Diving', 'Wildlife', 'Adventure'],
  },
  it: {
    first: ['Viaggio', 'Spiagge', 'Natura', 'Famiglia'],
    second: ['Mare', 'Immersioni', 'Fauna', 'Avventura'],
  },
  de: {
    first: ['Reisen', 'Strände', 'Natur', 'Familie'],
    second: ['Meer', 'Tauchen', 'Wildlife', 'Abenteuer'],
  },
  fr: {
    first: ['Voyage', 'Plages', 'Nature', 'Famille'],
    second: ['Océan', 'Plongée', 'Faune', 'Aventure'],
  },
  es: {
    first: ['Viaje', 'Playas', 'Naturaleza', 'Familia'],
    second: ['Marino', 'Buceo', 'Fauna', 'Aventura'],
  },
}

function CheetahDivider() {
  return (
    <div className="art1-divider" aria-hidden="true">
      <span className="art1-divider__line" />
      <img src={cheetahIcon} alt="" className="art1-divider__icon" />
      <span className="art1-divider__line" />
    </div>
  )
}

export default function Article1Page() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const { lang } = useLanguage()
  const a1 = useT().article1
  const navigate = useNavigate()
  const pills = COMING_SOON_PILLS[lang] || COMING_SOON_PILLS.en

  // Merge static metadata (icons/images) with translated activity data
  const activities = ACTIVITY_META.map((meta, i) => ({ ...meta, ...a1.activities[i] }))

  return (
    <>
      <Helmet>
        <title>{a1.metaTitle}</title>
        <meta name="description" content={a1.metaDesc} />
      </Helmet>

      <main style={{ paddingTop: 80 }}>

        {/* Hero */}
        <div className="art1-hero" ref={heroRef}>
          <div className="art1-hero__img-wrap">
            <motion.img src={heroImg} alt="Dolphin watching on Safari Blue, Watamu coast" className="art1-hero__img" style={{ y: heroImgY, scale: 1.1 }} />
            <div className="art1-hero__overlay" aria-hidden="true" />
          </div>
          <div className="art1-hero__content">
            <motion.span
              className="eyebrow art1-hero__eyebrow"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {a1.heroEyebrow}
            </motion.span>
            <motion.h1
              className="art1-hero__title"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.22 }}
            >
              {a1.heroTitle}
            </motion.h1>
            <motion.p
              className="art1-hero__sub"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.36 }}
            >
              {a1.heroSub}
            </motion.p>
          </div>
        </div>

        {/* Social Proof */}
        <section className="art1-proof">
          <div className="container art1-proof__grid">
            <motion.div
              className="art1-proof__item"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55 }}
            >
              <Star size={24} className="art1-proof__icon" aria-hidden="true" />
              <div>
                <span className="art1-proof__value">4.9 / 5</span>
                <span className="art1-proof__label">{a1.proofRating}</span>
              </div>
            </motion.div>
            <motion.div
              className="art1-proof__item"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <ThumbsUp size={24} className="art1-proof__icon" aria-hidden="true" />
              <div>
                <span className="art1-proof__value">98%</span>
                <span className="art1-proof__label">{a1.proofReturn}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Intro */}
        <section className="art1-intro section">
          <div className="container art1-intro__inner">
            <motion.h2
              className="art1-intro__title"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65 }}
            >
              {a1.introTitle}
            </motion.h2>
            <motion.p
              className="art1-intro__text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              {a1.introText}
            </motion.p>
            <motion.div
              className="art1-concierge-note"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: 0.15 }}
            >
              <span className="art1-concierge-note__label">{a1.conciergeLabel}</span>
              <p className="art1-concierge-note__text">
                {a1.conciergeText}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Guest voices */}
        <section className="art1-voices section">
          <div className="container art1-voices__inner">
            <span className="art1-voices__eyebrow">{a1.voicesEyebrow}</span>
            <div className="art1-voices__grid">
              {a1.quotes.map((q, i) => (
                <motion.blockquote
                  key={i}
                  className={`art1-voice art1-voice--${q.variant}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <QuoteIcon size={18} className="art1-voice__quote-icon" aria-hidden="true" />
                  <p className="art1-voice__text">{q.text}</p>
                  <footer className="art1-voice__footer">
                    <span className="art1-voice__author-pill">{q.author}</span>
                    <span className="art1-voice__origin-pill">{q.origin}</span>
                    <span className="art1-voice__platform-pill">{q.platform}</span>
                  </footer>
                </motion.blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* Activity cards */}
        <section className="art1-list section section--secondary">
          <div className="container art1-list__inner">
            {activities.map((act, i) => (
              <motion.div
                key={i}
                className={`art1-card${act.image ? (i % 2 === 1 ? ' art1-card--reverse' : '') : ' art1-card--text-only'}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.65, delay: i * 0.06, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Image side — only rendered when an image is provided */}
                {act.image && (
                  <div className="art1-card__img-wrap">
                    <img
                      src={act.image}
                      alt={act.imageAlt}
                      className="art1-card__img"
                      loading="lazy"
                    />
                    <span className="art1-card__number">{act.number}</span>
                  </div>
                )}

                {/* Content side */}
                <div className="art1-card__body">
                  {/* Show number inline for text-only cards */}
                  {!act.image && (
                    <span className="art1-card__number art1-card__number--inline">{act.number}</span>
                  )}
                  <div className="art1-card__title-row">
                    {act.icon && <act.icon size={18} className="art1-card__icon" aria-hidden="true" />}
                    <h2 className="art1-card__title">{act.title}</h2>
                  </div>
                  {/* Activity pill badges */}
                  <div className="art1-card__badges">
                    {act.badges.map((b) => (
                      <span key={b} className="art1-card__badge">{b}</span>
                    ))}
                  </div>
                  <p className="art1-card__pull">&ldquo;{act.pullQuote}&rdquo;</p>
                  <p className="art1-card__desc">{act.desc}</p>
                  <div className="art1-card__tags">
                    <span className="art1-card__tags-label">{a1.perfectFor}</span>
                    {act.tags.map((tag) => (
                      <span key={tag} className="art1-card__tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Insider tips */}
            <motion.div
              className="art1-tips"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65 }}
            >
              <span className="art1-tips__label">
                <Lightbulb size={14} aria-hidden="true" /> {a1.tipsLabel}
              </span>
              <ul className="art1-tips__list">
                {a1.insiderTips.map((tip, i) => (
                  <li key={i} className="art1-tips__item">
                    <Lightbulb size={13} className="art1-tips__item-icon" aria-hidden="true" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Divider before CTA */}
            <CheetahDivider />

            <div className="art1-book-cta">
              <p className="art1-book-cta__sub">
                {a1.bookCtaSub}
              </p>
              <a
                href="/contact"
                className="btn btn-primary art1-book-cta__btn"
                onClick={e => { e.preventDefault(); navigate('/contact') }}
              >
                {a1.bookCtaBtn}
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* Next article teaser */}
        <section className="art1-next-article section">
          <div className="container">
            <CheetahDivider />
            <motion.div
              className="art1-next-wrap"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65 }}
            >
              <Link to="/blog/coastal-swahili-dishes" className="art1-next-card">
                <div className="art1-next-card__img-wrap">
                  <img src={swahiliImg} alt="Coastal Swahili dishes" className="art1-next-card__img" loading="lazy" />
                  <div className="art1-next-card__overlay" aria-hidden="true" />
                  <span className="art1-next-card__category">{a1.nextCategory}</span>
                </div>
                <div className="art1-next-card__body">
                  <span className="art1-next-card__eyebrow">{a1.readNextEyebrow}</span>
                  <h3 className="art1-next-card__title">{a1.readNextTitle}</h3>
                  <p className="art1-next-card__excerpt">
                    {a1.readNextExcerpt}
                  </p>
                  <span className="art1-next-card__cta">
                    {a1.readNextCta} <ArrowRight size={13} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Coming soon */}
        <section className="art1-coming-soon section section--secondary">
          <div className="container">
            <span className="art1-cs__eyebrow">{a1.moreFromEyebrow}</span>
            <div className="art1-cs__grid">
              <motion.div
                className="art1-cs__card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
              >
                <span className="art1-cs__badge">{a1.comingSoon}</span>
                <h4 className="art1-cs__title">{a1.cs1Title}</h4>
                <p className="art1-cs__desc">{a1.cs1Desc}</p>
                <div className="art1-cs__pills">
                  <span className="art1-cs__pill art1-cs__pill--travel">{pills.first[0]}</span>
                  <span className="art1-cs__pill art1-cs__pill--nature">{pills.first[1]}</span>
                  <span className="art1-cs__pill art1-cs__pill--nature">{pills.first[2]}</span>
                  <span className="art1-cs__pill art1-cs__pill--family">{pills.first[3]}</span>
                </div>
              </motion.div>
              <motion.div
                className="art1-cs__card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="art1-cs__badge">{a1.comingSoon}</span>
                <h4 className="art1-cs__title">{a1.cs2Title}</h4>
                <p className="art1-cs__desc">{a1.cs2Desc}</p>
                <div className="art1-cs__pills">
                  <span className="art1-cs__pill art1-cs__pill--marine">{pills.second[0]}</span>
                  <span className="art1-cs__pill art1-cs__pill--marine">{pills.second[1]}</span>
                  <span className="art1-cs__pill art1-cs__pill--nature">{pills.second[2]}</span>
                  <span className="art1-cs__pill art1-cs__pill--travel">{pills.second[3]}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="art1-nav section">
          <div className="container art1-nav__inner">
            <Link to="/blog" className="art1-nav__back">
              <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
              {a1.backToStories}
            </Link>
            <Link to="/blog/coastal-swahili-dishes" className="art1-nav__next">
              {a1.nextArticle}
              <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </section>

      </main>

      <style>{`
        /* ── Hero ── */
        .art1-hero {
          position: relative;
          width: 100%;
          height: clamp(360px, 50vw, 580px);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .art1-hero__img-wrap {
          position: absolute;
          inset: 0;
        }
        .art1-hero__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 55%;
        }
        .art1-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(10,6,2,0.28) 0%, rgba(10,6,2,0.65) 100%);
        }
        .art1-hero__content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 0 clamp(16px, 5vw, 48px);
          max-width: 800px;
        }
        .art1-hero__eyebrow {
          display: block;
          color: rgba(255,255,255,0.8);
          letter-spacing: 0.22em;
          margin-bottom: 14px;
        }
        .art1-hero__title {
          font-family: var(--font-title);
          font-size: clamp(1.8rem, 4.5vw, 3.4rem);
          font-weight: 300;
          letter-spacing: 0.03em;
          color: #fff;
          line-height: 1.15;
          margin: 0 0 16px;
        }
        .art1-hero__sub {
          font-family: var(--font-body);
          font-size: clamp(0.88rem, 1.5vw, 1rem);
          color: rgba(255,255,255,0.78);
          line-height: 1.65;
        }

        /* ── Intro ── */
        .art1-intro__inner {
          max-width: 860px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(24px, 3vw, 36px);
        }
        .art1-intro__text {
          font-size: clamp(0.95rem, 1.6vw, 1.1rem);
          color: var(--color-text-muted);
          line-height: 1.8;
          text-align: center;
          max-width: 680px;
        }
        .art1-concierge-note {
          background: rgba(88,176,196,0.08);
          border-left: 3px solid var(--color-teal);
          border-radius: 0 4px 4px 0;
          padding: clamp(14px, 2vw, 22px) clamp(16px, 2.5vw, 28px);
          width: 100%;
        }
        .art1-concierge-note__label {
          display: block;
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-teal);
          margin-bottom: 8px;
        }
        .art1-concierge-note__text {
          font-size: 0.88rem;
          color: var(--color-text-muted);
          line-height: 1.75;
        }

        /* ── Cheetah divider ── */
        .art1-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin: clamp(24px, 4vw, 44px) auto;
          max-width: 220px;
          width: 100%;
        }
        .art1-divider__line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--color-teal), transparent);
          opacity: 0.55;
        }
        .art1-divider__icon {
          width: 26px;
          height: 26px;
          object-fit: contain;
          opacity: 0.7;
        }

        /* ── Activity cards ── */
        .art1-list__inner {
          max-width: 1040px;
        }
        .art1-card {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(16px, 3vw, 32px);
          padding: clamp(28px, 4vw, 48px) 0;
          border-bottom: 1px solid rgba(86,51,17,0.08);
        }
        .art1-card--text-only {
          grid-template-columns: 1fr;
        }
        .art1-card:last-of-type {
          border-bottom: none;
        }
        .art1-card__img-wrap {
          position: relative;
          border-radius: 4px;
          overflow: hidden;
          aspect-ratio: 16 / 9;
        }
        .art1-card__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.55s ease;
        }
        .art1-card:hover .art1-card__img {
          transform: scale(1.04);
        }
        .art1-card__number {
          position: absolute;
          bottom: 12px;
          left: 14px;
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #fff;
          background: var(--color-teal);
          padding: 4px 12px;
          border-radius: 100px;
        }
        .art1-card__number--inline {
          position: static;
          color: var(--color-teal);
          background: none;
          padding: 0;
          align-self: flex-start;
        }
        .art1-card__body {
          display: flex;
          flex-direction: column;
          gap: 14px;
          justify-content: center;
        }
        .art1-card__title {
          font-family: var(--font-title);
          font-size: clamp(1.25rem, 2.4vw, 1.75rem);
          font-weight: 600;
          color: var(--color-espresso);
          line-height: 1.2;
        }
        .art1-card__pull {
          font-family: var(--font-title);
          font-size: clamp(1rem, 1.8vw, 1.2rem);
          font-style: italic;
          font-weight: 300;
          color: var(--color-teal);
          line-height: 1.6;
          border-left: 2px solid var(--color-teal);
          padding-left: clamp(12px, 1.5vw, 18px);
          margin-left: -1px;
        }
        .art1-card__desc {
          font-size: 0.92rem;
          color: var(--color-text-muted);
          line-height: 1.85;
        }
        .art1-card__tags {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          margin-top: 4px;
        }
        .art1-card__tags-label {
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-espresso);
          opacity: 0.55;
        }
        .art1-card__tag {
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-espresso);
          border: 1px solid rgba(86,51,17,0.25);
          padding: 3px 10px;
          border-radius: 100px;
        }

        /* ── Book CTA ── */
        .art1-book-cta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: clamp(20px, 3vw, 32px) 0 clamp(8px, 2vw, 16px);
          text-align: center;
        }
        .art1-book-cta__sub {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          line-height: 1.7;
          max-width: 500px;
        }
        .art1-book-cta__btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        /* ── Next article teaser ── */
        .art1-next-wrap {
          max-width: 680px;
          margin-inline: auto;
        }
        .art1-next-card {
          display: grid;
          grid-template-columns: 1fr;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 4px 28px rgba(86,51,17,0.1);
          text-decoration: none;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .art1-next-card:hover {
          box-shadow: 0 8px 40px rgba(88,176,196,0.2);
          transform: translateY(-3px);
        }
        .art1-next-card__img-wrap {
          position: relative;
          aspect-ratio: 16 / 7;
          overflow: hidden;
        }
        .art1-next-card__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.55s ease;
        }
        .art1-next-card:hover .art1-next-card__img {
          transform: scale(1.04);
        }
        .art1-next-card__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.5));
        }
        .art1-next-card__category {
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
        .art1-next-card__body {
          background: var(--color-bg-primary);
          padding: clamp(16px, 2.5vw, 28px);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .art1-next-card__eyebrow {
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-teal);
        }
        .art1-next-card__title {
          font-family: var(--font-title);
          font-size: clamp(1.1rem, 2vw, 1.45rem);
          font-weight: 600;
          color: var(--color-espresso);
          line-height: 1.25;
        }
        .art1-next-card__excerpt {
          font-size: 0.87rem;
          color: var(--color-text-muted);
          line-height: 1.75;
        }
        .art1-next-card__cta {
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

        /* ── Navigation bar ── */
        .art1-nav__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .art1-nav__back,
        .art1-nav__next {
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
        .art1-nav__back:hover,
        .art1-nav__next:hover {
          color: var(--color-teal);
        }

        /* ── Desktop: horizontal activity cards ── */
        @media (min-width: 768px) {
          .art1-card:not(.art1-card--text-only) {
            grid-template-columns: 1fr 1fr;
            align-items: center;
          }
          .art1-card--reverse .art1-card__img-wrap {
            order: 2;
          }
          .art1-card--reverse .art1-card__body {
            order: 1;
          }
          .art1-card__img-wrap {
            aspect-ratio: 4 / 3;
          }
          .art1-next-card {
            grid-template-columns: 280px 1fr;
          }
          .art1-next-card__img-wrap {
            aspect-ratio: auto;
          }
          .art1-voices__grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .art1-cs__grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* ── Social Proof Bar ── */
        .art1-proof {
          background: var(--color-espresso);
          padding: clamp(16px, 2vw, 24px) 0;
        }
        .art1-proof__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
          overflow: hidden;
          max-width: 640px;
        }
        .art1-proof__item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: clamp(14px, 2vw, 22px) clamp(20px, 3vw, 36px);
          background: var(--color-espresso);
          transition: background 0.25s ease;
        }
        .art1-proof__item:hover {
          background: rgba(86,51,17,0.9);
        }
        .art1-proof__icon {
          color: #c9a96e;
          flex-shrink: 0;
        }
        .art1-proof__value {
          display: block;
          font-family: var(--font-title);
          font-size: clamp(1.5rem, 2.8vw, 2rem);
          font-weight: 600;
          color: #fff;
          line-height: 1;
        }
        .art1-proof__label {
          display: block;
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          margin-top: 5px;
        }

        /* ── Intro title ── */
        .art1-intro__title {
          font-family: var(--font-title);
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 400;
          color: var(--color-espresso);
          text-align: center;
          line-height: 1.2;
        }

        /* ── Guest Voices ── */
        .art1-voices__inner {
          max-width: 1040px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(20px, 2.5vw, 32px);
        }
        .art1-voices__eyebrow {
          font-family: var(--font-nav);
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-teal);
        }
        .art1-voices__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          width: 100%;
        }
        .art1-voice {
          margin: 0;
          padding: clamp(18px, 2.5vw, 28px);
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .art1-voice:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(86,51,17,0.1);
        }
        .art1-voice--teal {
          background: rgba(88,176,196,0.09);
          border-left: 3px solid var(--color-teal);
        }
        .art1-voice--espresso {
          background: rgba(86,51,17,0.06);
          border-left: 3px solid var(--color-espresso);
        }
        .art1-voice--sand {
          background: rgba(201,169,110,0.11);
          border-left: 3px solid #c9a96e;
        }
        .art1-voice__quote-icon {
          color: var(--color-teal);
          opacity: 0.6;
          flex-shrink: 0;
        }
        .art1-voice--espresso .art1-voice__quote-icon { color: var(--color-espresso); }
        .art1-voice--sand     .art1-voice__quote-icon { color: #c9a96e; }
        .art1-voice__text {
          font-family: var(--font-title);
          font-size: clamp(0.95rem, 1.7vw, 1.08rem);
          font-style: italic;
          font-weight: 300;
          color: var(--color-espresso);
          line-height: 1.7;
          margin: 0;
        }
        .art1-voice__footer {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px;
        }
        .art1-voice__author-pill {
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-espresso);
          background: rgba(86,51,17,0.08);
          padding: 4px 11px;
          border-radius: 100px;
        }
        .art1-voice__origin-pill {
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-teal);
          background: rgba(88,176,196,0.1);
          padding: 4px 11px;
          border-radius: 100px;
        }
        .art1-voice__platform-pill {
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

        /* ── Card icon + badge row ── */
        .art1-card__title-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .art1-card__icon {
          color: var(--color-teal);
          flex-shrink: 0;
        }
        .art1-card__badges {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 2px;
        }
        .art1-card__badge {
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
          transition: background 0.2s ease, color 0.2s ease;
        }
        .art1-card__badge:nth-child(3n+2) {
          color: var(--color-espresso);
          background: rgba(86,51,17,0.07);
          border-color: rgba(86,51,17,0.18);
        }
        .art1-card__badge:nth-child(3n+3) {
          color: #c9a96e;
          background: rgba(201,169,110,0.1);
          border-color: rgba(201,169,110,0.25);
        }

        /* ── Insider Tips ── */
        .art1-tips {
          background: rgba(201,169,110,0.08);
          border: 1px solid rgba(201,169,110,0.28);
          border-radius: 6px;
          padding: clamp(18px, 2.5vw, 28px) clamp(18px, 2.5vw, 32px);
          margin-bottom: 16px;
        }
        .art1-tips__label {
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
        .art1-tips__list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .art1-tips__item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.88rem;
          color: var(--color-espresso);
          line-height: 1.7;
        }
        .art1-tips__item-icon {
          color: #c9a96e;
          flex-shrink: 0;
          margin-top: 3px;
        }

        /* ── Coming Soon teasers ── */
        .art1-cs__eyebrow {
          display: block;
          font-family: var(--font-nav);
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-teal);
          text-align: center;
          margin-bottom: clamp(20px, 3vw, 32px);
        }
        .art1-cs__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          max-width: 720px;
          margin-inline: auto;
        }
        .art1-cs__card {
          border: 1.5px dashed rgba(86,51,17,0.18);
          border-radius: 6px;
          padding: clamp(20px, 3vw, 32px);
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: rgba(86,51,17,0.02);
          transition: border-color 0.25s ease, background 0.25s ease;
        }
        .art1-cs__card:hover {
          border-color: rgba(88,176,196,0.35);
          background: rgba(88,176,196,0.04);
        }
        .art1-cs__badge {
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
        .art1-cs__title {
          font-family: var(--font-title);
          font-size: clamp(1.05rem, 2vw, 1.35rem);
          font-weight: 600;
          color: var(--color-espresso);
          line-height: 1.25;
          opacity: 0.72;
        }
        .art1-cs__desc {
          font-size: 0.87rem;
          color: var(--color-text-muted);
          line-height: 1.7;
          opacity: 0.7;
        }
        .art1-cs__pills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }
        .art1-cs__pill {
          font-family: var(--font-nav);
          font-size: 0.55rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 4px 11px;
          border-radius: 100px;
          opacity: 0.75;
        }
        .art1-cs__pill--travel  { color: var(--color-teal);    background: rgba(88,176,196,0.1);    border: 1px solid rgba(88,176,196,0.22); }
        .art1-cs__pill--nature  { color: #6b9e6b;              background: rgba(107,158,107,0.1);   border: 1px solid rgba(107,158,107,0.22); }
        .art1-cs__pill--marine  { color: #3d7fb5;              background: rgba(61,127,181,0.1);    border: 1px solid rgba(61,127,181,0.22); }
        .art1-cs__pill--family  { color: var(--color-espresso); background: rgba(86,51,17,0.07);    border: 1px solid rgba(86,51,17,0.18); }
      `}</style>
    </>
  )
}
