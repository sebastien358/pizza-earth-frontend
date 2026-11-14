"use client"

import styles from "./PizzaList.module.scss";

import {useProductAdminStore} from "@/store/admin/productAdmin.store";
import {useEffect, useMemo} from "react";
import {useCategoryStore} from "@/store/category.store";
import Link from "next/link";
import Image from "next/image";
import InputSearch from "@/components/input-search/InputSearch";

export default function ProductList() {

    {/* Store Category */}

    const { categoryList, setCategoryId, categories, categoryId } = useCategoryStore()

    useEffect(() => {
        categoryList()
    }, [categoryList]);

    {/* Store Product */}

    const { productsList, productSearch, term, publishedProduct, deleteProduct, products, isLoading } = useProductAdminStore()

    useEffect(() => {
        productsList()
    }, [productsList]);

    {/* Filtered Product */}

    function onClickCategory(id: number) {
        setCategoryId(id)
    }

    const filtered = useMemo(() => {
        if (categoryId === null) return products;
        return products.filter((p: any) => p?.category?.id === categoryId);
    }, [products, categoryId]);

    {/* Delete Product */}

    async function deletePizza(id: number) {
        try {
            await deleteProduct(id)
        } catch (err: any) {
            console.error(err)
            throw err
        }
    }

    async function togglePublish(id: number) {
        try {
            await publishedProduct(id)
        } catch (err: any) {
            console.error(err)
            throw err
        }
    }

    return (
        <main className={styles.layout}>
            <div className={styles.main}>
                <div className={styles.header}>
                    <div>
                        <h1>Les Pizzas</h1>
                        <p>{products.length} pizzas</p>
                    </div>
                    <Link href={"/admin/products/form"} className={styles.addBtn}>+ Ajout Pizza</Link>
                </div>

                {/* Input Search */}

                <InputSearch
                    productSearch={productSearch}
                    term={term}
                    placeholder={"Rechercher une pizza…"}
                />

                {/* Category */}

                <div className={styles.filters}>
                    <button
                        className={`${categoryId === null ? styles.active : ''}`}
                        onClick={() => onClickCategory(null)}
                    >
                        Tous
                    </button>

                    {categories.map((c: any) => (
                        <button
                            key={c.id}
                            className={`${c.id === categoryId ? styles.active : ''}`}
                            onClick={() => onClickCategory(c.id)}
                        >
                            {c.name}
                        </button>
                    ))}
                </div>

                {/* Pizzas */}

                <div className={styles.grid}>
                    {isLoading ? (
                        <div className={styles['loader-container']}>
                            <span className={styles['loader']}></span>
                        </div>
                    ) : !isLoading && filtered.length > 0 ? (
                        <>
                            {filtered.map((p: any) => (
                                <div key={p.id} className={styles.card}>
                                    <div className={styles.img}>
                                        {p.pictures?.length > 0 && (
                                            <>
                                                <Image
                                                    src={p.pictures[0].url}
                                                    alt={p.name}
                                                    width={100}
                                                    height={100}
                                                />
                                                <label className={styles['publish']}>
                                                    <span>{p.isVisible ? 'En ligne' : 'Brouillon'}</span>
                                                    <input
                                                        type="checkbox"
                                                        checked={p.isVisible}
                                                        onChange={() => togglePublish(p.id)}
                                                    />
                                                    <span className={styles['slider']} />
                                                </label>
                                            </>
                                        )}
                                    </div>
                                    <div className={styles.body}>
                                        <div className={styles.top}>
                                            <span>{p?.category?.name}</span>
                                            <span className={styles.price}>{p.price} €</span>
                                        </div>
                                        <h3>{p.name}</h3>
                                        <p>{p.description}</p>
                                        <div className={styles.actions}>
                                            <Link
                                                href={`/admin/products/form/${p.id}`}
                                                className={styles.edit}
                                            >
                                                Modifier
                                            </Link>
                                            <button
                                                onClick={() => deletePizza(p.id)}
                                                className={styles.delete}
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className={styles.empty}>
                            <p>Aucune pizza dans cette catégorie pour le moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}