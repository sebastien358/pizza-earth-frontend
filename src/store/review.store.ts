import {create} from "zustand/react";
import {persist} from "zustand/middleware";
import {axiosReviewAdd} from "@/shared/services/review.service";

export interface ReviewFormData {
    name: string
    rating: number
    picture?: File | null
    pizza: string
    message: string
}

export interface ReviewData {
    id: number
    name: string
    rating: number
    picture?: File | null
    pizza: string
    message: string
}

export interface ReviewState {
    reviews: ReviewData[],
    successMessage: string | null
    errorMessage: string | null

    previousPage: () => Promise<void>
    followingPage: () => Promise<void>
    reviewAdd: (data: ReviewFormData) => Promise<void>
    resetSuccessMessage: () => void
    resetErrorMessage: () => void
}

export const useReviewStore = create<ReviewState>()(
    persist((set, get) => ({
        reviews: [],
        successMessage: null,
        errorMessage: null,

        previousPage: async () => {},

        followingPage: async () => {},

        reviewAdd: async (data: ReviewFormData) => {
            try {
                const formData = new FormData()

                formData.append('name', data.name)
                formData.append('rating', data.rating.toString())
                formData.append('pizza', data.pizza)
                formData.append('message', data.message)

                if (data.picture instanceof File) {
                    formData.append('picture', data.picture)
                }

                const newReview = await axiosReviewAdd(formData)
                set({ reviews: [...get().reviews, newReview], successMessage: 'Ton avis a été envoyé, la Terre te dit merci.' })
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
            reviews: state.reviews
        })
    })
)