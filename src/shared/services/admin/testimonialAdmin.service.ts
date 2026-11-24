import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string

export async function axiosTestimonials(current: number, limit: number) {
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

export async function axiosTestimonialSearch(term: string) {
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

export async function axiosTestimonialIsVisible(id: number) {
    try {
        const response = await axios.patch(`${BASE_URL}/api/admin/testimonials/${id}/is-visible`)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
        throw new Error(`error sur la visibilité d'un avi' : ${response.status}`)
    } catch (err: any) {
        console.error(err)
        throw err
    }
}

export async function axiosTestimonialRemove(id: number) {
    try {
        const response = await axios.delete(`${BASE_URL}/api/admin/testimonials/${id}/delete`)
        if (response.status === 200 || response.status === 204) {
            return response.data
        }
        throw new Error(`Erreur de la suppression d\'un avis' : ${response.status}`)
    } catch (err: any) {
        console.error(err)
        throw err
    }
}