import FacebookIcon from '../assets/facebook.png'
import InstagramIcon from '../assets/instagram.png'
import LinkedInIcon from '../assets/linkedin.png'
import TwitterIcon from '../assets/twitter.png'

const socials = [
  { label: 'Facebook', href: 'https://facebook.com', icon: FacebookIcon },
  { label: 'Instagram', href: 'https://instagram.com', icon: InstagramIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: LinkedInIcon },
  { label: 'Twitter', href: 'https://twitter.com', icon: TwitterIcon },
]

export default function Footer() {
  return (
    <footer className="bg-navy-900 px-6 py-12">
      <div className="section-inner flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div>
            <h4 className="text-paper mb-1">JAVELS</h4>
            <p className="text-paper/50 text-sm mb-0">
              Chiba, Japan
            </p>
            <p className="text-paper/50 text-sm">+81-70-3791-9654</p>
          </div>

          <div>
            <p className="eyebrow text-gold-light mb-2">Connect with us</p>
            <div className="flex gap-4">
              {socials.map((s) => (
                <a key={s.icon} href={s.href} className="text-paper/50 text-sm hover:text-paper transition-colors">

                  <img src={s.icon} alt={s.label} className="w-8 h-8" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-wrap gap-2 justify-between text-xs text-paper/30">
          <span>© {new Date().getFullYear()} JAVELS</span>
          <span>Life · Business · Education</span>
        </div>
      </div>
    </footer>
  )
}
