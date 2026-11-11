import {LoginFormData, RegisterFormData} from "@/store/auth.store";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string

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