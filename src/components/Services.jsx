import { useLanguage } from '../context/LanguageContext.jsx'

export default function Services() {
  const { t } = useLanguage()
  const s = t.services

  return (
    <section id="services" className="section bg-paper-dim">
      <div className="section-inner">
        <span className="eyebrow">{s.eyebrow}</span>
        <h3 className="mb-5">{s.heading}</h3>

        <div className="grid gap-6 sm:grid-cols-3">
          {s.pillars.map((p) => (
            <div key={p.title} className="seal-card">
              <h3 className="mb-3">{p.title}</h3>
              <ul className="m-0 p-0 list-none flex flex-col gap-2">
                {p.items.map((item) => (
                  <li key={item} className="text-base text-ink flex gap-2">
                    <span className="text-brass">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-5 max-w-3xl">{s.disclaimer}</p>
      </div>
    </section>
  )
}
