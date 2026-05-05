import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext.jsx'
import { getT } from '../i18n/translations.js'
import AboutSection from '../components/AboutSection.jsx'

import heroImg from '../assets/infinity-pool-ocean-view.jpg'

export default function AboutPage() {
  const { lang } = useLanguage()
  const t = getT(lang)

  return (
    <>
      <Helmet>
        <title>About Duma Suites | Living the Duma Way – Watamu</title>
        <meta
          name="description"
          content="Discover the story, values and philosophy behind Duma Suites — luxury coastal living in Watamu, Kenya, within the prestigious Ghepard Towers."
        />
      </Helmet>

      <main style={{ paddingTop: 80 }}>

        {/* ── Hero ── */}
        <div className="about-page-hero">
          <div className="about-page-hero__img-wrap">
            <img
              src={heroImg}
              alt="Infinity pool overlooking the Indian Ocean at Duma Suites, Watamu"
              className="about-page-hero__img"
            />
            <div className="about-page-hero__overlay" aria-hidden="true" />
          </div>

          <div className="about-page-hero__content">
            <motion.span
              className="eyebrow about-page-hero__eyebrow"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Watamu · Coastal Luxury
            </motion.span>

            <motion.h1
              className="about-page-hero__title"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.22 }}
            >
              Living the Duma Way
            </motion.h1>

            <motion.p
              className="about-page-hero__sub"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.36 }}
            >
              A place where the coast shapes everything — how you sleep, how you unwind, how you live.
            </motion.p>
          </div>
        </div>

        {/* ── About content (isPage=true → final CTA goes to house-rules) ── */}
        <AboutSection isPage />

      </main>

      <style>{`
        /* ── Hero ── */
        .about-page-hero {
          position: relative;
          width: 100%;
          height: clamp(380px, 52vw, 620px);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .about-page-hero__img-wrap {
          position: absolute;
          inset: 0;
        }
        .about-page-hero__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 40%;
        }
        .about-page-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(30,20,10,0.35) 0%,
            rgba(30,20,10,0.62) 100%
          );
        }
        .about-page-hero__content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 0 clamp(16px, 5vw, 48px);
          max-width: 760px;
        }
        .about-page-hero__eyebrow {
          display: block;
          color: rgba(255,255,255,0.82);
          letter-spacing: 0.22em;
          margin-bottom: 14px;
        }
        .about-page-hero__title {
          font-family: var(--font-title, 'Cormorant Garamond', serif);
          font-size: clamp(2.2rem, 5.5vw, 4rem);
          font-weight: 300;
          letter-spacing: 0.04em;
          color: #fff;
          line-height: 1.15;
          margin: 0 0 18px;
        }
        .about-page-hero__sub {
          font-family: var(--font-body);
          font-size: clamp(0.9rem, 1.6vw, 1.1rem);
          color: rgba(255,255,255,0.82);
          line-height: 1.7;
          max-width: 540px;
          margin-inline: auto;
        }
      `}</style>
    </>
  )
}
