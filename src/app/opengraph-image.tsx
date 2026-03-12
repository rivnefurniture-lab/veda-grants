import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ВЕДА — Агенція економічного розвитку";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0a1128 0%, #0f1b3d 40%, #1a2d5a 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Diamond */}
        <svg
          width="88"
          height="110"
          viewBox="0 0 48 60"
          fill="none"
          style={{ marginBottom: 24 }}
        >
          <path d="M24 0 L44 22 L24 28 Z" fill="#FFD95A" />
          <path d="M24 0 L4 22 L24 28 Z" fill="#F9A825" />
          <path d="M44 22 L24 60 L24 28 Z" fill="#B87000" />
          <path d="M4 22 L24 60 L24 28 Z" fill="#D4860A" />
        </svg>

        {/* ВЕДА */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "0.18em",
            background: "linear-gradient(180deg, #FFE082, #F9A825, #C17900)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 8,
          }}
        >
          ВЕДА
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 16,
            letterSpacing: "0.35em",
            color: "rgba(255,255,255,0.35)",
            textTransform: "uppercase",
            fontWeight: 500,
            marginBottom: 48,
          }}
        >
          Агенція економічного розвитку
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          Грантовий консалтинг для
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          українського бізнесу
        </div>

        {/* Gold line */}
        <div
          style={{
            width: 200,
            height: 2,
            background: "rgba(249, 168, 37, 0.4)",
            borderRadius: 1,
            margin: "32px 0 16px",
          }}
        />

        {/* URL */}
        <div
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.4)",
            fontWeight: 500,
          }}
        >
          veda.agency
        </div>
      </div>
    ),
    { ...size }
  );
}
