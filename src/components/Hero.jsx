import { useLanguage } from '../context/LanguageContext.jsx'

export default function Hero() {
  const { t } = useLanguage()
  const h = t.hero

  return (
    <section id="top" className="section hero -mt-16 md:-mt-20 !pt-28 !pb-20 md:!pt-40 md:!pb-28 min-h-[100dvh] flex items-center text-center">
      <div className="hero-overlay" />
      <div className="section-inner relative z-10 flex flex-col items-center gap-6">
        <span className="eyebrow text-gold-light">{h.eyebrow}</span>
        <h2 className="text-paper">{h.heading}</h2>
        <p className="text-paper/80">{h.body}</p>
        <div className="flex gap-4 flex-wrap justify-center mt-2">
          <a href="#appointment" className="btn btn-primary">{h.cta1}</a>
          <a href="#services"    className="btn btn-secondary-inverted">{h.cta2}</a>
        </div>
      </div>
    </section>
  )
}
