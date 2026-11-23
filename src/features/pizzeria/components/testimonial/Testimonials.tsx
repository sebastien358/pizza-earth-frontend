"use client"

import styles from './Testimonials.module.scss';

import Pagination from "@/components/pagination/Pagination";
import AddTestimonial from "@/features/pizzeria/components/testimonial/AddTestimonial";
import {useTestimonialStore} from "@/store/testimonial.store";
import {useEffect} from "react";
import Image from "next/image";

export default function Reviews() {
    const { testimonialsList, previousPage, followingPage, testimonials, current, pages, countTestimonials, averageRating } = useTestimonialStore()

    useEffect(() => {
        testimonialsList()
    }, [testimonialsList]);

    console.log(testimonials)
    return (
        <section className={styles['reviews']}>
            <div className={styles['reviews__container']}>
                <header className={styles['reviews__header']}>
                    <span className={styles['reviews__eyebrow']}>Témoignages</span>
                    <h2 className={styles['reviews__title']}>Ce que disent nos clients</h2>

                    <div className={styles['reviews__summary']}>
                        <span className={styles['reviews__score']}>{averageRating}</span>
                        <div className={styles['reviews__summaryInfo']}>
                            <div aria-label={`${averageRating} sur 5`}>
                                <span className={styles['reviews__stars']}>{'★'.repeat(Math.floor(averageRating))}</span>
                                <span className={styles['reviews__starsOff']}>{'★'.repeat(5 - Math.floor(averageRating))}</span>
                            </div>
                            <p className={styles['reviews__count']}>{countTestimonials}+ avis vérifiés</p>
                        </div>
                    </div>
                </header>

                <ul className={styles['reviews__list']}>
                    {testimonials?.map((r: any) => (
                        <li key={r.id} className={styles['review']}>
                            <span className={styles['review__quote']} aria-hidden="true">“</span>

                            <div className={styles['review__stars']} aria-label={`${r.rating} sur 5`}>
                                {'★'.repeat(r.rating)}
                                <span className={styles['review__starsOff']}>
                                    {'★'.repeat(5 - r.rating)}
                                </span>
                            </div>

                            <p className={styles['review__text']}>{r.message}</p>

                            <footer className={styles['review__footer']}>
                                {r.pictures?.length > 0 ? (
                                    <div className={styles['review__avatar']}>
                                        <Image src={r?.pictures?.[0]?.url} alt={"Image client"} width={40} height={40} />
                                    </div>
                                ) : (
                                    <div className={styles['review__avatar']}>
                                        {r.name?.[0] ?? '?'}
                                    </div>
                                )}
                                <div className={styles['review__author']}>
                                    <span className={styles['review__name']}>{r.name}</span>
                                    <span className={styles['review__verified']}>✓ Client vérifié</span>
                                </div>
                                <span className={styles['review__pizza']}>🍕 {r.pizza}</span>
                            </footer>
                        </li>
                    ))}
                </ul>
                {pages > 1 && (
                    <Pagination
                        current={current}
                        pages={pages}
                        previousPage={previousPage}
                        followingPage={followingPage}
                    />
                )}
                <AddTestimonial />
            </div>
        </section>
    );
}