export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type GrantStatus = "PENDING" | "APPROVED" | "REJECTED";
import {
  Check,
  X,
  Trash2,
  ExternalLink,
  Calendar,
  TrendingUp,
} from "lucide-react";

async function approveGrant(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.grant.update({
    where: { id },
    data: { status: "APPROVED", publishedAt: new Date() },
  });
  revalidatePath("/admin/granty");
}

async function rejectGrant(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.grant.update({
    where: { id },
    data: { status: "REJECTED" },
  });
  revalidatePath("/admin/granty");
}

async function deleteGrant(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.grant.delete({ where: { id } });
  revalidatePath("/admin/granty");
}

const tabs: { label: string; status: GrantStatus }[] = [
  { label: "Очікують", status: "PENDING" },
  { label: "Схвалені", status: "APPROVED" },
  { label: "Відхилені", status: "REJECTED" },
];

export default async function GrantsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const currentStatus = (params.status as GrantStatus) || "PENDING";

  const grants = await prisma.grant.findMany({
    where: { status: currentStatus },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-text mb-6">
        Управління грантами
      </h1>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-6 w-fit">
        {tabs.map((tab) => (
          <a
            key={tab.status}
            href={`/admin/granty?status=${tab.status}`}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentStatus === tab.status
                ? "bg-white text-text shadow-sm"
                : "text-text-light hover:text-text"
            }`}
          >
            {tab.label}
          </a>
        ))}
      </div>

      {/* Grants list */}
      {grants.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-xl p-12 text-center">
          <p className="text-text-light">
            Немає грантів зі статусом &quot;
            {tabs.find((t) => t.status === currentStatus)?.label}
            &quot;
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {grants.map((grant) => (
            <div
              key={grant.id}
              className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-text truncate">
                      {grant.title}
                    </h3>
                    {grant.sourceUrl && (
                      <a
                        href={grant.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-light hover:text-navy transition-colors shrink-0"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-text-light">
                    {grant.source && <span>{grant.source}</span>}
                    {grant.amount && (
                      <span className="font-medium text-text">
                        {grant.amount}
                      </span>
                    )}
                    {grant.deadline && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(grant.deadline).toLocaleDateString("uk-UA")}
                      </span>
                    )}
                    {grant.score !== null && grant.score !== undefined && (
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-3.5 w-3.5" />
                        Оцінка: {grant.score}
                      </span>
                    )}
                  </div>

                  {grant.description && (
                    <p className="text-sm text-text-light mt-2 line-clamp-2">
                      {grant.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {currentStatus !== "APPROVED" && (
                    <form action={approveGrant}>
                      <input type="hidden" name="id" value={grant.id} />
                      <button
                        type="submit"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors text-sm font-medium"
                        title="Схвалити"
                      >
                        <Check className="h-4 w-4" />
                        Схвалити
                      </button>
                    </form>
                  )}
                  {currentStatus !== "REJECTED" && (
                    <form action={rejectGrant}>
                      <input type="hidden" name="id" value={grant.id} />
                      <button
                        type="submit"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-danger/10 text-danger hover:bg-danger/20 transition-colors text-sm font-medium"
                        title="Відхилити"
                      >
                        <X className="h-4 w-4" />
                        Відхилити
                      </button>
                    </form>
                  )}
                  <form action={deleteGrant}>
                    <input type="hidden" name="id" value={grant.id} />
                    <button
                      type="submit"
                      className="p-1.5 rounded-lg text-text-light hover:bg-danger/10 hover:text-danger transition-colors"
                      title="Видалити"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
