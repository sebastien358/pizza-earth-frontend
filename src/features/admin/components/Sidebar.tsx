"use client"

import styles from './Sidebar.module.scss'
import NavLink from "@/components/nav-link/NavLink";

const adminLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Ajout Pizza', path: '/admin/products/form' },
    { name: 'Les Pizzas', path: '/admin/products' }
]

export default function Sidebar() {
    return (
        <main className={styles['admin-sidebar']}>
            <div className={styles['admin-sidebar__container']}>
                <h2>Admin</h2>
                <div className={styles['admin-sidebar__container__nav']}>
                    {adminLinks.map((link) =>
                        <NavLink
                            key={link.path}
                            href={link.path}
                        >
                            {link.name}
                        </NavLink>
                    )}
                </div>
            </div>

            <div className={styles['reset-contact']}>
                <p>Total : </p>
                <button
                    className={`${styles['btn']} ${styles['btn-reset']}`}
                >
                    Réinitialiser
                </button>
            </div>
        </main>
    )
}