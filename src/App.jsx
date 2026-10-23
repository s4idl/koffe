import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Menu from './components/Menu.jsx'
import Beans from './components/Beans.jsx'
import Order from './components/Order.jsx'
import Community from './components/Community.jsx'
import Visit from './components/Visit.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      {/* 2.4.1 Bypass Blocks: lets keyboard users skip the header and nav */}
      <a className="skip-link" href="#contenido">
        Saltar al contenido principal
      </a>
      <Header />
      <main id="contenido" tabIndex={-1}>
        <Hero />
        <Menu />
        <Beans />
        <Order />
        <Community />
        <Visit />
      </main>
      <Footer />
    </>
  )
}
