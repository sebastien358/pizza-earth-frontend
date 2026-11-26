import {create} from "zustand/react";
import {persist} from "zustand/middleware";
import {axiosContactAdd} from "@/shared/services/contact.service";

export interface ContactFormData {
    name: string
    email: string
    subject: string
    message: string
}

export interface ContactData {
    id: number
    name: string
    email: string
    subject: string
    message: string
}

export interface ContactState {
    contacts: ContactData[]
    isLoading: boolean
    successMessage: string | null
    errorMessage: string | null

    contactAdd: (data: ContactFormData) => Promise<void>
    resetSuccessMessage: () => void
    resetErrorMessage: () => void
}

export const useContactSTore = create<ContactState>()(
    persist((set, get) => ({
        contacts: [],
        isLoading: false,
        successMessage: null,
        errorMessage: null,

        contactAdd: async (data: ContactFormData) => {
            try {
                const newContact = await axiosContactAdd(data)
                set({
                    contacts: [...get().contacts, newContact],
                    successMessage: 'Message envoyé. Nous vous répondons dans les plus brefs délais.',
                    errorMessage: null
                })
            } catch (err: any) {
                set({ errorMessage: 'Erreur lors de l’envoi' })
                throw err
            }
        },

        resetSuccessMessage: () => set({ successMessage: null }),

        resetErrorMessage: () => set({ successMessage: null })

    }), {
        name: 'contact-state',
        partialize: (state) => ({
            contacts: state.contacts
        })
    })
)