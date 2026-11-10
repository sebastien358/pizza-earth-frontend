"use client"

import Header from "@/components/header/Header";
import {usePathname} from "next/navigation";

export default function ConditionalHeader({ className }: { className: string }) {
    const pathname = usePathname()

    const isRegister = pathname.startsWith('/register')
    const isLogin = pathname.startsWith('/login')

    if (isRegister || isLogin) {
        return null
    }

    return (
        <div className={className}><Header /></div>
    )
}