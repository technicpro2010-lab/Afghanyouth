import { useLanguage } from '../context/LanguageContext.jsx'

export default function FeaturedQuote() {
  const { t } = useLanguage()
  const q = t.quote

  return (
    <section className="section bg-paper-dim text-center">
      <div className="section-inner max-w-2xl mx-auto flex flex-col items-center gap-6">
        <span className="eyebrow">{q.eyebrow}</span>
        <div className="flex flex-col gap-4">
          {q.items.map((item, i) => (
            <blockquote key={i} className="section-quote">
              {item}
            </blockquote>
          ))}
        </div>
        <p className="text-ink-soft">{q.attribution}</p>
      </div>
    </section>
  )
}
