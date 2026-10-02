export default function FeaturedQuote() {
  return (
    <section className="section bg-paper-dim text-center">
      <div className="section-inner max-w-2xl mx-auto flex flex-col items-center gap-4">
        <span className="eyebrow">A message from our clients</span>
        <blockquote className="font-display text-xl md:text-2xl text-navy-900 leading-snug">
          "JAVELS made the process simple and clear we alway know 
          what to do next."
          "Professional, responsive, and easy to communicate with.
          we felt support throughout the process"
          "JAVELS connected us with the right support
           when we need it most."
        </blockquote>
        <p className="text-sm text-ink-soft">— K. and J., JAVELS clients</p>
      </div>
    </section>
  )
}
