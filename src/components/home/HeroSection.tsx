"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const badges = [
  { text: "150+ грантів", delay: 0 },
  { text: "€10M+ залучено", delay: 200 },
  { text: "50+ клієнтів", delay: 400 },
];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-navy" />

      {/* Geometric pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(30deg, #f9a825 12%, transparent 12.5%, transparent 87%, #f9a825 87.5%, #f9a825),
            linear-gradient(150deg, #f9a825 12%, transparent 12.5%, transparent 87%, #f9a825 87.5%, #f9a825),
            linear-gradient(30deg, #f9a825 12%, transparent 12.5%, transparent 87%, #f9a825 87.5%, #f9a825),
            linear-gradient(150deg, #f9a825 12%, transparent 12.5%, transparent 87%, #f9a825 87.5%, #f9a825),
            linear-gradient(60deg, #ffd95a 25%, transparent 25.5%, transparent 75%, #ffd95a 75%, #ffd95a),
            linear-gradient(60deg, #ffd95a 25%, transparent 25.5%, transparent 75%, #ffd95a 75%, #ffd95a)
          `,
          backgroundSize: "80px 140px",
          backgroundPosition:
            "0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px",
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold/5 blur-3xl" />

      {/* Floating circles decoration */}
      <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full border border-gold/10 animate-pulse" />
      <div className="absolute bottom-20 left-[5%] w-40 h-40 rounded-full border border-gold/10 animate-pulse [animation-delay:1s]" />
      <div className="absolute top-[40%] right-[5%] w-20 h-20 rounded-full bg-gold/5 animate-pulse [animation-delay:2s]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-gold text-sm font-medium mb-8 transition-all duration-700",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
          >
            <Sparkles className="w-4 h-4" />
            Агенція економічного розвитку ВЕДА
          </div>

          {/* Main heading */}
          <h1
            className={cn(
              "text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 transition-all duration-700 delay-150",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            )}
          >
            Ваш надійний партнер{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
              у світі грантів
            </span>{" "}
            та фінансування
          </h1>

          {/* Subheading */}
          <p
            className={cn(
              "text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-300",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            )}
          >
            Допомагаємо українському бізнесу отримувати гранти від державних та
            міжнародних програм. Від пошуку можливостей до успішної реалізації
            проєктів.
          </p>

          {/* Buttons */}
          <div
            className={cn(
              "flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 delay-500",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            )}
          >
            <Link
              href="/granty"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gold hover:bg-gold-light text-navy font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-gold/25 hover:shadow-xl hover:shadow-gold/30 hover:-translate-y-0.5"
            >
              Знайти грант
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/kontakty"
              className="inline-flex items-center gap-2 px-8 py-4 glass text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
            >
              Безкоштовна консультація
            </Link>
          </div>

          {/* Floating badges */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {badges.map((badge, i) => (
              <div
                key={badge.text}
                className={cn(
                  "px-5 py-3 rounded-2xl glass text-white font-medium text-sm transition-all duration-700 hover:scale-105",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
                style={{
                  transitionDelay: `${700 + badge.delay}ms`,
                  animation: isVisible
                    ? `float 3s ease-in-out ${i * 0.5}s infinite`
                    : "none",
                }}
              >
                <span className="text-gold font-bold">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream to-transparent" />

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </section>
  );
}
