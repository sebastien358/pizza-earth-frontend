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

    categoryList: () => Promise<void>
}

export const useCategoryStore = create<CategoryState>()(
    persist((set, get) => ({
        categories: [],
        isLoading: false,

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
        }

    }), {
        name: 'category-state',
        partialize: (state) => ({
            categories: state.categories,
            isLoading: state.isLoading
        })
    })
)

