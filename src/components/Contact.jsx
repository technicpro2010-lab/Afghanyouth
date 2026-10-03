import { useState } from 'react'
import emailjs from '@emailjs/browser'
import WhatsAppIcon from '../assets/whatsapp.png'
import { useLanguage } from '../context/LanguageContext.jsx'

// ─────────────────────────────────────────────────────────────────────────────
//  EmailJS configuration — replace these three values after signing up at
//  https://www.emailjs.com (see README or previous setup instructions).
// ─────────────────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'
// ─────────────────────────────────────────────────────────────────────────────

export default function Contact() {
  const { t } = useLanguage()
  const c = t.contact

  const [form,   setForm]   = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message },
        EMAILJS_PUBLIC_KEY
      )
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section bg-navy-900">
      <div className="section-inner flex flex-col gap-10">
        <div>
          <span className="eyebrow text-gold-light">{c.eyebrow}</span>
          <h3 className="text-paper">{c.heading}</h3>
          <p className="text-paper/80">{c.body}</p>
          <h4 className="text-paper/60 mt-1">JAVELS</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: contact form */}
          <div>
            {status === 'sent' ? (
              <p className="text-gold-light font-semibold">{c.form.success}</p>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="field">
                  <label htmlFor="contactName" className="!text-paper">{c.form.name}</label>
                  <input id="contactName" type="text" required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="field">
                  <label htmlFor="contactEmail" className="!text-paper">{c.form.email}</label>
                  <input id="contactEmail" type="email" required value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="field">
                  <label htmlFor="contactMessage" className="!text-paper">{c.form.message}</label>
                  <textarea id="contactMessage" rows={4} required value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>

                {status === 'error' && (
                  <p className="text-danger mb-3">{c.form.error}</p>
                )}

                <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                  {status === 'sending' ? c.form.sending : c.form.submit}
                </button>
              </form>
            )}
          </div>

          {/* Right: WhatsApp */}
          <div className="p-5 flex flex-col items-start gap-5">
            <h3 className="text-paper">{c.whatsapp.heading}</h3>
            <p className="text-paper/70">{c.whatsapp.body}</p>
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