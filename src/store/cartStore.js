import { create } from 'zustand'

const useCartStore = create((set, get) => ({
  items: [],
  isOpen: false,

  // Toggle drawer
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  // Add item (or increment quantity)
  addItem: (product) => {
    const { items } = get()
    const existing = items.find((i) => i.id === product.id)
    if (existing) {
      set({
        items: items.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      })
    } else {
      set({ items: [...items, { ...product, quantity: 1 }] })
    }
  },

  // Remove item completely
  removeItem: (id) => set((state) => ({
    items: state.items.filter((i) => i.id !== id),
  })),

  // Update quantity
  updateQuantity: (id, quantity) => {
    if (quantity < 1) {
      get().removeItem(id)
      return
    }
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, quantity } : i
      ),
    }))
  },

  // Clear all
  clearCart: () => set({ items: [] }),

  // Computed total
  getTotal: () => {
    const { items } = get()
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },

  // Item count
  getCount: () => {
    const { items } = get()
    return items.reduce((sum, item) => sum + item.quantity, 0)
  },

  // Summary for WhatsApp / payment
  getSummary: () => {
    const { items } = get()
    return items
      .map((i) => `• ${i.name} x${i.quantity} — $${(i.price * i.quantity).toFixed(2)}`)
      .join('\n')
  },
}))

export default useCartStore
