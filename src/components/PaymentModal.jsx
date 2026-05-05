import { motion, AnimatePresence } from 'framer-motion'
import { X, CreditCard, Loader2, AlertCircle, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { createPreference } from '../utils/mercadopago'
import useCartStore from '../store/cartStore'

export default function PaymentModal({ isOpen, onClose, items, total }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { clearCart, closeCart } = useCartStore()

  const handlePay = async () => {
    if (!email.trim() || !email.includes('@')) {
      setError('Por favor ingresa un correo electrónico válido.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const initPoint = await createPreference({ items, email })
      clearCart()
      closeCart()
      onClose()
      window.location.href = initPoint
    } catch (err) {
      setError('No se pudo conectar con el servidor de pagos. Verifica tu configuración o intenta por WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-[61] w-full max-w-md mx-auto glass-card border border-brand-black-border p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 text-brand-white-muted hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-red/15 flex items-center justify-center">
                <CreditCard size={20} className="text-brand-red" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-xl">Pago en Línea</h3>
                <p className="text-brand-white-muted text-xs">Seguro con Mercado Pago</p>
              </div>
            </div>

            {/* Order summary */}
            <div className="bg-brand-black-card rounded-xl p-4 mb-6">
              <div className="max-h-32 overflow-y-auto space-y-2 mb-3 pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-brand-white-muted">{item.name} × {item.quantity}</span>
                    <span className="text-white font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-brand-black-border flex justify-between font-bold">
                <span className="text-white">Total</span>
                <span className="text-brand-red text-lg">${total.toFixed(2)} MXN</span>
              </div>
            </div>

            {/* Email input */}
            <div className="mb-4">
              <label className="block text-sm text-brand-white-muted mb-1.5">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError('') }}
                className="form-input"
                id="mp-email-input"
              />
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-sm mb-4"
              >
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                {error}
              </motion.div>
            )}



            {/* Pay button */}
            <button
              id="btn-confirm-payment"
              onClick={handlePay}
              disabled={loading}
              className="w-full btn-primary justify-center py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Conectando con Mercado Pago...
                </>
              ) : (
                <>
                  <ExternalLink size={18} />
                  Pagar ${total.toFixed(2)} MXN
                </>
              )}
            </button>

            <p className="text-center text-brand-white-muted text-xs mt-3">
              Serás redirigido al checkout seguro de Mercado Pago
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
