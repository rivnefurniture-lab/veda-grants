import { prisma } from "@/lib/prisma";
import { GrantsCatalog } from "@/components/grants/GrantsCatalog";
import { BookOpen } from "lucide-react";

export const metadata = {
  title: "Гранти та можливості | ВЕДА",
  description:
    "Актуальні грантові програми для українського бізнесу. Пошук грантів, фільтрація за категоріями та регіонами.",
};

export default async function GrantsPage() {
  const grants = await prisma.grant.findMany({
    where: {
      status: "APPROVED",
    },
    orderBy: {
      publishedAt: "desc",
    },
    select: {
      id: true,
      title: true,
      description: true,
      amount: true,
      deadline: true,
      category: true,
      source: true,
      sphere: true,
      region: true,
      sourceUrl: true,
      publishedAt: true,
    },
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-navy" />
        <div className="absolute inset-0 hero-grid-pattern" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/[0.03] blur-[80px]" />

        <div className="relative z-10 py-20 sm:py-28">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-8">
              <BookOpen className="w-4 h-4" />
              Каталог грантів
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Гранти та{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
                можливості
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-8">
              Актуальні грантові програми для українського бізнесу
            </p>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white font-medium">
              <span className="text-gold font-bold text-lg">{grants.length}</span>
              <span className="text-white/60">
                {grants.length === 1
                  ? "активний грант"
                  : grants.length >= 2 && grants.length <= 4
                    ? "активні гранти"
                    : "активних грантів"}
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
      </section>

      {/* Catalog */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GrantsCatalog grants={grants} />
        </div>
      </section>
    </>
  );
}
