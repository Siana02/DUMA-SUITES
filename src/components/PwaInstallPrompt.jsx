import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, Plus, Share, Smartphone, X } from 'lucide-react'
import {
  getPwaInstallPreference,
  isStandaloneDisplayMode,
  setPwaInstallPreference,
} from '../utils/localPreferences.js'

const DISMISS_WINDOW_MS = 1000 * 60 * 60 * 24 * 14

function isIosInstallableBrowser() {
  if (typeof window === 'undefined') return false

  const userAgent = window.navigator.userAgent || ''
  return /iphone|ipad|ipod/i.test(userAgent)
}

export default function PwaInstallPrompt({ preloadDone }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [promptType, setPromptType] = useState(null)

  useEffect(() => {
    if (isStandaloneDisplayMode()) {
      setPwaInstallPreference({ installed: true })
    }
  }, [])

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault()
      setDeferredPrompt(event)
    }

    const handleAppInstalled = () => {
      setPwaInstallPreference({ installed: true, dismissedUntil: 0 })
      setPromptType(null)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  useEffect(() => {
    if (!preloadDone || isStandaloneDisplayMode()) return

    const preference = getPwaInstallPreference()
    if (preference.installed || preference.dismissedUntil > Date.now()) return

    const nextPromptType = deferredPrompt ? 'native' : isIosInstallableBrowser() ? 'ios' : null
    if (!nextPromptType) return

    const timer = window.setTimeout(() => setPromptType(nextPromptType), 1400)
    return () => window.clearTimeout(timer)
  }, [deferredPrompt, preloadDone])

  const dismissPrompt = () => {
    setPwaInstallPreference({ dismissedUntil: Date.now() + DISMISS_WINDOW_MS })
    setPromptType(null)
  }

  const handleInstall = async () => {
    if (!deferredPrompt) return

    setPromptType(null)
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      setPwaInstallPreference({ installed: true, dismissedUntil: 0 })
    } else {
      setPwaInstallPreference({ dismissedUntil: Date.now() + DISMISS_WINDOW_MS })
    }

    setDeferredPrompt(null)
  }

  const isVisible = promptType !== null
  const isIosPrompt = promptType === 'ios'
  const title = isIosPrompt
    ? 'Add Duma Suites to your Home Screen for the full app experience.'
    : 'Install Duma Suites for a faster home-screen experience.'
  const eyebrow = isIosPrompt ? 'Add to Home Screen' : 'App Download'

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          className="pwa-prompt"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
          aria-label="Install Duma Suites app"
        >
          <button
            type="button"
            className="pwa-prompt__close"
            onClick={dismissPrompt}
            aria-label="Dismiss install prompt"
          >
            <X size={15} strokeWidth={1.8} />
          </button>

          <div className="pwa-prompt__icon" aria-hidden="true">
            {isIosPrompt ? <Share size={20} strokeWidth={1.6} /> : <Smartphone size={20} strokeWidth={1.6} />}
          </div>

          <div className="pwa-prompt__copy">
            <p className="pwa-prompt__eyebrow">{eyebrow}</p>
            <p className="pwa-prompt__title">{title}</p>
            {isIosPrompt && (
              <p className="pwa-prompt__instructions">
                Tap <span><Share size={13} strokeWidth={1.8} aria-hidden="true" /> Share</span>, then choose{' '}
                <span><Plus size={13} strokeWidth={1.8} aria-hidden="true" /> Add to Home Screen</span>.
              </p>
            )}
          </div>

          {isIosPrompt ? (
            <button
              type="button"
              className="pwa-prompt__button pwa-prompt__button--secondary"
              onClick={dismissPrompt}
            >
              Maybe Later
            </button>
          ) : (
            <button
              type="button"
              className="pwa-prompt__button"
              onClick={handleInstall}
            >
              <Download size={14} strokeWidth={1.8} aria-hidden="true" />
              Install App
            </button>
          )}

          <style>{`
            .pwa-prompt {
              position: fixed;
              top: clamp(88px, 10vw, 118px);
              right: clamp(16px, 3vw, 28px);
              z-index: 1100;
              display: grid;
              grid-template-columns: auto 1fr auto;
              align-items: center;
              gap: 14px;
              width: min(420px, calc(100vw - 32px));
              padding: 16px 18px;
              background: rgba(13, 10, 6, 0.92);
              border: 1px solid rgba(201, 169, 110, 0.2);
              box-shadow:
                0 18px 44px rgba(0, 0, 0, 0.32),
                0 0 0 1px rgba(255, 255, 255, 0.04) inset;
              backdrop-filter: blur(18px) saturate(1.15);
              -webkit-backdrop-filter: blur(18px) saturate(1.15);
              border-radius: 10px;
            }
            .pwa-prompt__close {
              position: absolute;
              top: 10px;
              right: 10px;
              border: 0;
              background: transparent;
              color: rgba(255, 255, 255, 0.46);
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 4px;
              transition: color 0.2s ease;
            }
            .pwa-prompt__close:hover { color: rgba(255, 255, 255, 0.78); }
            .pwa-prompt__icon {
              width: 42px;
              height: 42px;
              border-radius: 50%;
              border: 1px solid rgba(201, 169, 110, 0.28);
              background: rgba(201, 169, 110, 0.12);
              color: #c9a96e;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .pwa-prompt__copy {
              min-width: 0;
              padding-right: 8px;
            }
            .pwa-prompt__eyebrow {
              margin: 0 0 4px;
              font-family: var(--font-nav);
              font-size: 0.54rem;
              letter-spacing: 0.14em;
              text-transform: uppercase;
              color: rgba(255, 255, 255, 0.5);
            }
            .pwa-prompt__title {
              margin: 0;
              font-family: var(--font-body);
              font-size: 0.84rem;
              line-height: 1.55;
              color: rgba(255, 255, 255, 0.86);
            }
            .pwa-prompt__instructions {
              margin: 8px 0 0;
              font-family: var(--font-body);
              font-size: 0.72rem;
              line-height: 1.55;
              color: rgba(255, 255, 255, 0.68);
            }
            .pwa-prompt__instructions span {
              display: inline-flex;
              align-items: center;
              gap: 4px;
              color: rgba(255, 255, 255, 0.82);
              white-space: nowrap;
            }
            .pwa-prompt__button {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              border: 1px solid transparent;
              background: #c9a96e;
              color: #0d0a06;
              padding: 11px 15px;
              border-radius: 4px;
              font-family: var(--font-nav);
              font-size: 0.58rem;
              letter-spacing: 0.13em;
              text-transform: uppercase;
              cursor: pointer;
              transition: transform 0.2s ease, background 0.2s ease;
              white-space: nowrap;
            }
            .pwa-prompt__button--secondary {
              background: rgba(255, 255, 255, 0.08);
              border-color: rgba(255, 255, 255, 0.16);
              color: rgba(255, 255, 255, 0.84);
            }
            .pwa-prompt__button:hover {
              background: #a8835a;
              transform: translateY(-1px);
            }
            .pwa-prompt__button--secondary:hover {
              background: rgba(255, 255, 255, 0.14);
            }
            @media (max-width: 900px) {
              .pwa-prompt {
                top: 84px;
                right: 16px;
                left: 16px;
                width: auto;
                grid-template-columns: auto 1fr;
              }
              .pwa-prompt__button {
                grid-column: 1 / -1;
                justify-content: center;
              }
            }
          `}</style>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
