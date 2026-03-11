import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function PUT(request: NextRequest) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "id та status обов'язкові" },
        { status: 400 }
      );
    }

    if (!["APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json(
        { error: "Невірний статус" },
        { status: 400 }
      );
    }

    const data: { status: string; publishedAt?: Date } = { status };

    if (status === "APPROVED") {
      data.publishedAt = new Date();
    }

    const grant = await prisma.grant.update({
      where: { id },
      data,
    });

    revalidatePath("/admin");
    revalidatePath("/admin/granty");

    return NextResponse.json({ success: true, grant });
  } catch (error) {
    console.error("Grant update error:", error);
    return NextResponse.json(
      { error: "Помилка оновлення гранту" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "id обов'язковий" },
        { status: 400 }
      );
    }

    await prisma.grant.delete({ where: { id } });

    revalidatePath("/admin");
    revalidatePath("/admin/granty");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Grant delete error:", error);
    return NextResponse.json(
      { error: "Помилка видалення гранту" },
      { status: 500 }
    );
  }
}
