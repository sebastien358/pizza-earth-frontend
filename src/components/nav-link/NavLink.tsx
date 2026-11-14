"use client"

import styleHeader from '@/components/header/Header.module.scss';
import styleSidebar from '@/features/admin/components/Sidebar.module.scss'

import Link from "next/link";
import {usePathname} from "next/navigation";

interface NavLinkProps {
    href: string
    children: string
    dropdown?: boolean
    dropdownSidebar?: boolean
}

export default function NavLink({ href, children, dropdown = false, dropdownSidebar = false }: NavLinkProps) {
   const pathName = usePathname()
    const isActive = pathName === href

    let activeClass = "";

    if (dropdown) {
        activeClass = styleHeader['active']
    } else if (dropdownSidebar) {
        activeClass = styleSidebar['active']
    }

    return (
        <Link className={isActive ? activeClass : ""} href={href}>
            {children}
        </Link>
    )
}