import { ImageResponse } from "next/og";
import { PROFILE_DATA } from "@/data/portfolioData";

export const alt =
  "Ilham Dwi Arsandy (Hammm22) | Creative Frontend & Web Developer PPLG";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#060B19",
          backgroundImage:
            "radial-gradient(circle at 82% 20%, rgba(37, 99, 235, 0.35), transparent 52%), radial-gradient(circle at 18% 82%, rgba(56, 189, 248, 0.18), transparent 46%)",
          color: "#F8FAFC",
          padding: "64px 72px",
          fontFamily: "sans-serif"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 18px",
              borderRadius: "9999px",
              backgroundColor: "#0F172A",
              border: "1px solid #1E293B",
              color: "#38BDF8",
              fontSize: "20px",
              fontWeight: 600
            }}
          >
            <span>@{PROFILE_DATA.handle}</span>
            <span style={{ color: "#64748B" }}>·</span>
            <span style={{ color: "#CBD5E1" }}>SMK PPLG</span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "20px",
              color: "#94A3B8",
              fontWeight: 500
            }}
          >
            hamm22projects.dev
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            maxWidth: "960px"
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "24px",
              fontWeight: 600,
              color: "#38BDF8"
            }}
          >
            {PROFILE_DATA.name} · {PROFILE_DATA.role}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "58px",
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: "-0.025em",
              color: "#F8FAFC"
            }}
          >
            {PROFILE_DATA.heroHeadline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: "28px",
            borderTop: "1px solid #1E293B"
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "14px",
              fontSize: "20px",
              color: "#CBD5E1"
            }}
          >
            <span>React.js</span>
            <span style={{ color: "#38BDF8" }}>·</span>
            <span>Next.js</span>
            <span style={{ color: "#38BDF8" }}>·</span>
            <span>Laravel</span>
            <span style={{ color: "#38BDF8" }}>·</span>
            <span>Flutter</span>
            <span style={{ color: "#38BDF8" }}>·</span>
            <span>GSAP</span>
          </div>

          <div
            style={{
              display: "flex",
              padding: "10px 20px",
              borderRadius: "8px",
              backgroundColor: "#2563EB",
              color: "#F8FAFC",
              fontSize: "18px",
              fontWeight: 700
            }}
          >
            {PROFILE_DATA.tagline}
          </div>
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
