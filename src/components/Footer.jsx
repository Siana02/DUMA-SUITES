import { Mail, Phone, MapPin } from 'lucide-react'

const SUITE_LINKS = [
  { label: 'Ocean Suite', href: '#ocean-suite' },
  { label: 'Garden Suite', href: '#garden-suite' },
  { label: 'Penthouse Suite', href: '#penthouse' },
  { label: 'Family Suite', href: '#family-suite' },
]

const EXPLORE_LINKS = [
  { label: 'Amenities', href: '#amenities' },
  { label: 'Experiences', href: '#experience' },
  { label: 'Dining', href: '#amenities' },
  { label: 'Wellness', href: '#amenities' },
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
  return (
    <footer className="footer" id="contact">
      <div className="footer__inner container">
        {/* Brand column */}
        <div className="footer__brand">
          <a href="#" className="footer__logo" aria-label="Duma Suites Home">
            <span className="footer__logo-text">Duma Suites</span>
            <span className="footer__logo-tagline">Watamu · Coastal Luxury</span>
          </a>
          <p className="footer__brand-desc">
            Nestled within Ghepard Towers, Watamu — just 50 metres from the
            white sands and turquoise waters of the Indian Ocean.
          </p>
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
          <h3 className="footer__col-title">Suites</h3>
          <ul className="footer__list">
            {SUITE_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a href={href} className="footer__link">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Explore column */}
        <div className="footer__col">
          <h3 className="footer__col-title">Explore</h3>
          <ul className="footer__list">
            {EXPLORE_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="footer__link">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact column */}
        <div className="footer__col">
          <h3 className="footer__col-title">Contact</h3>
          <ul className="footer__contact-list">
            <li>
              <MapPin size={14} strokeWidth={1.5} />
              <span>Ghepard Towers, Watamu, Kilifi County, Kenya</span>
            </li>
            <li>
              <Phone size={14} strokeWidth={1.5} />
              <a href="tel:+254700000000" className="footer__link">
                +254 700 000 000
              </a>
            </li>
            <li>
              <Mail size={14} strokeWidth={1.5} />
              <a href="mailto:reservations@dumasuites.com" className="footer__link">
                reservations@dumasuites.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">
            &copy; {new Date().getFullYear()} Duma Suites. All rights reserved.
          </p>
          <nav className="footer__legal" aria-label="Legal navigation">
            <a href="#" className="footer__link">
              Privacy Policy
            </a>
            <a href="#" className="footer__link">
              Terms of Service
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
          flex-direction: column;
          gap: 4px;
          text-decoration: none;
          margin-bottom: 16px;
        }
        .footer__logo-text {
          font-family: var(--font-nav);
          font-size: 1.3rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--color-text-light);
          text-transform: uppercase;
          line-height: 1;
        }
        .footer__logo-tagline {
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          color: var(--color-teal);
          text-transform: uppercase;
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
