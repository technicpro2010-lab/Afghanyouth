import 'dotenv/config'
import express from 'express'
import Stripe from 'stripe'

const app = express()
const port = Number(process.env.PORT) || 4242
const fees = {
  life: 3000,
  business: 5000,
  education: 3000,
}
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null

app.use(express.json())

app.post('/api/create-payment-intent', async (req, res) => {
  if (!stripe) {
    return res.status(503).json({ error: 'Stripe is not configured on the server.' })
  }

  const { serviceId, fullName, email, date, time } = req.body ?? {}
  if (!Object.hasOwn(fees, serviceId)) {
    return res.status(400).json({ error: 'Select a valid consultation service.' })
  }
  if (
    typeof fullName !== 'string' || !fullName.trim() || fullName.length > 120 ||
    typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 ||
    typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    typeof time !== 'string' || !/^\d{2}:\d{2}$/.test(time)
  ) {
    return res.status(400).json({ error: 'Appointment details are incomplete or invalid.' })
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: fees[serviceId],
      currency: 'jpy',
      automatic_payment_methods: { enabled: true },
      receipt_email: email,
      description: `JAVELS ${serviceId} consultation`,
      metadata: {
        service_id: serviceId,
        customer_name: fullName.trim(),
        appointment_date: date,
        appointment_time: time,
      },
    })
    return res.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Failed to create Stripe PaymentIntent:', error)
    return res.status(502).json({ error: 'Unable to start payment. Please try again.' })
  }
})

app.listen(port, () => {
  console.log(`Stripe API server listening on http://localhost:${port}`)
})
