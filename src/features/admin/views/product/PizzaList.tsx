"use client"

import styles from "./PizzaList.module.scss";

import {useProductAdminStore} from "@/store/admin/productAdmin.store";
import {useEffect, useMemo} from "react";
import {useCategoryStore} from "@/store/category.store";
import Link from "next/link";

export default function ProductList() {

    {/* Store Category */}

    const { categoryList, setCategoryId, categories, categoryId } = useCategoryStore()

    useEffect(() => {
        categoryList()
    }, [categoryList]);

    {/* Store Product */}

    const { productsList, products, isLoading } = useProductAdminStore()

    useEffect(() => {
        productsList()
    }, [productsList]);


    {/* Filtered Product */}

    function onClickCategory(id: number) {
        setCategoryId(id)
    }

    const filtered = useMemo(() => {
        if (categoryId === null) return products;
        return products.filter((p) => p?.category?.id === categoryId);
    }, [products, categoryId]);

    return (
        <div className={styles.layout}>
            <div className={styles.main}>

                <div className={styles.header}>
                    <div>
                        <h1>Les Pizzas</h1>
                        <p>{products.length} pizzas</p>
                    </div>
                    <Link href={"/admin/products/form"} className={styles.addBtn}>+ Ajout Pizza</Link>
                </div>

                <input
                    className={styles.search}
                    placeholder="Rechercher une pizza..."
                />

                <div className={styles.filters}>
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

                <div className={styles.grid}>
                    {isLoading ? (
                        <div className={styles['loader-container']}>
                            <span className={styles['loader']}></span>
                        </div>
                    ) : !isLoading && filtered.length > 0 ? (
                        <>
                            { filtered.map((p: any) => (
                                <div key={p.id} className={styles.card}>
                                    <div className={styles.img}>🍕</div>
                                    <div className={styles.body}>
                                        <div className={styles.top}>
                                            <span>{p.category.name}</span>
                                            <span className={styles.price}>{p.price} €</span>
                                        </div>
                                        <h3>{p.name}</h3>
                                        <p>{p.description}</p>
                                        <div className={styles.actions}>
                                            <button className={styles.edit}>Modifier</button>
                                            <button className={styles.delete}>Supprimer</button>
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
        </div>
    );
}