import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Flame, Star, Leaf } from 'lucide-react'
import useCartStore from '../store/cartStore'
import { useState } from 'react'

const TAG_CONFIG = {
  popular: { icon: <Star size={10} />, label: 'Popular', className: 'tag-popular' },
  picante: { icon: <Flame size={10} />, label: 'Picante', className: 'tag-picante' },
  vegano: { icon: <Leaf size={10} />, label: 'Vegano', className: 'tag-vegano' },
}

export default function MenuCard({ item, index }) {
  const { addItem, openCart } = useCartStore()
  const [added, setAdded] = useState(false)
  const [imgError, setImgError] = useState(false)

  const handleAdd = () => {
    addItem(item)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.07 }}
      className="glass-card-hover group flex flex-col overflow-hidden shadow-card"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-brand-black-card">
        {!imgError ? (
          <img
            src={item.image}
            alt={item.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-brand-black-card to-brand-black">
            🍣
          </div>
        )}

        {/* Shimmer overlay on hover */}
        <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Tags */}
        {item.tags.length > 0 && (
          <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
            {item.tags.map((tag) => {
              const cfg = TAG_CONFIG[tag]
              return cfg ? (
                <span key={tag} className={cfg.className}>
                  {cfg.icon} {cfg.label}
                </span>
              ) : null
            })}
          </div>
        )}

        {/* Price badge */}
        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-brand-black/80 backdrop-blur-sm border border-brand-red/30 text-brand-red font-bold text-sm">
          ${item.price}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-display font-bold text-white text-lg mb-1.5 leading-tight">
          {item.name}
        </h3>
        <p className="text-brand-white-muted text-sm leading-relaxed flex-1 mb-4">
          {item.description}
        </p>

        {/* Add to cart */}
        <motion.button
          id={`btn-add-${item.id}`}
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
            added
              ? 'bg-green-600 text-white'
              : 'bg-brand-red/15 text-brand-red border border-brand-red/30 hover:bg-brand-red hover:text-white hover:border-transparent hover:shadow-red-glow-sm'
          }`}
        >
          <AnimatePresence mode="wait">
            {added ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                ✓ ¡Agregado!
              </motion.span>
            ) : (
              <motion.span
                key="add"
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <ShoppingCart size={15} />
                Agregar al Carrito
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.article>
  )
}
