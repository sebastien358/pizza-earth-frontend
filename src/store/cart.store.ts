import {create} from "zustand/react";
import {persist} from "zustand/middleware";
import {useProductStore} from "@/store/product.store";

export interface CartState {
    cart: any[]
    deliveryPrice: number

    setDelivery: (deliveryPrice: number) => void
    totalCart: () => number
    totalDelivered: () => number
    addToCart: (id: number) => void
    addItemToCart: (id: number) => void
    removeItemToCart: (id: number) => void
    removeToCart: (id: number) => void
    resetCart: () => void
}

export const useCartStore = create<CartState>()(
    persist((set, get) => ({
        cart: [],
        deliveryPrice: 0,

        setDelivery: (deliveryPrice: number) => set({ deliveryPrice }),

        totalCart: (): number => {
            const total = get().cart.reduce((acc, product) => acc + product.price * product.quantity, 0)
            return Math.round(total * 100) / 100
        },

        totalDelivered: (): number => {
            const total = get().cart.reduce((acc, product) => acc + product.price * product.quantity, 0)
            return total + get().deliveryPrice
        },

        addToCart: (id: number) => {
            const state = useProductStore.getState()
            const productExist = state.products.find((p) => p.id === id) || state.productsHome.find((p) => p.id === id)

            if (!productExist) return

            const found = get().cart.find((p) => p.id === id)

            if (found) {
                set((state) => ({
                    cart: state.cart.map((p) => p.id === id ? { ...p, quantity: p.quantity + 1 } : p)
                }))
                return
            }

            set((state) => ({
                cart: [...state.cart, { ...productExist, quantity: 1 }]
            }))
        },

        addItemToCart: (id: number) => {
            const found = get().cart.find((p) => p.id === id)

            if (!found) return

            if (found.quantity > 0) {
                set((state) => ({
                    cart: state.cart.map((p) => p.id === id ? { ...p, quantity: p.quantity + 1 } : p)
                }))
            }
        },

        removeItemToCart: (id: number) => {
            const found = get().cart.find((p) => p.id === id)

            if (!found) return

            if (found.quantity > 1) {
                set((state) => ({
                    cart: state.cart.map((p) => p.id === id ? { ...p, quantity: p.quantity - 1 } : p)
                }))
                return
            }

            set((state) => ({
                cart: state.cart.filter((p) => p.id !== id)
            }))
        },

        removeToCart: (id: number) => {
            const found = get().cart.find((p) => p.id === id)

            if (!found) return

            set((state) => ({
                cart: state.cart.filter((p) => p.id !== id)
            }))
        },

        resetCart: () => set({ cart: [] })

    }), {
        name: 'cart-auth',
        partialize: (state) => ({
            cart: state.cart,
            deliveryPrice: state.deliveryPrice
        })
    })
)