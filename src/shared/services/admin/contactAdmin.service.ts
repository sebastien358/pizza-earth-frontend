import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string

export async function axiosContacts() {
    try {
        const response = await axios.get(`${BASE_URL}/api/admin/contacts`)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
        throw new Error(`Erreur de la récupération des contacs' : ${response.status}`)
    } catch (err: any)  {
        console.error(err)
        throw err
    }
}