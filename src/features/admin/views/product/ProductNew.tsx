"use client"

import styles from './ProductNew.module.scss'

import {ChangeEvent, useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from 'zod'
import {useCategoryStore} from "@/store/category.store";
import {ProductFormData, useProductAdminStore} from "@/store/admin/productAdmin.store";
import {useRouter} from "next/navigation";

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
            <section className={styles['product__main']}>
                <div className={styles['card']}>
                    <h2>Ajout Pizza</h2>
                    <form onSubmit={handleSubmit(onSubmit)} action="/admin/products/form" method="post" noValidate className={styles['product__form']}>
                        <div className={styles['field']}>
                            <label htmlFor="nom">Nom</label>
                            <input {...register('name')} id="email" name="name" type="text" autoComplete="name" />
                            {errors && <small>{errors?.name?.message}</small>}
                        </div>
                        <div className={styles['field']}>
                            <label htmlFor="price">Prix</label>
                            <input {...register('price')} id="price" name="price" type="number" autoComplete="price" placeholder={"0€"} />
                            {errors && <small>{errors.price?.message}</small>}
                        </div>
                        <div className={styles['field']}>
                            <label htmlFor="description">Description</label>
                            <textarea {...register('description')} id="description" name="description" autoComplete="description"></textarea>
                            {errors && <small>{errors.description?.message}</small>}
                        </div>

                        <div className={styles['field']}>
                            {isLoading ? (
                                <>
                                    <span className={styles['loader']}></span>
                                </>
                            ) : !isLoading && categories && (
                                <>
                                    <label htmlFor="category">Catégorie &nbsp;</label>
                                    <select {...register('category')} name="category" id="pet-select" defaultValue={""}>
                                        <option value="" disabled>Choisissez une catégorie</option>
                                        {categories.map((c: any) =>
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        )}
                                    </select>
                                    {errors && <small>{errors.category?.message}</small>}
                                </>
                            )}
                        </div>
                        <div className={styles['field']}>
                            <label htmlFor="picture">Image</label>
                            <div className={styles['file']}>
                                <label className={styles['file__label']}>
                                    <input
                                        className={styles['file__input']}
                                        id="picture"
                                        name="picture"
                                        type="file"
                                        onChange={(e) => handleChangeImage(e)}
                                    />
                                    <span className={`${filename ? styles['filename'] : styles['no-filename']}`}>
                                        {filename ? filename : 'Choisir'}
                                    </span>
                                </label>
                            </div>
                            {errors && <small>{errors.picture?.message}</small>}
                        </div>

                        {successMessage && <p className={styles['success-message']}>{successMessage}</p>}
                        {errorMessage && <p className={styles['error-message']}>{errorMessage}</p>}

                        <button type="submit" className={`${styles['btn']} ${styles['btn--primary']}`}
                                disabled={isSubmitting}>
                            {isSubmitting ? 'Chargement…' : 'Add Pizza'}
                        </button>
                    </form>
                </div>
            </section>
        </main>
    )
}