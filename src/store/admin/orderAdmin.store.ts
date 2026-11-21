import {create} from "zustand/react";
import {persist} from "zustand/middleware";
import {
    axiosOrderChangeStatus,
    axiosOrderDelete,
    axiosOrderList,
    axiosOrderSearch
} from "@/shared/services/admin/orderAdmin.service";

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
    term?: string
    current: number
    limit: number
    pages: number
    countOrders: number
    totalRevenue: number
    isLoading: boolean

    orderTotalRevenue: () => void
    getLimitOrders: () => void
    orderList: () => Promise<void>
    previousPage: () => Promise<void>
    followingPage: () => Promise<void>
    orderSearch: () => Promise<void>
    orderDelete: (id: number) => Promise<void>
    orderChangeStatus: (id: number, status: string) => Promise<void>
}

export const useOrderAdminStore = create<OrderState>()(
    persist((set, get) => ({
        orders: [],
        term: "",
        current: 1,
        limit: 0,
        pages: 0,
        countOrders: 0,
        totalRevenue: 0,
        isLoading: false,

        orderTotalRevenue: () => {
            const total = get().orders.reduce((acc, order) => acc + order.total, 0)
            set({ totalRevenue: total })
        },

        getLimitOrders: () => {
            if (window.innerWidth >= 1600) {
                set({ limit: 9 })
            } else if (window.innerWidth >= 1200) {
                set({ limit: 6 })
            } else if (window.innerWidth >= 900) {
                set({ limit: 6 })
            } else if (window.innerWidth >= 700) {
                set({ limit: 4 })
            } else {
                set({ limit: 4 })
            }
        },

        orderList: async () => {
            get().getLimitOrders()
            try {
                set({ isLoading: true })
                const data = await axiosOrderList(get().current, get().limit)
                set({ orders: data.orders, countOrders: data.count, pages: data.pages, isLoading: false })
                get().orderTotalRevenue()
            } catch (err: any) {
                set({ isLoading: false })
                console.error(err)
                throw err
            }
        },

        previousPage: async () => {
            try {
                const { current, limit } = get()
                if (current > 1) {
                    set({ current: current - 1 })
                    await get().orderList(current, limit)
                }
            } catch (err: any) {
                console.error(err)
                throw err
            }
        },

        followingPage: async () => {
            try {
                const { current, pages, limit } = get()
                if (current < pages) {
                    set({ current: current + 1 })
                    await get().orderList(current, limit)
                }
            } catch (err: any) {
                console.error(err)
                throw err
            }
        },

        orderSearch: async (term: string) => {
            const trimmed = term?.toLowerCase().trim()
            try {
                if (!trimmed) {
                    set({ isLoading: false, term: "" })
                    await get().orderList()
                    return
                }
                if (trimmed) set({ isLoading: true, term: trimmed })
                const data = await axiosOrderSearch(get().term ?? "")
                set({ orders: data.orders, isLoading: false })
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