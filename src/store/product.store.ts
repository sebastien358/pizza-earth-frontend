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
    offset: number
    limit: number
    hasMore: boolean

    productHomeList: () => Promise<void>
    productList: () => Promise<void>
    productLazyLoad: () => Promise<void>
}

export const useProductStore = create<ProductState>()(
    persist((set, get) => ({
        productsHome: [],
        products: [],
        isLoading: false,
        offset: 0,
        limit: 8,
        hasMore: true,

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
            try {
                set({ isLoading: true, offset: 0 })
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
                const { products, isLoading, offset, limit, hasMore } = get()
                if (!hasMore || isLoading) return

               const newOffset = offset + limit
                set({ isLoading: true })

                const data = await axiosProductsList(newOffset, limit)

                const newProducts = data ?? []

                set({ products: [...products, ...newProducts], isLoading: false, hasMore: newProducts.length >= limit })

            } catch (err: any) {
                set({ isLoading: false })
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