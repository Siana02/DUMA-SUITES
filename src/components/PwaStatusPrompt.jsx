import { useEffect, useState } from 'react'
import { RefreshCw, WifiOff, X } from 'lucide-react'

export default function PwaStatusPrompt() {
  const [status, setStatus] = useState(null)
  const [updateServiceWorker, setUpdateServiceWorker] = useState(null)

  useEffect(() => {
    const showOfflineReady = () => {
      setUpdateServiceWorker(null)
      setStatus('offline-ready')
    }
    const showUpdateReady = (event) => {
      setUpdateServiceWorker(() => event.detail?.updateServiceWorker || null)
      setStatus('update-ready')
    }

    window.addEventListener('pwa:offline-ready', showOfflineReady)
    window.addEventListener('pwa:update-ready', showUpdateReady)

    return () => {
      window.removeEventListener('pwa:offline-ready', showOfflineReady)
      window.removeEventListener('pwa:update-ready', showUpdateReady)
    }
  }, [])

  if (!status) return null

  const isUpdate = status === 'update-ready'

  return (
    <aside className="pwa-status" aria-live="polite">
      <div className="pwa-status__icon" aria-hidden="true">
        {isUpdate ? <RefreshCw size={18} strokeWidth={1.8} /> : <WifiOff size={18} strokeWidth={1.8} />}
      </div>

      <div className="pwa-status__copy">
        <p className="pwa-status__title">
          {isUpdate ? 'A newer app version is ready.' : 'Duma Suites is ready offline.'}
        </p>
        <p className="pwa-status__text">
          {isUpdate ? 'Refresh now for the latest experience.' : 'Recently visited pages can open without a connection.'}
        </p>
      </div>

      {isUpdate ? (
        <button
          type="button"
          className="pwa-status__action"
          onClick={() => updateServiceWorker?.(true)}
        >
          Refresh
        </button>
      ) : (
        <button
          type="button"
          className="pwa-status__action pwa-status__action--secondary"
          onClick={() => setStatus(null)}
        >
          Got it
        </button>
      )}

      <button
        type="button"
        className="pwa-status__close"
        onClick={() => setStatus(null)}
        aria-label="Dismiss app status"
      >
        <X size={14} strokeWidth={1.8} />
      </button>

      <style>{`
        .pwa-status {
          position: fixed;
          left: calc(16px + env(safe-area-inset-left, 0px));
          bottom: calc(16px + env(safe-area-inset-bottom, 0px));
          z-index: 1090;
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 12px;
          align-items: center;
          width: min(420px, calc(100vw - 32px));
          padding: 14px 16px;
          background: rgba(13, 10, 6, 0.92);
          border: 1px solid rgba(201, 169, 110, 0.2);
          border-radius: 10px;
          box-shadow: 0 18px 44px rgba(0, 0, 0, 0.28);
          backdrop-filter: blur(18px) saturate(1.15);
          -webkit-backdrop-filter: blur(18px) saturate(1.15);
        }
        .pwa-status__icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c9a96e;
          border-radius: 50%;
          background: rgba(201, 169, 110, 0.12);
          border: 1px solid rgba(201, 169, 110, 0.28);
        }
        .pwa-status__copy {
          min-width: 0;
        }
        .pwa-status__title,
        .pwa-status__text {
          margin: 0;
        }
        .pwa-status__title {
          color: rgba(255, 255, 255, 0.9);
          font-family: var(--font-body);
          font-size: 0.84rem;
          line-height: 1.4;
        }
        .pwa-status__text {
          margin-top: 4px;
          color: rgba(255, 255, 255, 0.66);
          font-family: var(--font-body);
          font-size: 0.72rem;
          line-height: 1.45;
        }
        .pwa-status__action,
        .pwa-status__close {
          border: 0;
          cursor: pointer;
        }
        .pwa-status__action {
          padding: 10px 14px;
          border-radius: 4px;
          background: #c9a96e;
          color: #0d0a06;
          font-family: var(--font-nav);
          font-size: 0.58rem;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .pwa-status__action--secondary {
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.84);
          border: 1px solid rgba(255, 255, 255, 0.14);
        }
        .pwa-status__close {
          position: absolute;
          top: 10px;
          right: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          background: transparent;
          color: rgba(255, 255, 255, 0.46);
        }
        @media (max-width: 720px) {
          .pwa-status {
            grid-template-columns: auto 1fr;
            padding-right: 44px;
          }
          .pwa-status__action {
            grid-column: 1 / -1;
            justify-self: start;
          }
        }
      `}</style>
    </aside>
  )
}
