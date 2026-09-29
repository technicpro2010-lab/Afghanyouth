import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import FeaturedQuote from './components/FeaturedQuote.jsx'
import Explore from './components/Explore.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import Scholarships from './components/Scholarships.jsx'
import Appointment from './components/Appointment.jsx'
import Testimonials from './components/Testimonials.jsx'
import Newsletter from './components/Newsletter.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedQuote />
        <Explore />
        <About />
        <Services />
        <Appointment />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
