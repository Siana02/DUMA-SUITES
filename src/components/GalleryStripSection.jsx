import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import cheetahIcon from '../assets/cheetah.png'

// gallery-image1-18
import gImg1  from '../assets/gallery-image1.JPEG'
import gImg2  from '../assets/gallery-image2.jpg'
import gImg3  from '../assets/gallery-image3.JPEG'
import gImg4  from '../assets/gallery-image4.JPEG'
import gImg5  from '../assets/gallery-image5.JPEG'
import gImg6  from '../assets/gallery-image6.JPEG'
import gImg7  from '../assets/gallery-image7.jpg'
import gImg8  from '../assets/gallery-image8.JPEG'
import gImg9  from '../assets/gallery-image9.JPEG'
import gImg10 from '../assets/gallery-image10.JPEG'
import gImg11 from '../assets/gallery-image11.JPEG'
import gImg12 from '../assets/gallery-image12.JPEG'
import gImg13 from '../assets/gallery-image13.JPEG'
import gImg14 from '../assets/gallery-image14.JPEG'
import gImg15 from '../assets/gallery-image15.JPEG'
import gImg16 from '../assets/gallery-image16.JPEG'
import gImg17 from '../assets/gallery-image17.JPEG'
import gImg18 from '../assets/gallery-image18.JPEG'

// Outdoor / pool / view images
import poolDay        from '../assets/daytime-groundfloor-poolview.jpg'
import poolDrinks     from '../assets/drinks-infinitypoolview.jpg'
import infinityOcean  from '../assets/infinity-pool-ocean-view.jpg'
import infinitySunset from '../assets/infinity-pool-sunset-view.jpg'
import nightAriel     from '../assets/nighttime-ariel-view.jpg'
import nightPool      from '../assets/nighttime-groundfloor-poolview.jpg'
import swahiliDecor   from '../assets/mirror-on-wall-swahili-decor.jpg'
import serenityLounge from '../assets/serenity-villa-outdoor-lounge-upclose.JPEG'
import serenityBalcony from '../assets/serenity-villa-balcony-view1.JPEG'
import serenityTerrace from '../assets/serenity-villa-outdoor-terrace.JPEG'
import coastalOutdoor from '../assets/coastal-haven-suite-outdoor-view.JPEG'
import coastalNight   from '../assets/coastal-haven-suite-nighttime-poolview.JPEG'

// Additional property images not yet in strip
import effortlessLuxury from '../assets/effortless-luxury.JPEG'
import poolsOfSerenity  from '../assets/pools-of-serenity.JPEG'
import swahiliElegance  from '../assets/swahili-elegance.JPEG'
import watamu           from '../assets/watamu-island.JPEG'
import sunsetView       from '../assets/sunset-view.JPEG'
import sunsetDhow       from '../assets/sunset-dhow-cruise.JPEG'
import gediRuins        from '../assets/gedi-ruins-excursion.JPEG'
import elephantWatch    from '../assets/elephant-watching.JPEG'
import dolphinWatch     from '../assets/dolphin-watching-watamu.jpg'
import coastal1Bed      from '../assets/1bedroom-coastal-haven-suite-preview.JPEG'
import coastalBed       from '../assets/coastal-haven-suite-kingsize-bed.JPEG'
import coastalBedSide   from '../assets/coastal-haven-suite-kingsize-bed-sideview.JPEG'
import coastalKitchen   from '../assets/coastal-haven-suite-kitchenette.JPEG'
import coastalKitchenLounge from '../assets/coastal-haven-suite-kitchenette-lounge-area.JPEG'
import coastalLounge    from '../assets/coastal-haven-suite-lounge-tv-area.JPEG'
import coastalShower    from '../assets/coastal-haven-suite-shower.JPEG'
import coastalChair     from '../assets/coastal-haven-outside-chair.JPEG'
import coastalBedroom   from '../assets/coastal-haven-suite-bedroom-interior.JPEG'
import serenity3Bed     from '../assets/serenity-villa-3bedroomsuite-preview.JPEG'
import serenityBed1a    from '../assets/serenity-villa-1st-bedroom-view1.JPEG'
import serenityBed1b    from '../assets/serenity-villa-1st-bedroom-view2.JPEG'
import serenityBed2     from '../assets/serenity-villa-2ndbedroom-view1.JPEG'
import serenityBed3     from '../assets/serenity-villa-3rdbedroom-view1.JPEG'
import serenityDining   from '../assets/serenity-villa-dining-table-view1.JPEG'
import serenityKitchen  from '../assets/serenity-villa-full-kitchen-view.JPEG'
import serenityGarden   from '../assets/serenity-villa-outdoor-garden-view.JPEG'
import serenityArt      from '../assets/serenity-villa-art-showcase.JPEG'
import serenityFloor    from '../assets/serenity-villa-1stfloor-view.JPEG'
import serenityIndoor   from '../assets/serenity-villa-indoor-lounge-area-upclose.JPEG'
import serenityDiningUp from '../assets/serenity-villa-dining-upclose.JPEG'
import serenitySeating  from '../assets/serenity-villa-outdoor-seating-view1.JPEG'

const IMAGES = [
  { src: gImg1,           alt: 'Duma Suites – gallery view' },
  { src: gImg2,           alt: 'Duma Suites – gallery view' },
  { src: gImg3,           alt: 'Duma Suites – gallery view' },
  { src: gImg4,           alt: 'Duma Suites – gallery view' },
  { src: gImg5,           alt: 'Duma Suites – gallery view' },
  { src: gImg6,           alt: 'Duma Suites – gallery view' },
  { src: gImg7,           alt: 'Duma Suites – gallery view' },
  { src: gImg8,           alt: 'Duma Suites – gallery view' },
  { src: gImg9,           alt: 'Duma Suites – gallery view' },
  { src: gImg10,          alt: 'Duma Suites – gallery view' },
  { src: gImg11,          alt: 'Duma Suites – gallery view' },
  { src: gImg12,          alt: 'Duma Suites – gallery view' },
  { src: gImg13,          alt: 'Duma Suites – gallery view' },
  { src: gImg14,          alt: 'Duma Suites – gallery view' },
  { src: gImg15,          alt: 'Duma Suites – gallery view' },
  { src: gImg16,          alt: 'Duma Suites – gallery view' },
  { src: gImg17,          alt: 'Duma Suites – gallery view' },
  { src: gImg18,          alt: 'Duma Suites – gallery view' },
  { src: poolDay,         alt: 'Ground-floor pool by day' },
  { src: poolDrinks,      alt: 'Infinity pool with ocean horizon' },
  { src: infinityOcean,   alt: 'Infinity pool overlooking the ocean' },
  { src: infinitySunset,  alt: 'Infinity pool at golden hour' },
  { src: nightAriel,      alt: 'Aerial night view' },
  { src: nightPool,       alt: 'Pool illuminated at night' },
  { src: swahiliDecor,    alt: 'Swahili-inspired interior detail' },
  { src: serenityLounge,  alt: 'Outdoor lounge area' },
  { src: serenityBalcony, alt: 'Balcony with garden views' },
  { src: serenityTerrace, alt: 'Private outdoor terrace' },
  { src: coastalOutdoor,  alt: 'Coastal Haven outdoor view' },
  { src: coastalNight,    alt: 'Night-time pool view from suite' },
  { src: effortlessLuxury, alt: 'Effortless luxury at Duma Suites' },
  { src: poolsOfSerenity,  alt: 'Pools of serenity' },
  { src: swahiliElegance,  alt: 'Swahili elegance interior' },
  { src: watamu,           alt: 'Watamu Island' },
  { src: sunsetView,       alt: 'Sunset view' },
  { src: sunsetDhow,       alt: 'Sunset dhow cruise' },
  { src: gediRuins,        alt: 'Gedi Ruins excursion' },
  { src: elephantWatch,    alt: 'Elephant watching' },
  { src: dolphinWatch,     alt: 'Dolphin watching in Watamu' },
  { src: coastal1Bed,      alt: 'Coastal Haven – 1 bedroom suite' },
  { src: coastalBed,       alt: 'Coastal Haven – king-size bed' },
  { src: coastalBedSide,   alt: 'Coastal Haven – bed side view' },
  { src: coastalKitchen,   alt: 'Coastal Haven – kitchenette' },
  { src: coastalKitchenLounge, alt: 'Coastal Haven – kitchenette lounge' },
  { src: coastalLounge,    alt: 'Coastal Haven – lounge & TV area' },
  { src: coastalShower,    alt: 'Coastal Haven – rain shower' },
  { src: coastalChair,     alt: 'Coastal Haven – outdoor chair' },
  { src: coastalBedroom,   alt: 'Coastal Haven – bedroom interior' },
  { src: serenity3Bed,     alt: 'Three Bedroom Suite – 3-bedroom suite' },
  { src: serenityBed1a,    alt: 'Three Bedroom Suite – first bedroom' },
  { src: serenityBed1b,    alt: 'Three Bedroom Suite – first bedroom view' },
  { src: serenityBed2,     alt: 'Three Bedroom Suite – second bedroom' },
  { src: serenityBed3,     alt: 'Three Bedroom Suite – third bedroom' },
  { src: serenityDining,   alt: 'Three Bedroom Suite – dining table' },
  { src: serenityKitchen,  alt: 'Three Bedroom Suite – full kitchen' },
  { src: serenityGarden,   alt: 'Three Bedroom Suite – outdoor garden' },
  { src: serenityArt,      alt: 'Three Bedroom Suite – art showcase' },
  { src: serenityFloor,    alt: 'Three Bedroom Suite – first floor' },
  { src: serenityIndoor,   alt: 'Three Bedroom Suite – indoor lounge' },
  { src: serenityDiningUp, alt: 'Three Bedroom Suite – dining up close' },
  { src: serenitySeating,  alt: 'Three Bedroom Suite – outdoor seating' },
]

const SCROLL_SPEED = 0.45 // px per 60 fps frame
const AUTO_RESUME_MS = 2500 // ms before auto-scroll resumes after manual nav

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, amount: 0.15 },
  transition:  { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] },
})

import { useLanguage } from '../context/LanguageContext.jsx'
import { getT } from '../i18n/translations.js'

export default function GalleryStripSection() {
  const { lang } = useLanguage()
  const t = getT(lang)

  const trackRef       = useRef(null)
  const posRef         = useRef(0)
  const pausedRef      = useRef(false)
  const rafRef         = useRef(null)
  const halfWidthRef   = useRef(0)
  const resumeTimerRef = useRef(null)
  const startedRef     = useRef(false)

  const [activeIdx, setActiveIdx] = useState(0)
  const N = IMAGES.length

  const { ref: sectionRef, inView: sectionVisible } = useInView({ threshold: 0.05, triggerOnce: true })

  // ── Start auto-scroll only when section enters the viewport ─────────────────
  useEffect(() => {
    if (!sectionVisible || startedRef.current) return
    startedRef.current = true

    const track = trackRef.current
    if (!track) return

    let frameId

    const init = () => {
      halfWidthRef.current = track.scrollWidth / 2

      const step = () => {
        if (!pausedRef.current) {
          posRef.current += SCROLL_SPEED
          if (posRef.current >= halfWidthRef.current) {
            posRef.current -= halfWidthRef.current
          }
          track.style.transform = `translateX(-${posRef.current}px)`
        }
        frameId = requestAnimationFrame(step)
      }
      frameId = requestAnimationFrame(step)
      rafRef.current = frameId
    }

    const timer = setTimeout(init, 80)
    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(frameId)
      rafRef.current = null
    }
  }, [sectionVisible])

  // Cleanup resume timer on unmount
  useEffect(() => () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  }, [])

  // Average step width — total first-half / number of images
  const getStep = useCallback(() => {
    const half = halfWidthRef.current
    return half > 0 ? half / N : 400
  }, [N])

  // ── Navigation — pause auto-scroll, animate, then resume ───────────────────
  const navigate = useCallback((direction /* +1 or -1 */) => {
    const step = getStep()
    const half = halfWidthRef.current || 1

    pausedRef.current = true
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)

    setActiveIdx(prev => ((prev + direction) % N + N) % N)

    posRef.current = ((posRef.current + direction * step) % half + half) % half

    const track = trackRef.current
    if (track) {
      track.style.transition = 'transform 380ms cubic-bezier(0.4,0,0.2,1)'
      track.style.transform  = `translateX(-${posRef.current}px)`
      setTimeout(() => { if (trackRef.current) trackRef.current.style.transition = '' }, 400)
    }

    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false
    }, AUTO_RESUME_MS)
  }, [getStep, N])

  const scrollNext = useCallback(() => navigate(+1), [navigate])
  const scrollPrev = useCallback(() => navigate(-1), [navigate])

  const handleMouseEnter = () => {
    pausedRef.current = true
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
  }
  const handleMouseLeave = () => { pausedRef.current = false }

  return (
    <section className="gs-section section" id="gallery-strip" ref={sectionRef}>

      {/* ── Header ── */}
      <div className="container">
        <div className="gs-header">
          <motion.span className="eyebrow gs-eyebrow" {...fadeUp(0)}>
            {t.gallery.eyebrow}
          </motion.span>

          <motion.div className="gs-divider" {...fadeUp(0.1)} aria-hidden="true">
            <span className="gs-divider__line gs-divider__line--left" />
            <img src={cheetahIcon} alt="" className="gs-divider__icon" />
            <span className="gs-divider__line gs-divider__line--right" />
          </motion.div>

          <motion.h2 className="section-title gs-title" {...fadeUp(0.18)}>
            {t.gallery.title}
          </motion.h2>

          <motion.p className="gs-subtitle" {...fadeUp(0.26)}>
            {t.gallery.sub}
          </motion.p>
        </div>
      </div>

      {/* ── Carousel strip ── */}
      <motion.div className="gs-strip-wrapper" {...fadeUp(0.34)}>
        {/* Left arrow */}
        <button
          className="gs-arrow gs-arrow--prev"
          onClick={scrollPrev}
          aria-label="Previous gallery images"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ArrowLeft size={20} strokeWidth={1.8} />
        </button>

        {/* Track */}
        <div
          className="gs-track-wrap"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label="Gallery image strip"
        >
          <div className="gs-track" ref={trackRef}>
            {[...IMAGES, ...IMAGES].map((img, i) => (
              <div key={i} className="gs-item" style={{ '--bg-src': `url(${img.src})` }}>
                <div className="gs-item__blur" aria-hidden="true" />
                <img
                  src={img.src}
                  alt={img.alt}
                  className="gs-img"
                  loading={i < 3 ? 'eager' : 'lazy'}
                  draggable="false"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right arrow */}
        <button
          className="gs-arrow gs-arrow--next"
          onClick={scrollNext}
          aria-label="Next gallery images"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ArrowRight size={20} strokeWidth={1.8} />
        </button>
      </motion.div>

      {/* ── View More CTA ── */}
      <motion.div className="gs-cta-wrap" {...fadeUp(0.44)}>
        <a href="/gallery" className="gs-cta-btn">
          {t.gallery.viewFullCta || 'View Full Gallery'}
          <span className="gs-cta-btn__arrow" aria-hidden="true">→</span>
        </a>
      </motion.div>

      <style>{`
        .gs-section {
          background-color: var(--color-bg-secondary);
          overflow: hidden;
        }

        /* ── Header ── */
        .gs-header {
          text-align: center;
          max-width: 640px;
          margin-inline: auto;
          margin-bottom: clamp(32px, 5vw, 56px);
        }
        .gs-eyebrow {
          display: block;
          text-align: center;
          margin-bottom: 0.5rem;
        }
        .gs-divider {
          display: flex;
          align-items: center;
          gap: 14px;
          max-width: 380px;
          margin-inline: auto;
          margin-bottom: 1.2rem;
        }
        .gs-divider__line {
          flex: 1;
          height: 1px;
        }
        .gs-divider__line--left  { background: linear-gradient(to right, transparent, var(--color-teal)); }
        .gs-divider__line--right { background: linear-gradient(to left,  transparent, var(--color-teal)); }
        .gs-divider__icon {
          width: 2.2rem;
          height: 2.2rem;
          opacity: 0.72;
          flex-shrink: 0;
        }
        .gs-title {
          text-align: center;
          letter-spacing: 0.05em;
          margin: 0 0 0.75rem;
        }
        .gs-subtitle {
          font-family: var(--font-body);
          font-size: clamp(0.9rem, 1.4vw, 1rem);
          color: var(--color-text-muted);
          line-height: 1.7;
          margin: 0;
        }

        /* ── Strip wrapper (positions arrows relative to track) ── */
        .gs-strip-wrapper {
          position: relative;
        }

        /* ── Track wrap (clipping) ── */
        .gs-track-wrap {
          overflow: hidden;
          cursor: default;
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 5%,
            black 95%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 5%,
            black 95%,
            transparent 100%
          );
        }

        /* ── Inner scrolling track ── */
        .gs-track {
          display: flex;
          gap: 12px;
          will-change: transform;
        }

        /* ── Image item ── */
        .gs-item {
          flex-shrink: 0;
          overflow: hidden;
          border-radius: 4px;
          position: relative;
          border: 1px solid rgba(212, 194, 168, 0.35);
          box-shadow: 0 4px 20px rgba(86, 51, 17, 0.14);
        }

        .gs-item__blur {
          position: absolute;
          inset: -16px 0;
          background-image: var(--bg-src, none);
          background-size: cover;
          background-position: center;
          filter: blur(20px) brightness(0.65) saturate(1.1);
          z-index: 0;
          pointer-events: none;
        }

        .gs-img {
          display: block;
          position: relative;
          z-index: 1;
          height: 100%;
          width: auto;
          transition: transform 550ms ease;
          user-select: none;
          pointer-events: none;
        }
        .gs-item:hover .gs-img {
          transform: scale(1.05);
        }

        /* ── Arrow buttons ── */
        .gs-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.22);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--color-espresso);
          transition:
            background var(--transition-base),
            border-color var(--transition-base),
            color var(--transition-base),
            transform 0.3s ease,
            box-shadow var(--transition-base);
        }
        .gs-arrow:hover {
          background: var(--color-teal);
          border-color: var(--color-teal);
          color: #fff;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 6px 24px rgba(201,169,110,0.45);
        }
        .gs-arrow--prev { left: clamp(12px, 3vw, 28px); }
        .gs-arrow--next { right: clamp(12px, 3vw, 28px); }

        /* ── CTA ── */
        .gs-cta-wrap {
          text-align: center;
          margin-top: clamp(28px, 4vw, 44px);
        }
        .gs-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-nav);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-espresso);
          text-decoration: none;
          padding: 14px 36px;
          border: 1.5px solid rgba(86, 51, 17, 0.4);
          border-radius: 3px;
          position: relative;
          overflow: hidden;
          isolation: isolate;
          transition:
            border-color 0.3s ease,
            color 0.3s ease,
            transform 0.28s ease,
            box-shadow 0.3s ease;
        }
        .gs-cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--color-teal);
          transform: translateX(-110%) skewX(-20deg);
          transition: transform 0.52s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: -1;
        }
        .gs-cta-btn:hover::before { transform: translateX(0%) skewX(-20deg); }
        .gs-cta-btn:hover {
          border-color: var(--color-teal);
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(201,169,110,0.28);
        }
        .gs-cta-btn__arrow {
          display: inline-block;
          transition: transform 0.25s ease;
        }
        .gs-cta-btn:hover .gs-cta-btn__arrow { transform: translateX(5px); }

        /* ── Mobile ≤639px ── */
        @media (max-width: 639px) {
          .gs-item { height: 240px; }
          .gs-arrow {
            width: 40px;
            height: 40px;
          }
          .gs-arrow--prev { left: 8px; }
          .gs-arrow--next { right: 8px; }
        }

        /* ── Tablet 640–1023px ── */
        @media (min-width: 640px) and (max-width: 1023px) {
          .gs-item { height: 300px; }
        }

        /* ── Laptop ≥1024px ── */
        @media (min-width: 1024px) {
          .gs-item { height: 360px; }
        }
      `}</style>
    </section>
  )
}
