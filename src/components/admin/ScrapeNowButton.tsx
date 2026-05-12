"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Loader2, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

type Result = {
  ok: boolean;
  // scrape
  total?: number;
  created?: number;
  skipped?: number;
  enriched?: number;
  rejectedAsNotGrant?: number;
  // re-enrich
  processed?: number;
  rejected?: number;
  errorCount?: number;
  // common
  errors?: string[];
  error?: string;
  mode?: "scrape" | "enrich";
};

export function ScrapeNowButton() {
  const router = useRouter();
  const [loading, setLoading] = useState<null | "scrape" | "enrich">(null);
  const [result, setResult] = useState<Result | null>(null);

  const run = async (mode: "scrape" | "enrich") => {
    setLoading(mode);
    setResult(null);
    try {
      const url = mode === "scrape" ? "/api/cron/scrape-grants" : "/api/admin/enrich";
      const res = await fetch(url, { method: "POST" });
      const data = await res.json();
      setResult({ ...data, mode });
      if (data.ok) router.refresh();
    } catch (err) {
      setResult({
        ok: false,
        mode,
        error: err instanceof Error ? err.message : "Помилка мережі",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => run("enrich")}
          disabled={loading !== null}
          className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 hover:border-gold/40 text-text font-medium rounded-lg transition-colors disabled:opacity-50 text-sm"
          title="AI поліпшує опис, витягує суму/дедлайн/категорію для вже зібраних грантів"
        >
          {loading === "enrich" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4 text-gold" />
          )}
          {loading === "enrich" ? "AI обробляє..." : "AI: поліпшити існуючі"}
        </button>
        <button
          type="button"
          onClick={() => run("scrape")}
          disabled={loading !== null}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-navy/30 text-text font-medium rounded-lg transition-colors disabled:opacity-50"
          title="Запустити збір грантів зараз. Зазвичай це робиться автоматично щодня."
        >
          {loading === "scrape" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          {loading === "scrape" ? "Збираємо..." : "Зібрати нові гранти"}
        </button>
      </div>

      {result && (
        <div
          className={`text-xs px-3 py-2 rounded-lg max-w-md ${
            result.ok ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
          }`}
        >
          {result.ok ? (
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
              <div>
                {result.mode === "enrich" ? (
                  <>
                    Оброблено AI: {result.processed ?? 0}, поліпшено: {result.enriched ?? 0},
                    відхилено (не гранти): {result.rejected ?? 0}
                    {(result.errorCount ?? 0) > 0 && `, помилок: ${result.errorCount}`}
                  </>
                ) : (
                  <>
                    Знайдено: {result.total ?? 0}, нових: {result.created ?? 0},
                    {result.enriched !== undefined && ` оброблено AI: ${result.enriched},`}
                    {result.rejectedAsNotGrant !== undefined &&
                      ` відсіяно (не гранти): ${result.rejectedAsNotGrant},`}{" "}
                    пропущено (дублі): {result.skipped ?? 0}
                    {result.errors && result.errors.length > 0 && (
                      <div className="text-text-light mt-1">
                        Помилки джерел: {result.errors.join("; ")}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <div>{result.error || "Не вдалося запустити"}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
