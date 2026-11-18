import axios from "axios";
import {ItemFormData, OrderFormData} from "@/store/user/order.store";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string

export async function axiosOrderList() {
    try {
        const response = await axios.get(`${BASE_URL}/api/user/orders`)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
        throw new Error(`Erreur de la récupération des commandes (utilistateur connecté)' : ${response.status}`)
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