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
    successMessage: string | null
    errorMessage: string | null

    orderList: () => Promise<void>
    orderNew: (data: OrderFormData) => Promise<void>
    resetSuccessMessage: () => void
    resetErrorMessage: () => void
}

export const useOrderStore = create<OrderState>()(
    persist((set, get) => ({
        orders: [],
        isLoading: false,
        successMessage: null,
        errorMessage: null,

        orderList: async () => {
            try {
                set({ isLoading: true })
                const data = await axiosOrderList()
                set({ orders: data, isLoading: false })
            } catch (err: any) {
                set({ isLoading: false })
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

    }), {
        name: 'order-state',
        partialize: (state) => ({
            orders: state.orders
        })
    })
)