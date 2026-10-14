import { loadStripe } from '@stripe/stripe-js'

const buildPublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
let stripePromise

export function getStripe() {
  if (!stripePromise) {
    stripePromise = (async () => {
      let publishableKey
      let configError
      try {
        const response = await fetch('/api/stripe-config', { cache: 'no-store' })
        const result = await response.json()
        if (response.ok && typeof result.publishableKey === 'string' && result.publishableKey.startsWith('pk_')) {
          publishableKey = result.publishableKey
        } else {
          configError = new Error(result.error || 'The payment server returned an invalid Stripe publishable key.')
        }
      } catch (error) {
        configError = error
      }

      if (!publishableKey && typeof buildPublishableKey === 'string' && buildPublishableKey.startsWith('pk_')) {
        publishableKey = buildPublishableKey
      }
      if (!publishableKey) {
        throw configError || new Error('Stripe publishable key is missing. Set VITE_STRIPE_PUBLISHABLE_KEY in Cloudflare Pages.')
      }

      const stripe = await loadStripe(publishableKey)
      if (!stripe) throw new Error('Stripe could not be initialized. Check that the publishable key is valid.')
      return stripe
    })().catch((error) => {
      stripePromise = undefined
      throw error
    })
  }

  return stripePromise
}
