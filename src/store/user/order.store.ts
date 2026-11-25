import {create} from "zustand/react";
import {persist} from "zustand/middleware";
import {axiosOrderList, axiosOrderNew} from "@/shared/services/user/order.service";
import {useCartStore} from "@/store/cart.store";

export interface OrderFormData {
    name: string
    email: string
    phone: string
    deliveryMode: string
    address?: string | null
    complementAddress?: string | null
    postalCode?: string | null
    city?: string | null
    deliveryInstructions?: string | null
    payment_intent_id?: string | null
}

export interface ItemFormData {
    productId: number
    price: number
    quantity: number
}

export interface OrderState {
    orders: any[]
    isLoading: boolean
    current: number
    limit: number
    pages: number
    countUserOrders: number
    successMessage: string | null
    errorMessage: string | null

    getLimitOrders: () => void
    orderList: () => Promise<void>
    previousPage: () => Promise<void>
    followingPage: () => Promise<void>
    orderNew: (data: OrderFormData) => Promise<void>
    resetSuccessMessage: () => void
    resetErrorMessage: () => void
    resetOrderUser: () => void
}

export const useOrderStore = create<OrderState>()(
    persist((set, get) => ({
        orders: [],
        isLoading: false,
        current: 1,
        limit: 0,
        pages: 0,
        countUserOrders: 0,
        successMessage: null,
        errorMessage: null,

        getLimitOrders: () => {
            if (window.innerWidth >= 2000) {
                set({ limit: 10 })
            } else if (window.innerWidth >= 900) {
                set({ limit: 6 })
            } else if (window.innerWidth >= 700) {
                set({ limit: 4 })
            } else {
                set({ limit: 3 })
            }
        },

        orderList: async () => {
            get().getLimitOrders()
            try {
                set({ isLoading: true })
                let data = await axiosOrderList(get().current, get().limit)

                if (get().current > data.pages && data.pages > 0) {
                    set({ current: data.pages })
                    data = await axiosOrderList(get().current, get().limit)
                }

                set({
                    orders: data.orders,
                    countUserOrders: data.count,
                    pages: data.pages,
                    isLoading: false
                })
            } catch (err: any) {
                set({ isLoading: false })
                console.error(err)
                throw err
            }
        },

        previousPage: async () => {
            try {
                const { current } = get()
                if (current > 1) {
                    const newCurrent = current - 1
                    set({ current: newCurrent })
                    await get().orderList()
                }
            } catch (err: any) {
                console.error(err)
                throw err
            }
        },

        followingPage: async () => {
            try {
                const { current, pages } = get()
                if (current < pages) {
                    const newCurrent = current + 1
                    set({ current: newCurrent })
                    await get().orderList()
                }
            } catch (err: any) {
                console.error(err)
                throw err
            }
        },

        orderNew: async (data: OrderFormData) => {
            try {
                const cart = useCartStore.getState().cart

                const items = cart.map((c) => ({
                    productId: c.id,
                    price: c.price,
                    quantity: c.quantity
                }))

                const newOrder = await axiosOrderNew(data, items)
                set({ orders: [...get().orders, newOrder] })
                set({ successMessage: 'La commmande a été validée' })
            } catch (err: any) {
                set({ errorMessage: 'La commadne a échouée' })
                console.error(err)
                throw err
            }
        },

        resetSuccessMessage: () => set({ successMessage: null }),

        resetErrorMessage: () => set({ errorMessage: null }),

        resetOrderUser: async () => {
            set({ current: 1 })
            await get().orderList()
        }

    }), {
        name: 'order-state',
        partialize: (state) => ({
            orders: state.orders
        })
    })
)