export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  FileText,
  Clock,
  CheckCircle,
  MessageSquare,
  Check,
  X,
} from "lucide-react";

async function approveGrant(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.grant.update({
    where: { id },
    data: { status: "APPROVED", publishedAt: new Date() },
  });
  revalidatePath("/admin");
}

async function rejectGrant(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.grant.update({
    where: { id },
    data: { status: "REJECTED" },
  });
  revalidatePath("/admin");
}

export default async function AdminDashboard() {
  const [totalGrants, pendingGrants, approvedGrants, unreadLeads] =
    await Promise.all([
      prisma.grant.count(),
      prisma.grant.count({ where: { status: "PENDING" } }),
      prisma.grant.count({ where: { status: "APPROVED" } }),
      prisma.contactLead.count({ where: { read: false } }),
    ]);

  const recentPending = await prisma.grant.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const recentLeads = await prisma.contactLead.findMany({
    where: { read: false },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const stats = [
    {
      label: "Всього грантів",
      value: totalGrants,
      icon: FileText,
      color: "text-navy",
      bg: "bg-navy/10",
    },
    {
      label: "Очікують модерації",
      value: pendingGrants,
      icon: Clock,
      color: "text-gold",
      bg: "bg-gold/10",
    },
    {
      label: "Схвалено",
      value: approvedGrants,
      icon: CheckCircle,
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      label: "Контактні заявки",
      value: unreadLeads,
      icon: MessageSquare,
      color: "text-danger",
      bg: "bg-danger/10",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-text mb-6">Панель керування</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`${stat.bg} p-2.5 rounded-lg`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-text">{stat.value}</p>
              <p className="text-sm text-text-light mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent pending grants */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-text">
              Очікують модерації
            </h2>
          </div>
          <div className="divide-y divide-gray-50">
            {recentPending.length === 0 ? (
              <div className="px-5 py-8 text-center text-text-light">
                Немає грантів на модерації
              </div>
            ) : (
              recentPending.map((grant) => (
                <div
                  key={grant.id}
                  className="px-5 py-3.5 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text truncate">
                      {grant.title}
                    </p>
                    <p className="text-xs text-text-light mt-0.5">
                      {grant.source}
                      {grant.amount ? ` · ${grant.amount}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <form action={approveGrant}>
                      <input type="hidden" name="id" value={grant.id} />
                      <button
                        type="submit"
                        className="p-1.5 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors"
                        title="Схвалити"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    </form>
                    <form action={rejectGrant}>
                      <input type="hidden" name="id" value={grant.id} />
                      <button
                        type="submit"
                        className="p-1.5 rounded-lg bg-danger/10 text-danger hover:bg-danger/20 transition-colors"
                        title="Відхилити"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent leads */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-text">Нові заявки</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {recentLeads.length === 0 ? (
              <div className="px-5 py-8 text-center text-text-light">
                Немає нових заявок
              </div>
            ) : (
              recentLeads.map((lead) => (
                <div key={lead.id} className="px-5 py-3.5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-text">{lead.name}</p>
                    <span className="text-xs text-text-light">
                      {new Date(lead.createdAt).toLocaleDateString("uk-UA")}
                    </span>
                  </div>
                  <p className="text-xs text-text-light mt-0.5">
                    {lead.email}
                    {lead.phone ? ` · ${lead.phone}` : ""}
                  </p>
                  {lead.message && (
                    <p className="text-xs text-text-light mt-1 line-clamp-2">
                      {lead.message}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
