import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { getT } from '../i18n/translations.js'
import watamuImg from '../assets/watamu-island.JPEG'

const ARTICLE_IMAGES = [watamuImg]

export default function ArticlesSection() {
  const { lang } = useLanguage()
  const t = getT(lang)
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
          <h2 className="section-title">{art.title}</h2>
          <div className="divider" />
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
                <span className="article-card__category">{article.category}</span>
              </div>
              <div className="article-card__body">
                <h3 className="article-card__title">{article.title}</h3>
                <p className="article-card__excerpt">{article.excerpt}</p>
                <a href="#" className="article-card__cta">
                  {art.readMore}
                  <ArrowRight size={14} strokeWidth={1.5} />
                </a>
              </div>
            </motion.article>
          ))}
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
        .articles-section__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(20px, 3vw, 36px);
        }
        .article-card {
          background: #fff;
          border-radius: 3px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(86,51,17,0.07);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .article-card:hover {
          box-shadow: 0 8px 40px rgba(88,176,196,0.15);
          transform: translateY(-3px);
        }
        .article-card__img-wrap {
          position: relative;
          overflow: hidden;
          aspect-ratio: 16/9;
        }
        .article-card__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .article-card:hover .article-card__img {
          transform: scale(1.04);
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
        }
        .article-card__body {
          padding: clamp(20px, 3vw, 28px);
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }
        .article-card__title {
          font-family: var(--font-title);
          font-size: clamp(1rem, 1.8vw, 1.25rem);
          font-weight: 600;
          color: var(--color-espresso);
          line-height: 1.35;
        }
        .article-card__excerpt {
          font-size: 0.88rem;
          color: var(--color-text-muted);
          line-height: 1.7;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
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
          transition: gap 0.25s ease;
          margin-top: auto;
          padding-top: 8px;
          border-top: 1px solid rgba(86,51,17,0.1);
        }
        .article-card__cta:hover {
          gap: 10px;
        }
        @media (max-width: 640px) {
          .articles-section__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
