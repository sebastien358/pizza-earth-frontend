"use client"

import styles from "./ProductEdit.module.scss"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ChangeEvent, useEffect} from "react";
import {ProductFormData} from "@/store/admin/productAdmin.store";
import { z } from "zod"
import Image from "next/image";

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

interface ProductEditProps {
    id: string
    productDetails: (id: string) => Promise<void>
    setFilename: string | null
    currentProduct: ProductFormData | null
}

export default function ProductEdit({ id, productDetails, setFilename, currentProduct }: ProductEditProps) {

    console.log(currentProduct)

    {/* Gestion Form */}

    const { register, handleSubmit, setValue, reset, formState: {errors, isSubmitting} } = useForm({
        resolver: zodResolver(schema),
        defaultValues: ({
            id: "",
            price: "",
            description: "",
            category: 0,
            pictures: {
                id: 0,
                url: ""
            }
        })
    })

    {/* Récupération d\'un produit */}

    useEffect(() => {
        productDetails(id)
    }, [productDetails, id]);

    {/* Iniatialisation de la données dans le Formulaire */}

    useEffect(() => {
        if (!currentProduct) return
        reset({
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            description: currentProduct.description,
            category: currentProduct.category?.id,
            pictures: {
                id: currentProduct.pictures?.[0]?.id ?? 0,
                url: currentProduct.pictures?.[0]?.url ?? "",
            },
        });
    }, [currentProduct, reset]);

    {/* Gestion image */}

    function handleChangeImage(e: ChangeEvent<HTMLInputElement>) {
        const file = e?.target?.files?.[0]
        if (!file) return
        setFilename(file.name)
        setValue('picture', file, { shouldValidate: true })
    }

    {/* Validation formulaire */}

    async function onSubmit(data: ProductFormData) {
        try {
            console.log(data)
            handleSuccess()
        } catch (err: any) {
            handleError()
        }
    }

    function handleSuccess() {}

    function handleError() {}

    return (
        <main className={styles['page']}>
            <div className={styles['edit']}>

                <section className={styles['edit__preview']}>
                    <div className={styles['edit__media']}>
                        {currentProduct?.pictures.length > 0 && (
                            <Image src={currentProduct?.pictures[0]?.url} alt="Pizza Reine" height={200} width={200} />
                        )}
                    </div>
                    <label className={styles['edit__change']}>
                        <span>↑ Changer l'image</span>
                        <input type="file" accept="image/png, image/jpeg" hidden/>
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
                            </label>

                            {errors && !currentProduct?.pictures?.length && (
                                <small>{errors.picture?.message}</small>)
                            }
                        </div>

                        <div className={styles['actions']}>
                            <button type="button" className={`${styles['btn']} ${styles['btn--ghost']}`}>Annuler</button>
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