import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage, useT } from '../context/LanguageContext.jsx'
import cheetahIcon from '../assets/cheetah.png'
import dolphinImg  from '../assets/dolphin-watching-watamu.jpg'
import swahiliImg  from '../assets/coastal-swahili-dishes.webp'

const ARTICLE_IMAGES = [dolphinImg, swahiliImg]

export default function ArticlesSection() {
  const t = useT()
  const art = t.articles

  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.3, triggerOnce: true })
  const { ref: gridRef, inView: gridInView }     = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="articles-section section section--secondary" id="articles">
      <div className="container">
        <div
          ref={headerRef}
          className={`articles-section__header${headerInView ? ' is-visible' : ''}`}
        >
          <span className="eyebrow">{art.eyebrow}</span>

          <div className="art-cheetah-divider" aria-hidden="true">
            <span className="art-cheetah-divider__line" />
            <img src={cheetahIcon} alt="" className="art-cheetah-divider__icon" />
            <span className="art-cheetah-divider__line" />
          </div>

          <h2 className="section-title">{art.title}</h2>
          {art.subtitle && (
            <p className="articles-section__subtitle">{art.subtitle}</p>
          )}
        </div>

        <div className="articles-section__grid" ref={gridRef}>
          {art.items.map((article, i) => (
            <motion.article
              key={i}
              className="article-card"
              initial={{ opacity: 0, y: 32 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="article-card__img-wrap">
                <img
                  src={ARTICLE_IMAGES[i % ARTICLE_IMAGES.length]}
                  alt={article.title}
                  className="article-card__img"
                  loading="lazy"
                />
                {/* Gradient overlay for readability */}
                <div className="article-card__gradient" aria-hidden="true" />

                {/* Category badge */}
                <span className="article-card__category">{article.category}</span>

                {/* Text overlay */}
                <div className="article-card__overlay-body">
                  <h3 className="article-card__title">{article.title}</h3>
                  <p className="article-card__excerpt">{article.excerpt}</p>
                  <div className="article-card__cta-wrap">
                    <Link
                      to={`/blog/${article.slug}`}
                      className="article-card__cta"
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

        {/* Blog CTA */}
        <div className="articles-section__blog-cta">
          <Link to="/blog" className="btn btn-secondary articles-section__blog-cta-btn">
            {art.blogCta}
            <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <style>{`
        .articles-section__header {
          text-align: center;
          margin-bottom: clamp(32px, 5vw, 56px);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .articles-section__header.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .articles-section__subtitle {
          font-family: var(--font-body);
          font-size: clamp(0.9rem, 1.4vw, 1rem);
          color: var(--color-text-muted);
          margin-top: 10px;
          line-height: 1.65;
          letter-spacing: 0.01em;
        }
        .art-cheetah-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin: 12px auto 16px;
          max-width: 280px;
        }
        .art-cheetah-divider__line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--color-teal), transparent);
          opacity: 0.6;
        }
        .art-cheetah-divider__icon {
          width: 28px;
          height: 28px;
          object-fit: contain;
          opacity: 0.75;
        }
        .articles-section__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(20px, 3vw, 36px);
        }
        .article-card {
          border-radius: 3px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(86,51,17,0.07);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          position: relative;
        }
        .article-card:hover {
          box-shadow: 0 8px 40px rgba(88,176,196,0.18);
          transform: translateY(-3px);
        }
        .article-card__img-wrap {
          position: relative;
          overflow: hidden;
          height: clamp(340px, 40vw, 480px);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .article-card__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.55s ease;
        }
        .article-card:hover .article-card__img {
          transform: scale(1.04);
        }
        .article-card__gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.05) 0%,
            rgba(0,0,0,0.18) 35%,
            rgba(0,0,0,0.72) 80%,
            rgba(0,0,0,0.82) 100%
          );
          pointer-events: none;
          z-index: 1;
        }
        .article-card__category {
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
        .article-card__overlay-body {
          position: relative;
          z-index: 2;
          padding: clamp(16px, 2.5vw, 28px);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .article-card__title {
          font-family: var(--font-title);
          font-size: clamp(1.1rem, 2vw, 1.45rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.25;
          text-shadow: 0 1px 6px rgba(0,0,0,0.4);
        }
        .article-card__excerpt {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.82);
          line-height: 1.65;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .article-card__cta-wrap {
          display: flex;
          justify-content: center;
          padding-top: 8px;
          border-top: 1px solid rgba(255,255,255,0.18);
        }
        .article-card__cta {
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
        .article-card__cta:hover {
          gap: 10px;
          color: #fff;
        }
        .articles-section__blog-cta {
          display: flex;
          justify-content: center;
          margin-top: clamp(36px, 5vw, 56px);
        }
        .articles-section__blog-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        @media (max-width: 640px) {
          .articles-section__grid {
            grid-template-columns: 1fr;
          }
          .article-card__img-wrap {
            height: clamp(300px, 70vw, 380px);
          }
        }
      `}</style>
    </section>
  )
}
