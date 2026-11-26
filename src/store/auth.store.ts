import {create} from "zustand/react";
import {persist} from "zustand/middleware";
import {axiosLogin, axiosMe, axiosRegister, axiosUserExisted} from "@/shared/services/auth.service";

export interface RequestFormData {
    email: string
}

export interface ResetFormData {
    password: string
    passwordConfirm: string
}

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
    hasHydrated: boolean

    setHasHydrated: (state: boolean) => void
    userExisted: (data: LoginFormData) => Promise<void>
    login: (data: LoginFormData) => Promise<void>
    infoMe: () => Promise<void>
    registration: (data: RegisterFormData) => Promise<void>
    requestPassword: (data: RequestFormData) => Promise<void>
    resetPassword: (data: ResetFormData) => Promise<void>
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
        hasHydrated: false,

        setHasHydrated: (state) => set({ hasHydrated: state }),

        userExisted: async (data: LoginFormData) => {
            try {
                await axiosUserExisted(data)
            } catch (err: any) {
                const apiError = err.response.data
                if (apiError.type === 'ERROR_USER_EXISTING') {
                    set({ errorMessage: apiError.message })
                } else {
                    set({ errorMessage: 'Une erreur est survenue'})
                }
                throw err
            }
        },

        login: async (data: LoginFormData) => {
            try {
                const {token} = await axiosLogin(data)
                set({ token: token, successMessage: 'Vous êtes connecté ✨', errorMessage: null })
                document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax; Secure`
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
                const apiError = err.response.data
                if (apiError.type === 'ERROR_USER_EXISTING') {
                    set({ errorMessage: apiError.message })
                } else {
                    set({ errorMessage: 'Une erreur est survenue'})
                }
                throw err
            }
        },

        requestPassword: async (data: RequestFormData) => {
            try {
                console.log(data)
                set({ successMessage: 'Un mail de résilation vous a été envoyé'})
            } catch (err: any) {
                set({ errorMessage: 'Une erreur est survenue'})
                throw err
            }
        },

        resetPassword: async (data: ResetFormData) => {
            try {
                console.log(data)
                set({ successMessage: 'Ton mot de passe a bien été modifié, tu peux te connecter.' })
            } catch (err: any) {
                set({ errorMessage: 'Une erreur est survenue'})
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
        onRehydrateStorage: () => (state) => {
            state?.setHasHydrated(true)
        }
    })
)