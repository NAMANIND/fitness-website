import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sara Fiorvento — Online Personal Trainer for Women";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#1A1A1A",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: "#C9A882",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Online Personal Trainer
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#F9F6F1",
            lineHeight: 1.05,
            textTransform: "uppercase",
            maxWidth: 900,
          }}
        >
          Strong Looks Good On You
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#FF4D6D",
            marginTop: 32,
            fontWeight: 600,
          }}
        >
          Sara Fiorvento · @fitsarax
        </div>
      </div>
    ),
    { ...size },
  );
}
