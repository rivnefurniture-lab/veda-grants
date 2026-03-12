import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "ВЕДА — Агенція економічного розвитку | Грантовий консалтинг",
    template: "%s | ВЕДА",
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
    "ВЕДА",
    "грантова заявка",
    "фінансування бізнесу",
    "гранти для бізнесу",
    "малий бізнес",
    "гранти Україна",
  ],
  authors: [{ name: "ВЕДА — Агенція економічного розвитку" }],
  creator: "ВЕДА",
  publisher: "ВЕДА — Агенція економічного розвитку",
  metadataBase: new URL("https://veda.agency"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "https://veda.agency",
    siteName: "ВЕДА — Агенція економічного розвитку",
    title: "ВЕДА — Грантовий консалтинг для українського бізнесу",
    description:
      "Допомагаємо бізнесу отримувати гранти та фінансування. 150+ грантових можливостей, професійна підготовка заявок, супровід проєктів.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ВЕДА — Грантовий консалтинг для українського бізнесу",
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
  name: "ВЕДА — Агенція економічного розвитку",
  alternateName: "VEDA",
  url: "https://veda.agency",
  logo: "https://veda.agency/icon.svg",
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
      <body className={`${inter.variable} ${playfair.variable} antialiased font-[var(--font-inter)]`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
