import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#060B19",
          borderRadius: "36px",
          border: "4px solid #1E293B",
          position: "relative",
          fontFamily: "sans-serif"
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "132px",
            height: "132px",
            borderRadius: "9999px",
            border: "3px solid rgba(56, 189, 248, 0.55)"
          }}
        />
        <span
          style={{
            fontSize: "58px",
            fontWeight: 800,
            color: "#F8FAFC",
            letterSpacing: "-0.04em"
          }}
        >
          H22
        </span>
      </div>
    ),
    { ...size }
  );
}
