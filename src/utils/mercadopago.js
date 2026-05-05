import axios from 'axios'

// Public key — safe to expose in frontend
const PUBLIC_KEY = import.meta.env.VITE_MP_PUBLIC_KEY || ''

// Backend URL — your PHP script on cPanel
const BACKEND_URL = import.meta.env.VITE_MP_BACKEND_URL || '/mp-preference.php'

/**
 * Initialize Mercado Pago SDK in frontend
 * Call once on app load
 */
export const initMercadoPago = () => {
  if (!PUBLIC_KEY) {
    console.warn('[MercadoPago] PUBLIC_KEY no configurada. Agrega VITE_MP_PUBLIC_KEY en tu .env')
    return null
  }
  return PUBLIC_KEY
}

/**
 * Genera un folio de 4 dígitos único para el pedido
 */
const generarFolio = () => {
  const base = Date.now() % 10000
  return String(base).padStart(4, '0')
}

/**
 * Create a payment preference via backend PHP
 * Guarda el carrito en localStorage antes de redirigir para recuperarlo en pago-exitoso.php
 * @param {Object} params
 * @param {Array}  params.items  - Cart items [{name, price, quantity}]
 * @param {string} params.email  - Payer email
 * @returns {string} init_point - URL to redirect to Mercado Pago checkout
 */
export const createPreference = async ({ items, email }) => {
  try {
    // ─── Generar folio único de 4 dígitos ────────────────────────────────────
    const folio = generarFolio()
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

    // ─── Guardar pedido en localStorage para recuperarlo en pago-exitoso.php ──
    const pedido = {
      folio,
      email: email || 'cliente@novosushi.com',
      fecha: new Date().toLocaleString('es-MX', {
        timeZone: 'America/Chihuahua',
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      }),
      items: items.map((i) => ({
        name:     i.name,
        price:    Number(i.price),
        quantity: Number(i.quantity),
        subtotal: Number((i.price * i.quantity).toFixed(2)),
      })),
      total: Number(total.toFixed(2)),
    }
    localStorage.setItem('ns_pedido_pendiente', JSON.stringify(pedido))

    // ─── Crear preferencia en el backend PHP ─────────────────────────────────
    const response = await axios.post(BACKEND_URL, {
      items: items.map((item) => ({
        title:      item.name,
        unit_price: Number(item.price),
        quantity:   Number(item.quantity),
        currency_id: 'MXN',
      })),
      payer: { email: email || 'cliente@novosushi.com' },
      // back_urls las define el PHP (apuntan a pago-exitoso.php)
    })

    return response.data.init_point
  } catch (error) {
    console.error('[MercadoPago] Error creando preferencia:', error)
    throw error
  }
}

export { PUBLIC_KEY }
