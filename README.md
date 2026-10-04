# JAVELS — Life · Business · Education (Tailwind CSS)

A React + Vite + Tailwind CSS starting point for an education/scholarship
organization site: browsing scholarships, and booking + paying for an
advisor appointment.

## Run it locally

Copy `.env.example` to `.env` and set your Stripe test keys. The publishable
key is used by the browser; the secret key is only used by the API server.
Never put a Stripe secret key in frontend code or commit it.
Use Node.js 20 or later.

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

In a second terminal, run the payment API:

```bash
npm run server
```

The Vite development server forwards `/api` requests to this API on port 4242.
Use Stripe test-mode keys and test card numbers from Stripe's documentation
while developing. Switch to live-mode keys only after deploying the API over
HTTPS and testing the complete payment flow.

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

## Appointment payments

The appointment form uses Stripe's Payment Element. The browser sends the
selected service and appointment details to `server/index.js`; the server
looks up the price and creates a PaymentIntent in JPY. The amount is never
accepted from the browser. Card details are collected by Stripe and are not
handled by this application.

The local `.env` file must define both `VITE_STRIPE_PUBLISHABLE_KEY` and
`STRIPE_SECRET_KEY`. Vite exposes only the publishable key to the client;
keep the secret key private on the server. The current server creates
PaymentIntents and adds appointment details to their Stripe metadata. The
confirmation screen verifies the returned PaymentIntent with Stripe.js, but
appointments are not yet saved to a database or calendar and no appointment
confirmation email is sent. Add a Stripe webhook and durable appointment
storage before treating a successful payment as a persisted booking.

The API server must be deployed with the frontend (or routed under the same
origin at `/api`) for production. Configure the deployment's environment
variables with live keys and use HTTPS.

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
