"use client"

import Footer from "@/components/footer/Footer";
import {usePathname} from "next/navigation";

export default function ConditionalFooter({ className }: { className: string }) {
    const pathname = usePathname()

    const isRegister = pathname.startsWith('/register')
    const isLogin = pathname.startsWith('/login')
    const isAdmin = pathname.startsWith('/admin')

    if (isRegister || isLogin || isAdmin) {
        return null
    }

    return (
        <div className={className}><Footer /></div>
    )
}