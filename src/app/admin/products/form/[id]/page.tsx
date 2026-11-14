"use client"

import ProductEdit from "@/features/admin/views/product/ProductEdit";
import {useParams} from "next/navigation";
import {useEffect} from "react";
import {useProductAdminStore} from "@/store/admin/productAdmin.store";

export default function Page() {
    const { id } = useParams<{id: string}>()

    const { productDetails, setFilename, currentProduct } = useProductAdminStore()

    useEffect(() => {
        if (id) productDetails(id)
    }, [id, productDetails]);

    return (
        <ProductEdit
            id={id}
            productDetails={productDetails}
            setFilename={setFilename}
            currentProduct={currentProduct}
        />
    )
}