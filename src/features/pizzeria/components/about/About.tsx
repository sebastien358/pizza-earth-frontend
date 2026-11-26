import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Package, Flame, MapPin, ArrowRight } from 'lucide-react';
import styles from './About.module.scss';
import pizzaImg from '@/assets/images/pizza_hero_logo.png';

const VALUES = [
    { icon: Leaf, title: 'Produits locaux', text: 'Des producteurs proches de Rugles, pour des recettes fraîches et de saison.' },
    { icon: Flame, title: 'Pâte maison', text: 'Fine, croustillante et moelleuse, cuite à la minute.' },
    { icon: Package, title: 'Zéro plastique', text: 'Des emballages recyclables, bons pour vous et pour la Terre.' },
];

const STATS = [
    { value: '2024', label: "Année d'ouverture" },
    { value: '100%', label: 'Ingrédients frais' },
    { value: '30 min', label: 'Livraison express' },
];

export default function About() {
    return (
        <main className={styles['about']}>
            {/* HERO */}
            <section className={styles['hero']}>
                <div className={styles['hero__inner']}>
                    <span className={styles['hero__eyebrow']}>Notre histoire</span>
                    <h1 className={styles['hero__title']}>
                        Une pizzeria qui aime <span className={styles['hero__accent']}>la Terre</span>
                    </h1>
                    <p className={styles['hero__text']}>
                        Des ingrédients frais et locaux, une pâte croustillante et un emballage qui respecte la planète.
                    </p>
                    <div className={styles['hero__actions']}>
                        <Link href="/pizzas" className={styles['hero__btn']}>Voir le menu</Link>
                        <Link href="/emplacement" className={styles['hero__btn--outline']}>Nous trouver</Link>
                    </div>
                </div>
            </section>

            {/* HISTOIRE */}
            <section className={styles['story']}>
                <div className={styles['story__inner']}>
                    <div className={styles['story__media']}>
                        <span className={styles['story__sticker']} aria-hidden="true" />
                        <div className={styles['story__frame']}>
                            <Image src={pizzaImg} alt="Pizza PIZZA EARTH" className={styles['story__img']} />
                        </div>
                        <div className={styles['story__badge']}>
                            <strong>Depuis 2024</strong>
                            <span>Passion et planète</span>
                        </div>
                    </div>

                    <div className={styles['story__content']}>
                        <span className={styles['story__eyebrow']}>Qui sommes-nous</span>
                        <h2 className={styles['story__title']}>Fait avec passion pour la planète et vos papilles</h2>
                        <p className={styles['story__text']}>
                            Chez PIZZA EARTH, nous croyons qu'une bonne pizza doit être savoureuse, durable et préparée avec
                            amour. Nous sélectionnons des ingrédients frais et locaux, et cuisons chaque pizza à la perfection.
                        </p>
                        <ul className={styles['story__tags']}>
                            <li className={styles['story__tag']}><Leaf size={18} /> Emballage écologique</li>
                            <li className={styles['story__tag']}><Package size={18} /> 100% ingrédients frais</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* VALEURS */}
            <section className={styles['values']}>
                <div className={styles['values__inner']}>
                    <header className={styles['values__header']}>
                        <span className={styles['values__eyebrow']}>Nos valeurs</span>
                        <h2 className={styles['values__title']}>Ce qui nous guide</h2>
                    </header>

                    <ul className={styles['values__grid']}>
                        {VALUES.map(({ icon: Icon, title, text }) => (
                            <li key={title} className={styles['value']}>
                                <span className={styles['value__icon']}><Icon size={26} /></span>
                                <h3 className={styles['value__title']}>{title}</h3>
                                <p className={styles['value__text']}>{text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* CHIFFRES + CTA */}
            <section className={styles['join']}>
                <div className={styles['join__card']}>
                    <ul className={styles['join__stats']}>
                        {STATS.map((s) => (
                            <li key={s.label} className={styles['join__stat']}>
                                <strong className={styles['join__value']}>{s.value}</strong>
                                <span className={styles['join__label']}>{s.label}</span>
                            </li>
                        ))}
                    </ul>

                    <div className={styles['join__footer']}>
                        <div>
                            <h2 className={styles['join__title']}>Une petite faim ?</h2>
                            <p className={styles['join__address']}><MapPin size={16} /> 12 Rue des Lilas, 27250 Rugles</p>
                        </div>
                        <Link href="/pizzas" className={styles['join__btn']}>
                            Commander maintenant <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}