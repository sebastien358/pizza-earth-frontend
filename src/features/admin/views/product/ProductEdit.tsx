"use client"
"use client"

import styles from "./ProductEdit.module.scss"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ChangeEvent, useEffect} from "react";
import {ProductFormData, useProductAdminStore} from "@/store/admin/productAdmin.store";
import { z } from "zod"
import Image from "next/image";
import Link from "next/link";

const DELAY_TIMEOUT = 2000

const schema = z.object({
    name: z.string().min(5, { message: '5 caractères minimum' }).max(500, { message: '50 caractères max' }),
    description: z.string().min(5, { message: '5 caractères minimum' }).max(100, { message: '100 caractères max' }),
    price: z.coerce.number().min(1, { message: 'Le prix est requis' }),
    picture: z.instanceof(File).optional(),
    category: z.coerce.number().min(1, { message: 'La catégorie est requise' }),
});

interface ProductEditProps {
    id: string | null
}

export default function ProductEdit({ id }: ProductEditProps) {

    const {
        productDetails,
        setFilename,
        currentProduct,
        productDeleteImage,
        productEditImage,
        productEdit,
        filename,
        successMessage,
        errorMessage,
        resetSuccessMessage,
        resetErrorMessage
    } = useProductAdminStore()

    const { register, handleSubmit, setValue, reset, formState: {errors, isSubmitting} } = useForm({
        resolver: zodResolver(schema),
        defaultValues: ({
            name: "",
            price: 0,
            description: "",
            category: 0,
            picture: undefined
        })
    })

    useEffect(() => {
        if (!id) return
        productDetails(id)
    }, [productDetails, id]);

    useEffect(() => {
        if (!currentProduct) return
        reset({
            name: currentProduct.name,
            price: currentProduct.price,
            description: currentProduct.description,
            category: typeof currentProduct.category === 'object' ? currentProduct.category.id : 1,
        });
    }, [currentProduct, reset]);

    async function handleChangeImage(e: ChangeEvent<HTMLInputElement>) {
        try {
            const file = e?.target?.files?.[0]
            if (!file) return

            if (currentProduct?.pictures?.length) {
                if (!id) return
                await productDeleteImage(Number(id))
            }
            setFilename(file.name)
            setValue('picture', file, { shouldValidate: true })

            if (!id) return
            await productEditImage(id, file)
            handleSuccess()
        } catch (err: any) {
            handleError()
        }
    }

    async function onSubmit(data: ProductFormData) {
        try {
            if (!id) return
            await productEdit(id, data)
            handleSuccess()
        } catch (err: any) {
            handleError()
        }
    }

    function handleSuccess() {
        setTimeout(() => {
            resetSuccessMessage()
        }, DELAY_TIMEOUT)
    }

    function handleError() {
        setTimeout(() => {
            resetErrorMessage()
        }, DELAY_TIMEOUT)
    }

    return (
        <main className={styles['page']}>
            <div className={styles['edit']}>

                <section className={styles['edit__preview']}>
                    <div className={styles['edit__media']}>
                        {(currentProduct?.pictures?.length ?? 0) > 0 && (
                            <Image src={currentProduct?.pictures?.[0]?.url ?? ""} alt="Pizza Reine" height={200} width={200} />
                        )}
                    </div>
                    <label className={styles['edit__change']}>
                        <span>↑ Changer l'image</span>
                        <input
                            onChange={(e) => handleChangeImage(e)}
                            type="file"
                            accept="image/png, image/jpeg"
                            hidden
                        />
                    </label>
                </section>

                <section className={styles['edit__form']}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className={styles['field']}>
                            <span>Nom</span>
                            <input {...register('name')} type="text" />
                            {errors && <small>{errors.name?.message}</small>}
                        </label>

                        <label className={styles['field']}>
                            <span>Prix</span>
                            <input {...register('price')} type="text" />
                            {errors && <small>{errors.price?.message}</small>}
                        </label>

                        <label className={styles['field']}>
                            <span>Description</span>
                            <textarea {...register('description')} rows={2}></textarea>
                            {errors && <small>{errors.description?.message}</small>}
                        </label>

                        <label className={styles['field']}>
                            <span>Catégorie</span>
                            <select {...register('category')}>
                                <option value="" disabled>Choisissez une catégorie</option>
                                <option value={1}>Classiques</option>
                                <option value={2}>Végétariennes</option>
                                <option value={3}>Gourmandes</option>
                                <option value={4}>Piquantes</option>
                            </select>
                            {errors && <small>{errors.category?.message}</small>}
                        </label>

                        <div className={styles['field']}>
                            <span>Image</span>
                            <label className={styles['drop']}>
                                <span className={styles['drop__icon']}>☁</span>
                                <strong>Cliquez ou glissez une image ici</strong>
                                <small>PNG, JPG jusqu'à 5MB</small>
                                <input type="file" accept="image/png, image/jpeg" hidden onChange={(e) => handleChangeImage(e)} />
                                <p>{filename}</p>
                            </label>

                            {errors && !currentProduct?.pictures?.length && (
                                <small>{errors.picture?.message}</small>)
                            }
                        </div>

                        {successMessage && <p className={styles['success-message']}>{successMessage}</p>}
                        {errorMessage && <p className={styles['error-message']}>{errorMessage}</p>}

                        <div className={styles['actions']}>
                            <Link href={"/admin/products"} className={`${styles['btn']} ${styles['btn--ghost']}`}>Annuler</Link>
                            <button
                                type="submit"
                                className={`${styles['btn']} ${styles['btn--primary']}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Chargement…' : ' Enregistrer'}
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    )
}