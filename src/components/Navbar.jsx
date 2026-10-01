import { useState } from 'react'
import logo from '../assets/logo.jpg'

const links = [
  { href: '#top', label: 'Home' },
  { href: '#OurStory', label: 'Our Story' },
  { href: '#services', label: 'Services' },
  { href: '#appointment', label: 'Book Appointment' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 md:h-20 transition-colors duration-300 bg-white border-b border-line">
      <div className="section-inner relative justify-between h-full px-6">
        <a href="#top" className="absolute left-6 top-1/2 -translate-y-1/2 z-10 no-underline flex items-center gap-6">
          <img
            src={logo}
            alt="JAVELS — Life, Business, Education"
            className="bg-white px-2 py-1 w-44 md:w-52 h-auto"
          />
        </a>

        <div className="h-full flex items-center justify-end gap-6">
          <nav
            className={`
              gap-5 md:flex md:static md:flex-row md:border-0 md:p-0 md:bg-transparent
              ${open ? 'flex flex-col absolute top-full left-0 right-0 bg-white border-b border-line p-6' : 'hidden'}
            `}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="nav-link"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden border border-line text-ink px-3 py-2 text-sm bg-transparent transition-colors"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
    </header>
  )
}