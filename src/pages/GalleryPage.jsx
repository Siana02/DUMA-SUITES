import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../context/LanguageContext.jsx'
import { getT } from '../i18n/translations.js'

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

const IMAGES = [
  { src: gImg1,         alt: 'Duma Suites – gallery view 1' },
  { src: gImg2,         alt: 'Duma Suites – gallery view 2' },
  { src: gImg3,         alt: 'Duma Suites – gallery view 3' },
  { src: gImg4,         alt: 'Duma Suites – gallery view 4' },
  { src: gImg5,         alt: 'Duma Suites – gallery view 5' },
  { src: gImg6,         alt: 'Duma Suites – gallery view 6' },
  { src: gImg7,         alt: 'Duma Suites – gallery view 7' },
  { src: gImg8,         alt: 'Duma Suites – gallery view 8' },
  { src: gImg9,         alt: 'Duma Suites – gallery view 9' },
  { src: gImg10,        alt: 'Duma Suites – gallery view 10' },
  { src: gImg11,        alt: 'Duma Suites – gallery view 11' },
  { src: gImg12,        alt: 'Duma Suites – gallery view 12' },
  { src: gImg13,        alt: 'Duma Suites – gallery view 13' },
  { src: gImg14,        alt: 'Duma Suites – gallery view 14' },
  { src: gImg15,        alt: 'Duma Suites – gallery view 15' },
  { src: gImg16,        alt: 'Duma Suites – gallery view 16' },
  { src: gImg17,        alt: 'Duma Suites – gallery view 17' },
  { src: gImg18,        alt: 'Duma Suites – gallery view 18' },
  { src: effortlessLuxury, alt: 'Effortless luxury at Duma Suites' },
  { src: poolsOfSerenity,  alt: 'Pools of serenity' },
  { src: swahiliElegance,  alt: 'Swahili elegance interior' },
  { src: watamu,           alt: 'Watamu Island' },
  { src: gediRuins,        alt: 'Gedi Ruins excursion' },
  { src: elephantWatch,    alt: 'Elephant watching' },
  { src: sunsetDhow,       alt: 'Sunset dhow cruise' },
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
              <span className="eyebrow">{t.gallery.eyebrow}</span>
              <h1 className="section-title">{t.gallery.title}</h1>
              <div className="divider" />
              <p className="gallery-page__sub">{t.gallery.sub}</p>
            </div>

            <div className="gallery-page__grid">
              {IMAGES.map((img, i) => (
                <figure key={i} className="gallery-page__figure">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="gallery-page__img"
                    loading={i < 6 ? 'eager' : 'lazy'}
                  />
                </figure>
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
