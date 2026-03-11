import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDeadline(date: Date | string | null): string {
  if (!date) return "Не вказано";
  const d = new Date(date);
  const now = new Date();
  const diff = d.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days < 0) return "Завершено";
  if (days === 0) return "Сьогодні";
  if (days === 1) return "Завтра";
  if (days <= 7) return `${days} днів`;
  return formatDate(date);
}

export function formatAmount(amount: string | null): string {
  if (!amount) return "За запитом";
  return amount;
}
