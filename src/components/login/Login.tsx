"use client"

import styles from './Login.module.scss'
import Link from "next/link";

export default function Login() {
    return (
        <main className={styles['auth']}>
            <aside className={styles['auth__side']}>
                <a href="/" className={styles['logo']}>PIZZA <span>EARTH</span></a>
                <div className={styles['auth__pitch']}>
                    <h1>Content de vous <span>revoir</span> !</h1>
                    <ul>
                        <li>Retrouvez vos pizzas préférées</li>
                        <li>Suivez vos commandes en direct</li>
                        <li>Profitez de vos offres membres</li>
                    </ul>
                </div>
                <p className={styles['auth__note']}>Emballage écologique, ingrédients frais.</p>
            </aside>

            <section className={styles['auth__main']}>
                <div className={styles['card']}>
                    <h2>Connexion</h2>
                    <p className={styles['card__sub']}>Heureux de vous retrouver.</p>

                    <form action="/login" method="post" noValidate>
                        <div className={styles['field']}>
                            <label htmlFor="email">Email</label>
                            <input id="email" name="email" type="email" autoComplete="email"
                                   placeholder="vous@exemple.fr" required/>
                        </div>

                        <div className={styles['field']}>
                            <label htmlFor="password">Mot de passe</label>
                            <input id="password" name="password" type="password" autoComplete="current-password"
                                   required/>
                        </div>

                        <div className={styles['options']}>
                            <label className={styles['check']}>
                                <input type="checkbox" name="remember"/>
                                <span>Se souvenir de moi</span>
                            </label>
                            <a href="/mot-de-passe-oublie">Mot de passe oublié ?</a>
                        </div>

                        <button type="submit" className={`${styles['btn']} ${styles['btn--primary']}`}>Se connecter</button>
                    </form>

                    <p className={styles['card__alt']}>Pas encore de compte ? <Link href="/register">Créer un compte</Link></p>
                </div>
            </section>
        </main>
    )
}