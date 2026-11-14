import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string

export async function axiosProductsList() {
    try {
        const response = await axios.get(`${BASE_URL}/api/admin/products/list`)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
        throw new Error(`Erreur de la récupération des produits' : ${response.status}`)
    } catch (err: any) {
        console.error(err)
        throw err
    }
}

export async function axiosProductDetails(id: string) {
    try {
        const response = await axios.get(`${BASE_URL}/api/admin/products/show/${id}`)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
        throw new Error(`Erreur de la récupération d\'un produit' : ${response.status}`)
    } catch (err: any) {
        console.error(err)
        throw err
    }
}

export async function axiosProductsSearch(search?: string) {
    try {
        const response = await axios.get(`${BASE_URL}/api/admin/products/search`, {
            params: { search }
        })
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
        throw new Error(`Erreur de la recherche des produits' : ${response.status}`)
    } catch (err: any) {
        console.error(err)
        throw err
    }
}

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

export async function axiosPublishedProduct(id: number) {
    try {
        const response = await axios.patch(`${BASE_URL}/api/admin/products/${id}/published`)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
        throw new Error(`Erreur de la publication product' : ${response.status}`)
    } catch (err: any) {
        console.error(err)
        throw err
    }
}

export async function axiosDeleteProduct(id: number) {
    try {
        const response = await axios.delete(`${BASE_URL}/api/admin/products/${id}/delete`)
        if (response.status === 200 || response.status === 204) {
            return response.data
        }
        throw new Error(`Erreur de la suppression d\'un produit' : ${response.status}`)
    } catch (err: any) {
        console.error(err)
        throw err
    }
}
