import { useEffect, useState } from 'react'
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { stripePromise } from '../stripe.js'
import { useLanguage } from '../context/LanguageContext.jsx'

function StripePaymentForm({ onSuccess, onBack }) {
  const { lang } = useLanguage()
  const isJa = lang === 'ja'
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState('')
  const [processing, setProcessing] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    if (!stripe || !elements || processing) return

    setProcessing(true)
    setError('')

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: window.location.href },
        redirect: 'if_required',
      })

      if (stripeError) {
        setError(stripeError.message || (isJa ? 'お支払いを完了できませんでした。' : 'Payment could not be completed.'))
      } else if (paymentIntent?.status === 'succeeded') {
        onSuccess(paymentIntent.id)
      } else {
        setError(isJa ? 'お支払いの確認が完了していません。もう一度お試しください。' : 'Payment has not completed. Please try again.')
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : (isJa ? 'お支払いを完了できませんでした。' : 'Payment could not be completed.'))
    } finally {
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && <p className="field-error mt-3" role="alert">{error}</p>}
      <div className="flex gap-4 mt-4">
        <button type="button" className="btn btn-secondary" onClick={onBack} disabled={processing}>
          {isJa ? '戻る' : 'Back'}
        </button>
        <button type="submit" className="btn btn-primary" disabled={!stripe || processing}>
          {processing
            ? (isJa ? '処理中…' : 'Processing…')
            : (isJa ? '支払う' : 'Pay')}
        </button>
      </div>
    </form>
  )
}

export default function Payment({ serviceId, amount, appointment, onSuccess, onBack, initialError }) {
  const { lang } = useLanguage()
  const isJa = lang === 'ja'
  const [clientSecret, setClientSecret] = useState('')
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!stripePromise) return undefined

    const controller = new AbortController()
    async function createIntent() {
      setLoading(true)
      setError('')
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            serviceId,
            fullName: appointment.fullName,
            email: appointment.email,
            date: appointment.date,
            time: appointment.time,
          }),
        })
        const result = await response.json()
        if (!response.ok) throw new Error(result.error || 'Unable to start payment.')
        if (!result.clientSecret) throw new Error('The payment server returned an invalid response.')
        setClientSecret(result.clientSecret)
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || (isJa ? 'お支払いを開始できませんでした。' : 'Unable to start payment.'))
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    createIntent()
    return () => controller.abort()
  }, [serviceId, appointment, attempt, isJa])

  const formattedAmount = `¥${amount.toLocaleString()}`

  return (
    <div>
      <h3 className="mb-1">{isJa ? '相談料金のお支払い' : 'Pay the consultation fee'}</h3>
      <p className="mb-4">
        {isJa ? 'ご請求金額：' : 'Amount due: '}
        <strong className="text-ink font-semibold text-base">{formattedAmount}</strong>
      </p>

      {!stripePromise && (
        <p className="field-error mb-4" role="alert">
          {isJa
            ? 'Stripeが設定されていません。サイト管理者にお問い合わせください。'
            : 'Stripe is not configured. Please contact the site administrator.'}
        </p>
      )}
      {initialError && <p className="field-error mb-4" role="alert">{initialError}</p>}
      {stripePromise && loading && <p role="status">{isJa ? 'お支払いを準備しています…' : 'Preparing secure payment…'}</p>}
      {stripePromise && error && (
        <div className="mb-4">
          <p className="field-error" role="alert">{error}</p>
          <button type="button" className="btn btn-secondary mt-3" onClick={() => setAttempt((value) => value + 1)}>
            {isJa ? '再試行' : 'Try again'}
          </button>
        </div>
      )}
      {stripePromise && clientSecret && !loading && !error && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <StripePaymentForm onSuccess={onSuccess} onBack={onBack} />
        </Elements>
      )}
      <button
        type="button"
        className="btn btn-secondary mt-3"
        onClick={onBack}
        disabled={loading}
        hidden={Boolean(clientSecret && !loading && !error)}
      >
        {isJa ? '戻る' : 'Back'}
      </button>
    </div>
  )
}
