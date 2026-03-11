"use client";

import { Star, Quote } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FloatingIcons } from "@/components/FloatingIcons";

const testimonials = [
  {
    text: "Завдяки ВЕДА ми отримали грант на \u20AC50,000 для розвитку нашого виробництва. Професійний підхід від першої консультації до отримання коштів.",
    author: "Олена Коваленко",
    company: 'ФОП "Коваленко О.В."',
    rating: 5,
  },
  {
    text: "Агенція допомогла нам підготувати бездоганну заявку на програму єРобота. Грант отримали з першої спроби!",
    author: "Ігор Мельник",
    company: 'ТОВ "Мельник Агро"',
    rating: 5,
  },
  {
    text: "Рекомендую ВЕДА кожному, хто шукає фінансування. Команда дійсно розуміє, як працюють грантові програми.",
    author: "Наталія Бондар",
    company: 'ГО "Рівне Інновації"',
    rating: 5,
  },
];

export function TestimonialsSection() {
  const revealRef = useScrollReveal();

  return (
    <section className="relative section-padding bg-white overflow-hidden">
      <FloatingIcons count={6} theme="dark" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={revealRef}>
        {/* Section heading */}
        <div className="text-center mb-14 reveal">
          <div className="section-label bg-gold/10 text-gold mx-auto w-fit">
            Відгуки
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4 font-heading">
            Що кажуть наші клієнти
          </h2>
          <div className="gold-line" />
          <p className="text-text-light max-w-2xl mx-auto text-lg">
            Реальні відгуки від підприємців, яким ми допомогли отримати
            фінансування
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className="relative glass-card gradient-border rounded-2xl p-7 sm:p-8 card-hover reveal"
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              {/* Quote icon */}
              <div className="absolute top-7 right-7">
                <Quote className="w-12 h-12 text-gold/15" />
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-gold text-gold"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-text leading-relaxed mb-6 text-[15px]">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="border-t border-gray-100/50 pt-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shadow-sm">
                    <span className="text-navy font-bold text-sm">
                      {testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-text">
                      {testimonial.author}
                    </p>
                    <p className="text-text-light text-sm">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
