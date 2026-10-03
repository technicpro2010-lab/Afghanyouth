import { useState } from 'react'
import emailjs from '@emailjs/browser'
import WhatsAppIcon from '../assets/whatsapp.png'

// ─────────────────────────────────────────────────────────────────────────────
//  EmailJS configuration
//  1. Go to https://www.emailjs.com and create a FREE account.
//  2. Click "Email Services" → Add New Service → choose Gmail → connect your
//     Gmail account (ghulamreza.rozbeh@gmail.com) → copy the Service ID below.
//  3. Click "Email Templates" → Create New Template.
//     In the template body paste:
//       Name:    {{from_name}}
//       Email:   {{from_email}}
//       Message: {{message}}
//     Set "To Email" to ghulamreza.rozbeh@gmail.com → Save → copy Template ID.
//  4. Click your account name (top right) → "Account" → copy the Public Key.
//  5. Replace the three placeholder strings below with your real values.
// ─────────────────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'    // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'   // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'    // e.g. 'AbCdEfGhIjKlMnOpQr'
// ─────────────────────────────────────────────────────────────────────────────

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'sent' | 'error'

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('sending')

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          message:    form.message,
        },
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
            {status === 'sent' ? (
              <p className="text-gold-light font-semibold">
                ✓ Message sent! We'll be in touch at {form.email || 'your email'} shortly.
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

                {status === 'error' && (
                  <p className="text-danger mb-3">
                    Something went wrong. Please try again or message us on WhatsApp.
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </button>
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