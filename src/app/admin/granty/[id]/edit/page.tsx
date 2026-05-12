import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { GrantForm, type GrantFormData } from "@/components/admin/GrantForm";

export const dynamic = "force-dynamic";

export default async function EditGrantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const grant = await prisma.grant.findUnique({ where: { id } });
  if (!grant) notFound();

  const initial: Partial<GrantFormData> = {
    id: grant.id,
    title: grant.title,
    description: grant.description,
    fullText: grant.fullText || "",
    amount: grant.amount || "",
    amountUsd: grant.amountUsd,
    deadline: grant.deadline ? grant.deadline.toISOString().slice(0, 10) : "",
    sourceUrl: grant.sourceUrl,
    source: grant.source,
    category: grant.category || "",
    region: grant.region || "",
    sphere: grant.sphere || "",
    imageUrl: grant.imageUrl || "",
    status: grant.status,
    score: grant.score,
  };

  return (
    <div>
      <Link
        href="/admin/granty"
        className="inline-flex items-center gap-1 text-sm text-text-light hover:text-text mb-3"
      >
        <ChevronLeft className="w-4 h-4" />
        Назад до списку
      </Link>
      <h1 className="text-2xl font-bold text-text mb-2">Редагувати грант</h1>
      <p className="text-sm text-text-light mb-6">
        Внесіть зміни та натисніть &quot;Зберегти&quot;. Щоб грант з&apos;явився
        на сайті, оберіть статус &quot;Опублікований&quot;.
      </p>
      <GrantForm mode="edit" initial={initial} />
    </div>
  );
}
