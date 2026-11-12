"use client"

import styles from './layout.module.scss'
import React, { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { token, isAdmin } = useAuthStore()
    const router = useRouter()

    useEffect(() => {
        if (!token || !isAdmin) {
            router.push('/login')
            return
        }
    }, [token, isAdmin, router]);

    if (!token || !isAdmin) return null

    return (
        <main className={styles['admin-layout']}>
            <div className={styles['admin-layout__content']}>
                {children}
            </div>
        </main>
    )
}