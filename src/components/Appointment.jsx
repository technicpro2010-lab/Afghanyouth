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
  const { t } = useLanguage()
  const a = t.appointment

  const [step,          setStep]          = useState('details')
  const [form,          setForm]          = useState(initialForm)
  const [errors,        setErrors]        = useState({})
  const [transactionId, setTransactionId] = useState(null)

  const selectedService = a.serviceOptions.find((s) => s.value === form.service)

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
      <div className="section-inner grid grid-cols-1 gap-10 items-start">
        <div>
          <span className="eyebrow">{a.eyebrow}</span>
          <h3>{a.heading}</h3>
          <p>{a.body}</p>
        </div>

        <div className="seal-card max-w-lg">
          {step === 'details' && (
            <form onSubmit={handleDetailsSubmit} noValidate>
              <div className="field">
                <label htmlFor="fullName">{a.fields.fullName}</label>
                <input id="fullName" type="text" value={form.fullName} onChange={(e) => update('fullName', e.target.value)} />
                {errors.fullName && <span className="field-error">{errors.fullName}</span>}
              </div>

              <div className="field">
                <label htmlFor="email">{a.fields.email}</label>
                <input id="email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className="field">
                <label htmlFor="service">{a.fields.service}</label>
                <select id="service" value={form.service} onChange={(e) => update('service', e.target.value)}>
                  {a.serviceOptions.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label} — ${s.fee}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4">
                <div className="field flex-1">
                  <label htmlFor="date">{a.fields.date}</label>
                  <input id="date" type="date" value={form.date} onChange={(e) => update('date', e.target.value)} />
                  {errors.date && <span className="field-error">{errors.date}</span>}
                </div>
                <div className="field flex-1">
                  <label htmlFor="time">{a.fields.time}</label>
                  <input id="time" type="time" value={form.time} onChange={(e) => update('time', e.target.value)} />
                  {errors.time && <span className="field-error">{errors.time}</span>}
                </div>
              </div>

              <div className="field">
                <label htmlFor="notes">{a.fields.notes}</label>
                <textarea id="notes" rows={3} value={form.notes} onChange={(e) => update('notes', e.target.value)} />
              </div>

              <button type="submit" className="btn btn-primary">
                {a.submit} — ${selectedService.fee}
              </button>
            </form>
          )}

          {step === 'payment' && (
            <Payment
              amount={selectedService.fee}
              onBack={() => setStep('details')}
              onSuccess={(txId) => { setTransactionId(txId); setStep('confirmed') }}
            />
          )}

          {step === 'confirmed' && (
            <div>
              <h3 className="text-success">{a.confirmed.heading}</h3>
              <p>{a.confirmed.message(form.fullName, selectedService.label.toLowerCase(), form.date, form.time, form.email)}</p>
              <p>{a.confirmed.reference} {transactionId}</p>
              <button className="btn btn-secondary" onClick={resetFlow}>{a.confirmed.again}</button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
