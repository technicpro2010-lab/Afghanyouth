import { useLanguage } from '../context/LanguageContext.jsx'

export default function OurStory() {
  const { lang, t } = useLanguage()
  const s = t.story
  const isJa = lang === 'ja'

  return (
    <section id="OurStory" className="section bg-paper-dim">
      <div className="section-inner max-w-5xl mx-auto flex flex-col items-center text-center px-4">
        <span className="eyebrow">{s.eyebrow}</span>
        <h3 className="mb-4">{s.heading}</h3>

        {/* Story Card with JAVELS Seal Styling */}
        <div className="seal-card bg-paper p-6 sm:p-8 md:p-10 w-full max-w-3xl text-center mt-2 shadow-sm">
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

        <div className="w-full mt-14">
          <h4 className="font-display text-2xl sm:text-3xl text-navy-900 mb-3">
            {s.teamHeading}
          </h4>
          <p className="text-ink-soft max-w-2xl mx-auto mb-8">
            {s.teamIntro}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto text-center">
            {s.team.map((member) => (
              <article
                key={member.name}
                className="bg-white rounded-2xl shadow-sm border border-line p-6 sm:p-8 transition-shadow hover:shadow-md flex flex-col items-center"
              >
                <img
                  className="w-36 h-36 rounded-full object-cover border-4 border-paper shadow-sm"
                  src={member.image}
                  alt={member.imageAlt}
                  loading="lazy"
                />
                <h5 className="text-xl font-bold text-navy-900 mt-5">
                  {member.name}
                </h5>
                <p className="text-sm font-semibold text-brass mt-1">
                  {member.role}
                </p>
                <p className="text-ink-soft text-sm mt-4 leading-relaxed">
                  {member.bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}