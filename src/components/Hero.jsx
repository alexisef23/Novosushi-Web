import { motion } from 'framer-motion'
import { ChevronDown, Utensils, Calendar } from 'lucide-react'

export default function Hero() {
  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Floating kanji decoration elements
  const floatingElements = ['🍣', '🥢', '🐟', '🌸', '🍶']

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero/hero-bg.png')" }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Noise texture */}
      <div className="absolute inset-0 bg-noise opacity-30" />

      {/* Red accent glow — bottom right */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />

      {/* Floating emoji decorations */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl select-none pointer-events-none opacity-20"
          style={{
            top: `${15 + i * 15}%`,
            right: `${5 + i * 4}%`,
          }}
          animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'easeInOut',
          }}
        >
          {el}
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-red/30 bg-brand-red/10 text-brand-red-light text-xs font-medium mb-8 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
          Gastronomía Japonesa Auténtica • Hidalgo del Parral, Chih.
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-bold leading-tight mb-6"
        >
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-2">
            El Arte del
          </span>
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gradient-red">
            Sushi Auténtico
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-brand-white-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Rolls, sashimi y sabores únicos preparados con ingredientes frescos de primera calidad.
          Una experiencia gastronómica que trasciende lo ordinario.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            id="btn-ver-menu"
            onClick={() => scrollTo('#menu')}
            className="btn-primary text-base px-8 py-4 shadow-red-glow animate-pulse-red"
          >
            <Utensils size={18} />
            Ver Menú Completo
          </button>
          <button
            id="btn-reservar-hero"
            onClick={() => scrollTo('#reservaciones')}
            className="btn-outline text-base px-8 py-4"
          >
            <Calendar size={18} />
            Hacer Reservación
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 grid grid-cols-3 gap-6 max-w-md mx-auto"
        >
          {[
            { value: '+50', label: 'Platillos' },
            { value: '5★', label: 'Calificación' },
            { value: '8+', label: 'Años de experiencia' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-gradient-red font-display">{stat.value}</div>
              <div className="text-xs text-brand-white-muted mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo('#menu')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.2 }, y: { duration: 2, repeat: Infinity } }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-white-muted hover:text-white transition-colors group"
        aria-label="Ir al menú"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Ver Menú</span>
        <ChevronDown size={20} className="group-hover:text-brand-red transition-colors" />
      </motion.button>
    </section>
  )
}
