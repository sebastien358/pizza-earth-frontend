import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string

export async function axiosReviewAdd(formData: FormData) {
    try {
        const response = await axios.post(`${BASE_URL}/api/reviews/add`, formData)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
        throw new Error(`Erreur de la l\'ajout d\'un commentaire' : ${response.status}`)
    } catch (err: any) {
        console.error(err)
        throw err
    }
}