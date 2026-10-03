import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import Payment from './Payment.jsx'

const initialForm = {
  fullName: '',
  email:    '',
  service:  'life',
  date:     '',
  time:     '',
  notes:    '',
}

export default function Appointment() {
  const { lang, t } = useLanguage()
  const a = t.appointment
  const isJa = lang === 'ja'

  const [step,          setStep]          = useState('details')
  const [form,          setForm]          = useState(initialForm)
  const [errors,        setErrors]        = useState({})
  const [transactionId, setTransactionId] = useState(null)

  const selectedService = a.serviceOptions.find((s) => s.value === form.service) || a.serviceOptions[0]

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function validate() {
    const e = {}
    if (!form.fullName.trim()) e.fullName = a.errors.fullName
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = a.errors.email
    if (!form.date) e.date = a.errors.date
    if (!form.time) e.time = a.errors.time
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleDetailsSubmit(event) {
    event.preventDefault()
    if (!validate()) return
    setStep('payment')
  }

  function handlePaymentSuccess(txId) {
    setTransactionId(txId)
    setStep('confirmed')
  }

  function resetFlow() {
    setForm(initialForm)
    setErrors({})
    setTransactionId(null)
    setStep('details')
  }

  return (
    <section id="appointment" className="section bg-paper-dim">
      <div className="section-inner grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left column: Title, Subtitle, and Highlights */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          <span className="eyebrow">{a.eyebrow}</span>
          <h3 className="mb-3">{a.heading}</h3>
          <p className="mb-6">{a.body}</p>

          {/* Consultation details badge list */}
          <div className="w-full bg-paper border border-line p-5 rounded-sm flex flex-col gap-3">
            <h4 className="text-base font-semibold text-navy-900 border-b border-line pb-2">
              {isJa ? '相談プラン・料金' : 'Consultation Options & Pricing'}
            </h4>
            <ul className="space-y-2.5">
              {a.serviceOptions.map((s) => (
                <li key={s.value} className="flex justify-between items-center text-sm">
                  <span className="text-ink-soft">{s.label.split('(')[0].trim()}</span>
                  <span className="font-semibold text-navy-900">¥{s.fee.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right column: Form Card */}
        <div className="lg:col-span-7 w-full">
          <div className="seal-card w-full shadow-sm">
            {step === 'details' && (
              <form onSubmit={handleDetailsSubmit} noValidate>
                <div className="field">
                  <label htmlFor="fullName">{a.fields.fullName}</label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => update('fullName', e.target.value)}
                  />
                  {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                </div>

                <div className="field">
                  <label htmlFor="email">{a.fields.email}</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                  />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>

                <div className="field">
                  <label htmlFor="service">{a.fields.service}</label>
                  <select
                    id="service"
                    value={form.service}
                    onChange={(e) => update('service', e.target.value)}
                  >
                    {a.serviceOptions.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label} — ¥{s.fee.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="field">
                    <label htmlFor="date">{a.fields.date}</label>
                    <input
                      id="date"
                      type="date"
                      value={form.date}
                      onChange={(e) => update('date', e.target.value)}
                    />
                    {errors.date && <span className="field-error">{errors.date}</span>}
                  </div>
                  <div className="field">
                    <label htmlFor="time">{a.fields.time}</label>
                    <input
                      id="time"
                      type="time"
                      value={form.time}
                      onChange={(e) => update('time', e.target.value)}
                    />
                    {errors.time && <span className="field-error">{errors.time}</span>}
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="notes">{a.fields.notes}</label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={form.notes}
                    onChange={(e) => update('notes', e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full sm:w-auto mt-2">
                  {a.submit} — ¥{selectedService.fee.toLocaleString()}
                </button>
              </form>
            )}

            {step === 'payment' && (
              <Payment
                amount={selectedService.fee}
                onBack={() => setStep('details')}
                onSuccess={(txId) => {
                  setTransactionId(txId)
                  setStep('confirmed')
                }}
              />
            )}

            {step === 'confirmed' && (
              <div className="space-y-4">
                <h3 className="text-success">{a.confirmed.heading}</h3>
                <p>
                  {a.confirmed.message(
                    form.fullName,
                    selectedService.label.toLowerCase(),
                    form.date,
                    form.time,
                    form.email
                  )}
                </p>
                <div className="bg-paper-dim border border-line p-3 text-sm rounded-sm">
                  <span className="text-ink-soft">{a.confirmed.reference}</span>{' '}
                  <strong className="text-ink">{transactionId}</strong>
                </div>
                <button className="btn btn-secondary mt-2" onClick={resetFlow}>
                  {a.confirmed.again}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
