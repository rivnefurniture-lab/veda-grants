import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function PUT(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "id обов'язковий" },
        { status: 400 }
      );
    }

    const lead = await prisma.contactLead.update({
      where: { id },
      data: { read: true },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/leads");

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error("Lead update error:", error);
    return NextResponse.json(
      { error: "Помилка оновлення заявки" },
      { status: 500 }
    );
  }
}
