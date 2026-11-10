"use client"

import styles from './Header.module.scss'
import {LogIn, Pizza, ShoppingCart} from "lucide-react";
import Link from "next/link";
import NavLink from "@/components/nav-link/NavLink";

export default function Header() {

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
                    <Link href="#pizzas">Pizzas</Link>
                    <NavLink href="/emplacement" dropdown>Emplacements</NavLink>
                    <Link href="#apropos">À propos</Link>


                    <div className={styles['auth']}>
                        <LogIn className={styles['logo-login']} strokeWidth={3} size={17}/>
                        <nav className={`${styles['auth__menu']}`}>
                            <Link href="/login">Se connecter</Link>
                            <Link href="/register">S'inscrire</Link>
                        </nav>
                    </div>

                    <div className={styles['shopping-cart']}>
                        <a href="/panier" className="cart__trigger">
                            <Link href={"#"}><ShoppingCart size={17}/></Link>
                            <span className="cart__badge">2</span>
                        </a>

                        <div className={styles['shopping-cart__menu']}>
                            <ul className={styles['shopping-cart__list']}>
                                <li className={styles['shopping-cart__item']}>
                                    <img src="/pepperoni.jpg" alt="Pepperoni"/>
                                    <div className={styles['shopping-cart__item__info']}>
                                        <span className={styles['shopping-cart__item__name']}>Pepperoni</span>
                                        <span className={styles['shopping-cart__item__qty']}>x1</span>
                                    </div>
                                    <span className={styles['shopping-cart__item__price']}>12,90 €</span>
                                </li>

                                <li className={styles['shopping-cart__item__item']}>
                                    <img src="/margherita.jpg" alt="Margherita"/>
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

                            <a href="/commande" className={styles['shopping-cart__item__cta']}>Commander →</a>
                        </div>
                    </div>


                </nav>
                <Link className={styles['header__cta']} href="#commander">
                    Commander
                </Link>
            </div>
        </header>
    )
}