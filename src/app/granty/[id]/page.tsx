import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { GrantDetail } from "@/components/grants/GrantDetail";

interface GrantPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: GrantPageProps) {
  const { id } = await params;
  const grant = await prisma.grant.findUnique({
    where: { id },
    select: { title: true, description: true },
  });

  if (!grant) {
    return { title: "Грант не знайдено | ВЕДА" };
  }

  return {
    title: `${grant.title} | ВЕДА`,
    description: grant.description,
  };
}

export default async function GrantPage({ params }: GrantPageProps) {
  const { id } = await params;

  const grant = await prisma.grant.findUnique({
    where: { id },
  });

  if (!grant) {
    notFound();
  }

  // Fetch related grants (same category, excluding current)
  const relatedGrants = await prisma.grant.findMany({
    where: {
      status: "APPROVED",
      id: { not: grant.id },
      OR: [
        { deadline: { gte: new Date() } },
        { deadline: null },
      ],
      ...(grant.category ? { category: grant.category } : {}),
    },
    take: 3,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      amount: true,
      category: true,
      deadline: true,
    },
  });

  return <GrantDetail grant={grant} relatedGrants={relatedGrants} />;
}
