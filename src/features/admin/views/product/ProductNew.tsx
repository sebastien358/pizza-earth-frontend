"use client"

import styles from './ProductNew.module.scss'

import {ChangeEvent, useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from 'zod'
import {useCategoryStore} from "@/store/category.store";
import {ProductFormData, useProductAdminStore} from "@/store/admin/productAdmin.store";
import {useRouter} from "next/navigation";
import Link from "next/link";

const DELAY_TIMEOUT = 2000

const schema = z.object({
    name: z.string().min(5, { message: '5 caractères minimum' }).max(500, { message: '50 caractères max' }),
    description: z.string().min(5, { message: '5 caractères minimum' }).max(100, { message: '100 caractères max' }),
    price: z.coerce.number().min(1, { message: 'Le prix est requis' }),
    picture: z.instanceof(File, {
        message: "Veuillez choisir une image",
    }),
    category: z.coerce.number().min(1, { message: 'La catégorie est requise' }),
});

export default function ProductNew() {

    const router = useRouter()

    {/* Store Product */}

    const {
        productNew,
        setFilename,
        filename,
        successMessage,
        errorMessage,
        resetSuccessMessage,
        resetErrorMessage
    } = useProductAdminStore()

    {/* Store Category */}

    const { categoryList, categories, isLoading } = useCategoryStore()

    useEffect(() => {
        categoryList()
    }, [categoryList]);

    {/* Gestion Form */}

    const { register, handleSubmit, setValue, reset, formState: {errors, isSubmitting} } = useForm({
        resolver: zodResolver(schema)
    })

    function handleChangeImage(e: ChangeEvent<HTMLInputElement>) {
        const file = e?.target?.files?.[0]
        if (!file) return
        setFilename(file.name)
        setValue('picture', file, { shouldValidate: true })
    }

    async function onSubmit(data: ProductFormData) {
        try {
            await productNew(data)
            handleSuccess()
        } catch (err: any) {
            handleError()
        }
    }

    function handleSuccess() {
        setTimeout(() => {
            resetSuccessMessage()
            router.push('/admin/products')
            reset()
        }, DELAY_TIMEOUT)
    }

    function handleError() {
        setTimeout(() => {
            resetErrorMessage()
        }, DELAY_TIMEOUT)
    }

    return (
        <main className={styles['product']}>
            <section className={styles['product__form']}>
                <h1>Ajout Pizza</h1>
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
                        <select {...register('category')} defaultValue={""}>
                            <option value="" disabled>Choisissez une catégorie</option>
                            {categories?.map((c: any) =>
                                <option key={c.id} value={c.id}>{c.name}</option>
                            )}
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
                        {errors && <small>{errors.picture?.message}</small>}
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
        </main>
    )
}