"use client";

import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

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
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
            Що кажуть наші клієнти
          </h2>
          <p className="text-text-light max-w-2xl mx-auto text-lg">
            Реальні відгуки від підприємців, яким ми допомогли отримати
            фінансування
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm card-hover animate-fade-in-up relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6">
                <Quote className="w-8 h-8 text-gold/20" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-gold text-gold"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-text leading-relaxed mb-6 italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center gap-3">
                  {/* Avatar placeholder */}
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <span className="text-gold font-semibold text-sm">
                      {testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-text text-sm">
                      {testimonial.author}
                    </p>
                    <p className="text-text-light text-xs">
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
