import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  Check,
  X,
  Trash2,
  ExternalLink,
  Calendar,
  TrendingUp,
  Pencil,
  Plus,
} from "lucide-react";
import { requireAdmin } from "@/lib/admin-auth";
import { ScrapeNowButton } from "@/components/admin/ScrapeNowButton";

type GrantStatus = "PENDING" | "APPROVED" | "REJECTED";

export const dynamic = "force-dynamic";

async function approveGrant(formData: FormData) {
  "use server";
  await requireAdmin();
  const id = formData.get("id") as string;
  await prisma.grant.update({
    where: { id },
    data: { status: "APPROVED", publishedAt: new Date() },
  });
  revalidatePath("/admin/granty");
  revalidatePath("/granty");
}

async function rejectGrant(formData: FormData) {
  "use server";
  await requireAdmin();
  const id = formData.get("id") as string;
  await prisma.grant.update({
    where: { id },
    data: { status: "REJECTED" },
  });
  revalidatePath("/admin/granty");
  revalidatePath("/granty");
}

async function deleteGrant(formData: FormData) {
  "use server";
  await requireAdmin();
  const id = formData.get("id") as string;
  await prisma.grant.delete({ where: { id } });
  revalidatePath("/admin/granty");
  revalidatePath("/granty");
}

const tabs: { label: string; status: GrantStatus }[] = [
  { label: "Очікують", status: "PENDING" },
  { label: "Опубліковані", status: "APPROVED" },
  { label: "Відхилені", status: "REJECTED" },
];

export default async function GrantsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const currentStatus = (params.status as GrantStatus) || "PENDING";

  const [grants, counts] = await Promise.all([
    prisma.grant.findMany({
      where: { status: currentStatus },
      orderBy: { createdAt: "desc" },
    }),
    prisma.grant.groupBy({
      by: ["status"],
      _count: { _all: true },
    }),
  ]);

  const countByStatus = Object.fromEntries(
    counts.map((c) => [c.status, c._count._all])
  ) as Record<GrantStatus, number>;

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-text">Управління грантами</h1>
        <div className="flex flex-wrap items-start gap-3">
          <ScrapeNowButton />
          <Link
            href="/admin/granty/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold hover:bg-gold-light text-white font-medium rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Додати грант
          </Link>
        </div>
      </div>

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
            <span className="ml-2 text-xs text-text-light">
              {countByStatus[tab.status] ?? 0}
            </span>
          </a>
        ))}
      </div>

      {grants.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-xl p-12 text-center">
          <p className="text-text-light">
            Немає грантів у цій категорії
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
                    <h3 className="text-base font-semibold text-text">
                      {grant.title}
                    </h3>
                    {grant.sourceUrl && (
                      <a
                        href={grant.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-light hover:text-navy transition-colors shrink-0"
                        title="Відкрити оригінал у новій вкладці"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-text-light">
                    {grant.source && <span>{grant.source}</span>}
                    {grant.category && (
                      <span className="px-2 py-0.5 bg-navy/5 text-navy rounded-full text-xs font-medium">
                        {grant.category}
                      </span>
                    )}
                    {grant.amount && (
                      <span className="font-medium text-text">{grant.amount}</span>
                    )}
                    {grant.deadline && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(grant.deadline).toLocaleDateString("uk-UA")}
                      </span>
                    )}
                    {grant.score > 0 && (
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-3.5 w-3.5" />
                        {grant.score}
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
                  <Link
                    href={`/admin/granty/${grant.id}/edit`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy/5 text-navy hover:bg-navy/10 transition-colors text-sm font-medium"
                    title="Редагувати"
                  >
                    <Pencil className="h-4 w-4" />
                    Редагувати
                  </Link>
                  {currentStatus !== "APPROVED" && (
                    <form action={approveGrant}>
                      <input type="hidden" name="id" value={grant.id} />
                      <button
                        type="submit"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors text-sm font-medium"
                        title="Опублікувати на сайті"
                      >
                        <Check className="h-4 w-4" />
                        Опублікувати
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
                      title="Видалити назавжди"
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
