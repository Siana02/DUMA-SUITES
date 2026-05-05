import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import heroImg from '../assets/dolphin-watching-watamu.jpg'

const ACTIVITIES = [
  {
    number: '01',
    title: 'Safari Blue Full-Day Excursion',
    desc: `Safari Blue is Watamu's most iconic full-day marine adventure. Board a traditional wooden dhow and sail to the crystal-clear waters of Mida Creek and beyond. The day includes snorkelling over vibrant reefs, dolphin watching, island stops, fresh seafood cooked on the beach, and a sunset return. For many guests, Safari Blue becomes the highlight of their entire Kenyan coast experience.`,
  },
  {
    number: '02',
    title: 'Watamu Marine Park Snorkelling',
    desc: `One of Kenya's oldest and most protected marine national parks sits right on Watamu's doorstep. The coral gardens here are home to turtles, reef sharks, stingrays, vibrant tropical fish and an incredible diversity of corals. Whether you're a seasoned diver or a first-time snorkeller, the Marine Park offers an accessible and unforgettable underwater world.`,
  },
  {
    number: '03',
    title: 'Gedi Ruins — Ancient Swahili City',
    desc: `Tucked within a dense coastal forest just outside Watamu lies the Gedi Ruins — the haunting remains of a 12th-century Swahili trading town abandoned for reasons still debated by historians. Wander through crumbling mosques, royal palaces and merchant houses as resident colobus monkeys leap overhead. Guided tours bring the site's extraordinary history to vivid life.`,
  },
  {
    number: '04',
    title: 'Elephant Watching at Tsavo',
    desc: `A few hours from Watamu, the vast Tsavo East and West national parks are home to Kenya's largest elephant herds. A full-day safari here offers close encounters with these gentle giants alongside lions, giraffes, buffalo, zebra and the famous "red elephants" of Tsavo — dusty-red from rolling in the iron-rich soil. An unmissable East African wildlife experience.`,
  },
  {
    number: '05',
    title: 'Dolphin Watching at Mida Creek',
    desc: `Mida Creek is a peaceful tidal inlet fringed by ancient mangrove forests, and home to a resident dolphin pod that can often be spotted early in the morning. Join a guided boat trip at dawn as spinner and bottlenose dolphins leap alongside your vessel. The creek itself is also a haven for birdwatchers, with over 100 species recorded including herons, flamingos and fish eagles.`,
  },
]

export default function Article1Page() {
  return (
    <>
      <Helmet>
        <title>Top 5 Activities on the Watamu Coast | Duma Suites Stories</title>
        <meta
          name="description"
          content="From Safari Blue to Gedi Ruins, elephant watching to snorkelling — discover the top 5 extraordinary activities available on the Watamu coast, curated by Duma Suites."
        />
      </Helmet>

      <main style={{ paddingTop: 80 }}>

        {/* Hero */}
        <div className="art1-hero">
          <div className="art1-hero__img-wrap">
            <img src={heroImg} alt="Dolphins at Mida Creek, Watamu" className="art1-hero__img" />
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
              Top 5 Activities on the Watamu Coast
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
          <div className="container" style={{ maxWidth: 760 }}>
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
          </div>
        </section>

        {/* Activity list */}
        <section className="art1-list section section--secondary">
          <div className="container" style={{ maxWidth: 760 }}>
            {ACTIVITIES.map((act, i) => (
              <motion.div
                key={i}
                className="art1-item"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="art1-item__head">
                  <span className="art1-item__number">{act.number}</span>
                  <h2 className="art1-item__title">{act.title}</h2>
                </div>
                <p className="art1-item__desc">{act.desc}</p>
              </motion.div>
            ))}

            <div className="art1-book-cta">
              <Link to="/#contact" className="btn btn-primary art1-book-cta__btn">
                Book an Experience
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
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
        .art1-intro__text {
          font-size: clamp(0.95rem, 1.6vw, 1.1rem);
          color: var(--color-text-muted);
          line-height: 1.8;
          text-align: center;
        }
        .art1-list {
          padding-top: 0;
        }
        .art1-item {
          padding: clamp(28px, 4vw, 44px) 0;
          border-bottom: 1px solid rgba(86,51,17,0.1);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .art1-item:last-of-type {
          border-bottom: none;
        }
        .art1-item__head {
          display: flex;
          align-items: baseline;
          gap: 16px;
        }
        .art1-item__number {
          font-family: var(--font-nav);
          font-size: 0.62rem;
          letter-spacing: 0.18em;
          color: var(--color-teal);
          flex-shrink: 0;
        }
        .art1-item__title {
          font-family: var(--font-title);
          font-size: clamp(1.2rem, 2.2vw, 1.65rem);
          font-weight: 600;
          color: var(--color-espresso);
          line-height: 1.2;
        }
        .art1-item__desc {
          font-size: 0.92rem;
          color: var(--color-text-muted);
          line-height: 1.85;
          padding-left: calc(0.62rem * 2 + 16px + 1ch);
        }
        .art1-book-cta {
          display: flex;
          justify-content: center;
          padding-top: clamp(36px, 5vw, 56px);
        }
        .art1-book-cta__btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
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
      `}</style>
    </>
  )
}
