"use client"

import styles from './Reviews.module.scss';
import Pagination from "@/components/pagination/Pagination";
import AddReview from "@/features/pizzeria/components/review/AddReview";

const reviews = [
    { id: 1, name: 'Sophie L.', pizza: 'Reine', rating: 4, text: 'La Reine est incroyable, pâte fine, fromage généreux. Livraison en 25 minutes à Rugles, encore chaude.' },
    { id: 2, name: 'Mehdi R.', pizza: 'Diavola', rating: 5, text: "La Diavola elle pique juste comme il faut. Suivi en direct, emballage vraiment écologique." },
    { id: 3, name: 'Léa M.', pizza: 'Aubergine Grillée', rating: 5, text: "Je suis végétarienne, c'est la meilleure que j'ai goûtée. Fraîche, légère, ingrédients locaux." },
];

export default function Reviews() {
    return (
        <section className={styles['reviews']}>
            <div className={styles['reviews__container']}>
                <header className={styles['reviews__header']}>
                    <span className={styles['reviews__eyebrow']}>Témoignages</span>
                    <h2 className={styles['reviews__title']}>Ce que disent nos clients</h2>

                    <div className={styles['reviews__summary']}>
                        <span className={styles['reviews__score']}>4,9</span>
                        <div className={styles['reviews__summaryInfo']}>
                            <div className={styles['reviews__stars']} aria-hidden="true">★★★★★</div>
                            <p className={styles['reviews__count']}>500+ avis vérifiés</p>
                        </div>
                    </div>
                </header>

                <ul className={styles['reviews__list']}>
                    {reviews.map((r) => (
                        <li key={r.id} className={styles['review']}>
                            <span className={styles['review__quote']} aria-hidden="true">“</span>

                            <div className={styles['review__stars']} aria-label={`${r.rating} sur 5`}>
                                {'★'.repeat(r.rating)}
                                <span className={styles['review__starsOff']}>{'★'.repeat(5 - r.rating)}</span>
                            </div>

                            <p className={styles['review__text']}>{r.text}</p>

                            <footer className={styles['review__footer']}>
                                <div className={styles['review__avatar']}>{r.name[0]}</div>
                                <div className={styles['review__author']}>
                                    <span className={styles['review__name']}>{r.name}</span>
                                    <span className={styles['review__verified']}>✓ Client vérifié</span>
                                </div>
                                <span className={styles['review__pizza']}>🍕 {r.pizza}</span>
                            </footer>
                        </li>
                    ))}
                </ul>
                <Pagination current={1} pages={3} previousPage={null} followingPage={null} />
                <AddReview />
            </div>
        </section>
    );
}