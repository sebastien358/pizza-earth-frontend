import {create} from "zustand/react";
import {persist} from "zustand/middleware";
import {
    axiosDeleteProduct,
    axiosDeleteProductImage,
    axiosProductDetails, axiosProductEdit,
    axiosProductEditImage,
    axiosProductNew,
    axiosProductsList,
    axiosProductsSearch,
    axiosPublishedProduct
} from "@/shared/services/admin/productAdmin.service";

export interface ProductFormData {
    name: string
    price: number
    description: string
    category: number
    picture?: File | null
    isVisible?: boolean
}

export interface ProductData {
    id: string | number
    name: string
    price: number
    description: string
    category: { id: number; name: string } | string
    pictures: { id: number; url: string }[] | null
}

export interface ProductState {
    products: ProductData[]
    currentProduct: ProductData | null
    countProducts: number
    isLoading: boolean
    term?: string
    current: number
    limit: number
    pages: number
    filename: string | null
    successMessage: string | null
    errorMessage: string | null

    getLimitOrders: () => void
    productsList: () => Promise<void>
    previousPage: () => Promise<void>
    followingPage: () => Promise<void>
    productDetails: (id: string) => Promise<void>
    productSearch: (term: string) => Promise<void>
    productNew: (data: ProductFormData) => Promise<void>
    productEditImage: (id: string, file: File) => Promise<void>
    productEdit: (id: string, data: ProductFormData) => Promise<void>
    publishedProduct: (id: number) => Promise<void>
    productDeleteImage: (id: number) => Promise<void>
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
        current: 1,
        limit: 0,
        pages: 0,
        filename: null,
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

        productsList: async () => {
            get().getLimitOrders()
            try {
                set({ isLoading: true })
                let data = await axiosProductsList(get().current, get().limit)

                if (get().current > data.pages && data.pages > 0) {
                    set({ current: data.pages })
                    data = await axiosProductsList(get().current, get().limit)
                }

                set({
                    products: data.products,
                    countProducts: data.count,
                    pages: data.pages,
                    isLoading: false
                })
            } catch (err: any) {
                set({ isLoading: false})
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
                    await get().productsList()
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
                    await get().productsList()
                }
            } catch (err: any) {
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

        productSearch: async (term: string) => {
            const trimmed = term?.toLowerCase().trim()
            console.log(trimmed)
            try {
                if (!trimmed) {
                    set({ isLoading: false, term: "" })
                    await get().productsList()
                }
                set({ term: trimmed, isLoading: true })
                const data = await axiosProductsSearch(get().term ?? "")
                set({ products: data, isLoading: false })
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
                formData.append('price', String(data.price))
                formData.append('category', String(data.category))
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

        productEditImage: async (id: string, file: File) => {
            try {
                const formData = new FormData()
                if (file instanceof File) {
                    formData.append('picture', file)
                }
                await axiosProductEditImage(id, formData)
                await get().productDetails(String(id))
                set({ successMessage: 'L\'image a été modifiée' })
            } catch (err: any) {
                set({ errorMessage: 'L\'image n\'a pas pu être modifiée' })
                throw err
            }
        },

        productEdit: async (id: string, data: ProductFormData) => {
            try {
              console.log(id)
                const formData = new FormData()
                formData.append('name', data.name)
                formData.append('description', data.description)
                formData.append('price', String(data.price))
                formData.append('category', String(data.category))

                const newProduct = await axiosProductEdit(id, formData)

                set({
                    products: [...get().products, newProduct],
                    successMessage: 'La pizza a été modifiée',
                    errorMessage: null
                })
            } catch (err: any) {
                set({ errorMessage: 'La pizza n\'a pas pu être modifiée' })
                throw err
            }
        },

        productDeleteImage: async (id: number) => {
            try {
                await axiosDeleteProductImage(id)
                await get().productDetails(String(id))
            } catch (err: any) {
                console.error(err)
                throw err
            }
        },

        deleteProduct: async (id: number) => {
            try {
                await axiosDeleteProduct(id)
                set((state) => ({
                    products: state.products.filter((p) => p.id !== id)
                }))
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
            set({ term: "", current: 1 })
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