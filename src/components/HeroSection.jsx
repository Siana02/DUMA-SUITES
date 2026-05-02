import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { gsap } from 'gsap'
import { ChevronDown, ArrowRight } from 'lucide-react'

export default function HeroSection() {
  const headingRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const badgeRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.3 },
    )
      .fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1 },
        '-=0.4',
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5',
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.4',
      )
  }, [])

  return (
    <section className="hero" id="hero">
      {/* Background overlay */}
      <div className="hero__bg" aria-hidden="true" />

      <div className="hero__content">
        {/* Eyebrow */}
        <span ref={badgeRef} className="hero__eyebrow" style={{ opacity: 0 }}>
          <span className="eyebrow-inner">Watamu · Indian Ocean</span>
        </span>

        {/* Main heading */}
        <h1 ref={headingRef} className="hero__heading" style={{ opacity: 0 }}>
          Where the Ocean
          <br />
          <em>Meets Elegance</em>
        </h1>

        {/* Subtitle */}
        <p ref={subtitleRef} className="hero__subtitle" style={{ opacity: 0 }}>
          Nestled within Ghepard Towers, just 50 metres from the white sands of
          Watamu — Duma Suites redefines coastal luxury living.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="hero__ctas" style={{ opacity: 0 }}>
          <a href="#booking" className="btn btn-primary hero__btn">
            Reserve a Suite
            <ArrowRight size={14} strokeWidth={2} />
          </a>
          <a href="#suites" className="btn btn-inverse-light hero__btn">
            Explore Suites
          </a>
        </div>
      </div>

      {/* Tilt card – floating badge, positioned relative to full hero */}
      <Tilt
        className="hero__tilt-card"
        tiltMaxAngleX={8}
        tiltMaxAngleY={8}
        glareEnable
        glareMaxOpacity={0.12}
        glareColor="#ffffff"
        glareBorderRadius="0"
        transitionSpeed={1500}
      >
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className="hero__badge-number">50m</span>
          <span className="hero__badge-label">From the Ocean</span>
        </motion.div>
      </Tilt>

      {/* Scroll indicator */}
      <motion.a
        href="#suites"
        className="hero__scroll"
        aria-label="Scroll to suites"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown size={24} strokeWidth={1.5} />
        </motion.span>
      </motion.a>

      <style>{`
        .hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          overflow: hidden;
          background: linear-gradient(
            135deg,
            #1a3a4a 0%,
            #1e4d5e 30%,
            #2a6b7c 55%,
            #3d8fa0 75%,
            #58b0c4 100%
          );
          padding: 120px var(--section-px) 80px;
        }
        .hero__bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 70% 60%, rgba(88, 176, 196, 0.35) 0%, transparent 60%),
            radial-gradient(ellipse at 10% 80%, rgba(86, 51, 17, 0.25) 0%, transparent 50%);
          pointer-events: none;
        }
        .hero__content {
          position: relative;
          z-index: 2;
          max-width: 640px;
        }
        .hero__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 1.5rem;
        }
        .eyebrow-inner {
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: 0.8rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.75);
        }
        .eyebrow-inner::before {
          content: '— ';
        }
        .hero__heading {
          font-family: var(--font-title);
          font-size: clamp(3rem, 7vw, 5.5rem);
          font-weight: 300;
          color: var(--color-text-light);
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }
        .hero__heading em {
          font-style: italic;
          color: #b8dde7;
        }
        .hero__subtitle {
          font-family: var(--font-body);
          font-size: clamp(0.95rem, 1.5vw, 1.1rem);
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.75;
          max-width: 480px;
          margin-bottom: 2.5rem;
        }
        .hero__ctas {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .hero__btn {
          font-size: 0.7rem;
        }
        .hero__tilt-card {
          position: absolute;
          right: clamp(60px, 10vw, 160px);
          top: 50%;
          transform: translateY(-50%);
          z-index: 3;
        }
        .hero__badge {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 32px 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          min-width: 160px;
        }
        .hero__badge-number {
          font-family: var(--font-title);
          font-size: 3.5rem;
          font-weight: 300;
          color: var(--color-text-light);
          line-height: 1;
        }
        .hero__badge-label {
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
        }
        .hero__scroll {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255, 255, 255, 0.6);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: color var(--transition-base);
          z-index: 2;
        }
        .hero__scroll:hover {
          color: rgba(255, 255, 255, 0.9);
        }
        @media (max-width: 900px) {
          .hero__tilt-card {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
