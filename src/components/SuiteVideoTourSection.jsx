import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const VIMEO_ORIGIN = 'https://player.vimeo.com'
const VIMEO_IFRAME_READY_DELAY = 500
const VIDEO_END_RESET_THRESHOLD = 0.25

function buildVimeoSrc(videoId, autoplay = false) {
  return (
    `https://player.vimeo.com/video/${videoId}` +
    '?badge=0&autopause=0&player_id=0&app_id=58479' +
    '&byline=0&title=0&portrait=0&dnt=1&playsinline=1' +
    (autoplay ? '&autoplay=1' : '')
  )
}

export default function SuiteVideoTourSection({
  videoId,
  iframeTitle,
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  ctaHref = '#inquire',
  fadeUp,
}) {
  const iframeRef = useRef(null)
  const hasLoadedRef = useRef(false)
  const shouldAutoplayOnLoadRef = useRef(false)
  const hoveredRef = useRef(false)
  const fullyInViewRef = useRef(false)
  const resetInFlightRef = useRef(false)
  const [iframeSrc, setIframeSrc] = useState('')

  const { ref: loadRef, inView: loadInView } = useInView({
    threshold: 0.15,
    rootMargin: '240px 0px',
    triggerOnce: true,
  })
  const { ref: playRef, inView: fullyInView } = useInView({ threshold: 0.85 })

  const setSectionRef = useCallback((node) => {
    loadRef(node)
    playRef(node)
  }, [loadRef, playRef])

  const postToPlayer = useCallback((method, value) => {
    const message = value === undefined ? { method } : { method, value }
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify(message), VIMEO_ORIGIN)
  }, [])

  const pauseAndReset = useCallback(() => {
    if (!hasLoadedRef.current || resetInFlightRef.current) return
    resetInFlightRef.current = true
    postToPlayer('pause')
    postToPlayer('setCurrentTime', 0)
    window.setTimeout(() => {
      resetInFlightRef.current = false
    }, 120)
  }, [postToPlayer])

  const ensurePlayerLoaded = useCallback((autoplay = false) => {
    if (!hasLoadedRef.current) {
      hasLoadedRef.current = true
      shouldAutoplayOnLoadRef.current = autoplay
      setIframeSrc(buildVimeoSrc(videoId, autoplay))
      return
    }

    if (autoplay) {
      postToPlayer('play')
    }
  }, [postToPlayer, videoId])

  const syncPlayback = useCallback(() => {
    const shouldPlay = hoveredRef.current && fullyInViewRef.current

    if (shouldPlay) {
      ensurePlayerLoaded(true)
      return
    }

    if (hasLoadedRef.current) {
      postToPlayer('pause')
    }
  }, [ensurePlayerLoaded, postToPlayer])

  useEffect(() => {
    if (loadInView) {
      ensurePlayerLoaded(false)
    }
  }, [ensurePlayerLoaded, loadInView])

  useEffect(() => {
    fullyInViewRef.current = fullyInView
    syncPlayback()
  }, [fullyInView, syncPlayback])

  useEffect(() => {
    const onMessage = (event) => {
      if (event.origin !== VIMEO_ORIGIN) return
      if (event.source !== iframeRef.current?.contentWindow) return

      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data
        if (data?.event === 'finish') {
          pauseAndReset()
          return
        }

        if (data?.event === 'timeupdate') {
          const seconds = data?.data?.seconds
          const duration = data?.data?.duration
          if (
            typeof seconds === 'number' &&
            typeof duration === 'number' &&
            duration - seconds <= VIDEO_END_RESET_THRESHOLD
          ) {
            pauseAndReset()
          }
        }
      } catch {
        // ignore invalid postMessage payloads
      }
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [pauseAndReset])

  const handleIframeLoad = useCallback(() => {
    window.setTimeout(() => {
      postToPlayer('addEventListener', 'finish')
      postToPlayer('addEventListener', 'timeupdate')

      if (shouldAutoplayOnLoadRef.current || (hoveredRef.current && fullyInViewRef.current)) {
        postToPlayer('play')
      }

      shouldAutoplayOnLoadRef.current = false
    }, VIMEO_IFRAME_READY_DELAY)
  }, [postToPlayer])

  const handleMouseEnter = useCallback(() => {
    hoveredRef.current = true
    ensurePlayerLoaded(fullyInViewRef.current)
    syncPlayback()
  }, [ensurePlayerLoaded, syncPlayback])

  const handleMouseLeave = useCallback(() => {
    hoveredRef.current = false
    syncPlayback()
  }, [syncPlayback])

  return (
    <>
      <section className="suite-tour section" id="room-tour">
        <div className="container">
          <motion.span className="eyebrow text-center" {...fadeUp(0)}>
            {eyebrow}
          </motion.span>
          <motion.h2 className="section-title suite-tour__title" {...fadeUp(0.1)}>
            {title}
          </motion.h2>
          <motion.p className="suite-tour__subtitle" {...fadeUp(0.18)}>
            {subtitle}
          </motion.p>
          <motion.div
            className="suite-tour__frame-wrap"
            {...fadeUp(0.26)}
            ref={setSectionRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="suite-tour__frame" aria-label={iframeTitle}>
              {iframeSrc ? (
                <iframe
                  ref={iframeRef}
                  src={iframeSrc}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                  title={iframeTitle}
                  onLoad={handleIframeLoad}
                />
              ) : null}
            </div>
          </motion.div>
          <motion.div className="suite-tour__cta-wrap" {...fadeUp(0.34)}>
            <a href={ctaHref} className="btn btn-primary">{ctaLabel}</a>
          </motion.div>
        </div>
      </section>

      <style>{`
        .suite-tour__title {
          text-align: center;
          margin: 0.5rem 0 0.75rem;
        }
        .suite-tour__subtitle {
          font-family: var(--font-body);
          font-size: clamp(0.9rem, 1.4vw, 1rem);
          color: var(--color-text-muted);
          text-align: center;
          margin: 0 auto 2.5rem;
          max-width: 480px;
          line-height: 1.7;
        }
        .suite-tour__frame-wrap {
          position: relative;
          width: 100%;
          height: 100dvh;
          overflow: hidden;
          background: #000;
        }
        .suite-tour__frame {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .suite-tour__frame iframe {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100vw;
          height: 56.25vw;
          min-width: 177.78vh;
          min-height: 100vh;
          transform: translate(-50%, -50%);
          border: 0;
          display: block;
        }
        @media (max-width: 767px) {
          .suite-tour__frame iframe {
            width: 177.78vh;
            height: 100vh;
            min-width: 100%;
            min-height: 177.78vw;
          }
        }
        .suite-tour__cta-wrap {
          text-align: center;
          margin-top: 2.5rem;
        }
      `}</style>
    </>
  )
}
