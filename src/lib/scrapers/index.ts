import { prisma } from "@/lib/prisma";
import { SOURCES, type SourceConfig } from "./sources";
import { enrichGrant, enrichBatch, isEnrichmentEnabled } from "./enrich";

export type ScrapeResult = {
  total: number;
  created: number;
  skipped: number;
  enriched: number;
  rejectedAsNotGrant: number;
  errors: string[];
  startedAt: string;
  finishedAt: string;
};

type ScrapedItem = {
  title: string;
  description: string;
  fullText?: string;
  sourceUrl: string;
  source: string;
  category?: string;
  publishedAt?: Date;
};

const USER_AGENT = "WEDA-Grant-Bot/1.0 (+https://weda.org.ua)";
const FETCH_TIMEOUT_MS = 20_000;

async function fetchWithTimeout(url: string): Promise<Response> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, {
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "application/json, application/rss+xml, text/xml, */*",
      },
      signal: ac.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

function stripHtml(s: string | undefined | null): string {
  if (!s) return "";
  return s
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&[a-z0-9#]+;/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trim() + "…";
}

function looksLikeGrant(title: string, description: string): boolean {
  const text = (title + " " + description).toLowerCase();
  return (
    text.includes("грант") ||
    text.includes("конкурс") ||
    text.includes("фінансуванн") ||
    text.includes("стипендія") ||
    text.includes("subgrant") ||
    text.includes("funding") ||
    text.includes("call for proposals") ||
    text.includes("grant")
  );
}

async function scrapeWpJson(source: SourceConfig): Promise<ScrapedItem[]> {
  const res = await fetchWithTimeout(source.url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const posts = (await res.json()) as Array<{
    link: string;
    date?: string;
    title?: { rendered?: string };
    excerpt?: { rendered?: string };
    content?: { rendered?: string };
  }>;

  if (!Array.isArray(posts)) throw new Error("Unexpected response shape");

  return posts
    .map((p): ScrapedItem | null => {
      const title = stripHtml(p.title?.rendered);
      const description = truncate(stripHtml(p.excerpt?.rendered), 500);
      const fullText = stripHtml(p.content?.rendered);
      if (!title || !p.link) return null;
      if (!source.trustedAsGrants && !looksLikeGrant(title, description + " " + fullText)) return null;
      return {
        title: truncate(title, 240),
        description: description || truncate(fullText, 500),
        fullText: fullText || undefined,
        sourceUrl: p.link,
        source: source.name,
        category: source.category,
        publishedAt: p.date ? new Date(p.date) : undefined,
      };
    })
    .filter((x): x is ScrapedItem => x !== null);
}

function extractTag(xml: string, tag: string): string | null {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  if (!m) return null;
  return m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim();
}

function splitItems(xml: string): string[] {
  const out: string[] = [];
  const re = /<item[\s>][\s\S]*?<\/item>/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(xml)) !== null) out.push(match[0]);
  return out;
}

async function scrapeRss(source: SourceConfig): Promise<ScrapedItem[]> {
  const res = await fetchWithTimeout(source.url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const xml = await res.text();
  const items = splitItems(xml);

  return items
    .map((raw): ScrapedItem | null => {
      const title = stripHtml(extractTag(raw, "title"));
      const link = (extractTag(raw, "link") || "").trim();
      const description = truncate(stripHtml(extractTag(raw, "description")), 500);
      const pubDate = extractTag(raw, "pubDate");
      if (!title || !link) return null;
      if (!source.trustedAsGrants && !looksLikeGrant(title, description)) return null;
      return {
        title: truncate(title, 240),
        description,
        sourceUrl: link,
        source: source.name,
        category: source.category,
        publishedAt: pubDate ? new Date(pubDate) : undefined,
      };
    })
    .filter((x): x is ScrapedItem => x !== null);
}

async function scrapeSource(source: SourceConfig): Promise<ScrapedItem[]> {
  if (source.type === "wp-json") return scrapeWpJson(source);
  if (source.type === "rss") return scrapeRss(source);
  return [];
}

export async function scrapeAll(): Promise<ScrapeResult> {
  const startedAt = new Date();
  const errors: string[] = [];
  let total = 0;
  let created = 0;
  let skipped = 0;
  let enriched = 0;
  let rejectedAsNotGrant = 0;

  for (const source of SOURCES) {
    if (!source.enabled) continue;
    try {
      const items = await scrapeSource(source);
      total += items.length;

      const newItems: ScrapedItem[] = [];
      for (const item of items) {
        const existing = await prisma.grant.findUnique({
          where: { sourceUrl: item.sourceUrl },
        });
        if (existing) {
          skipped++;
          continue;
        }
        newItems.push(item);
      }

      const enrichedResults: Array<{ item: ScrapedItem; enriched: Awaited<ReturnType<typeof enrichGrant>> }> = isEnrichmentEnabled()
        ? await enrichBatch(
            newItems,
            (item) => ({
              rawTitle: item.title,
              rawText: item.fullText || item.description,
              sourceUrl: item.sourceUrl,
              sourceName: item.source,
            }),
            5
          )
        : newItems.map((item) => ({ item, enriched: null }));

      for (const { item, enriched: e } of enrichedResults) {
        if (e && e.isGrant === false) {
          rejectedAsNotGrant++;
          continue;
        }
        const deadline = e?.deadline ? safeDate(e.deadline) : null;
        await prisma.grant.create({
          data: {
            title: (e?.title || item.title).slice(0, 240),
            description: (e?.description || item.description).slice(0, 500),
            fullText: item.fullText,
            amount: e?.amount ?? null,
            amountUsd: e?.amountUsd ?? null,
            deadline,
            sourceUrl: item.sourceUrl,
            originalUrl: item.sourceUrl,
            source: item.source,
            category: e?.category ?? item.category ?? null,
            region: e?.region ?? null,
            sphere: e?.sphere ?? null,
            status: "PENDING",
            score: 0,
          },
        });
        created++;
        if (e) enriched++;
      }
    } catch (err) {
      errors.push(`${source.name}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  return {
    total,
    created,
    skipped,
    enriched,
    rejectedAsNotGrant,
    errors,
    startedAt: startedAt.toISOString(),
    finishedAt: new Date().toISOString(),
  };
}

function safeDate(iso: string): Date | null {
  const d = new Date(iso);
  return isNaN(d.getTime()) ? null : d;
}

export async function enrichExistingPending(limit = 100): Promise<{
  processed: number;
  enriched: number;
  rejected: number;
  errors: number;
}> {
  let processed = 0;
  let enriched = 0;
  let rejected = 0;
  let errors = 0;

  if (!isEnrichmentEnabled()) {
    return { processed: 0, enriched: 0, rejected: 0, errors: 0 };
  }

  const pendings = await prisma.grant.findMany({
    where: {
      status: "PENDING",
      OR: [
        { amount: null },
        { amountUsd: null },
        { description: { startsWith: "ФОРМА" } },
        { description: { startsWith: "Запит" } },
      ],
    },
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  for (let i = 0; i < pendings.length; i += 5) {
    const slice = pendings.slice(i, i + 5);
    const enrichedSlice = await Promise.all(
      slice.map(async (g) => ({
        g,
        e: await enrichGrant({
          rawTitle: g.title,
          rawText: g.fullText || g.description,
          sourceUrl: g.sourceUrl,
          sourceName: g.source,
        }),
      }))
    );

    for (const { g, e } of enrichedSlice) {
      processed++;
      if (!e) {
        errors++;
        continue;
      }
      if (e.isGrant === false) {
        await prisma.grant.update({
          where: { id: g.id },
          data: { status: "REJECTED" },
        });
        rejected++;
        continue;
      }
      await prisma.grant.update({
        where: { id: g.id },
        data: {
          title: e.title.slice(0, 240),
          description: e.description.slice(0, 500),
          amount: e.amount ?? g.amount,
          amountUsd: e.amountUsd ?? g.amountUsd,
          deadline: e.deadline ? safeDate(e.deadline) : g.deadline,
          category: e.category ?? g.category,
          region: e.region ?? g.region,
          sphere: e.sphere ?? g.sphere,
        },
      });
      enriched++;
    }
  }

  return { processed, enriched, rejected, errors };
}
