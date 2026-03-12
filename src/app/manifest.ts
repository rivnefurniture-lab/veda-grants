import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ВЕДА — Агенція економічного розвитку",
    short_name: "ВЕДА",
    description:
      "Допомагаємо українському бізнесу отримувати гранти та фінансування. Пошук грантів, написання заявок, бізнес-планування.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f5",
    theme_color: "#0f1b3d",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
