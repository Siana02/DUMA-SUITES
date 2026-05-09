import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, ArrowLeft, ArrowRight, PenLine } from 'lucide-react'
import { useT } from '../i18n/useT.js'

const AUTO_ADVANCE_MS = 9000

/* ── Star rating ─────────────────────────────────────────── */
function StarRating({ count }) {
  return (
    <div className="rv-stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={22} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  )
}

/* ── Guest initials avatar ───────────────────────────────── */
function Avatar({ initials }) {
  return (
    <div className="rv-avatar" aria-hidden="true">
      <span className="rv-avatar__initials">{initials}</span>
    </div>
  )
}

/* ── Platform badge ──────────────────────────────────────── */
function SourceBadge({ source }) {
  const map = {
    TripAdvisor: { dot: '#00af87', label: 'TripAdvisor' },
    Google:      { dot: '#4285F4', label: 'Google Reviews' },
  }
  const item = map[source] || { dot: 'var(--color-teal)', label: source }
  return (
    <span className="rv-source-badge">
      <span className="rv-source-badge__dot" style={{ background: item.dot }} />
      {item.label}
    </span>
  )
}

/* ── Card animation variants ─────────────────────────────── */
const variants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 70 : -70 }),
  center: { opacity: 1, x: 0 },
  exit:  (dir) => ({ opacity: 0, x: dir > 0 ? -70 : 70 }),
}

/* ── Credibility bar (Google + TripAdvisor) ──────────────── */
function CredibilityBar() {
  return (
    <div className="rv-cred-bar" aria-label="Verified review platforms">
      <span className="rv-cred-item">
        <span className="rv-cred-dot" style={{ background: '#4285F4' }} />
        <span className="rv-cred-label">Google Reviews</span>
        <span className="rv-cred-score">5.0 ★</span>
      </span>
      <span className="rv-cred-divider" aria-hidden="true" />
      <span className="rv-cred-item">
        <span className="rv-cred-dot" style={{ background: '#00af87' }} />
        <span className="rv-cred-label">TripAdvisor</span>
        <span className="rv-cred-score">5.0 ★</span>
      </span>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   Main component
   ════════════════════════════════════════════════════════════ */
export default function ReviewsSection() {
  const t = useT()
  const reviews = t.reviews.items

  const [index, setIndex]       = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused]     = useState(false)

  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.3, triggerOnce: true })
  const { ref: sectionRef, inView: sectionInView } = useInView({ threshold: 0.15 })

  const go = (dir) => {
    setDirection(dir)
    setIndex(prev => (prev + dir + reviews.length) % reviews.length)
  }

  useEffect(() => {
    if (!sectionInView || paused) return
    const timer = setInterval(() => {
      setDirection(1)
      setIndex(prev => (prev + 1) % reviews.length)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(timer)
  }, [sectionInView, paused, reviews.length])

  const review = reviews[index]

  return (
    <section
      className="rv-section section section--tertiary"
      id="reviews"
      ref={sectionRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container rv-container">

        {/* ── Header ───────────────────────────────────────── */}
        <div
          ref={headerRef}
          className={`rv-header${headerInView ? ' is-visible' : ''}`}
        >
          <span className="eyebrow">{t.reviews.eyebrow}</span>
          <h2 className="section-title">{t.reviews.title}</h2>
        </div>

        {/* ── Platform credibility bar ──────────────────── */}
        <CredibilityBar />

        {/* ── Carousel ─────────────────────────────────── */}
        <div className="rv-carousel">

          {/* Slide viewport */}
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
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Avatar */}
                <div className="rv-card__avatar-row">
                  <Avatar initials={review.initials} />
                </div>

                {/* Source badge + stars */}
                <div className="rv-card__meta">
                  <SourceBadge source={review.source} />
                  <StarRating count={review.rating} />
                </div>

                {/* Pull-quote highlight */}
                <blockquote className="rv-card__pull-quote">
                  <span className="rv-card__opening-mark">&ldquo;</span>
                  {review.pullQuote}
                  <span className="rv-card__closing-mark">&rdquo;</span>
                </blockquote>

                {/* Full testimonial */}
                <p className="rv-card__full-text">{review.text}</p>

                {/* Guest identity */}
                <footer className="rv-card__footer">
                  <span className="rv-card__author">{review.author}</span>
                  <span className="rv-card__origin">{review.origin}</span>
                </footer>
              </motion.article>
            </AnimatePresence>
          </div>

        </div>

        {/* ── Dot navigation ─────────────────────────── */}
        <div className="rv-dots" aria-label="Review navigation">
          {reviews.map((_, i) => (
            <button
              key={i}
              className={`rv-dot${i === index ? ' rv-dot--active' : ''}`}
              onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i) }}
              aria-label={`Go to review ${i + 1}`}
              aria-current={i === index ? 'true' : undefined}
            />
          ))}
        </div>

        {/* ── Arrow navigation ───────────────────────── */}
        <div className="rv-arrow-row">
          <button
            className="rv-arrow rv-arrow--prev"
            onClick={() => go(-1)}
            aria-label="Previous review"
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
          </button>
          <button
            className="rv-arrow rv-arrow--next"
            onClick={() => go(1)}
            aria-label="Next review"
          >
            <ArrowRight size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* ── Leave a Review CTA ─────────────────────── */}
        <div className="rv-leave-cta">
          <a
            href="https://search.google.com/local/writereview?placeid=PLACE_ID"
            className="rv-leave-cta__btn btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <PenLine size={15} strokeWidth={1.5} aria-hidden="true" />
            {t.reviews.leaveReview}
          </a>
        </div>
      </div>

      <style>{`
        /* ── Container ──────────────────────────────────── */
        .rv-container {
          max-width: 780px;
        }

        /* ── Header ─────────────────────────────────────── */
        .rv-header {
          text-align: center;
          margin-bottom: clamp(28px, 4vw, 40px);
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }
        .rv-header.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Credibility bar ────────────────────────────── */
        .rv-cred-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-bottom: clamp(32px, 5vw, 48px);
          flex-wrap: wrap;
        }
        .rv-cred-item {
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .rv-cred-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .rv-cred-label {
          font-family: var(--font-nav);
          font-size: 0.6rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }
        .rv-cred-score {
          font-family: var(--font-nav);
          font-size: 0.6rem;
          letter-spacing: 0.08em;
          color: var(--color-teal);
        }
        .rv-cred-divider {
          width: 1px;
          height: 16px;
          background: rgba(86,51,17,0.18);
        }

        /* ── Carousel wrapper ───────────────────────────── */
        .rv-carousel {
          display: block;
        }

        /* ── Slide viewport ─────────────────────────────── */
        .rv-slide-wrap {
          width: 100%;
          overflow: hidden;
          min-height: 340px;
          display: flex;
          align-items: center;
        }

        /* ── Card ───────────────────────────────────────── */
        .rv-card {
          width: 100%;
          background: var(--color-bg-primary);
          padding: clamp(28px, 5vw, 52px) clamp(24px, 4vw, 44px);
          box-shadow: 0 6px 40px rgba(86,51,17,0.09), 0 1px 0 rgba(201,169,110,0.25);
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          border-top: 2px solid var(--color-teal);
        }

        /* ── Avatar row ─────────────────────────────────── */
        .rv-card__avatar-row {
          margin-bottom: 20px;
        }
        .rv-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-teal) 0%, var(--color-espresso) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(201,169,110,0.35);
        }
        .rv-avatar__initials {
          font-family: var(--font-nav);
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          color: #fff;
          text-transform: uppercase;
          line-height: 1;
        }

        /* ── Meta row (badge + stars) ───────────────────── */
        .rv-card__meta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
        }
        .rv-source-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-nav);
          font-size: 0.55rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }
        .rv-source-badge__dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .rv-stars {
          display: flex;
          gap: 5px;
          color: var(--color-teal);
          justify-content: center;
        }

        /* ── Pull-quote ─────────────────────────────────── */
        .rv-card__pull-quote {
          font-family: var(--font-title);
          font-size: clamp(1.45rem, 3.2vw, 2rem);
          font-weight: 400;
          font-style: italic;
          line-height: 1.35;
          color: var(--color-espresso);
          text-align: center;
          quotes: none;
          position: relative;
          margin-bottom: 18px;
          padding: 0 4px;
        }
        .rv-card__opening-mark,
        .rv-card__closing-mark {
          font-family: var(--font-title);
          font-size: 1.6em;
          line-height: 0;
          vertical-align: -0.3em;
          color: var(--color-teal);
          opacity: 0.7;
          font-style: normal;
        }
        .rv-card__opening-mark { margin-right: 3px; }
        .rv-card__closing-mark { margin-left: 3px; }

        /* ── Full testimonial ───────────────────────────── */
        .rv-card__full-text {
          font-family: var(--font-review);
          font-size: clamp(0.92rem, 1.5vw, 1.05rem);
          line-height: 1.75;
          color: var(--color-text-muted);
          text-align: center;
          max-width: 540px;
          margin-bottom: 24px;
        }

        /* ── Footer ─────────────────────────────────────── */
        .rv-card__footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          padding-top: 20px;
          border-top: 1px solid rgba(201,169,110,0.25);
          width: 100%;
        }
        .rv-card__author {
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: 0.88rem;
          color: var(--color-espresso);
          letter-spacing: 0.02em;
        }
        .rv-card__origin {
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }

        /* ── Navigation arrows ──────────────────────────── */
        .rv-arrow-row {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 20px;
        }
        .rv-arrow {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1.5px solid rgba(201,169,110,0.4);
          background: var(--color-bg-primary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-espresso);
          transition: border-color 0.25s ease, background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 2px 10px rgba(86,51,17,0.07);
        }
        .rv-arrow:hover {
          border-color: var(--color-teal);
          background: var(--color-teal);
          color: #fff;
          box-shadow: 0 4px 16px rgba(201,169,110,0.3);
        }

        /* ── Dot indicators ─────────────────────────────── */
        .rv-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 28px;
        }
        .rv-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          border: none;
          background: rgba(86,51,17,0.18);
          cursor: pointer;
          transition: background 0.3s ease, transform 0.3s ease, width 0.3s ease;
          padding: 0;
        }
        .rv-dot--active {
          background: var(--color-teal);
          transform: scale(1.4);
          width: 20px;
          border-radius: 3px;
        }

        /* ── Leave a Review CTA ─────────────────────────── */
        .rv-leave-cta {
          display: flex;
          justify-content: center;
          margin-top: clamp(32px, 5vw, 48px);
        }
        .rv-leave-cta__btn {
          display: inline-flex;
          align-items: center;
          gap: 9px;
        }

        /* ── Responsive ─────────────────────────────────── */
        @media (max-width: 768px) {
          .rv-slide-wrap { min-height: 300px; }
        }
        @media (max-width: 480px) {
          .rv-arrow { width: 40px; height: 40px; }
          .rv-card__pull-quote { font-size: clamp(1.25rem, 5vw, 1.55rem); }
        }
      `}</style>
    </section>
  )
}

