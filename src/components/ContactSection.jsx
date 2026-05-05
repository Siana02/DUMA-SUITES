import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Phone, Mail, CheckCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { getT } from '../i18n/translations.js'

export default function ContactSection() {
  const { lang } = useLanguage()
  const t = getT(lang)
  const ct = t.contact

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.3, triggerOnce: true })
  const { ref: bodyRef,   inView: bodyInView }   = useInView({ threshold: 0.1, triggerOnce: true })

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="contact-section section contact-section--bg" id="contact">
      <div className="container">
        <div
          ref={headerRef}
          className={`contact-section__header${headerInView ? ' is-visible' : ''}`}
        >
          <span className="eyebrow">{ct.eyebrow}</span>
          <h2 className="section-title">{ct.title}</h2>
          <p className="contact-section__sub">{ct.sub}</p>
        </div>

        <div className="contact-section__body" ref={bodyRef}>
          {/* Left column */}
          <motion.div
            className="contact-section__info"
            initial={{ opacity: 0, x: -32 }}
            animate={bodyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <ul className="contact-info-list">
              <li className="contact-info-list__item">
                <div className="contact-info-list__icon">
                  <MapPin size={18} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div>
                  <span className="contact-info-list__label">{lang === 'it' ? 'Indirizzo' : 'Address'}</span>
                  <span className="contact-info-list__value">{ct.info.address}</span>
                </div>
              </li>
              <li className="contact-info-list__item">
                <div className="contact-info-list__icon">
                  <Phone size={18} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div>
                  <span className="contact-info-list__label">{lang === 'it' ? 'Telefono' : 'Phone'}</span>
                  <a href={`tel:${ct.info.phone.replace(/\s/g, '')}`} className="contact-info-list__value contact-info-list__link">
                    {ct.info.phone}
                  </a>
                </div>
              </li>
              <li className="contact-info-list__item">
                <div className="contact-info-list__icon">
                  <Mail size={18} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div>
                  <span className="contact-info-list__label">Email</span>
                  <a href={`mailto:${ct.info.email}`} className="contact-info-list__value contact-info-list__link">
                    {ct.info.email}
                  </a>
                </div>
              </li>
            </ul>

            {/* Embedded map */}
            <div className="contact-section__map-wrap">
              <iframe
                src="https://maps.google.com/maps?q=Ghepard+Towers+Watamu+Kenya&t=&z=15&ie=UTF8&iwloc=&output=embed"
                title="Ghepard Towers, Watamu Kenya – Map"
                className="contact-section__map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Right column: form */}
          <motion.div
            className="contact-section__form-col"
            initial={{ opacity: 0, x: 32 }}
            animate={bodyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            {submitted ? (
              <div className="contact-section__success">
                <CheckCircle size={48} strokeWidth={1.5} className="contact-section__success-icon" />
                <h3>{lang === 'it' ? 'Messaggio Inviato!' : 'Message Sent!'}</h3>
                <p>{lang === 'it' ? 'Ti risponderemo al più presto.' : 'We\'ll get back to you shortly.'}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', message: '' }) }}
                >
                  {lang === 'it' ? 'Invia un altro messaggio' : 'Send another message'}
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-form__group">
                  <label className="contact-form__label" htmlFor="contact-name">
                    {ct.formLabels.name}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    className="contact-form__input"
                    value={form.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="contact-form__group">
                  <label className="contact-form__label" htmlFor="contact-email">
                    {ct.formLabels.email}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    className="contact-form__input"
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="contact-form__group">
                  <label className="contact-form__label" htmlFor="contact-phone">
                    {ct.formLabels.phone}
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    className="contact-form__input"
                    value={form.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                  />
                </div>
                <div className="contact-form__group">
                  <label className="contact-form__label" htmlFor="contact-message">
                    {ct.formLabels.message}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="contact-form__input contact-form__textarea"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary contact-form__submit">
                  {ct.formLabels.send}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-section--bg {
          background-color: #faf8f4;
        }
        .contact-section__header {
          text-align: center;
          margin-bottom: clamp(40px, 6vw, 60px);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .contact-section__header.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .contact-section__sub {
          max-width: 520px;
          margin: 16px auto 0;
          font-size: 0.95rem;
          color: var(--color-text-muted);
          line-height: 1.7;
        }
        .contact-section__body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 5vw, 64px);
          align-items: start;
        }
        .contact-info-list {
          list-style: none;
          padding: 0;
          margin: 0 0 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .contact-info-list__item {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }
        .contact-info-list__icon {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(88,176,196,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-teal);
        }
        .contact-info-list__label {
          display: block;
          font-family: var(--font-nav);
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text-muted);
          margin-bottom: 3px;
        }
        .contact-info-list__value {
          display: block;
          font-size: 0.9rem;
          color: var(--color-espresso);
          line-height: 1.5;
        }
        .contact-info-list__link {
          text-decoration: none;
          transition: color 0.25s ease;
        }
        .contact-info-list__link:hover {
          color: var(--color-teal);
        }
        .contact-section__map-wrap {
          width: 100%;
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid rgba(86,51,17,0.1);
        }
        .contact-section__map {
          width: 100%;
          height: 280px;
          border: 0;
          display: block;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .contact-form__group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .contact-form__label {
          font-family: var(--font-nav);
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-espresso);
        }
        .contact-form__input {
          font-family: var(--font-body);
          font-size: 0.93rem;
          color: var(--color-espresso);
          background: #fff;
          border: 1.5px solid rgba(86,51,17,0.2);
          border-radius: 3px;
          padding: 12px 14px;
          width: 100%;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
          outline: none;
        }
        .contact-form__input:focus {
          border-color: var(--color-teal);
          box-shadow: 0 0 0 3px rgba(88,176,196,0.15);
        }
        .contact-form__textarea {
          resize: vertical;
          min-height: 120px;
        }
        .contact-form__submit {
          align-self: flex-start;
        }
        .contact-section__success {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          text-align: center;
          padding: 48px 24px;
        }
        .contact-section__success-icon {
          color: var(--color-teal);
        }
        .contact-section__success h3 {
          font-family: var(--font-title);
          font-size: 1.5rem;
          color: var(--color-espresso);
        }
        .contact-section__success p {
          color: var(--color-text-muted);
          font-size: 0.95rem;
        }
        @media (max-width: 900px) {
          .contact-section__body {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
