"use client"

import styles from './Footer.module.scss'

import Link from "next/link";
import { Mail, Phone, MapPin, Leaf, Pizza } from "lucide-react";

export default function Footer() {
    return (
        <footer className={styles['footer']} id="histoire">
            <div className={styles['footer__inner']}>
                <div>
                    <Link className={styles['footer__brand']} href="#">
                        <div className={styles['footer__row']}>
                            <div className={styles['footer__logo']}>
                                <Pizza className={styles['img']} size={22} />
                            </div>
                            <div className={styles['footer__title']}>
                                <p className={styles['footer__title--title']}>
                                    <span>PIZZA</span> <span>EARTH</span>
                                </p>
                            </div>
                        </div>

                        <div className={styles['footer__description']}>
                            <p>Des Pizzas Qui Aiment La Terre.</p>
                            <p>Fraîches, croustillantes, durables.</p>
                        </div>

                        <div className={styles['footer__eco']}>
                            <Leaf className={styles['logo']} size={20} />
                            <p> Emballage 100% écologique </p>
                        </div>
                    </Link>
                </div>
                <div>
                    <h4>Menu</h4>
                    <ul>
                        <li>Pizzas</li>
                        <li>Accompagnements</li>
                        <li>Boissons</li>
                        <li>Offres</li>
                    </ul>
                </div>
                <div className={styles['footer__contact']}>
                    <h4>Contact</h4>
                    <ul>
                        <li>
                            <Mail size={17} />
                            <p>hello@pizzaearth.com</p>
                        </li>
                        <li>
                            <Phone size={16} />
                            <p>+1 (555) 123-4567</p>
                        </li>
                        <li>
                            <MapPin size={15} />
                            <p>123 Green St, Los Angeles, CA</p>
                        </li>
                    </ul>
                </div>
                <div className={styles['footer__newsletter']}>
                    <h4>Newsletter</h4>
                    <p>Abonnez-vous pour les offres &amp; nouveautés</p>
                    <input type="email" placeholder="Entrez votre email"/>
                    <button>S'abonner</button>
                </div>
            </div>
            <p className={styles['footer__bottom']}>
                <span>© 2026 PIZZA EARTH. Tous droits réservés.</span>
                <span>Politique de confidentialité |Conditions d'utilisation</span>
            </p>
        </footer>
    )
}