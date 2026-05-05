import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { gsap } from 'gsap'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
  const headingRef = useRef(null)
  const subRef = useRef(null)
  const btnRef = useRef(null)

  useEffect(() => {
    if (!inView) return
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(headingRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 })
      .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .fromTo(btnRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
  }, [inView])

  return (
    <section className="cta-section section" id="booking" ref={ref}>
      <div className="cta-section__inner">
        {/* Background accent line */}
        <div className="cta-section__line" aria-hidden="true" />

        <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.65)' }}>
          Watamu Awaits
        </span>

        <h2
          ref={headingRef}
          className="cta-section__heading"
          style={{ opacity: 0 }}
        >
          Begin Your
          <br />
          <em>Coastal Story</em>
        </h2>

        <p ref={subRef} className="cta-section__sub" style={{ opacity: 0 }}>
          Every journey to Duma Suites is unique. Let us craft yours — from
          suite selection to bespoke experiences. Reach out and our team will
          respond within 24 hours.
        </p>

        <div ref={btnRef} className="cta-section__btns" style={{ opacity: 0 }}>
          <a href="mailto:reservations@dumasuites.com" className="btn btn-primary cta-section__btn">
            Make a Reservation
            <ArrowRight size={14} strokeWidth={2} />
          </a>
          <a href="https://wa.me/254710933025" target="_blank" rel="noopener noreferrer" className="btn btn-inverse-light cta-section__btn">
            WhatsApp Us
          </a>
        </div>
      </div>

      <style>{`
        .cta-section {
          background: linear-gradient(
            135deg,
            var(--color-espresso) 0%,
            #3a1f08 40%,
            #0f0705 100%
          );
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        .cta-section__inner {
          position: relative;
          z-index: 2;
          max-width: 680px;
          margin-inline: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .cta-section__line {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 50% 0%, rgba(201, 169, 110, 0.20) 0%, transparent 60%),
            radial-gradient(ellipse at 0% 100%, rgba(255, 255, 255, 0.06) 0%, transparent 50%);
          pointer-events: none;
        }
        .cta-section__heading {
          font-family: var(--font-title);
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 300;
          color: var(--color-text-light);
          line-height: 1.1;
          margin-top: 0.5rem;
        }
        .cta-section__heading em {
          font-style: italic;
          color: #e8d5b0;
        }
        .cta-section__sub {
          font-family: var(--font-body);
          font-size: clamp(0.9rem, 1.5vw, 1.05rem);
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.75;
          max-width: 520px;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .cta-section__btns {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 0.5rem;
        }
        .cta-section__btn {
          font-size: 0.7rem;
        }
      `}</style>
    </section>
  )
}
