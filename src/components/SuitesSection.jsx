import { useInView } from 'react-intersection-observer'
import { useSpring, animated } from '@react-spring/web'
import { BedDouble, Maximize2, Eye, Waves } from 'lucide-react'

const SUITES = [
  {
    id: 'ocean-suite',
    eyebrow: 'Signature',
    name: 'Ocean Suite',
    tagline: 'Unobstructed sea views from your private terrace',
    beds: '1 King Bed',
    size: '65 m²',
    view: 'Ocean View',
    feature: 'Private Terrace',
    gradient: 'linear-gradient(160deg, #1e4d5e 0%, #2a7a8c 50%, #58b0c4 100%)',
  },
  {
    id: 'garden-suite',
    eyebrow: 'Garden',
    name: 'Garden Suite',
    tagline: 'Lush tropical gardens and serene coastal breezes',
    beds: '1 Queen Bed',
    size: '52 m²',
    view: 'Garden View',
    feature: 'Outdoor Shower',
    gradient: 'linear-gradient(160deg, #2d4a2a 0%, #3d6e3a 50%, #5a9e54 100%)',
  },
  {
    id: 'penthouse',
    eyebrow: 'Premium',
    name: 'Penthouse Suite',
    tagline: 'The pinnacle of coastal luxury — an entire floor, yours',
    beds: '2 King Beds',
    size: '140 m²',
    view: 'Panoramic 360°',
    feature: 'Private Pool',
    gradient: 'linear-gradient(160deg, #3a2010 0%, #563311 50%, #7a4b28 100%)',
  },
  {
    id: 'family-suite',
    eyebrow: 'Family',
    name: 'Family Suite',
    tagline: 'Spacious elegance for those who travel together',
    beds: '2 Queen Beds',
    size: '90 m²',
    view: 'Ocean & Pool',
    feature: 'Living Area',
    gradient: 'linear-gradient(160deg, #1a3a4a 0%, #2a5a6a 50%, #3d8fa0 100%)',
  },
]

function SuiteCard({ suite, index }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  const spring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(48px)',
    delay: index * 120,
    config: { tension: 80, friction: 20 },
  })

  return (
    <animated.article ref={ref} style={spring} className="suite-card card">
      {/* Image placeholder */}
      <div
        className="suite-card__image"
        style={{ background: suite.gradient }}
        aria-hidden="true"
      >
        <span className="suite-card__eyebrow eyebrow">{suite.eyebrow}</span>
      </div>

      {/* Content */}
      <div className="suite-card__body">
        <h3 className="suite-card__name">{suite.name}</h3>
        <p className="suite-card__tagline">{suite.tagline}</p>

        <ul className="suite-card__specs">
          <li>
            <BedDouble size={14} strokeWidth={1.5} />
            {suite.beds}
          </li>
          <li>
            <Maximize2 size={14} strokeWidth={1.5} />
            {suite.size}
          </li>
          <li>
            <Eye size={14} strokeWidth={1.5} />
            {suite.view}
          </li>
          <li>
            <Waves size={14} strokeWidth={1.5} />
            {suite.feature}
          </li>
        </ul>

        <div className="suite-card__footer">
          <a href="#booking" className="btn btn-inverse suite-card__btn">
            Enquire
          </a>
          <a href={`#${suite.id}`} className="suite-card__details-link">
            View Details →
          </a>
        </div>
      </div>
    </animated.article>
  )
}

export default function SuitesSection() {
  const { ref: titleRef, inView: titleInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <section className="suites-section section" id="suites">
      <div className="container">
        {/* Section header */}
        <div
          ref={titleRef}
          className={`suites-section__header${titleInView ? ' is-visible' : ''}`}
        >
          <span className="eyebrow">Accommodation</span>
          <h2 className="section-title">Our Suites</h2>
          <div className="divider" />
          <p className="section-subtitle">
            Each suite is a private sanctuary — crafted with intention,
            furnished with care, and positioned to connect you with the beauty
            of Watamu's coastline.
          </p>
        </div>

        {/* Suite grid */}
        <div className="suites-section__grid">
          {SUITES.map((suite, i) => (
            <SuiteCard key={suite.id} suite={suite} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .suites-section__header {
          text-align: center;
          max-width: 600px;
          margin-inline: auto;
          margin-bottom: clamp(40px, 6vw, 80px);
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .suites-section__header.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .suites-section__header .divider {
          margin-inline: auto;
          margin-block: 1rem;
        }
        .suites-section__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
          gap: clamp(20px, 3vw, 32px);
        }
        .suite-card {
          display: flex;
          flex-direction: column;
        }
        .suite-card__image {
          position: relative;
          height: 220px;
          display: flex;
          align-items: flex-start;
          padding: 20px;
        }
        .suite-card__eyebrow {
          background: rgba(0, 0, 0, 0.3);
          color: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          padding: 4px 12px;
          border-radius: 2px;
          font-size: 0.65rem;
        }
        .suite-card__body {
          padding: 28px;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 10px;
        }
        .suite-card__name {
          font-family: var(--font-title);
          font-size: 1.5rem;
          font-weight: 400;
          color: var(--color-espresso);
          margin: 0;
        }
        .suite-card__tagline {
          font-family: var(--font-body);
          font-size: 0.88rem;
          color: var(--color-text-muted);
          line-height: 1.6;
          flex: 1;
        }
        .suite-card__specs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 12px;
          margin-top: 4px;
        }
        .suite-card__specs li {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-body);
          font-size: 0.78rem;
          color: var(--color-text-muted);
        }
        .suite-card__specs li svg {
          color: var(--color-teal);
          flex-shrink: 0;
        }
        .suite-card__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--color-bg-secondary);
        }
        .suite-card__btn {
          font-size: 0.65rem;
          padding: 10px 22px;
        }
        .suite-card__details-link {
          font-family: var(--font-nav);
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-espresso);
        }
        .suite-card__details-link:hover {
          color: var(--color-teal);
        }
      `}</style>
    </section>
  )
}
