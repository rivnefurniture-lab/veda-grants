"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, AlertCircle } from "lucide-react";

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

const STATUSES = [
  { value: "PENDING", label: "Очікує модерації" },
  { value: "APPROVED", label: "Опублікований" },
  { value: "REJECTED", label: "Відхилений" },
];

export type GrantFormData = {
  id?: string;
  title: string;
  description: string;
  fullText: string;
  amount: string;
  amountUsd: number | null;
  deadline: string;
  sourceUrl: string;
  source: string;
  category: string;
  region: string;
  sphere: string;
  imageUrl: string;
  status: string;
  score: number;
};

const EMPTY: GrantFormData = {
  title: "",
  description: "",
  fullText: "",
  amount: "",
  amountUsd: null,
  deadline: "",
  sourceUrl: "",
  source: "",
  category: "",
  region: "",
  sphere: "",
  imageUrl: "",
  status: "APPROVED",
  score: 0,
};

export function GrantForm({
  initial,
  mode,
}: {
  initial?: Partial<GrantFormData>;
  mode: "create" | "edit";
}) {
  const router = useRouter();
  const [data, setData] = useState<GrantFormData>({ ...EMPTY, ...initial });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof GrantFormData>(key: K, value: GrantFormData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const submit = async (e: FormEvent, nextStatus?: string) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const payload = {
      ...data,
      status: nextStatus || data.status,
      amountUsd: data.amountUsd === null || (data.amountUsd as unknown) === "" ? null : Number(data.amountUsd),
      deadline: data.deadline || null,
    };

    try {
      const url = mode === "edit" ? `/api/admin/grants/${data.id}` : `/api/admin/grants`;
      const method = mode === "edit" ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Помилка збереження");
      router.push("/admin/granty?status=" + (payload.status || "APPROVED"));
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Невідома помилка");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={(e) => submit(e)} className="space-y-5 max-w-3xl">
      {error && (
        <div className="flex items-start gap-3 bg-danger/10 text-danger rounded-xl p-4">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-text mb-1.5">
          Назва гранту <span className="text-danger">*</span>
        </label>
        <input
          required
          type="text"
          value={data.title}
          onChange={(e) => set("title", e.target.value)}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-text"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-1.5">
          Короткий опис <span className="text-danger">*</span>
        </label>
        <textarea
          required
          rows={3}
          value={data.description}
          onChange={(e) => set("description", e.target.value)}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-text resize-y"
          placeholder="2-3 речення, що буде показано в каталозі"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-1.5">
          Повний текст
        </label>
        <textarea
          rows={6}
          value={data.fullText}
          onChange={(e) => set("fullText", e.target.value)}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-text resize-y"
          placeholder="Детальний опис, умови, критерії"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">
            Сума (як показувати)
          </label>
          <input
            type="text"
            value={data.amount}
            onChange={(e) => set("amount", e.target.value)}
            placeholder="до €150,000"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-text"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">
            Сума у USD (для сортування)
          </label>
          <input
            type="number"
            value={data.amountUsd ?? ""}
            onChange={(e) =>
              set("amountUsd", e.target.value === "" ? null : Number(e.target.value))
            }
            placeholder="150000"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-text"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">
            Дедлайн
          </label>
          <input
            type="date"
            value={data.deadline}
            onChange={(e) => set("deadline", e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-text"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">
            Категорія
          </label>
          <select
            value={data.category}
            onChange={(e) => set("category", e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-text bg-white"
          >
            <option value="">— оберіть категорію —</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">
            Регіон
          </label>
          <input
            type="text"
            value={data.region}
            onChange={(e) => set("region", e.target.value)}
            placeholder="Вся Україна"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-text"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">
            Сфера
          </label>
          <input
            type="text"
            value={data.sphere}
            onChange={(e) => set("sphere", e.target.value)}
            placeholder="Освіта, IT тощо"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-text"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-1.5">
          Посилання на джерело <span className="text-danger">*</span>
        </label>
        <input
          required
          type="url"
          value={data.sourceUrl}
          onChange={(e) => set("sourceUrl", e.target.value)}
          placeholder="https://..."
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-text"
        />
        <p className="text-xs text-text-light mt-1">
          Унікальне посилання, за яким система розпізнає, що це той самий грант
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-1.5">
          Назва джерела
        </label>
        <input
          type="text"
          value={data.source}
          onChange={(e) => set("source", e.target.value)}
          placeholder="USAID / Простір / тощо"
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-text"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-1.5">
          Статус
        </label>
        <select
          value={data.status}
          onChange={(e) => set("status", e.target.value)}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-text bg-white"
        >
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <p className="text-xs text-text-light mt-1">
          &quot;Опублікований&quot; — грант з&apos;явиться на публічній сторінці /granty
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy hover:bg-navy-light text-white font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Зберегти
        </button>
        {mode === "create" && (
          <button
            type="button"
            onClick={(e) => submit(e, "APPROVED")}
            disabled={submitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-success/10 hover:bg-success/20 text-success font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            Зберегти і опублікувати
          </button>
        )}
        <button
          type="button"
          onClick={() => router.back()}
          className="px-5 py-2.5 text-text-light hover:text-text font-medium rounded-lg transition-colors"
        >
          Скасувати
        </button>
      </div>
    </form>
  );
}
