import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdminApi } from "@/lib/admin-auth";

export async function PUT(request: NextRequest) {
  const auth = await requireAdminApi();
  if (!auth.ok) return auth.response;
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
