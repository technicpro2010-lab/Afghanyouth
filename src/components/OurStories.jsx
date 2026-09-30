const highlights = [
  {
    title: 'Licensed professional network',
    desc: 'Regulated services are handled in cooperation with licensed administrative scriveners, judicial scriveners, tax accountants, and real-estate professionals.',
  },
]

export default function OurStories() {
  return (
    <section id="mission" className="section bg-paper-dim text-center">
      <div className="section-inner flex flex-col items-center gap-12">
        
        {/* Mission Header */}
        <div className="flex flex-col items-center">
          <span className="eyebrow">Our mission</span>
          <h2>A multilingual platform for life in Japan.</h2>
          <p className="mx-auto mt-4 text-center">
            JAVELS helps foreign residents, families, and entrepreneurs
            navigate life, business, and education in Japan. We provide
            practical and educational support directly, and connect clients
            with appropriately licensed Japanese professionals when
            specialized services are required.
          </p>
             {/* Highlights Section */}
            {highlights.map((h) => (
            <div key={h.title} className="flex flex-col items-center text-center">
              <h3>{h.title}</h3>
              <p className="mt-2 text-sm text-center mx-auto">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}