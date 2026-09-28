const highlights = [

  {
    title: 'Licensed professional network',
    desc: 'Regulated services are handled in cooperation with licensed administrative scriveners, judicial scriveners, tax accountants, and real-estate professionals.',
  },
]

export default function About() {
  return (
    <section id="mission" className="section">
      <div className="section-inner grid grid-cols-1 gap-10">
        <div>
          <span className="eyebrow">Our mission</span>
          <h2>A multilingual platform for life in Japan.</h2>
          <p>
            JAVELS helps foreign residents, families, and entrepreneurs
            navigate life, business, and education in Japan. We provide
            practical and educational support directly, and connect clients
            with appropriately licensed Japanese professionals when
            specialized services are required.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-line pt-6">
          {highlights.map((h) => (
            <div key={h.title} className="flex flex-col gap-1">
              <h3 className="text-lg">{h.title}</h3>
              <p className="text-sm">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
