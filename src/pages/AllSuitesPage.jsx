import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Maximize2, BedDouble, Users } from 'lucide-react'

import outsideView2 from '../assets/outside-view2.jpeg'
import coastalPreview from '../assets/1bedroom-coastal-haven-suite-preview.JPEG'
import serenityPreview from '../assets/serenity-villa-3bedroomsuite-preview.JPEG'

const SUITES = [
  {
    id: 'coastal-haven',
    name: 'Coastal Haven Suite',
    tagline: '1-Bedroom · Intimate Coastal Retreat',
    size: '25 sq m',
    beds: '1 King Bed',
    guests: '2+ Guests',
    href: '/suites/coastal-haven',
    image: coastalPreview,
    description: 'An intimate coastal retreat designed for couples seeking privacy and elegance, just steps from the Indian Ocean.',
  },
  {
    id: 'serenity-villa',
    name: 'Serenity Villa Suite',
    tagline: '3-Bedroom · Luxury Family Retreat',
    size: '75 sq m',
    beds: '3 King Beds',
    guests: '6+ Guests',
    href: '/suites/serenity-villa',
    image: serenityPreview,
    description: 'A sprawling three-bedroom villa with full kitchen, outdoor terrace, and garden views — perfect for families or groups.',
  },
]

function SuiteCard({ suite, index }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })
  const navigate = useNavigate()

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
      className="as-card"
    >
      <div
        className="as-card__img-wrap"
        onClick={() => navigate(suite.href)}
        role="button"
        tabIndex={0}
        aria-label={`View ${suite.name}`}
        onKeyDown={(e) => e.key === 'Enter' && navigate(suite.href)}
      >
        <img src={suite.image} alt={suite.name} className="as-card__img" />
        <div className="as-card__overlay">
          <p className="as-card__tagline">{suite.tagline}</p>
          <h3 className="as-card__name">{suite.name}</h3>
          <div className="as-card__specs">
            <span><Maximize2 size={13} strokeWidth={1.5} />{suite.size}</span>
            <span><BedDouble size={13} strokeWidth={1.5} />{suite.beds}</span>
            <span><Users size={13} strokeWidth={1.5} />{suite.guests}</span>
          </div>
        </div>
      </div>
      <div className="as-card__body">
        <p className="as-card__desc">{suite.description}</p>
        <a href={suite.href} className="btn btn-inverse as-card__btn">
          View Suite
        </a>
      </div>
    </motion.article>
  )
}

export default function AllSuitesPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.2, triggerOnce: true })
  const { ref: introRef, inView: introInView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <>
      <Helmet>
        <title>All Suites | Duma Suites Watamu</title>
        <meta name="description" content="Explore all suites at Duma Suites — the Coastal Haven Suite and Serenity Villa Suite. Two exceptional retreats in Watamu, Kenya." />
      </Helmet>

      <main id="suites-page">
        {/* Hero */}
        <section className="as-hero" ref={heroRef}>
          <img src={outsideView2} alt="Duma Suites exterior" className="as-hero__bg" />
          <div className="as-hero__overlay" />
          <div className="as-hero__content">
            <motion.span
              className="as-hero__eyebrow"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Suites &amp; Villas
            </motion.span>
            <motion.h1
              className="as-hero__title"
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.22 }}
            >
              Stay Your Way
            </motion.h1>
            <motion.p
              className="as-hero__subtitle"
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.36 }}
            >
              Two exceptional retreats, one extraordinary destination.
            </motion.p>
          </div>
        </section>

        {/* Intro */}
        <section className="as-intro section" ref={introRef}>
          <div className="container">
            <motion.p
              className="as-intro__text"
              initial={{ opacity: 0, y: 24 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Whether you're seeking an intimate coastal escape or a sprawling villa for a family retreat,
              The Duma Suites offers two distinctly curated living spaces — each designed to bring the very
              best of Watamu's coastline into your daily rhythm.
            </motion.p>
          </div>
        </section>

        {/* Suites showcase */}
        <section className="as-showcase section section--secondary">
          <div className="container">
            <div className="as-showcase__grid">
              {SUITES.map((suite, i) => (
                <SuiteCard key={suite.id} suite={suite} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <style>{`
        /* ── Hero ── */
        .as-hero {
          position: relative;
          height: 100vh;
          min-height: 560px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .as-hero__bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .as-hero__overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
        }
        .as-hero__content {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 0 var(--section-px);
        }
        .as-hero__eyebrow {
          display: block;
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: clamp(0.7rem, 1.2vw, 0.9rem);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-teal);
          margin-bottom: 1rem;
        }
        .as-hero__title {
          font-family: var(--font-title);
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 400;
          color: #fff;
          line-height: 1.05;
          margin: 0 0 1.25rem;
        }
        .as-hero__subtitle {
          font-family: var(--font-body);
          font-size: clamp(0.95rem, 1.8vw, 1.2rem);
          color: rgba(255,255,255,0.82);
          max-width: 480px;
          margin-inline: auto;
          line-height: 1.65;
        }

        /* ── Intro ── */
        .as-intro {
          background-color: var(--color-bg-primary);
        }
        .as-intro__text {
          font-family: var(--font-body);
          font-size: clamp(1rem, 1.6vw, 1.15rem);
          color: var(--color-text-muted);
          line-height: 1.8;
          max-width: 600px;
          margin-inline: auto;
          text-align: center;
        }

        /* ── Showcase ── */
        .as-showcase__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(32px, 5vw, 56px);
          max-width: 800px;
          margin-inline: auto;
        }

        /* ── Suite card ── */
        .as-card__img-wrap {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        .as-card__img {
          width: 100%;
          height: 420px;
          object-fit: cover;
          display: block;
          transition: transform 600ms ease;
        }
        .as-card__img-wrap:hover .as-card__img {
          transform: scale(1.04);
        }
        .as-card__overlay {
          position: absolute;
          bottom: 24px;
          left: 24px;
          background-color: rgba(247, 241, 229, 0.96);
          padding: 14px 18px;
        }
        .as-card__tagline {
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-teal);
          margin: 0 0 5px;
        }
        .as-card__name {
          font-family: var(--font-title);
          font-size: clamp(1.3rem, 2.5vw, 1.9rem);
          font-weight: 600;
          color: var(--color-espresso);
          margin: 0 0 8px;
          line-height: 1.15;
        }
        .as-card__specs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 16px;
        }
        .as-card__specs span {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }
        .as-card__specs svg {
          color: var(--color-teal);
          flex-shrink: 0;
        }
        .as-card__body {
          padding: 20px 0 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .as-card__desc {
          font-family: var(--font-body);
          font-size: 0.92rem;
          color: var(--color-text-muted);
          line-height: 1.65;
          flex: 1;
          min-width: 200px;
        }
        .as-card__btn {
          flex-shrink: 0;
        }

        @media (max-width: 639px) {
          .as-card__img { height: 300px; }
          .as-card__overlay { bottom: 12px; left: 12px; right: 12px; }
          .as-card__body { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </>
  )
}
