import { NextRequest, NextResponse } from "next/server";
import { scrapeAll } from "@/lib/scrapers";
import { getAdminUser } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

async function isAuthorized(request: NextRequest): Promise<boolean> {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const header = request.headers.get("authorization");
    if (header === `Bearer ${secret}`) return true;
  }
  const admin = await getAdminUser();
  if (admin) return true;
  return false;
}

async function run() {
  const result = await scrapeAll();
  revalidatePath("/admin");
  revalidatePath("/admin/granty");
  return result;
}

export async function GET(request: NextRequest) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const result = await run();
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Scrape error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Scrape failed" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
