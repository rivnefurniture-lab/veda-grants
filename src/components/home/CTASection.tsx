"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export function CTASection() {
  return (
    <section className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative gradient-navy rounded-3xl px-6 sm:px-12 lg:px-20 py-14 sm:py-20 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold/[0.04] blur-[60px]" />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-gold/[0.03] blur-[60px]" />
          <div className="absolute inset-0 hero-grid-pattern" />

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
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
