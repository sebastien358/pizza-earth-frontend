"use client"

import styles from './Sidebar.module.scss'
import NavLink from "@/components/nav-link/NavLink";
import {usePathname} from "next/navigation";
import {useProductAdminStore} from "@/store/admin/productAdmin.store";
import {useAuthStore} from "@/store/auth.store";
import {useOrderAdminStore} from "@/store/admin/orderAdmin.store";
import {useOrderStore} from "@/store/user/order.store";
import {useState} from "react";
import {ChevronDown, Menu} from "lucide-react";

export default function Sidebar() {

    {/* Store Auth */}

    const { isAdmin, isUser } = useAuthStore()

    {/* Store Admin Product - Order */}

    const { resetProduct, countProducts } = useProductAdminStore()

    const { totalRevenue } = useOrderAdminStore()

    {/* Gestion Routes Admin */}

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
    const isActiveAdmin = adminPageConfig[pathname as keyof typeof adminPageConfig]

    {/* Store User Order */}

    const { orders } = useOrderStore()

    {/* Gestion Routes User */}

    const userLinks = [
        { name: 'Accueil', path: '/' },
        { name: 'Commandes', path: '/user/orders' }
    ]

    const userPageConfig = {
        '/user/orders': { reset: null, count: orders.length }
    }

    {/* Gtestion du menu version mobile */}

    const [open, setOpen] = useState<boolean>(false)

    //////

    const isActiveUser = userPageConfig[pathname as keyof typeof userPageConfig]

    if (pathname === '/user/payment') return null

    return (
        <main className={styles['admin-sidebar']}>

            {/* Sidebar Button Menu Déroulant */}

            <div className={styles['admin-sidebar__burger']} onClick={() => setOpen(!open)}>
                <Menu />
                {open && (
                    <div className={styles['admin-sidebar__burger__menu']}>
                        <>
                            {isAdmin() ? (
                                <>
                                    {adminLinks.map((link) =>
                                        <NavLink key={link.path} href={link.path} dropdownSidebar>
                                            {link.name}
                                        </NavLink>
                                    )}
                                </>
                            ) : isUser() && (
                                <>
                                    {userLinks.map((link) =>
                                        <NavLink key={link.path} href={link.path} dropdownSidebar>
                                            {link.name}
                                        </NavLink>
                                    )}
                                </>
                            )}
                        </>
                    </div>
                )}
            </div>

            {/* Liens Sidebar */}

            <div className={styles['admin-sidebar__container']}>
                <h2>{isAdmin() ? 'Admin' : 'Client'}</h2>
                {isAdmin() && (
                    <div className={styles['admin-sidebar__total']}>
                        <span>Total du jour</span>
                        <strong>{totalRevenue.toFixed(2)}€</strong>
                    </div>
                )}
                <div className={styles['admin-sidebar__container__nav']}>
                    <>
                        {isAdmin() ? (
                            <>
                                {adminLinks.map((link) =>
                                    <NavLink key={link.path} href={link.path} dropdownSidebar>
                                        {link.name}
                                    </NavLink>
                                )}
                            </>
                        ) : isUser() && (
                            <>
                                {userLinks.map((link) =>
                                    <NavLink key={link.path} href={link.path} dropdownSidebar>
                                        {link.name}
                                    </NavLink>
                                )}
                            </>
                        )}
                    </>
                </div>
            </div>

            {isActiveAdmin ? (
                <div className={styles['reset-contact']}>
                    <p>Total : {isActiveAdmin.count}</p>
                    <button
                        onClick={isActiveAdmin.reset ?? undefined}
                        className={`${styles['btn']} ${styles['btn-reset']}`}
                    >
                        Réinitialiser
                    </button>
                </div>
            ) : isActiveUser && (
                <div className={styles['reset-contact']}>
                    <p>Total : {isActiveUser.count}</p>
                    <button
                        onClick={isActiveUser.reset ?? undefined}
                        className={`${styles['btn']} ${styles['btn-reset']}`}
                    >
                        Réinitialiser
                    </button>
                </div>
            )}
        </main>
    )
}