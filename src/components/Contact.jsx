import { useState } from 'react'

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
      <div className="section-inner grid grid-cols-1 gap-10">
        <div>
          <span className="eyebrow text-gold-light">Questions first?</span>
          <h2 className="text-paper">Send us a message.</h2>
          <p className="text-gray-200">
            Not ready to book? Ask us anything about our services, fees, or
            how a consultation works and we'll reply within one business day.
          </p>
        </div>

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
      </div>
    </section>
  )
}
