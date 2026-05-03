import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

import gm1   from '../assets/General-manager1.jpg'
import gm2   from '../assets/General-managers2.jpg'
import night from '../assets/nighttime-ariel-view.jpg'
import pool  from '../assets/infinity-pool-sunset-view.jpg'
import drinks from '../assets/drinks-infinitypoolview.jpg'
import cheetahPng from '../assets/cheetah.png'

// ── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial:   { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport:  { once: true, amount: 0.2 },
  transition: { duration: 0.75, delay, ease: [0.4, 0, 0.2, 1] },
})

const photoVariant = (delay = 0, rotate = 0) => ({
  initial:   { opacity: 0, y: 32, rotate: rotate - 2 },
  whileInView: { opacity: 1, y: 0, rotate },
  viewport:  { once: true, amount: 0.15 },
  transition: { duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

export default function GMMessageSection() {
  const { ref } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="gm-section section section--premium" id="experience" ref={ref}>

      {/* ── Section eyebrow ── */}
      <motion.span className="eyebrow gm-eyebrow" {...fadeUp(0)}>
        A Word from the General Manager
      </motion.span>

      {/* ─────────────────────────────────────────────────────────────────────
          EDITORIAL LAYOUT
          - Mobile  : single column, images scattered inline
          - Tablet  : 70% text block, images alternate left/right
          - Desktop : 60% text column centre; images float into margins on both sides
      ───────────────────────────────────────────────────────────────────────── */}
      <div className="gm-layout">

        {/* ── Left margin images (desktop only) ── */}
        <aside className="gm-margin gm-margin--left" aria-hidden="true">
          {/* Large hero image */}
          <motion.div className="gm-photo gm-photo--large gm-photo--tilt-l" {...photoVariant(0.15, -2)}>
            <img src={gm1} alt="General Manager Andrea Boemo" />
          </motion.div>
          {/* Small accent */}
          <motion.div className="gm-photo gm-photo--small gm-photo--tilt-r gm-photo--overlap-up" {...photoVariant(0.35, 1.5)}>
            <img src={drinks} alt="Infinity pool drinks service" />
          </motion.div>
        </aside>

        {/* ── Centre text column ── */}
        <article className="gm-body">

          {/* Opening quote ── large decorative glyph */}
          <motion.div className="gm-quote-glyph" aria-hidden="true" {...fadeUp(0.1)}>❝</motion.div>

          {/* Paragraph 1 */}
          <motion.p className="gm-para gm-para--lead" {...fadeUp(0.2)}>
            At Duma Suites, we do not merely offer accommodation&thinsp;—&thinsp;we craft
            moments. Every sunrise over the Indian Ocean, every breeze that
            carries the scent of the sea, is intentionally woven into the fabric
            of your stay.
          </motion.p>

          {/* Inline image — visible on mobile & tablet, hidden on desktop */}
          <motion.div className="gm-photo gm-photo--inline gm-photo--tilt-l" {...photoVariant(0.28, -1.5)}>
            <img src={pool} alt="Infinity pool at sunset" />
          </motion.div>

          {/* Paragraph 2 */}
          <motion.p className="gm-para" {...fadeUp(0.32)}>
            Our team has dedicated itself to redefining what coastal luxury
            means&thinsp;—&thinsp;not through grandeur alone, but through the quiet confidence
            of perfection in every detail. From the linen on your bed to the
            last note of your evening meal, nothing is left to chance.
          </motion.p>

          {/* Inline image — visible on mobile & tablet, hidden on desktop */}
          <motion.div className="gm-photo gm-photo--inline gm-photo--tilt-r" {...photoVariant(0.40, 1.5)}>
            <img src={night} alt="Nighttime aerial view of Duma Suites" />
          </motion.div>

          {/* Paragraph 3 */}
          <motion.p className="gm-para" {...fadeUp(0.44)}>
            Watamu is more than a destination; it is a state of mind. Whether
            you arrive seeking adventure along the reef or simply the profound
            peace of the horizon at dusk, Duma Suites will meet you exactly where
            you are — and exceed every expectation you carry.
          </motion.p>

          {/* Closing line */}
          <motion.p className="gm-para gm-para--closing" {...fadeUp(0.52)}>
            Welcome to our home.
          </motion.p>

          {/* ── Attribution ── */}
          <motion.div className="gm-attribution" {...fadeUp(0.60)}>
            {/* Name in Parisienne */}
            <p className="gm-name">Andrea Boemo</p>

            {/* Cheetah icon + fading lines */}
            <div className="gm-divider-row" aria-hidden="true">
              <span className="gm-divider-line gm-divider-line--left" />
              <img className="gm-cheetah" src={cheetahPng} alt="" draggable={false} />
              <span className="gm-divider-line gm-divider-line--right" />
            </div>

            {/* Title */}
            <p className="gm-title-label">General Manager, Duma Suites</p>
          </motion.div>

        </article>

        {/* ── Right margin images (desktop only) ── */}
        <aside className="gm-margin gm-margin--right" aria-hidden="true">
          {/* Medium portrait */}
          <motion.div className="gm-photo gm-photo--medium gm-photo--tilt-r" {...photoVariant(0.25, 2)}>
            <img src={gm2} alt="General Manager Andrea Boemo" />
          </motion.div>
          {/* Medium landscape overlapping */}
          <motion.div className="gm-photo gm-photo--medium gm-photo--tilt-l gm-photo--overlap-up" {...photoVariant(0.42, -1)}>
            <img src={night} alt="Nighttime aerial view" />
          </motion.div>
          {/* Small accent at bottom */}
          <motion.div className="gm-photo gm-photo--small gm-photo--tilt-r" {...photoVariant(0.55, 1.8)}>
            <img src={pool} alt="Infinity pool at sunset" />
          </motion.div>
        </aside>

      </div>

      <style>{`
        /* ── Section shell ── */
        .gm-section {
          background-color: var(--color-bg-premium);
          position: relative;
          overflow: hidden;
        }
        .gm-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at 50% 0%,
            rgba(86, 51, 17, 0.06) 0%,
            transparent 70%
          );
          pointer-events: none;
        }

        /* Eyebrow override — center align */
        .gm-eyebrow {
          display: block;
          text-align: center;
          margin-bottom: 2.5rem;
          color: var(--color-espresso);
          opacity: 0.65;
        }

        /* ── Layout grid ── */
        .gm-layout {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-areas: 'body';
          gap: 0;
          max-width: 1280px;
          margin-inline: auto;
        }

        /* ── Margin asides — hidden until desktop ── */
        .gm-margin {
          display: none;
        }

        /* ── Text body ── */
        .gm-body {
          grid-area: body;
          max-width: 72ch;
          margin-inline: auto;
          width: 100%;
        }

        /* ── Decorative quote glyph ── */
        .gm-quote-glyph {
          font-family: var(--font-title);
          font-size: clamp(5rem, 12vw, 9rem);
          color: var(--color-espresso);
          opacity: 0.12;
          line-height: 1;
          user-select: none;
          text-align: center;
          margin-bottom: -0.5em;
        }

        /* ── Paragraph styles ── */
        .gm-para {
          font-family: var(--font-title);
          font-size: clamp(1.05rem, 2vw, 1.55rem);
          font-style: italic;
          font-weight: 400;
          color: var(--color-espresso);
          line-height: 1.75;
          margin-bottom: 1.6rem;
          quotes: none;
        }
        .gm-para--lead {
          font-size: clamp(1.2rem, 2.4vw, 1.8rem);
          font-weight: 300;
        }
        .gm-para--closing {
          font-size: clamp(1.15rem, 2.2vw, 1.65rem);
          font-style: italic;
          opacity: 0.80;
          margin-top: 0.5rem;
        }

        /* ── Photo styles — shared ── */
        .gm-photo {
          overflow: hidden;
          box-shadow: 6px 8px 28px rgba(86, 51, 17, 0.22);
          flex-shrink: 0;
          transition:
            transform 0.45s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.45s ease;
        }
        .gm-photo:hover {
          transform: translateY(-5px) rotate(0deg) !important;
          box-shadow: 8px 14px 40px rgba(86, 51, 17, 0.30);
        }
        .gm-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Tilt variants applied inside desktop media query */

        /* ── Inline images (mobile + tablet only) ── */
        .gm-photo--inline {
          width: min(52%, 200px);
          aspect-ratio: 4 / 5;
          margin-bottom: 1.5rem;
        }
        .gm-photo--inline.gm-photo--tilt-l {
          float: left;
          margin-right: 18px;
          shape-outside: margin-box;
        }
        .gm-photo--inline.gm-photo--tilt-r {
          float: right;
          margin-left: 18px;
          shape-outside: margin-box;
        }

        /* Clear floats */
        .gm-body::after {
          content: '';
          display: table;
          clear: both;
        }

        /* ── Attribution ── */
        .gm-attribution {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.55rem;
          margin-top: 2.5rem;
          padding-top: 1.8rem;
          clear: both;
        }
        .gm-name {
          font-family: var(--font-gm);
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          color: var(--color-espresso);
          line-height: 1.15;
          text-align: center;
        }

        /* Cheetah + fading lines row */
        .gm-divider-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          width: min(260px, 70vw);
        }
        .gm-divider-line {
          flex: 1;
          height: 1px;
        }
        .gm-divider-line--left {
          background: linear-gradient(to left, rgba(86, 51, 17, 0.55) 0%, transparent 100%);
        }
        .gm-divider-line--right {
          background: linear-gradient(to right, rgba(86, 51, 17, 0.55) 0%, transparent 100%);
        }
        .gm-cheetah {
          width: 1.55rem;
          height: 1.55rem;
          object-fit: contain;
          flex-shrink: 0;
          opacity: 0.72;
        }

        .gm-title-label {
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-teal);
          text-align: center;
        }

        /* ─────────────────────────────────────────────
           TABLET  768 – 1199px
        ───────────────────────────────────────────── */
        @media (min-width: 768px) and (max-width: 1199px) {
          .gm-layout {
            padding-inline: var(--section-px);
          }
          .gm-body {
            max-width: 70vw;
          }
          .gm-photo--inline {
            width: min(38%, 240px);
          }
        }

        /* ─────────────────────────────────────────────
           DESKTOP  ≥ 1200px — magazine with side margins
        ───────────────────────────────────────────── */
        @media (min-width: 1200px) {
          .gm-layout {
            grid-template-columns: 260px 1fr 260px;
            grid-template-areas: 'left body right';
            align-items: start;
            gap: 0 40px;
            padding-inline: var(--section-px);
          }

          /* Show desktop margin columns */
          .gm-margin {
            display: flex;
            flex-direction: column;
            gap: 40px;
            padding-top: 3rem;
          }
          .gm-margin--left { grid-area: left; align-items: flex-end; }
          .gm-margin--right { grid-area: right; align-items: flex-start; }

          /* Body — narrower, editorial */
          .gm-body {
            grid-area: body;
            max-width: 60ch;
            margin-inline: auto;
          }

          /* Hide inline floated images on desktop — side margins take over */
          .gm-photo--inline {
            display: none;
          }

          /* Desktop photo sizes */
          .gm-photo--large {
            width: 100%;
            max-width: 320px;
            aspect-ratio: 3 / 4;
          }
          .gm-photo--medium {
            width: 100%;
            max-width: 240px;
            aspect-ratio: 4 / 5;
          }
          .gm-photo--small {
            width: 100%;
            max-width: 180px;
            aspect-ratio: 1 / 1;
          }

          /* Overlap effect — negative margin to layer images for editorial depth */
          .gm-photo--overlap-up {
            margin-top: -48px;
          }

          /* Left margin tilts */
          .gm-margin--left .gm-photo--tilt-l { transform: rotate(-2deg); }
          .gm-margin--left .gm-photo--tilt-r { transform: rotate(1.5deg); }

          /* Right margin tilts */
          .gm-margin--right .gm-photo--tilt-r { transform: rotate(2deg); }
          .gm-margin--right .gm-photo--tilt-l { transform: rotate(-1deg); }
        }
      `}</style>
    </section>
  )
}

