"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Building2 } from "lucide-react";
import { formatDeadline, formatAmount } from "@/lib/utils";

interface Grant {
  id: string;
  title: string;
  description: string;
  amount: string | null;
  deadline: Date | null;
  category: string | null;
  source: string;
  sphere: string | null;
}

interface GrantsPreviewProps {
  grants: Grant[];
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

export function GrantsPreview({ grants }: GrantsPreviewProps) {
  return (
    <section className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-14">
          <div className="section-label bg-navy/5 text-navy mx-auto w-fit">
            Можливості
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
            Актуальні гранти
          </h2>
          <div className="gold-line" />
          <p className="text-text-light max-w-2xl mx-auto text-lg">
            Найсвіжіші грантові програми для українського бізнесу
          </p>
        </div>

        {/* Grants grid */}
        {grants.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {grants.map((grant, index) => (
              <div
                key={grant.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden card-hover group animate-fade-in-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {/* Top accent line */}
                <div className="h-1 bg-gradient-to-r from-gold to-gold-light" />
                <div className="p-6 sm:p-7">
                  {/* Category & sphere badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {grant.category && (
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gold/10 text-gold-dark">
                        {grant.category}
                      </span>
                    )}
                    {grant.sphere && (
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-navy/5 text-navy-light">
                        {grant.sphere}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-text mb-3 line-clamp-2 group-hover:text-navy-light transition-colors">
                    {grant.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-light text-sm leading-relaxed mb-4 line-clamp-3">
                    {truncate(grant.description, 120)}
                  </p>

                  {/* Amount */}
                  {grant.amount && (
                    <p className="text-gold-dark font-bold text-lg mb-3">
                      {formatAmount(grant.amount)}
                    </p>
                  )}

                  {/* Meta info */}
                  <div className="space-y-2 mb-5">
                    {grant.deadline && (
                      <div className="flex items-center gap-2 text-text-light text-sm">
                        <Calendar className="w-4 h-4 text-gold" />
                        <span>Дедлайн: {formatDeadline(grant.deadline)}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-text-light text-xs">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>{grant.source}</span>
                    </div>
                  </div>

                  {/* Link */}
                  <Link
                    href="/granty"
                    className="inline-flex items-center gap-1.5 text-gold font-semibold text-sm group-hover:gap-2.5 transition-all"
                  >
                    Детальніше
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <p className="text-text-light text-lg">
              Наразі немає доступних грантів. Перевірте пізніше!
            </p>
          </div>
        )}

        {/* View all link */}
        <div className="text-center">
          <Link
            href="/granty"
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-navy hover:bg-navy-light text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
          >
            Переглянути всі гранти
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
