const highlights = [
  {
    title: 'Licensed Professional Network',
    desc: 'Regulated services are handled in cooperation with licensed administrative scriveners, judicial scriveners, tax accountants, and real-estate professionals.',
  },
]

export default function OurStory() {
  return (
    <section id="OurStory" className="section bg-paper-dim text-center">
      <div className="section-inner flex flex-col items-center gap-12">
        
        {/* Mission Header */}
        <div className="flex flex-col items-center">
          <span className="eyebrow">Our Story</span>
          <h3>Connecting Poeple, Business & Opportunities</h3>
          <p className="mx-auto mt-4 text-sm text-center">
            JAVELS was created to bridge poeple with services, professionals and opportunities
            they need in Japan.
            Through multilingual support, practical coordination, education, and
            growing professional network, we help individuals and businesses move
            forward with confidence.
            our mission is simple: to connect poeple, business and opportunies in Japan 
          </p>
             {/* Highlights Section */}
            {highlights.map((h) => (
            <div key={h.title} className="flex flex-col items-center text-center">
              <h3>{h.title}</h3>
              <p className="mt-4 text-sm text-center mx-auto">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}