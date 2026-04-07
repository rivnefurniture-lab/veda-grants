"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Calendar,
  MapPin,
  ArrowUpDown,
  SlidersHorizontal,
  MessageSquare,
  ArrowRight,
  Clock,
  Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDeadline, formatAmount } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Grant = {
  id: string;
  title: string;
  description: string;
  amount: string | null;
  deadline: Date | string | null;
  category: string | null;
  source: string;
  sphere: string | null;
  region: string | null;
  sourceUrl: string;
  publishedAt: Date | string | null;
};

type SortOption = "date" | "amount";

interface GrantsCatalogProps {
  grants: Grant[];
}

export function GrantsCatalog({ grants }: GrantsCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("Всі");
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const revealRef = useScrollReveal();

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(grants.map((g) => g.category).filter(Boolean))
    ) as string[];
    return ["Всі", ...uniqueCategories.sort()];
  }, [grants]);

  const filteredGrants = useMemo(() => {
    let result = [...grants];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (grant) =>
          grant.title.toLowerCase().includes(query) ||
          grant.description.toLowerCase().includes(query) ||
          (grant.source && grant.source.toLowerCase().includes(query)) ||
          (grant.region && grant.region.toLowerCase().includes(query)) ||
          (grant.sphere && grant.sphere.toLowerCase().includes(query))
      );
    }

    if (activeCategory !== "Всі") {
      result = result.filter((grant) => grant.category === activeCategory);
    }

    if (sortBy === "date") {
      result.sort((a, b) => {
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return dateB - dateA;
      });
    } else if (sortBy === "amount") {
      result.sort((a, b) => {
        const extractNumber = (amount: string | null): number => {
          if (!amount) return 0;
          const match = amount.replace(/\s/g, "").match(/[\d,]+/);
          return match ? parseFloat(match[0].replace(/,/g, "")) : 0;
        };
        return extractNumber(b.amount) - extractNumber(a.amount);
      });
    }

    return result;
  }, [grants, searchQuery, activeCategory, sortBy]);

  return (
    <div ref={revealRef}>
      {/* Search & Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 reveal">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light" />
          <input
            type="text"
            placeholder="Пошук за назвою, джерелом, регіоном..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl border border-gray-200 text-text placeholder:text-text-light/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all shadow-sm"
          />
        </div>

        <div className="relative">
          <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="appearance-none pl-11 pr-10 py-3.5 bg-white rounded-xl border border-gray-200 text-text focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all cursor-pointer shadow-sm"
          >
            <option value="date">За датою</option>
            <option value="amount">За сумою</option>
          </select>
          <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light pointer-events-none" />
        </div>
      </div>

      {/* Category filter buttons */}
      <div className="flex flex-wrap gap-2 mb-10 reveal">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              activeCategory === category
                ? "bg-navy text-white shadow-md shadow-navy/20"
                : "bg-white text-text-light border border-gray-200 hover:border-gold/40 hover:text-gold-dark hover:shadow-sm"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-text-light text-sm mb-6 reveal">
        {filteredGrants.length === 0
          ? "Нічого не знайдено"
          : `Знайдено ${filteredGrants.length} ${
              filteredGrants.length === 1
                ? "грант"
                : filteredGrants.length >= 2 && filteredGrants.length <= 4
                  ? "гранти"
                  : "грантів"
            }`}
      </p>

      {/* Grants grid */}
      {filteredGrants.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredGrants.map((grant, index) => (
            <GrantCard key={grant.id} grant={grant} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 glass-card rounded-2xl reveal">
          <Search className="w-12 h-12 text-text-light/30 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-text mb-2">
            Грантів не знайдено
          </h3>
          <p className="text-text-light text-sm max-w-md mx-auto">
            Спробуйте змінити параметри пошуку або оберіть іншу категорію
          </p>
        </div>
      )}

      {/* CTA Section */}
      <div className="mt-16 rounded-3xl gradient-navy p-8 sm:p-12 text-center relative overflow-hidden reveal">
        <div className="absolute inset-0 hero-grid-pattern" />
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold/[0.04] blur-[60px]" />
        <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-gold/[0.03] blur-[60px]" />

        <div className="relative z-10">
          <MessageSquare className="w-10 h-10 text-gold mx-auto mb-4" />
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-heading">
            Не знайшли потрібний грант?
          </h3>
          <p className="text-white/50 max-w-xl mx-auto mb-8 text-lg">
            Наші консультанти допоможуть підібрати оптимальну грантову програму
            саме для вашого бізнесу
          </p>
          <Link
            href="/kontakty"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gold hover:bg-gold-light text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-gold/20 hover:shadow-xl hover:-translate-y-0.5"
          >
            Отримати консультацію
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function extractKeywords(description: string): string[] {
  const keywords: string[] = [];
  const text = description.toLowerCase();

  const patterns: [RegExp, string][] = [
    [/стартап/i, "Стартапи"],
    [/малий бізнес|малого бізнесу|мсб|фоп|підприємц/i, "Малий бізнес"],
    [/жін/i, "Для жінок"],
    [/ветеран/i, "Для ветеранів"],
    [/молод/i, "Для молоді"],
    [/впо|переміщен/i, "Для ВПО"],
    [/інвалідніст|інклюзив/i, "Інклюзія"],
    [/школ|освіт|навчан/i, "Освіта"],
    [/менторств|акселерат/i, "Менторство"],
    [/обладнанн/i, "Обладнання"],
    [/сертифікац/i, "Сертифікація"],
    [/експорт|міжнародн/i, "Експорт"],
    [/ai|штучн|машинн/i, "AI"],
    [/блокчейн|crypto/i, "Blockchain"],
    [/iot|інтернет речей|сенсор/i, "IoT"],
    [/дрон|безпілотн/i, "Дрони"],
    [/сонячн|енерг|теплов/i, "Енергетика"],
    [/органічн|еко|зелен|сталий/i, "Еко"],
    [/цифров|діджитал|it/i, "Digital"],
    [/медичн|здоров|лікар/i, "Медицина"],
    [/кіно|фільм|театр|музик/i, "Мистецтво"],
    [/туризм|готел/i, "Туризм"],
    [/аграр|ферм|сільськ|молоч|бджіл|рибн|зерн|ягід|теплиц/i, "Агро"],
    [/будівниц|ремонт|відновлен/i, "Будівництво"],
    [/переробк/i, "Переробка"],
    [/виставк|ярмарк/i, "Виставки"],
  ];

  for (const [pattern, label] of patterns) {
    if (pattern.test(text) || pattern.test(description)) {
      keywords.push(label);
    }
    if (keywords.length >= 3) break;
  }

  return keywords;
}

function GrantCard({ grant, index }: { grant: Grant; index: number }) {
  const deadlineText = formatDeadline(grant.deadline);
  const isUrgent =
    grant.deadline &&
    new Date(grant.deadline).getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000 &&
    new Date(grant.deadline).getTime() > Date.now();

  const keywords = extractKeywords(grant.description);

  return (
    <Link
      href={`/granty/${grant.id}`}
      className="reveal glass-card gradient-border rounded-2xl p-7 sm:p-8 card-hover group flex flex-col"
      style={{ transitionDelay: `${(index % 6) * 80}ms` }}
    >
      {/* Top row: category + source + urgency */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {grant.category && (
          <span className="inline-block px-3 py-1 rounded-full bg-navy/[0.06] text-navy text-xs font-semibold">
            {grant.category}
          </span>
        )}
        <span className="inline-block px-2.5 py-1 rounded-full bg-gold/[0.08] text-gold-dark text-[11px] font-medium">
          {grant.source}
        </span>
        {isUrgent && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-danger/10 text-danger text-xs font-semibold ml-auto">
            <Clock className="w-3 h-3" />
            Скоро
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-bold text-lg text-text line-clamp-2 mb-4 group-hover:text-navy-light transition-colors">
        {grant.title}
      </h3>

      {/* Smart keyword chips instead of truncated description */}
      <div className="flex flex-wrap gap-1.5 mb-5 flex-1">
        {grant.sphere && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-navy/[0.04] text-text-light text-[11px] font-medium">
            <Tag className="w-3 h-3 text-gold-dark" />
            {grant.sphere}
          </span>
        )}
        {keywords.map((kw) => (
          <span
            key={kw}
            className="inline-block px-2.5 py-1 rounded-lg bg-cream text-text-light text-[11px] font-medium"
          >
            {kw}
          </span>
        ))}
      </div>

      {/* Amount — hero element */}
      {grant.amount && (
        <p className="text-shimmer font-bold text-xl mb-4 font-heading">
          {formatAmount(grant.amount)}
        </p>
      )}

      {/* Bottom meta: deadline + region */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 border-t border-gray-100/60">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-text-light/60" />
          <span className={cn(
            "text-xs",
            isUrgent ? "text-danger font-semibold" : "text-text-light"
          )}>
            {deadlineText}
          </span>
        </div>
        {grant.region && (
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-text-light/60" />
            <span className="text-text-light text-xs">{grant.region}</span>
          </div>
        )}
        <span className="inline-flex items-center gap-1 text-gold font-semibold text-xs ml-auto group-hover:gap-2 transition-all">
          Детальніше
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
