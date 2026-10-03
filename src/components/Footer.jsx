import FacebookIcon  from '../assets/facebook.png'
import InstagramIcon from '../assets/instagram.png'
import WhatsAppIcon  from '../assets/whatsapp.png'
import { useLanguage } from '../context/LanguageContext.jsx'

const socials = [
  { label: 'Facebook',  href: 'https://facebook.com',          icon: FacebookIcon  },
  { label: 'Instagram', href: 'https://instagram.com',         icon: InstagramIcon },
  { label: 'WhatsApp',  href: 'https://wa.me/+817037919654',   icon: WhatsAppIcon  },
]

export default function Footer() {
  const { t } = useLanguage()
  const f = t.footer

  return (
    <footer className="bg-navy-900 px-6 py-12">
      <div className="section-inner flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div>
            <h4 className="text-paper mb-1">JAVELS</h4>
            <p className="text-paper/50 mb-0">{f.location}</p>
            <p className="text-paper/50">+81-70-3791-9654</p>
          </div>

          <div>
            <p className="eyebrow text-gold-light mb-2">{f.connect}</p>
            <div className="flex gap-4">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="opacity-50 hover:opacity-100 transition-opacity">
                  <img src={s.icon} alt={s.label} className="w-8 h-8" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-wrap gap-2 justify-between text-xs text-paper/30">
          <span>© {new Date().getFullYear()} JAVELS</span>
          <span>{f.copyright}</span>
          <span>{f.tagline}</span>
        </div>
      </div>
    </footer>
  )
}
