import {create} from "zustand/react";
import {persist} from "zustand/middleware";
import {axiosProductsList} from "@/shared/services/product.service";

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
    products: ProductData[]
    isLoading: boolean

    productList: () => Promise<void>
}

export const useProductStore = create<ProductState>()(
    persist((set, get) => ({
        products: [],
        isLoading: false,

        productList: async () => {
            try {
                set({ isLoading: true })
                const data = await axiosProductsList()
                set({ products: data, isLoading: false })
            } catch (err: any) {
                set({ isLoading: true })
                console.error(err)
                throw err
            }
        }

    }), {
        name: 'products-state',
        partialize: (state) => ({
            products: state.products
        })
    })
)