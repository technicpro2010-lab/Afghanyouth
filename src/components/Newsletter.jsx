import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    // Wire this up to your email provider (Mailchimp, Resend audiences,
    // etc.) from a backend endpoint — see the README.
    setSubmitted(true)
  }

  return (
    <section className="section bg-paper-dim text-center">
      <div className="section-inner max-w-lg mx-auto flex flex-col items-center gap-3">
        <h3>Stay in touch.</h3>
        <p>
          Hear about new scholarships and advising slots as they open. We
          promise not to send too many emails.
        </p>
        {submitted ? (
          <p className="text-success font-semibold">You're on the list — thank you!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border border-line bg-white px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brass"
            />
            <button type="submit" className="btn btn-primary whitespace-nowrap">
              Sign up
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
