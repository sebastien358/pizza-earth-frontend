"use client"

import styles from './Sidebar.module.scss'
import NavLink from "@/components/nav-link/NavLink";
import {usePathname} from "next/navigation";
import {useProductAdminStore} from "@/store/admin/productAdmin.store";

export default function Sidebar() {

    const { resetProduct, countProducts } = useProductAdminStore()

    const adminLinks = [
        { name: 'Accueil', path: '/' },
        { name: 'Commandes', path: '/admin/commands' },
        { name: 'Pizzas', path: '/admin/products' },
        { name: 'Ajout Pizza', path: '/admin/products/form' }
    ]

    const adminPageConfig = {
        '/admin/commands': { reset: null, count: 0 },
        '/admin/products': { reset: resetProduct, count: countProducts }
    }

    const pathname = usePathname()
    const isActive = adminPageConfig[pathname]

    return (
        <main className={styles['admin-sidebar']}>
            <div className={styles['admin-sidebar__container']}>
                <h2>Admin</h2>
                <div className={styles['admin-sidebar__container__nav']}>
                    {adminLinks.map((link) =>
                        <NavLink
                            key={link.path}
                            href={link.path}
                            dropdownSidebar
                        >
                            {link.name}
                        </NavLink>
                    )}
                </div>
            </div>

            {isActive && (
                <div className={styles['reset-contact']}>
                    <p>Total : {isActive.count}</p>
                    <button
                        onClick={isActive.reset}
                        className={`${styles['btn']} ${styles['btn-reset']}`}
                    >
                        Réinitialiser
                    </button>
                </div>
            )}
        </main>
    )
}