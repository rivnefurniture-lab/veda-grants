export type SourceConfig = {
  id: string;
  name: string;
  type: "wp-json" | "rss";
  url: string;
  category?: string;
  enabled: boolean;
  /** Якщо true — джерело тематичне (всі пости — гранти), не застосовувати фільтр ключових слів */
  trustedAsGrants?: boolean;
};

export const SOURCES: SourceConfig[] = [
  {
    id: "granty-org-ua",
    name: "Granty.org.ua",
    type: "wp-json",
    url: "https://granty.org.ua/wp-json/wp/v2/posts?per_page=30",
    category: "Гранти",
    enabled: true,
    trustedAsGrants: true,
  },
  {
    id: "prostir-feed",
    name: "Громадський Простір",
    type: "rss",
    url: "https://www.prostir.ua/feed/",
    category: "Гранти",
    enabled: true,
  },
];
