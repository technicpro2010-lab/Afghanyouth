import { useLanguage } from '../context/LanguageContext.jsx'

export default function OurStory() {
  const { t } = useLanguage()
  const s = t.story

  return (
    <section id="OurStory" className="section bg-paper-dim text-center">
      <div className="section-inner flex flex-col items-center gap-12">
        <div className="flex flex-col items-center">
          <span className="eyebrow">{s.eyebrow}</span>
          <h3>{s.heading}</h3>
          <p className="mx-auto mt-4 text-center">{s.body}</p>

          <div className="flex flex-col items-center text-center mt-8">
            <h3>{s.highlightTitle}</h3>
            <p className="mt-4 text-center mx-auto">{s.highlightDesc}</p>
          </div>
        </div>
      </div>
    </section>
  )
}