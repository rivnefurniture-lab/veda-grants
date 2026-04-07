import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "WEDA — West Economic Development Agency";
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
          background: "linear-gradient(135deg, #091030 0%, #0D1846 40%, #152262 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* W glyph */}
        <svg
          width="110"
          height="110"
          viewBox="0 0 512 512"
          fill="none"
          style={{ marginBottom: 24 }}
        >
          <path d="M100 100 L170 100 L260 412 L190 412 Z" fill="#FFFFFF" />
          <path d="M220 100 L290 100 L380 412 L310 412 Z" fill="#FFFFFF" />
          <path d="M340 100 L412 100 L376 220 Z" fill="#E95623" />
        </svg>

        {/* WEDA */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "0.18em",
            color: "#FFFFFF",
            marginBottom: 8,
          }}
        >
          WEDA
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
          West Economic Development Agency
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

        {/* Orange line */}
        <div
          style={{
            width: 200,
            height: 2,
            background: "rgba(233, 86, 35, 0.4)",
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
          weda.com
        </div>
      </div>
    ),
    { ...size }
  );
}
