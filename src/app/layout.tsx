"use client"

import "./globals.scss";
import styles from "./Layout.module.scss";

import ConditionalFooter from "@/components/conditional-footer/ConditionalFooter";
import ConditionalHeader from "@/components/conditional-header/ConditionalHeader";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr">
        <body className={'layout'}>
            <ConditionalHeader className={styles['layout__header']} />
            <main className={styles['layout__main']}>
                {children}
            </main>
            <ConditionalFooter className={styles['layout__footer']} />
        </body>
    </html>
  );
}
