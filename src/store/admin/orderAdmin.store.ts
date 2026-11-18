import {create} from "zustand/react";
import {persist} from "zustand/middleware";
import {axiosOrderChangeStatus, axiosOrderDelete, axiosOrderList} from "@/shared/services/admin/orderAdmin.service";

export interface OrderFormData {
    name: string
    email: string
    phone: string
    deliveryMode: string
    address?: string
    complementAddress?: string
    postalCode?: string
    city?: string
    deliveryInstructions?: string
}

export interface OrderState {
    orders: any[]
    totalRevenue: number,
    isLoading: boolean

    orderTotalRevenue: () => void
    orderList: () => Promise<void>
    orderDelete: (id: number) => Promise<void>
    orderChangeStatus: (id: number, status: string) => Promise<void>
}

export const useOrderAdminStore = create<OrderState>()(
    persist((set, get) => ({
        orders: [],
        totalRevenue: 0,
        isLoading: false,

        orderTotalRevenue: () => {
            const total = get().orders.reduce((acc, order) => acc + order.total, 0)
            set({ totalRevenue: total })
        },

        orderList: async () => {
            try {
                set({ isLoading: true })
                const data = await axiosOrderList()
                set({ orders: data.orders, isLoading: false })
                get().orderTotalRevenue()
            } catch (err: any) {
                set({ isLoading: false })
                console.error(err)
                throw err
            }
        },

        orderDelete: async (id: number) => {
            try {
                await axiosOrderDelete(id)
                set((state) => ({
                    orders: state.orders.filter((o) => o.id !== id)
                }))
            } catch (err: any) {
                console.error(err)
                throw err
            }
        },

        orderChangeStatus: async (id: number, status: string) => {
            try {
                await axiosOrderChangeStatus(id, status)
                await get().orderList()
            } catch (err: any) {
                console.error(err)
                throw err
            }
        }

    }), {
        name: 'order-admin-state',
        partialize: (state) => ({
            orders: state.orders
        })
    })
)