import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string

export async function axiosProductNew(formData: FormData) {
    try {
        const response = await axios.post(`${BASE_URL}/api/admin/products/new`, formData)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
        throw new Error(`Erreur de l'ajout d'un produit' : ${response.status}`)
    } catch (err: any) {
        console.error(err)
        throw err
    }
}
