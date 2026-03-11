"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Calendar,
  Coins,
  MapPin,
  ArrowUpDown,
  ExternalLink,
  SlidersHorizontal,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDeadline, formatAmount } from "@/lib/utils";

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
    <div>
      {/* Search & Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light" />
          <input
            type="text"
            placeholder="Пошук за назвою, джерелом, регіоном..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl border border-gray-200 text-text placeholder:text-text-light/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
          />
        </div>

        <div className="relative">
          <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="appearance-none pl-11 pr-10 py-3.5 bg-white rounded-xl border border-gray-200 text-text focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all cursor-pointer"
          >
            <option value="date">За датою</option>
            <option value="amount">За сумою</option>
          </select>
          <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light pointer-events-none" />
        </div>
      </div>

      {/* Category filter buttons */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
              activeCategory === category
                ? "bg-navy text-white shadow-md"
                : "bg-white text-text-light border border-gray-200 hover:border-navy/30 hover:text-navy"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-text-light text-sm mb-6">
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
          {filteredGrants.map((grant) => (
            <GrantCard key={grant.id} grant={grant} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
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
      <div className="mt-16 rounded-3xl gradient-navy p-8 sm:p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 hero-grid-pattern" />
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold/[0.04] blur-[60px]" />

        <div className="relative z-10">
          <MessageSquare className="w-10 h-10 text-gold mx-auto mb-4" />
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Не знайшли потрібний грант?
          </h3>
          <p className="text-white/50 max-w-xl mx-auto mb-8 text-lg">
            Наші консультанти допоможуть підібрати оптимальну грантову програму
            саме для вашого бізнесу
          </p>
          <Link
            href="/kontakty"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gold hover:bg-gold-light text-navy font-bold rounded-xl transition-all duration-300 shadow-lg shadow-gold/20 hover:shadow-xl hover:-translate-y-0.5"
          >
            Отримати консультацію
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function GrantCard({ grant }: { grant: Grant }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover flex flex-col">
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-gold to-gold-light" />
      <div className="p-6 sm:p-7 flex flex-col flex-1">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {grant.category && (
            <span className="inline-block px-3 py-1 rounded-full bg-navy/5 text-navy text-xs font-semibold">
              {grant.category}
            </span>
          )}
          <span className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold-dark text-xs font-semibold">
            {grant.source}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg text-text line-clamp-2 mb-3">
          {grant.title}
        </h3>

        {/* Description */}
        <p className="text-text-light text-sm line-clamp-3 mb-4 flex-1">
          {grant.description}
        </p>

        {/* Divider */}
        <div className="border-t border-gray-100 my-4" />

        {/* Bottom info */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
          <div className="flex items-center gap-1.5">
            <Coins className="w-4 h-4 text-gold-dark" />
            <span className="text-gold-dark font-bold text-sm">
              {formatAmount(grant.amount)}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-text-light" />
            <span className="text-text-light text-sm">
              {formatDeadline(grant.deadline)}
            </span>
          </div>
          {grant.region && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-text-light" />
              <span className="text-text-light text-sm">{grant.region}</span>
            </div>
          )}
        </div>

        {/* Link */}
        <a
          href={grant.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-gold font-semibold text-sm hover:text-gold-dark transition-colors group"
        >
          Детальніше
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
