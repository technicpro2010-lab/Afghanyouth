import { useState } from 'react'

/**
 * Payment is intentionally a "dumb" presentational + local-validation
 * component. It does NOT talk to a real payment processor — see the
 * comment near handleSubmit for how to wire it to Stripe later.
 *
 * Props:
 *  - amount: number (fee to charge, in whole currency units)
 *  - onSuccess: (transactionId: string) => void
 *  - onBack: () => void
 */
export default function Payment({ amount, onSuccess, onBack }) {
  const [form, setForm] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  })
  const [errors, setErrors] = useState({})
  const [processing, setProcessing] = useState(false)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function validate() {
    const e = {}
    if (!form.cardName.trim()) e.cardName = 'Enter the name on the card.'
    if (!/^\d{13,19}$/.test(form.cardNumber.replace(/\s/g, '')))
      e.cardNumber = 'Enter a valid card number.'
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry))
      e.expiry = 'Use MM/YY format.'
    if (!/^\d{3,4}$/.test(form.cvc)) e.cvc = 'Enter a valid CVC.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!validate()) return

    setProcessing(true)

    // ------------------------------------------------------------------
    // REAL INTEGRATION POINT:
    // Replace this simulated delay with a call to your backend, which in
    // turn calls a payment processor (Stripe, PayPal, etc). Never send
    // raw card numbers to your own server — use the processor's client
    // SDK (e.g. Stripe Elements) to tokenize the card in the browser,
    // then send only the resulting token/paymentMethodId to your backend
    // to complete the charge. See the README for the Stripe outline.
    // ------------------------------------------------------------------
    setTimeout(() => {
      setProcessing(false)
      const mockTransactionId = `MOCK-${Date.now()}`
      onSuccess(mockTransactionId)
    }, 900)
  }

  return (
    <div>
      <h3 className="mb-1">Pay the appointment fee</h3>
      <p>Amount due: <strong className="text-ink">${amount.toFixed(2)}</strong></p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="cardName">Name on card</label>
          <input
            id="cardName"
            type="text"
            value={form.cardName}
            onChange={(e) => update('cardName', e.target.value)}
          />
          {errors.cardName && <span className="field-error">{errors.cardName}</span>}
        </div>

        <div className="field">
          <label htmlFor="cardNumber">Card number</label>
          <input
            id="cardNumber"
            type="text"
            inputMode="numeric"
            placeholder="1234 1234 1234 1234"
            value={form.cardNumber}
            onChange={(e) => update('cardNumber', e.target.value)}
          />
          {errors.cardNumber && <span className="field-error">{errors.cardNumber}</span>}
        </div>

        <div className="flex gap-4">
          <div className="field flex-1">
            <label htmlFor="expiry">Expiry</label>
            <input
              id="expiry"
              type="text"
              placeholder="MM/YY"
              value={form.expiry}
              onChange={(e) => update('expiry', e.target.value)}
            />
            {errors.expiry && <span className="field-error">{errors.expiry}</span>}
          </div>
          <div className="field flex-1">
            <label htmlFor="cvc">CVC</label>
            <input
              id="cvc"
              type="text"
              inputMode="numeric"
              value={form.cvc}
              onChange={(e) => update('cvc', e.target.value)}
            />
            {errors.cvc && <span className="field-error">{errors.cvc}</span>}
          </div>
        </div>

        <div className="flex gap-4 mt-2">
          <button type="button" className="btn btn-secondary" onClick={onBack} disabled={processing}>
            Back
          </button>
          <button type="submit" className="btn btn-primary" disabled={processing}>
            {processing ? 'Processing…' : `Pay $${amount.toFixed(2)}`}
          </button>
        </div>
      </form>
    </div>
  )
}
