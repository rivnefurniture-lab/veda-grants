"use client";

import Link from "next/link";
import {
  Search,
  FileText,
  BarChart3,
  Shield,
  GraduationCap,
  Users,
  ArrowRight,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FloatingIcons } from "@/components/FloatingIcons";

const services = [
  {
    icon: Search,
    title: "Пошук грантів",
    description:
      "Знаходимо найкращі грантові можливості для вашого бізнесу серед сотень програм",
  },
  {
    icon: FileText,
    title: "Написання заявок",
    description:
      "Професійна підготовка грантових заявок з максимальними шансами на перемогу",
  },
  {
    icon: BarChart3,
    title: "Бізнес-планування",
    description:
      "Розробка детальних бізнес-планів для грантових програм та інвесторів",
  },
  {
    icon: Shield,
    title: "Супровід проєктів",
    description:
      "Повний супровід від подання заявки до звітування перед донором",
  },
  {
    icon: GraduationCap,
    title: "Навчання та консалтинг",
    description:
      "Тренінги з грантрайтингу та стратегічного планування для команд",
  },
  {
    icon: Users,
    title: "Партнерства",
    description:
      "Допомагаємо знайти партнерів для консорціумних грантових заявок",
  },
];

export function ServicesPreview() {
  const revealRef = useScrollReveal();

  return (
    <section className="relative section-padding bg-white overflow-hidden">
      <FloatingIcons count={8} theme="dark" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={revealRef}>
        {/* Section heading */}
        <div className="text-center mb-14 reveal">
          <div className="section-label bg-gold/10 text-gold mx-auto w-fit">
            Що ми робимо
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4 font-heading">
            Наші послуги
          </h2>
          <div className="gold-line" />
          <p className="text-text-light max-w-2xl mx-auto text-lg">
            Повний спектр послуг для успішного отримання грантового фінансування
          </p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="relative glass-card gradient-border rounded-2xl p-7 sm:p-8 card-hover group overflow-hidden reveal"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Gold top border on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                {/* Numbered index */}
                <span className="absolute top-5 right-6 text-5xl font-bold text-navy/[0.04] font-heading select-none leading-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold/10 mb-5 group-hover:bg-gold group-hover:shadow-lg group-hover:shadow-gold/20 transition-all duration-300">
                  <Icon className="w-7 h-7 text-gold group-hover:text-navy transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-text mb-3">
                  {service.title}
                </h3>
                <p className="text-text-light leading-relaxed mb-5">
                  {service.description}
                </p>
                <Link
                  href="/poslugy"
                  className="inline-flex items-center gap-1.5 text-gold font-semibold text-sm group-hover:gap-2.5 transition-all"
                >
                  Детальніше
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
