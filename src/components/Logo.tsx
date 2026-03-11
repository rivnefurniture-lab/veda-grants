import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "icon" | "full";
  theme?: "dark" | "light";
  className?: string;
  size?: number;
}

function DiamondIcon({
  height,
  theme,
}: {
  height: number;
  theme: string;
}) {
  const width = Math.round(height * (48 / 60));
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      style={{
        filter:
          theme === "dark"
            ? "drop-shadow(0 1px 3px rgba(249,168,37,0.25))"
            : "drop-shadow(0 1px 3px rgba(249,168,37,0.15))",
      }}
    >
      <path d="M24 0 L44 22 L24 28 Z" fill="#FFD95A" />
      <path d="M24 0 L4 22 L24 28 Z" fill="#F9A825" />
      <path d="M44 22 L24 60 L24 28 Z" fill="#B87000" />
      <path d="M4 22 L24 60 L24 28 Z" fill="#D4860A" />
    </svg>
  );
}

export function Logo({
  variant = "full",
  theme = "dark",
  className,
  size,
}: LogoProps) {
  const h = size || (variant === "icon" ? 32 : 38);

  if (variant === "icon") {
    return (
      <div className={className}>
        <DiamondIcon height={h} theme={theme} />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <DiamondIcon height={h} theme={theme} />
      <div>
        <div
          className={cn(
            "font-heading font-bold tracking-[0.1em] leading-none",
            theme === "dark"
              ? "text-navy text-lg md:text-xl"
              : "text-white text-lg"
          )}
        >
          ВЕДА
        </div>
        <div
          className={cn(
            "text-[9px] md:text-[10px] tracking-[0.18em] uppercase leading-none mt-1 font-medium",
            theme === "dark" ? "text-text-light" : "text-white/40"
          )}
        >
          Агенція розвитку
        </div>
      </div>
    </div>
  );
}
