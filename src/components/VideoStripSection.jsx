import { useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../context/LanguageContext.jsx'
import { getT } from '../i18n/translations.js'

import vid1 from '../assets/infinity-pool-rooftopview.MOV'
import vid2 from '../assets/rooftop-infinity-pool-view.mp4'
import vid3 from '../assets/safari-blue-seafood-local-prawns.MOV'
import vid4 from '../assets/safari-blue-sudi-island-seafood-bbq.MOV'
import vid5 from '../assets/sea-urchin-on-beach.MP4'
import vid6 from '../assets/watamu-shoreline-video.MOV'
import vid7 from '../assets/watamu-whitesands-beach.MP4'

const VIDEOS = [vid1, vid2, vid3, vid4, vid5, vid6, vid7]

function VideoCard({ src, label, index }) {
  const videoRef = useRef(null)

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  return (
    <div
      className="vs-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="vs-card__video-wrap">
        <video
          ref={videoRef}
          src={src}
          className="vs-card__video"
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
        />
        <div className="vs-card__overlay" aria-hidden="true" />
        <div className="vs-card__play-icon" aria-hidden="true">▶</div>
      </div>
      <p className="vs-card__label">{label}</p>
    </div>
  )
}

export default function VideoStripSection() {
  const { lang } = useLanguage()
  const t = getT(lang)
  const vt = t.videos

  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <section className="video-strip section section--secondary" id="videos">
      <div className="container">
        <div
          ref={headerRef}
          className={`video-strip__header${headerInView ? ' is-visible' : ''}`}
        >
          <span className="eyebrow">{vt.eyebrow}</span>
          <h2 className="section-title">{vt.title}</h2>
          <div className="divider" />
          <p className="video-strip__sub">{vt.sub}</p>
        </div>
      </div>

      <div className="video-strip__scroll-wrap">
        <div className="video-strip__track">
          {VIDEOS.map((src, i) => (
            <VideoCard
              key={i}
              src={src}
              label={vt.items[i]?.label || `Video ${i + 1}`}
              index={i}
            />
          ))}
        </div>
      </div>

      <style>{`
        .video-strip__header {
          text-align: center;
          margin-bottom: clamp(32px, 5vw, 48px);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .video-strip__header.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .video-strip__sub {
          max-width: 500px;
          margin: 16px auto 0;
          font-size: 0.95rem;
          color: var(--color-text-muted);
          line-height: 1.7;
        }
        .video-strip__scroll-wrap {
          overflow-x: auto;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: var(--color-teal) transparent;
          padding-bottom: 12px;
        }
        .video-strip__scroll-wrap::-webkit-scrollbar {
          height: 4px;
        }
        .video-strip__scroll-wrap::-webkit-scrollbar-track {
          background: transparent;
        }
        .video-strip__scroll-wrap::-webkit-scrollbar-thumb {
          background: var(--color-teal);
          border-radius: 2px;
        }
        .video-strip__track {
          display: flex;
          gap: 20px;
          padding: 0 var(--section-px);
          width: max-content;
          scroll-snap-type: x mandatory;
        }
        .vs-card {
          flex-shrink: 0;
          width: 320px;
          scroll-snap-align: start;
          cursor: pointer;
        }
        .vs-card__video-wrap {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%;
          background: #111;
          overflow: hidden;
          border-radius: 3px;
        }
        .vs-card__video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .vs-card__overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.25);
          transition: background 0.3s ease;
        }
        .vs-card:hover .vs-card__overlay {
          background: rgba(0,0,0,0.1);
        }
        .vs-card__play-icon {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: rgba(255,255,255,0.8);
          transition: opacity 0.3s ease;
        }
        .vs-card:hover .vs-card__play-icon {
          opacity: 0;
        }
        .vs-card__label {
          margin-top: 10px;
          font-family: var(--font-eyebrow);
          font-size: 0.8rem;
          letter-spacing: 0.06em;
          color: var(--color-espresso);
          text-align: center;
        }
        @media (max-width: 560px) {
          .vs-card {
            width: 260px;
          }
        }
      `}</style>
    </section>
  )
}
