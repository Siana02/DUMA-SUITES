import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Shield, FileText, ArrowRight, CalendarDays } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { getT } from '../i18n/translations.js'
import AboutSection from '../components/AboutSection.jsx'

import heroImg from '../assets/infinity-pool-ocean-view.jpg'

const LEGAL_CARDS = [
  {
    icon: Shield,
    titleEn: 'Privacy Policy',
    titleIt: 'Privacy Policy',
    descEn: 'We take your privacy seriously. Learn how we collect, use and protect your personal data when you browse or book with Duma Suites.',
    descIt: 'Prendiamo sul serio la tua privacy. Scopri come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali.',
    href: '/privacy-policy',
    ctaEn: 'Read Policy',
    ctaIt: 'Leggi la Policy',
  },
  {
    icon: FileText,
    titleEn: 'Terms of Service',
    titleIt: 'Termini di Servizio',
    descEn: 'Our terms outline the conditions that govern your stay, bookings and use of our services — designed to ensure a clear, fair experience for every guest.',
    descIt: 'I nostri termini definiscono le condizioni che regolano il soggiorno, le prenotazioni e l\'uso dei nostri servizi.',
    href: '/terms-of-service',
    ctaEn: 'Read Terms',
    ctaIt: 'Leggi i Termini',
  },
  {
    icon: Shield,
    titleEn: 'Cookie Policy',
    titleIt: 'Cookie Policy',
    descEn: 'We use essential and optional cookies to enhance your browsing experience. Find out exactly which cookies we use and how to manage your preferences.',
    descIt: 'Utilizziamo cookie essenziali e opzionali per migliorare la navigazione. Scopri quali cookie usiamo e come gestire le preferenze.',
    href: '/cookies',
    ctaEn: 'Read Policy',
    ctaIt: 'Leggi la Policy',
  },
]

function LegalCard({ card, lang }) {
  const navigate = useNavigate()
  const Icon = card.icon
  return (
    <motion.div
      className="ap-legal-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="ap-legal-card__icon" aria-hidden="true">
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <h3 className="ap-legal-card__title">
        {lang === 'it' ? card.titleIt : card.titleEn}
      </h3>
      <p className="ap-legal-card__desc">
        {lang === 'it' ? card.descIt : card.descEn}
      </p>
      <a
        href={card.href}
        className="ap-legal-card__link"
        onClick={e => { e.preventDefault(); navigate(card.href) }}
      >
        {lang === 'it' ? card.ctaIt : card.ctaEn}
        <ArrowRight size={13} strokeWidth={2} aria-hidden="true" />
      </a>
    </motion.div>
  )
}

export default function AboutPage() {
  const { lang } = useLanguage()
  const t = getT(lang)
  const navigate = useNavigate()

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

        {/* ── Legal & Transparency ── */}
        <section className="ap-legal section section--secondary">
          <div className="container">
            <motion.span
              className="eyebrow ap-legal__eyebrow"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {lang === 'it' ? 'Trasparenza & Privacy' : 'Transparency & Privacy'}
            </motion.span>
            <motion.h2
              className="section-title ap-legal__title"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              {lang === 'it' ? 'Le nostre politiche' : 'Our Policies'}
            </motion.h2>
            <motion.p
              className="ap-legal__sub"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.18 }}
            >
              {lang === 'it'
                ? 'A Duma Suites, la fiducia è tutto. Vi invitiamo a leggere le nostre politiche — formulate per garantire chiarezza, equità e rispetto per ogni ospite.'
                : 'At Duma Suites, trust is everything. We invite you to review our policies — written to ensure clarity, fairness and respect for every guest.'}
            </motion.p>
            <div className="ap-legal__grid">
              {LEGAL_CARDS.map((card) => (
                <LegalCard key={card.href} card={card} lang={lang} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Make a Reservation ── */}
        <section className="ap-reserve section">
          <div className="container ap-reserve__inner">
            <motion.div
              className="ap-reserve__content"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="ap-reserve__icon" aria-hidden="true">
                <CalendarDays size={28} strokeWidth={1.2} />
              </div>
              <span className="eyebrow ap-reserve__eyebrow">
                {lang === 'it' ? 'Prenota il tuo soggiorno' : 'Reserve Your Stay'}
              </span>
              <h2 className="ap-reserve__title">
                {lang === 'it'
                  ? 'Pronto a vivere la\ncoastal luxury?'
                  : 'Ready to experience\ncoastal luxury?'}
              </h2>
              <p className="ap-reserve__sub">
                {lang === 'it'
                  ? 'Scrivici per verificare la disponibilità, i prezzi e per prenotare il tuo soggiorno a Duma Suites — un rifugio costiero esclusivo a Watamu.'
                  : 'Reach out to check availability, rates and to secure your stay at Duma Suites — Watamu\'s most refined coastal retreat.'}
              </p>
              <div className="ap-reserve__ctas">
                <a
                  href="/contact"
                  className="btn btn-primary"
                  onClick={e => { e.preventDefault(); navigate('/contact') }}
                >
                  <CalendarDays size={14} strokeWidth={1.8} aria-hidden="true" />
                  {lang === 'it' ? 'Fai una Prenotazione' : 'Make a Reservation'}
                </a>
                <a
                  href="/suites"
                  className="btn btn-inverse"
                  onClick={e => { e.preventDefault(); navigate('/suites') }}
                >
                  {lang === 'it' ? 'Esplora le Suite' : 'Explore Suites'}
                  <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

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

        /* ── Legal section ── */
        .ap-legal__eyebrow { display: block; text-align: center; }
        .ap-legal__title {
          text-align: center;
          margin: 0 auto 14px;
        }
        .ap-legal__sub {
          text-align: center;
          font-family: var(--font-body);
          font-size: clamp(0.92rem, 1.5vw, 1.05rem);
          color: var(--color-text-muted);
          line-height: 1.75;
          max-width: 620px;
          margin: 0 auto clamp(32px, 5vw, 52px);
        }
        .ap-legal__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 20px;
        }
        .ap-legal-card {
          background: #fff;
          border: 1px solid rgba(201,169,110,0.18);
          border-top: 3px solid #c9a96e;
          border-radius: 4px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          box-shadow: 0 2px 14px rgba(86,51,17,0.06);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .ap-legal-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(86,51,17,0.12);
        }
        .ap-legal-card__icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(201,169,110,0.12);
          border: 1px solid rgba(201,169,110,0.28);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c9a96e;
          flex-shrink: 0;
          margin-bottom: 4px;
        }
        .ap-legal-card__title {
          font-family: var(--font-title);
          font-size: 1.15rem;
          font-weight: 500;
          color: var(--color-espresso);
          margin: 0;
        }
        .ap-legal-card__desc {
          font-family: var(--font-body);
          font-size: 0.88rem;
          color: var(--color-text-muted);
          line-height: 1.7;
          flex: 1;
        }
        .ap-legal-card__link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-nav);
          font-size: 0.6rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #c9a96e;
          text-decoration: none;
          margin-top: 6px;
          transition: color 0.22s, gap 0.22s;
        }
        .ap-legal-card__link:hover { color: var(--color-espresso); gap: 9px; }

        /* ── Make a Reservation ── */
        .ap-reserve {
          background: linear-gradient(135deg, var(--color-espresso) 0%, #2a1608 60%, #0e2530 100%);
          position: relative;
          overflow: hidden;
        }
        .ap-reserve::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 65% 40%, rgba(201,169,110,0.14) 0%, transparent 65%);
          pointer-events: none;
        }
        .ap-reserve__inner {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: center;
        }
        .ap-reserve__content {
          max-width: 640px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .ap-reserve__icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(201,169,110,0.15);
          border: 1px solid rgba(201,169,110,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c9a96e;
          margin-bottom: 4px;
        }
        .ap-reserve__eyebrow {
          color: #c9a96e !important;
          display: block;
        }
        .ap-reserve__title {
          font-family: var(--font-title);
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 300;
          color: #fff;
          line-height: 1.18;
          white-space: pre-line;
          margin: 0;
        }
        .ap-reserve__sub {
          font-family: var(--font-body);
          font-size: clamp(0.9rem, 1.5vw, 1.05rem);
          color: rgba(255,255,255,0.68);
          line-height: 1.75;
          max-width: 500px;
        }
        .ap-reserve__ctas {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 8px;
        }
        .ap-reserve .btn-inverse {
          color: rgba(255,255,255,0.85);
          border: 1.5px solid rgba(255,255,255,0.3);
          background: transparent;
        }
        .ap-reserve .btn-inverse:hover {
          border-color: #c9a96e;
          color: #c9a96e;
        }

        @media (max-width: 640px) {
          .ap-legal__grid { grid-template-columns: 1fr; }
          .ap-reserve__ctas { flex-direction: column; align-items: center; }
        }
      `}</style>
    </>
  )
}
