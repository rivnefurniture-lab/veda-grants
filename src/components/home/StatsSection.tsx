"use client";

import { useEffect, useRef, useState } from "react";
import { Database, TrendingUp, Award, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatItem {
  icon: React.ElementType;
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
}

const stats: StatItem[] = [
  {
    icon: Database,
    value: 150,
    suffix: "+",
    label: "Грантів у базі",
  },
  {
    icon: TrendingUp,
    value: 10,
    suffix: "M+",
    prefix: "€",
    label: "Залучено фінансування",
  },
  {
    icon: Award,
    value: 50,
    suffix: "+",
    label: "Успішних проєктів",
  },
  {
    icon: Heart,
    value: 98,
    suffix: "%",
    label: "Задоволених клієнтів",
  },
];

function AnimatedCounter({
  value,
  suffix,
  prefix,
  isVisible,
}: {
  value: number;
  suffix: string;
  prefix?: string;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <span className="text-4xl sm:text-5xl font-bold text-gold">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={cn(
                  "bg-white rounded-2xl p-6 sm:p-8 text-center shadow-sm border border-gray-100 transition-all duration-700 hover:shadow-md",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gold/10 mb-4">
                  <Icon className="w-7 h-7 text-gold" />
                </div>
                <div className="mb-2">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    isVisible={isVisible}
                  />
                </div>
                <p className="text-text-light text-sm sm:text-base font-medium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
