"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { FloatingIcons } from "@/components/FloatingIcons";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function CTASection() {
  const revealRef = useScrollReveal();

  return (
    <section className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={revealRef}>
        <div className="relative gradient-navy rounded-3xl px-6 sm:px-12 lg:px-20 py-14 sm:py-20 overflow-hidden reveal">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold/[0.04] blur-[60px]" />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-gold/[0.03] blur-[60px]" />
          <div className="absolute inset-0 hero-grid-pattern" />
          <FloatingIcons count={6} theme="light" />

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <svg viewBox="0 0 48 60" fill="none" className="w-8 h-10 mx-auto mb-5">
              <path d="M24 0 L44 22 L24 28 Z" fill="#FFD95A" />
              <path d="M24 0 L4 22 L24 28 Z" fill="#F9A825" />
              <path d="M44 22 L24 60 L24 28 Z" fill="#B87000" />
              <path d="M4 22 L24 60 L24 28 Z" fill="#D4860A" />
            </svg>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-heading text-shimmer">
              Не знаєте з чого почати?
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto mb-10">
              Залиште заявку і ми безкоштовно проаналізуємо ваші можливості для
              отримання гранту
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/kontakty"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gold hover:bg-gold-light text-navy font-bold rounded-xl transition-all duration-300 shadow-lg shadow-gold/20 hover:shadow-xl hover:-translate-y-0.5"
              >
                Залишити заявку
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+380672160559"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5" />
                Зателефонувати
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
