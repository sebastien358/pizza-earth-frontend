"use client"

import styles from './Header.module.scss'

import {LogIn, Menu, Pizza, ShoppingBag, ShoppingCart} from "lucide-react";
import NavLink from "@/components/nav-link/NavLink";
import Link from "next/link";
import Image from "next/image";
import {useAuthStore} from "@/store/auth.store";
import {useCartStore} from "@/store/cart.store";
import {useState} from "react";

export default function Header() {

    {/* Store Auth */}

    const { isAdmin, isUser , logout} = useAuthStore()

    {/* Store Auth */}

    const { cart, totalCart } = useCartStore()

    {/* Gestion des menus : mobile, panier */}

    const [menuMobile, setMenuMobile] = useState<boolean>(false)
    const [menuCart, setMenuCart] = useState<boolean>(false)

    function openMenuCart() {
        setMenuMobile(false)
        setMenuCart(prev => !prev)
    }

    function openMenuMobile() {
        setMenuCart(false)
        setMenuMobile(prev => !prev)
    }

    function disconnected() {
        setMenuMobile(false)
        setMenuCart(false)
        logout()
    }

    return (
        <header className={styles['header']}>
            <section className={styles['header__inner']}>

                <Link className={styles['header__brand']} href="/">
                    <div className={styles['header__logo']} >
                        <Pizza className={styles['img']} size={22} />
                    </div>
                    <div className={styles['header__description']}>
                        <p className={styles['header__description--title']}>
                            <span>PIZZA</span> <span>EARTH</span>
                        </p>
                        <p className={styles['header__description--subtitle']}>
                            Des Pizzas Qui Aiment La Terre.
                        </p>
                    </div>
                </Link>

                <nav className={styles['header__nav']}>
                    <NavLink href="/" dropdown>Menu</NavLink>
                    <NavLink href="/pizzas" dropdown>Pizzas</NavLink>
                    <NavLink href="/emplacement" dropdown>Emplacements</NavLink>
                    {/* <Link href="#apropos">À propos</Link> */}

                    <div className={styles['auth']}>
                        <LogIn className={styles['logo-login']} strokeWidth={3} size={17}/>
                        <nav className={`${styles['auth__menu']}`}>
                            {isAdmin() ? (
                                <>
                                    <Link href="/admin/commands">Commandes</Link>
                                    <Link onClick={() => logout()} className={styles['logout']} href="/login">Se Déconnecter</Link>
                                </>

                            ) : isUser() ? (
                                <>
                                    <Link href="/user/orders">Commandes</Link><Link onClick={() => logout()} className={styles['logout']} href="/login">Se Déconnecter</Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/login">Se connecter</Link>
                                    <Link href="/register">S'inscrire</Link>
                                </>
                            )}
                        </nav>
                    </div>

                    <div className={styles['shopping-cart']}>
                        <div className={styles['shopping-cart__trigger']}>
                            <Link href={"#"}><ShoppingCart size={17} /></Link>
                            <span className={styles['shopping-cart__badge']}>{cart.length}</span>
                        </div>

                        <div className={styles['shopping-cart__menu']}>
                            <ul className={styles['shopping-cart__list']}>
                                {cart.length > 0 ? (
                                    <>
                                        {cart.map((c) =>
                                            <li key={c.id} className={styles['shopping-cart__item']}>
                                                <Image src={c.pictures[0].url} alt={"Images Pizzas"} height={50} width={50} />
                                                <div className={styles['shopping-cart__item__info']}>
                                                    <span className={styles['shopping-cart__item__name']}>{c.name}</span>
                                                    <span className={styles['shopping-cart__item__qty']}>{c.quantity}</span>
                                                </div>
                                                <span className={styles['shopping-cart__item__price']}>12,90 €</span>
                                            </li>
                                        )}
                                    </>
                                ) : (
                                    <div className={styles['shopping-cart__item__empty']}>
                                        <p>Aucune pizza dans le panier.</p>
                                    </div>
                                )}
                            </ul>
                            <div className={styles['shopping-cart__item__total']}>
                                <span>Total</span>
                                <strong>{totalCart()} €</strong>
                            </div>
                            <Link href="/cart" className={styles['shopping-cart__item__cta']}>
                                Voir le panier →
                            </Link>
                        </div>
                    </div>
                </nav>

                <Link className={styles['header__cta']} href="/pizzas">
                    Commander
                </Link>
            </section>
            {/* Menu Mobile */}
            <section className={styles['header-mobile']}>
                <div className={styles['header-mobile__row']}>

                    <button className={styles['header-mobile__cart']} onClick={() => openMenuCart()}>
                        <ShoppingBag size={24} />
                        <span className={styles['header-mobile__cart__badge']}>
                            {cart.length}
                        </span>

                        {menuCart && (
                            <section className={styles['header-mobile__cart__menu']}>
                                <ul className={styles['header-mobile__cart__list']}>
                                    {cart.length > 0 ? (
                                        <>
                                            {cart.map((c) =>
                                                <li key={c.id} className={styles['header-mobile__cart__item']}>
                                                    <Image src={c.pictures[0].url} alt={"Images Pizzas"} height={50} width={50} />
                                                    <div className={styles['header-mobile__cart__item__row']}>

                                                        <div className={styles['header-mobile__cart__item__info']}>
                                                            <span className={styles['header-mobile__cart__item__info__name']}>{c.name}</span>
                                                            <span className={styles['header-mobile__cart__item__info__qty']}>{c.quantity}</span>
                                                        </div>
                                                        <span className={styles['header-mobile__cart__item__info__price']}>12,90 €</span>

                                                    </div>

                                                </li>
                                            )}
                                        </>
                                    ) : (
                                        <div className={styles['header-mobile__cart__item__empty']}>
                                            <p>Aucune pizza dans le panier.</p>
                                        </div>
                                    )}
                                </ul>
                                <div className={styles['header-mobile__cart__item__total']}>
                                    <span>Total</span>
                                    <strong>{totalCart()} €</strong>
                                </div>
                                <Link href="/cart" className={styles['header-mobile__cart__item__cta']}>
                                    Voir le panier →
                                </Link>
                            </section>
                        )}
                    </button>

                    <Link className={styles['header-mobile__cta']} href="/pizzas">
                        Commander
                    </Link>

                    <div className={styles['header-mobile__burger']} onClick={() => openMenuMobile()}>
                        <Menu size={26}  />
                        {menuMobile && (
                            <div className={styles['header-mobile__burger__menu']}>
                                <NavLink href="/" dropdown>Menu</NavLink>
                                <NavLink href="/pizzas" dropdown>Pizzas</NavLink>
                                <NavLink href="/emplacement" dropdown>Emplacements</NavLink>
                                {/* <Link href="#apropos">À propos</Link> */}

                                {isAdmin() ? (
                                    <>
                                        <Link href="/admin/commands">Commandes</Link>
                                        <Link onClick={() => logout()} className={styles['logout']} href="/login">Se Déconnecter</Link>
                                    </>

                                ) : isUser() ? (
                                    <>
                                        <Link href="/user/orders">Commandes</Link>
                                        <Link onClick={() => disconnected()} className={styles['logout']} href="/login">Se Déconnecter</Link>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/login">Se connecter</Link>
                                        <Link href="/register">S'inscrire</Link>
                                    </>
                                )}

                                <Link href="/pizzas" className={styles['header-mobile__burger__menu__cta']}>
                                    Commander
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </header>
    )
}