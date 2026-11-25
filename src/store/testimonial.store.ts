import {create} from "zustand/react";
import {persist} from "zustand/middleware";
import {axiosTestimonialAdd, axiosTestimonials} from "@/shared/services/testimonial.service";

export interface TestimonialFormData {
    name: string
    rating: number
    picture?: File | null
    pizza: string
    message: string
}

export interface TestimonialData {
    id: number
    name: string
    rating: number
    picture?: File | null
    pizza: string
    message: string
}

export interface TestimonialState {
    testimonials: TestimonialData[]
    isLoadingTestimonial: boolean
    successMessage: string | null
    errorMessage: string | null
    countTestimonials: number
    current: number
    limit: number
    pages: number
    averageRating: number

    getLimitTestimonials: () => void
    testimonialsList: () => Promise<void>
    previousPage: () => Promise<void>
    followingPage: () => Promise<void>
    testimonialAdd: (data: TestimonialFormData) => Promise<void>
    resetSuccessMessage: () => void
    resetErrorMessage: () => void
}

export const useTestimonialStore = create<TestimonialState>()(
    persist((set, get) => ({
        testimonials: [],
        isLoadingTestimonial: false,
        successMessage: null,
        errorMessage: null,
        countTestimonials: 0,
        current: 1,
        limit: 0,
        pages: 0,
        averageRating: 0,

        getLimitTestimonials: () => {
            if (window.innerWidth >= 1000) {
                set({ limit: 3 })
            } else if (window.innerWidth >= 600) {
                set({ limit: 2 })
            } else {
                set({ limit: 3 })
            }
        },

        testimonialsList: async () => {
            get().getLimitTestimonials()
            try {
                set({ isLoadingTestimonial: true })
                const data = await axiosTestimonials(get().current, get().limit)
                set({ testimonials: data.testimonials, pages: data.pages, countTestimonials: data.count, averageRating: data.averageRating, isLoadingTestimonial: false })

                console.log(get().averageRating)
            } catch (err: any) {
                console.error(err)
                set({ isLoadingTestimonial: false })
                throw err
            }
        },

        previousPage: async () => {
            const { current } = get()
            if (current > 1) {
                const newCurrent = current - 1
                set({ current: newCurrent })
                await get().testimonialsList()
            }
        },

        followingPage: async () => {
            const { current, pages } = get()
            if (current < pages) {
                const newCurrent = current + 1
                set({ current: newCurrent })
                await get().testimonialsList()
            }
        },

        testimonialAdd: async (data: TestimonialFormData) => {
            try {
                const formData = new FormData()

                formData.append('name', data.name)
                formData.append('rating', data.rating.toString())
                formData.append('pizza', data.pizza)
                formData.append('message', data.message)

                if (data.picture instanceof File) {
                    formData.append('picture', data.picture)
                }

                await axiosTestimonialAdd(formData)
                set({ successMessage: 'Ton avis a été envoyé, la Terre te dit merci.' })
            } catch (err: any) {
                set({ errorMessage: 'Oups, ton avis n\'a pas pu être envoyé' })
                throw err
            }
        },

        resetSuccessMessage: () => set({ successMessage: null }),

        resetErrorMessage: () => set({ errorMessage: null })

    }), {
        name: 'review-state',
        partialize: (state) => ({
            testimonials: state.testimonials
        })
    })
)