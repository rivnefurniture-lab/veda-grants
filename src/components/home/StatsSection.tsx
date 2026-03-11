"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { TrendingUp, Target, Users, ThumbsUp } from "lucide-react";
import { FloatingIcons } from "@/components/FloatingIcons";

interface StatItem {
  icon: React.ElementType;
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
}

const stats: StatItem[] = [
  {
    icon: Target,
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
    icon: Users,
    value: 50,
    suffix: "+",
    label: "Успішних проєктів",
  },
  {
    icon: ThumbsUp,
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

    let current = 0;
    const duration = 2000;
    const step = value / (duration / 16);

    const timer = setInterval(() => {
      current += step;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <span className="text-4xl sm:text-5xl font-extrabold tabular-nums font-heading text-shimmer">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useCallback((node: HTMLElement | null) => {
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 gradient-navy" />
      <div className="absolute inset-0 hero-grid-pattern" />
      <FloatingIcons count={8} theme="light" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="relative text-center transition-all duration-700"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(24px)",
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                {/* Gold separator dot between items on desktop */}
                {index > 0 && (
                  <div className="hidden lg:flex absolute -left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-gold/30" />
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                    <span className="w-1 h-1 rounded-full bg-gold/30" />
                  </div>
                )}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gold/10 mb-4">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <div className="mb-1">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    isVisible={isVisible}
                  />
                </div>
                <p className="text-white/50 font-medium mt-1 tracking-wide uppercase text-xs">
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
