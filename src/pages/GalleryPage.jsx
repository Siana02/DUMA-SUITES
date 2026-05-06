import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext.jsx'
import { getT } from '../i18n/translations.js'
import cheetahIcon from '../assets/cheetah.png'

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
import effortlessLuxury from '../assets/effortless-luxury.JPEG'
import poolsOfSerenity  from '../assets/pools-of-serenity.JPEG'
import swahiliElegance  from '../assets/swahili-elegance.JPEG'
import watamu           from '../assets/watamu-island.JPEG'
import gediRuins        from '../assets/gedi-ruins-excursion.JPEG'
import elephantWatch    from '../assets/elephant-watching.JPEG'
import sunsetDhow       from '../assets/sunset-dhow-cruise.JPEG'
import sunsetView       from '../assets/sunset-view.JPEG'
import dolphinWatch     from '../assets/dolphin-watching-watamu.jpg'
import gediMonkey       from '../assets/gedi-ruins-monkey-excursion.JPEG'
import upcElephant      from '../assets/upclose-elephant.JPEG'
import poolDay          from '../assets/daytime-groundfloor-poolview.jpg'
import poolDrinks       from '../assets/drinks-infinitypoolview.jpg'
import infinityOcean    from '../assets/infinity-pool-ocean-view.jpg'
import infinitySunset   from '../assets/infinity-pool-sunset-view.jpg'
import nightAriel       from '../assets/nighttime-ariel-view.jpg'
import nightPool        from '../assets/nighttime-groundfloor-poolview.jpg'
import swahiliDecor     from '../assets/mirror-on-wall-swahili-decor.jpg'
import serenityLounge   from '../assets/serenity-villa-outdoor-lounge-upclose.JPEG'
import serenityBalcony  from '../assets/serenity-villa-balcony-view1.JPEG'
import serenityTerrace  from '../assets/serenity-villa-outdoor-terrace.JPEG'
import coastalOutdoor   from '../assets/coastal-haven-suite-outdoor-view.JPEG'
import coastalNight     from '../assets/coastal-haven-suite-nighttime-poolview.JPEG'
import coastal1Bed      from '../assets/1bedroom-coastal-haven-suite-preview.JPEG'
import coastalBed       from '../assets/coastal-haven-suite-kingsize-bed.JPEG'
import coastalBedSide   from '../assets/coastal-haven-suite-kingsize-bed-sideview.JPEG'
import coastalKitchen   from '../assets/coastal-haven-suite-kitchenette.JPEG'
import coastalLounge    from '../assets/coastal-haven-suite-lounge-tv-area.JPEG'
import coastalShower    from '../assets/coastal-haven-suite-shower.JPEG'
import coastalChair     from '../assets/coastal-haven-outside-chair.JPEG'
import serenity3Bed     from '../assets/serenity-villa-3bedroomsuite-preview.JPEG'
import serenityBed1     from '../assets/serenity-villa-1st-bedroom-view1.JPEG'
import serenityBed2     from '../assets/serenity-villa-2ndbedroom-view1.JPEG'
import serenityBed3     from '../assets/serenity-villa-3rdbedroom-view1.JPEG'
import serenityDining   from '../assets/serenity-villa-dining-table-view1.JPEG'
import serenityKitchen  from '../assets/serenity-villa-full-kitchen-view.JPEG'
import serenityGarden   from '../assets/serenity-villa-outdoor-garden-view.JPEG'
import serenityArt      from '../assets/serenity-villa-art-showcase.JPEG'
import serenityFloor    from '../assets/serenity-villa-1stfloor-view.JPEG'

const IMAGES = [
  { src: gImg1,           alt: 'Duma Suites – gallery view 1' },
  { src: gImg2,           alt: 'Duma Suites – gallery view 2' },
  { src: gImg3,           alt: 'Duma Suites – gallery view 3' },
  { src: gImg4,           alt: 'Duma Suites – gallery view 4' },
  { src: gImg5,           alt: 'Duma Suites – gallery view 5' },
  { src: gImg6,           alt: 'Duma Suites – gallery view 6' },
  { src: gImg7,           alt: 'Duma Suites – gallery view 7' },
  { src: gImg8,           alt: 'Duma Suites – gallery view 8' },
  { src: gImg9,           alt: 'Duma Suites – gallery view 9' },
  { src: gImg10,          alt: 'Duma Suites – gallery view 10' },
  { src: gImg11,          alt: 'Duma Suites – gallery view 11' },
  { src: gImg12,          alt: 'Duma Suites – gallery view 12' },
  { src: gImg13,          alt: 'Duma Suites – gallery view 13' },
  { src: gImg14,          alt: 'Duma Suites – gallery view 14' },
  { src: gImg15,          alt: 'Duma Suites – gallery view 15' },
  { src: gImg16,          alt: 'Duma Suites – gallery view 16' },
  { src: gImg17,          alt: 'Duma Suites – gallery view 17' },
  { src: gImg18,          alt: 'Duma Suites – gallery view 18' },
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
  { src: sunsetView,       alt: 'Sunset view from Duma Suites' },
  { src: gediRuins,        alt: 'Gedi Ruins excursion' },
  { src: gediMonkey,       alt: 'Gedi Ruins monkey excursion' },
  { src: elephantWatch,    alt: 'Elephant watching' },
  { src: upcElephant,      alt: 'Up-close elephant encounter' },
  { src: sunsetDhow,       alt: 'Sunset dhow cruise' },
  { src: dolphinWatch,     alt: 'Dolphin watching in Watamu' },
  { src: coastal1Bed,      alt: 'Coastal Haven – 1 bedroom preview' },
  { src: coastalBed,       alt: 'Coastal Haven – king-size bed' },
  { src: coastalBedSide,   alt: 'Coastal Haven – king-size bed side view' },
  { src: coastalKitchen,   alt: 'Coastal Haven – kitchenette' },
  { src: coastalLounge,    alt: 'Coastal Haven – lounge & TV area' },
  { src: coastalShower,    alt: 'Coastal Haven – rain shower' },
  { src: coastalChair,     alt: 'Coastal Haven – outdoor chair' },
  { src: serenity3Bed,     alt: 'Three Bedroom Suite – 3-bedroom preview' },
  { src: serenityBed1,     alt: 'Three Bedroom Suite – first bedroom' },
  { src: serenityBed2,     alt: 'Three Bedroom Suite – second bedroom' },
  { src: serenityBed3,     alt: 'Three Bedroom Suite – third bedroom' },
  { src: serenityDining,   alt: 'Three Bedroom Suite – dining table' },
  { src: serenityKitchen,  alt: 'Three Bedroom Suite – full kitchen' },
  { src: serenityGarden,   alt: 'Three Bedroom Suite – outdoor garden' },
  { src: serenityArt,      alt: 'Three Bedroom Suite – art showcase' },
  { src: serenityFloor,    alt: 'Three Bedroom Suite – first floor view' },
]

export default function GalleryPage() {
  const { lang } = useLanguage()
  const t = getT(lang)

  return (
    <>
      <Helmet>
        <title>Gallery – Duma Suites</title>
        <meta name="description" content="Explore Duma Suites through our curated photo gallery showcasing our suites, pools, and the beautiful Watamu coastline." />
      </Helmet>

      <main style={{ paddingTop: 80 }}>
        <section className="section gallery-page" id="gallery">
          <div className="container">
            <div className="gallery-page__header">
              <motion.span
                className="eyebrow"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {t.gallery.eyebrow}
              </motion.span>

              <motion.div
                className="gallery-page__divider"
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="gallery-page__divider-line gallery-page__divider-line--left" />
                <img src={cheetahIcon} alt="" className="gallery-page__divider-icon" />
                <span className="gallery-page__divider-line gallery-page__divider-line--right" />
              </motion.div>

              <motion.h1
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.28 }}
              >
                {t.gallery.title}
              </motion.h1>
              <motion.p
                className="gallery-page__sub"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.38 }}
              >
                {t.gallery.sub}
              </motion.p>
            </div>

            <div className="gallery-page__grid">
              {IMAGES.map((img, i) => (
                <motion.figure
                  key={i}
                  className="gallery-page__figure"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.55, delay: (i % 6) * 0.05 /* stagger within each row of 6 */ }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="gallery-page__img"
                    loading={i < 6 ? 'eager' : 'lazy'}
                  />
                </motion.figure>
              ))}
            </div>
          </div>
        </section>
      </main>

      <style>{`
        .gallery-page__header {
          text-align: center;
          margin-bottom: clamp(32px, 5vw, 56px);
        }
        .gallery-page__divider {
          display: flex;
          align-items: center;
          gap: 14px;
          max-width: 320px;
          margin: 0.75rem auto 1rem;
        }
        .gallery-page__divider-line {
          flex: 1;
          height: 1px;
        }
        .gallery-page__divider-line--left  { background: linear-gradient(to right, transparent, var(--color-teal)); }
        .gallery-page__divider-line--right { background: linear-gradient(to left,  transparent, var(--color-teal)); }
        .gallery-page__divider-icon {
          width: 2rem;
          height: 2rem;
          opacity: 0.72;
          flex-shrink: 0;
        }
        .gallery-page__sub {
          max-width: 560px;
          margin: 16px auto 0;
          font-size: 1rem;
          color: var(--color-text-muted);
          line-height: 1.7;
        }
        .gallery-page__grid {
          columns: 3;
          column-gap: 24px;
        }
        .gallery-page__figure {
          break-inside: avoid;
          margin: 0 0 24px;
          overflow: hidden;
          border-radius: 2px;
        }
        .gallery-page__img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
          transition: transform 0.4s ease;
        }
        .gallery-page__figure:hover .gallery-page__img {
          transform: scale(1.02);
        }
        @media (max-width: 900px) {
          .gallery-page__grid {
            columns: 2;
            column-gap: 20px;
          }
          .gallery-page__figure {
            margin-bottom: 20px;
          }
        }
        @media (max-width: 560px) {
          .gallery-page__grid {
            columns: 1;
          }
        }
      `}</style>
    </>
  )
}
