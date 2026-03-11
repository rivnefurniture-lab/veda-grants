import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "ВЕДА — Агенція економічного розвитку | Грантовий консалтинг",
  description:
    "Допомагаємо українському бізнесу отримувати гранти та фінансування. Пошук грантів, написання заявок, бізнес-планування. Рівне, Україна.",
  keywords: "гранти, грантовий консалтинг, бізнес-план, фінансування, Рівне, Україна, ВЕДА",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${inter.variable} antialiased font-[var(--font-inter)]`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
