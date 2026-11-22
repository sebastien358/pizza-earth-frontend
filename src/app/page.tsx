"use client"

import styles from "./page.module.scss";
import Image from "next/image";

import PizzaHome from '@/assets/images/pizza_hero_logo.png'
import Link from "next/link";
import {UtensilsCrossed, Truck, ShoppingBag, Leaf, Check, ArrowRight, MapPin, Package} from 'lucide-react';

import Boisson from '@/assets/images/verre_paille_glacons.png'
import Pizzas from '@/assets/images/deux_petites_pizzas_maquette.png'
import Pizza from '@/assets/images/pizza_hero_logo.png'
import {useProductStore} from "@/store/product.store";
import {useEffect} from "react";
import {useCartStore} from "@/store/cart.store";

export default function Home() {

    {/* Store Product : affichage des pizzas */}

    const { productHomeList, productsHome, isLoading } = useProductStore()

    useEffect(() => {
        productHomeList()
    }, [productHomeList]);

    {/* Store Cart: ajout product au panier */}

    const { addToCart } = useCartStore()

    function addProductToCart(id: number) {
        addToCart(id)
    }

  return (
      <main>
          {/* Hero */}
          <section className={styles['hero']}>
              <div className={styles['hero__inner']}>
                  <div className={styles['']}>
                      <div className={styles['hero__badge']}>🍃 Savoureuses • Croustillantes • Moelleuses</div>
                      <h1 className={styles['hero__title']}>Des Pizzas Qui Aiment <span
                          className={styles['hero__title--earth']}>La Terre !</span></h1>
                      <p className={styles['hero__subtitle']}>Croustillantes, Savoureuses, Délicieuses !</p>
                      <p className={styles['hero__description']}>Des ingrédients frais et locaux, une pâte croustillante
                          et un emballage qui respecte la planète.</p>
                      <div className={styles['hero__buttons']}>
                          <Link className={styles['hero__btn--explored']} href="/pizzas">Explorer →</Link>
                          <Link className={styles['hero__btn--history']} href="#men">Notre histoire</Link>
                      </div>
                      <div className={styles['hero__infos']}>
                          <div>
                              <p className={styles['hero__infos--title']}>4,9/5</p>
                              <p className={styles['hero__infos--subtitle']}>500+ avis</p>
                          </div>
                          <div>
                              <p className={styles['hero__infos--title']}>30 min</p>
                              <p className={styles['hero__infos--subtitle']}>Livraison express</p>
                          </div>
                          <div>
                              <p className={styles['hero__infos--title']}>100%</p>
                              <p className={styles['hero__infos--subtitle']}>Ingrédients frais</p>
                          </div>
                      </div>
                  </div>
                  <div className={styles['hero__image']}>
                      <span className={styles['hero__image--yum']}>YUM!</span>
                      <Image className={styles['hero__image--img']} src={PizzaHome} alt={"dd"} width={800} height={800} priority quality={100} />
                      <div className={styles['hero__eco']}>
                      <span className={styles['hero__eco--icon']}>
                          <Package size={23} />
                      </span>
                          <div>
                              <p className={styles['hero__eco--title']}>Emballage écologique</p>
                              <p className={styles['hero__eco--text']}>Bon pour vous, bon pour la Terre</p>
                          </div>
                      </div>
                  </div>
              </div>
              <div className={styles['hero__ticker']}>
                  PIZZA SAVOUREUSE • INGRÉDIENTS LOCAUX • PÂTE CROUSTILLANTE • EMBALLAGE ÉCOLOGIQUE
              </div>
          </section>
          {/* Popular */}
          <section className={styles['popular']}>
              <div className={styles['popular__inner']}>
                  <p className={styles['popular__eyebrow']}>NOS BEST-SELLERS</p>
                  <div className={styles['popular__left']}>
                      <h2 className={styles['popular__title']}>Articles Populaires</h2>
                      <p className={styles['popular__subtitle']}>Les préférées de nos clients, préparées minute et cuites à la perfection.</p>
                  </div>
                  <div className={styles['popular__row']}>
                      <div className={styles['popular__grid']}>
                          {isLoading ?  (
                              <div className={styles['loader-wrapper']}>
                                  <span className={styles['loader-wrapper__loader']}></span>
                              </div>
                          ) : !isLoading && productsHome.length > 0 ? (
                              <>
                                  {productsHome?.map((p: any) =>
                                      <article key={p.id} className={styles['popular__card']}>
                                          <div className={styles['popular__card__image']}>
                                              <Image src={p?.pictures[0]?.url} alt="Margherita" width={400} height={400} priority quality={100} />
                                          </div>
                                          <div className={styles['popular__card__description']}>
                                              <h3 className={styles['popular__card__description--title']}>{p.name}</h3>
                                              <p className={styles['popular__card__description--subtitle']}>{p.description}</p>

                                              <div className={styles['popular__card__description__choice']}>
                                                  <p>{p.price}€</p>
                                                  <Link className={styles['popular__card__description__choice--choose']} href={"#"} onClick={() => addProductToCart(p.id)}>
                                                      <span>Choisir</span>
                                                      <span><ArrowRight size={16} /></span>
                                                  </Link>
                                              </div>
                                          </div>
                                      </article>
                                  )}
                              </>
                          ) : (
                              <div className={styles['popular-empty']}>
                                  <p>Aucune pizza dans cette catégorie pour le moment.</p>
                              </div>
                          )}
                      </div>
                      {/* Popular Limited */}
                      <div className={styles['popular-limited']}>
                          <div>
                              <p className={styles['popular-limited__eyebrow']}>OFFRE LIMITÉE</p>
                              <div className={styles['popular-limited__title']}>
                                  <span>Jusqu’à</span><br />
                                  <span>-10%</span>
                              </div>
                              <p className={styles['popular-limited__subtitle']}>
                                  Offre limitée sur toutes les pizzas. Commandez maintenant et économisez gros sur vos favoris !
                              </p>
                              <button className={styles['popular-limited__button']}>
                                  <Link href={"/pizzas"}>Commander</Link>
                                  <span><ArrowRight size={16} /></span>
                              </button>
                          </div>
                          <div className={styles['popular-limited__address']}>
                              <div className={styles['popular-limited__images']}>
                                  <Image src={Boisson} alt={"zz"} height={100} width={100} priority quality={100} />
                                  <Image src={Pizzas} alt={"ss"} height={100} width={100} priority quality={100} />
                              </div>
                              <div className={styles['popular-limited__limited']}>
                                  <MapPin size={14} />
                                  <span> 12 Rue des Lilas, 27250, Rugles, Eure • À emporter & livraison</span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          {/* About */}
          <section className={styles['about']}>
              <div className={styles['about__inner']}>
                  <div className={styles['about__image']}>
                      <Image className={styles['img']} src={Pizza} alt={""} height={600} width={600} priority quality={100} />
                      <div className={styles['about__infos']}>
                          <span>Depuis 2024</span>
                          <span>Passion & planète</span>
                      </div>
                  </div>
                  <div className={styles['about__content']}>
                      <p className={styles['about__eyebrow']}>QUI SOMMES-NOUS</p>
                      <h2 className={styles['about__title']}>Fait avec passion pour la planète et vos papilles</h2>
                      <p className={styles['about__subtitle']}>
                          Chez <span>PIZZA EARTH</span>, nous croyons qu’une bonne pizza doit être savoureuse, durable et préparée avec amour. Nous sélectionnons des ingrédients frais et locaux, utilisons un emballage écologique et cuisons chaque pizza à la perfection pour une pizza croustillante - en prenant soin de la planète et de vos papilles.
                      </p>
                      <div className={styles['about__row']}>
                          <div className={styles['about__logo']}>
                              <Leaf className={styles['logo-eco']} size={22}/>
                              <span> Emballage écologique</span>
                          </div>
                          <div className={styles['about__logo']}>
                              <Package className={styles['logo-fresh']} size={22} />
                              <span>100% Ingrédients frais</span>
                          </div>
                      </div>
                      <button className={styles['about__button']}>
                          <span>Découvrir Notre Histoire</span>
                          <Check size={13} strokeWidth={3} />
                      </button>
                  </div>
              </div>
          </section>
          {/* How */}
          <section className={styles['how']}>
              <div className={styles['how__inner']}>
                  <p className={styles['how__eyebrow']}>Simple & rapide</p>
                  <h2 className={styles['how__title']}>Comment Ça Marche</h2>
                  <p className={styles['how__subtitle']}>3 étapes simples pour déguster votre pizza en un rien de temps</p>
                  <div className={styles['how__grid']}>
                      <article className={styles['how-card']}>
                          <div className={styles['how-card__number']}>01</div>
                          <div className={styles['how-card__logo']}>
                              <UtensilsCrossed className={styles['logo']} size={26} strokeWidth={2} />
                          </div>
                          <h3 className={styles['how-card__title']}>Choisissez Vos Pizzas</h3>
                          <p className={styles['how-card__text']}>Parcourez notre menu et choisissez vos pizzas préférées avec des garnitures personnalisées.</p>
                      </article>
                      <article className={styles['how-card']}>
                          <div className={styles['how-card__number']}>02</div>
                          <div className={styles['how-card__logo']}>
                              <Truck size={26} className={styles['logo']} strokeWidth={2} />
                          </div>
                          <h3 className={styles['how-card__title']}>Suivez Votre Commande</h3>
                          <p className={styles['how-card__text']}>Suivez votre commande en direct, de la cuisine jusqu’à votre porte en temps réel.</p>
                      </article>
                      <article className={styles['how-card']}>
                          <div className={styles['how-card__number']}>03</div>
                          <div className={styles['how-card__logo']}>
                              <ShoppingBag size={26} className={styles['logo']} strokeWidth={2} />
                          </div>
                          <h3 className={styles['how-card__title']}>Récupérez Votre Commande</h3>
                          <p className={styles['how-card__text']}>Récupérez votre pizza chaude, livrée ou à emporter, prête à déguster.</p>
                      </article>
                  </div>
              </div>
          </section>
          {/* Reviews */}
          <div className={styles['reviews']}>
              <section className={styles['reviews__inner']}>
                  <p className={styles['reviews__eyebrow']}>Témoignages</p>
                  <h2 className={styles['reviews__title']}>CE QUE DISENT NOS CLIENTS</h2>
                  <p className={styles['reviews__subtitle']}>Adoré par les amateurs de pizza partout</p>
                  <div className={styles['reviews__grid']}>
                      <article className={styles['review-card']}>
                          <p className={styles['review-card__stars']}>★★★★</p>
                          <p className={styles['review-card__text']}>"La Reine est incroyable, pâte fine, fromage généreux. Livraison en 25 minutes à Rugles, encore chaude. Je recommande !"</p>
                          <div className={styles['review-card__author']}>
                              <div className={styles['review-card__avatar']}>S</div>
                              <div className={styles['review-card__author__name']}>
                                  <small>Sophie L. - Reine.</small>
                                  <small><Check size={13} strokeWidth={3} /> Client vérifié</small>
                              </div>
                          </div>
                      </article>
                      <article className={styles['review-card']}>
                          <p className={styles['review-card__stars']}>★★★★</p>
                          <p className={styles['review-card__text']}>"La Diavola elle pique juste comme il faut. Commande simple, suivi en direct, emballage vraiment écologique. C'est devenu ma cantine du vendredi."</p>
                          <div className={styles['review-card__author']}>
                              <div className={styles['review-card__avatar']}>M</div>
                              <div className={styles['review-card__author__name']}>
                                  <small>Mehdi R. - Diavola.</small>
                                  <small><Check size={13} strokeWidth={3} /> Client vérifié</small>
                              </div>
                          </div>
                      </article>
                      <article className={styles['review-card']}>
                          <p className={styles['review-card__stars']}>★★★★</p>
                          <p className={styles['review-card__text']}>"Je suis végétarienne, l'Aubergine Grillée c'est la meilleure que j'ai goûtée. Fraîche, légère, et on sent que les ingrédients sont locaux."</p>
                          <div className={styles['review-card__author']}>
                              <div className={styles['review-card__avatar']}>L</div>
                              <div className={styles['review-card__author__name']}>
                                  <small>Léa M. - Aubergine Grillée.</small>
                                  <small><Check size={13} strokeWidth={3} /> Client vérifié</small>
                              </div>
                          </div>
                      </article>
                  </div>
              </section>
              {/* CTA */}
              <section className={styles['cta']}>
                  <div className={styles['cta__inner']}>
                      <div className={styles['cta__inner__desktop']}>
                          <h3 className={styles['cta__title']}>Une petite faim ? La Terre vous dit merci.</h3>
                          <p className={styles['cta__text']}>Commandez votre pizza préférée et profitez de -10% sur les pizzas et boissons.</p>
                      </div>
                      <div className={styles['cta__inner__mobile']}>
                          <h3 className={styles['cta__title']}>Une petite faim ?</h3>
                          <p className={styles['cta__text']}>La Terre vous dit merci. -10% sur votre première pizza.</p>
                      </div>
                      <button className={styles['cta__button']}>
                          <Link href={"/pizzas"}>Commander maintenant</Link>
                          <ShoppingBag size={18} />
                      </button>
                  </div>
              </section>
          </div>
      </main>
  );
}
