import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../context/LanguageContext.jsx'
import { getT } from '../i18n/translations.js'

export default function HouseRulesPage() {
  const { lang } = useLanguage()
  const t = getT(lang)
  const hr = t.houseRules

  return (
    <>
      <Helmet>
        <title>House Rules – Duma Suites</title>
        <meta name="description" content="Ghepard Towers Residence regulations for use of apartments and common areas." />
      </Helmet>

      <main style={{ paddingTop: 80 }}>
        <section className="section house-rules-page">
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="hr-header">
              <span className="eyebrow">Ghepard Towers</span>
              <h1 className="section-title">{hr.title}</h1>
              <div className="divider" />
              <p className="hr-subtitle">{hr.subtitle}</p>
              <p className="hr-intro">{hr.intro}</p>
            </div>

            <div className="hr-sections">
              {hr.sections.map((section, idx) => (
                <div key={idx} className="hr-section">
                  <h2 className="hr-section__title">{section.title}</h2>

                  {section.items && (
                    <ul className="hr-section__list">
                      {section.items.map((item, i) => (
                        <li key={i} className="hr-section__item">
                          <span className="hr-section__bullet" aria-hidden="true">—</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.numbers && (
                    <table className="hr-numbers-table">
                      <thead>
                        <tr>
                          <th>{lang === 'it' ? 'Servizio' : 'Service'}</th>
                          <th>{lang === 'it' ? 'Numero' : 'Number'}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.numbers.map((row, i) => (
                          <tr key={i}>
                            <td>{row.label}</td>
                            <td className="hr-numbers-table__value">{row.value || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <style>{`
        .hr-header {
          text-align: center;
          margin-bottom: clamp(40px, 6vw, 64px);
        }
        .hr-subtitle {
          font-family: var(--font-eyebrow);
          font-style: italic;
          font-size: 1rem;
          color: var(--color-espresso);
          margin: 16px auto 24px;
          max-width: 680px;
          line-height: 1.6;
        }
        .hr-intro {
          font-size: 0.95rem;
          color: var(--color-text-muted);
          max-width: 680px;
          margin: 0 auto;
          line-height: 1.75;
        }
        .hr-sections {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        .hr-section {
          border-left: 4px solid var(--color-teal);
          padding-left: 24px;
        }
        .hr-section__title {
          font-family: var(--font-title);
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          color: var(--color-espresso);
          margin-bottom: 16px;
          font-weight: 600;
        }
        .hr-section__list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .hr-section__item {
          display: flex;
          gap: 12px;
          font-size: 0.93rem;
          color: var(--color-text-muted);
          line-height: 1.65;
          align-items: flex-start;
        }
        .hr-section__bullet {
          color: var(--color-teal);
          flex-shrink: 0;
          margin-top: 1px;
          font-weight: 600;
        }
        .hr-numbers-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
          margin-top: 8px;
        }
        .hr-numbers-table th {
          text-align: left;
          font-family: var(--font-nav);
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-espresso);
          padding: 10px 12px;
          border-bottom: 2px solid var(--color-teal);
        }
        .hr-numbers-table td {
          padding: 12px 12px;
          border-bottom: 1px solid rgba(86,51,17,0.1);
          color: var(--color-text-muted);
          vertical-align: top;
        }
        .hr-numbers-table__value {
          font-family: var(--font-nav);
          color: var(--color-espresso);
          font-size: 0.85rem;
        }
        .hr-numbers-table tr:last-child td {
          border-bottom: none;
        }
        @media (max-width: 560px) {
          .hr-section {
            padding-left: 16px;
          }
        }
      `}</style>
    </>
  )
}
