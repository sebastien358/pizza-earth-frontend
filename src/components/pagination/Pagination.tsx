"use client"

import styles from './Pagination.module.scss'

type PaginationProps = {
    current: number
    pages: number
    previousPage: () => Promise<void>
    followingPage: () => Promise<void>
}

export default function Pagination({ current, pages, previousPage, followingPage }: PaginationProps) {
    return (
        <section className={styles['pagination']}>
            <div className={styles['pagination__row']}>
                <button
                    type={"button"}
                    className={styles['pagination__previous']}
                    disabled={current === 1} onClick={() => previousPage()}
                >
                    Précédent
                </button>
                    <span className={styles['pagination__number']}>
                        {current} - {pages}
                    </span>
                <button
                    type={"button"}
                    className={styles['pagination__following']}
                    disabled={current === pages} onClick={() => followingPage()}
                >
                    Suivant
                </button>
            </div>
        </section>
    )
}