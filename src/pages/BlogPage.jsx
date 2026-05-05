import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { getT } from '../i18n/translations.js'

import cheetahIcon from '../assets/cheetah.png'
import dolphinImg   from '../assets/dolphin-watching-watamu.jpg'
import swahiliImg   from '../assets/coastal-swahili-dishes.webp'
import heroImg      from '../assets/infinity-pool-ocean-view.jpg'

const ARTICLE_IMAGES = [dolphinImg, swahiliImg]

export default function BlogPage() {
  const { lang } = useLanguage()
  const t = getT(lang)
  const art = t.articles

  const featured = art.items[0]
  const rest = art.items.slice(1)

  return (
    <>
      <Helmet>
        <title>Stories & Guides | Duma Suites – Watamu</title>
        <meta
          name="description"
          content="Explore travel guides, coastal culture, food stories and insider tips from the shores of Watamu — curated by the Duma Suites team."
        />
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
              Travel guides, coastal culture and insider stories from Watamu's most beloved address.
            </motion.p>
          </div>
        </div>

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
                <span className="blog-featured-card__badge">Featured</span>
                <span className="blog-featured-card__category">{featured.category}</span>
              </div>
              <div className="blog-featured-card__body">
                <span className="blog-featured-card__eyebrow">Editor's Pick</span>
                <h2 className="blog-featured-card__title">{featured.title}</h2>
                <p className="blog-featured-card__excerpt">{featured.excerpt}</p>
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
              &ldquo;Watamu offers a wealth of extraordinary experiences for every type of traveller.&rdquo;
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
                <h2 className="blog-grid-header__title">More Stories &amp; Guides</h2>
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
                      <div className="blog-card__overlay-body">
                        <h2 className="blog-card__title">{article.title}</h2>
                        <p className="blog-card__excerpt">{article.excerpt}</p>
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
              <span className="blog-concierge__label">From Our Concierge</span>
              <p className="blog-concierge__text">
                Our team personally curates these experiences and stories for guests staying at Duma Suites.
                Every guide you read here is drawn from local knowledge and lived experience on the Watamu coast.
              </p>
              <Link to="/#contact" className="blog-concierge__cta btn btn-primary">
                Plan Your Stay
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
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
        }
      `}</style>
    </>
  )
}
