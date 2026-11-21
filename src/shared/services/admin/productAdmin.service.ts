import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string

export async function axiosProductsList(current: number, limit: number) {
    try {
        const response = await axios.get(`${BASE_URL}/api/admin/products/list`, {
            params: { current, limit }
        })
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
        const response = await axios.get(`${BASE_URL}/api/admin/products/${id}`)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
        throw new Error(`Erreur de la récupération d\'un produit' : ${response.status}`)
    } catch (err: any) {
        console.error(err)
        throw err
    }
}

export async function axiosProductsSearch(search: string) {
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

export async function axiosDeleteProductImage(id: number) {
    try {
        const response = await axios.delete(`${BASE_URL}/api/admin/products/${id}/image`)
        if (response.status === 200 || response.status === 204) {
            return response.data
        }
        throw new Error(`Erreur de la suppression de l\'image d\'un produit' : ${response.status}`)
    } catch (err: any) {
        console.error(err)
        throw err
    }
}

export async function axiosProductEdit(id: string, formData: FormData) {
    try {
        const response = await axios.patch(`${BASE_URL}/api/admin/products/${id}/edit`, formData)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
        throw new Error(`Erreur de la modification d'un produit' : ${response.status}`)
    } catch (err: any) {
        console.error(err)
        throw err
    }
}

export async function axiosProductEditImage(id: string, formData: FormData) {
    try {
        const response = await axios.patch(`${BASE_URL}/api/admin/products/${id}/edit/image`, formData)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
        throw new Error(`Erreur de la modification d\'une image' : ${response.status}`)
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
