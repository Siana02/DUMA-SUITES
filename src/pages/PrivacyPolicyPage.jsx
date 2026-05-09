import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useLanguage, useT } from '../context/LanguageContext.jsx'
import {
  Shield, Database, Settings, Share2, Lock, Cookie,
  UserCheck, Mail, Phone, MapPin, CheckCircle,
} from 'lucide-react'

const ICON_MAP = {
  database: Database,
  settings: Settings,
  share: Share2,
  shield: Shield,
  lock: Lock,
  cookie: Cookie,
  'user-check': UserCheck,
  mail: Mail,
}

export default function PrivacyPolicyPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const t = useT()
  const pp = t.privacyPolicy

  return (
    <>
      <Helmet>
        <title>{pp.metaTitle}</title>
        <meta name="description" content={pp.heroSub} />
      </Helmet>

      <main style={{ paddingTop: 80 }}>

        {/* ── Hero ── */}
        <div className="pp-hero">
          <div className="pp-hero__content">
            <motion.span
              className="pp-hero__eyebrow"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {pp.heroEyebrow}
            </motion.span>
            <motion.h1
              className="pp-hero__title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
            >
              {pp.heroTitle}
            </motion.h1>
            <motion.p
              className="pp-hero__sub"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
            >
              {pp.heroSub}
            </motion.p>
            <motion.div
              className="pp-hero__meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <Shield size={14} strokeWidth={1.5} />
              <span>{pp.lastUpdated}</span>
            </motion.div>
          </div>
        </div>

        {/* ── Trust badge strip ── */}
        <div className="pp-trust-strip">
          <div className="container pp-trust-strip__inner">
            <div className="pp-trust-badge">
              <CheckCircle size={14} strokeWidth={1.5} />
              <span>{pp.trustSafe}</span>
            </div>
            <span className="pp-trust-divider" aria-hidden="true" />
            <div className="pp-trust-badge">
              <Shield size={14} strokeWidth={1.5} />
              <span>{pp.trustSsl}</span>
            </div>
            <span className="pp-trust-divider" aria-hidden="true" />
            <div className="pp-trust-badge">
              <Lock size={14} strokeWidth={1.5} />
              <span>{pp.trustPci}</span>
            </div>
          </div>
        </div>

        {/* ── Sections ── */}
        <section className="pp-body">
          <div className="container pp-body__inner">
            {pp.sections.map((section, i) => {
              const IconComp = ICON_MAP[section.icon] || Shield
              return (
                <motion.div
                  key={i}
                  className="pp-section"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div className="pp-section__icon-wrap" aria-hidden="true">
                    <IconComp size={20} strokeWidth={1.5} />
                  </div>
                  <div className="pp-section__body">
                    <h2 className="pp-section__title">{section.title}</h2>
                    {section.content && (
                      <p className="pp-section__content">{section.content}</p>
                    )}
                    {section.bullets && section.bullets.length > 0 && (
                      <ul className="pp-bullets">
                        {section.bullets.map((bullet, j) => (
                          <li key={j} className="pp-bullet">
                            <span className="pp-bullet__dot" aria-hidden="true" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.contact && (
                      <div className="pp-contact">
                        <div className="pp-contact__item">
                          <Mail size={15} strokeWidth={1.5} />
                          <a href={`mailto:${section.contact.email}`} className="pp-contact__link">
                            {section.contact.email}
                          </a>
                        </div>
                        <div className="pp-contact__item">
                          <MapPin size={15} strokeWidth={1.5} />
                          <span>{section.contact.address}</span>
                        </div>
                        <div className="pp-contact__item">
                          <Phone size={15} strokeWidth={1.5} />
                          <a href={`tel:${section.contact.phone.replace(/\s/g, '')}`} className="pp-contact__link">
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
        .pp-hero {
          position: relative;
          background: linear-gradient(135deg, var(--color-espresso) 0%, #2a1a0a 55%, #1a3540 100%);
          padding: clamp(80px, 12vw, 140px) clamp(20px, 5vw, 60px) clamp(60px, 9vw, 100px);
          text-align: center;
          overflow: hidden;
        }
        .pp-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 70% 40%, rgba(88,176,196,0.15) 0%, transparent 60%);
          pointer-events: none;
        }
        .pp-hero__content {
          position: relative;
          z-index: 2;
          max-width: 680px;
          margin-inline: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }
        .pp-breadcrumb {
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
          align-self: flex-start;
          margin-bottom: 8px;
        }
        .pp-breadcrumb:hover {
          color: var(--color-teal);
          border-color: var(--color-teal);
          background: rgba(88,176,196,0.1);
        }
        .pp-hero__eyebrow {
          font-family: var(--font-nav);
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-teal);
        }
        .pp-hero__title {
          font-family: var(--font-title);
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 300;
          letter-spacing: 0.04em;
          color: #fff;
          line-height: 1.12;
          margin: 0;
        }
        .pp-hero__sub {
          font-family: var(--font-body);
          font-size: clamp(0.9rem, 1.5vw, 1.05rem);
          color: rgba(255,255,255,0.72);
          line-height: 1.7;
          max-width: 520px;
        }
        .pp-hero__meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-nav);
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.42);
          margin-top: 6px;
        }
        .pp-hero__meta svg {
          color: var(--color-teal);
          flex-shrink: 0;
        }

        /* ── Trust strip ── */
        .pp-trust-strip {
          background: rgba(88,176,196,0.06);
          border-bottom: 1px solid rgba(88,176,196,0.15);
          padding: 12px 0;
        }
        .pp-trust-strip__inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          flex-wrap: wrap;
        }
        .pp-trust-badge {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: var(--font-nav);
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-teal);
          padding: 4px 28px;
        }
        .pp-trust-badge svg {
          flex-shrink: 0;
        }
        .pp-trust-divider {
          width: 1px;
          height: 22px;
          background: rgba(88,176,196,0.25);
          flex-shrink: 0;
        }

        /* ── Body ── */
        .pp-body {
          padding-block: clamp(48px, 7vw, 96px);
          background: var(--color-bg-primary);
        }
        .pp-body__inner {
          max-width: 800px;
          display: flex;
          flex-direction: column;
          gap: clamp(32px, 4vw, 52px);
        }

        /* ── Section cards ── */
        .pp-section {
          display: grid;
          grid-template-columns: 56px 1fr;
          gap: 20px 24px;
          background: #fff;
          border: 1px solid rgba(86,51,17,0.08);
          border-radius: 6px;
          padding: clamp(22px, 3vw, 36px);
          box-shadow: 0 2px 16px rgba(86,51,17,0.05);
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .pp-section:hover {
          box-shadow: 0 6px 32px rgba(88,176,196,0.12);
          border-color: rgba(88,176,196,0.25);
        }
        .pp-section__icon-wrap {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(88,176,196,0.1);
          border: 1px solid rgba(88,176,196,0.22);
          border-radius: 10px;
          color: var(--color-teal);
          flex-shrink: 0;
        }
        .pp-section__body {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .pp-section__title {
          font-family: var(--font-title);
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          font-weight: 600;
          color: var(--color-espresso);
          line-height: 1.3;
          margin: 0;
        }
        .pp-section__content {
          font-size: clamp(0.87rem, 1.3vw, 0.97rem);
          color: var(--color-text-muted);
          line-height: 1.75;
          margin: 0;
        }

        /* ── Bullets ── */
        .pp-bullets {
          display: flex;
          flex-direction: column;
          gap: 8px;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .pp-bullet {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.88rem;
          color: var(--color-text-muted);
          line-height: 1.6;
        }
        .pp-bullet__dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--color-teal);
          flex-shrink: 0;
          margin-top: 6px;
        }

        /* ── Contact block ── */
        .pp-contact {
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: rgba(88,176,196,0.06);
          border: 1px solid rgba(88,176,196,0.18);
          border-radius: 6px;
          padding: 18px 22px;
        }
        .pp-contact__item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.88rem;
          color: var(--color-text-muted);
          line-height: 1.5;
        }
        .pp-contact__item svg {
          color: var(--color-teal);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .pp-contact__link {
          color: var(--color-teal);
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .pp-contact__link:hover {
          opacity: 0.75;
          text-decoration: underline;
        }

        @media (max-width: 600px) {
          .pp-section {
            grid-template-columns: 1fr;
          }
          .pp-trust-badge {
            padding: 4px 14px;
          }
          .pp-breadcrumb {
            font-size: 0.58rem;
          }
        }
      `}</style>
    </>
  )
}
