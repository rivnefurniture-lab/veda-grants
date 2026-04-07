import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "icon" | "full";
  theme?: "dark" | "light";
  className?: string;
  size?: number;
}

function WGlyph({
  size,
  theme,
}: {
  size: number;
  theme: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      {/* Two dark blue parallelogram strokes forming W + orange triangle accent */}
      <g>
        {/* Left bar */}
        <path
          d="M100 100 L170 100 L260 412 L190 412 Z"
          fill={theme === "light" ? "#FFFFFF" : "#0D1846"}
        />
        {/* Right bar */}
        <path
          d="M220 100 L290 100 L380 412 L310 412 Z"
          fill={theme === "light" ? "#FFFFFF" : "#0D1846"}
        />
        {/* Orange triangle accent (top right) */}
        <path
          d="M340 100 L412 100 L376 220 Z"
          fill="#E95623"
        />
      </g>
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
        <WGlyph size={h} theme={theme} />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <WGlyph size={h} theme={theme} />
      <div>
        <div
          className={cn(
            "font-heading font-extrabold tracking-[0.08em] leading-none",
            theme === "dark"
              ? "text-navy text-lg md:text-xl"
              : "text-white text-lg"
          )}
        >
          WEDA
        </div>
        <div
          className={cn(
            "text-[8px] md:text-[9px] tracking-[0.12em] uppercase leading-none mt-1 font-medium",
            theme === "dark" ? "text-text-light" : "text-white/40"
          )}
        >
          West Economic Development Agency
        </div>
      </div>
    </div>
  );
}
