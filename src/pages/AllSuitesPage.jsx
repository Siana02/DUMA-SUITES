import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Maximize2, BedDouble, Users, ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { getT } from '../i18n/translations.js'

import outsideView2 from '../assets/outside-view2.jpeg'
import coastalPreview from '../assets/1bedroom-coastal-haven-suite-preview.JPEG'
import serenityPreview from '../assets/serenity-villa-tv-and-kitchen-view.JPEG'
import penthousePreview from '../assets/penthouse-suite-outside-balcony-dinining-table-area.jpg'
import cheetahIcon from '../assets/cheetah.png'

const SUITE_IMAGES = [coastalPreview, serenityPreview, penthousePreview]
const SUITE_HREFS = ['/suites/coastal-haven', '/suites/serenity-villa', '/suites/penthouse-suite-1-sofia']

function SuiteCard({ suite, image, href, index }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })
  const navigate = useNavigate()
  const { lang } = useLanguage()
  const t = getT(lang)

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
        onClick={() => navigate(href)}
        role="button"
        tabIndex={0}
        aria-label={`View ${suite.name}`}
        onKeyDown={(e) => e.key === 'Enter' && navigate(href)}
      >
        <img src={image} alt={suite.name} className="as-card__img" />
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
        <p className="as-card__desc">{suite.desc}</p>
        <a href={href} className="btn btn-inverse as-card__btn">
          {t.suites.all.viewSuite}
          <ArrowRight size={13} strokeWidth={1.6} aria-hidden="true" />
        </a>
      </div>
    </motion.article>
  )
}

export default function AllSuitesPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const { lang } = useLanguage()
  const t = getT(lang)
  const ts = t.suites.all

  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.2, triggerOnce: true })
  const { ref: introRef, inView: introInView } = useInView({ threshold: 0.2, triggerOnce: true })
  const { ref: showcaseRef, inView: showcaseInView } = useInView({ threshold: 0.2, triggerOnce: true })

  // Resort overview video — listen for finish and reset to prevent Vimeo end-screen
  const overviewIframeRef = useRef(null)

  useEffect(() => {
    const onMsg = (e) => {
      if (e.origin !== 'https://player.vimeo.com') return
      if (e.source !== overviewIframeRef.current?.contentWindow) return
      try {
        const data = JSON.parse(e.data)
        if (data.event === 'finish') {
          const win = overviewIframeRef.current?.contentWindow
          if (!win) return
          const post = (method, value) => {
            const msg = value !== undefined ? { method, value } : { method }
            win.postMessage(JSON.stringify(msg), 'https://player.vimeo.com')
          }
          post('pause')
          post('setCurrentTime', 0)
        }
      } catch { /* ignore */ }
    }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [])

  const handleOverviewIframeLoad = () => {
    setTimeout(() => {
      overviewIframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ method: 'addEventListener', value: 'finish' }),
        'https://player.vimeo.com'
      )
    }, 500)
  }

  return (
    <>
      <Helmet>
        <title>All Suites | Duma Suites Watamu</title>
        <meta name="description" content="Explore the showcased suites at Duma Suites — the One Bedroom Suite and Three Bedroom Suite. Exceptional retreats in Watamu, Kenya, with more options available." />
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
              {ts.heroEyebrow}
            </motion.span>
            <motion.h1
              className="as-hero__title"
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.22 }}
            >
              {ts.heroTitle}
            </motion.h1>
            <motion.p
              className="as-hero__subtitle"
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.36 }}
            >
              {ts.heroSub}
            </motion.p>
          </div>
        </section>

        {/* Intro */}
        <section className="as-intro section" ref={introRef}>
          <div className="container">
            <motion.span
              className="as-intro__eyebrow eyebrow"
              initial={{ opacity: 0, y: 20 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.05 }}
            >
              {ts.introEyebrow}
            </motion.span>

            {/* Cheetah divider */}
            <motion.div
              className="as-intro__cheetah-divider"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={introInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.12 }}
            >
              <span className="as-intro__divider-line" />
              <img src={cheetahIcon} alt="" className="as-intro__divider-icon" />
              <span className="as-intro__divider-line" />
            </motion.div>

            <motion.h2
              className="section-title as-intro__title"
              initial={{ opacity: 0, y: 20 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.18 }}
            >
              {ts.introTitle}
            </motion.h2>
            <motion.p
              className="as-intro__text"
              initial={{ opacity: 0, y: 24 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.28 }}
            >
              {ts.introText}
            </motion.p>
          </div>
        </section>

        {/* Resort overview video */}
        <section className="video-overview section section--secondary">
          <div className="container as-video__container">
            <span className="eyebrow">{ts.videoEyebrow}</span>
            <h2 className="section-title as-video__title">{ts.videoTitle}</h2>
            <div className="as-video__frame-wrap">
              <iframe
                ref={overviewIframeRef}
                src="https://player.vimeo.com/video/1189029033?autoplay=0&title=0&byline=0&portrait=0&dnt=1"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Duma Suites Resort Overview"
                onLoad={handleOverviewIframeLoad}
              />
            </div>
          </div>
        </section>

        {/* Suites showcase */}
        <section className="as-showcase section" ref={showcaseRef}>
          <div className="container">
            {/* Showcase header */}
            <motion.span
              className="as-showcase__eyebrow eyebrow"
              initial={{ opacity: 0, y: 20 }}
              animate={showcaseInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.05 }}
            >
              {ts.showcaseEyebrow}
            </motion.span>

            <motion.div
              className="as-showcase__divider"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={showcaseInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.12 }}
            >
              <span className="as-showcase__divider-line" />
              <img src={cheetahIcon} alt="" className="as-showcase__divider-icon" />
              <span className="as-showcase__divider-line" />
            </motion.div>

            <motion.h2
              className="section-title as-showcase__title"
              initial={{ opacity: 0, y: 20 }}
              animate={showcaseInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.18 }}
            >
              {ts.showcaseTitle}
            </motion.h2>
            <motion.p
              className="as-showcase__intro"
              initial={{ opacity: 0, y: 20 }}
              animate={showcaseInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.26 }}
            >
              {ts.showcaseIntro}
            </motion.p>

            <div className="as-showcase__grid">
              {ts.cards.map((suite, i) => (
                <SuiteCard key={suite.name} suite={suite} image={SUITE_IMAGES[i]} href={SUITE_HREFS[i]} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <style>{`
        /* ── Resort overview video ── */
        .as-video__container {
          max-width: 900px;
          text-align: center;
        }
        .as-video__frame-wrap {
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          border-radius: 4px;
          margin-top: 32px;
        }
        @media (max-width: 640px) {
          .as-video__container {
            max-width: 100%;
            padding-inline: 0;
          }
          .as-video__frame-wrap {
            border-radius: 0;
            margin-top: 24px;
          }
        }

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
          font-size: clamp(0.75rem, 1.3vw, 0.9rem);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c9a96e;
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
        .as-intro__eyebrow {
          display: block;
          text-align: center;
          margin-bottom: 12px;
        }
        .as-intro__title {
          text-align: center;
          margin: 0 auto 1.5rem;
        }
        .as-intro__cheetah-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin: 10px auto 14px;
          max-width: 260px;
        }
        .as-intro__divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--color-teal), transparent);
          opacity: 0.55;
        }
        .as-intro__divider-icon {
          width: 26px;
          height: 26px;
          object-fit: contain;
          opacity: 0.7;
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
        .as-video__title {
          text-align: center;
          margin-inline: auto;
        }

        /* ── Showcase header ── */
        .as-showcase__eyebrow {
          display: block;
          text-align: center;
          margin-bottom: 12px;
        }
        .as-showcase__divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin: 10px auto 14px;
          max-width: 260px;
        }
        .as-showcase__divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--color-teal), transparent);
          opacity: 0.55;
        }
        .as-showcase__divider-icon {
          width: 26px;
          height: 26px;
          object-fit: contain;
          opacity: 0.7;
        }
        .as-showcase__title {
          text-align: center;
          margin: 0 auto 0.75rem;
        }
        .as-showcase__intro {
          font-family: var(--font-body);
          font-size: clamp(0.9rem, 1.4vw, 1rem);
          color: var(--color-text-muted);
          line-height: 1.7;
          max-width: 480px;
          margin: 0 auto 2.5rem;
          text-align: center;
        }

        /* ── Showcase grid ── */
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
          bottom: 0;
          left: 0;
          padding: 20px 24px;
          max-width: 380px;
          background: linear-gradient(
            to right,
            rgba(0,0,0,0.52) 0%,
            rgba(0,0,0,0.18) 70%,
            transparent 100%
          );
        }
        .as-card__tagline {
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.85);
          margin: 0 0 5px;
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
        }
        .as-card__name {
          font-family: var(--font-title);
          font-size: clamp(1.3rem, 2.5vw, 1.9rem);
          font-weight: 600;
          color: #fff;
          margin: 0 0 8px;
          line-height: 1.15;
          text-shadow: 0 2px 8px rgba(0,0,0,0.4);
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
          color: rgba(255,255,255,0.88);
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
        }
        .as-card__specs svg {
          color: rgba(255,255,255,0.7);
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
          .as-card__overlay {
            max-width: 100%;
            background: linear-gradient(
              to top,
              rgba(0,0,0,0.48) 0%,
              rgba(0,0,0,0.12) 65%,
              transparent 100%
            );
          }
          .as-card__body { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </>
  )
}
