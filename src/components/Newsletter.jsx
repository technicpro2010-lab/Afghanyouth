import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Newsletter() {
  const { t } = useLanguage()
  const n = t.newsletter

  const [email,     setEmail]     = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="section bg-paper-dim text-center">
      <div className="section-inner max-w-lg mx-auto flex flex-col items-center gap-3">
        <h3>{n.heading}</h3>
        <p>{n.body}</p>
        {submitted ? (
          <p className="text-success font-semibold">{n.success}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <input
              type="email"
              required
              placeholder={n.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border border-line bg-white px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brass"
            />
            <button type="submit" className="btn btn-primary whitespace-nowrap">
              {n.submit}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
