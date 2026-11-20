import {create} from "zustand/react";
import {persist} from "zustand/middleware";
import {axiosProductsHomeList, axiosProductsList} from "@/shared/services/product.service";

export interface ProductData {
    id: number
    category: {
        id: number,
        name: string
    }
    description: string
    price: number
    picture: string[]
}

export interface ProductState {
    productsHome: ProductData[],
    products: ProductData[]
    isLoading: boolean
    isLoadingMore: false
    offset: number
    limit: number
    hasMore: boolean

    getLimitProduct: () => void
    productHomeList: () => Promise<void>
    productList: () => Promise<void>
    productLazyLoad: () => Promise<void>
}

export const useProductStore = create<ProductState>()(
    persist((set, get) => ({
        productsHome: [],
        products: [],
        isLoading: false,
        isLoadingMore: false,
        offset: 0,
        limit: 0,
        hasMore: true,

        getLimitProduct: () => {
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

        productHomeList: async () => {
            try {
                set({ isLoading: true })
                const data = await axiosProductsHomeList()
                set({ productsHome: data, isLoading: false })
            } catch (err: any) {
                set({ isLoading: false })
                console.error(err)
                throw err
            }
        },

        productList: async () => {
            get().getLimitProduct()
            try {
                set({ isLoading: true, offset: 0, hasMore: true })
                const data = await axiosProductsList(get().offset, get().limit)
                set({ products: data, isLoading: false, hasMore: data.length >= get().limit })
            } catch (err: any) {
                set({ isLoading: false })
                console.error(err)
                throw err
            }
        },

        productLazyLoad: async () => {
            try {
                const { products, isLoadingMore, offset, limit, hasMore } = get()
                if (!hasMore || isLoadingMore) return

                set({ offset: offset + limit, isLoadingMore: false })

                const data = await axiosProductsList(get().offset, get().limit)
                const newProducts = data ?? []

                if (newProducts.length === 0) {
                    set({ hasMore: false, isLoadingMore: false})
                    return
                }
                set({
                    products: [...products, ...newProducts],
                    isLoadingMore: false,
                    hasMore: newProducts.length >= get().limit
                })
            } catch (err: any) {
                set({ isLoadingMore: false })
                console.error(err)
                throw err
            }
        },

    }), {
        name: 'products-state',
        partialize: (state) => ({
            products: state.products,
            productsHome: state.productsHome
        })
    })
)