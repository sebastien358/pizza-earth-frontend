"use client"

import styles from './Pagination.module.scss'
import {usePathname} from "next/navigation";

type PaginationProps = {
    current: number
    pages: number
    previousPage: () => Promise<void>
    followingPage: () => Promise<void>
}

export default function Pagination({ current, pages, previousPage, followingPage }: PaginationProps) {

    const pathName = usePathname()

    const isAdmin = pathName.startsWith('/admin')
    const isUser= pathName.startsWith('/user')

    if (isAdmin || isUser) {
        return (
            <section className={styles['pagination-dashboard']}>
                <div className={styles['pagination-dashboard__row']}>
                    <button
                        type={"button"}
                        className={styles['pagination-dashboard__previous']}
                        disabled={current === 1} onClick={() => previousPage()}
                    >
                        Précédent
                    </button>
                    <div className={styles['pagination-dashboard__number']}>
                        <span>{current} - {pages}</span>
                    </div>
                    <button
                        type={"button"}
                        className={styles['pagination-dashboard__following']}
                        disabled={current === pages} onClick={() => followingPage()}
                    >
                        Suivant
                    </button>
                </div>
            </section>
        )
    }

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
                <div className={styles['pagination__number']}>
                    <span>{current} - {pages}</span>
                </div>
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