const cards = [
  {
    title: 'Life',
    desc: 'Housing, banking, translation, and everyday settlement support.',
    href: '#services',
    cta: 'See life services',
  },
  {
    title: 'Business',
    desc: 'Visas, company setup, tax support, and import/export coordination.',
    href: '#services',
    cta: 'See business services',
  },
  {
    title: 'Education',
    desc: 'Japanese classes, workshops, and scholarship or educational programs.',
    href: '#education-programs',
    cta: 'See education programs',
  },
  {
    title: 'Book a Session',
    desc: 'Reserve a paid one-on-one consultation with our team.',
    href: '#appointment',
    cta: 'Book now',
  },
]

export default function Explore() {
  return (
    <section id="explore" className="section">
      <div className="section-inner">
        <span className="eyebrow">Explore JAVELS</span>
        <h2 className="mb-8">One platform, three kinds of support.</h2>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <a 
              key={c.title} 
              href={c.href} 
              className="seal-card no-underline flex flex-col justify-between hover:border-brass transition-colors"
            >
              <div>
                <h3>{c.title}</h3>
                <p className="mt-2 mb-4 text-sm">{c.desc}</p>
              </div>
              <span className="text-sm font-semibold text-brass inline-flex items-center gap-1">
                {c.cta} &rarr;
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}