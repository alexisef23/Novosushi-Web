import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import menuData from '../data/menu.json'
import MenuCard from './MenuCard'

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('todos')

  const allCategories = [
    { id: 'todos', label: 'Todos', icon: '🍽️' },
    ...menuData.categories,
  ]

  const filtered = activeCategory === 'todos'
    ? menuData.items
    : menuData.items.filter((item) => item.category === activeCategory)

  return (
    <section id="menu" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-red/25 bg-brand-red/8 text-brand-red text-xs font-medium mb-5"
          >
            🍣 Nuestro Menú
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mb-4"
          >
            Sabores que{' '}
            <span className="text-gradient-red">inspiran</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle max-w-xl mx-auto"
          >
            Cada platillo es elaborado con ingredientes frescos, técnica japonesa y un toque de creatividad local.
          </motion.p>
        </div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {allCategories.map((cat) => (
            <motion.button
              key={cat.id}
              id={`filter-${cat.id}`}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-brand-red text-white border-brand-red shadow-red-glow-sm'
                  : 'bg-brand-black-card text-brand-white-muted border-brand-black-border hover:border-brand-red/40 hover:text-white'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((item, index) => (
              <MenuCard key={item.id} item={item} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-brand-white-muted">
            No hay platillos en esta categoría.
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-brand-white-muted text-sm mb-4">
            ¿Tienes alguna restricción alimentaria o petición especial?
          </p>
          <a
            href="https://wa.me/526272796565"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            💬 Contáctanos por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}
