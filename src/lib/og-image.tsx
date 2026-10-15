import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site-config";

export const ogSize = { width: 1200, height: 630 };

interface OgImageOptions {
  eyebrow: string;
  title: React.ReactNode;
  footer: string;
}

/** Shared social card layout for the home page and case studies. */
export function renderOgImage({ eyebrow, title, footer }: OgImageOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#101310",
          backgroundImage:
            "linear-gradient(rgba(231,236,230,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(231,236,230,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          color: "#E7ECE6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#C2FF72",
              color: "#101310",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            {siteConfig.initials}
          </div>
          <div style={{ fontSize: 28, color: "#A0AAA0" }}>{eyebrow}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 80, fontWeight: 700, letterSpacing: -3, lineHeight: 1.04 }}>
          {title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#A0AAA0" }}>
          <span>{footer}</span>
          <span style={{ color: "#C2FF72" }}>{siteConfig.name}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
