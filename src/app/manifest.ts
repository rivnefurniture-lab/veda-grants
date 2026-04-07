import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WEDA — Агенція економічного розвитку",
    short_name: "WEDA",
    description:
      "Допомагаємо українському бізнесу отримувати гранти та фінансування. Пошук грантів, написання заявок, бізнес-планування.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8FAFC",
    theme_color: "#0D1846",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
