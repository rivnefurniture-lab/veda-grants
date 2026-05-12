import Anthropic from "@anthropic-ai/sdk";

const client = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

const MODEL = process.env.ENRICH_MODEL || "claude-opus-4-7";

export type EnrichedGrant = {
  isGrant: boolean;
  title: string;
  description: string;
  amount: string | null;
  amountUsd: number | null;
  deadline: string | null;
  category: string | null;
  region: string | null;
  sphere: string | null;
};

const CATEGORIES = [
  "Технології",
  "Підприємництво",
  "Екологія",
  "Агросектор",
  "Освіта",
  "Культура",
  "Соціальна сфера",
  "Енергетика",
  "Відновлення",
];

const SYSTEM = `Ти аналізуєш оголошення українською мовою про можливості фінансування (гранти, конкурси, програми підтримки). Твоє завдання — витягти структуровану інформацію.

Правила:
- isGrant: true, якщо це справді грант, конкурс, програма фінансування для бізнесу/громадських організацій/фізосіб. false, якщо це тендер на закупівлю, вакансія, новина без фінансування, аналітичний звіт тощо.
- title: коротка зрозуміла назва (60-100 символів). НЕ переписуй оригінал, а зроби людську версію: "Грант [сума] на [сфера]" або "[Назва програми] для [для кого]". Прибери складні юридичні формулювання.
- description: 2-3 короткі речення про: ХТО може подати, ЩО фінансується, ЧИМ це цікаво. Без води, без "ФОРМА. КОНКУРС...", без "БФ «Вітри змін» в рамках Проєкту...". Пиши як для зайнятого бізнесмена.
- amount: сума як показувати (напр. "до €150,000", "300 000 грн", "$50,000"). null якщо не вказано.
- amountUsd: приблизна сума в USD як ціле число для сортування. null якщо невідомо.
- deadline: дата у форматі YYYY-MM-DD. null якщо не вказано чи безстроково.
- category: ОДНА з: ${CATEGORIES.join(", ")}. null якщо жодна не підходить.
- region: "Вся Україна", "Західна Україна", "Рівненська область" тощо. null якщо не вказано.
- sphere: конкретніша сфера (напр. "IT-стартапи", "Зелена енергетика", "Освіта дорослих"). null якщо не вказано.

Якщо isGrant=false, інші поля можуть бути приблизні чи null — головне правильно класифікувати.`;

const schema = {
  type: "object" as const,
  properties: {
    isGrant: { type: "boolean" as const },
    title: { type: "string" as const },
    description: { type: "string" as const },
    amount: { anyOf: [{ type: "string" as const }, { type: "null" as const }] },
    amountUsd: { anyOf: [{ type: "integer" as const }, { type: "null" as const }] },
    deadline: { anyOf: [{ type: "string" as const }, { type: "null" as const }] },
    category: {
      anyOf: [
        { type: "string" as const, enum: CATEGORIES },
        { type: "null" as const },
      ],
    },
    region: { anyOf: [{ type: "string" as const }, { type: "null" as const }] },
    sphere: { anyOf: [{ type: "string" as const }, { type: "null" as const }] },
  },
  required: [
    "isGrant",
    "title",
    "description",
    "amount",
    "amountUsd",
    "deadline",
    "category",
    "region",
    "sphere",
  ],
  additionalProperties: false,
};

export function isEnrichmentEnabled(): boolean {
  return client !== null;
}

export async function enrichGrant(input: {
  rawTitle: string;
  rawText: string;
  sourceUrl: string;
  sourceName?: string;
}): Promise<EnrichedGrant | null> {
  if (!client) return null;

  const userMsg = `URL: ${input.sourceUrl}
Джерело: ${input.sourceName || "невідомо"}
Оригінальна назва: ${input.rawTitle}

Текст оголошення:
${input.rawText.slice(0, 6000)}`;

  try {
    const res = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      thinking: { type: "disabled" },
      output_config: {
        format: { type: "json_schema" as const, schema },
      },
      system: SYSTEM,
      messages: [{ role: "user", content: userMsg }],
    });

    const textBlock = res.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") return null;

    const parsed = JSON.parse(textBlock.text) as EnrichedGrant;
    return parsed;
  } catch (err) {
    console.error("Enrichment error:", err instanceof Error ? err.message : err);
    return null;
  }
}

export async function enrichBatch<T>(
  items: T[],
  toInput: (item: T) => Parameters<typeof enrichGrant>[0],
  concurrency = 5
): Promise<Array<{ item: T; enriched: EnrichedGrant | null }>> {
  const results: Array<{ item: T; enriched: EnrichedGrant | null }> = [];

  for (let i = 0; i < items.length; i += concurrency) {
    const slice = items.slice(i, i + concurrency);
    const batch = await Promise.all(
      slice.map(async (item) => ({
        item,
        enriched: await enrichGrant(toInput(item)),
      }))
    );
    results.push(...batch);
  }

  return results;
}
