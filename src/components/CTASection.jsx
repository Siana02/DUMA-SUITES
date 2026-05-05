import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { gsap } from 'gsap'
import { ArrowRight } from 'lucide-react'
import cheetahIcon from '../assets/cheetah.png'
import { useLanguage } from '../context/LanguageContext.jsx'
import { getT } from '../i18n/translations.js'

export default function CTASection() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
  const { lang } = useLanguage()
  const t = getT(lang).cta
  const eyebrowRef = useRef(null)
  const dividerRef = useRef(null)
  const headingRef = useRef(null)
  const subRef = useRef(null)
  const btnRef = useRef(null)

  useEffect(() => {
    if (!inView) return
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(eyebrowRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(dividerRef.current, { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.7 }, '-=0.3')
      .fromTo(headingRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
      .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .fromTo(btnRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
  }, [inView])

  return (
    <section className="cta-section section" id="booking" ref={ref}>
      {/* Decorative orbs */}
      <div className="cta-section__orb cta-section__orb--top" aria-hidden="true" />
      <div className="cta-section__orb cta-section__orb--bottom" aria-hidden="true" />

      <div className="cta-section__inner">
        <span ref={eyebrowRef} className="cta-section__eyebrow" style={{ opacity: 0 }}>
          {t.eyebrow}
        </span>

        <div ref={dividerRef} className="cta-section__divider" aria-hidden="true" style={{ opacity: 0 }}>
          <span className="cta-section__divider-line cta-section__divider-line--left" />
          <img src={cheetahIcon} alt="" className="cta-section__divider-icon" />
          <span className="cta-section__divider-line cta-section__divider-line--right" />
        </div>

        <h2
          ref={headingRef}
          className="cta-section__heading"
          style={{ opacity: 0 }}
        >
          {t.headingLine1}
          <br />
          <em>{t.headingLine2}</em>
        </h2>

        <p ref={subRef} className="cta-section__sub" style={{ opacity: 0 }}>
          {t.sub}
        </p>

        <div ref={btnRef} className="cta-section__btns" style={{ opacity: 0 }}>
          <a href="mailto:reservations@dumasuites.com" className="cta-section__btn cta-section__btn--primary">
            {t.btn1}
            <ArrowRight size={14} strokeWidth={2} />
          </a>
          <a href="https://wa.me/254710933025" target="_blank" rel="noopener noreferrer" className="cta-section__btn cta-section__btn--outline">
            {t.btn2}
          </a>
        </div>
      </div>

      <style>{`
        .cta-section {
          background: linear-gradient(
            160deg,
            #1a0d05 0%,
            #2d1508 35%,
            #1a0e06 65%,
            #0f0705 100%
          );
          position: relative;
          overflow: hidden;
          text-align: center;
        }

        /* Decorative glowing orbs */
        .cta-section__orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .cta-section__orb--top {
          width: 600px;
          height: 600px;
          top: -250px;
          left: 50%;
          transform: translateX(-50%);
          background: radial-gradient(circle, rgba(201,169,110,0.18) 0%, transparent 70%);
        }
        .cta-section__orb--bottom {
          width: 400px;
          height: 400px;
          bottom: -150px;
          right: 10%;
          background: radial-gradient(circle, rgba(88,176,196,0.10) 0%, transparent 70%);
        }

        .cta-section__inner {
          position: relative;
          z-index: 2;
          max-width: 720px;
          margin-inline: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        .cta-section__eyebrow {
          font-family: var(--font-eyebrow);
          font-size: 0.75rem;
          font-style: italic;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-teal);
          margin-bottom: 1.25rem;
        }

        .cta-section__divider {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 280px;
          margin-bottom: 1.5rem;
          transform-origin: center;
        }
        .cta-section__divider-line {
          flex: 1;
          height: 1px;
        }
        .cta-section__divider-line--left {
          background: linear-gradient(to right, transparent, rgba(201,169,110,0.55));
        }
        .cta-section__divider-line--right {
          background: linear-gradient(to left, transparent, rgba(201,169,110,0.55));
        }
        .cta-section__divider-icon {
          width: 2rem;
          height: 2rem;
          opacity: 0.65;
          filter: brightness(0) invert(1);
          flex-shrink: 0;
        }

        .cta-section__heading {
          font-family: var(--font-title);
          font-size: clamp(2.8rem, 6.5vw, 5rem);
          font-weight: 300;
          color: var(--color-text-light);
          line-height: 1.08;
          margin-bottom: 1.5rem;
          letter-spacing: -0.01em;
        }
        .cta-section__heading em {
          font-style: italic;
          color: #e8d5b0;
          display: block;
        }

        .cta-section__sub {
          font-family: var(--font-body);
          font-size: clamp(0.92rem, 1.5vw, 1.08rem);
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.8;
          max-width: 540px;
          margin-bottom: 2.25rem;
          padding: 0 1rem;
        }

        .cta-section__btns {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        /* Primary filled button */
        .cta-section__btn {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-family: var(--font-nav);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 15px 36px;
          border-radius: 2px;
          position: relative;
          overflow: hidden;
          isolation: isolate;
          transition: color 0.3s ease, border-color 0.3s ease,
                      transform 0.28s ease, box-shadow 0.3s ease;
        }
        .cta-section__btn--primary {
          background: var(--color-teal);
          color: #fff;
          border: 1.5px solid var(--color-teal);
        }
        .cta-section__btn--primary:hover {
          background: var(--color-teal-dark);
          border-color: var(--color-teal-dark);
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(201,169,110,0.38);
        }
        .cta-section__btn--outline {
          background: transparent;
          color: rgba(255,255,255,0.85);
          border: 1.5px solid rgba(255,255,255,0.3);
        }
        .cta-section__btn--outline:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.6);
          color: #fff;
          transform: translateY(-2px);
        }

        @media (max-width: 480px) {
          .cta-section__btns {
            flex-direction: column;
            align-items: center;
            width: 100%;
          }
          .cta-section__btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  )
}
