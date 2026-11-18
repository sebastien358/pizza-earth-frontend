"use client"

import styles from "@/app/user/layout.module.scss";

import Sidebar from "@/features/admin/components/Sidebar";
import React, {useEffect} from "react";
import {useAuthStore} from "@/store/auth.store";
import {useRouter} from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {

    const { token, isUser, hasHydrated } = useAuthStore()

    const router = useRouter()

    useEffect(() => {
        if (!hasHydrated) return

        if (!token || !isUser()) {
            router.push('/login');
        }
    }, [hasHydrated, token, isUser, router]);

    if (!token || !isUser()) return null

    if (!hasHydrated) {
        return null // ou un loader si tu préfères
    }

    return (
        <div className={styles['user-layout']}>
            <Sidebar />
            <main className={styles['user-layout__content']}>
                {children}
            </main>
        </div>
    )
}