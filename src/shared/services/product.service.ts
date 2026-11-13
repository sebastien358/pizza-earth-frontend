import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string

export async function axiosProductsList() {
    try {
        const response = await axios.get(`${BASE_URL}/api/products/list`)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
        throw new Error(`Erreur de la récupération des produits' : ${response.status}`)
    } catch (err: any) {
        console.error(err)
        throw err
    }
}