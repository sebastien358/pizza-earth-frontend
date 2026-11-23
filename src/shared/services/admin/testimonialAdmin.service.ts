import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string

export async function axiosAdminTestimonials(current: number, limit: number) {
    try {
        const response = await axios.get(`${BASE_URL}/api/admin/testimonials`, {
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

export async function axiosAdminTestimonialSearch(term: string) {
    try {
        const response = await axios.get(`${BASE_URL}/api/admin/testimonials/search`, {
            params: { search: term }
        })
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
        throw new Error(`error de la recherche d'un avi' : ${response.status}`)
    } catch (err: any) {
        console.error(err)
        throw err
    }
}