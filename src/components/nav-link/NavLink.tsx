"use client"

import styles from '@/components/header/Header.module.scss';

import Link from "next/link";
import {usePathname} from "next/navigation";

export default function NavLink({ href, children, dropdown = false }) {
   const pathName = usePathname()
    const isActive = pathName === href

    let activeClass = "";

    if (dropdown) {
        activeClass = styles['active']
    }

    return (
        <Link className={isActive ? activeClass : ''} href={href}>
            {children}
        </Link>
    )
}