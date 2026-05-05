import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, ShoppingBag, MessageCircle, CreditCard } from 'lucide-react'
import useCartStore from '../store/cartStore'
import { useWhatsApp } from '../hooks/useWhatsApp'
import { useState } from 'react'
import PaymentModal from './PaymentModal'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotal, clearCart, getCount } = useCartStore()
  const { sendOrder } = useWhatsApp()
  const [showPayment, setShowPayment] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [nameError, setNameError] = useState(false)

  const total = getTotal()
  const count = getCount()

  const handleWhatsApp = () => {
    if (!customerName.trim()) {
      setNameError(true)
      return
    }
    setNameError(false)
    const summary = items
      .map((i) => `• ${i.name} x${i.quantity} — $${(i.price * i.quantity).toFixed(2)}`)
      .join('\n')
    sendOrder({ name: customerName, summary, total })
  }

  const handlePayment = () => {
    setShowPayment(true)
  }

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={closeCart}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md z-50 flex flex-col bg-brand-black-soft border-l border-brand-black-border shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-brand-black-border">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-brand-red" />
                <h2 className="font-display font-bold text-white text-xl">Tu Pedido</h2>
                {count > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-brand-red text-white text-xs font-bold">
                    {count}
                  </span>
                )}
              </div>
              <button
                id="btn-close-cart"
                onClick={closeCart}
                className="p-2 rounded-lg hover:bg-white/5 text-brand-white-muted hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-20">
                  <span className="text-6xl opacity-30">🛒</span>
                  <p className="text-brand-white-muted text-sm">Tu carrito está vacío</p>
                  <button
                    onClick={closeCart}
                    className="btn-outline text-sm"
                  >
                    Ver el Menú
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 p-3 rounded-xl border border-brand-black-border bg-brand-black-card group"
                    >
                      {/* Image */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-brand-black">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.style.display = 'none' }}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-sm truncate">{item.name}</p>
                        <p className="text-brand-red text-sm font-bold mt-0.5">${item.price}</p>

                        {/* Qty controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-md flex items-center justify-center border border-brand-black-border hover:border-brand-red/40 hover:text-brand-red transition-all"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="text-white font-semibold text-sm w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-md flex items-center justify-center border border-brand-black-border hover:border-brand-red/40 hover:text-brand-red transition-all"
                          >
                            <Plus size={13} />
                          </button>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto p-1.5 rounded-md text-brand-white-muted hover:text-red-400 hover:bg-red-400/10 transition-all opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-white font-bold text-sm">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-brand-black-border bg-brand-black-soft space-y-4">
                {/* Customer name for WhatsApp */}
                <div>
                  <input
                    type="text"
                    placeholder="Tu nombre (para el pedido)"
                    value={customerName}
                    onChange={(e) => { setCustomerName(e.target.value); setNameError(false) }}
                    className={`form-input text-sm ${nameError ? 'border-red-500 ring-1 ring-red-500/40' : ''}`}
                  />
                  {nameError && <p className="text-red-400 text-xs mt-1">Por favor ingresa tu nombre</p>}
                </div>

                {/* Total */}
                <div className="flex items-center justify-between py-3 border-t border-b border-brand-black-border">
                  <span className="text-brand-white-muted">Total estimado</span>
                  <span className="text-brand-red font-bold text-xl">${total.toFixed(2)} MXN</span>
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    id="btn-whatsapp-order"
                    onClick={handleWhatsApp}
                    className="flex items-center justify-center gap-2 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold text-sm transition-all"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </button>
                  <button
                    id="btn-pay-mp"
                    onClick={handlePayment}
                    className="btn-primary justify-center py-3"
                  >
                    <CreditCard size={16} />
                    Pagar Online
                  </button>
                </div>

                <button
                  onClick={clearCart}
                  className="w-full text-center text-xs text-brand-white-muted hover:text-red-400 transition-colors py-1"
                >
                  Vaciar carrito
                </button>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        items={items}
        total={total}
      />
    </>
  )
}
