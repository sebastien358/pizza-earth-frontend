"use client"

import style from './Emplacement.module.scss'
import {ShoppingBag} from "lucide-react";

export default function Emplacement() {

    return (
        <main className={style['page']}>
            <section className={style['page-hero']}>
                <div className={style['container']}>
                    <h1>Venez nous voir</h1>
                    <p>Une seule adresse, des pizzas faites minute. Sur place, à emporter ou livrées.</p>
                </div>
            </section>

            <section className={style['location']}>
                <div className={`${style['container']} ${style['location__grid']}`}>

                    <article className={`${style['location__card']} ${style['info']}`}>
                        <h2>PIZZA EARTH</h2>

                        <div className={style['info__block']}>
                            <h3>Adresse</h3>
                            <address>123 Green St<br/>Los Angeles, CA</address>
                            <a className={style['link']} href="https://maps.google.com/?q=123+Green+St+Los+Angeles"
                               target="_blank" rel="noopener">Obtenir l’itinéraire</a>
                        </div>

                        <div className={style['info__block']}>
                            <h3>Contact</h3>
                            <p><a href="tel:+15551234567">+1 (555) 123-4567</a></p>
                            <p><a href="mailto:hello@pizzaearth.com">hello@pizzaearth.com</a></p>
                        </div>

                        <div className={style['info__block']}>
                            <h3>Horaires</h3>
                            <table className={style['hours']}>
                                <tr>
                                    <th>Lundi – Jeudi</th>
                                    <td>11h30 – 22h00</td>
                                </tr>
                                <tr>
                                    <th>Vendredi – Samedi</th>
                                    <td>11h30 – 23h00</td>
                                </tr>
                                <tr>
                                    <th>Dimanche</th>
                                    <td>12h00 – 21h30</td>
                                </tr>
                            </table>
                        </div>

                        <ul className={style['tags']}>
                            <li>Sur place</li>
                            <li>À emporter</li>
                            <li>Livraison</li>
                        </ul>
                    </article>

                    <div className={style['map']}>
                        <iframe
                            title="Plan d’accès PIZZA EARTH"
                            src="https://www.google.com/maps?q=123+Green+St+Los+Angeles&output=embed"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>

                </div>
            </section>

            <section className={style['cta']}>
                <div className={style['container']}>
                    <div className={style['cta__box']}>
                        <div>
                            <h2>Pas envie de bouger ?</h2>
                            <p>On vous livre, chaud et bien emballé.</p>
                        </div>
                        <button className={style['cta__button']}>
                            <span>Commander maintenant</span>
                            <ShoppingBag size={18} />
                        </button>
                    </div>
                </div>
            </section>
        </main>
    )
}