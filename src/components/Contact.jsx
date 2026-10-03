import { useState } from 'react'
import WhatsAppIcon from '../assets/whatsapp.png'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    // Wire this up to your backend or an email service (see README).
    setSent(true)
  }

  return (
    <section id="contact" className="section bg-navy-900">
      <div className="section-inner flex flex-col gap-10">
        <div>
          <span className="eyebrow text-gold-light">Questions first?</span>
          <h3 className="text-paper">let's connect.</h3>
          <p className="text-paper/80">
            Tell us what you need. we will help you find the right next step.
          </p>
          <h4 className="text-paper/60 mt-1">JAVELS</h4>

         
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: contact form */}
          <div>
            {sent ? (
              <p className="text-gold-light">
                Thanks — your message was sent. We'll be in touch shortly.
              </p>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="field">
                  <label htmlFor="contactName" className="!text-paper">Name</label>
                  <input
                    id="contactName"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label htmlFor="contactEmail" className="!text-paper">Email</label>
                  <input
                    id="contactEmail"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label htmlFor="contactMessage" className="!text-paper">Message</label>
                  <textarea
                    id="contactMessage"
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Send message</button>
              </form>
            )}
          </div>

          {/* Right: direct WhatsApp contact */}
          <div className="p-5 flex flex-col items-start gap-5">
            <h3 className="text-paper">Prefer Other Ways to Connect?</h3>
            <p className="text-paper/70">
              Skip the form and message us directly — usually the fastest way
              to get a same-day reply.
            </p>
            <a
              href="https://wa.me/+817037919654"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img src={WhatsAppIcon} alt="WhatsApp" className="w-8 h-8" />
              <span className="text-paper font-semibold text-base">+81-70-3791-9654</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}