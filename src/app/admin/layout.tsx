"use client"

import styles from './layout.module.scss'

import React, { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import Sidebar from "@/features/admin/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { token, isAdmin, hasHydrated } = useAuthStore()
    const router = useRouter()

    useEffect(() => {
        if (!hasHydrated) return

        if (!token || !isAdmin) {
            router.push('/login')
            return
        }
    }, [hasHydrated, token, isAdmin, router]);

    if (!token || !isAdmin) return null

    if (!hasHydrated) {
        return null // ou un loader si tu préfères
    }

    return (
        <div className={styles['admin-layout']}>
            <Sidebar />
            <main className={styles['admin-layout__content']}>
                {children}
            </main>
        </div>
    )
}