import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string

export async function axiosTestimonials(current: number, limit: number) {
    try {
        const response = await axios.get(`${BASE_URL}/api/testimonials`, {
            params: { current, limit }
        })
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
        throw new Error(`error récupération des avis' : ${response.status}`)
    } catch (err: any) {
        console.error(err)
        throw err
    }
}

export async function axiosTestimonialAdd(formData: FormData) {
    try {
        const response = await axios.post(`${BASE_URL}/api/testimonials/add`, formData)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
        throw new Error(`Erreur de la l\'ajout d\'un avis' : ${response.status}`)
    } catch (err: any) {
        console.error(err)
        throw err
    }
}