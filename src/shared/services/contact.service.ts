import axios from "axios";
import {ContactFormData} from "@/store/contact.store";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string

export async function axiosContactAdd(data: ContactFormData) {
    try {
        const response = await axios.post(`${BASE_URL}/api/contacts/add`, data)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
        throw new Error(`Error de l\'ajout d\'un message' : ${response.status}`)
    } catch (err: any)  {
        console.error(err)
        throw err
    }
}