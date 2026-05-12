import { NextRequest, NextResponse } from "next/server";
import { enrichExistingPending } from "@/lib/scrapers";
import { isEnrichmentEnabled } from "@/lib/scrapers/enrich";
import { requireAdminApi } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function POST(_request: NextRequest) {
  const auth = await requireAdminApi();
  if (!auth.ok) return auth.response;

  if (!isEnrichmentEnabled()) {
    return NextResponse.json(
      {
        ok: false,
        error: "ANTHROPIC_API_KEY не встановлено. Додайте ключ у Vercel env vars.",
      },
      { status: 400 }
    );
  }

  try {
    const result = await enrichExistingPending(100);
    revalidatePath("/admin");
    revalidatePath("/admin/granty");
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Re-enrich error:", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Помилка" },
      { status: 500 }
    );
  }
}
