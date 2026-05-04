import { Mail, Phone, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import logoImg from '../assets/logo.jpeg'
import { useLanguage } from '../context/LanguageContext.jsx'
import { getT } from '../i18n/translations.js'

const SUITE_LINKS = [
  { label: 'Coastal Haven Suite', href: '/suites/coastal-haven' },
  { label: 'Serenity Villa Suite', href: '/suites/serenity-villa' },
  { label: 'All Suites', href: '/suites' },
]

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const SOCIAL = [
  { Icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
  { Icon: FacebookIcon, href: 'https://facebook.com', label: 'Facebook' },
  { Icon: XIcon, href: 'https://twitter.com', label: 'Twitter / X' },
]

export default function Footer() {
  const { lang } = useLanguage()
  const t = getT(lang)
  const navigate = useNavigate()

  const EXPLORE_LINKS = [
    { label: t.footer.links.gallery,    href: '/gallery',      isRoute: true },
    { label: t.footer.links.about,      href: '/#about',       isRoute: false },
    { label: t.footer.links.faq,        href: '/#faq',         isRoute: false },
    { label: t.footer.links.excursions, href: '/#excursions',  isRoute: false },
  ]

  const handleExploreClick = (e, link) => {
    e.preventDefault()
    if (link.isRoute) {
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
          <a href="/" onClick={e => { e.preventDefault(); navigate('/') }} className="footer__logo" aria-label="Duma Suites Home">
            <img src={logoImg} alt="Duma Suites" className="footer__logo-img" />
            <div>
              <span className="footer__logo-text">Duma Suites</span>
              <span className="footer__logo-tagline">{t.footer.tagline}</span>
            </div>
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
                <Icon size={18} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {/* Suites column */}
        <div className="footer__col">
          <h3 className="footer__col-title">{t.footer.colSuites}</h3>
          <ul className="footer__list">
            {SUITE_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a href={href} onClick={e => { e.preventDefault(); navigate(href) }} className="footer__link">
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
            <a href="#" className="footer__link">{t.footer.privacy}</a>
            <a href="#" className="footer__link">{t.footer.terms}</a>
            <a href="/house-rules" onClick={e => { e.preventDefault(); navigate('/house-rules') }} className="footer__link">
              {t.footer.houseRules}
            </a>
          </nav>
        </div>
      </div>

      <style>{`
        .footer {
          background-color: var(--color-espresso);
          color: rgba(255, 255, 255, 0.75);
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
        .footer__logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          margin-bottom: 16px;
        }
        .footer__logo-img {
          width: 48px;
          height: 48px;
          object-fit: cover;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.2);
        }
        .footer__logo-text {
          display: block;
          font-family: var(--font-nav);
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--color-text-light);
          text-transform: uppercase;
          line-height: 1;
        }
        .footer__logo-tagline {
          display: block;
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          color: var(--color-teal);
          text-transform: uppercase;
          margin-top: 3px;
        }
        .footer__brand-desc {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.85rem;
          max-width: 280px;
          margin-bottom: 20px;
        }
        .footer__social {
          display: flex;
          gap: 12px;
        }
        .footer__social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.6);
          transition: border-color var(--transition-base), color var(--transition-base), background-color var(--transition-base);
        }
        .footer__social-link:hover {
          border-color: var(--color-teal);
          color: var(--color-teal);
          background-color: rgba(88, 176, 196, 0.1);
        }
        .footer__col-title {
          font-family: var(--font-nav);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-text-light);
          margin-bottom: 20px;
        }
        .footer__list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer__link {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 0.85rem;
          transition: color var(--transition-base);
        }
        .footer__link:hover {
          color: var(--color-teal);
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
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.85rem;
        }
        .footer__contact-list li svg {
          flex-shrink: 0;
          color: var(--color-teal);
          margin-top: 3px;
        }
        .footer__bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
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
          color: rgba(255, 255, 255, 0.4);
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
          }
        }
        @media (max-width: 560px) {
          .footer__inner {
            grid-template-columns: 1fr;
          }
          .footer__brand {
            grid-column: span 1;
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
