import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import useCartStore from '../store/cartStore'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { openCart, getCount } = useCartStore()
  const count = getCount()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '#menu', label: 'Menú' },
    { href: '#nosotros', label: 'Nosotros' },
  ]

  const scrollTo = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        const headerOffset = 90
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - headerOffset
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 150)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3 backdrop-blur-xl border-b border-brand-black-border bg-brand-black/85'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#" onClick={(e) => scrollTo(e, '#')} className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-0.5 shadow-red-glow-sm transition-all duration-300 group-hover:shadow-red-glow">
              <img
                src="/images/logo/novo-sushi-icon.png"
                alt="Novo Sushi Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="btn-ghost text-sm font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Cart button */}
            <button
              id="btn-open-cart"
              onClick={openCart}
              className="relative p-2.5 rounded-lg border border-brand-black-border bg-brand-black-card hover:border-brand-red/40 hover:bg-brand-red/10 transition-all duration-200 group"
              aria-label="Abrir carrito"
            >
              <ShoppingCart size={20} className="text-brand-white-muted group-hover:text-brand-red transition-colors" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand-red text-white text-xs font-bold flex items-center justify-center shadow-red-glow-sm"
                  >
                    {count > 9 ? '9+' : count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Reservar CTA (desktop) */}
            <button
              onClick={(e) => scrollTo(e, '#reservaciones')}
              className="hidden md:inline-flex btn-primary text-sm"
            >
              Reservar Mesa
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Menú móvil"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-brand-black-border bg-brand-black/95 backdrop-blur-xl"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    className="text-left px-4 py-3 rounded-lg text-brand-white-muted hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={(e) => scrollTo(e, '#reservaciones')}
                  className="btn-primary mt-2 justify-center"
                >
                  Reservar Mesa
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
