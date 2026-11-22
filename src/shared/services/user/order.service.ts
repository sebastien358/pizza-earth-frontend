import axios from "axios";
import {ItemFormData, OrderFormData} from "@/store/user/order.store";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string

export async function axiosOrderList(current: number, limit: number) {
    try {
        const response = await axios.get(`${BASE_URL}/api/user/orders`, {
            params: { current, limit }
        })
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
        throw new Error(`Erreur de la récupération des commandes (utilistateur connecté)' : ${response.status}`)
    } catch (err: any) {
        console.error(err)
        throw err
    }
}

export async function axiosOrderSearch(term: string) {
    try {
        const response = await axios.get(`${BASE_URL}/api/user/orders/search`, {
            params: { search: term }
        })
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
        throw new Error(`Erreur de la recherches des commandes' : ${response.status}`)
    } catch (err: any) {
        console.error(err)
        throw err
    }
}

export async function axiosOrderNew(data: OrderFormData, items: ItemFormData[]) {
    try {
        const response = await axios.post(`${BASE_URL}/api/user/orders/new`, {
            data, items
        })
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
        throw new Error(`Erreur de la commande' : ${response.status}`)
    } catch (err: any) {
        console.error(err)
        throw err
    }
}