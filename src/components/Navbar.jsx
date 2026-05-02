import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, MapPin } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Suites', href: '#suites' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Experience', href: '#experience' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <>
      <motion.header
        className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Top bar */}
        <div className="navbar__topbar">
          <div className="navbar__topbar-inner">
            <span className="navbar__topbar-item">
              <Phone size={12} strokeWidth={1.5} />
              +254 700 000 000
            </span>
            <span className="navbar__topbar-item">
              <MapPin size={12} strokeWidth={1.5} />
              Ghepard Towers, Watamu, Kenya
            </span>
          </div>
        </div>

        {/* Main nav */}
        <div className="navbar__main">
          {/* Logo */}
          <a href="#" className="navbar__logo" aria-label="Duma Suites Home">
            <span className="navbar__logo-text">Duma Suites</span>
            <span className="navbar__logo-tagline">Watamu · Coastal Luxury</span>
          </a>

          {/* Desktop links */}
          <nav className="navbar__links" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="navbar__link">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a href="#booking" className="btn btn-primary navbar__cta">
            Book Now
          </a>

          {/* Mobile toggle */}
          <button
            className="navbar__toggle"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            <nav aria-label="Mobile navigation">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="navbar__drawer-link"
                  onClick={handleLinkClick}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#booking"
                className="btn btn-primary navbar__drawer-cta"
                onClick={handleLinkClick}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.06 + 0.1 }}
              >
                Book Now
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: background-color 0.4s ease, box-shadow 0.4s ease;
        }
        .navbar--scrolled {
          background-color: var(--color-bg-primary);
          box-shadow: 0 2px 24px rgba(86, 51, 17, 0.1);
        }
        .navbar__topbar {
          background-color: var(--color-espresso);
          color: var(--color-text-light);
          font-family: var(--font-body);
          font-size: 0.72rem;
          letter-spacing: 0.05em;
          padding: 6px var(--section-px);
        }
        .navbar__topbar-inner {
          display: flex;
          justify-content: flex-end;
          gap: 2rem;
          max-width: 1200px;
          margin-inline: auto;
        }
        .navbar__topbar-item {
          display: flex;
          align-items: center;
          gap: 6px;
          opacity: 0.85;
        }
        .navbar__main {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 16px var(--section-px);
          max-width: 1200px;
          margin-inline: auto;
        }
        .navbar__logo {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          gap: 2px;
        }
        .navbar__logo-text {
          font-family: var(--font-nav);
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--color-espresso);
          text-transform: uppercase;
          line-height: 1;
        }
        .navbar__logo-tagline {
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          color: var(--color-teal);
          text-transform: uppercase;
        }
        .navbar__links {
          display: flex;
          gap: clamp(1rem, 2.5vw, 2rem);
          align-items: center;
        }
        .navbar__link {
          font-family: var(--font-nav);
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-espresso);
          text-decoration: none;
          position: relative;
          padding-bottom: 2px;
          transition: color 0.25s ease;
        }
        .navbar__link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1.5px;
          background: var(--color-teal);
          transition: width 0.3s ease;
        }
        .navbar__link:hover {
          color: var(--color-teal);
        }
        .navbar__link:hover::after {
          width: 100%;
        }
        .navbar__cta {
          font-size: 0.65rem;
          padding: 10px 24px;
        }
        .navbar__toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-espresso);
          padding: 4px;
        }
        .navbar__drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: min(320px, 85vw);
          background-color: var(--color-bg-primary);
          z-index: 999;
          display: flex;
          flex-direction: column;
          padding: 80px 40px 40px;
          box-shadow: -8px 0 40px rgba(86, 51, 17, 0.15);
          overflow-y: auto;
        }
        .navbar__drawer nav {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .navbar__drawer-link {
          font-family: var(--font-nav);
          font-size: 0.85rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-espresso);
          text-decoration: none;
          transition: color 0.25s ease;
        }
        .navbar__drawer-link:hover {
          color: var(--color-teal);
        }
        .navbar__drawer-cta {
          margin-top: 0.5rem;
          text-align: center;
        }
        @media (max-width: 900px) {
          .navbar__links,
          .navbar__cta {
            display: none;
          }
          .navbar__toggle {
            display: block;
          }
        }
        @media (min-width: 901px) {
          .navbar__drawer {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
