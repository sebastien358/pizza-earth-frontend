"use client"

import styles from './Pizzas.module.scss'

import Image from "next/image";
import {ArrowRight} from "lucide-react";
import Link from "next/link";
import {useProductStore} from "@/store/product.store";
import {useEffect, useMemo} from "react";
import {useCategoryStore} from "@/store/category.store";
import {useCartStore} from "@/store/cart.store";


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

    {/* Store Cart */}

    const { addToCart } = useCartStore()

    function pizzaInTheCart(id: number) {
        addToCart(id)
    }

    return (
        <div className={styles['page']}>

            <section className={styles['hero']}>
                <div className={styles['hero__container']}>
                    <p className={styles['hero__eyebrow']}>
                        <svg width="12" height="12">
                            <use href="#i-leaf"/>
                        </svg>
                        Savoureuses • Croustillantes • Moelleuses
                    </p>
                    <h1 className={styles['hero__title']}>Nos <span>Pizzas</span></h1>
                    <p className={styles['hero__text']}>
                        Des ingrédients frais et locaux, une pâte croustillante et un emballage qui respecte la planète.
                    </p>
                    <ul className={styles['hero__stats']}>
                        <li><strong>4,9/5</strong><small>500+ avis</small></li>
                        <li><strong>30 min</strong><small>Livraison express</small></li>
                        <li><strong>100%</strong><small>Ingrédients frais</small></li>
                    </ul>
                </div>
            </section>

            <div className={styles['strip']}>Pizza savoureuses • Ingrédients locaux • Pâte croustillante • Emballage écologique</div>

            <section className={styles['pizza']}>

                <div className={styles['pizza__container']}>

                    <div className={styles['pizza__head']}>
                        <div>
                            <p className={styles['section-head__eyebrow']}>Notre carte</p>
                            <h2>Toutes nos pizzas</h2>
                        </div>
                        <p className={styles['section-head__text']}>
                            Une seule taille, 33 cm. Préparées minute et cuites à la perfection.
                        </p>
                    </div>


                    <div className={styles['pizza__filters']} role="group" aria-label="Filtrer les pizzas">
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

                    <div className={styles['pizza-card']}>
                        {isLoading ? (
                            <div className={styles['pizza-wrapper']}>
                                <span className={styles['pizza-wrapper__loader']}></span>
                            </div>
                        ) : filtered.length > 0 ? (
                            <div className={styles['pizza-card__grid']}>
                                {filtered?.map((p: any) =>
                                    <article key={p.id} className={styles['pizza-card__card']} data-cat="classique" onClick={() => pizzaInTheCart(p.id)}>
                                        <div className={styles['pizza-card__media']}>
                                            <div className={styles['pizza-card__image']}>
                                                {p?.pictures?.length > 0 && (
                                                    <Image src={p.pictures?.[0]?.url} alt={p.name} height={400} width={500} quality={100} />
                                                )}
                                            </div>
                                            <div className={styles['pizza-card__info']}>
                                                <span>33 cm</span>
                                            </div>
                                        </div>
                                        <div className={styles['pizza-card__content']}>
                                            <h3>{p.name}</h3>
                                            <p>{p.description}</p>
                                            <div className={styles['separator']}></div>
                                            <div className={styles['pizza-card__foot']}>
                                                <span className={styles['price']}>{p.price} €</span>
                                                <Link href={"#"} className={styles['choose']}>Choisir <ArrowRight size={16} /></Link>
                                            </div>
                                        </div>
                                    </article>
                                )}
                            </div>
                        ) : (
                            <div className={styles['pizza-card__empty']}>
                                <p>Aucune pizza dans cette catégorie pour le moment.</p>
                            </div>
                        )}
                    </div>
                    {hasMore && (
                        <div className={styles['pizza-card__lazyLoad']}>
                            <button type={"button"} className={styles['btn-load']} onClick={() => productLazyLoad()} >Plus de pizzas…</button>
                        </div>
                    )}

                    <section className={styles['cta']}>
                        <div className={styles['cta__desktop']}>
                            <h2>Une petite faim ? La Terre vous dit merci.</h2>
                            <p>Commandez votre pizza préférée, prête en 30 minutes.</p>
                        </div>
                        <div className={styles['cta__mobile']}>
                            <h2>Une petite faim ?</h2>
                            <p>Commandez votre pizza préférée, prête en 30 minutes.</p>
                        </div>
                        <Link href="/cart" className={`${styles['btn']} ${styles['btn--primary']}`}>
                            <span>Voir le panier 👆 </span>
                            <svg width="16" height="16"><use href="#i-arrow"/></svg>
                        </Link>
                    </section>

                </div>
            </section>
        </div>
    )
}