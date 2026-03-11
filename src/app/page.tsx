import { prisma } from "@/lib/prisma";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { GrantsPreview } from "@/components/home/GrantsPreview";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

export default async function HomePage() {
  const grants = await prisma.grant.findMany({
    where: {
      status: "APPROVED",
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
    select: {
      id: true,
      title: true,
      description: true,
      amount: true,
      deadline: true,
      category: true,
      source: true,
      sphere: true,
    },
  });

  return (
    <main>
      <HeroSection />
      <StatsSection />
      <ServicesPreview />
      <GrantsPreview grants={grants} />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
