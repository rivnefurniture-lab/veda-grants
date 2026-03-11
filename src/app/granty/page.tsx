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
        <div className="absolute inset-0 opacity-[0.05]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, rgba(249,168,37,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(249,168,37,0.1) 0%, transparent 50%)",
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-gold text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Каталог грантів
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Гранти та{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
                можливості
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-8">
              Актуальні грантові програми для українського бізнесу
            </p>
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl glass text-white font-medium">
              <span className="text-gold font-bold text-lg">{grants.length}</span>
              <span className="text-white/80">
                {grants.length === 1
                  ? "активний грант"
                  : grants.length >= 2 && grants.length <= 4
                    ? "активні гранти"
                    : "активних грантів"}
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream to-transparent" />
      </section>

      {/* Catalog */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <GrantsCatalog grants={grants} />
        </div>
      </section>
    </>
  );
}
