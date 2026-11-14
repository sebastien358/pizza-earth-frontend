"use client"

import styles from './Header.module.scss'

import {LogIn, Pizza, ShoppingCart} from "lucide-react";
import NavLink from "@/components/nav-link/NavLink";
import Link from "next/link";

import Pizza1 from '@/assets/images/pizza_pepperoni_final.png'
import Pizza2 from '@/assets/images/pizza_veggie_final.png'
import Image from "next/image";
import {useAuthStore} from "@/store/auth.store";

export default function Header() {

    const { isAdmin, isUser, token , logout} = useAuthStore()

    return (
        <header className={styles['header']}>
            <div className={styles['header__inner']}>

                <a className={styles['header__brand']} href="#">
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
                </a>

                <nav className={styles['header__nav']}>
                    <NavLink href="/" dropdown>Menu</NavLink>
                    <NavLink href="/pizzas" dropdown>Pizzas</NavLink>
                    <NavLink href="/emplacement" dropdown>Emplacements</NavLink>
                    <Link href="#apropos">À propos</Link>

                    <div className={styles['auth']}>
                        <LogIn className={styles['logo-login']} strokeWidth={3} size={17}/>
                        <nav className={`${styles['auth__menu']}`}>
                            {isAdmin() ? (
                                <>
                                    <Link href="/admin/commands">Commandes</Link>
                                    <Link
                                        onClick={() => logout()}
                                        className={styles['logout']}
                                        href="/login"
                                    >
                                        Se Déconnecter
                                    </Link>
                                </>

                            ) : isUser() ? (
                                <>
                                    <Link href="/#">Commandes</Link>
                                    <Link
                                        onClick={() => logout()}
                                        className={styles['logout']}
                                        href="/login"
                                    >
                                        Se Déconnecter
                                    </Link>
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
                            <span className={styles['shopping-cart__badge']}>2</span>
                        </div>
                        <div className={styles['shopping-cart__menu']}>
                            <ul className={styles['shopping-cart__list']}>
                                <li className={styles['shopping-cart__item']}>
                                    <Image src={Pizza1} alt={"Pepperoni"} height={50} width={50} />
                                    <div className={styles['shopping-cart__item__info']}>
                                        <span className={styles['shopping-cart__item__name']}>Pepperoni</span>
                                        <span className={styles['shopping-cart__item__qty']}>x1</span>
                                    </div>
                                    <span className={styles['shopping-cart__item__price']}>12,90 €</span>
                                </li>
                                <li className={styles['shopping-cart__item__item']}>
                                    <Image src={Pizza2} alt={"Margherita"} height={50} width={50} />
                                    <div className={styles['shopping-cart__item__info']}>
                                        <span className={styles['shopping-cart__item__name']}>Margherita</span>
                                        <span className={styles['shopping-cart__item__qty']}>x2</span>
                                    </div>
                                    <span className={styles['shopping-cart__item__price']}>21,00 €</span>
                                </li>
                            </ul>
                            <div className={styles['shopping-cart__item__total']}>
                                <span>Total</span>
                                <strong>33,90 €</strong>
                            </div>
                            <Link href="/commande" className={styles['shopping-cart__item__cta']}>
                                Payer →
                            </Link>
                        </div>
                    </div>
                </nav>
                <Link className={styles['header__cta']} href="/pizzas">
                    Commander
                </Link>
            </div>
        </header>
    )
}