import {LoginFormData, RegisterFormData, RequestFormData, ResetFormData, useAuthStore} from "@/store/auth.store";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string

axios.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => Promise.reject(error))

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        const authStore = useAuthStore.getState()
        const hasAuthHeader = Boolean(
            error.config?.headers?.Authorization ||
            error.config?.headers?.authorization
        )
        if (error.response?.status === 401 && hasAuthHeader) {
            authStore.logout()
            window.location.href = '/'
        }
        return Promise.reject(error)
    }
)

export async function axiosMe() {
    try {
        const response = await axios.get(`${BASE_URL}/api/user/me`)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
        throw new Error(`Erreur de la récupération d\'un utilisateur connecté : ${response.status}`)
    } catch (err: any) {
        console.error(err)
        throw err
    }
}

export async function axiosUserExisted(data: LoginFormData) {
    try {
        const response = await axios.post(`${BASE_URL}/api/existed`, data)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
        throw new Error(`Erreur vérification d'un compte utulisateur : ${response.status}`)
    } catch (err: any) {
        console.error(err)
        throw err
    }
}

export async function axiosRequestPassword(data: RequestFormData) {
    try {
        const response = await axios.post(`${BASE_URL}/api/request/password`, data)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
        throw new Error(`Erreur email de réinitialisation : ${response.status}`)
    } catch (err: any) {
        console.error(err)
        throw err
    }
}

export async function axiosResetPassword(data: ResetFormData, token: string) {
    try {
        const { password } = data
        const response = await axios.post(`${BASE_URL}/api/reset/password/${token}`, {password})
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
        throw new Error(`Erreur modification du mot de passe : ${response.status}`)
    } catch (err: any) {
        console.error(err)
        throw err
    }
}

export async function axiosLogin(data: LoginFormData) {
    try {
        const response = await axios.post(`${BASE_URL}/api/login`, {
            username: data.email,
            password: data.password
        })
        if (response.status >= 200 && response.status < 300) {
            return response.data

        }
        throw new Error(`Erreur authentification : ${response.status}`)
    } catch (err: any) {
        console.error(err)
        throw err
    }
}

export async function axiosRegister(data: RegisterFormData) {
    try {
        const { confirm, ...payload } = data;
        const response = await axios.post(`${BASE_URL}/api/register`, payload)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
        throw new Error(`Erreur de l\'inscription : ${response.status}`)
    } catch (err: any) {
        console.error(err)
        throw err
    }
}