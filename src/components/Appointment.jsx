import { useState } from 'react'
import Payment from './Payment.jsx'

const serviceOptions = [
  { value: 'life', label: 'Life consultation (housing, banking, daily life)', fee: 30 },
  { value: 'business', label: 'Business consultation (visa, company setup, tax)', fee: 60 },
  { value: 'education', label: 'Education consultation (classes, scholarships)', fee: 25 },
]

const initialForm = {
  fullName: '',
  email: '',
  service: serviceOptions[0].value,
  date: '',
  time: '',
  notes: '',
}

export default function Appointment() {
  // step: 'details' -> 'payment' -> 'confirmed'
  const [step, setStep] = useState('details')
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [transactionId, setTransactionId] = useState(null)

  const selectedService = serviceOptions.find((s) => s.value === form.service)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function validate() {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email.'
    if (!form.date) e.date = 'Choose a date.'
    if (!form.time) e.time = 'Choose a time.'
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

    // ------------------------------------------------------------------
    // REAL INTEGRATION POINT:
    // Once payment is confirmed, POST the appointment + transaction id to
    // your backend, e.g.
    //   await fetch('/api/appointments', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ ...form, transactionId: txId }),
    //   })
    // The backend should be the source of truth: verify the payment with
    // the processor server-side before marking the appointment confirmed.
    // ------------------------------------------------------------------
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
          <span className="eyebrow">Book Appointment</span>
          <h2>Talk to an advisor.</h2>
          <p>
            Choose your desired service, select an available date and time, and proceed to payment to finalize your booking.
          </p>
        </div>

        <div className="seal-card max-w-lg">
          {step === 'details' && (
            <form onSubmit={handleDetailsSubmit} noValidate>
              <div className="field">
                <label htmlFor="fullName">Full name</label>
                <input
                  id="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={(e) => update('fullName', e.target.value)}
                />
                {errors.fullName && <span className="field-error">{errors.fullName}</span>}
              </div>

              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className="field">
                <label htmlFor="service">Service</label>
                <select
                  id="service"
                  value={form.service}
                  onChange={(e) => update('service', e.target.value)}
                >
                  {serviceOptions.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label} — ${s.fee}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4">
                <div className="field flex-1">
                  <label htmlFor="date">Date</label>
                  <input
                    id="date"
                    type="date"
                    value={form.date}
                    onChange={(e) => update('date', e.target.value)}
                  />
                  {errors.date && <span className="field-error">{errors.date}</span>}
                </div>
                <div className="field flex-1">
                  <label htmlFor="time">Time</label>
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
                <label htmlFor="notes">What would you like to cover? (optional)</label>
                <textarea
                  id="notes"
                  rows={3}
                  value={form.notes}
                  onChange={(e) => update('notes', e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Continue to payment — ${selectedService.fee}
              </button>
            </form>
          )}

          {step === 'payment' && (
            <Payment
              amount={selectedService.fee}
              onBack={() => setStep('details')}
              onSuccess={handlePaymentSuccess}
            />
          )}

          {step === 'confirmed' && (
            <div>
              <h3 className="text-success">Appointment confirmed</h3>
              <p>
                {form.fullName}, your {selectedService.label.toLowerCase()} is booked for{' '}
                {form.date} at {form.time}. A confirmation was sent to {form.email}.
              </p>
              <p className="text-sm">Reference: {transactionId}</p>
              <button className="btn btn-secondary" onClick={resetFlow}>
                Book another session
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
