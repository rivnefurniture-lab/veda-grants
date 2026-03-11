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
import { cn } from "@/lib/utils";

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
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
            Наші послуги
          </h2>
          <p className="text-text-light max-w-2xl mx-auto text-lg">
            Повний спектр послуг для успішного отримання грантового фінансування
          </p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 card-hover animate-fade-in-up group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gold/10 mb-5 group-hover:bg-gold/20 transition-colors">
                  <Icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-text mb-3">
                  {service.title}
                </h3>
                <p className="text-text-light leading-relaxed mb-4">
                  {service.description}
                </p>
                <Link
                  href="/poslugy"
                  className="inline-flex items-center gap-1 text-gold font-medium text-sm hover:gap-2 transition-all"
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
