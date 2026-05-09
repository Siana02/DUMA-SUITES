import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useLanguage, useT } from '../context/LanguageContext.jsx'
import {
  Cookie, Settings, Heart, RefreshCw, Mail, Layers,
  Phone, MapPin, CheckCircle, Shield, ToggleRight,
} from 'lucide-react'

const ICON_MAP = {
  cookie:      Cookie,
  settings:    Settings,
  heart:       Heart,
  'refresh-cw': RefreshCw,
  mail:        Mail,
  layers:      Layers,
}

const BADGE_COLORS = {
  'Always Active':  { bg: 'rgba(88,176,196,0.12)', color: '#3a8fa0' },
  'Optional':       { bg: 'rgba(201,169,110,0.14)', color: '#8a6830' },
  'Sempre Attivi':  { bg: 'rgba(88,176,196,0.12)', color: '#3a8fa0' },
  'Opzionali':      { bg: 'rgba(201,169,110,0.14)', color: '#8a6830' },
  'Immer aktiv':    { bg: 'rgba(88,176,196,0.12)', color: '#3a8fa0' },
  'Optional (DE)':  { bg: 'rgba(201,169,110,0.14)', color: '#8a6830' },
  'Toujours actifs': { bg: 'rgba(88,176,196,0.12)', color: '#3a8fa0' },
  'Optionnels':      { bg: 'rgba(201,169,110,0.14)', color: '#8a6830' },
  'Siempre activas': { bg: 'rgba(88,176,196,0.12)', color: '#3a8fa0' },
  'Opcionales':      { bg: 'rgba(201,169,110,0.14)', color: '#8a6830' },
}

const COOKIES_PAGE_COPY = {
  en: {
    back: 'Back',
    dataSafe: 'Your data is safe',
    fullControl: 'Full control',
    gdpr: 'GDPR compliant',
  },
  it: {
    back: 'Indietro',
    dataSafe: 'Dati al Sicuro',
    fullControl: 'Controllo Completo',
    gdpr: 'Conforme GDPR',
  },
  de: {
    back: 'Zurück',
    dataSafe: 'Ihre Daten sind sicher',
    fullControl: 'Volle Kontrolle',
    gdpr: 'DSGVO-konform',
  },
  fr: {
    back: 'Retour',
    dataSafe: 'Vos données sont en sécurité',
    fullControl: 'Contrôle total',
    gdpr: 'Conforme RGPD',
  },
  es: {
    back: 'Volver',
    dataSafe: 'Sus datos están seguros',
    fullControl: 'Control total',
    gdpr: 'Cumple con el RGPD',
  },
}

function CookieCategoryCard({ category }) {
  const badge = BADGE_COLORS[category.badge] || BADGE_COLORS['Optional']
  return (
    <div className="ck-cat">
      <div className="ck-cat__header">
        <h3 className="ck-cat__name">{category.name}</h3>
        <span className="ck-cat__badge" style={{ background: badge.bg, color: badge.color }}>
          {category.badge}
        </span>
      </div>
      <p className="ck-cat__desc">{category.desc}</p>
      {category.examples && (
        <ul className="ck-cat__examples">
          {category.examples.map((ex, i) => (
            <li key={i} className="ck-cat__example">
              <CheckCircle size={13} strokeWidth={2} className="ck-cat__check" />
              <span>{ex}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function ReasonCard({ reason }) {
  return (
    <div className="ck-reason">
      <div className="ck-reason__label">{reason.label}</div>
      <p className="ck-reason__desc">{reason.desc}</p>
    </div>
  )
}

export default function CookiesPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const { lang } = useLanguage()
  const t = useT()
  const ck = t.cookies
  const navigate = useNavigate()
  const copy = COOKIES_PAGE_COPY[lang] || COOKIES_PAGE_COPY.en

  return (
    <>
      <Helmet>
        <title>{ck.metaTitle}</title>
        <meta name="description" content={ck.metaDesc} />
      </Helmet>

      <main style={{ paddingTop: 80 }}>

        {/* ── Hero ── */}
        <div className="ck-hero">
          <div className="ck-hero__content">
            {/* Back breadcrumb */}
            <button
              className="ck-breadcrumb"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              ← {copy.back}
            </button>

            <motion.span
              className="ck-hero__eyebrow"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {ck.heroEyebrow}
            </motion.span>

            <motion.h1
              className="ck-hero__title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
            >
              {ck.heroTitle}
            </motion.h1>

            <motion.p
              className="ck-hero__sub"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
            >
              {ck.heroSub}
            </motion.p>

            <motion.div
              className="ck-hero__meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <Cookie size={14} strokeWidth={1.5} />
              <span>{ck.lastUpdated}</span>
            </motion.div>
          </div>
        </div>

        {/* ── Trust strip ── */}
        <div className="ck-trust-strip">
          <div className="container ck-trust-strip__inner">
            <div className="ck-trust-badge">
              <Shield size={14} strokeWidth={1.5} />
              <span>{copy.dataSafe}</span>
            </div>
            <span className="ck-trust-divider" aria-hidden="true" />
            <div className="ck-trust-badge">
              <ToggleRight size={14} strokeWidth={1.5} />
              <span>{copy.fullControl}</span>
            </div>
            <span className="ck-trust-divider" aria-hidden="true" />
            <div className="ck-trust-badge">
              <CheckCircle size={14} strokeWidth={1.5} />
              <span>{copy.gdpr}</span>
            </div>
          </div>
        </div>

        {/* ── Intro paragraph ── */}
        <div className="ck-intro-wrap container">
          <p className="ck-intro">{ck.intro}</p>
        </div>

        {/* ── Sections ── */}
        <section className="ck-body">
          <div className="container ck-body__inner">
            {ck.sections.map((section, i) => {
              const IconComp = ICON_MAP[section.icon] || Cookie
              return (
                <motion.div
                  key={i}
                  className="ck-section"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6, delay: i * 0.04, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div className="ck-section__icon-wrap" aria-hidden="true">
                    <IconComp size={20} strokeWidth={1.5} />
                  </div>

                  <div className="ck-section__body">
                    <h2 className="ck-section__title">{section.title}</h2>

                    {section.content && (
                      <p className="ck-section__content">{section.content}</p>
                    )}

                    {/* Standard bullets */}
                    {section.bullets && (
                      <ul className="ck-bullets">
                        {section.bullets.map((b, j) => (
                          <li key={j} className="ck-bullet">
                            <span className="ck-bullet__dot" aria-hidden="true" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Cookie category cards */}
                    {section.categories && (
                      <div className="ck-cats-grid">
                        {section.categories.map((cat, j) => (
                          <CookieCategoryCard key={j} category={cat} />
                        ))}
                      </div>
                    )}

                    {/* Reason cards */}
                    {section.reasons && (
                      <div className="ck-reasons-grid">
                        {section.reasons.map((r, j) => (
                          <ReasonCard key={j} reason={r} />
                        ))}
                      </div>
                    )}

                    {/* Contact block */}
                    {section.contact && (
                      <div className="ck-contact">
                        <div className="ck-contact__item">
                          <Mail size={15} strokeWidth={1.5} />
                          <a href={`mailto:${section.contact.email}`} className="ck-contact__link">
                            {section.contact.email}
                          </a>
                        </div>
                        <div className="ck-contact__item">
                          <MapPin size={15} strokeWidth={1.5} />
                          <span>{section.contact.address}</span>
                        </div>
                        <div className="ck-contact__item">
                          <Phone size={15} strokeWidth={1.5} />
                          <a href={`tel:${section.contact.phone.replace(/\s/g, '')}`} className="ck-contact__link">
                            {section.contact.phone}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

      </main>

      <style>{`
        /* ── Hero ── */
        .ck-hero {
          position: relative;
          background: linear-gradient(135deg, #1a2e38 0%, #0e1f28 55%, #0a1a10 100%);
          padding: clamp(80px, 12vw, 140px) clamp(20px, 5vw, 60px) clamp(60px, 9vw, 100px);
          text-align: center;
          overflow: hidden;
        }
        .ck-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 60% 40%, rgba(201,169,110,0.12) 0%, transparent 60%);
          pointer-events: none;
        }
        .ck-hero__content {
          position: relative;
          z-index: 2;
          max-width: 680px;
          margin-inline: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }
        .ck-breadcrumb {
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: var(--font-nav);
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 100px;
          padding: 6px 16px;
          cursor: pointer;
          transition: color 0.25s, border-color 0.25s, background 0.25s;
          margin-bottom: 8px;
        }
        .ck-breadcrumb:hover {
          color: #c9a96e;
          border-color: #c9a96e;
          background: rgba(201,169,110,0.1);
        }
        .ck-hero__eyebrow {
          font-family: var(--font-nav);
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #c9a96e;
        }
        .ck-hero__title {
          font-family: var(--font-title);
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 300;
          letter-spacing: 0.04em;
          color: #fff;
          line-height: 1.12;
          margin: 0;
        }
        .ck-hero__sub {
          font-family: var(--font-body);
          font-size: clamp(0.9rem, 1.5vw, 1.05rem);
          color: rgba(255,255,255,0.72);
          line-height: 1.7;
          max-width: 520px;
        }
        .ck-hero__meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-nav);
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.42);
          margin-top: 6px;
        }
        .ck-hero__meta svg { color: #c9a96e; flex-shrink: 0; }

        /* ── Trust strip ── */
        .ck-trust-strip {
          background: rgba(201,169,110,0.06);
          border-bottom: 1px solid rgba(201,169,110,0.15);
          padding: 12px 0;
        }
        .ck-trust-strip__inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        .ck-trust-badge {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }
        .ck-trust-badge svg { color: #c9a96e; flex-shrink: 0; }
        .ck-trust-divider {
          width: 1px;
          height: 16px;
          background: rgba(201,169,110,0.25);
          flex-shrink: 0;
        }

        /* ── Intro ── */
        .ck-intro-wrap {
          padding-top: clamp(32px, 5vw, 56px);
          padding-bottom: 0;
        }
        .ck-intro {
          font-family: var(--font-body);
          font-size: clamp(0.92rem, 1.5vw, 1.05rem);
          line-height: 1.85;
          color: var(--color-text-muted);
          max-width: 800px;
          margin-inline: auto;
          text-align: center;
          padding: 24px 28px;
          background: rgba(201,169,110,0.05);
          border-left: 3px solid #c9a96e;
          border-radius: 0 4px 4px 0;
        }

        /* ── Body / sections ── */
        .ck-body {
          padding-block: clamp(40px, 6vw, 80px);
          background: var(--color-bg-primary);
        }
        .ck-body__inner {
          display: flex;
          flex-direction: column;
          gap: clamp(36px, 5vw, 56px);
          max-width: 860px;
          margin-inline: auto;
        }
        .ck-section {
          display: grid;
          grid-template-columns: 52px 1fr;
          gap: 24px;
          padding: 32px 28px;
          background: #fff;
          border: 1px solid rgba(201,169,110,0.14);
          border-radius: 4px;
          box-shadow: 0 2px 18px rgba(86,51,17,0.05);
        }
        .ck-section__icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(201,169,110,0.12);
          border: 1px solid rgba(201,169,110,0.28);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c9a96e;
          flex-shrink: 0;
          margin-top: 4px;
        }
        .ck-section__title {
          font-family: var(--font-title);
          font-size: clamp(1.2rem, 2.2vw, 1.6rem);
          font-weight: 400;
          color: var(--color-espresso);
          margin-bottom: 12px;
          line-height: 1.25;
        }
        .ck-section__content {
          font-family: var(--font-body);
          font-size: 0.95rem;
          line-height: 1.8;
          color: var(--color-text-muted);
          margin-bottom: 16px;
        }

        /* ── Bullets ── */
        .ck-bullets {
          display: flex;
          flex-direction: column;
          gap: 9px;
          margin-top: 8px;
        }
        .ck-bullet {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--color-text-body);
          line-height: 1.6;
        }
        .ck-bullet__dot {
          flex-shrink: 0;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c9a96e;
          margin-top: 7px;
        }

        /* ── Category cards ── */
        .ck-cats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
          margin-top: 16px;
        }
        .ck-cat {
          padding: 20px;
          background: var(--color-bg-primary);
          border: 1px solid rgba(201,169,110,0.18);
          border-radius: 4px;
        }
        .ck-cat__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 10px;
          flex-wrap: wrap;
        }
        .ck-cat__name {
          font-family: var(--font-title);
          font-size: 1.05rem;
          font-weight: 500;
          color: var(--color-espresso);
          margin: 0;
        }
        .ck-cat__badge {
          font-family: var(--font-nav);
          font-size: 0.55rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 100px;
          font-weight: 600;
          white-space: nowrap;
        }
        .ck-cat__desc {
          font-family: var(--font-body);
          font-size: 0.87rem;
          line-height: 1.7;
          color: var(--color-text-muted);
          margin-bottom: 12px;
        }
        .ck-cat__examples {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .ck-cat__example {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: var(--font-body);
          font-size: 0.82rem;
          color: var(--color-text-body);
        }
        .ck-cat__check { color: #c9a96e; flex-shrink: 0; }

        /* ── Reason cards ── */
        .ck-reasons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 14px;
          margin-top: 16px;
        }
        .ck-reason {
          padding: 18px 20px;
          background: var(--color-bg-secondary);
          border-radius: 4px;
          border-top: 2px solid #c9a96e;
        }
        .ck-reason__label {
          font-family: var(--font-nav);
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #c9a96e;
          margin-bottom: 8px;
          font-weight: 600;
        }
        .ck-reason__desc {
          font-family: var(--font-body);
          font-size: 0.87rem;
          line-height: 1.7;
          color: var(--color-text-muted);
        }

        /* ── Contact block ── */
        .ck-contact {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ck-contact__item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--color-text-muted);
        }
        .ck-contact__item svg { color: #c9a96e; flex-shrink: 0; }
        .ck-contact__link {
          color: var(--color-espresso);
          text-decoration: none;
          transition: color 0.25s;
        }
        .ck-contact__link:hover { color: #c9a96e; text-decoration: underline; }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .ck-section {
            grid-template-columns: 1fr;
            gap: 16px;
            padding: 24px 18px;
          }
          .ck-section__icon-wrap { width: 44px; height: 44px; }
          .ck-cats-grid { grid-template-columns: 1fr; }
          .ck-reasons-grid { grid-template-columns: 1fr; }
          .ck-trust-divider { display: none; }
        }
      `}</style>
    </>
  )
}
