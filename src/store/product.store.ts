import {create} from "zustand/react";
import {persist} from "zustand/middleware";

export interface ProductData {
    id: number
}

export interface ProductState {
    products: ProductData[]
    isLoading: boolean
}

export const useProductStore = create<ProductState>()(
    persist((set, get) => ({
        products: [],
        isLoading: false,

    }), {
        name: 'products-state'
    })
)