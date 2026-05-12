import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function getAdminUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return null;

  try {
    const user = await prisma.adminUser.findUnique({
      where: { id: token },
      select: { id: true, email: true, name: true },
    });
    return user;
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const user = await getAdminUser();
  if (!user) redirect("/admin");
  return user;
}

export async function requireAdminApi() {
  const user = await getAdminUser();
  if (!user) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Не авторизовано" }, { status: 401 }),
    };
  }
  return { ok: true as const, user };
}
