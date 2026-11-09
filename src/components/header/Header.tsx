"use client"

import styles from './Header.module.scss'
import { Pizza } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

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
                    <Link href="/">Menu</Link>
                    <Link href="#emplacements">Emplacements</Link>
                    <Link href="#apropos">À propos</Link>
                    <Link href="#histoire">Histoire</Link>
                </nav>
                <Link className={styles['header__cta']} href="#commander">
                    Commander
                    <ArrowRight size={16} />
                </Link>
            </div>
        </header>
    )
}