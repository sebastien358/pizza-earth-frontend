"use client"

import styles from './LegalNotice.module.scss'

export default function LegalNotice() {
    return (
        <section className={styles['mentions']}>
            <div className={styles['mentions__inner']}>
                <p className={styles['mentions__eyebrow']}>PIZZA EARTH - INFORMATIONS</p>
                <h1 className={styles['mentions__title']}>Mentions légales</h1>
                <p className={styles['mentions__subtitle']}>
                    Toutes les informations légales de notre site, en toute transparence.
                </p>

                <div className={styles['mentions__grid']}>
                    <article className={styles['mentions-card']}>
                        <h2>Éditeur du site</h2>
                        <p>Nom : Sébastien Petit</p>
                        <p>Adresse : 7 Bis Rue Dul Val Ferrant, 27330 Bois-Anzeray</p>
                        <p>Email : sebastien.0027@gmail.com</p>
                        <p>Téléphone : 0780468148</p>
                        <p>Statut : Auto-entrepreneur - SIRET : XXXXXXXXXXXXXX</p>
                    </article>

                    <article className={styles['mentions-card']}>
                        <h2>Hébergeur</h2>
                        <p>Hébergeur : O2Switch</p>
                        <p>Adresse : 222-224 Boulevard Gustave Flaubert, 63000 Clermont-Ferrand</p>
                        <p>Site : pizza-earth.sebastien-petit.fr</p>
                    </article>

                    <article className={styles['mentions-card']}>
                        <h2>Propriété intellectuelle</h2>
                        <p>
                            L'ensemble du contenu de ce site (textes, images, logo) est la propriété de PIZZA EARTH.
                            Toute reproduction est interdite sans autorisation.
                        </p>
                    </article>

                    <article className={styles['mentions-card']}>
                        <h2>Données personnelles / RGPD</h2>
                        <p>
                            Les données collectées via le formulaire et le paiement Stripe servent uniquement au traitement de votre commande.
                            Vous pouvez demander la suppression de vos données par email.
                        </p>
                    </article>

                    <article className={styles['mentions-card']}>
                        <h2>Cookies</h2>
                        <p>
                            Ce site utilise des cookies nécessaires au fonctionnement du panier et du paiement Stripe.
                        </p>
                    </article>

                    <article className={styles['mentions-card']}>
                        <h2>Conditions de vente</h2>
                        <p>
                            Les prix sont affichés en euros, TTC. Le paiement est sécurisé via Stripe.
                            Toute commande validée est ferme et définitive.
                        </p>
                    </article>
                </div>
            </div>
        </section>
    )
}