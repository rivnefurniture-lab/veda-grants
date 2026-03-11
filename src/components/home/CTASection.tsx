"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gradient-gold rounded-3xl px-6 sm:px-12 py-12 sm:py-16 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy mb-4">
              Не знаєте з чого почати?
            </h2>
            <p className="text-navy/70 text-lg max-w-xl mx-auto mb-8">
              Залиште заявку і ми безкоштовно проаналізуємо ваші можливості для
              отримання гранту
            </p>
            <Link
              href="/kontakty"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-navy hover:bg-navy-light text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-navy/20 hover:shadow-xl hover:-translate-y-0.5"
            >
              Залишити заявку
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
