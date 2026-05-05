import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { getT } from '../i18n/translations.js'

const REVIEWS = [
  {
    id: 1,
    rating: 5,
    text: 'Waking up to the sound of the ocean every morning was nothing short of magical. The staff remembered our names from day one — it felt like coming home.',
    author: 'Sarah & James O.',
    origin: 'London, UK',
    source: 'TripAdvisor',
  },
  {
    id: 2,
    rating: 5,
    text: 'The suite was beyond anything we had imagined. Watching the sunset from our private terrace with a glass of Kenyan wine — absolutely unforgettable.',
    author: 'Aiko T.',
    origin: 'Tokyo, Japan',
    source: 'Google',
  },
  {
    id: 3,
    rating: 5,
    text: 'From the freshly prepared Swahili breakfast to the evening by the pool, every touch was thoughtful. Duma Suites has raised the bar for coastal luxury in East Africa.',
    author: 'David M.',
    origin: 'Nairobi, Kenya',
    source: 'Google',
  },
  {
    id: 4,
    rating: 5,
    text: 'The concierge arranged a private snorkelling tour and a sunset dhow cruise — both extraordinary. This is a place that understands what true hospitality means.',
    author: 'Priya & Rajan K.',
    origin: 'Dubai, UAE',
    source: 'TripAdvisor',
  },
  {
    id: 5,
    rating: 5,
    text: 'A hidden gem on the Kenyan coast. The infinity pool views at sunrise are unlike anything I have experienced. Will absolutely return.',
    author: 'Marco B.',
    origin: 'Milan, Italy',
    source: 'Instagram',
  },
]

const AUTO_ADVANCE_MS = 9000

function StarRating({ count }) {
  return (
    <div className="rv-stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  )
}

function SourceBadge({ source }) {
  const colours = {
    TripAdvisor: { bg: '#00af87', color: '#fff' },
    Google:      { bg: '#4285F4', color: '#fff' },
    Instagram:   { bg: '#E4405F', color: '#fff' },
  }
  const style = colours[source] || { bg: 'var(--color-teal)', color: '#fff' }
  return (
    <span
      className="rv-badge"
      style={{ background: style.bg, color: style.color }}
    >
      {source}
    </span>
  )
}

const variants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
}

export default function ReviewsSection() {
  const { lang } = useLanguage()
  const t = getT(lang)

  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)

  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.3, triggerOnce: true })
  const { ref: sectionRef, inView: sectionInView } = useInView({ threshold: 0.2 })

  const go = (dir) => {
    setDirection(dir)
    setIndex(prev => (prev + dir + REVIEWS.length) % REVIEWS.length)
  }

  // Auto-cycle
  useEffect(() => {
    if (!sectionInView || paused) return
    const timer = setInterval(() => {
      setDirection(1)
      setIndex(prev => (prev + 1) % REVIEWS.length)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(timer)
  }, [sectionInView, paused])

  const review = REVIEWS[index]

  return (
    <section
      className="rv-section section section--tertiary"
      id="reviews"
      ref={sectionRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container" style={{ maxWidth: 820 }}>
        <div
          ref={headerRef}
          className={`rv-header${headerInView ? ' is-visible' : ''}`}
        >
          <span className="eyebrow">{t.reviews.eyebrow}</span>
          <h2 className="section-title">{t.reviews.title}</h2>
          <div className="divider" style={{ marginInline: 'auto', marginTop: '1rem' }} />
        </div>

        <div className="rv-carousel">
          <button
            className="rv-arrow rv-arrow--prev"
            onClick={() => go(-1)}
            aria-label="Previous review"
          >
            <ChevronLeft size={22} strokeWidth={1.5} />
          </button>

          <div className="rv-slide-wrap">
            <AnimatePresence custom={direction} mode="wait">
              <motion.article
                key={review.id}
                className="rv-card"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="rv-card__rating-row">
                  <StarRating count={review.rating} />
                  <SourceBadge source={review.source} />
                </div>
                <blockquote className="rv-card__text">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
                <footer className="rv-card__footer">
                  <span className="rv-card__author">{review.author}</span>
                  <span className="rv-card__origin">{review.origin}</span>
                </footer>
              </motion.article>
            </AnimatePresence>
          </div>

          <button
            className="rv-arrow rv-arrow--next"
            onClick={() => go(1)}
            aria-label="Next review"
          >
            <ChevronRight size={22} strokeWidth={1.5} />
          </button>
        </div>

        {/* Dots */}
        <div className="rv-dots" aria-label="Review navigation">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              className={`rv-dot${i === index ? ' rv-dot--active' : ''}`}
              onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i) }}
              aria-label={`Go to review ${i + 1}`}
              aria-current={i === index ? 'true' : undefined}
            />
          ))}
        </div>

        {/* Leave a Review CTA */}
        <div className="rv-leave-cta">
          <a
            href="#contact"
            className="rv-leave-cta__btn btn btn-inverse"
            onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            {t.reviews.leaveReview}
            <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>

      <style>{`
        .rv-header {
          text-align: center;
          margin-bottom: clamp(40px, 6vw, 56px);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .rv-header.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .rv-carousel {
          display: flex;
          align-items: center;
          gap: 0;
        }
        .rv-slide-wrap {
          flex: 1;
          overflow: hidden;
          min-height: 220px;
          display: flex;
          align-items: center;
          padding: 0 12px;
        }
        .rv-card {
          width: 100%;
          background: var(--color-bg-primary);
          padding: clamp(24px, 4vw, 40px);
          box-shadow: 0 4px 24px rgba(86,51,17,0.08);
          border-radius: 3px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .rv-card__rating-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .rv-stars {
          display: flex;
          gap: 4px;
          color: #c9a84c;
          justify-content: center;
        }
        .rv-badge {
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 100px;
          flex-shrink: 0;
        }
        .rv-card__text {
          font-family: var(--font-review);
          font-size: clamp(1.05rem, 1.8vw, 1.3rem);
          line-height: 1.7;
          color: var(--color-espresso);
          quotes: none;
          text-align: center;
        }
        .rv-card__footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          padding-top: 16px;
          border-top: 1px solid rgba(86,51,17,0.1);
        }
        .rv-card__author {
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: 0.85rem;
          color: var(--color-espresso);
        }
        .rv-card__origin {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          letter-spacing: 0.04em;
        }
        .rv-arrow {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1.5px solid rgba(86,51,17,0.2);
          background: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-espresso);
          transition: border-color 0.25s ease, background 0.25s ease, color 0.25s ease;
        }
        .rv-arrow:hover {
          border-color: var(--color-teal);
          background: var(--color-teal);
          color: #fff;
        }
        .rv-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 24px;
        }
        .rv-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          background: rgba(86,51,17,0.2);
          cursor: pointer;
          transition: background 0.25s ease, transform 0.25s ease;
          padding: 0;
        }
        .rv-dot--active {
          background: var(--color-teal);
          transform: scale(1.3);
        }
        .rv-leave-cta {
          display: flex;
          justify-content: center;
          margin-top: clamp(28px, 4vw, 40px);
        }
        .rv-leave-cta__btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        @media (max-width: 768px) {
          .rv-carousel {
            gap: 0;
          }
          .rv-arrow {
            width: 40px;
            height: 40px;
          }
          .rv-slide-wrap {
            padding: 0 8px;
          }
        }
        @media (max-width: 480px) {
          .rv-carousel {
            margin: 0 -12px;
          }
          .rv-arrow {
            width: 36px;
            height: 36px;
            flex-shrink: 0;
          }
          .rv-slide-wrap {
            padding: 0 4px;
          }
        }
      `}</style>
    </section>
  )
}

