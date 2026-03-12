import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { CheckCircle, Mail, Phone, Building2, Clock } from "lucide-react";

async function markAsRead(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.contactLead.update({
    where: { id },
    data: { read: true },
  });
  revalidatePath("/admin/leads");
}

export default async function LeadsPage() {
  const leads = await prisma.contactLead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-text mb-6">Заявки з сайту</h1>

      {leads.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-xl p-12 text-center">
          <p className="text-text-light">Заявок поки немає</p>
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className={`bg-white border rounded-xl p-5 shadow-sm transition-colors ${
                lead.read
                  ? "border-gray-100 opacity-75"
                  : "border-gold/30 bg-gold/[0.02]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-text">
                      {lead.name}
                    </h3>
                    {!lead.read && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gold/10 text-gold">
                        Нова
                      </span>
                    )}
                    {lead.read && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-text-light">
                        Прочитано
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-text-light">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" />
                      {lead.email}
                    </span>
                    {lead.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5" />
                        {lead.phone}
                      </span>
                    )}
                    {lead.company && (
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3.5 w-3.5" />
                        {lead.company}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {new Date(lead.createdAt).toLocaleString("uk-UA", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  {lead.message && (
                    <p className="text-sm text-text-light mt-3 whitespace-pre-wrap leading-relaxed">
                      {lead.message}
                    </p>
                  )}
                </div>

                {!lead.read && (
                  <form action={markAsRead} className="shrink-0">
                    <input type="hidden" name="id" value={lead.id} />
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy/10 text-navy hover:bg-navy/20 transition-colors text-sm font-medium"
                      title="Позначити як прочитану"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Прочитано
                    </button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
