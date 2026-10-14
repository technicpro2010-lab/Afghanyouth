import { loadStripe } from '@stripe/stripe-js'

let stripePromise

export function getStripe() {
  if (!stripePromise) {
    stripePromise = fetch('/api/stripe-config')
      .then(async (response) => {
        const result = await response.json()
        if (!response.ok) {
          throw new Error(result.error || 'Stripe is not configured on the server.')
        }
        if (typeof result.publishableKey !== 'string' || !result.publishableKey.startsWith('pk_')) {
          throw new Error('The payment server returned an invalid Stripe publishable key.')
        }
        return loadStripe(result.publishableKey)
      })
      .then((stripe) => {
        if (!stripe) throw new Error('Stripe could not be initialized.')
        return stripe
      })
      .catch((error) => {
        stripePromise = undefined
        throw error
      })
  }

  return stripePromise
}
