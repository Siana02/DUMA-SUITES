import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { gsap } from 'gsap'
import { ArrowRight, Mail } from 'lucide-react'
import cheetahIcon from '../assets/cheetah.png'
import { useLanguage } from '../context/LanguageContext.jsx'
import { getT } from '../i18n/translations.js'

function WhatsAppIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  )
}

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
            <Mail size={14} strokeWidth={2} aria-hidden="true" />
            {t.btn1}
            <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
          </a>
          <a href="https://wa.me/254710933025" target="_blank" rel="noopener noreferrer" className="cta-section__btn cta-section__btn--outline">
            <WhatsAppIcon />
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
          font-size: clamp(0.75rem, 1.3vw, 0.9rem);
          font-style: italic;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #c9a96e;
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
