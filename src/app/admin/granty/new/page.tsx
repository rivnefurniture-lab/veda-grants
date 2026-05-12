import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { requireAdmin } from "@/lib/admin-auth";
import { GrantForm } from "@/components/admin/GrantForm";

export const dynamic = "force-dynamic";

export default async function NewGrantPage() {
  await requireAdmin();

  return (
    <div>
      <Link
        href="/admin/granty"
        className="inline-flex items-center gap-1 text-sm text-text-light hover:text-text mb-3"
      >
        <ChevronLeft className="w-4 h-4" />
        Назад до списку
      </Link>
      <h1 className="text-2xl font-bold text-text mb-2">Додати грант вручну</h1>
      <p className="text-sm text-text-light mb-6">
        Заповніть інформацію про грант. Поля з зірочкою (*) обов&apos;язкові.
      </p>
      <GrantForm mode="create" />
    </div>
  );
}
