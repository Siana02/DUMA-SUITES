import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useT } from '../i18n/useT.js'

import cheetahIcon from '../assets/cheetah.png'
import dolphinImg   from '../assets/dolphin-watching-watamu.jpg'
import swahiliImg   from '../assets/coastal-swahili-dishes.webp'
import heroImg      from '../assets/infinity-pool-ocean-view.jpg'

const ARTICLE_IMAGES = [dolphinImg, swahiliImg]

const ARTICLE_META = [
  { readTime: '8', tags: ['Travel', 'Adventure', 'Marine', 'Culture'] },
  { readTime: '6', tags: ['Food', 'Culture', 'Swahili', 'Local'] },
]

const BLOG_PAGE_COPY = {
  en: { featured: 'Featured' },
  it: { featured: 'In Evidenza' },
  de: { featured: 'Empfohlen' },
  fr: { featured: 'À la une' },
  es: { featured: 'Destacado' },
}

export default function BlogPage() {
  const { lang } = useLanguage()
  const t = useT()
  const art = t.articles
  const blog = t.blog
  const copy = BLOG_PAGE_COPY[lang] || BLOG_PAGE_COPY.en
  const navigate = useNavigate()

  const featured = art.items[0]
  const rest = art.items.slice(1)

  return (
    <>
      <Helmet>
        <title>{blog.metaTitle}</title>
        <meta name="description" content={blog.metaDesc} />
      </Helmet>

      <main style={{ paddingTop: 80 }}>

        {/* Hero */}
        <div className="blog-hero">
          <div className="blog-hero__img-wrap">
            <img src={heroImg} alt="Watamu coastline aerial view" className="blog-hero__img" />
            <div className="blog-hero__overlay" aria-hidden="true" />
          </div>
          <div className="blog-hero__content">
            <motion.span
              className="eyebrow blog-hero__eyebrow"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {art.eyebrow}
            </motion.span>
            <motion.h1
              className="blog-hero__title"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.22 }}
            >
              {art.title}
            </motion.h1>
            <motion.p
              className="blog-hero__sub"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.36 }}
            >
              {blog.heroSub}
            </motion.p>
          </div>
        </div>

        {/* Articles intro */}
        <section className="blog-intro section">
          <div className="container blog-intro__inner">
            <motion.span
              className="blog-intro__eyebrow eyebrow"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
            >
              {blog.articlesIntroEyebrow}
            </motion.span>
            <motion.h2
              className="blog-intro__title"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              {blog.articlesIntroTitle}
            </motion.h2>
            <motion.p
              className="blog-intro__desc"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {blog.articlesIntroDesc}
            </motion.p>
          </div>
        </section>

        {/* Featured article */}
        <section className="blog-featured-section section">
          <div className="container">
            {/* Divider */}
            <div className="blog-cheetah-divider blog-cheetah-divider--top" aria-hidden="true">
              <span className="blog-cheetah-divider__line" />
              <img src={cheetahIcon} alt="" className="blog-cheetah-divider__icon" />
              <span className="blog-cheetah-divider__line" />
            </div>

            <motion.article
              className="blog-featured-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="blog-featured-card__img-wrap">
                <img
                  src={ARTICLE_IMAGES[0]}
                  alt={featured.title}
                  className="blog-featured-card__img"
                />
                <div className="blog-featured-card__gradient" aria-hidden="true" />
                <span className="blog-featured-card__badge">{copy.featured}</span>
                <span className="blog-featured-card__category">{featured.category}</span>
                <span className="blog-featured-card__read-time">
                  <Clock size={11} strokeWidth={1.5} />
                  {ARTICLE_META[0].readTime} {blog.readTimeMin}
                </span>
              </div>
              <div className="blog-featured-card__body">
                <span className="blog-featured-card__eyebrow">{blog.editorsPick}</span>
                <h2 className="blog-featured-card__title">{featured.title}</h2>
                <p className="blog-featured-card__excerpt">{featured.excerpt}</p>
                <div className="blog-featured-card__tags">
                  {ARTICLE_META[0].tags.map(tag => (
                    <span key={tag} className="blog-tag">{tag}</span>
                  ))}
                </div>
                <Link
                  to={`/blog/${featured.slug}`}
                  className="btn btn-primary blog-featured-card__cta"
                >
                  {art.readMore}
                  <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
                </Link>
              </div>
            </motion.article>

            {/* Pull-quote highlight */}
            <motion.blockquote
              className="blog-pull-quote"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              {blog.pullQuote}
            </motion.blockquote>
          </div>
        </section>

        {/* More articles grid */}
        {rest.length > 0 && (
          <section className="blog-grid-section section section--secondary">
            <div className="container">
              <div className="blog-grid-header">
                <div className="blog-cheetah-divider" aria-hidden="true">
                  <span className="blog-cheetah-divider__line" />
                  <img src={cheetahIcon} alt="" className="blog-cheetah-divider__icon" />
                  <span className="blog-cheetah-divider__line" />
                </div>
                <h2 className="blog-grid-header__title">{blog.moreStoriesTitle}</h2>
              </div>

              <div className="blog-grid">
                {rest.map((article, i) => (
                  <motion.article
                    key={i}
                    className="blog-card"
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <div className="blog-card__img-wrap">
                      <img
                        src={ARTICLE_IMAGES[(i + 1) % ARTICLE_IMAGES.length]}
                        alt={article.title}
                        className="blog-card__img"
                        loading="lazy"
                      />
                      <div className="blog-card__gradient" aria-hidden="true" />
                      <span className="blog-card__category">{article.category}</span>
                      {ARTICLE_META[i + 1] && (
                        <span className="blog-card__read-time">
                          <Clock size={10} strokeWidth={1.5} />
                          {ARTICLE_META[i + 1].readTime} {blog.readTimeMin}
                        </span>
                      )}
                      <div className="blog-card__overlay-body">
                        <h2 className="blog-card__title">{article.title}</h2>
                        <p className="blog-card__excerpt">{article.excerpt}</p>
                        {ARTICLE_META[i + 1] && (
                          <div className="blog-card__tags">
                            {ARTICLE_META[i + 1].tags.map(tag => (
                              <span key={tag} className="blog-tag blog-tag--dark">{tag}</span>
                            ))}
                          </div>
                        )}
                        <div className="blog-card__cta-wrap">
                          <Link
                            to={`/blog/${article.slug}`}
                            className="blog-card__cta"
                          >
                            {art.readMore}
                            <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Concierge trust block */}
        <section className="blog-concierge section">
          <div className="container">
            <motion.div
              className="blog-concierge__inner"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.65 }}
            >
              <div className="blog-concierge__icon-wrap" aria-hidden="true">
                <img src={cheetahIcon} alt="" className="blog-concierge__icon" />
              </div>
              <span className="blog-concierge__label">{blog.conciergeLabel}</span>
              <p className="blog-concierge__text">{blog.conciergeText}</p>
              <a
                href="/contact"
                className="blog-concierge__cta btn btn-primary"
                onClick={e => { e.preventDefault(); navigate('/contact') }}
              >
                {blog.conciergeCta}
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </motion.div>
          </div>
        </section>

      </main>

      <style>{`
        /* ── Hero ── */
        .blog-hero {
          position: relative;
          width: 100%;
          height: clamp(340px, 48vw, 560px);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .blog-hero__img-wrap {
          position: absolute;
          inset: 0;
        }
        .blog-hero__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 40%;
        }
        .blog-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(10,6,2,0.3) 0%, rgba(10,6,2,0.65) 100%);
        }
        .blog-hero__content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 0 clamp(16px, 5vw, 48px);
          max-width: 720px;
        }
        .blog-hero__eyebrow {
          display: block;
          color: rgba(255,255,255,0.8);
          letter-spacing: 0.22em;
          margin-bottom: 14px;
        }
        .blog-hero__title {
          font-family: var(--font-title);
          font-size: clamp(2rem, 5vw, 3.8rem);
          font-weight: 300;
          letter-spacing: 0.04em;
          color: #fff;
          line-height: 1.15;
          margin: 0 0 18px;
        }
        .blog-hero__sub {
          font-family: var(--font-body);
          font-size: clamp(0.9rem, 1.5vw, 1.05rem);
          color: rgba(255,255,255,0.8);
          line-height: 1.7;
          max-width: 520px;
          margin-inline: auto;
        }

        /* ── Articles intro ── */
        .blog-intro {
          padding-block: clamp(48px, 7vw, 80px);
          background: var(--color-bg-primary);
        }
        .blog-intro__inner {
          max-width: 680px;
          margin-inline: auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .blog-intro__eyebrow {
          color: var(--color-teal);
          letter-spacing: 0.22em;
        }
        .blog-intro__title {
          font-family: var(--font-title);
          font-size: clamp(1.7rem, 3.5vw, 2.6rem);
          font-weight: 300;
          letter-spacing: 0.03em;
          color: var(--color-espresso);
          line-height: 1.2;
          margin: 0;
        }
        .blog-intro__desc {
          font-family: var(--font-body);
          font-size: clamp(0.9rem, 1.4vw, 1rem);
          color: var(--color-text-muted);
          line-height: 1.8;
          max-width: 560px;
          margin: 0;
        }

        /* ── Tags ── */
        .blog-tag {
          display: inline-block;
          font-family: var(--font-nav);
          font-size: 0.52rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-espresso);
          background: rgba(86,51,17,0.1);
          border: 1px solid rgba(86,51,17,0.18);
          padding: 3px 10px;
          border-radius: 100px;
        }
        .blog-tag--dark {
          color: rgba(255,255,255,0.85);
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.2);
        }
        .blog-featured-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        /* ── Cheetah divider ── */
        .blog-cheetah-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          max-width: 280px;
          width: 100%;
          margin-inline: auto;
        }
        .blog-cheetah-divider--top {
          margin-bottom: clamp(28px, 3.5vw, 44px);
        }
        .blog-cheetah-divider__line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--color-teal), transparent);
          opacity: 0.6;
        }
        .blog-cheetah-divider__icon {
          width: 28px;
          height: 28px;
          object-fit: contain;
          opacity: 0.75;
        }

        /* ── Featured article card ── */
        .blog-featured-card {
          display: grid;
          grid-template-columns: 1fr;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 6px 36px rgba(86,51,17,0.12);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .blog-featured-card:hover {
          box-shadow: 0 12px 52px rgba(88,176,196,0.2);
          transform: translateY(-3px);
        }
        .blog-featured-card__img-wrap {
          position: relative;
          aspect-ratio: 16 / 8;
          overflow: hidden;
        }
        .blog-featured-card__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 55%;
          transition: transform 0.55s ease;
        }
        .blog-featured-card:hover .blog-featured-card__img {
          transform: scale(1.04);
        }
        .blog-featured-card__gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.35) 100%);
          pointer-events: none;
        }
        .blog-featured-card__badge {
          position: absolute;
          top: 14px;
          right: 14px;
          font-family: var(--font-nav);
          font-size: 0.55rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-espresso);
          background: rgba(247,241,229,0.9);
          padding: 4px 12px;
          border-radius: 100px;
        }
        .blog-featured-card__category {
          position: absolute;
          top: 14px;
          left: 14px;
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #fff;
          background: var(--color-teal);
          padding: 4px 12px;
          border-radius: 100px;
        }
        .blog-featured-card__read-time {
          position: absolute;
          bottom: 14px;
          right: 14px;
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-nav);
          font-size: 0.55rem;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.88);
          background: rgba(0,0,0,0.45);
          padding: 4px 10px;
          border-radius: 100px;
          backdrop-filter: blur(4px);
        }
        .blog-featured-card__body {
          background: var(--color-bg-primary);
          padding: clamp(20px, 3vw, 36px);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .blog-featured-card__eyebrow {
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-teal);
        }
        .blog-featured-card__title {
          font-family: var(--font-title);
          font-size: clamp(1.35rem, 2.8vw, 2rem);
          font-weight: 600;
          color: var(--color-espresso);
          line-height: 1.22;
        }
        .blog-featured-card__excerpt {
          font-size: clamp(0.87rem, 1.4vw, 0.97rem);
          color: var(--color-text-muted);
          line-height: 1.75;
          max-width: 640px;
        }
        .blog-featured-card__cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          align-self: flex-start;
        }

        /* ── Pull quote ── */
        .blog-pull-quote {
          font-family: var(--font-title);
          font-size: clamp(1.05rem, 2.2vw, 1.4rem);
          font-style: italic;
          font-weight: 300;
          color: var(--color-espresso);
          text-align: center;
          line-height: 1.65;
          opacity: 0.75;
          margin: clamp(28px, 4vw, 48px) auto 0;
          max-width: 600px;
          border: none;
          padding: 0;
        }

        /* ── Grid header ── */
        .blog-grid-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          margin-bottom: clamp(28px, 3.5vw, 44px);
        }
        .blog-grid-header__title {
          font-family: var(--font-title);
          font-size: clamp(1.3rem, 2.5vw, 1.8rem);
          font-weight: 400;
          color: var(--color-espresso);
          letter-spacing: 0.02em;
        }

        /* ── Grid ── */
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(20px, 3vw, 40px);
        }
        .blog-card {
          border-radius: 3px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(86,51,17,0.08);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .blog-card:hover {
          box-shadow: 0 8px 40px rgba(88,176,196,0.18);
          transform: translateY(-3px);
        }
        .blog-card__img-wrap {
          position: relative;
          overflow: hidden;
          height: clamp(360px, 40vw, 500px);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .blog-card__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.55s ease;
        }
        .blog-card:hover .blog-card__img {
          transform: scale(1.04);
        }
        .blog-card__gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.04) 0%,
            rgba(0,0,0,0.18) 35%,
            rgba(0,0,0,0.72) 78%,
            rgba(0,0,0,0.84) 100%
          );
          pointer-events: none;
          z-index: 1;
        }
        .blog-card__category {
          position: absolute;
          top: 14px;
          left: 14px;
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #fff;
          background: var(--color-teal);
          padding: 4px 12px;
          border-radius: 100px;
          z-index: 2;
        }
        .blog-card__read-time {
          position: absolute;
          top: 14px;
          right: 14px;
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-nav);
          font-size: 0.52rem;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.88);
          background: rgba(0,0,0,0.45);
          padding: 3px 10px;
          border-radius: 100px;
          z-index: 2;
          backdrop-filter: blur(4px);
        }
        .blog-card__overlay-body {
          position: relative;
          z-index: 2;
          padding: clamp(16px, 2.5vw, 28px);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .blog-card__title {
          font-family: var(--font-title);
          font-size: clamp(1.15rem, 2.2vw, 1.55rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.25;
          text-shadow: 0 1px 6px rgba(0,0,0,0.4);
        }
        .blog-card__excerpt {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.82);
          line-height: 1.65;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .blog-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }
        .blog-card__cta-wrap {
          display: flex;
          justify-content: center;
          padding-top: 8px;
          border-top: 1px solid rgba(255,255,255,0.18);
        }
        .blog-card__cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-nav);
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-teal);
          text-decoration: none;
          transition: gap 0.25s ease, color 0.25s ease;
        }
        .blog-card__cta:hover {
          gap: 10px;
          color: #fff;
        }

        /* ── Concierge trust block ── */
        .blog-concierge__inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          text-align: center;
          max-width: 620px;
          margin-inline: auto;
          background: rgba(88,176,196,0.07);
          border: 1px solid rgba(88,176,196,0.25);
          border-radius: 4px;
          padding: clamp(24px, 3.5vw, 44px) clamp(20px, 4vw, 52px);
        }
        .blog-concierge__icon-wrap {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(88,176,196,0.1);
          border-radius: 50%;
          border: 1px solid rgba(88,176,196,0.3);
        }
        .blog-concierge__icon {
          width: 28px;
          height: 28px;
          object-fit: contain;
          opacity: 0.8;
        }
        .blog-concierge__label {
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-teal);
        }
        .blog-concierge__text {
          font-size: clamp(0.88rem, 1.5vw, 0.98rem);
          color: var(--color-text-muted);
          line-height: 1.8;
        }
        .blog-concierge__cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        /* ── Desktop: side-by-side featured card ── */
        @media (min-width: 768px) {
          .blog-featured-card {
            grid-template-columns: 1fr 1fr;
            align-items: stretch;
          }
          .blog-featured-card__img-wrap {
            aspect-ratio: auto;
          }
        }
        @media (max-width: 640px) {
          .blog-grid {
            grid-template-columns: 1fr;
          }
          .blog-card__img-wrap {
            height: clamp(300px, 70vw, 380px);
          }
          .blog-stats-bar__inner {
            gap: 0;
          }
          .blog-stat {
            padding: 4px 14px;
          }
        }
      `}</style>
    </>
  )
}
