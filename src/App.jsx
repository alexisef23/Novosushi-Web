import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MenuSection from './components/MenuSection'
import ReservationForm from './components/ReservationForm'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import { useEffect } from 'react'
import { initMercadoPago } from './utils/mercadopago'

function App() {
  useEffect(() => {
    initMercadoPago()

    // Handle payment return from Mercado Pago
    const params = new URLSearchParams(window.location.search)
    const payment = params.get('payment')
    if (payment === 'success') {
      alert('✅ ¡Pago exitoso! Gracias por tu pedido en Novo Sushi.')
      window.history.replaceState({}, '', '/')
    } else if (payment === 'failure') {
      alert('❌ El pago fue rechazado. Puedes intentarlo de nuevo.')
      window.history.replaceState({}, '', '/')
    }
  }, [])

  return (
    <div className="min-h-screen bg-brand-black">
      <Navbar />
      <main>
        <Hero />
        <MenuSection />
        <ReservationForm />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}

export default App
