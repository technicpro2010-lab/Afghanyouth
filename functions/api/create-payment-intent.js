const fees = {
  life: 3000,
  business: 5000,
  education: 3000,
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })
}

export async function onRequestPost({ request, env }) {
  if (!env.STRIPE_SECRET_KEY) {
    console.error('Stripe is not configured for this Pages deployment.')
    return json({ error: 'Stripe is not configured on the server.' }, 503)
  }

  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Appointment details are incomplete or invalid.' }, 400)
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return json({ error: 'Appointment details are incomplete or invalid.' }, 400)
  }

  const { serviceId, fullName, email, date, time, notes } = body
  if (
    typeof serviceId !== 'string' || !Object.hasOwn(fees, serviceId) ||
    typeof fullName !== 'string' || !fullName.trim() || fullName.length > 120 ||
    typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 ||
    typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    typeof time !== 'string' || !/^\d{2}:\d{2}$/.test(time) ||
    (notes !== undefined && (typeof notes !== 'string' || notes.length > 1000))
  ) {
    return json({ error: 'Appointment details are incomplete or invalid.' }, 400)
  }

  const stripeParams = new URLSearchParams({
    amount: String(fees[serviceId]),
    currency: 'jpy',
    'automatic_payment_methods[enabled]': 'true',
    receipt_email: email,
    description: `JAVELS ${serviceId} consultation`,
    'metadata[service_id]': serviceId,
    'metadata[customer_name]': fullName.trim(),
    'metadata[appointment_date]': date,
    'metadata[appointment_time]': time,
    'metadata[appointment_notes]': (notes || '').trim().slice(0, 500),
  })

  try {
    const stripeResponse = await fetch('https://api.stripe.com/v1/payment_intents', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: stripeParams,
    })
    const result = await stripeResponse.json()

    if (!stripeResponse.ok || !result.client_secret) {
      console.error('Stripe rejected PaymentIntent creation:', {
        status: stripeResponse.status,
        message: result.error?.message,
      })
      return json({ error: 'Unable to start payment. Please try again.' }, 502)
    }

    return json({ clientSecret: result.client_secret })
  } catch (error) {
    console.error('Failed to create Stripe PaymentIntent:', error)
    return json({ error: 'Unable to start payment. Please try again.' }, 502)
  }
}
