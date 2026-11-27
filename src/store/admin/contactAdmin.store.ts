import {create} from "zustand/react";
import {persist} from "zustand/middleware";
import {axiosContacts} from "@/shared/services/admin/contactAdmin.service";

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

    contactList: () => Promise<void>
    resetSuccessMessage: () => void
    resetErrorMessage: () => void
}

export const useContactAdminSTore = create<ContactState>()(
    persist((set, get) => ({
        contacts: [],
        isLoading: false,
        successMessage: null,
        errorMessage: null,

        contactList: async () => {
            try {
                set({ isLoading: true })
                const data = await axiosContacts()
                set({ contacts: data, isLoading: false })
            } catch (err: any) {
                console.error(err)
                set({ isLoading: false })
                throw err
            }
        },

        resetSuccessMessage: () => set({ successMessage: null }),

        resetErrorMessage: () => set({ successMessage: null })

    }), {
        name: 'contact-admin-state',
        partialize: (state) => ({
            contacts: state.contacts
        })
    })
)