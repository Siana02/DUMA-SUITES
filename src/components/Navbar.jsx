import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, MapPin } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import logoImg from '../assets/mammal.png'
import { useLanguage } from '../context/LanguageContext.jsx'
import { getT } from '../i18n/translations.js'

// Navbar appears as the preload curtains finish opening (~2.8 s)
const NAVBAR_APPEAR_DELAY = 2.8

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [activeHref, setActiveHref] = useState('/')
  const activeHrefRef               = useRef('/')

  const location = useLocation()
  const navigate = useNavigate()
  const { lang, toggleLang } = useLanguage()
  const t = getT(lang)

  const NAV_LINKS = [
    { label: t.nav.home,    href: '/',         isRoute: true },
    { label: t.nav.suites,  href: '/suites',   isRoute: true },
    { label: t.nav.gallery, href: '/gallery',  isRoute: true },
    { label: t.nav.blog,    href: '/blog',     isRoute: true },
    { label: t.nav.about,   href: '/#about',   isRoute: false },
    { label: t.nav.contact, href: '/#contact', isRoute: false },
  ]

  // If we are on a /suites/* route, mark the Suites link active immediately
  useEffect(() => {
    if (location.pathname.startsWith('/suites')) {
      activeHrefRef.current = '/suites'
      setActiveHref('/suites')
    } else if (location.pathname === '/gallery') {
      activeHrefRef.current = '/gallery'
      setActiveHref('/gallery')
    } else if (location.pathname.startsWith('/blog')) {
      activeHrefRef.current = '/blog'
      setActiveHref('/blog')
    } else if (location.pathname === '/contact') {
      activeHrefRef.current = '/#contact'
      setActiveHref('/#contact')
    } else if (location.pathname === '/') {
      activeHrefRef.current = '/'
      setActiveHref('/')
    }
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Intersection Observer — auto-highlight the nav item whose section is in view
  // Only active on the home page
  useEffect(() => {
    if (location.pathname !== '/') return

    // Map section IDs to nav hrefs (only sections that actually exist in the DOM)
    const sectionMap = {
      home:             '/',
      'suites-preview': '/suites',
      about:            '/#about',
      contact:          '/#contact',
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const href = sectionMap[entry.target.id]
            if (href && href !== activeHrefRef.current) {
              activeHrefRef.current = href
              setActiveHref(href)
            }
          }
        })
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
    )

    Object.keys(sectionMap).forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })

    return () => obs.disconnect()
  }, [location.pathname])

  const handleLinkClick = (href, isRoute) => {
    if (isRoute) {
      activeHrefRef.current = href
      setActiveHref(href)
      navigate(href)
    } else if (href.startsWith('/#')) {
      const sectionId = href.slice(2)
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      } else {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setMenuOpen(false)
  }

  const isHomePage = location.pathname === '/'
  const forceScrolled = !isHomePage || menuOpen
  const navbarClass = `navbar${scrolled || forceScrolled ? ' navbar--scrolled' : ''}`

  return (
    <>
      <motion.header
        className={navbarClass}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: NAVBAR_APPEAR_DELAY, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="navbar__inner">
          {/* ── Left: Logo ── */}
          <a href="/" className="navbar__logo" onClick={e => { e.preventDefault(); navigate('/') }} aria-label="Duma Suites – Home">
            <img
              src={logoImg}
              alt=""
              className="navbar__logo-img"
              aria-hidden="true"
            />
            <div className="navbar__logo-text-group">
              <span className="navbar__logo-name">Duma Suites</span>
              <span className="navbar__logo-tagline">Watamu · Coastal Luxury</span>
            </div>
          </a>

          {/* ── Center: Desktop nav ── */}
          <nav className="navbar__links" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`navbar__link${activeHref === link.href ? ' navbar__link--active' : ''}`}
                onClick={e => { e.preventDefault(); handleLinkClick(link.href, link.isRoute) }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* ── Right: Location + lang toggle + mobile toggle ── */}
          <div className="navbar__right">
            <span className="navbar__location">
              <MapPin size={13} strokeWidth={1.5} aria-hidden="true" />
              Watamu, KE
            </span>
            <button
              className="navbar__lang-toggle"
              onClick={toggleLang}
              aria-label="Switch language"
            >
              {lang === 'en' ? 'IT' : 'EN'}
            </button>
            <button
              className="navbar__toggle"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__drawer"
            initial={{ x: '100%', opacity: 0.6 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.6 }}
            transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
          >
            <nav aria-label="Mobile navigation">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className={`navbar__drawer-link${activeHref === link.href ? ' navbar__drawer-link--active' : ''}`}
                  onClick={e => { e.preventDefault(); handleLinkClick(link.href, link.isRoute) }}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Language toggle in drawer */}
            <button className="navbar__lang-toggle navbar__lang-toggle--drawer" onClick={toggleLang} aria-label="Switch language">
              {lang === 'en' ? '🇮🇹 Italiano' : '🇬🇧 English'}
            </button>

            {/* Location in drawer */}
            <motion.span
              className="navbar__drawer-location"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: NAV_LINKS.length * 0.06 + 0.18 }}
            >
              <MapPin size={13} strokeWidth={1.5} aria-hidden="true" />
              Watamu, Kenya
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* ── Base ── */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition:
            background-color 0.4s ease,
            backdrop-filter 0.4s ease,
            box-shadow 0.4s ease;
        }

        /* Scrolled state — solid + blur */
        .navbar--scrolled {
          background-color: rgba(247, 241, 229, 0.97);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 2px 28px rgba(86, 51, 17, 0.10);
        }

        /* ── Inner layout (3-column) ── */
        .navbar__inner {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 1rem;
          padding: 18px var(--section-px);
          max-width: 1280px;
          margin-inline: auto;
        }

        /* ── Logo (left column) ── */
        .navbar__logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          justify-self: start;
        }
        .navbar__logo-img {
          width: 46px;
          height: 46px;
          object-fit: contain;
          border-radius: 0;
          transition: filter 0.4s ease;
          /* White version over hero */
          filter: brightness(0) invert(1);
        }
        .navbar--scrolled .navbar__logo-img {
          filter: none;
        }
        .navbar__logo-text-group {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .navbar__logo-name {
          font-family: var(--font-nav);
          font-size: clamp(0.95rem, 1.6vw, 1.2rem);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #ffffff;
          line-height: 1;
          transition: color 0.4s ease;
        }
        .navbar--scrolled .navbar__logo-name {
          color: var(--color-espresso);
        }
        .navbar__logo-tagline {
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.70);
          transition: color 0.4s ease;
        }
        .navbar--scrolled .navbar__logo-tagline {
          color: var(--color-teal);
        }

        /* ── Nav links (center column) ── */
        .navbar__links {
          display: flex;
          gap: clamp(1rem, 2.5vw, 2.2rem);
          align-items: center;
          justify-self: center;
        }
        .navbar__link {
          font-family: var(--font-nav);
          font-size: 0.66rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.88);
          text-decoration: none;
          position: relative;
          padding-bottom: 3px;
          transition: color 0.25s ease;
        }
        .navbar--scrolled .navbar__link {
          color: var(--color-espresso);
        }
        /* Underline slide-in from left on hover */
        .navbar__link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1.5px;
          background: var(--color-teal);
          transition: width 0.28s ease;
        }
        .navbar__link:hover {
          color: var(--color-teal);
        }
        .navbar__link:hover::after {
          width: 100%;
        }

        /* ── Desktop only: glassmorphic pill + active colour-inverse ── */
        @media (min-width: 901px) {
          .navbar__links {
            background: rgba(255, 255, 255, 0.09);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            border: 1px solid rgba(255, 255, 255, 0.14);
            border-radius: 100px;
            padding: 6px 20px;
            transition:
              background 0.4s ease,
              border-color 0.4s ease,
              backdrop-filter 0.4s ease;
          }
          .navbar--scrolled .navbar__links {
            background: rgba(86, 51, 17, 0.05);
            border-color: rgba(86, 51, 17, 0.09);
          }

          /* Active link — espresso pill stays white in both transparent and scrolled states */
          .navbar__link--active,
          .navbar--scrolled .navbar__link--active {
            color: #ffffff;
          }
          .navbar__link--active::before {
            content: '';
            position: absolute;
            inset: -5px -13px;
            border-radius: 100px;
            background: var(--color-espresso);
            z-index: -1;
            transition: background 0.3s ease;
          }
          /* Keep the hover underline hidden while a pill is showing */
          .navbar__link--active::after,
          .navbar__link--active:hover::after {
            width: 0;
          }
        }

        /* ── Right column ── */
        .navbar__right {
          display: flex;
          align-items: center;
          gap: 1rem;
          justify-self: end;
        }
        .navbar__lang-toggle {
          font-family: var(--font-nav);
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: none;
          border: 1px solid rgba(255,255,255,0.5);
          color: rgba(255,255,255,0.88);
          padding: 3px 10px;
          border-radius: 100px;
          cursor: pointer;
          transition: border-color 0.3s ease, color 0.3s ease, background 0.3s ease;
          white-space: nowrap;
        }
        .navbar--scrolled .navbar__lang-toggle {
          border-color: rgba(86,51,17,0.4);
          color: var(--color-espresso);
        }
        .navbar__lang-toggle:hover {
          border-color: var(--color-teal);
          color: var(--color-teal);
        }
        .navbar__lang-toggle--drawer {
          font-family: var(--font-nav);
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: none;
          border: 1px solid rgba(86,51,17,0.3);
          color: var(--color-espresso);
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          text-align: left;
          width: fit-content;
        }
        .navbar__location {
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-lora);
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          color: rgba(255, 255, 255, 0.80);
          transition: color 0.4s ease;
          white-space: nowrap;
        }
        .navbar--scrolled .navbar__location {
          color: var(--color-espresso);
        }

        /* Mobile toggle (hidden on desktop) */
        .navbar__toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: #ffffff;
          padding: 4px;
          transition: color 0.4s ease;
          line-height: 0;
        }
        .navbar--scrolled .navbar__toggle {
          color: var(--color-espresso);
        }

        /* ── Mobile backdrop ── */
        .navbar__backdrop {
          position: fixed;
          inset: 0;
          z-index: 998;
          background: rgba(0, 0, 0, 0.35);
        }

        /* ── Mobile drawer ── */
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
          padding: 88px 40px 48px;
          box-shadow: -8px 0 48px rgba(86, 51, 17, 0.15);
          overflow-y: auto;
          gap: 2rem;
        }
        .navbar__drawer nav {
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
        }
        .navbar__drawer-link {
          font-family: var(--font-nav);
          font-size: 0.88rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-espresso);
          text-decoration: none;
          transition: color 0.25s ease;
          padding-bottom: 4px;
          position: relative;
        }
        .navbar__drawer-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1.5px;
          background: var(--color-teal);
          transition: width 0.28s ease;
        }
        .navbar__drawer-link:hover,
        .navbar__drawer-link--active {
          color: var(--color-teal);
        }
        .navbar__drawer-link:hover::after,
        .navbar__drawer-link--active::after {
          width: 100%;
        }
        .navbar__drawer-location {
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-lora);
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          color: var(--color-text-muted);
          margin-top: auto;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .navbar__links,
          .navbar__location {
            display: none;
          }
          .navbar__toggle {
            display: block;
          }
          .navbar__inner {
            grid-template-columns: 1fr auto;
          }
        }
        @media (min-width: 901px) {
          .navbar__drawer,
          .navbar__backdrop {
            display: none !important;
          }
        }
      `}</style>
    </>
  )
}
