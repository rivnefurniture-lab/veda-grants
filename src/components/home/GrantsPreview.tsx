"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
            Актуальні гранти та можливості
          </h2>
          <p className="text-text-light max-w-2xl mx-auto text-lg">
            Найсвіжіші грантові програми для українського бізнесу
          </p>
        </div>

        {/* Grants grid */}
        {grants.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {grants.map((grant, index) => (
              <div
                key={grant.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover animate-fade-in-up group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6">
                  {/* Category & sphere badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {grant.category && (
                      <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gold/10 text-gold">
                        {grant.category}
                      </span>
                    )}
                    {grant.sphere && (
                      <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-navy/5 text-navy-light">
                        {grant.sphere}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-text mb-3 line-clamp-2 group-hover:text-navy-light transition-colors">
                    {grant.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-light text-sm leading-relaxed mb-4 line-clamp-3">
                    {truncate(grant.description, 120)}
                  </p>

                  {/* Amount */}
                  {grant.amount && (
                    <p className="text-gold font-bold text-lg mb-3">
                      {formatAmount(grant.amount)}
                    </p>
                  )}

                  {/* Deadline */}
                  {grant.deadline && (
                    <div className="flex items-center gap-2 text-text-light text-sm mb-4">
                      <Calendar className="w-4 h-4 text-gold" />
                      <span>Дедлайн: {formatDeadline(grant.deadline)}</span>
                    </div>
                  )}

                  {/* Source badge */}
                  <div className="flex items-center gap-2 text-text-light text-xs mb-4">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{grant.source}</span>
                  </div>

                  {/* Link */}
                  <Link
                    href={`/granty/${grant.id}`}
                    className="inline-flex items-center gap-1 text-gold font-medium text-sm hover:gap-2 transition-all"
                  >
                    Детальніше
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-text-light text-lg">
              Наразі немає доступних грантів. Перевірте пізніше!
            </p>
          </div>
        )}

        {/* View all link */}
        <div className="text-center">
          <Link
            href="/granty"
            className="inline-flex items-center gap-2 text-navy-light font-semibold text-lg hover:text-gold transition-colors group"
          >
            Переглянути всі гранти
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
