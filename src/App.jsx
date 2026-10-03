import { LanguageProvider } from './context/LanguageContext.jsx'
import Navbar       from './components/Navbar.jsx'
import Hero         from './components/Hero.jsx'
import FeaturedQuote from './components/FeaturedQuote.jsx'
import OurStory     from './components/OurStory.jsx'
import Services     from './components/Services.jsx'
import Appointment  from './components/Appointment.jsx'
import Newsletter   from './components/Newsletter.jsx'
import Contact      from './components/Contact.jsx'
import Footer       from './components/Footer.jsx'

export default function App() {
  return (
    <LanguageProvider>
      <Navbar />
      <main className="pt-16 md:pt-20">
        <Hero />
        <FeaturedQuote />
        <OurStory />
        <Services />
        <Appointment />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  )
}
