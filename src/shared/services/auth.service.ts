import {LoginFormData, RegisterFormData, useAuthStore} from "@/store/auth.store";
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