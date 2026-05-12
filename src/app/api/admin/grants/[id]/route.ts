import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/admin-auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApi();
  if (!auth.ok) return auth.response;
  const { id } = await params;

  try {
    const body = await request.json();
    const allowedKeys = [
      "title",
      "description",
      "fullText",
      "amount",
      "amountUsd",
      "deadline",
      "sourceUrl",
      "source",
      "category",
      "region",
      "sphere",
      "imageUrl",
      "status",
      "score",
    ] as const;

    const data: Record<string, unknown> = {};
    for (const key of allowedKeys) {
      if (key in body) data[key] = body[key];
    }

    if ("deadline" in data) {
      data.deadline = data.deadline ? new Date(data.deadline as string) : null;
    }
    if ("amountUsd" in data) {
      const v = data.amountUsd;
      data.amountUsd = v === null || v === "" ? null : Number(v);
    }

    const current = await prisma.grant.findUnique({ where: { id } });
    if (!current) {
      return NextResponse.json({ error: "Грант не знайдено" }, { status: 404 });
    }

    if (data.status === "APPROVED" && current.status !== "APPROVED") {
      data.publishedAt = new Date();
    }

    const grant = await prisma.grant.update({ where: { id }, data });

    revalidatePath("/admin");
    revalidatePath("/admin/granty");
    revalidatePath("/granty");

    return NextResponse.json({ success: true, grant });
  } catch (error) {
    console.error("Grant patch error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Помилка оновлення" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApi();
  if (!auth.ok) return auth.response;
  const { id } = await params;

  try {
    await prisma.grant.delete({ where: { id } });
    revalidatePath("/admin");
    revalidatePath("/admin/granty");
    revalidatePath("/granty");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Grant delete error:", error);
    return NextResponse.json(
      { error: "Помилка видалення" },
      { status: 500 }
    );
  }
}
