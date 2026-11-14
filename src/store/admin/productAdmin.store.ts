import {create} from "zustand/react";
import {persist} from "zustand/middleware";
import {
    axiosDeleteProduct, axiosProductDetails,
    axiosProductNew,
    axiosProductsList, axiosProductsSearch,
    axiosPublishedProduct
} from "@/shared/services/admin/productAdmin.service";

export interface ProductFormData {
    name: string
    price: number
    description: string
    category: {
        id: number
        name: string
    }
    picture: File | null
    isVisible: boolean
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
    currentProduct: ProductData | null
    countProducts: number
    isLoading: boolean
    term?: string
    filename: string | null
    successMessage: string | null
    errorMessage: string | null

    productsList: () => Promise<void>
    productDetails: (id: string) => Promise<void>
    productSearch: (term: string | null) => Promise<void>
    productNew: (data: ProductFormData) => Promise<void>
    publishedProduct: (id: number) => Promise<void>
    deleteProduct: (id: number) => Promise<void>
    setFilename: (filename: string | null) => void
    resetSuccessMessage: () => void
    resetErrorMessage: () => void
    resetProduct: () => void
}

export const useProductAdminStore = create<ProductState>()(
    persist((set, get) => ({
        products: [],
        currentProduct: null,
        countProducts: 0,
        isLoading: false,
        term: "",
        filename: null,
        successMessage: null,
        errorMessage: null,

        productsList: async () => {
            try {
                set({ isLoading: true })
                const data = await axiosProductsList()
                set({ products: data.products, countProducts: data.count, isLoading: false })
            } catch (err: any) {
                set({ isLoading: false})
                console.error(err)
                throw err
            }
        },

        productDetails: async (id: string) => {
            try {
                set({ isLoading: true })
                const data = await axiosProductDetails(id)
                set({ currentProduct: data, isLoading: false })
            } catch (err: any) {
                set({ isLoading: false })
                console.error(err)
                throw err
            }
        },

        productSearch: async (term: string | null) => {
            const trimmed = term?.toLowerCase().trim() ?? ""
            try {
                if (!trimmed) {
                    set({ isLoading: false, term: "" })
                    await get().productsList()
                }
                set({ term: trimmed, isLoading: true })
                const data = await axiosProductsSearch(get().term)

                set({ products: data.products, isLoading: false })
            } catch (err: any) {
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

        deleteProduct: async (id: number) => {
            try {
                await axiosDeleteProduct(id)
                await get().productsList()
            } catch (err: any) {
                console.error(err)
                throw err
            }
        },

        publishedProduct: async (id: number) => {
            try {
                const data = await axiosPublishedProduct(id);
                set((state) => ({
                    products: state.products.map((p) => p.id === id ? {...p, isVisible: data.isVisible} : p)
                }))
            } catch (err: any) {
                console.error(err);
                throw err;
            }
        },

        setFilename: (filename: string | null) => set({ filename }),

        resetSuccessMessage: () => set({ successMessage: null, filename: null }),

        resetErrorMessage: () => set({ errorMessage: null }),

        resetProduct: async () => {
            set({ term: "" })
            await get().productsList()
        }

    }), {
        name: 'products-admin-state',
        partialize: (state) => ({
            products: state.products,
            isLoading: state.isLoading
        })
    })
)