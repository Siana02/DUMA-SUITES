import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Phone, Mail, Clock, Users, Star, CheckCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { getT } from '../i18n/translations.js'
import heroImg from '../assets/infinity-pool-ocean-view.jpg'

/* ── Social icons ── */
function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.84 1.56V6.78a4.85 4.85 0 0 1-1.07-.09z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  )
}

const SOCIAL = [
  { Icon: TikTokIcon,    href: 'https://www.tiktok.com/@duma.suites?_r=1&_t=ZS-96748d7EBBH',             label: 'TikTok',    handle: '@duma.suites' },
  { Icon: InstagramIcon, href: 'https://www.instagram.com/duma.suitess?igsh=MTZlNTVkZHdhcnoxMQ==',       label: 'Instagram', handle: '@duma.suitess' },
  { Icon: WhatsAppIcon,  href: 'https://wa.me/254710933025',                                              label: 'WhatsApp',  handle: '+254 710 933 025' },
]

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
}

function Section({ children, delay = 0 }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

export default function ContactPage() {
  const { lang } = useLanguage()
  const t = getT(lang)
  const ct = t.contact

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = e => { e.preventDefault(); setSubmitted(true) }

  return (
    <>
      <Helmet>
        <title>Contact Us | Duma Suites – Watamu</title>
        <meta
          name="description"
          content="Get in touch with the Duma Suites concierge team. We're available daily 8 AM – 10 PM to help with reservations, experiences, and special requests."
        />
      </Helmet>

      <main className="cp-page">

        {/* ── 1. Hero ── */}
        <div className="cp-hero">
          <img src={heroImg} alt="Infinity pool overlooking the Indian Ocean at Duma Suites" className="cp-hero__img" />
          <div className="cp-hero__overlay" aria-hidden="true" />
          <div className="cp-hero__content">
            <motion.span
              className="cp-hero__eyebrow eyebrow"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {lang === 'it' ? 'Contattaci' : 'Get in Touch'}
            </motion.span>
            <motion.h1
              className="cp-hero__title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.35 }}
            >
              {lang === 'it' ? 'Siamo qui per te' : "We're Here for You"}
            </motion.h1>
            <motion.p
              className="cp-hero__sub"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.52 }}
            >
              {lang === 'it'
                ? 'Che tu stia pianificando il tuo soggiorno o abbia semplicemente una domanda, il nostro team è pronto ad assisterti.'
                : "Whether you're planning your stay or simply curious, our team is ready to assist."}
            </motion.p>
          </div>
        </div>

        {/* ── 2. Info + Form grid ── */}
        <div className="cp-body container">

          {/* Left: contact info */}
          <Section delay={0.05}>
            <div className="cp-info">
              <h2 className="cp-info__heading">
                {lang === 'it' ? 'Informazioni di Contatto' : 'Contact Information'}
              </h2>

              <ul className="cp-info__list">
                <li className="cp-info__item">
                  <div className="cp-info__icon"><MapPin size={18} strokeWidth={1.5} /></div>
                  <div>
                    <span className="cp-info__label">{lang === 'it' ? 'Indirizzo' : 'Address'}</span>
                    <span className="cp-info__value">{ct.info.address}</span>
                  </div>
                </li>
                <li className="cp-info__item">
                  <div className="cp-info__icon"><Phone size={18} strokeWidth={1.5} /></div>
                  <div>
                    <span className="cp-info__label">{lang === 'it' ? 'Telefono' : 'Phone'}</span>
                    <a href={`tel:${ct.info.phone.replace(/\s/g,'')}`} className="cp-info__value cp-info__link">
                      {ct.info.phone}
                    </a>
                  </div>
                </li>
                <li className="cp-info__item">
                  <div className="cp-info__icon"><Mail size={18} strokeWidth={1.5} /></div>
                  <div>
                    <span className="cp-info__label">Email</span>
                    <a href={`mailto:${ct.info.email}`} className="cp-info__value cp-info__link">
                      {ct.info.email}
                    </a>
                  </div>
                </li>
                <li className="cp-info__item">
                  <div className="cp-info__icon"><Clock size={18} strokeWidth={1.5} /></div>
                  <div>
                    <span className="cp-info__label">{lang === 'it' ? 'Orari' : 'Hours'}</span>
                    <span className="cp-info__value">
                      {lang === 'it' ? 'Disponibili tutti i giorni, 8:00 – 22:00' : 'Available daily, 8 AM – 10 PM'}
                    </span>
                  </div>
                </li>
              </ul>

              {/* Concierge note */}
              <div className="cp-concierge">
                <Users size={16} strokeWidth={1.5} className="cp-concierge__icon" aria-hidden="true" />
                <p className="cp-concierge__text">
                  {lang === 'it'
                    ? 'Il nostro team di concierge è felice di assisterti con prenotazioni, esperienze e richieste speciali.'
                    : "Our concierge team is delighted to help with reservations, experiences, and special requests."}
                </p>
              </div>

              {/* Reviews */}
              <div className="cp-reviews">
                <span className="cp-reviews__title">
                  {lang === 'it' ? 'Cosa dicono i nostri ospiti' : 'Trusted by our guests'}
                </span>
                <div className="cp-reviews__badges">
                  <a
                    href="https://www.tripadvisor.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cp-reviews__badge"
                    aria-label="TripAdvisor reviews"
                  >
                    <div className="cp-reviews__stars">
                      {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="currentColor" strokeWidth={0} />)}
                    </div>
                    <span className="cp-reviews__badge-name">TripAdvisor</span>
                  </a>
                  <a
                    href="https://www.google.com/search?q=Duma+Suites+Watamu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cp-reviews__badge"
                    aria-label="Google reviews"
                  >
                    <div className="cp-reviews__stars">
                      {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="currentColor" strokeWidth={0} />)}
                    </div>
                    <span className="cp-reviews__badge-name">Google Reviews</span>
                  </a>
                </div>
              </div>
            </div>
          </Section>

          {/* Right: form */}
          <Section delay={0.15}>
            <div className="cp-form-col">
              <h2 className="cp-form-col__heading">
                {lang === 'it' ? 'Inviaci un Messaggio' : 'Send Us a Message'}
              </h2>

              {submitted ? (
                <div className="cp-success">
                  <CheckCircle size={52} strokeWidth={1.5} className="cp-success__icon" />
                  <h3 className="cp-success__title">
                    {lang === 'it' ? 'Messaggio Inviato!' : 'Message Sent!'}
                  </h3>
                  <p className="cp-success__body">
                    {lang === 'it' ? 'Grazie — ti risponderemo entro 24 ore.' : "Thank you — we'll reply within 24 hours."}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }) }}
                  >
                    {lang === 'it' ? 'Invia un altro messaggio' : 'Send another message'}
                  </button>
                </div>
              ) : (
                <form className="cp-form" onSubmit={handleSubmit} noValidate>
                  <div className="cp-form__group">
                    <label className="cp-form__label" htmlFor="cp-name">
                      {lang === 'it' ? 'Nome Completo' : 'Full Name'}
                    </label>
                    <input
                      id="cp-name" type="text" name="name"
                      className="cp-form__input"
                      value={form.name} onChange={handleChange}
                      required autoComplete="name"
                      placeholder={lang === 'it' ? 'Il tuo nome' : 'Your name'}
                    />
                  </div>
                  <div className="cp-form__group">
                    <label className="cp-form__label" htmlFor="cp-email">
                      {lang === 'it' ? 'Indirizzo Email' : 'Email Address'}
                    </label>
                    <input
                      id="cp-email" type="email" name="email"
                      className="cp-form__input"
                      value={form.email} onChange={handleChange}
                      required autoComplete="email"
                      placeholder={lang === 'it' ? 'La tua email' : 'your@email.com'}
                    />
                  </div>
                  <div className="cp-form__group">
                    <label className="cp-form__label" htmlFor="cp-message">
                      {lang === 'it' ? 'Messaggio' : 'Message'}
                    </label>
                    <textarea
                      id="cp-message" name="message"
                      className="cp-form__input cp-form__textarea"
                      value={form.message} onChange={handleChange}
                      rows={6} required
                      placeholder={lang === 'it' ? 'Come possiamo aiutarti?' : 'How can we help you?'}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary cp-form__submit">
                    {lang === 'it' ? 'Invia Messaggio' : 'Send Message'}
                  </button>
                  <p className="cp-form__reply-note">
                    {lang === 'it' ? '✓ Risponderemo entro 24 ore.' : "✓ We'll reply within 24 hours."}
                  </p>
                </form>
              )}
            </div>
          </Section>

        </div>

        {/* ── 3. Map ── */}
        <Section>
          <div className="cp-map-section container">
            <h2 className="cp-map-section__heading section-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              {lang === 'it' ? 'Dove Siamo' : 'Find Us'}
            </h2>
            <div className="cp-map-wrap">
              <iframe
                src="https://maps.google.com/maps?q=Ghepard+Towers+Watamu+Kenya&t=&z=15&ie=UTF8&iwloc=&output=embed"
                title="Ghepard Towers, Watamu Kenya – Map"
                className="cp-map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Section>

        {/* ── 4. Extras: Social + Book CTA ── */}
        <div className="cp-extras">
          <div className="container cp-extras__inner">

            {/* Social */}
            <Section delay={0.05}>
              <div className="cp-social">
                <span className="eyebrow" style={{ marginBottom: '0.6rem', display: 'block' }}>
                  {lang === 'it' ? 'Seguici' : 'Follow Us'}
                </span>
                <h3 className="cp-social__heading">
                  {lang === 'it' ? 'Rimani connesso con noi' : 'Stay Connected'}
                </h3>
                <p className="cp-social__sub">
                  {lang === 'it'
                    ? 'Scopri gli ultimi momenti, offerte speciali e storie dal nostro rifugio costiero.'
                    : 'Discover the latest moments, special offers, and stories from our coastal retreat.'}
                </p>
                <div className="cp-social__links">
                  {SOCIAL.map(({ Icon, href, label, handle }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cp-social__link"
                      aria-label={`${label}: ${handle}`}
                    >
                      <div className="cp-social__link-icon"><Icon /></div>
                      <div className="cp-social__link-text">
                        <span className="cp-social__link-name">{label}</span>
                        <span className="cp-social__link-handle">{handle}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </Section>

            {/* Book CTA */}
            <Section delay={0.12}>
              <div className="cp-book-cta">
                <span className="eyebrow" style={{ marginBottom: '0.6rem', display: 'block' }}>
                  {lang === 'it' ? 'La tua fuga ti aspetta' : 'Your Escape Awaits'}
                </span>
                <h3 className="cp-book-cta__heading">
                  {lang === 'it' ? 'Pianifica la tua Esperienza' : 'Plan Your Experience'}
                </h3>
                <p className="cp-book-cta__sub">
                  {lang === 'it'
                    ? 'Pronto a prenotare? Il nostro concierge è a tua disposizione via WhatsApp per garantirti la migliore esperienza.'
                    : "Ready to book? Our concierge is just a message away on WhatsApp to craft your perfect coastal escape."}
                </p>
                <a
                  href="https://wa.me/254710933025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary cp-book-cta__btn"
                >
                  {lang === 'it' ? 'Prenota via WhatsApp →' : 'Book via WhatsApp →'}
                </a>
              </div>
            </Section>

          </div>
        </div>

      </main>

      <style>{`
        /* ── Page wrapper ── */
        .cp-page {
          padding-top: 0;
          background-color: var(--color-bg-primary);
        }

        /* ── 1. Hero ── */
        .cp-hero {
          position: relative;
          height: clamp(420px, 58vh, 640px);
          overflow: hidden;
          display: flex;
          align-items: flex-end;
        }
        .cp-hero__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 40%;
        }
        .cp-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(9,7,4,0.85) 0%,
            rgba(9,7,4,0.45) 50%,
            rgba(9,7,4,0.15) 100%
          );
        }
        .cp-hero__content {
          position: relative;
          z-index: 2;
          width: 100%;
          padding: clamp(32px,6vw,72px) var(--section-px) clamp(40px,7vw,88px);
          max-width: 860px;
          margin-inline: auto;
          text-align: center;
        }
        .cp-hero__eyebrow {
          color: #c9a96e;
          margin-bottom: 0.5rem;
          display: block;
        }
        .cp-hero__title {
          font-family: var(--font-title);
          font-size: clamp(2.4rem, 5.5vw, 4.4rem);
          font-weight: 400;
          color: #ffffff;
          line-height: 1.1;
          margin: 0 0 1rem;
        }
        .cp-hero__sub {
          font-family: var(--font-lora);
          font-size: clamp(0.92rem,1.4vw,1.05rem);
          color: rgba(255,255,255,0.72);
          line-height: 1.75;
          max-width: 540px;
          margin: 0 auto;
        }

        /* ── 2. Body grid ── */
        .cp-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 5vw, 72px);
          padding-block: clamp(56px, 8vw, 96px);
          align-items: start;
        }

        /* Info column */
        .cp-info__heading,
        .cp-form-col__heading {
          font-family: var(--font-title);
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          color: var(--color-espresso);
          margin: 0 0 1.6rem;
          line-height: 1.2;
        }
        .cp-info__list {
          list-style: none;
          padding: 0;
          margin: 0 0 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .cp-info__item {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }
        .cp-info__icon {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(201,169,110,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-teal);
        }
        .cp-info__label {
          display: block;
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-text-muted);
          margin-bottom: 3px;
        }
        .cp-info__value {
          display: block;
          font-size: 0.9rem;
          color: var(--color-espresso);
          line-height: 1.5;
        }
        .cp-info__link {
          text-decoration: none;
          transition: color 0.25s ease;
        }
        .cp-info__link:hover { color: var(--color-teal); }

        /* Concierge note */
        .cp-concierge {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          background: rgba(201,169,110,0.08);
          border-left: 3px solid var(--color-teal);
          border-radius: 0 4px 4px 0;
          padding: 14px 16px;
          margin-bottom: 24px;
        }
        .cp-concierge__icon {
          flex-shrink: 0;
          color: var(--color-teal);
          margin-top: 2px;
        }
        .cp-concierge__text {
          font-size: 0.87rem;
          color: var(--color-espresso);
          line-height: 1.65;
          font-style: italic;
        }

        /* Reviews */
        .cp-reviews {
          margin-bottom: 8px;
        }
        .cp-reviews__title {
          display: block;
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-text-muted);
          margin-bottom: 12px;
        }
        .cp-reviews__badges {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .cp-reviews__badge {
          display: flex;
          align-items: center;
          gap: 7px;
          background: #fff;
          border: 1px solid rgba(86,51,17,0.12);
          border-radius: 4px;
          padding: 8px 14px;
          text-decoration: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .cp-reviews__badge:hover {
          border-color: var(--color-teal);
          box-shadow: 0 2px 14px rgba(201,169,110,0.18);
        }
        .cp-reviews__stars {
          display: flex;
          gap: 2px;
          color: #f5a623;
        }
        .cp-reviews__badge-name {
          font-family: var(--font-nav);
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-espresso);
        }

        /* Form column */
        .cp-form {
          display: flex;
          flex-direction: column;
          gap: 26px;
        }
        .cp-form__group {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .cp-form__label {
          font-family: var(--font-nav);
          font-size: 0.6rem;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: var(--color-espresso);
        }
        .cp-form__input {
          font-family: var(--font-body);
          font-size: 0.93rem;
          color: var(--color-espresso);
          background: #fff;
          border: 1.5px solid rgba(86,51,17,0.18);
          border-radius: 3px;
          padding: 13px 15px;
          width: 100%;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
          outline: none;
        }
        .cp-form__input::placeholder {
          color: rgba(86,51,17,0.3);
        }
        .cp-form__input:focus {
          border-color: var(--color-teal);
          box-shadow: 0 0 0 3px rgba(201,169,110,0.15);
        }
        .cp-form__textarea {
          resize: vertical;
          min-height: 140px;
        }
        .cp-form__submit {
          align-self: flex-start;
        }
        .cp-form__reply-note {
          font-size: 0.8rem;
          color: var(--color-teal);
          font-family: var(--font-body);
          margin-top: -10px;
        }

        /* Success state */
        .cp-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          text-align: center;
          padding: 56px 24px;
          background: #fff;
          border: 1px solid rgba(86,51,17,0.08);
          border-radius: 6px;
        }
        .cp-success__icon { color: var(--color-teal); }
        .cp-success__title {
          font-family: var(--font-title);
          font-size: 1.6rem;
          color: var(--color-espresso);
        }
        .cp-success__body {
          color: var(--color-text-muted);
          font-size: 0.95rem;
          line-height: 1.65;
        }

        /* ── 3. Map ── */
        .cp-map-section {
          padding-bottom: clamp(56px, 8vw, 96px);
        }
        .cp-map-wrap {
          width: 100%;
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid rgba(86,51,17,0.1);
          box-shadow: var(--shadow-card);
        }
        .cp-map {
          width: 100%;
          height: clamp(280px, 40vh, 480px);
          border: 0;
          display: block;
        }

        /* ── 4. Extras ── */
        .cp-extras {
          background-color: var(--color-bg-secondary);
          border-top: 1px solid rgba(86,51,17,0.07);
          border-bottom: 1px solid rgba(86,51,17,0.07);
          padding-block: clamp(56px,8vw,96px);
        }
        .cp-extras__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 5vw, 72px);
          align-items: start;
        }

        /* Social */
        .cp-social__heading,
        .cp-book-cta__heading {
          font-family: var(--font-title);
          font-size: clamp(1.4rem, 2.2vw, 1.85rem);
          color: var(--color-espresso);
          margin: 0 0 0.75rem;
          line-height: 1.2;
        }
        .cp-social__sub,
        .cp-book-cta__sub {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          line-height: 1.7;
          margin-bottom: 1.6rem;
        }
        .cp-social__links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .cp-social__link {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          background: #fff;
          border: 1px solid rgba(86,51,17,0.1);
          border-radius: 5px;
          text-decoration: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
        }
        .cp-social__link:hover {
          border-color: var(--color-teal);
          box-shadow: 0 4px 20px rgba(201,169,110,0.15);
          transform: translateY(-2px);
        }
        .cp-social__link-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(201,169,110,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-teal);
          flex-shrink: 0;
        }
        .cp-social__link-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .cp-social__link-name {
          font-family: var(--font-nav);
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-espresso);
        }
        .cp-social__link-handle {
          font-size: 0.82rem;
          color: var(--color-text-muted);
        }

        /* Book CTA */
        .cp-book-cta {
          background: var(--color-espresso);
          border-radius: 6px;
          padding: clamp(28px,4vw,48px);
          color: rgba(255,255,255,0.88);
        }
        .cp-book-cta .eyebrow {
          color: var(--color-teal);
        }
        .cp-book-cta__heading {
          color: #ffffff;
        }
        .cp-book-cta__sub {
          color: rgba(255,255,255,0.68);
        }
        .cp-book-cta__btn {
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .cp-body,
          .cp-extras__inner {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 640px) {
          .cp-hero__title {
            font-size: clamp(2rem, 9vw, 3rem);
          }
        }
      `}</style>
    </>
  )
}
