"use client"

import styles from './Pizzas.module.scss'

import Image from "next/image";
import {ArrowRight} from "lucide-react";
import Link from "next/link";
import {useProductStore} from "@/store/product.store";
import {useEffect, useMemo} from "react";
import {useCategoryStore} from "@/store/category.store";

export default function Pizzas() {

    {/* Store Category */}

    const { categoryList, categories, setCategoryId, categoryId } = useCategoryStore()

    useEffect(() => {
        categoryList()
    }, [categoryList]);

    {/* Store Product */}

    const { productList, productLazyLoad, products, isLoading, hasMore } = useProductStore()

    useEffect(() => {
        productList()
    }, [productList]);

    {/* Filtered Products */}

    function onClickCategoryId(id: number | null) {
        setCategoryId(id)
    }

    const filtered = useMemo(() => {
        if (categoryId === null) return products;
        return products.filter((p) => p.category.id === categoryId)
    }, [products, categoryId])

    return (
        <main>
            <section className={styles['hero']}>
                <div className={styles['container']}>
                    <p className={styles['eyebrow']}>
                        <svg width="12" height="12">
                            <use href="#i-leaf"/>
                        </svg>
                        Fraîches · Croustillantes · Durables
                    </p>
                    <h1>Nos <span>Pizzas</span></h1>
                    <p className={styles['hero__text']}>Des ingrédients frais et locaux, une pâte croustillante et un emballage
                        qui respecte la planète.</p>
                    <ul className={styles['stats']}>
                        <li><strong>4,9/5</strong><small>500+ avis</small></li>
                        <li><strong>30 min</strong><small>Livraison express</small></li>
                        <li><strong>100%</strong><small>Ingrédients frais</small></li>
                    </ul>
                </div>
            </section>
            <div className={styles['strip']}>Pizza fraîche • Ingrédients locaux • Pâte croustillante • Emballage écologique</div>

            <section className={styles['catalog']}>
                <div className={styles['container']}>
                    <header className={styles['section-head']}>
                        <div>
                            <p className={styles['section-head__eyebrow']}>Notre carte</p>
                            <h2>Toutes nos pizzas</h2>
                        </div>
                        <p className={styles['section-head__text']}>Une seule taille, 33 cm. Préparées minute et cuites à la
                            perfection.</p>
                    </header>
                    <div className={styles['filters']} role="group" aria-label="Filtrer les pizzas">
                        <button
                            onClick={() => onClickCategoryId(null)}
                            className={`${styles['chip']} ${categoryId === null ? styles['is-active'] : ''}`}
                        >
                           Tous
                        </button>
                        {categories.map((c: any) =>
                            <button
                                key={c.id}
                                onClick={() => onClickCategoryId(c.id)}
                                 className={`${styles['chip']} ${c.id === categoryId ? styles['is-active'] : ''}`}
                            >
                                {c.name}
                            </button>
                        )}
                    </div>

                    <ul className={styles['grid']} id="grid">
                        {isLoading ? (
                            <div className={styles['loader-container']}>
                                <span className={styles['loader']}></span>
                            </div>
                        ) : !isLoading && filtered.length > 0 ? (
                            <>
                                {filtered?.map((p: any) =>
                                    <li key={p.id} className={styles['card']} data-cat="classique">
                                        <div className={styles['card__media']}>
                                            {p?.pictures?.length > 0 && (
                                                <Image src={p.pictures?.[0]?.url} alt={p.name} height={400} width={500} quality={100} />
                                            )}
                                            <div className={styles['info']}>
                                                <span>33 cm</span>
                                            </div>
                                        </div>
                                        <div className={styles['card__body']}>
                                            <h3>{p.name}</h3>
                                            <p>{p.description}</p>
                                            <div className={styles['separator']}></div>
                                            <div className={styles['card__foot']}>
                                                <span className={styles['price']}>{p.price} €</span>
                                                <Link href={"#"} className={styles['choose']}>Choisir <ArrowRight size={16} /></Link>
                                            </div>
                                        </div>
                                    </li>
                                )}
                            </>
                        ) : (
                            <div className={styles.empty}>
                                <p>Aucune pizza dans cette catégorie pour le moment.</p>
                            </div>
                        )}
                    </ul>
                    {filtered.length > 0 && hasMore && (
                        <div onClick={() => productLazyLoad()} className={styles['lazy-load']}>
                            <button className={styles['btn-load']}>Plus de pizzas…</button>
                        </div>
                    )}
                    <aside className={styles['cta']}>
                        <div>
                            <h2>Une petite faim ? La Terre vous dit merci.</h2>
                            <p>Commandez votre pizza préférée, prête en 30 minutes.</p>
                        </div>
                        <a href="/commander" className={`${styles['btn']} ${styles['btn--primary']}`}>Choisis d'abord une pizza en haut 👆 <svg width="16" height="16">
                            <use href="#i-arrow"/>
                        </svg></a>
                    </aside>
                </div>
            </section>
        </main>
    )
}