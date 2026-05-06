import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import {
  Waves,
  UtensilsCrossed,
  Dumbbell,
  Car,
  Wifi,
  Wind,
  Sunset,
  Star,
} from 'lucide-react'

const AMENITIES = [
  {
    icon: Waves,
    title: 'Infinity Pool',
    desc: 'A stunning oceanfront pool that merges with the horizon',
  },
  {
    icon: UtensilsCrossed,
    title: 'Fine Dining',
    desc: 'Contemporary Swahili cuisine crafted by our executive chef',
  },
  {
    icon: Dumbbell,
    title: 'Wellness Centre',
    desc: 'Spa treatments, yoga sessions and a fully equipped gym',
  },
  {
    icon: Car,
    title: 'Chauffeur Service',
    desc: 'Private transfers and curated excursions on request',
  },
  {
    icon: Wifi,
    title: 'High-Speed Wi-Fi',
    desc: 'Seamlessly connected throughout your entire stay',
  },
  {
    icon: Wind,
    title: 'Sea Breezes',
    desc: 'Natural cross-ventilation in every suite — fresh air, always',
  },
  {
    icon: Sunset,
    title: 'Sunset Terrace',
    desc: 'A rooftop retreat with panoramic Indian Ocean sunsets',
  },
  {
    icon: Star,
    title: 'Concierge 24/7',
    desc: 'Dedicated personal concierge available around the clock',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
}

export default function AmenitiesSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const { ref: titleRef, inView: titleInView } = useInView({
    threshold: 0.4,
    triggerOnce: true,
  })

  return (
    <section className="amenities-section section section--secondary" id="amenities">
      <div className="container">
        {/* Header */}
        <div
          ref={titleRef}
          className={`amenities-section__header${titleInView ? ' is-visible' : ''}`}
        >
          <span className="eyebrow">Experiences</span>
          <h2 className="section-title">Resort Amenities</h2>
          <div className="divider" />
          <p className="section-subtitle">
            From morning yoga on the terrace to starlit dinners by the ocean —
            every desire anticipated, every comfort provided.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          ref={ref}
          className="amenities-section__grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {AMENITIES.map((amenity) => {
            const Icon = amenity.icon
            return (
              <motion.div
                key={amenity.title}
                className="amenity-item"
                variants={itemVariants}
              >
                <div className="amenity-item__icon-wrap">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="amenity-item__title">{amenity.title}</h3>
                <p className="amenity-item__desc">{amenity.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <style>{`
        .amenities-section__header {
          text-align: center;
          max-width: 600px;
          margin-inline: auto;
          margin-bottom: clamp(40px, 6vw, 80px);
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .amenities-section__header.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .amenities-section__header .divider {
          margin-inline: auto;
          margin-block: 1rem;
        }
        .amenities-section__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(220px, 100%), 1fr));
          gap: clamp(20px, 3vw, 32px);
        }
        .amenity-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          padding: 32px;
          background-color: var(--color-bg-primary);
          transition: box-shadow var(--transition-slow), transform var(--transition-slow);
        }
        .amenity-item:hover {
          box-shadow: var(--shadow-card);
          transform: translateY(-5px) scale(1.01);
        }
        .amenity-item__icon-wrap {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(201, 169, 110, 0.12);
          color: var(--color-teal);
          transition: background-color var(--transition-base), transform var(--transition-base);
        }
        .amenity-item:hover .amenity-item__icon-wrap {
          background-color: var(--color-teal);
          color: var(--color-text-light);
          transform: scale(1.08);
        }
        .amenity-item__title {
          font-family: var(--font-title);
          font-size: 1.2rem;
          font-weight: 500;
          color: var(--color-espresso);
          margin: 0;
        }
        .amenity-item__desc {
          font-family: var(--font-body);
          font-size: 0.85rem;
          color: var(--color-text-muted);
          line-height: 1.65;
        }
      `}</style>
    </section>
  )
}
