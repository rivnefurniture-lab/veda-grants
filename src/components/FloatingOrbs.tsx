"use client";

interface FloatingOrbsProps {
  count?: number;
  className?: string;
}

const orbConfigs = [
  { size: 4, left: "10%", delay: "0s", duration: "14s", opacity: 0.2 },
  { size: 6, left: "25%", delay: "2s", duration: "18s", opacity: 0.15 },
  { size: 3, left: "40%", delay: "5s", duration: "12s", opacity: 0.25 },
  { size: 8, left: "60%", delay: "1s", duration: "20s", opacity: 0.1 },
  { size: 5, left: "75%", delay: "4s", duration: "16s", opacity: 0.2 },
  { size: 4, left: "88%", delay: "7s", duration: "15s", opacity: 0.18 },
  { size: 3, left: "15%", delay: "9s", duration: "17s", opacity: 0.12 },
  { size: 7, left: "50%", delay: "3s", duration: "19s", opacity: 0.08 },
];

export function FloatingOrbs({ count = 6, className = "" }: FloatingOrbsProps) {
  const orbs = orbConfigs.slice(0, count);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.left,
            bottom: "-10%",
            background: `radial-gradient(circle, rgba(233, 86, 35, ${orb.opacity}) 0%, rgba(233, 86, 35, 0) 70%)`,
            boxShadow: `0 0 ${orb.size * 3}px ${orb.size}px rgba(233, 86, 35, ${orb.opacity * 0.5})`,
            animation: `float-orb ${orb.duration} ${orb.delay} ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}
