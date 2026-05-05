const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '526272796565'

export const useWhatsApp = () => {
  /**
   * Send order summary to WhatsApp
   * @param {Object} params
   * @param {string} params.name - Customer name
   * @param {string} params.summary - Cart items summary
   * @param {number} params.total - Order total
   */
  const sendOrder = ({ name, summary, total }) => {
    const message = encodeURIComponent(
      `🍣 *NUEVO PEDIDO — NOVO SUSHI*\n\n` +
      `👤 *Cliente:* ${name}\n\n` +
      `📋 *Pedido:*\n${summary}\n\n` +
      `💰 *Total: $${total.toFixed(2)} MXN*\n\n` +
      `_Pedido realizado desde la página web_`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  /**
   * Send reservation summary to WhatsApp
   * @param {Object} params
   */
  const sendReservation = ({ name, phone, date, time, guests, notes }) => {
    const message = encodeURIComponent(
      `📅 *NUEVA RESERVACIÓN — NOVO SUSHI*\n\n` +
      `👤 *Nombre:* ${name}\n` +
      `📞 *Teléfono:* ${phone}\n` +
      `📆 *Fecha:* ${date}\n` +
      `🕐 *Hora:* ${time}\n` +
      `👥 *Personas:* ${guests}\n` +
      (notes ? `📝 *Notas:* ${notes}\n` : '') +
      `\n_Reservación realizada desde la página web_`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  return { sendOrder, sendReservation }
}
