import { motion } from 'framer-motion'
import { useState } from 'react'
import { Calendar, Clock, Users, User, Phone, FileText, MessageCircle, CheckCircle } from 'lucide-react'
import { useWhatsApp } from '../hooks/useWhatsApp'

const inputClass = 'form-input'

export default function ReservationForm() {
  const { sendReservation } = useWhatsApp()
  const [form, setForm] = useState({
    name: '', phone: '', date: '', time: '', guests: '2', notes: ''
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'El nombre es requerido'
    if (!form.phone.trim()) errs.phone = 'El teléfono es requerido'
    if (!form.date) errs.date = 'La fecha es requerida'
    if (!form.time) errs.time = 'La hora es requerida'
    return errs
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    sendReservation(form)
    setSubmitted(true)
  }

  const reset = () => {
    setForm({ name: '', phone: '', date: '', time: '', guests: '2', notes: '' })
    setErrors({})
    setSubmitted(false)
  }

  // Min date = today
  const today = new Date().toISOString().split('T')[0]

  const timeSlots = [
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
    '22:00', '22:30', '23:00', '23:30', '00:00', '00:30', '01:00'
  ]

  return (
    <section id="reservaciones" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-radial from-brand-red/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red/30 to-transparent" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-red/25 bg-brand-red/8 text-brand-red text-xs font-medium mb-5"
          >
            📅 Reservaciones
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mb-4"
          >
            Reserva tu{' '}
            <span className="text-gradient-red">Mesa</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle max-w-lg mx-auto"
          >
            Asegura tu lugar y vive una experiencia gastronómica única. Te confirmaremos por WhatsApp.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="glass-card border border-brand-black-border p-8 md:p-10 relative overflow-hidden"
        >
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />

          {submitted ? (
            /* Success state */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-10 gap-5"
            >
              <div className="w-20 h-20 rounded-full bg-green-500/15 flex items-center justify-center">
                <CheckCircle size={40} className="text-green-400" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white">¡Reservación Enviada!</h3>
              <p className="text-brand-white-muted max-w-sm">
                Tu solicitud fue enviada a nuestro equipo vía WhatsApp. Te confirmaremos en breve.
              </p>
              <div className="glass-card px-6 py-4 text-left w-full max-w-sm">
                <p className="text-brand-white-muted text-sm"><span className="text-white font-medium">Nombre:</span> {form.name}</p>
                <p className="text-brand-white-muted text-sm"><span className="text-white font-medium">Fecha:</span> {form.date} a las {form.time}</p>
                <p className="text-brand-white-muted text-sm"><span className="text-white font-medium">Personas:</span> {form.guests}</p>
              </div>
              <button onClick={reset} className="btn-outline text-sm">
                Hacer otra reservación
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-brand-white-muted flex items-center gap-1.5">
                  <User size={14} /> Nombre completo
                </label>
                <input
                  id="res-name"
                  type="text"
                  name="name"
                  placeholder="Juan García"
                  value={form.name}
                  onChange={handleChange}
                  className={`${inputClass} ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && <p className="text-red-400 text-xs">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-brand-white-muted flex items-center gap-1.5">
                  <Phone size={14} /> Teléfono
                </label>
                <input
                  id="res-phone"
                  type="tel"
                  name="phone"
                  placeholder="+52 627 123 4567"
                  value={form.phone}
                  onChange={handleChange}
                  className={`${inputClass} ${errors.phone ? 'border-red-500' : ''}`}
                />
                {errors.phone && <p className="text-red-400 text-xs">{errors.phone}</p>}
              </div>

              {/* Date */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-brand-white-muted flex items-center gap-1.5">
                  <Calendar size={14} /> Fecha
                </label>
                <input
                  id="res-date"
                  type="date"
                  name="date"
                  min={today}
                  value={form.date}
                  onChange={handleChange}
                  className={`${inputClass} ${errors.date ? 'border-red-500' : ''}`}
                  style={{ colorScheme: 'dark' }}
                />
                {errors.date && <p className="text-red-400 text-xs">{errors.date}</p>}
              </div>

              {/* Time */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-brand-white-muted flex items-center gap-1.5">
                  <Clock size={14} /> Hora
                </label>
                <select
                  id="res-time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  className={`${inputClass} ${errors.time ? 'border-red-500' : ''}`}
                >
                  <option value="">Selecciona una hora</option>
                  <optgroup label="Tarde (1 PM – 6 PM)">
                    {timeSlots.slice(0, 10).map((t) => <option key={t} value={t}>{t}</option>)}
                  </optgroup>
                  <optgroup label="Noche (7 PM – 1 AM)">
                    {timeSlots.slice(10).map((t) => <option key={t} value={t}>{t}</option>)}
                  </optgroup>
                </select>
                {errors.time && <p className="text-red-400 text-xs">{errors.time}</p>}
              </div>

              {/* Guests */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-brand-white-muted flex items-center gap-1.5">
                  <Users size={14} /> Número de personas
                </label>
                <select
                  id="res-guests"
                  name="guests"
                  value={form.guests}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                    <option key={n} value={n}>{n} persona{n > 1 ? 's' : ''}</option>
                  ))}
                  <option value="10+">Más de 10 (grupo especial)</option>
                </select>
              </div>

              {/* Notes */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-sm font-medium text-brand-white-muted flex items-center gap-1.5">
                  <FileText size={14} /> Notas especiales (opcional)
                </label>
                <textarea
                  id="res-notes"
                  name="notes"
                  rows={3}
                  placeholder="Alergias, celebración especial, preferencias de asiento..."
                  value={form.notes}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Submit */}
              <div className="md:col-span-2">
                <button
                  id="btn-submit-reservation"
                  type="submit"
                  className="w-full btn-primary justify-center py-4 text-base shadow-red-glow"
                >
                  <MessageCircle size={18} />
                  Confirmar por WhatsApp
                </button>
                <p className="text-center text-brand-white-muted text-xs mt-3">
                  Al confirmar, se abrirá WhatsApp con el resumen de tu reservación.
                </p>
              </div>
            </form>
          )}
        </motion.div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {[
            { icon: '🕐', title: 'Lun – Vie & Dom', desc: '1:00 PM — 2:00 AM' },
            { icon: '🌙', title: 'Sábado', desc: '1:00 PM — 10:00 PM' },
            { icon: '📞', title: 'Reservaciones', desc: '+52 1 627 279 6565' },
          ].map((info) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-5 text-center"
            >
              <div className="text-3xl mb-2">{info.icon}</div>
              <p className="text-white font-semibold text-sm">{info.title}</p>
              <p className="text-brand-white-muted text-sm mt-1">{info.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
