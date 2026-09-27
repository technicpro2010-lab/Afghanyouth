const socials = [
  { label: 'Facebook', href: 'https://facebook.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'X', href: 'https://x.com' },
]

export default function Footer() {
  return (
    <footer className="bg-navy-900 px-6 py-12">
      <div className="section-inner flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div>
            <p className="text-paper font-display text-lg mb-1">JAVELS</p>
            <p className="text-gray-400 text-sm mb-0">
              Tokyo, Japan
            </p>
            <p className="text-gray-400 text-sm">(555) 010-1234</p>
          </div>

          <div>
            <p className="eyebrow text-gold-light mb-2">Connect with us</p>
            <div className="flex gap-4">
              {socials.map((s) => (
                <a key={s.label} href={s.href} className="text-gray-300 text-sm hover:text-paper">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-wrap gap-2 justify-between text-xs text-gray-500">
          <span>© {new Date().getFullYear()} JAVELS</span>
          <span>Life · Business · Education</span>
        </div>
      </div>
    </footer>
  )
}
