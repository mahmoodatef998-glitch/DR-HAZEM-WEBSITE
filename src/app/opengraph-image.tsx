import { ImageResponse } from "next/og";

export const alt = "Medix Healthcare – Premium Imported Medicines from Spain & Italy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b2e 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(239,68,68,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, transparent, #ef4444, transparent)",
          }}
        />

        {/* UAE flag colors strip — subtle bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            display: "flex",
          }}
        >
          <div style={{ flex: 1, background: "#00A651" }} />
          <div style={{ flex: 1, background: "#FFFFFF" }} />
          <div style={{ flex: 1, background: "#000000" }} />
          <div style={{ width: "80px", background: "#EF3340" }} />
        </div>

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(239,68,68,0.12)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: "999px",
            padding: "8px 20px",
            marginBottom: "28px",
          }}
        >
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444" }} />
          <span style={{ color: "#f87171", fontSize: "14px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase" }}>
            Dubai · UAE
          </span>
        </div>

        {/* Company name */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-2px",
            lineHeight: 1,
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          Medix Healthcare
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "24px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.55)",
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: 1.4,
            marginBottom: "40px",
          }}
        >
          Premium Imported Medicines from Spain &amp; Italy
        </div>

        {/* Pills row */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          {["GCC Approved", "ISO Certified", "DHA Licensed", "Spain · Italy"].map((tag) => (
            <div
              key={tag}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "8px",
                padding: "10px 20px",
                color: "rgba(255,255,255,0.7)",
                fontSize: "15px",
                fontWeight: 600,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
