"use client"

import styles from './Register.module.scss'
import Link from "next/link";

export default function Register() {
    return (
        <main className={styles['register']}>

            <aside className={styles['register__side']}>
                <a href="/" className={styles['logo']}>PIZZA <span>EARTH</span></a>
                <div className={styles['register__pitch']}>
                    <h1>Rejoignez <span>la Terre</span> des gourmands !</h1>
                    <ul>
                        <li>Commandez en 2 clics</li>
                        <li>Suivez votre pizza en direct</li>
                        <li>Offres réservées aux membres</li>
                    </ul>
                </div>
                <p className={styles['register__note']}>Emballage écologique, ingrédients frais.</p>
            </aside>

            <section className={styles['register__main']}>
                <div className={styles['card']}>
                    <h2>Créer un compte</h2>
                    <p className={styles['card__sub']}>Ça prend moins d’une minute.</p>

                    <form action="/register" method="post" noValidate>
                        <div className={styles['row']}>
                            <div className={styles['field']}>
                                <label htmlFor="firstname">Prénom</label>
                                <input id="firstname" name="firstname" type="text" autoComplete="given-name" required/>
                            </div>
                            <div className={styles['field']}>
                                <label htmlFor="lastname">Nom</label>
                                <input id="lastname" name="lastname" type="text" autoComplete="family-name" required/>
                            </div>
                        </div>

                        <div className={styles['field']}>
                            <label htmlFor="email">Email</label>
                            <input id="email" name="email" type="email" autoComplete="email"
                                   placeholder="vous@exemple.fr" required/>
                        </div>

                        <div className={styles['field']}>
                            <label htmlFor="phone">Téléphone <small>(facultatif)</small></label>
                            <input id="phone" name="phone" type="tel" autoComplete="tel"/>
                        </div>

                        <div className={styles['field']}>
                            <label htmlFor="password">Mot de passe</label>
                            <input id="password" name="password" type="password" autoComplete="new-password" minLength="8" aria-describedby="pwd-help" required/>
                            <small id="pwd-help">8 caractères minimum.</small>
                        </div>

                        <div className={styles['field']}>
                            <label htmlFor="confirm">Confirmer le mot de passe</label>
                            <input id="confirm" name="confirm" type="password" autoComplete="new-password" required/>
                        </div>

                        <label className={styles['check']}>
                            <input type="checkbox" name="terms" required/>
                            <span>J’accepte les <a href="/conditions">conditions d’utilisation</a> et la <a
                                href="/confidentialite">politique de confidentialité</a>.</span>
                        </label>

                        <button type="submit" className={`${styles['btn']} ${styles['btn--primary']}`}>Créer mon compte</button>
                    </form>

                    <p className={styles['card__alt']}>Déjà un compte ? <Link href="/login">Se connecter</Link></p>
                </div>
            </section>

        </main>
    )
}