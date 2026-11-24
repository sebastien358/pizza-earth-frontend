import {create} from "zustand/react";
import {persist} from "zustand/middleware";
import {
    axiosTestimonialIsVisible,
    axiosTestimonialRemove,
    axiosTestimonials,
    axiosTestimonialSearch
} from "@/shared/services/admin/testimonialAdmin.service";

export interface TestimonialState {
    testimonials: any[]
    isLoading: boolean
    countTestimonials: number
    averageRating: number
    current: number
    limit: number
    pages: number
    term?: string | null

    getLimitTestimonials: () => void
    testimonialList: () => Promise<void>
    previousPage: () => Promise<void>
    followingPage: () => Promise<void>
    testimonialSearch: (term: string) => Promise<void>
    testimonialIsVisible: (id: number) => Promise<void>
    testimonialDelete: (id: number) => Promise<void>
}

export const useTestimonialAdminStore = create<TestimonialState>()(
    persist((set, get) => ({
        testimonials: [],
        isLoading: false,
        countTestimonials: 0,
        averageRating: 0,
        current: 1,
        limit: 3,
        pages: 0,
        term: "",

        getLimitTestimonials: () => {
            if (window.innerWidth >= 1600) {
                set({ limit: 6 })
            } else if (window.innerWidth >= 600) {
                set({ limit: 4 })
            } else {
                set({ limit: 3 })
            }
        },

        testimonialList: async () => {
            get().getLimitTestimonials()
            try {
                set({ isLoading: true })
                const data = await axiosTestimonials(get().current, get().limit)
                set({ testimonials: data.testimonials,
                    countTestimonials: data.count,
                    averageRating: data.averageRating,
                    pages: data.pages,
                    isLoading: false
                })
            } catch (err: any) {
                console.error(err)
                set({ isLoading: false })
                throw err
            }
        },

        previousPage: async () => {
            const { current } = get()
            if (current > 1) {
                const newCurrent = current - 1
                set({ current: newCurrent })
                await get().testimonialList()
            }
        },

        followingPage: async () => {
            const { current, pages } = get()
            if (current < pages) {
                const newCurrent = current + 1
                set({ current: newCurrent })
                await get().testimonialList()
            }
        },

        testimonialSearch: async (term: string) => {
            const trimmed = term.toLowerCase().trim()
            try {
                if (!trimmed) {
                    set({ term: "", isLoading: false })
                    await get().testimonialList()
                    return
                }
                set({ term: trimmed, isLoading: true })
                const newTestimonial = await axiosTestimonialSearch(get().term ?? "")
                set({ testimonials: newTestimonial, isLoading: false })
            } catch (err: any) {
                console.error(err)
                throw err
            }
        },

        testimonialIsVisible: async (id: number) => {
            try {
                const data = await axiosTestimonialIsVisible(id)
                set((state) => ({
                    testimonials: state.testimonials.map((t) =>
                        t.id === id ? { ...t, isPublished: data.isPublished } : t)
                }))
            } catch (err: any) {
                console.error(err)
                throw err
            }
        },

        testimonialDelete: async (id: number) => {
            try {
                await axiosTestimonialRemove(id)
                set((state) => ({ testimonials: state.testimonials.filter((t) => t.id !== id) }))
            } catch (err: any) {
                console.error(err)
                throw err
            }
        }

    }), {
        name: 'testimonial-admin-state',
        partialize: (state) => ({
            testimonials: state.testimonials
        })
    })
)
