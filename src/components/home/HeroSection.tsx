"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { FloatingIcons } from "@/components/FloatingIcons";

const features = [
  "Пошук грантів під ваш бізнес",
  "Написання грантових заявок",
  "Повний супровід проєкту",
];

function WGlyphHero() {
  return (
    <svg
      width={56}
      height={56}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M100 100 L170 100 L260 412 L190 412 Z" fill="#FFFFFF" />
      <path d="M220 100 L290 100 L380 412 L310 412 Z" fill="#FFFFFF" />
      <path d="M340 100 L412 100 L376 220 Z" fill="#E95623" />
    </svg>
  );
}

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[94vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-navy" />
      <div className="absolute inset-0 hero-grid-pattern" />

      {/* Floating business icons */}
      <FloatingIcons count={10} theme="light" />

      {/* Decorative glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-gold/[0.06] blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-navy-light/10 blur-[100px]" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          {/* ═══════════════════════════════════ */}
          {/*           LOGO COMPOSITION          */}
          {/* ═══════════════════════════════════ */}
          <div
            className={cn(
              "mb-12 sm:mb-16 transition-all duration-1000",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            )}
          >
            {/* W glyph mark */}
            <div className="flex justify-center mb-7">
              <div className="relative">
                <div className="absolute inset-0 bg-gold/20 blur-2xl rounded-full scale-[2.5] animate-logo-glow" />
                <WGlyphHero />
              </div>
            </div>

            {/* WEDA wordmark with decorative flanking lines */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 mb-4">
              {/* Left decorative line */}
              <div
                className={cn(
                  "flex items-center gap-2.5 origin-right",
                  isVisible && "animate-line-expand"
                )}
                style={{ animationDelay: "0.4s", opacity: isVisible ? 1 : 0 }}
              >
                <div className="w-2 h-2 rotate-45 bg-gold/50 shrink-0" />
                <div className="h-px w-10 sm:w-16 lg:w-24 bg-gradient-to-r from-transparent via-gold/40 to-gold/60" />
              </div>

              {/* The wordmark */}
              <h2
                className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-[0.12em] sm:tracking-[0.16em] text-white select-none"
                style={{ lineHeight: 1.1 }}
              >
                WEDA
              </h2>

              {/* Right decorative line */}
              <div
                className={cn(
                  "flex items-center gap-2.5 origin-left",
                  isVisible && "animate-line-expand"
                )}
                style={{ animationDelay: "0.4s", opacity: isVisible ? 1 : 0 }}
              >
                <div className="h-px w-10 sm:w-16 lg:w-24 bg-gradient-to-l from-transparent via-gold/40 to-gold/60" />
                <div className="w-2 h-2 rotate-45 bg-gold/50 shrink-0" />
              </div>
            </div>

            {/* Subtitle */}
            <p
              className={cn(
                "text-[11px] sm:text-xs text-white/35 tracking-[0.3em] sm:tracking-[0.35em] uppercase font-medium transition-all duration-700 delay-500",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3"
              )}
            >
              West Economic Development Agency
            </p>
          </div>

          {/* ═══════════════════════════════════ */}
          {/*           MAIN CONTENT              */}
          {/* ═══════════════════════════════════ */}

          {/* Heading */}
          <h1
            className={cn(
              "text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6 transition-all duration-700 delay-300",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            )}
          >
            Допомагаємо бізнесу{" "}
            <span className="text-shimmer">
              отримувати гранти
            </span>{" "}
            та фінансування
          </h1>

          {/* Subheading */}
          <p
            className={cn(
              "text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-400",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            )}
          >
            Від пошуку можливостей до успішної реалізації проєктів — ваш
            надійний партнер у світі грантового фінансування
          </p>

          {/* Feature list — horizontal */}
          <div
            className={cn(
              "flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10 transition-all duration-700 delay-500",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            )}
          >
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                <span className="text-white/70 text-sm sm:text-base">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div
            className={cn(
              "flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-[600ms]",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            )}
          >
            <Link
              href="/granty"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gold hover:bg-gold-light text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30 hover:-translate-y-0.5 text-base"
            >
              Знайти грант
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/kontakty"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 text-base"
            >
              Безкоштовна консультація
            </Link>
          </div>
        </div>
      </div>

{/* no bottom fade — seamless into StatsSection */}
    </section>
  );
}
