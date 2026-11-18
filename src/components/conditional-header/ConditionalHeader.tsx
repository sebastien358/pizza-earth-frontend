"use client"

import Header from "@/components/header/Header";
import {usePathname} from "next/navigation";

export default function ConditionalHeader({ className }: { className: string }) {
    const pathname = usePathname()

    const isRegister = pathname.startsWith('/register')
    const isLogin = pathname.startsWith('/login')
    const isUser = pathname.startsWith('/user')
    const isAdmin = pathname.startsWith('/admin')

    if (isRegister || isLogin || isUser || isAdmin) {
        return null
    }

    return (
        <div className={className}><Header /></div>
    )
}