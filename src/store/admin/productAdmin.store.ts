import {create} from "zustand/react";
import {persist} from "zustand/middleware";
import {axiosProductNew, axiosProductsList} from "@/shared/services/admin/productAdmin.service";

export interface ProductFormData {
    name: string
    price: number
    description: string
    category: {
        id: number
        name: string
    }
    picture: File | null
}

export interface ProductData {
    id: number
    name: string
    price: number
    description: string
    category: string
    picture: File | null
}

export interface ProductState {
    products: ProductData[]
    isLoading: boolean
    filename: string | null
    successMessage: string | null
    errorMessage: string | null

    productsList: () => Promise<void>
    productNew: (data: ProductFormData) => Promise<void>
    setFilename: (filename: string | null) => void
    resetSuccessMessage: () => void
    resetErrorMessage: () => void
}

export const useProductAdminStore = create<ProductState>()(
    persist((set, get) => ({
        products: [],
        isLoading: false,
        filename: null,
        successMessage: null,
        errorMessage: null,

        productsList: async () => {
            try {
                set({ isLoading: true })
                const data = await axiosProductsList()
                set({ products: data, isLoading: false })
            } catch (err: any) {
                set({ isLoading: false})
                console.error(err)
                throw err
            }
        },

        productNew: async (data: ProductFormData) => {
            try {
                const formData = new FormData()
                formData.append('name', data.name)
                formData.append('description', data.description)
                formData.append('price', data.price)
                formData.append('category', data.category)
                if (data.picture instanceof File) {
                    formData.append('picture', data.picture)
                }

                const newProduct= await axiosProductNew(formData)

                set({
                    products: [...get().products, newProduct],
                    successMessage: 'La pizza a bien été ajoutée',
                    errorMessage: null
                })
            } catch (err: any) {
                set({ errorMessage: 'La pizza n\'a pas pu être ajoutée' })
                throw err
            }
        },

        setFilename: (filename: string | null) => set({ filename }),

        resetSuccessMessage: () => set({ successMessage: null, filename: null }),

        resetErrorMessage: () => set({ errorMessage: null })

    }), {
        name: 'products-admin-state',
        partialize: (state) => ({
            products: state.products,
            isLoading: state.isLoading
        })
    })
)