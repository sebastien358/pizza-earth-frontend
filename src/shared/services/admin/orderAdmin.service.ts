import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string

export async function axiosOrderList(current: number, limit: number) {
    try {
        const response = await axios.get(`${BASE_URL}/api/admin/orders`, {
            params: { current, limit }
        })
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
        throw new Error(`Erreur de la récupération des commandes des clients' : ${response.status}`)
    } catch (err: any) {
        console.error(err)
        throw err
    }
}

export async function axiosOrderSearch(term: string) {
    try {
        const response = await axios.get(`${BASE_URL}/api/admin/orders/search`, {
            params: { search: term }
        })
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
        throw new Error(`Erreur de la recherches des commandes des clients' : ${response.status}`)
    } catch (err: any) {
        console.error(err)
        throw err
    }
}

export async function axiosOrderDelete(id: number) {
    try {
        const response = await axios.delete(`${BASE_URL}/api/admin/orders/${id}/delete`)
        if (response.status === 200 || response.status === 204) {
            return response.data
        }
        throw new Error(`Erreur de la suppresion de la commande d'un client' : ${response.status}`)
    } catch (err: any) {
        console.error(err)
        throw err
    }
}

export async function axiosOrderChangeStatus(id: number, status: string) {
    try {
        const response = await axios.patch(`${BASE_URL}/api/admin/orders/${id}/status/${status}`)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
        throw new Error(`Erreur du changement de status de la commande des clients' : ${response.status}`)
    } catch (err: any) {
        console.error(err)
        throw err
    }
}

