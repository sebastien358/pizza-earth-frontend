import {create} from "zustand/react";
import {persist} from "zustand/middleware";
import {axiosLogin, axiosMe, axiosRegister} from "@/shared/services/auth.service";

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

export interface UserData {
    firstname: string
    lastname: string
    email: string
    phone: string
    password: string
    confirm: string
    terms: boolean
    roles: string[]
}

export interface AuthState {
    user: UserData | null
    token: string | null
    successMessage: string | null
    errorMessage: string | null

    login: (data: LoginFormData) => Promise<void>
    infoMe: () => Promise<void>
    registration: (data: RegisterFormData) => Promise<void>
    isAdmin: () => boolean
    isUser: () => boolean
    logout: () => void
    resetSuccessMessage: () => void
    resetErrorMessage: () => void
}

export const useAuthStore =  create<AuthState>()(
    persist((set, get) => ({
        user: null,
        token: null,
        successMessage: null,
        errorMessage: null,

        login: async (data: LoginFormData) => {
            try {
                const {token} = await axiosLogin(data)
                set({ token: token, successMessage: 'Vous êtes connecté ✨', errorMessage: null })
                await get().infoMe()
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

        infoMe: async () => {
            try {
                const data = await axiosMe()
                set({ user: data })
            } catch (err: any) {
                console.error(err)
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

        isAdmin: () => get().user?.roles.includes('ROLE_ADMIN') ?? false,

        isUser: () => get().user?.roles.includes('ROLE_USER') ?? false,

        logout: () => set({ token: null, user: null }),

        resetSuccessMessage: () => set({ successMessage: null }),

        resetErrorMessage: () => set({ errorMessage: null }),

    }), {
        name: 'auth-state',
    })
)