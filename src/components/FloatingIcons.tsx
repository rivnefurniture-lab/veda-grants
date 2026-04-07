"use client";

import {
  Coins,
  FileText,
  Lightbulb,
  Target,
  TrendingUp,
  Award,
  Briefcase,
  Rocket,
  HandCoins,
  GraduationCap,
  BarChart3,
  Globe,
} from "lucide-react";

interface FloatingIconConfig {
  icon: React.ElementType;
  left: string;
  top: string;
  size: number;
  opacity: number;
  delay: string;
  duration: string;
  alt?: boolean; // use alternate animation
}

const allIcons: FloatingIconConfig[] = [
  { icon: Coins, left: "5%", top: "15%", size: 36, opacity: 0.3, delay: "0s", duration: "16s" },
  { icon: FileText, left: "15%", top: "65%", size: 30, opacity: 0.25, delay: "2s", duration: "18s", alt: true },
  { icon: Lightbulb, left: "85%", top: "20%", size: 34, opacity: 0.28, delay: "1s", duration: "14s", alt: true },
  { icon: Target, left: "90%", top: "70%", size: 32, opacity: 0.22, delay: "4s", duration: "20s" },
  { icon: TrendingUp, left: "75%", top: "45%", size: 38, opacity: 0.26, delay: "3s", duration: "17s", alt: true },
  { icon: Award, left: "25%", top: "30%", size: 28, opacity: 0.22, delay: "5s", duration: "19s" },
  { icon: Briefcase, left: "60%", top: "12%", size: 32, opacity: 0.25, delay: "2.5s", duration: "15s", alt: true },
  { icon: Rocket, left: "40%", top: "80%", size: 30, opacity: 0.28, delay: "6s", duration: "21s" },
  { icon: HandCoins, left: "50%", top: "35%", size: 34, opacity: 0.22, delay: "1.5s", duration: "18s", alt: true },
  { icon: GraduationCap, left: "10%", top: "45%", size: 32, opacity: 0.25, delay: "7s", duration: "16s" },
  { icon: BarChart3, left: "70%", top: "85%", size: 28, opacity: 0.26, delay: "3.5s", duration: "14s", alt: true },
  { icon: Globe, left: "35%", top: "10%", size: 36, opacity: 0.22, delay: "4.5s", duration: "20s" },
];

interface FloatingIconsProps {
  /** How many icons to show (max 12) */
  count?: number;
  /** "light" for dark backgrounds (gold icons), "dark" for light backgrounds (navy icons) */
  theme?: "light" | "dark";
  className?: string;
}

export function FloatingIcons({
  count = 8,
  theme = "light",
  className = "",
}: FloatingIconsProps) {
  const icons = allIcons.slice(0, count);
  const color = theme === "light" ? "rgba(233, 86, 35, 1)" : "rgba(196, 68, 26, 1)";

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {icons.map((item, i) => {
        const Icon = item.icon;
        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: item.left,
              top: item.top,
              opacity: item.opacity,
              animation: `${item.alt ? "float-icon-alt" : "float-icon"} ${item.duration} ${item.delay} ease-in-out infinite`,
            }}
          >
            <Icon
              style={{
                width: item.size,
                height: item.size,
                color,
                strokeWidth: 1.2,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
