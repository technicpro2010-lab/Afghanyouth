// Placeholder quotes — replace with real client testimonials.
const quotes = [
  {
    text: 'JAVELS helped us set up our company and find an apartment in the same month — everything explained in our own language.',
    name: 'A. Rahimi',
    detail: 'Business & Life client',
  },
  {
    text: 'The advisor walked me through Japanese language classes and a scholarship application I never would have found on my own.',
    name: 'M. Tanaka-Silva',
    detail: 'Education client',
  },
]

export default function Testimonials() {
  return (
    <section className="section">
      <div className="section-inner grid gap-8 sm:grid-cols-2">
        {quotes.map((q) => (
          <figure key={q.name} className="m-0 border-l-2 border-brass pl-5">
            <blockquote className="font-display text-lg text-navy-900 mb-3">
              &ldquo;{q.text}&rdquo;
            </blockquote>
            <figcaption className="text-sm text-ink-soft">
              <strong className="text-ink">{q.name}</strong> — {q.detail}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
