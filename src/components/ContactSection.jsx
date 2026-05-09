import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Phone, Mail, CheckCircle, Clock, Users, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useLanguage, useT } from '../context/LanguageContext.jsx'

function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.84 1.56V6.78a4.85 4.85 0 0 1-1.07-.09z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  )
}

const SOCIAL = [
  { Icon: TikTokIcon,    href: 'https://www.tiktok.com/@duma.suites?_r=1&_t=ZS-96748d7EBBH',             label: 'TikTok' },
  { Icon: InstagramIcon, href: 'https://www.instagram.com/duma.suitess?igsh=MTZlNTVkZHdhcnoxMQ==',       label: 'Instagram' },
  { Icon: WhatsAppIcon,  href: 'https://wa.me/254710933025',                                              label: 'WhatsApp' },
]

const CONTACT_SECTION_COPY = {
  en: {
    address: 'Address',
    phone: 'Phone',
    hours: 'Hours',
    hoursValue: 'We respond daily, 8 AM – 10 PM',
    concierge: 'Our concierge team is here to assist you with reservations, experiences, and any questions.',
    followUs: 'Follow us:',
    successTitle: 'Message Sent!',
    successBody: "Thank you — we'll reply within 24 hours.",
    sendAnother: 'Send another message',
    formIntro: 'Share your enquiry and a member of our team will personally get back to you within 24 hours.',
    replyNote: "✓ We'll reply within 24 hours.",
    moreDetails: 'Want more details?',
    visitContactPage: 'Visit Full Contact Page →',
  },
  it: {
    address: 'Indirizzo',
    phone: 'Telefono',
    hours: 'Orari',
    hoursValue: 'Disponibili tutti i giorni, 8:00 – 22:00',
    concierge: 'Il nostro team di concierge è a tua disposizione per prenotazioni, esperienze e qualsiasi richiesta speciale.',
    followUs: 'Seguici:',
    successTitle: 'Messaggio Inviato!',
    successBody: 'Grazie — ti risponderemo entro 24 ore.',
    sendAnother: 'Invia un altro messaggio',
    formIntro: 'Condividi la tua richiesta e un membro del nostro team ti risponderà personalmente entro 24 ore.',
    replyNote: '✓ Risponderemo entro 24 ore.',
    moreDetails: 'Vuoi maggiori informazioni?',
    visitContactPage: 'Visita la Pagina Contatti →',
  },
  de: {
    address: 'Adresse',
    phone: 'Telefon',
    hours: 'Öffnungszeiten',
    hoursValue: 'Täglich erreichbar, 8:00 – 22:00 Uhr',
    concierge: 'Unser Concierge-Team unterstützt Sie bei Reservierungen, Erlebnissen und allen Fragen.',
    followUs: 'Folgen Sie uns:',
    successTitle: 'Nachricht gesendet!',
    successBody: 'Vielen Dank — wir antworten innerhalb von 24 Stunden.',
    sendAnother: 'Weitere Nachricht senden',
    formIntro: 'Teilen Sie uns Ihre Anfrage mit und unser Team antwortet Ihnen persönlich innerhalb von 24 Stunden.',
    replyNote: '✓ Wir antworten innerhalb von 24 Stunden.',
    moreDetails: 'Möchten Sie mehr erfahren?',
    visitContactPage: 'Zur Kontaktseite →',
  },
  fr: {
    address: 'Adresse',
    phone: 'Téléphone',
    hours: 'Horaires',
    hoursValue: 'Disponibles tous les jours, de 8h à 22h',
    concierge: 'Notre équipe de conciergerie vous accompagne pour les réservations, expériences et toute demande.',
    followUs: 'Suivez-nous :',
    successTitle: 'Message envoyé !',
    successBody: 'Merci — nous vous répondrons sous 24 heures.',
    sendAnother: 'Envoyer un autre message',
    formIntro: 'Partagez votre demande et un membre de notre équipe vous répondra personnellement sous 24 heures.',
    replyNote: '✓ Nous vous répondrons sous 24 heures.',
    moreDetails: 'Besoin de plus d’informations ?',
    visitContactPage: 'Voir la page contact →',
  },
  es: {
    address: 'Dirección',
    phone: 'Teléfono',
    hours: 'Horario',
    hoursValue: 'Disponibles todos los días, de 8:00 a 22:00',
    concierge: 'Nuestro equipo de conserjería está aquí para ayudarle con reservas, experiencias y cualquier consulta.',
    followUs: 'Síganos:',
    successTitle: '¡Mensaje enviado!',
    successBody: 'Gracias — responderemos dentro de 24 horas.',
    sendAnother: 'Enviar otro mensaje',
    formIntro: 'Comparta su consulta y un miembro de nuestro equipo le responderá personalmente en un plazo de 24 horas.',
    replyNote: '✓ Le responderemos dentro de 24 horas.',
    moreDetails: '¿Quiere más detalles?',
    visitContactPage: 'Visitar la página de contacto →',
  },
}

export default function ContactSection() {
  const { lang } = useLanguage()
  const t = useT()
  const ct = t.contact
  const copy = CONTACT_SECTION_COPY[lang] || CONTACT_SECTION_COPY.en
  const navigate = useNavigate()

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
                  <span className="contact-info-list__label">{copy.address}</span>
                  <span className="contact-info-list__value">{ct.info.address}</span>
                </div>
              </li>
              <li className="contact-info-list__item">
                <div className="contact-info-list__icon">
                  <Phone size={18} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div>
                  <span className="contact-info-list__label">{copy.phone}</span>
                  <a href={`tel:${ct.info.phone.replace(/\s/g, '')}`} className="contact-info-list__value contact-info-list__link">
                    {ct.info.phone}
                  </a>
                </div>
              </li>
              <li className="contact-info-list__item">
                <div className="contact-info-list__icon">
                  <Phone size={18} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div>
                  <span className="contact-info-list__label">{ct.info.receptionLabel}</span>
                  <a href={`tel:${ct.info.receptionPhone.replace(/\s/g, '')}`} className="contact-info-list__value contact-info-list__link">
                    {ct.info.receptionPhone}
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
              <li className="contact-info-list__item">
                <div className="contact-info-list__icon">
                  <Clock size={18} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div>
                  <span className="contact-info-list__label">{copy.hours}</span>
                  <span className="contact-info-list__value">
                    {copy.hoursValue}
                  </span>
                </div>
              </li>
            </ul>

            {/* Concierge note */}
            <div className="contact-section__concierge">
              <Users size={16} strokeWidth={1.5} className="contact-section__concierge-icon" aria-hidden="true" />
              <p className="contact-section__concierge-text">
                {copy.concierge}
              </p>
            </div>

            {/* Reviews badges */}
            <div className="contact-section__reviews">
              <a
                href="https://www.tripadvisor.com"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-section__review-badge"
                aria-label="TripAdvisor reviews"
              >
                <div className="contact-section__review-badge-stars">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" strokeWidth={0} />)}
                </div>
                <span className="contact-section__review-badge-label">TripAdvisor</span>
              </a>
              <a
                href="https://www.google.com/search?q=Duma+Suites+Watamu"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-section__review-badge"
                aria-label="Google reviews"
              >
                <div className="contact-section__review-badge-stars">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" strokeWidth={0} />)}
                </div>
                <span className="contact-section__review-badge-label">Google Reviews</span>
              </a>
            </div>

            {/* Social follow */}
            <div className="contact-section__social">
              <p className="contact-section__social-label">
                {copy.followUs}
              </p>
              <div className="contact-section__social-links">
                {SOCIAL.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-section__social-link"
                    aria-label={label}
                  >
                    <Icon />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>

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
                <h3>{copy.successTitle}</h3>
                <p>{copy.successBody}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', message: '' }) }}
                >
                  {copy.sendAnother}
                </button>
              </div>
            ) : (
              <>
                <p className="contact-section__form-intro">
                  {copy.formIntro}
                </p>
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
                  <p className="contact-form__reply-note">
                    {copy.replyNote}
                  </p>
                </form>

                {/* CTA to full contact page */}
                <div className="contact-section__page-cta">
                  <p className="contact-section__page-cta-text">
                    {copy.moreDetails}
                  </p>
                  <button
                    className="btn btn-outline-espresso"
                    onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); navigate('/contact') }}
                  >
                    {copy.visitContactPage}
                  </button>
                </div>
              </>
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
        .contact-form__reply-note {
          font-size: 0.8rem;
          color: var(--color-teal);
          font-family: var(--font-body);
          margin-top: -8px;
        }
        .contact-section__concierge {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          background: rgba(88,176,196,0.07);
          border-left: 3px solid var(--color-teal);
          border-radius: 0 4px 4px 0;
          padding: 14px 16px;
          margin-bottom: 20px;
        }
        .contact-section__concierge-icon {
          flex-shrink: 0;
          color: var(--color-teal);
          margin-top: 2px;
        }
        .contact-section__concierge-text {
          font-size: 0.85rem;
          color: var(--color-espresso);
          line-height: 1.6;
          font-style: italic;
        }
        .contact-section__reviews {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .contact-section__review-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #fff;
          border: 1px solid rgba(86,51,17,0.12);
          border-radius: 4px;
          padding: 7px 12px;
          text-decoration: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .contact-section__review-badge:hover {
          border-color: var(--color-teal);
          box-shadow: 0 2px 12px rgba(88,176,196,0.15);
        }
        .contact-section__review-badge-stars {
          display: flex;
          gap: 2px;
          color: #f5a623;
        }
        .contact-section__review-badge-label {
          font-family: var(--font-nav);
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-espresso);
        }
        .contact-section__social {
          margin-bottom: 8px;
        }
        .contact-section__social-label {
          font-family: var(--font-nav);
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text-muted);
          margin-bottom: 10px;
        }
        .contact-section__social-links {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .contact-section__social-link {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 7px 13px;
          border: 1px solid rgba(86,51,17,0.15);
          border-radius: 100px;
          font-size: 0.75rem;
          font-family: var(--font-nav);
          letter-spacing: 0.06em;
          color: var(--color-espresso);
          text-decoration: none;
          transition: border-color 0.25s ease, color 0.25s ease, background 0.25s ease;
        }
        .contact-section__social-link:hover {
          border-color: var(--color-teal);
          color: var(--color-teal);
          background: rgba(88,176,196,0.06);
        }
        .contact-section__page-cta {
          margin-top: 28px;
          padding-top: 24px;
          border-top: 1px solid rgba(86,51,17,0.1);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .contact-section__page-cta-text {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }
        .btn-outline-espresso {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-nav);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-espresso);
          background: none;
          border: 1.5px solid rgba(86,51,17,0.3);
          border-radius: 3px;
          padding: 12px 22px;
          cursor: pointer;
          transition: border-color 0.25s ease, color 0.25s ease, background 0.25s ease;
          align-self: flex-start;
        }
        .btn-outline-espresso:hover {
          border-color: var(--color-espresso);
          background: var(--color-espresso);
          color: #fff;
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
