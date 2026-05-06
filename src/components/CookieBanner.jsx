import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X, ChevronRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { getT } from '../i18n/translations.js'

const STORAGE_KEY = 'duma-cookie-consent'

/**
 * Saves the guest's cookie choice to localStorage.
 * value: 'all' | 'essential' | 'pending-manage'
 */
function saveConsent(value) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice: value, ts: Date.now() }))
  } catch (_) {
    // localStorage unavailable — fail silently
  }
}

function getStoredConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch (_) {
    return null
  }
}

export default function CookieBanner({ preloadDone }) {
  const { lang } = useLanguage()
  const t = getT(lang)
  const cb = t.cookieBanner

  // visible only once preload is done AND no prior consent is stored
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!preloadDone) return
    const stored = getStoredConsent()
    if (!stored) {
      // Small delay so the hero animation settles before the banner slides in
      const timer = setTimeout(() => setVisible(true), 900)
      return () => clearTimeout(timer)
    }
  }, [preloadDone])

  const dismiss = (choice) => {
    saveConsent(choice)
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="ckb-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={lang === 'it' ? 'Consenso Cookie' : 'Cookie Consent'}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.52, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Dismiss × */}
          <button
            className="ckb-close"
            onClick={() => dismiss('essential')}
            aria-label={lang === 'it' ? 'Chiudi' : 'Dismiss'}
          >
            <X size={16} strokeWidth={1.8} />
          </button>

          <div className="ckb-inner">
            {/* Icon + headline */}
            <div className="ckb-lead">
              <div className="ckb-icon" aria-hidden="true">
                <Cookie size={22} strokeWidth={1.5} />
              </div>
              <div>
                <p className="ckb-headline">{cb.headline}</p>
                <p className="ckb-body">{cb.body}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="ckb-actions">
              <button
                className="ckb-btn ckb-btn--accept"
                onClick={() => dismiss('all')}
              >
                {cb.acceptAll}
              </button>
              <button
                className="ckb-btn ckb-btn--reject"
                onClick={() => dismiss('essential')}
              >
                {cb.rejectNonEssential}
              </button>
              <button
                className="ckb-btn ckb-btn--manage"
                onClick={() => dismiss('essential')}
              >
                {cb.manage}
              </button>
              <a
                href="/cookies"
                className="ckb-learn"
              >
                {cb.learnMore}
                <ChevronRight size={13} strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
          </div>

          <style>{`
            .ckb-overlay {
              position: fixed;
              bottom: clamp(16px, 3vw, 32px);
              left: 50%;
              transform: translateX(-50%);
              width: min(96vw, 760px);
              z-index: 9999;
              background: rgba(13, 10, 6, 0.96);
              backdrop-filter: blur(18px) saturate(1.2);
              -webkit-backdrop-filter: blur(18px) saturate(1.2);
              border: 1px solid rgba(201, 169, 110, 0.22);
              border-radius: 8px;
              box-shadow:
                0 24px 60px rgba(0, 0, 0, 0.52),
                0 0 0 1px rgba(255, 255, 255, 0.04) inset;
              padding: clamp(18px, 3vw, 28px) clamp(18px, 3.5vw, 36px);
            }

            .ckb-close {
              position: absolute;
              top: 12px;
              right: 14px;
              background: none;
              border: none;
              cursor: pointer;
              color: rgba(255, 255, 255, 0.38);
              padding: 4px;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: color 0.2s;
              border-radius: 3px;
            }
            .ckb-close:hover { color: rgba(255, 255, 255, 0.75); }

            .ckb-inner {
              display: flex;
              align-items: center;
              gap: clamp(16px, 3vw, 32px);
              flex-wrap: wrap;
            }

            /* Lead */
            .ckb-lead {
              display: flex;
              align-items: flex-start;
              gap: 14px;
              flex: 1 1 260px;
              min-width: 0;
            }
            .ckb-icon {
              flex-shrink: 0;
              width: 44px;
              height: 44px;
              border-radius: 50%;
              background: rgba(201, 169, 110, 0.14);
              border: 1px solid rgba(201, 169, 110, 0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              color: #c9a96e;
              margin-top: 2px;
            }
            .ckb-headline {
              font-family: var(--font-title);
              font-size: clamp(1rem, 1.8vw, 1.18rem);
              font-weight: 400;
              color: #fff;
              margin: 0 0 4px;
              line-height: 1.3;
            }
            .ckb-body {
              font-family: var(--font-body);
              font-size: 0.82rem;
              color: rgba(255, 255, 255, 0.55);
              line-height: 1.6;
              margin: 0;
            }

            /* Actions */
            .ckb-actions {
              display: flex;
              align-items: center;
              gap: 10px;
              flex-shrink: 0;
              flex-wrap: wrap;
            }
            .ckb-btn {
              font-family: var(--font-nav);
              font-size: 0.58rem;
              font-weight: 600;
              letter-spacing: 0.13em;
              text-transform: uppercase;
              padding: 11px 20px;
              border-radius: 3px;
              cursor: pointer;
              border: 1.5px solid transparent;
              transition:
                background 0.25s ease,
                color 0.25s ease,
                border-color 0.25s ease,
                transform 0.2s ease;
              white-space: nowrap;
            }
            .ckb-btn:hover { transform: translateY(-1px); }

            .ckb-btn--accept {
              background: #c9a96e;
              color: #0d0a06;
              border-color: #c9a96e;
            }
            .ckb-btn--accept:hover {
              background: #a8835a;
              border-color: #a8835a;
            }

            .ckb-btn--reject {
              background: transparent;
              color: rgba(255, 255, 255, 0.60);
              border-color: rgba(255, 255, 255, 0.18);
            }
            .ckb-btn--reject:hover {
              color: rgba(255, 255, 255, 0.90);
              border-color: rgba(255, 255, 255, 0.42);
            }

            .ckb-btn--manage {
              background: transparent;
              color: #c9a96e;
              border-color: rgba(201, 169, 110, 0.38);
            }
            .ckb-btn--manage:hover {
              background: rgba(201, 169, 110, 0.1);
              border-color: #c9a96e;
            }

            .ckb-learn {
              display: inline-flex;
              align-items: center;
              gap: 3px;
              font-family: var(--font-nav);
              font-size: 0.56rem;
              letter-spacing: 0.12em;
              text-transform: uppercase;
              color: rgba(255, 255, 255, 0.38);
              text-decoration: none;
              transition: color 0.22s;
              white-space: nowrap;
            }
            .ckb-learn:hover { color: #c9a96e; }

            /* ── Mobile ── */
            @media (max-width: 560px) {
              .ckb-inner { flex-direction: column; gap: 16px; }
              .ckb-actions { width: 100%; justify-content: flex-start; }
              .ckb-lead { flex: 1 1 auto; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
