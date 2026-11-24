"use client"

import styles from './Testimonials.module.scss';

import {useTestimonialAdminStore} from "@/store/admin/testimonialAdmin.store";
import Pagination from "@/components/pagination/Pagination";
import InputSearch from "@/components/input-search/InputSearch";
import {useEffect} from "react";
import {Trash2} from "lucide-react";
import Image from "next/image";

export default function Reviews() {

    {/* Store Testimonial */}

    const {
        testimonialList,
        previousPage,
        followingPage,
        testimonialSearch,
        testimonialIsVisible,
        testimonialDelete,
        testimonials,
        isLoading,
        countTestimonials,
        averageRating,
        current,
        pages,
        term
    } = useTestimonialAdminStore()

    useEffect(() => {
        testimonialList()
    }, [testimonialList]);

    {/* Toggle Testimonial */}

    async function publishTestimonial(id: number) {
        try {
            await testimonialIsVisible(id)
        } catch (err: any) {
            console.error(err)
            throw err
        }
    }

    {/* Published Testimonial */}

    async function deleteTestimonial(id: number) {
        try {
            await testimonialDelete(id)
        } catch (err: any) {
            console.error(err)
            throw err
        }
    }

    return (
        <section className={styles['reviews']}>
            <div className={styles['reviews__container']}>
                <header className={styles['reviews__header']}>
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

                <div className={styles['reviews__search']}>
                    <InputSearch search={testimonialSearch} term={term ?? ""} placeholder={"Rechercher un témoignage…"} />
                </div>

                {isLoading ? (
                    <div className={styles['reviews-wrapper']}>
                        <span className={styles['reviews-wrapper__loader']}></span>
                    </div>
                ) : !isLoading && testimonials.length > 0 ? (
                    <>
                        <div className={styles['reviews__list']}>
                            {testimonials?.map((t: any) =>
                                <article key={t.id} className={styles['review']}>
                                    <div className={styles['review__delete']}>
                                        <Trash2 onClick={() => deleteTestimonial(t.id)} />
                                    </div>
                                    <div className={styles['review__toggle']}>
                                        <label className={styles['publish']}>
                                            <span>{t.isPublished ? 'En ligne' : 'Brouillon'}</span>
                                            <input
                                                type="checkbox"
                                                checked={t.isPublished}
                                                onChange={() => publishTestimonial(t.id)}
                                            />
                                            <span className={styles['slider']} />
                                        </label>
                                    </div>
                                    <span className={styles['review__quote']} aria-hidden="true">“</span>
                                    <div className={styles['review__stars']}>
                                        {'★'.repeat(t.rating)}
                                        <span className={styles['review__starsOff']}>
                                            {'★'.repeat(5 - t.rating)}
                                        </span>
                                    </div>
                                    <p className={styles['review__text']}>
                                        {t.message}
                                    </p>
                                    <footer className={styles['review__footer']}>
                                        {t?.pictures?.length ? (
                                            <div className={styles['review__avatar']}>
                                                <Image src={t?.pictures?.[0]?.url} alt={"Image client"} width={40} height={40} />
                                            </div>
                                        ) : (
                                            <div className={styles['review__avatar']}>
                                                {t.name.slice(0, 1)}
                                            </div>
                                        )}
                                        <div className={styles['review__author']}>
                                        <span className={styles['review__name']}>
                                            {t.name}
                                        </span>
                                            <span className={styles['review__verified']}>✓ Client vérifié</span>
                                        </div>
                                        <span className={styles['review__pizza']}>🍕 {t.pizza}</span>
                                    </footer>
                                </article>
                            )}
                        </div>
                        {/* Pagination */}
                        {pages > 1 && (
                            <Pagination
                                current={current}
                                pages={pages}
                                previousPage={previousPage}
                                followingPage={followingPage}
                            />
                        )}
                    </>
                ) : (
                    <div className={styles['reviews-empty']}>
                        <p>Aucun témoignage pour le moment.</p>
                    </div>
                )}
            </div>
        </section>
    );
}