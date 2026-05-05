import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import heroImg      from '../assets/dolphin-watching-watamu.jpg'
import cheetahIcon  from '../assets/cheetah.png'
import gediImg      from '../assets/gedi-ruins-excursion.JPEG'
import elephantImg  from '../assets/elephant-watching.JPEG'
import swahiliImg   from '../assets/coastal-swahili-dishes.webp'

const ACTIVITIES = [
  {
    number: '01',
    title: 'Safari Blue — Full-Day Excursion',
    pullQuote: "Spinner dolphins leap alongside the dhow as Watamu's legendary full-day marine adventure unfolds before you.",
    tags: ['Couples', 'Families', 'Adventurers'],
    image: heroImg,
    imageAlt: 'Dolphin watching on Safari Blue, Watamu coast',
    desc: `Safari Blue is Watamu's most iconic full-day marine adventure. Board a traditional wooden dhow and sail the crystal-clear waters off the Watamu and Mida Creek coast. The day begins with dolphin watching as spinner dolphins frequently leap alongside the dhow, followed by snorkelling over vibrant coral reefs at Watamu Marine Park. The highlight is a mid-day stop at Sudi Island for a fresh BBQ seafood feast on the beach — lobster, calamari, octopus and prawns grilled over charcoal. The full-day trip returns at sunset, leaving guests with one of the most complete and memorable days on the Kenyan coast.`,
  },
  {
    number: '02',
    title: 'Safari Blue — Half-Day Option',
    pullQuote: 'A condensed introduction to the magic of the Watamu coastline — dolphin watching and coral reefs await.',
    tags: ['Couples', 'Short stays'],
    image: null,
    imageAlt: '',
    desc: `For guests with limited time, the Safari Blue half-day excursion offers the core marine experience without the Sudi Island seafood stop. You'll enjoy dolphin watching and snorkelling over Watamu's coral gardens aboard a traditional dhow, returning in the early afternoon. A wonderful condensed introduction to the magic of the Watamu coastline.`,
  },
  {
    number: '03',
    title: 'Watamu Marine Park Snorkelling',
    pullQuote: 'Turtles, reef sharks and a kaleidoscope of tropical fish — an accessible and unforgettable underwater world.',
    tags: ['Families', 'Snorkellers', 'First-timers'],
    image: null,
    imageAlt: '',
    desc: `One of Kenya's oldest and most protected marine national parks sits right on Watamu's doorstep. The coral gardens here are home to turtles, reef sharks, stingrays, vibrant tropical fish and an incredible diversity of corals. Whether you're a seasoned diver or a first-time snorkeller, the Marine Park offers an accessible and unforgettable underwater world.`,
  },
  {
    number: '04',
    title: 'Gedi Ruins — Ancient Swahili City',
    pullQuote: 'The haunting remains of a 12th-century Swahili trading town, still debated by historians — and still spellbinding.',
    tags: ['History lovers', 'Nature fans', 'Couples'],
    image: gediImg,
    imageAlt: 'Gedi Ruins ancient Swahili city near Watamu',
    desc: `Tucked within a dense coastal forest just outside Watamu lies the Gedi Ruins — the haunting remains of a 12th-century Swahili trading town abandoned for reasons still debated by historians. Wander through crumbling mosques, royal palaces and merchant houses as resident colobus monkeys leap overhead. Guided tours bring the site's extraordinary history to vivid life.`,
  },
  {
    number: '05',
    title: 'Elephant Watching at Tsavo',
    pullQuote: "Kenya's largest elephant herds roam here — the famous red elephants of Tsavo, dusty with iron-rich soil.",
    tags: ['Wildlife enthusiasts', 'Day-trippers', 'Families'],
    image: elephantImg,
    imageAlt: 'Elephants at Tsavo National Park near Watamu',
    desc: `A few hours from Watamu, the vast Tsavo East and West national parks are home to Kenya's largest elephant herds. A full-day safari here offers close encounters with these gentle giants alongside lions, giraffes, buffalo, zebra and the famous "red elephants" of Tsavo — dusty-red from rolling in the iron-rich soil. An unmissable East African wildlife experience.`,
  },
  {
    number: '06',
    title: 'Mida Creek Mangrove Boardwalk',
    pullQuote: "A birdwatcher's paradise — over 100 species recorded in the ancient mangrove forests of Mida Creek.",
    tags: ['Nature lovers', 'Birdwatchers', 'Couples'],
    image: null,
    imageAlt: '',
    desc: `Mida Creek is a protected tidal inlet fringed by ancient mangrove forests. The elevated boardwalk offers a tranquil walk through the ecosystem at low tide, with sweeping views across the creek and the Indian Ocean beyond. The creek is a birdwatcher's paradise — over 100 species have been recorded here, including herons, flamingos, fish eagles and kingfishers. A serene and restorative experience away from the beach.`,
  },
]

function CheetahDivider() {
  return (
    <div className="art1-divider" aria-hidden="true">
      <span className="art1-divider__line" />
      <img src={cheetahIcon} alt="" className="art1-divider__icon" />
      <span className="art1-divider__line" />
    </div>
  )
}

export default function Article1Page() {
  return (
    <>
      <Helmet>
        <title>Top 5 Activities on the Watamu Coast | Duma Suites Stories</title>
        <meta
          name="description"
          content="From Safari Blue full-day and half-day to Gedi Ruins, elephant watching and the Mida Creek boardwalk — discover the top activities on the Watamu coast, curated by Duma Suites."
        />
      </Helmet>

      <main style={{ paddingTop: 80 }}>

        {/* Hero */}
        <div className="art1-hero">
          <div className="art1-hero__img-wrap">
            <img src={heroImg} alt="Dolphin watching on Safari Blue, Watamu coast" className="art1-hero__img" />
            <div className="art1-hero__overlay" aria-hidden="true" />
          </div>
          <div className="art1-hero__content">
            <motion.span
              className="eyebrow art1-hero__eyebrow"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Travel Guide
            </motion.span>
            <motion.h1
              className="art1-hero__title"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.22 }}
            >
              Top Activities on the Watamu Coast
            </motion.h1>
            <motion.p
              className="art1-hero__sub"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.36 }}
            >
              Extraordinary experiences curated for Duma Suites guests
            </motion.p>
          </div>
        </div>

        {/* Intro */}
        <section className="art1-intro section">
          <div className="container art1-intro__inner">
            <motion.p
              className="art1-intro__text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              Watamu is one of East Africa's most captivating coastal destinations — and the activities
              available here go far beyond simply relaxing on its legendary white-sand beaches. From
              ancient ruins hidden within a sacred forest to legendary full-day marine adventures,
              every experience here leaves a lasting impression.
            </motion.p>
            <motion.div
              className="art1-concierge-note"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: 0.15 }}
            >
              <span className="art1-concierge-note__label">From Our Concierge</span>
              <p className="art1-concierge-note__text">
                Our team personally curates and arranges every excursion below for guests staying at Duma Suites.
                Speak to us at check-in and we'll tailor the perfect itinerary for your stay.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Activity cards */}
        <section className="art1-list section section--secondary">
          <div className="container art1-list__inner">
            {ACTIVITIES.map((act, i) => (
              <motion.div
                key={i}
                className={`art1-card${act.image ? (i % 2 === 1 ? ' art1-card--reverse' : '') : ' art1-card--text-only'}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.65, delay: i * 0.06, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Image side — only rendered when an image is provided */}
                {act.image && (
                  <div className="art1-card__img-wrap">
                    <img
                      src={act.image}
                      alt={act.imageAlt}
                      className="art1-card__img"
                      loading="lazy"
                    />
                    <span className="art1-card__number">{act.number}</span>
                  </div>
                )}

                {/* Content side */}
                <div className="art1-card__body">
                  {/* Show number inline for text-only cards */}
                  {!act.image && (
                    <span className="art1-card__number art1-card__number--inline">{act.number}</span>
                  )}
                  <h2 className="art1-card__title">{act.title}</h2>
                  <p className="art1-card__pull">&ldquo;{act.pullQuote}&rdquo;</p>
                  <p className="art1-card__desc">{act.desc}</p>
                  <div className="art1-card__tags">
                    <span className="art1-card__tags-label">Perfect for</span>
                    {act.tags.map((tag) => (
                      <span key={tag} className="art1-card__tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Divider before CTA */}
            <CheetahDivider />

            <div className="art1-book-cta">
              <p className="art1-book-cta__sub">
                Our concierge can arrange any of these experiences directly from Duma Suites.
              </p>
              <Link to="/#contact" className="btn btn-primary art1-book-cta__btn">
                Book an Experience
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* Next article teaser */}
        <section className="art1-next-article section">
          <div className="container">
            <CheetahDivider />
            <motion.div
              className="art1-next-wrap"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65 }}
            >
              <Link to="/blog/coastal-swahili-dishes" className="art1-next-card">
                <div className="art1-next-card__img-wrap">
                  <img src={swahiliImg} alt="Coastal Swahili dishes" className="art1-next-card__img" loading="lazy" />
                  <div className="art1-next-card__overlay" aria-hidden="true" />
                  <span className="art1-next-card__category">Food &amp; Culture</span>
                </div>
                <div className="art1-next-card__body">
                  <span className="art1-next-card__eyebrow">Read Next</span>
                  <h3 className="art1-next-card__title">Coastal Swahili Dishes You Absolutely Need to Try</h3>
                  <p className="art1-next-card__excerpt">
                    Discover the extraordinary culinary traditions of the Kenyan Swahili coast — from fragrant pilau and coconut fish curry to the legendary Safari Blue seafood feast.
                  </p>
                  <span className="art1-next-card__cta">
                    Read the Guide <ArrowRight size={13} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Navigation */}
        <section className="art1-nav section">
          <div className="container art1-nav__inner">
            <Link to="/blog" className="art1-nav__back">
              <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
              Back to Stories &amp; Guides
            </Link>
            <Link to="/blog/coastal-swahili-dishes" className="art1-nav__next">
              Next: Coastal Swahili Dishes
              <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </section>

      </main>

      <style>{`
        /* ── Hero ── */
        .art1-hero {
          position: relative;
          width: 100%;
          height: clamp(360px, 50vw, 580px);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .art1-hero__img-wrap {
          position: absolute;
          inset: 0;
        }
        .art1-hero__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 55%;
        }
        .art1-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(10,6,2,0.28) 0%, rgba(10,6,2,0.65) 100%);
        }
        .art1-hero__content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 0 clamp(16px, 5vw, 48px);
          max-width: 800px;
        }
        .art1-hero__eyebrow {
          display: block;
          color: rgba(255,255,255,0.8);
          letter-spacing: 0.22em;
          margin-bottom: 14px;
        }
        .art1-hero__title {
          font-family: var(--font-title);
          font-size: clamp(1.8rem, 4.5vw, 3.4rem);
          font-weight: 300;
          letter-spacing: 0.03em;
          color: #fff;
          line-height: 1.15;
          margin: 0 0 16px;
        }
        .art1-hero__sub {
          font-family: var(--font-body);
          font-size: clamp(0.88rem, 1.5vw, 1rem);
          color: rgba(255,255,255,0.78);
          line-height: 1.65;
        }

        /* ── Intro ── */
        .art1-intro__inner {
          max-width: 860px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(24px, 3vw, 36px);
        }
        .art1-intro__text {
          font-size: clamp(0.95rem, 1.6vw, 1.1rem);
          color: var(--color-text-muted);
          line-height: 1.8;
          text-align: center;
          max-width: 680px;
        }
        .art1-concierge-note {
          background: rgba(88,176,196,0.08);
          border-left: 3px solid var(--color-teal);
          border-radius: 0 4px 4px 0;
          padding: clamp(14px, 2vw, 22px) clamp(16px, 2.5vw, 28px);
          width: 100%;
        }
        .art1-concierge-note__label {
          display: block;
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-teal);
          margin-bottom: 8px;
        }
        .art1-concierge-note__text {
          font-size: 0.88rem;
          color: var(--color-text-muted);
          line-height: 1.75;
        }

        /* ── Cheetah divider ── */
        .art1-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin: clamp(24px, 4vw, 44px) auto;
          max-width: 220px;
          width: 100%;
        }
        .art1-divider__line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--color-teal), transparent);
          opacity: 0.55;
        }
        .art1-divider__icon {
          width: 26px;
          height: 26px;
          object-fit: contain;
          opacity: 0.7;
        }

        /* ── Activity cards ── */
        .art1-list__inner {
          max-width: 1040px;
        }
        .art1-card {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(16px, 3vw, 32px);
          padding: clamp(28px, 4vw, 48px) 0;
          border-bottom: 1px solid rgba(86,51,17,0.08);
        }
        .art1-card--text-only {
          grid-template-columns: 1fr;
        }
        .art1-card:last-of-type {
          border-bottom: none;
        }
        .art1-card__img-wrap {
          position: relative;
          border-radius: 4px;
          overflow: hidden;
          aspect-ratio: 16 / 9;
        }
        .art1-card__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.55s ease;
        }
        .art1-card:hover .art1-card__img {
          transform: scale(1.04);
        }
        .art1-card__number {
          position: absolute;
          bottom: 12px;
          left: 14px;
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #fff;
          background: var(--color-teal);
          padding: 4px 12px;
          border-radius: 100px;
        }
        .art1-card__number--inline {
          position: static;
          color: var(--color-teal);
          background: none;
          padding: 0;
          align-self: flex-start;
        }
        .art1-card__body {
          display: flex;
          flex-direction: column;
          gap: 14px;
          justify-content: center;
        }
        .art1-card__title {
          font-family: var(--font-title);
          font-size: clamp(1.25rem, 2.4vw, 1.75rem);
          font-weight: 600;
          color: var(--color-espresso);
          line-height: 1.2;
        }
        .art1-card__pull {
          font-family: var(--font-title);
          font-size: clamp(1rem, 1.8vw, 1.2rem);
          font-style: italic;
          font-weight: 300;
          color: var(--color-teal);
          line-height: 1.6;
          border-left: 2px solid var(--color-teal);
          padding-left: clamp(12px, 1.5vw, 18px);
          margin-left: -1px;
        }
        .art1-card__desc {
          font-size: 0.92rem;
          color: var(--color-text-muted);
          line-height: 1.85;
        }
        .art1-card__tags {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          margin-top: 4px;
        }
        .art1-card__tags-label {
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-espresso);
          opacity: 0.55;
        }
        .art1-card__tag {
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-espresso);
          border: 1px solid rgba(86,51,17,0.25);
          padding: 3px 10px;
          border-radius: 100px;
        }

        /* ── Book CTA ── */
        .art1-book-cta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: clamp(20px, 3vw, 32px) 0 clamp(8px, 2vw, 16px);
          text-align: center;
        }
        .art1-book-cta__sub {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          line-height: 1.7;
          max-width: 500px;
        }
        .art1-book-cta__btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        /* ── Next article teaser ── */
        .art1-next-wrap {
          max-width: 680px;
          margin-inline: auto;
        }
        .art1-next-card {
          display: grid;
          grid-template-columns: 1fr;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 4px 28px rgba(86,51,17,0.1);
          text-decoration: none;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .art1-next-card:hover {
          box-shadow: 0 8px 40px rgba(88,176,196,0.2);
          transform: translateY(-3px);
        }
        .art1-next-card__img-wrap {
          position: relative;
          aspect-ratio: 16 / 7;
          overflow: hidden;
        }
        .art1-next-card__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.55s ease;
        }
        .art1-next-card:hover .art1-next-card__img {
          transform: scale(1.04);
        }
        .art1-next-card__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.5));
        }
        .art1-next-card__category {
          position: absolute;
          top: 12px;
          left: 12px;
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #fff;
          background: var(--color-teal);
          padding: 4px 12px;
          border-radius: 100px;
        }
        .art1-next-card__body {
          background: var(--color-bg-primary);
          padding: clamp(16px, 2.5vw, 28px);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .art1-next-card__eyebrow {
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-teal);
        }
        .art1-next-card__title {
          font-family: var(--font-title);
          font-size: clamp(1.1rem, 2vw, 1.45rem);
          font-weight: 600;
          color: var(--color-espresso);
          line-height: 1.25;
        }
        .art1-next-card__excerpt {
          font-size: 0.87rem;
          color: var(--color-text-muted);
          line-height: 1.75;
        }
        .art1-next-card__cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-nav);
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-teal);
          margin-top: 4px;
        }

        /* ── Navigation bar ── */
        .art1-nav__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .art1-nav__back,
        .art1-nav__next {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-nav);
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-espresso);
          text-decoration: none;
          transition: color 0.25s ease;
        }
        .art1-nav__back:hover,
        .art1-nav__next:hover {
          color: var(--color-teal);
        }

        /* ── Desktop: horizontal activity cards ── */
        @media (min-width: 768px) {
          .art1-card:not(.art1-card--text-only) {
            grid-template-columns: 1fr 1fr;
            align-items: center;
          }
          .art1-card--reverse .art1-card__img-wrap {
            order: 2;
          }
          .art1-card--reverse .art1-card__body {
            order: 1;
          }
          .art1-card__img-wrap {
            aspect-ratio: 4 / 3;
          }
          .art1-next-card {
            grid-template-columns: 280px 1fr;
          }
          .art1-next-card__img-wrap {
            aspect-ratio: auto;
          }
        }
      `}</style>
    </>
  )
}
