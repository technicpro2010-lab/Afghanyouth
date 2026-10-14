function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}

export async function onRequestGet({ env }) {
  const publishableKey = env.VITE_STRIPE_PUBLISHABLE_KEY
  if (typeof publishableKey !== 'string' || !publishableKey.startsWith('pk_')) {
    console.error('Stripe publishable key is not configured for this Pages deployment.')
    return json({ error: 'Stripe publishable key is not configured on the server.' }, 503)
  }

  return json({ publishableKey })
}
