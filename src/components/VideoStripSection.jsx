import { useRef, useState, useEffect, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../context/LanguageContext.jsx'
import { getT } from '../i18n/translations.js'

import cheetahIcon from '../assets/cheetah.png'

import vid1 from '../assets/infinity-pool-rooftopview.MOV'
import vid2 from '../assets/rooftop-infinity-pool-view.mp4'
import vid5 from '../assets/sea-urchin-on-beach.MP4'
import vid6 from '../assets/watamu-shoreline-video.MOV'
import vid7 from '../assets/watamu-whitesands-beach.MP4'
import vid3 from '../assets/safari-blue-seafood-local-prawns.MOV'
import vid4 from '../assets/safari-blue-sudi-island-seafood-bbq.MOV'

// Safari Blue videos ordered last per design spec
const VIDEOS = [vid1, vid2, vid5, vid6, vid7, vid3, vid4]

function VideoCard({ src, label }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const isHoveredRef = useRef(false)

  // IntersectionObserver: auto-play when ≥50% visible, auto-pause when <30% visible
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Use ref to persist the last-seen ratio across observer callbacks
    const lastRatioRef = { current: 0 }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio
        if (ratio >= 0.5) {
          // Entered view sufficiently — auto-play
          video.play().catch(() => {})
          setPlaying(true)
        } else if (ratio < 0.3 && lastRatioRef.current >= 0.5) {
          // Scrolled out of view — auto-pause
          video.pause()
          setPlaying(false)
        }
        lastRatioRef.current = ratio
      },
      { threshold: [0, 0.3, 0.5, 0.75, 1.0] }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const play = useCallback(() => {
    videoRef.current?.play().catch(() => {})
    setPlaying(true)
  }, [])

  const pause = useCallback(() => {
    videoRef.current?.pause()
    setPlaying(false)
  }, [])

  // Desktop: play on hover, pause on mouse-leave (unless in-view auto is playing)
  const handleMouseEnter = () => {
    isHoveredRef.current = true
    play()
  }
  const handleMouseLeave = () => {
    isHoveredRef.current = false
    pause()
  }

  // Click / tap to toggle
  const handleClick = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) { play() } else { pause() }
  }

  return (
    <div
      className="vs-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
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
          title={label}
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
        />
        <div className="vs-card__overlay" aria-hidden="true" />
        <div className={`vs-card__play-icon${playing ? ' vs-card__play-icon--hidden' : ''}`} aria-hidden="true">▶</div>
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

          <div className="vs-cheetah-divider" aria-hidden="true">
            <span className="vs-cheetah-divider__line" />
            <img src={cheetahIcon} alt="" className="vs-cheetah-divider__icon" />
            <span className="vs-cheetah-divider__line" />
          </div>

          <h2 className="section-title">{vt.title}</h2>
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
        .vs-cheetah-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin: 12px auto 16px;
          max-width: 280px;
        }
        .vs-cheetah-divider__line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--color-teal), transparent);
          opacity: 0.6;
        }
        .vs-cheetah-divider__icon {
          width: 28px;
          height: 28px;
          object-fit: contain;
          opacity: 0.75;
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
          height: 420px;
          background: #0a0a0a;
          overflow: hidden;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .vs-card__video {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          transition: opacity 0.4s ease;
        }
        .vs-card__overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.3);
          transition: background 0.4s ease, opacity 0.4s ease;
          pointer-events: none;
        }
        .vs-card:hover .vs-card__overlay {
          background: rgba(0,0,0,0.05);
        }
        .vs-card__play-icon {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: rgba(255,255,255,0.85);
          transition: opacity 0.35s ease;
          pointer-events: none;
        }
        .vs-card:hover .vs-card__play-icon,
        .vs-card__play-icon--hidden {
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
          .vs-card__video-wrap {
            height: 340px;
          }
        }
      `}</style>
    </section>
  )
}
