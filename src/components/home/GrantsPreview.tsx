"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatAmount } from "@/lib/utils";
import { FloatingIcons } from "@/components/FloatingIcons";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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

export function GrantsPreview({ grants }: GrantsPreviewProps) {
  const revealRef = useScrollReveal();

  return (
    <section className="relative section-padding bg-cream overflow-hidden">
      <FloatingIcons count={6} theme="dark" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={revealRef}>
        {/* Section heading */}
        <div className="text-center mb-14 reveal">
          <div className="section-label bg-navy/5 text-navy mx-auto w-fit">
            Можливості
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4 font-heading">
            Актуальні гранти
          </h2>
          <div className="gold-line" />
          <p className="text-text-light max-w-2xl mx-auto text-lg">
            Найсвіжіші грантові програми для українського бізнесу
          </p>
        </div>

        {/* Grants grid — clean, minimal cards */}
        {grants.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {grants.map((grant, index) => (
              <Link
                key={grant.id}
                href={`/granty/${grant.id}`}
                className="reveal glass-card gradient-border rounded-2xl p-7 sm:p-8 card-hover group block"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Category badge */}
                {grant.category && (
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gold/10 text-gold-dark mb-4">
                    {grant.category}
                  </span>
                )}

                {/* Title */}
                <h3 className="text-lg font-bold text-text mb-4 line-clamp-2 group-hover:text-navy-light transition-colors">
                  {grant.title}
                </h3>

                {/* Amount */}
                {grant.amount && (
                  <p className="text-shimmer font-bold text-xl mb-5 font-heading">
                    {formatAmount(grant.amount)}
                  </p>
                )}

                {/* Link indicator */}
                <span className="inline-flex items-center gap-1.5 text-gold font-semibold text-sm group-hover:gap-2.5 transition-all">
                  Детальніше
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-card rounded-2xl reveal">
            <p className="text-text-light text-lg">
              Наразі немає доступних грантів. Перевірте пізніше!
            </p>
          </div>
        )}

        {/* View all link */}
        <div className="text-center reveal">
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
