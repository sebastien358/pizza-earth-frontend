"use client"

import styles from './Pizzas.module.scss'
import Image from "next/image";
import Pepperoni from "@/assets/images/pizza_pepperoni_final.png"
import Veggie from "@/assets/images/pizza_veggie_final.png"
import Margherita from "@/assets/images/pizza_margherita_final.png"
import Truffe from "@/assets/images/pizza_truffe_final.png"
import Classique from "@/assets/images/jardin-vegetarien.jpg"
import {ArrowRight} from "lucide-react";
import Link from "next/link";

export default function Pizzas() {
    return (
        <main>
            <section className={styles['hero']}>
                <div className={styles['container']}>
                    <p className={styles['eyebrow']}>
                        <svg width="12" height="12">
                            <use href="#i-leaf"/>
                        </svg>
                        Fraîches · Croustillantes · Durables
                    </p>
                    <h1>Nos <span>Pizzas</span></h1>
                    <p className={styles['hero__text']}>Des ingrédients frais et locaux, une pâte croustillante et un emballage
                        qui respecte la planète.</p>
                    <ul className={styles['stats']}>
                        <li><strong>4,9/5</strong><small>500+ avis</small></li>
                        <li><strong>30 min</strong><small>Livraison express</small></li>
                        <li><strong>100%</strong><small>Ingrédients frais</small></li>
                    </ul>
                </div>
            </section>
            <div className={styles['strip']}>Pizza fraîche • Ingrédients locaux • Pâte croustillante • Emballage écologique</div>

            <section className={styles['catalog']}>
                <div className={styles['container']}>

                    <header className={styles['section-head']}>
                        <div>
                            <p className={styles['section-head__eyebrow']}>Notre carte</p>
                            <h2>Toutes nos pizzas</h2>
                        </div>
                        <p className={styles['section-head__text']}>Une seule taille, 33 cm. Préparées minute et cuites à la
                            perfection.</p>
                    </header>

                    <div className={styles['filters']} role="group" aria-label="Filtrer les pizzas">
                        <button className={`${styles['chip']} ${styles['is-active']}`} data-filter="all">Toutes</button>
                        <button className={styles['chip']} data-filter="classique">Classiques</button>
                        <button className={styles['chip']} data-filter="vegetarienne">Végétariennes</button>
                        <button className={styles['chip']} data-filter="gourmande">Gourmandes</button>
                        <button className={styles['chip']} data-filter="piquante">Piquantes</button>
                    </div>

                    <ul className={styles['grid']} id="grid">

                        <li className={styles['card']} data-cat="classique">
                            <div className={styles['card__media']}>
                                <Image src={Classique} alt={"Pizza Margherita"} height={400} width={500} quality={100} />
                                <div className={styles['info']}>
                                    <span>33 cm</span>
                                </div>
                            </div>
                            <div className={styles['card__body']}>
                                <h3>Pepperoni</h3>
                                <p>Pepperoni croustillant &amp; mozzarella généreuse.</p>
                                <div className={styles['separator']}></div>
                                <div className={styles['card__foot']}>
                                    <span className={styles['price']}>12,90 €</span>
                                    <Link href={"#"} className={styles['choose']}>Choisir <ArrowRight size={16} /></Link>
                                </div>
                            </div>
                        </li>

                        <li className={styles['card']} data-cat="piquante">
                            <div className={styles['card__media']}>
                                <Image src={Pepperoni} alt={"Pizza Pepperoni"} height={300} width={400} quality={100} />
                                <div className={styles['info']}>
                                    <span>33 cm</span>
                                </div>
                            </div>
                            <div className={styles['card__body']}>
                                <h3>Margherita</h3>
                                <p>Tomate, mozzarella fondante &amp; basilic frais.</p>
                                <div className={styles['separator']}></div>
                                <div className={styles['card__foot']}>
                                    <span className={styles['price']}>14,90 €</span>
                                    <Link href={"#"} className={styles['choose']}>Choisir <ArrowRight size={16} /></Link>
                                </div>
                            </div>
                        </li>

                        <li className={styles['card']} data-cat="vegetarienne">
                            <div className={styles['card__media']}>
                                <Image src={Veggie} alt={"Pizza Jardin Végétarien"} height={300} width={400} quality={100} />
                                <div className={styles['info']}>
                                    <span>33 cm</span>
                                </div>
                            </div>
                            <div className={styles['card__body']}>
                                <h3>Jardin Végétarien</h3>
                                <p>Légumes du marché, couleurs &amp; croquant.</p>
                                <div className={styles['separator']}></div>
                                <div className={styles['card__foot']}>
                                    <span className={styles['price']}>13,90 €</span>
                                    <Link href={"#"} className={styles['choose']}>Choisir <ArrowRight size={16} /></Link>
                                  </div>
                            </div>
                        </li>

                        <li className={styles['card']} data-cat="gourmande">
                            <div className={styles['card__media']}>
                                <Image src={Truffe} alt={"Pizza Champignon Truffe"} height={300} width={400} quality={100} />
                                <div className={styles['info']}>
                                    <span>33 cm</span>
                                </div>
                            </div>
                            <div className={styles['card__body']}>
                                <h3>Champignon Truffe</h3>
                                <p>Champignons dorés &amp; parfum délicat de truffe.</p>
                                <div className={styles['separator']}></div>
                                <div className={styles['card__foot']}>
                                    <span className={styles['price']}>16,90 €</span>
                                    <Link href={"#"} className={styles['choose']}>Choisir <ArrowRight size={16} /></Link>
                                </div>
                            </div>
                        </li>

                        <li className={styles['card']} data-cat="classique">
                            <div className={styles['card__media']}>
                                <Image src={Margherita} alt={"Pizza Margherita"} height={300} width={400} quality={100} />
                                <div className={styles['info']}>
                                    <span>33 cm</span>
                                </div>
                            </div>
                            <div className={styles['card__body']}>
                                <h3>Pepperoni</h3>
                                <p>Pepperoni croustillant &amp; mozzarella généreuse.</p>
                                <div className={styles['separator']}></div>
                                <div className={styles['card__foot']}>
                                    <span className={styles['price']}>12,90 €</span>
                                    <Link href={"#"} className={styles['choose']}>Choisir <ArrowRight size={16} /></Link>
                                </div>
                            </div>
                        </li>

                        <li className={styles['card']} data-cat="piquante">
                            <div className={styles['card__media']}>
                                <Image src={Pepperoni} alt={"Pizza Pepperoni"} height={300} width={400} quality={100} />
                                <div className={styles['info']}>
                                    <span>33 cm</span>
                                </div>
                            </div>
                            <div className={styles['card__body']}>
                                <h3>Margherita</h3>
                                <p>Tomate, mozzarella fondante &amp; basilic frais.</p>
                                <div className={styles['separator']}></div>
                                <div className={styles['card__foot']}>
                                    <span className={styles['price']}>14,90 €</span>
                                    <Link href={"#"} className={styles['choose']}>Choisir <ArrowRight size={16} /></Link>
                                </div>
                            </div>
                        </li>
                        <li className={styles['card']} data-cat="vegetarienne">
                            <div className={styles['card__media']}>
                                <Image src={Veggie} alt={"Pizza Jardin Végétarien"} height={300} width={400} quality={100} />
                                <div className={styles['info']}>
                                    <span>33 cm</span>
                                </div>
                            </div>
                            <div className={styles['card__body']}>
                                <h3>Jardin Végétarien</h3>
                                <p>Légumes du marché, couleurs &amp; croquant.</p>
                                <div className={styles['separator']}></div>
                                <div className={styles['card__foot']}>
                                    <span className={styles['price']}>13,90 €</span>
                                    <Link href={"#"} className={styles['choose']}>Choisir <ArrowRight size={16} /></Link>
                                </div>
                            </div>
                        </li>
                        <li className={styles['card']} data-cat="gourmande">
                            <div className={styles['card__media']}>
                                <Image src={Truffe} alt={"Pizza Champignon Truffe"} height={300} width={400} quality={100} />
                                <div className={styles['info']}>
                                    <span>33 cm</span>
                                </div>
                            </div>
                            <div className={styles['card__body']}>
                                <h3>Champignon Truffe</h3>
                                <p>Champignons dorés &amp; parfum délicat de truffe.</p>
                                <div className={styles['separator']}></div>
                                <div className={styles['card__foot']}>
                                    <span className={styles['price']}>16,90 €</span>
                                    <Link href={"#"} className={styles['choose']}>Choisir <ArrowRight size={16} /></Link>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <p className={styles['empty']} id="empty" hidden>Aucune pizza dans cette catégorie pour le moment.</p>

                    <div className={styles['lazy-load']}>
                        <button className={styles['btn-load']}>Plus de pizzas…</button>
                    </div>

                    <aside className={styles['cta']}>
                        <div>
                            <h2>Une petite faim ? La Terre vous dit merci.</h2>
                            <p>Commandez votre pizza préférée, prête en 30 minutes.</p>
                        </div>
                        <a href="/commander" className={`${styles['btn']} ${styles['btn--primary']}`}>Choisis d'abord une pizza en haut 👆 <svg width="16" height="16">
                            <use href="#i-arrow"/>
                        </svg></a>
                    </aside>
                </div>
            </section>
        </main>
    )
}