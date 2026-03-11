import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, phone, company, message } = body;

    // Validate required fields
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Ім'я є обов'язковим полем" },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || email.trim().length === 0) {
      return NextResponse.json(
        { error: "Email є обов'язковим полем" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Невірний формат email" },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Повідомлення є обов'язковим полем" },
        { status: 400 }
      );
    }

    // Create the contact lead
    await prisma.contactLead.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        phone: phone ? String(phone).trim() : null,
        company: company ? String(company).trim() : null,
        message: message.trim(),
        source: "contact_form",
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Внутрішня помилка сервера. Спробуйте пізніше." },
      { status: 500 }
    );
  }
}
