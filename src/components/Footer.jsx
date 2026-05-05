import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Heart } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  const socialLinks = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      ),
      href: 'https://www.instagram.com/novosushi_restaurant/',
      label: 'Instagram',
      color: 'hover:text-pink-400',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      href: 'https://www.facebook.com/NOVOSushiandRestaurant',
      label: 'Facebook',
      color: 'hover:text-blue-400',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.108 1.523 5.83L.057 23.317a.75.75 0 00.926.928l5.487-1.467A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.844 0-3.578-.49-5.076-1.345l-.362-.213-3.757 1.005 1.008-3.756-.223-.374A9.95 9.95 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      ),
      href: 'https://wa.me/526272796565',
      label: 'WhatsApp',
      color: 'hover:text-green-400',
    },
  ]

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Menú', href: '#menu' },
    { label: 'Reservaciones', href: '#reservaciones' },
    { label: 'Nosotros', href: '#nosotros' },
  ]

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer id="nosotros" className="relative border-t border-brand-black-border">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-red/40 to-transparent" />

      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-brand-red/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center p-1 shadow-red-glow-sm">
                <img
                  src="/images/logo/novo-sushi-icon.png"
                  alt="Novo Sushi"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <p className="text-brand-white-muted text-sm leading-relaxed mb-6 max-w-xs">
              Fusión de la tradición japonesa con el sabor local. Ingredientes frescos, 
              rolls únicos y una experiencia gastronómica que no olvidarás.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`p-2.5 rounded-xl border border-brand-black-border bg-brand-black-card text-brand-white-muted ${social.color} hover:border-current transition-all duration-200`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Navegación
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-brand-white-muted text-sm hover:text-brand-red transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-brand-red/0 group-hover:bg-brand-red/70 transition-all duration-200" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-brand-red mt-0.5 flex-shrink-0" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Calle+Pedro+de+Lille+3+4to+Piso,+Hidalgo+del+Parral,+Mexico,+33890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-white-muted text-sm hover:text-brand-red transition-colors leading-relaxed"
                >
                  Calle Pedro de Lille #3, 4to Piso<br />
                  Hidalgo del Parral, México 33890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-brand-red flex-shrink-0" />
                <a
                  href="tel:+526272796565"
                  className="text-brand-white-muted text-sm hover:text-white transition-colors"
                >
                  +52 1 627 279 6565
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-brand-red flex-shrink-0" />
                <a
                  href="mailto:contacto@novosushi.mx"
                  className="text-brand-white-muted text-sm hover:text-white transition-colors"
                >
                  contacto@novosushi.mx
                </a>
              </li>
            </ul>

            {/* Hours */}
            <div className="mt-6 p-4 rounded-xl bg-brand-black-card border border-brand-black-border">
              <p className="text-xs font-semibold text-brand-white-muted uppercase tracking-wider mb-3">Horarios</p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-brand-white-muted">Lun – Vie</span>
                  <span className="text-white">1:00 PM – 2:00 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-white-muted">Sábado</span>
                  <span className="text-white">1:00 PM – 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-white-muted">Domingo</span>
                  <span className="text-white">1:00 PM – 2:00 AM</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-brand-black-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-brand-white-muted text-xs text-center sm:text-left">
            © {year} Novo Sushi. Todos los derechos reservados.
          </p>
          <p className="text-brand-white-muted text-xs flex items-center gap-1">
            Hecho con <Heart size={12} className="text-brand-red fill-brand-red" /> en Hidalgo del Parral, Chihuahua
          </p>
        </div>
      </div>
    </footer>
  )
}
