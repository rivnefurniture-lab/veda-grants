"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Coins,
  MapPin,
  Globe,
  Tag,
  ExternalLink,
  ArrowRight,
  Clock,
  Building2,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate, formatDeadline, formatAmount } from "@/lib/utils";
import { FloatingIcons } from "@/components/FloatingIcons";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface Grant {
  id: string;
  title: string;
  description: string;
  fullText: string | null;
  amount: string | null;
  deadline: Date | string | null;
  sourceUrl: string;
  originalUrl: string | null;
  source: string;
  category: string | null;
  region: string | null;
  sphere: string | null;
  imageUrl: string | null;
  status: string;
  createdAt: Date | string;
  publishedAt: Date | string | null;
}

interface RelatedGrant {
  id: string;
  title: string;
  amount: string | null;
  category: string | null;
  deadline: Date | string | null;
}

interface GrantDetailProps {
  grant: Grant;
  relatedGrants: RelatedGrant[];
}

export function GrantDetail({ grant, relatedGrants }: GrantDetailProps) {
  const revealRef = useScrollReveal();

  const isUrgent =
    grant.deadline &&
    new Date(grant.deadline).getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000 &&
    new Date(grant.deadline).getTime() > Date.now();

  const isExpired =
    grant.deadline && new Date(grant.deadline).getTime() < Date.now();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-navy" />
        <div className="absolute inset-0 hero-grid-pattern" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/[0.045] blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-gold/[0.03] blur-[80px]" />
        <FloatingIcons count={8} theme="light" />

        <div className="relative z-10 py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back link */}
            <Link
              href="/granty"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors mb-8 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад до каталогу
            </Link>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {grant.category && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gold/15 text-gold text-sm font-semibold">
                  <Tag className="w-3.5 h-3.5" />
                  {grant.category}
                </span>
              )}
              {grant.sphere && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.08] text-white/70 text-sm font-medium">
                  {grant.sphere}
                </span>
              )}
              {isUrgent && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-danger/20 text-red-300 text-sm font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  Дедлайн скоро
                </span>
              )}
              {isExpired && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.06] text-white/40 text-sm font-semibold">
                  Завершено
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6 font-heading">
              {grant.title}
            </h1>

            {/* Quick info bar */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {grant.amount && (
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-gold" />
                  <span className="text-shimmer font-bold text-lg">
                    {formatAmount(grant.amount)}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-white/40" />
                <span
                  className={cn(
                    "text-sm font-medium",
                    isUrgent
                      ? "text-red-300"
                      : isExpired
                        ? "text-white/40"
                        : "text-white/60"
                  )}
                >
                  {formatDeadline(grant.deadline)}
                </span>
              </div>
              {grant.region && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-white/40" />
                  <span className="text-white/60 text-sm">{grant.region}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-white/40" />
                <span className="text-white/60 text-sm">{grant.source}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative section-padding overflow-hidden">
        <FloatingIcons count={6} theme="dark" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={revealRef}>
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 reveal">
              <div className="glass-card rounded-2xl p-8 sm:p-10">
                <h2 className="text-xl font-bold text-text mb-6 font-heading flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gold" />
                  Опис програми
                </h2>

                <div className="prose prose-gray max-w-none">
                  <p className="text-text-light leading-relaxed text-[15px] whitespace-pre-line">
                    {grant.fullText || grant.description}
                  </p>
                </div>

                {/* Source link */}
                <div className="mt-8 pt-6 border-t border-gray-100/60">
                  <a
                    href={grant.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-navy hover:bg-navy-light text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <Globe className="w-4 h-4" />
                    Перейти до джерела
                    <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6 reveal" style={{ transitionDelay: "150ms" }}>
              {/* Info card */}
              <div className="glass-card gradient-border rounded-2xl p-6 sm:p-7">
                <h3 className="text-sm font-bold text-text uppercase tracking-wide mb-5">
                  Деталі гранту
                </h3>
                <div className="space-y-4">
                  {grant.amount && (
                    <div className="flex items-start gap-3">
                      <Coins className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-text-light mb-0.5">Сума</p>
                        <p className="font-bold text-text">
                          {formatAmount(grant.amount)}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-text-light mb-0.5">Дедлайн</p>
                      <p
                        className={cn(
                          "font-bold",
                          isUrgent
                            ? "text-danger"
                            : isExpired
                              ? "text-text-light"
                              : "text-text"
                        )}
                      >
                        {grant.deadline
                          ? formatDate(grant.deadline)
                          : "Не вказано"}
                      </p>
                    </div>
                  </div>
                  {grant.region && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-text-light mb-0.5">Регіон</p>
                        <p className="font-bold text-text">{grant.region}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-text-light mb-0.5">Джерело</p>
                      <p className="font-bold text-text">{grant.source}</p>
                    </div>
                  </div>
                  {grant.sphere && (
                    <div className="flex items-start gap-3">
                      <Tag className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-text-light mb-0.5">Сфера</p>
                        <p className="font-bold text-text">{grant.sphere}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA card */}
              <div className="glass-card gradient-border rounded-2xl p-6 sm:p-7 text-center">
                <svg
                  viewBox="0 0 512 512"
                  fill="none"
                  className="w-9 h-9 mx-auto mb-3"
                >
                  <path d="M100 100 L170 100 L260 412 L190 412 Z" fill="#0D1846" />
                  <path d="M220 100 L290 100 L380 412 L310 412 Z" fill="#0D1846" />
                  <path d="M340 100 L412 100 L376 220 Z" fill="#E95623" />
                </svg>
                <h3 className="font-bold text-text mb-2">
                  Потрібна допомога?
                </h3>
                <p className="text-text-light text-sm mb-5">
                  Наші консультанти допоможуть підготувати заявку на цей грант
                </p>
                <Link
                  href="/kontakty"
                  className="group inline-flex items-center gap-2 w-full justify-center px-5 py-3 bg-gold hover:bg-gold-light text-white font-bold rounded-xl transition-all duration-300 shadow-sm hover:shadow-lg text-sm"
                >
                  Безкоштовна консультація
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Related grants */}
          {relatedGrants.length > 0 && (
            <div className="mt-16 reveal" style={{ transitionDelay: "200ms" }}>
              <h2 className="text-2xl font-bold text-text mb-8 font-heading">
                Схожі гранти
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {relatedGrants.map((related, index) => (
                  <Link
                    key={related.id}
                    href={`/granty/${related.id}`}
                    className="glass-card gradient-border rounded-2xl p-6 card-hover group block reveal"
                    style={{ transitionDelay: `${300 + index * 80}ms` }}
                  >
                    {related.category && (
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gold/10 text-gold-dark mb-3">
                        {related.category}
                      </span>
                    )}
                    <h3 className="font-bold text-text line-clamp-2 mb-3 group-hover:text-navy-light transition-colors text-sm">
                      {related.title}
                    </h3>
                    {related.amount && (
                      <p className="text-shimmer font-bold text-sm font-heading">
                        {formatAmount(related.amount)}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
