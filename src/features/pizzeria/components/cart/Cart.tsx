"use client"

import styles from './Cart.module.scss'

import Image from "next/image";
import {Trash2} from "lucide-react";
import {useRouter} from "next/navigation";
import {useAuthStore} from "@/store/auth.store";
import {useCartStore} from "@/store/cart.store";

export default function Cart() {

    {/* Store Cart */}

    const { addItemToCart, removeItemToCart, removeToCart, cart, totalCart } = useCartStore()

    function decrease(id: number) {
        removeItemToCart(id)
    }

    function increase(id: number) {
        addItemToCart(id)
    }

    function remove(id: number) {
      removeToCart(id)
    }

    {/* Total Cart */}

    function total() {
        return totalCart().toFixed(2)
    }

    {/* Store Auth And Redirect Payment Connected */}

    const { isUser } = useAuthStore()

    const router = useRouter()

    function redirectPayment() {
        if (cart.length && isUser()) {
            router.push('/user/payment')
            return
        }
        router.push('/login')
    }

    return (
        <main className={styles['cart']}>
            <div className={styles['container']}>
                <p className={styles['cart__badge']}>🔥 ENCORE CHAUD, PRESQUE À TOI</p>
                <h1 className={styles['cart__title']}>Ton Panier</h1>
                <p className={styles['cart__subtitle']}>3 articles • Prêt à être dévoré ?</p>

                <div className={styles['cart__layout']}>
                    <div className={styles['cart__list']}>
                        {cart.length > 0 ? (
                            <>
                                {cart.map((p) => (
                                    <article key={p.id} className={styles['cart__item']}>
                                        {p.pictures.length > 0 && (
                                            <Image src={p.pictures?.[0]?.url} alt={p.name} className={styles['cart__img']} width={100} height={100} />
                                        )}
                                        <div className={styles['cart__info']}>

                                            <div className={styles['cart__info__content']}>
                                                <h3>{p.name}</h3>
                                                <span>{p.description}</span>
                                                <div className={styles['cart__info__content__meta']}>
                                                    <span>Prix inutaire</span>
                                                    <span className={styles['price']}> {p.price}€</span>
                                                </div>
                                            </div>

                                            <div className={styles['cart__qty']}>
                                                <button onClick={() => decrease(p.id)}>-</button>
                                                <span>{p.quantity}</span>
                                                <button onClick={() => increase(p.id)}>+</button>
                                            </div>
                                        </div>

                                        <div className={styles['cart__right']}>
                                            <div>
                                                <button onClick={() => remove(p.id)} className={styles['cart__delete']}>
                                                    <Trash2 size={19} />
                                                </button>
                                            </div>

                                            <div className={styles['cart__right__price']}>
                                                <p>TOTAL LIGNE</p>
                                                <p>{p.price}€</p>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </>
                        ) : (
                            <div className={styles['empty']}>
                                <p>Aucune pizza dans le panier pour le moment.</p>
                            </div>
                        )}
                    </div>

                    {cart.length > 0 && (
                        <div className={styles['cart__recap']}>
                            <h2>Récapitulatif</h2>
                            <div className={styles['cart__line']}><span>Sous-total</span><span>{total()}</span></div>
                            <div className={styles['cart__line']}><span>Livraison</span><span>À la commande</span></div>
                            <div className={styles['cart__total']}><span>Total</span><span>{total()}€</span></div>
                            <button className={styles['cart__pay']} onClick={() => redirectPayment()}>Payer →</button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}