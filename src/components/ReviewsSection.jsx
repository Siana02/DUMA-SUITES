import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const REVIEWS = [
  {
    id: 1,
    rating: 5,
    text: 'Waking up to the sound of the ocean every morning was nothing short of magical. The staff remembered our names from day one — it felt like coming home.',
    author: 'Sarah & James O.',
    origin: 'London, UK',
  },
  {
    id: 2,
    rating: 5,
    text: 'The penthouse suite was beyond anything we had imagined. Watching the sunset from our private terrace with a glass of Kenyan wine — absolutely unforgettable.',
    author: 'Aiko T.',
    origin: 'Tokyo, Japan',
  },
  {
    id: 3,
    rating: 5,
    text: 'From the freshly prepared Swahili breakfast to the evening spa ritual, every touch was thoughtful. Duma Suites has raised the bar for coastal luxury in East Africa.',
    author: 'David M.',
    origin: 'Nairobi, Kenya',
  },
  {
    id: 4,
    rating: 5,
    text: 'The concierge arranged a private snorkelling tour and a sunset dhow cruise — both extraordinary. This is a place that understands what true hospitality means.',
    author: 'Priya & Rajan K.',
    origin: 'Dubai, UAE',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
}

function StarRating({ count }) {
  return (
    <div className="review-card__stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  )
}

export default function ReviewsSection() {
  const { ref: titleRef, inView: titleInView } = useInView({
    threshold: 0.4,
    triggerOnce: true,
  })
  const { ref: gridRef, inView: gridInView } = useInView({
    threshold: 0.05,
    triggerOnce: true,
  })

  return (
    <section className="reviews-section section section--tertiary" id="reviews">
      <div className="container">
        {/* Header */}
        <div
          ref={titleRef}
          className={`reviews-section__header${titleInView ? ' is-visible' : ''}`}
        >
          <span className="eyebrow">Guest Stories</span>
          <h2 className="section-title">Words from Our Guests</h2>
          <div className="divider" />
        </div>

        {/* Cards */}
        <motion.div
          ref={gridRef}
          className="reviews-section__grid"
          variants={containerVariants}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
        >
          {REVIEWS.map((review) => (
            <motion.article
              key={review.id}
              className="review-card"
              variants={cardVariants}
            >
              <StarRating count={review.rating} />
              <blockquote className="review-card__text">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <footer className="review-card__footer">
                <span className="review-card__author">{review.author}</span>
                <span className="review-card__origin">{review.origin}</span>
              </footer>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <style>{`
        .reviews-section__header {
          text-align: center;
          max-width: 600px;
          margin-inline: auto;
          margin-bottom: clamp(40px, 6vw, 80px);
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reviews-section__header.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .reviews-section__header .divider {
          margin-inline: auto;
          margin-top: 1rem;
        }
        .reviews-section__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
          gap: clamp(20px, 3vw, 32px);
        }
        .review-card {
          background-color: var(--color-bg-primary);
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: var(--shadow-soft);
          transition: box-shadow var(--transition-slow), transform var(--transition-slow);
        }
        .review-card:hover {
          box-shadow: var(--shadow-card);
          transform: translateY(-3px);
        }
        .review-card__stars {
          display: flex;
          gap: 3px;
          color: #c9a84c;
        }
        .review-card__text {
          font-family: var(--font-review);
          font-size: clamp(1.05rem, 1.8vw, 1.2rem);
          font-weight: 400;
          line-height: 1.7;
          color: var(--color-espresso);
          flex: 1;
          quotes: none;
        }
        .review-card__footer {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding-top: 16px;
          border-top: 1px solid var(--color-bg-secondary);
        }
        .review-card__author {
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: 0.85rem;
          color: var(--color-espresso);
        }
        .review-card__origin {
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: var(--color-text-muted);
          letter-spacing: 0.04em;
        }
      `}</style>
    </section>
  )
}
