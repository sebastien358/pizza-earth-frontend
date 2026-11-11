import {create} from "zustand/react";
import {persist} from "zustand/middleware";
import {axiosLogin, axiosRegister} from "@/shared/services/auth.service";

export interface LoginFormData {
    email: string
    password: string
}

export interface RegisterFormData {
    firstname: string
    lastname: string
    email: string
    phone: string
    password: string
    confirm: string
    terms: boolean
}

export interface AuthState {
    user: null
    successMessage: string | null
    errorMessage: string | null

    login: (data: LoginFormData) => Promise<void>
    registration: (data: RegisterFormData) => Promise<void>
    resetSuccessMessage: () => void
    resetErrorMessage: () => void
}

export const useAuthStore =  create<AuthState>()(
    persist((set, get) => ({
        user: null,
        successMessage: null,
        errorMessage: null,

        login: async (data: LoginFormData) => {
            try {
                await axiosLogin(data)
                set({ successMessage: 'Vous êtes connecté ✨', errorMessage: null })
            } catch (err: any) {
                const apiError = err.response.status
                if (apiError === 401) {
                    set({ errorMessage: 'Identifiant ou mot de passe incorrect'})
                } else {
                    set({ errorMessage: 'Une erreur est survenue'})
                }
                throw err
            }
        },

        registration: async (data: RegisterFormData) => {
            try {
                await axiosRegister(data)
                set({ successMessage: 'L\inscription a réussie', errorMessage: null })
            } catch (err: any) {
                set({ errorMessage: 'L\'inscription a échouée'})
                throw err
            }
        },

        resetSuccessMessage: () => set({ successMessage: null }),

        resetErrorMessage: () => set({ errorMessage: null })

    }), {
        name: 'auth-state'
    })
)