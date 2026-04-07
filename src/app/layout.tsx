import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "WEDA — West Economic Development Agency | Грантовий консалтинг",
    template: "%s | WEDA",
  },
  description:
    "Допомагаємо українському бізнесу отримувати гранти та фінансування. Пошук грантів, написання заявок, бізнес-планування. Рівне, Україна.",
  keywords: [
    "гранти",
    "грантовий консалтинг",
    "бізнес-план",
    "фінансування",
    "Рівне",
    "Україна",
    "WEDA",
    "грантова заявка",
    "фінансування бізнесу",
    "гранти для бізнесу",
    "малий бізнес",
    "гранти Україна",
  ],
  authors: [{ name: "WEDA — West Economic Development Agency" }],
  creator: "WEDA",
  publisher: "WEDA — West Economic Development Agency",
  metadataBase: new URL("https://weda.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "https://weda.com",
    siteName: "WEDA — West Economic Development Agency",
    title: "WEDA — Грантовий консалтинг для українського бізнесу",
    description:
      "Допомагаємо бізнесу отримувати гранти та фінансування. 150+ грантових можливостей, професійна підготовка заявок, супровід проєктів.",
  },
  twitter: {
    card: "summary_large_image",
    title: "WEDA — Грантовий консалтинг для українського бізнесу",
    description:
      "Допомагаємо бізнесу отримувати гранти та фінансування. 150+ грантових можливостей у базі.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "WEDA — West Economic Development Agency",
  alternateName: "WEDA",
  url: "https://weda.com",
  logo: "https://weda.com/icon.svg",
  description:
    "Допомагаємо українському бізнесу отримувати гранти та фінансування.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Рівне",
    addressRegion: "Рівненська область",
    addressCountry: "UA",
    streetAddress: "пр. Миру",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+380672160559",
    contactType: "customer service",
    availableLanguage: ["Ukrainian"],
  },
  foundingDate: "2022",
  areaServed: {
    "@type": "Country",
    name: "Ukraine",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${mulish.variable} antialiased font-[var(--font-mulish)]`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
