import {create} from "zustand/react";
import {persist} from "zustand/middleware";
import {axiosCategoryList} from "@/shared/services/category.service";

export interface CategoryData {
    id: number
    name: string
}

export interface CategoryState {
    categories: CategoryState[]
    isLoading: boolean
    categoryId: number | null

    categoryList: () => Promise<void>
    setCategoryId: (categoryId: number | null) => void
}

export const useCategoryStore = create<CategoryState>()(
    persist((set, get) => ({
        categories: [],
        isLoading: false,
        categoryId: null,

        categoryList: async () => {
            try {
                set({ isLoading: true })
                const data = await axiosCategoryList()
                set({ categories: data, isLoading: false })
            } catch (err: any) {
                set({ isLoading: false })
                console.error(err)
                throw err
            }
        },

        setCategoryId: (categoryId: number | null) => set({ categoryId })

    }), {
        name: 'category-state',
        partialize: (state) => ({
            categories: state.categories,
            isLoading: state.isLoading
        })
    })
)

