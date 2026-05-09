import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useLanguage, useT } from '../context/LanguageContext.jsx'
import {
  CheckCircle, Calendar, XCircle, Clock, Users,
  Shield, Scale, Mail, FileText,
} from 'lucide-react'

const ICON_MAP = {
  'check-circle': CheckCircle,
  calendar: Calendar,
  'x-circle': XCircle,
  clock: Clock,
  users: Users,
  shield: Shield,
  scale: Scale,
  mail: Mail,
}

export default function TermsOfServicePage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const t = useT()
  const tos = t.termsOfService

  return (
    <>
      <Helmet>
        <title>{tos.metaTitle}</title>
        <meta name="description" content={tos.heroSub} />
      </Helmet>

      <main style={{ paddingTop: 80 }}>

        {/* ── Hero ── */}
        <div className="tos-hero">
          <div className="tos-hero__content">
            <motion.span
              className="tos-hero__eyebrow"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {tos.heroEyebrow}
            </motion.span>
            <motion.h1
              className="tos-hero__title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
            >
              {tos.heroTitle}
            </motion.h1>
            <motion.p
              className="tos-hero__sub"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
            >
              {tos.heroSub}
            </motion.p>
            <motion.div
              className="tos-hero__meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <FileText size={14} strokeWidth={1.5} />
              <span>{tos.lastUpdated}</span>
            </motion.div>
          </div>
        </div>

        {/* ── Intro banner ── */}
        <div className="tos-intro-banner">
          <div className="container tos-intro-banner__inner">
            <Scale size={18} strokeWidth={1.5} />
            <p>{tos.introBanner}</p>
          </div>
        </div>

        {/* ── Sections ── */}
        <section className="tos-body">
          <div className="container tos-body__inner">
            {tos.sections.map((section, i) => {
              const IconComp = ICON_MAP[section.icon] || Shield
              return (
                <motion.div
                  key={i}
                  className="tos-section"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div className="tos-section__icon-wrap" aria-hidden="true">
                    <IconComp size={20} strokeWidth={1.5} />
                  </div>
                  <div className="tos-section__body">
                    <h2 className="tos-section__title">{section.title}</h2>
                    {section.content && (
                      <p className="tos-section__content">{section.content}</p>
                    )}
                    {section.bullets && section.bullets.length > 0 && (
                      <ul className="tos-bullets">
                        {section.bullets.map((bullet, j) => (
                          <li key={j} className="tos-bullet">
                            <span className="tos-bullet__dot" aria-hidden="true" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.contact && (
                      <div className="tos-contact">
                        <div className="tos-contact__item">
                          <Mail size={15} strokeWidth={1.5} />
                          <a href={`mailto:${section.contact.email}`} className="tos-contact__link">
                            {section.contact.email}
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
        .tos-hero {
          position: relative;
          background: linear-gradient(135deg, #1a3540 0%, #0e2530 55%, var(--color-espresso) 100%);
          padding: clamp(80px, 12vw, 140px) clamp(20px, 5vw, 60px) clamp(60px, 9vw, 100px);
          text-align: center;
          overflow: hidden;
        }
        .tos-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 30% 60%, rgba(88,176,196,0.15) 0%, transparent 60%);
          pointer-events: none;
        }
        .tos-hero__content {
          position: relative;
          z-index: 2;
          max-width: 680px;
          margin-inline: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }
        .tos-breadcrumb {
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
        .tos-breadcrumb:hover {
          color: var(--color-teal);
          border-color: var(--color-teal);
          background: rgba(88,176,196,0.1);
        }
        .tos-hero__eyebrow {
          font-family: var(--font-nav);
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-teal);
        }
        .tos-hero__title {
          font-family: var(--font-title);
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 300;
          letter-spacing: 0.04em;
          color: #fff;
          line-height: 1.12;
          margin: 0;
        }
        .tos-hero__sub {
          font-family: var(--font-body);
          font-size: clamp(0.9rem, 1.5vw, 1.05rem);
          color: rgba(255,255,255,0.72);
          line-height: 1.7;
          max-width: 520px;
        }
        .tos-hero__meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-nav);
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.42);
          margin-top: 6px;
        }
        .tos-hero__meta svg {
          color: var(--color-teal);
          flex-shrink: 0;
        }

        /* ── Intro banner ── */
        .tos-intro-banner {
          background: rgba(86,51,17,0.06);
          border-bottom: 1px solid rgba(86,51,17,0.1);
          padding: 16px 0;
        }
        .tos-intro-banner__inner {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          max-width: 800px;
        }
        .tos-intro-banner svg {
          color: var(--color-espresso);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .tos-intro-banner p {
          font-size: 0.87rem;
          color: var(--color-espresso);
          line-height: 1.65;
          margin: 0;
          opacity: 0.82;
        }

        /* ── Body ── */
        .tos-body {
          padding-block: clamp(48px, 7vw, 96px);
          background: var(--color-bg-primary);
        }
        .tos-body__inner {
          max-width: 800px;
          display: flex;
          flex-direction: column;
          gap: clamp(32px, 4vw, 52px);
        }

        /* ── Section cards ── */
        .tos-section {
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
        .tos-section:hover {
          box-shadow: 0 6px 32px rgba(88,176,196,0.12);
          border-color: rgba(88,176,196,0.25);
        }
        .tos-section__icon-wrap {
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
        .tos-section__body {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .tos-section__title {
          font-family: var(--font-title);
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          font-weight: 600;
          color: var(--color-espresso);
          line-height: 1.3;
          margin: 0;
        }
        .tos-section__content {
          font-size: clamp(0.87rem, 1.3vw, 0.97rem);
          color: var(--color-text-muted);
          line-height: 1.75;
          margin: 0;
        }

        /* ── Bullets ── */
        .tos-bullets {
          display: flex;
          flex-direction: column;
          gap: 8px;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .tos-bullet {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.88rem;
          color: var(--color-text-muted);
          line-height: 1.6;
        }
        .tos-bullet__dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--color-teal);
          flex-shrink: 0;
          margin-top: 6px;
        }

        /* ── Contact block ── */
        .tos-contact {
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: rgba(88,176,196,0.06);
          border: 1px solid rgba(88,176,196,0.18);
          border-radius: 6px;
          padding: 18px 22px;
        }
        .tos-contact__item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.88rem;
          color: var(--color-text-muted);
        }
        .tos-contact__item svg {
          color: var(--color-teal);
          flex-shrink: 0;
        }
        .tos-contact__link {
          color: var(--color-teal);
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .tos-contact__link:hover {
          opacity: 0.75;
          text-decoration: underline;
        }

        @media (max-width: 600px) {
          .tos-section {
            grid-template-columns: 1fr;
          }
          .tos-breadcrumb {
            font-size: 0.58rem;
          }
        }
      `}</style>
    </>
  )
}
