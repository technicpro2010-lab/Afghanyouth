export default function Hero() {
  return (
    <section id="top" className="section hero !py-28 md:!py-36 text-center">
      <div className="hero-overlay" />
      <div className="section-inner relative z-10 flex flex-col items-center gap-6">
        <span className="eyebrow text-gold-light">Life · Business · Education</span>
        <h1 className="text-paper">Supporting Life, Business &amp; Education in Japan.</h1>
        <p className="text-gray-200 text-lg max-w-2xl">
          JAVELS is a multilingual support and business platform helping
          foreign residents, families, and entrepreneurs navigate life,
          business, and education in Japan — with direct support and
          connections to appropriately licensed professionals when needed.
        </p>
        <div className="flex gap-4 flex-wrap justify-center mt-2">
          <a href="#appointment" className="btn btn-primary">Book a consultation</a>
          <a href="#services" className="btn btn-secondary-inverted">Explore our services</a>
        </div>
      </div>
    </section>
  )
}
