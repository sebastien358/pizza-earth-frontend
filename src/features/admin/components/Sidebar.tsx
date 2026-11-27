"use client"

import styles from './Sidebar.module.scss'

import {useTestimonialAdminStore} from "@/store/admin/testimonialAdmin.store";
import NavLink from "@/components/nav-link/NavLink";
import {usePathname} from "next/navigation";
import {useProductAdminStore} from "@/store/admin/productAdmin.store";
import {useAuthStore} from "@/store/auth.store";
import {useOrderAdminStore} from "@/store/admin/orderAdmin.store";

import {useState} from "react";
import {Menu} from "lucide-react";
import {useOrderStore} from "@/store/user/order.store";

export default function Sidebar() {

    {/* Store Auth */}
    const { isAdmin, isUser, user } = useAuthStore()

    {/* Store Admin Product */}
    const { resetProduct, countProducts } = useProductAdminStore()

    {/* Store Admin Order */}
    const { resetOrders, totalRevenue, countOrders } = useOrderAdminStore()

    {/* Store Admin Testimonial */}
    const { resetTestimonials, countTestimonials } = useTestimonialAdminStore()

    {/* Gestion Routes Admin */}
    const adminLinks = [
        { name: 'Accueil', path: '/' },
        { name: 'Commandes', path: '/admin/commands' },
        { name: 'Témoignages', path: '/admin/testimonials' },
        { name: 'Contacts', path: '/admin/contacts' },
        { name: 'Pizzas', path: '/admin/products' },
        { name: 'Ajout Pizza', path: '/admin/products/form' }
    ]

    const adminPageConfig = {
        '/admin/commands': { reset: resetOrders, count: countOrders },
        '/admin/testimonials': { reset: resetTestimonials, count: countTestimonials },
        '/admin/contacts': { reset: null, count: 0 },
        '/admin/products': { reset: resetProduct, count: countProducts }
    }

    const pathname = usePathname()
    const isActiveAdmin = adminPageConfig[pathname as keyof typeof adminPageConfig]

    {/* Store User Order */}
    const { resetOrderUser, countUserOrders } = useOrderStore()

    {/* Gestion Routes User */}
    const userLinks = [
        { name: 'Accueil', path: '/' },
        { name: 'Commandes', path: '/user/orders' }
    ]

    const userPageConfig = {
        '/user/orders': { reset: resetOrderUser, count: countUserOrders },
    }

    {/* Gestion du menu version mobile */}
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
                <h2>{isAdmin() ? 'PIZZA EARTH' : `${user?.firstname} ${user?.lastname}`}</h2>
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