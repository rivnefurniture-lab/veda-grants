import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdminApi } from "@/lib/admin-auth";

const allowedStatuses = ["PENDING", "APPROVED", "REJECTED"] as const;

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi();
  if (!auth.ok) return auth.response;

  try {
    const body = await request.json();
    const required = ["title", "description", "sourceUrl"];
    for (const key of required) {
      if (!body[key] || String(body[key]).trim().length === 0) {
        return NextResponse.json(
          { error: `Поле "${key}" обов'язкове` },
          { status: 400 }
        );
      }
    }

    const status = allowedStatuses.includes(body.status) ? body.status : "PENDING";
    const deadline = body.deadline ? new Date(body.deadline) : null;

    const existing = await prisma.grant.findUnique({
      where: { sourceUrl: body.sourceUrl.trim() },
    });
    if (existing) {
      return NextResponse.json(
        { error: "Грант з таким посиланням вже існує", existingId: existing.id },
        { status: 409 }
      );
    }

    const grant = await prisma.grant.create({
      data: {
        title: String(body.title).trim(),
        description: String(body.description).trim(),
        fullText: body.fullText ? String(body.fullText).trim() : null,
        amount: body.amount ? String(body.amount).trim() : null,
        amountUsd:
          body.amountUsd === null || body.amountUsd === "" || body.amountUsd === undefined
            ? null
            : Number(body.amountUsd),
        deadline,
        sourceUrl: String(body.sourceUrl).trim(),
        originalUrl: body.originalUrl ? String(body.originalUrl).trim() : null,
        source: body.source ? String(body.source).trim() : "Ручне додавання",
        category: body.category ? String(body.category).trim() : null,
        region: body.region ? String(body.region).trim() : null,
        sphere: body.sphere ? String(body.sphere).trim() : null,
        imageUrl: body.imageUrl ? String(body.imageUrl).trim() : null,
        status,
        score: Number(body.score ?? 0),
        publishedAt: status === "APPROVED" ? new Date() : null,
      },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/granty");
    revalidatePath("/granty");

    return NextResponse.json({ success: true, grant }, { status: 201 });
  } catch (error) {
    console.error("Grant create error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Помилка створення" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const auth = await requireAdminApi();
  if (!auth.ok) return auth.response;

  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ error: "id та status обов'язкові" }, { status: 400 });
    }
    if (!["APPROVED", "REJECTED", "PENDING"].includes(status)) {
      return NextResponse.json({ error: "Невірний статус" }, { status: 400 });
    }

    const data: { status: string; publishedAt?: Date } = { status };
    if (status === "APPROVED") data.publishedAt = new Date();

    const grant = await prisma.grant.update({ where: { id }, data });

    revalidatePath("/admin");
    revalidatePath("/admin/granty");
    revalidatePath("/granty");

    return NextResponse.json({ success: true, grant });
  } catch (error) {
    console.error("Grant update error:", error);
    return NextResponse.json({ error: "Помилка оновлення гранту" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAdminApi();
  if (!auth.ok) return auth.response;

  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: "id обов'язковий" }, { status: 400 });
    await prisma.grant.delete({ where: { id } });
    revalidatePath("/admin");
    revalidatePath("/admin/granty");
    revalidatePath("/granty");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Grant delete error:", error);
    return NextResponse.json({ error: "Помилка видалення гранту" }, { status: 500 });
  }
}
