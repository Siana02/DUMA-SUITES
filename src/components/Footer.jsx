import { Mail, Phone, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import logoImg from '../assets/logo.jpeg'
import mammalImg from '../assets/mammal.png'
import { useT } from '../i18n/useT.js'
import { SUITE_NAV_ORDER } from '../constants/suiteRoutes'

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
  { Icon: TikTokIcon,    href: 'https://www.tiktok.com/@duma.suites?_r=1&_t=ZS-96748d7EBBH',                      label: 'TikTok' },
  { Icon: InstagramIcon, href: 'https://www.instagram.com/duma.suitess?igsh=MTZlNTVkZHdhcnoxMQ==',              label: 'Instagram' },
  { Icon: WhatsAppIcon,  href: 'https://wa.me/254710933025',                                                     label: 'WhatsApp' },
]

export default function Footer() {
  const t = useT()
  const navigate = useNavigate()
  const suiteOrderIndex = (href) => {
    const index = SUITE_NAV_ORDER.indexOf(href)
    return index === -1 ? Number.MAX_SAFE_INTEGER : index
  }
  const suiteLinks = [...t.footer.suitesLinks].sort(
    (a, b) => suiteOrderIndex(a.href) - suiteOrderIndex(b.href)
  )
  const addedServicesTitle = t.footer.addedServicesTitle ?? 'Added Services'
  const addedServices = t.footer.addedServices ?? [
    'Private chef on demand',
    'Airport transfers to and from Mombasa & Malindi airports',
    'Backup battery system in every apartment',
  ]

  const EXPLORE_LINKS = [
    { label: t.footer.links.gallery,    href: '/gallery',      isRoute: true },
    { label: t.footer.links.about,      href: '/#about',       isRoute: false },
    { label: t.footer.links.faq,        href: '/#faq',         isRoute: false },
    { label: t.footer.links.excursions, href: '/#excursions',  isRoute: false },
    { label: t.footer.links.blog,       href: '/blog',         isRoute: true },
  ]

  const handleRouteClick = (e, href) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'instant' })
    navigate(href)
  }

  const handleExploreClick = (e, link) => {
    e.preventDefault()
    if (link.isRoute) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      navigate(link.href)
    } else if (link.href.startsWith('/#')) {
      const id = link.href.slice(2)
      navigate('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <footer className="footer" id="footer">
      <div className="footer__inner container">
        {/* Brand column */}
        <div className="footer__brand">
          {/* Top: mammal + wordmark */}
          <div className="footer__wordmark">
            <img src={mammalImg} alt="" className="footer__wordmark-mammal" aria-hidden="true" loading="lazy" />
            <div className="footer__wordmark-text">
              <span className="footer__wordmark-name">Duma Suites</span>
              <span className="footer__wordmark-tagline">{t.footer.tagline}</span>
            </div>
          </div>

          {/* Logo showcase box */}
          <a
            href="/"
            onClick={e => handleRouteClick(e, '/')}
            className="footer__logo-showcase"
            aria-label="Duma Suites Home"
          >
            <img src={logoImg} alt="Duma Suites crest" className="footer__logo-showcase__img" loading="lazy" />
            <div className="footer__logo-showcase__overlay" aria-hidden="true" />
          </a>

          <p className="footer__brand-desc">{t.footer.desc}</p>
          <div className="footer__social">
            {SOCIAL.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Suites column */}
        <div className="footer__col">
          <h3 className="footer__col-title">{t.footer.colSuites}</h3>
          <ul className="footer__list">
            {suiteLinks.map(({ label, href }) => (
              <li key={href}>
                <a href={href} onClick={e => handleRouteClick(e, href)} className="footer__link">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Explore column */}
        <div className="footer__col">
          <h3 className="footer__col-title">{t.footer.colExplore}</h3>
          <ul className="footer__list">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={e => handleExploreClick(e, link)} className="footer__link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="footer__added-services">
            <h4 className="footer__added-services-title">{addedServicesTitle}</h4>
            <ul className="footer__added-services-list">
              {addedServices.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact column */}
        <div className="footer__col">
          <h3 className="footer__col-title">{t.footer.colContact}</h3>
          <ul className="footer__contact-list">
            <li>
              <MapPin size={14} strokeWidth={1.5} />
              <span>{t.contact.info.address}</span>
            </li>
            <li>
              <Phone size={14} strokeWidth={1.5} />
              <a href={`tel:${t.contact.info.phone.replace(/\s/g,'')}`} className="footer__link">
                {t.contact.info.phone}
              </a>
            </li>
            <li>
              <Mail size={14} strokeWidth={1.5} />
              <a href={`mailto:${t.contact.info.email}`} className="footer__link">
                {t.contact.info.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">{t.footer.copy}</p>
          <nav className="footer__legal" aria-label="Legal navigation">
            <a href="/privacy-policy" onClick={e => handleRouteClick(e, '/privacy-policy')} className="footer__link">{t.footer.privacy}</a>
            <a href="/terms-of-service" onClick={e => handleRouteClick(e, '/terms-of-service')} className="footer__link">{t.footer.terms}</a>
            <a href="/house-rules" onClick={e => handleRouteClick(e, '/house-rules')} className="footer__link">
              {t.footer.houseRules}
            </a>
            <a href="/cookies" onClick={e => handleRouteClick(e, '/cookies')} className="footer__link">{t.footer.cookies}</a>
          </nav>
        </div>
      </div>

      <style>{`
        .footer {
          background-color: #1c1c1c;
          color: rgba(255, 255, 255, 0.72);
          font-family: var(--font-body);
          font-size: 0.88rem;
          line-height: 1.65;
        }
        .footer__inner {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: clamp(32px, 5vw, 64px);
          padding-block: clamp(48px, 6vw, 80px);
        }

        /* ── Brand column ── */
        .footer__brand {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Wordmark row: mammal icon + text */
        .footer__wordmark {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .footer__wordmark-mammal {
          width: 76px;
          height: 76px;
          object-fit: contain;
          filter: brightness(0) invert(1);
          opacity: 0.88;
          flex-shrink: 0;
          transform: translateY(-3px);
        }
        .footer__wordmark-text {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .footer__wordmark-name {
          font-family: var(--font-nav);
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          color: #fff;
          text-transform: uppercase;
          line-height: 1;
        }
        .footer__wordmark-tagline {
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          color: var(--color-teal);
          text-transform: uppercase;
        }

        /* Logo showcase box */
        .footer__logo-showcase {
          display: block;
          position: relative;
          width: 160px;
          height: 140px;
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 4px 24px rgba(0,0,0,0.45);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          flex-shrink: 0;
        }
        .footer__logo-showcase:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 36px rgba(0,0,0,0.6);
        }
        .footer__logo-showcase__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .footer__logo-showcase__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.22) 0%, transparent 60%);
          pointer-events: none;
        }

        .footer__brand-desc {
          color: rgba(255, 255, 255, 0.52);
          font-size: 0.85rem;
          max-width: 280px;
        }
        .footer__social {
          display: flex;
          gap: 10px;
        }
        .footer__social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 2px;
          color: rgba(255, 255, 255, 0.58);
          transition: border-color var(--transition-base), color var(--transition-base), background-color var(--transition-base);
        }
        .footer__social-link:hover {
          border-color: var(--color-teal);
          color: var(--color-teal);
          background-color: rgba(201, 169, 110, 0.1);
        }

        /* ── Columns ── */
        .footer__col-title {
          font-family: var(--font-nav);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.9);
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .footer__list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer__link {
          color: rgba(255, 255, 255, 0.55);
          text-decoration: none;
          font-size: 0.85rem;
          transition: color var(--transition-base);
        }
        .footer__link:hover {
          color: var(--color-teal);
        }
        .footer__added-services {
          margin-top: 18px;
        }
        .footer__added-services-title {
          font-family: var(--font-nav);
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.82);
          margin-bottom: 10px;
        }
        .footer__added-services-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .footer__added-services-list li {
          position: relative;
          padding-left: 12px;
          color: rgba(255, 255, 255, 0.55);
          font-size: 0.82rem;
          line-height: 1.5;
        }
        .footer__added-services-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.62em;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--color-teal);
          transform: translateY(-50%);
        }
        .footer__contact-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer__contact-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: rgba(255, 255, 255, 0.55);
          font-size: 0.85rem;
        }
        .footer__contact-list li svg {
          flex-shrink: 0;
          color: var(--color-teal);
          margin-top: 3px;
        }

        /* ── Bottom bar ── */
        .footer__bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          padding-block: 20px;
        }
        .footer__bottom-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding-block: 0;
        }
        .footer__copy {
          font-size: 0.78rem;
          color: rgba(255, 255, 255, 0.32);
        }
        .footer__legal {
          display: flex;
          gap: 24px;
        }
        .footer__legal .footer__link {
          font-size: 0.78rem;
        }

        @media (max-width: 900px) {
          .footer__inner {
            grid-template-columns: 1fr 1fr;
          }
          .footer__brand {
            grid-column: span 2;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 28px;
            align-items: flex-start;
          }
          .footer__brand > .footer__brand-desc,
          .footer__brand > .footer__social {
            width: 100%;
          }
        }
        @media (max-width: 560px) {
          .footer__inner {
            grid-template-columns: 1fr;
          }
          .footer__brand {
            grid-column: span 1;
            flex-direction: column;
          }
          .footer__bottom-inner {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  )
}
