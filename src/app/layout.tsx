import "./globals.scss";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";



export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr">
      <Header />
      <body>{children}</body>
      <Footer />
    </html>
  );
}
