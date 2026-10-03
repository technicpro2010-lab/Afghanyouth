import { useLanguage } from '../context/LanguageContext.jsx'

export default function OurStory() {
  const { lang, t } = useLanguage()
  const s = t.story
  const isJa = lang === 'ja'

  return (
    <section id="OurStory" className="section bg-paper-dim">
      <div className="section-inner max-w-3xl mx-auto flex flex-col items-center text-center px-4">
        <span className="eyebrow">{s.eyebrow}</span>
        <h3 className="mb-4">{s.heading}</h3>

        {/* Story Card with JAVELS Seal Styling */}
        <div className="seal-card bg-paper p-6 sm:p-8 md:p-10 w-full text-center mt-2 shadow-sm">
          <p className="text-base leading-relaxed text-ink mx-auto max-w-2xl">
            {s.body}
          </p>

          {/* Core Values Tagline Bar */}
          <div className="mt-6 pt-5 border-t border-line flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-navy-900 tracking-wide">
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brass" />
              {isJa ? '多言語サポート' : 'Multilingual Support'}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              {isJa ? '実践的コーディネート' : 'Practical Coordination'}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brass" />
              {isJa ? '人・機会をつなぐ' : 'People & Opportunity'}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}