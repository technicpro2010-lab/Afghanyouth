# JAVELS — Life · Business · Education (Tailwind CSS)

A React + Vite + Tailwind CSS starting point for an education/scholarship
organization site: browsing scholarships, and booking + paying for an
advisor appointment.

## Run it locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

To build for production: `npm run build` (output goes to `dist/`).

## Project structure

```
tailwind.config.js     ALL design tokens live here: colors, fonts, max-width
postcss.config.js      wires Tailwind into the build
src/
  main.jsx             entry point, mounts <App />
  index.css            Tailwind directives + every shared style
                        (btn, seal-card, field, hero, etc.) via @layer
  App.jsx              composes every section in order
  components/
    Navbar.jsx          sticky nav, collapses to a menu on mobile
    Hero.jsx            background-photo headline + calls to action
    OurStory.jsx           org description + stats
    Services.jsx        the 3 services offered
    Scholarships.jsx    table of open scholarships
    Appointment.jsx     booking form -> payment -> confirmation (3 steps)
    Payment.jsx         card form used inside the Appointment flow
    Testimonials.jsx    student quotes
    Contact.jsx         general contact form
    Footer.jsx
```

## Design direction

The layout borrows structural ideas from agfaf.org (Afghan Girls Financial
Assistance Fund) — a centered, photo-led hero with a short mantra, a quote
from students right underneath, a card grid ("Explore") linking into the
rest of the site, big impact numbers, and a newsletter signup before the
footer's social links and address. None of AGFAF's text, photos, or code
were copied — this is the same *pattern*, filled with placeholder content
for JAVELS. Swap the palette in `tailwind.config.js` and
the copy in each component to make it your own.

## Where styling lives (this is the part that changed)

Nothing in `components/` defines a color, a font size, or a spacing value
directly. Instead:

- **`tailwind.config.js`** is the single source of truth for the palette
  (`navy`, `brass`, `paper`, `ink`, `line`, `success`, `danger`) and the two
  font families (`font-display`, `font-body`). Change a hex code there and
  every component that uses `bg-navy-900` or `text-brass` updates.
- **`src/index.css`** defines every *reusable* class a component reaches
  for — `.btn`, `.btn-primary`, `.seal-card`, `.field`, `.section`,
  `.hero`, etc. — once, using Tailwind's `@apply`. A component only ever
  writes `className="btn btn-primary"`, never a long one-off string of
  utilities repeated across files.
- Components use plain Tailwind utilities (`flex`, `gap-4`, `mt-2`, …) only
  for one-off layout tweaks specific to that component — never for color or
  typography, which always come from the classes above.

To restyle the whole site — say, swap the accent from brass to teal — you
edit `tailwind.config.js` (and maybe a couple of gradient values in
`index.css`) and never touch a component file.

## How the booking + payment flow works right now

`Appointment.jsx` holds a `step` state (`'details' | 'payment' | 'confirmed'`)
and the form data. It renders:

1. A details form (name, email, service, date, time) with basic validation.
2. On submit, it switches to `<Payment />`, passing the fee for the chosen
   service.
3. `Payment.jsx` collects card details, validates their *shape* (not
   whether the card is real), and currently **simulates** a successful
   charge after ~1 second.
4. On success it calls `onSuccess(transactionId)`, which flips `Appointment`
   to the confirmation screen.

**This is a front-end mock.** No real money moves and no data leaves the
browser yet. Here's the path to a real version:

### 1. Add a real payment processor (Stripe is the common choice)

- Create a Stripe account, get your publishable + secret keys.
- `npm install @stripe/stripe-js @stripe/react-stripe-js` on the frontend.
- Replace the raw `<input>` card fields in `Payment.jsx` with Stripe's
  `<CardElement />` (or Payment Element). Stripe's library tokenizes the
  card number in the browser — your code and your server never see or
  store the raw card number, which keeps you out of PCI-compliance scope.
- In `handleSubmit`, call `stripe.confirmCardPayment(...)` instead of the
  `setTimeout` mock.

### 2. Add a backend

You need a server for two things the browser can't safely do:
- Create a Stripe "PaymentIntent" (this is where the actual fee amount is
  set — never trust an amount sent from the browser).
- Verify the payment succeeded before you mark an appointment as booked.

A minimal Node/Express sketch:

```js
// server/index.js
app.post('/api/create-payment-intent', async (req, res) => {
  const { serviceId } = req.body
  const fee = FEES[serviceId] // look up server-side, don't trust the client
  const intent = await stripe.paymentIntents.create({
    amount: fee * 100, // Stripe uses cents
    currency: 'usd',
  })
  res.json({ clientSecret: intent.client_secret })
})

app.post('/api/appointments', async (req, res) => {
  // verify req.body.paymentIntentId succeeded with Stripe, then
  // save the appointment to your database
})
```

Any backend works — the important part is: **the fee amount and the "did
payment succeed" check must happen server-side.**

### 3. Persist appointments somewhere

Add a database (Postgres, MongoDB, etc.) and a table/collection for
appointments: name, email, service, date, time, status, transaction id.

### 4. Send confirmation emails

Use a transactional email service (Resend, Postmark, SendGrid) from your
backend after an appointment is saved.

## Extending the scholarship list

`Scholarships.jsx` currently has a hardcoded array. Once you have a
backend, replace that array with a `fetch('/api/scholarships')` call in a
`useEffect`. Same idea applies to `Appointment.jsx`'s `serviceOptions`.

## The hero background photo

`.hero` in `src/index.css` points at `src/assets/hero-bg.jpg`, which
doesn't exist yet — add your own licensed photo there and it will appear
automatically (a dark gradient overlay is already set up so headline text
stays readable). See the note in our previous message about sourcing that
photo responsibly (Unsplash/Pexels for free-to-use stock, or your own
organization's photos with consent) rather than pulling an image of real,
identifiable people from a general search.

## Suggested next components

- `Navbar` active-link highlighting on scroll
- A `Dashboard` area (behind login) where a student can see their past
  and upcoming appointments
- An admin view for staff to see/manage bookings

## Original repository note

this is a project for one of my client
