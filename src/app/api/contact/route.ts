import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

const CONTACT_TO = process.env.CONTACT_TO_EMAIL || "agency.weda@gmail.com";
const CONTACT_FROM = process.env.CONTACT_FROM_EMAIL || "WEDA <onboarding@resend.dev>";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendLeadEmail(lead: {
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
}) {
  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping email notification");
    return;
  }

  const rows = [
    ["Ім'я", lead.name],
    ["Email", lead.email],
    ["Телефон", lead.phone || "—"],
    ["Компанія", lead.company || "—"],
  ];

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1a1a1a;">
      <h2 style="margin: 0 0 16px; color: #0D1846;">Нова заявка з сайту WEDA</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding: 8px 12px; background: #f5f5f5; font-weight: 600; width: 130px; border-bottom: 1px solid #eee;">${escapeHtml(label)}</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${escapeHtml(value)}</td>
          </tr>`
          )
          .join("")}
      </table>
      <div style="background: #fafafa; padding: 16px; border-radius: 8px; border-left: 3px solid #D4A574;">
        <div style="font-weight: 600; margin-bottom: 8px;">Повідомлення:</div>
        <div style="white-space: pre-wrap; line-height: 1.5;">${escapeHtml(lead.message)}</div>
      </div>
      <p style="margin-top: 24px; font-size: 12px; color: #888;">Натисніть Reply, щоб відповісти безпосередньо ${escapeHtml(lead.email)}.</p>
    </div>
  `;

  const text = [
    "Нова заявка з сайту WEDA",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Повідомлення:",
    lead.message,
  ].join("\n");

  try {
    await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: lead.email,
      subject: `Заявка з сайту: ${lead.name}`,
      html,
      text,
    });
  } catch (err) {
    console.error("Resend email error:", err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, phone, company, message } = body;

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

    const lead = {
      name: name.trim(),
      email: email.trim(),
      phone: phone ? String(phone).trim() : null,
      company: company ? String(company).trim() : null,
      message: message.trim(),
    };

    await prisma.contactLead.create({
      data: { ...lead, source: "contact_form" },
    });

    await sendLeadEmail(lead);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Внутрішня помилка сервера. Спробуйте пізніше." },
      { status: 500 }
    );
  }
}
