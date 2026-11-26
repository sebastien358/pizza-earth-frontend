"use client"

import Header from "@/components/header/Header";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";

export default function ConditionalHeader({ className }: { className: string }) {
    const pathname = usePathname()
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    if (!mounted) return <div className={className}><Header /></div>

    if (pathname.startsWith('/register') || pathname.startsWith('/login') || pathname.startsWith('/user') || pathname.startsWith('/admin')) {
        return null
    }
    return <div className={className}><Header /></div>
}