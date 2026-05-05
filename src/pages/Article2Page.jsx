import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import heroImg    from '../assets/swahili-elegance.JPEG'
import dhowImg    from '../assets/sunset-dhow-cruise.JPEG'
import beachImg   from '../assets/watamu-island.JPEG'
import poolImg    from '../assets/drinks-infinitypoolview.jpg'
import galleryImg from '../assets/gallery-image2.jpg'
import seaImg     from '../assets/coastal-haven-suite-nighttime-poolview.JPEG'

const DISHES = [
  {
    number: '01',
    title: 'Pilau',
    image: heroImg,
    desc: `Pilau is the soul of Swahili cuisine — fragrant basmati rice slow-cooked with a rich blend of whole spices including cardamom, cinnamon, cloves, cumin and black pepper. Often prepared with tender beef or chicken that has been marinated overnight, the result is an aromatic, deeply savoury rice dish that has been perfected on the Kenyan coast for centuries. No coastal celebration is complete without it.`,
  },
  {
    number: '02',
    title: 'Mchuzi wa Samaki',
    image: dhowImg,
    desc: `Coastal Kenya's quintessential fish curry — mchuzi wa samaki is made with whatever the fishermen bring in that morning. Fresh snapper, kingfish or barracuda is simmered in a base of tomatoes, onions, garlic, ginger, turmeric and the essential ingredient: coconut milk. The result is a silky, golden curry with a gentle heat that is best enjoyed with white rice or fresh chapati, and ideally eaten with a view of the Indian Ocean.`,
  },
  {
    number: '03',
    title: 'Safari Blue Seafood Feast',
    image: beachImg,
    desc: `If you join the legendary Safari Blue excursion, you will experience one of the Kenyan coast's most celebrated dining traditions — a fresh seafood feast cooked on a sandbank island. Lobster, calamari, octopus, prawns, crab and fresh fish are grilled over charcoal or cooked in coconut broth, accompanied by Swahili sides and cold drinks. Eating with your hands in the Indian Ocean breeze makes this a meal you will never forget.`,
  },
  {
    number: '04',
    title: 'Coconut Rice (Wali wa Nazi)',
    image: poolImg,
    desc: `Wali wa nazi — rice cooked in fresh coconut milk — is the everyday companion to almost every Swahili coastal dish. The coconut milk is squeezed fresh from grated coconut flesh, giving the rice a subtle sweetness, creaminess and a perfume unlike anything you can achieve with ordinary water-cooked rice. Paired with grilled fish, a vegetable curry or simply with a spoonful of mango achaar, it is comfort food at its most elegant.`,
  },
  {
    number: '05',
    title: 'Biryani',
    image: galleryImg,
    desc: `The Swahili coast biryani is distinct from its South Asian cousins — richer in spice, more intensely fragrant, with layers of saffron-coloured rice interlaced with slow-cooked spiced meat (usually goat or chicken), fried onions, raisins and a drizzle of ghee. Served on festive occasions and at weddings, a good coastal biryani is the benchmark by which local cooks measure their mastery.`,
  },
  {
    number: '06',
    title: 'Grilled Octopus (Pweza)',
    image: seaImg,
    desc: `Along Watamu's shores, fishermen haul in octopus on their daily runs. Tenderised by hand on the rocks at low tide, the octopus is then marinated in lime, garlic, chilli, coconut milk and spices before being grilled directly on charcoal. The outside chars beautifully while the inside stays tender and juicy. Served with a squeeze of fresh lime and a simple tomato salsa, pweza wa kukaanga is a dish you will seek out at every opportunity.`,
  },
]

export default function Article2Page() {
  return (
    <>
      <Helmet>
        <title>Coastal Swahili Dishes You Absolutely Need to Try | Duma Suites Stories</title>
        <meta
          name="description"
          content="Discover the extraordinary culinary traditions of the Kenyan Swahili coast — from fragrant pilau and coconut fish curry to the legendary Safari Blue seafood feast."
        />
      </Helmet>

      <main style={{ paddingTop: 80 }}>

        {/* Hero */}
        <div className="art2-hero">
          <div className="art2-hero__img-wrap">
            <img src={heroImg} alt="Swahili coastal dining" className="art2-hero__img" />
            <div className="art2-hero__overlay" aria-hidden="true" />
          </div>
          <div className="art2-hero__content">
            <motion.span
              className="eyebrow art2-hero__eyebrow"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Food & Culture
            </motion.span>
            <motion.h1
              className="art2-hero__title"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.22 }}
            >
              Coastal Swahili Dishes You Absolutely Need to Try
            </motion.h1>
            <motion.p
              className="art2-hero__sub"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.36 }}
            >
              A culinary journey along the Kenyan coast — curated by Duma Suites
            </motion.p>
          </div>
        </div>

        {/* Intro */}
        <section className="art2-intro section">
          <div className="container" style={{ maxWidth: 760 }}>
            <motion.p
              className="art2-intro__text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              The Kenyan coast carries within it one of the world's most distinctive culinary traditions.
              Born from centuries of Indian Ocean trade, the Swahili kitchen blends Arab spice routes,
              Indian aromatics, Persian rice techniques and African coastal ingredients into a cuisine
              that is at once deeply rooted and endlessly surprising. Here are six dishes you must seek
              out during your stay in Watamu.
            </motion.p>
          </div>
        </section>

        {/* Dish cards */}
        <section className="art2-list section section--secondary">
          <div className="container">
            {DISHES.map((dish, i) => (
              <motion.div
                key={i}
                className={`art2-card${i % 2 === 1 ? ' art2-card--reverse' : ''}`}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, delay: 0.05, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="art2-card__img-side">
                  <img src={dish.image} alt={dish.title} className="art2-card__img" loading="lazy" />
                  <span className="art2-card__number">{dish.number}</span>
                </div>
                <div className="art2-card__text-side">
                  <h2 className="art2-card__title">{dish.title}</h2>
                  <p className="art2-card__desc">{dish.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Closing note */}
        <section className="art2-closing section">
          <div className="container" style={{ maxWidth: 720 }}>
            <motion.div
              className="art2-closing__inner"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="art2-closing__title">Taste the Coast</h3>
              <p className="art2-closing__text">
                Our concierge team can recommend the best local restaurants in Watamu and arrange
                transport to the most authentic spots. For the full Safari Blue experience and its
                unforgettable seafood feast, speak to us when you book your stay.
              </p>
              <a
                href="/#contact"
                className="art2-closing__cta btn btn-primary"
              >
                Plan Your Stay
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Navigation */}
        <section className="art2-nav section">
          <div className="container art2-nav__inner">
            <Link to="/blog/top-5-activities-watamu" className="art2-nav__back">
              <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
              Previous: Top 5 Activities
            </Link>
            <Link to="/blog" className="art2-nav__next">
              All Stories & Guides
              <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </section>

      </main>

      <style>{`
        .art2-hero {
          position: relative;
          width: 100%;
          height: clamp(360px, 50vw, 580px);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .art2-hero__img-wrap {
          position: absolute;
          inset: 0;
        }
        .art2-hero__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 40%;
        }
        .art2-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(10,6,2,0.28) 0%, rgba(10,6,2,0.65) 100%);
        }
        .art2-hero__content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 0 clamp(16px, 5vw, 48px);
          max-width: 820px;
        }
        .art2-hero__eyebrow {
          display: block;
          color: rgba(255,255,255,0.8);
          letter-spacing: 0.22em;
          margin-bottom: 14px;
        }
        .art2-hero__title {
          font-family: var(--font-title);
          font-size: clamp(1.7rem, 4.2vw, 3.2rem);
          font-weight: 300;
          letter-spacing: 0.03em;
          color: #fff;
          line-height: 1.15;
          margin: 0 0 16px;
        }
        .art2-hero__sub {
          font-family: var(--font-body);
          font-size: clamp(0.88rem, 1.5vw, 1rem);
          color: rgba(255,255,255,0.78);
          line-height: 1.65;
        }
        .art2-intro__text {
          font-size: clamp(0.95rem, 1.6vw, 1.1rem);
          color: var(--color-text-muted);
          line-height: 1.8;
          text-align: center;
        }
        .art2-list {
          padding-top: 0;
        }
        .art2-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(24px, 4vw, 56px);
          align-items: center;
          padding: clamp(40px, 6vw, 72px) 0;
          border-bottom: 1px solid rgba(86,51,17,0.08);
        }
        .art2-card:last-child {
          border-bottom: none;
        }
        .art2-card--reverse {
          direction: rtl;
        }
        .art2-card--reverse > * {
          direction: ltr;
        }
        .art2-card__img-side {
          position: relative;
          overflow: hidden;
          border-radius: 3px;
          aspect-ratio: 4/3;
        }
        .art2-card__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .art2-card:hover .art2-card__img {
          transform: scale(1.03);
        }
        .art2-card__number {
          position: absolute;
          top: 14px;
          left: 14px;
          font-family: var(--font-nav);
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          color: #fff;
          background: var(--color-espresso);
          padding: 4px 12px;
          border-radius: 100px;
        }
        .art2-card__text-side {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .art2-card__title {
          font-family: var(--font-title);
          font-size: clamp(1.3rem, 2.5vw, 1.9rem);
          font-weight: 600;
          color: var(--color-espresso);
          line-height: 1.2;
        }
        .art2-card__desc {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          line-height: 1.8;
        }
        .art2-closing__inner {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        .art2-closing__title {
          font-family: var(--font-title);
          font-size: clamp(1.4rem, 2.8vw, 2rem);
          font-weight: 400;
          color: var(--color-espresso);
        }
        .art2-closing__text {
          font-size: 0.93rem;
          color: var(--color-text-muted);
          line-height: 1.8;
          max-width: 560px;
        }
        .art2-closing__cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .art2-nav__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .art2-nav__back,
        .art2-nav__next {
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
        .art2-nav__back:hover,
        .art2-nav__next:hover {
          color: var(--color-teal);
        }
        @media (max-width: 768px) {
          .art2-card {
            grid-template-columns: 1fr;
          }
          .art2-card--reverse {
            direction: ltr;
          }
        }
      `}</style>
    </>
  )
}
