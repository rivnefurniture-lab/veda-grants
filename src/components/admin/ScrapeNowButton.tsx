"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type Result = {
  ok: boolean;
  total?: number;
  created?: number;
  skipped?: number;
  errors?: string[];
  error?: string;
};

export function ScrapeNowButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const runScrape = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/cron/scrape-grants", { method: "POST" });
      const data = await res.json();
      setResult(data);
      if (data.ok && data.created > 0) router.refresh();
    } catch (err) {
      setResult({
        ok: false,
        error: err instanceof Error ? err.message : "Помилка мережі",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={runScrape}
        disabled={loading}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-navy/30 text-text font-medium rounded-lg transition-colors disabled:opacity-50"
        title="Запустити збір грантів зараз. Зазвичай це робиться автоматично щодня."
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        {loading ? "Збираємо..." : "Зібрати нові гранти"}
      </button>

      {result && (
        <div
          className={`text-xs px-3 py-2 rounded-lg max-w-md ${
            result.ok
              ? "bg-success/10 text-success"
              : "bg-danger/10 text-danger"
          }`}
        >
          {result.ok ? (
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
              <div>
                Знайдено: {result.total ?? 0}, нових: {result.created ?? 0},
                пропущено: {result.skipped ?? 0}
                {result.errors && result.errors.length > 0 && (
                  <div className="text-text-light mt-1">
                    Помилки джерел: {result.errors.join("; ")}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <div>{result.error || "Не вдалося запустити збір"}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
