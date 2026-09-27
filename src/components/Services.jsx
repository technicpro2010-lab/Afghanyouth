const pillars = [
  {
    title: 'Life',
    items: [
      'Housing & property search',
      'Banking & card support',
      'Translation & interpretation',
      'Daily-life & settlement support',
    ],
  },
  {
    title: 'Business',
    items: [
      'Visa & immigration',
      'Company establishment',
      'Business setup',
      'Tax & accounting support',
      'Commercial property',
      'Export/import & shipping coordination',
    ],
  },
  {
    title: 'Education',
    items: [
      'Japanese language classes',
      'Education support',
      'Seminars & workshops',
      'Scholarship / educational programs',
      'Community & cultural activities',
    ],
  },
]

export default function Services() {
  return (
    <section id="services" className="section bg-paper-dim">
      <div className="section-inner">
        <span className="eyebrow">What we do</span>
        <h2 className="mb-8">Three pillars of support.</h2>

        <div className="grid gap-6 sm:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="seal-card">
              <h3 className="mb-3">{p.title}</h3>
              <ul className="m-0 p-0 list-none flex flex-col gap-2">
                {p.items.map((item) => (
                  <li key={item} className="text-sm text-ink-soft flex gap-2">
                    <span className="text-brass">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm max-w-3xl">
          Professional or regulated services are provided in cooperation with
          appropriately licensed specialists, including administrative
          scriveners, judicial scriveners, tax accountants, and real-estate
          professionals.
        </p>
      </div>
    </section>
  )
}
