import { siteConfig } from "@/data/site-config";
import { ogSize, renderOgImage } from "@/lib/og-image";

export const alt = `${siteConfig.name} — ${siteConfig.positioning}`;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: siteConfig.positioning,
    title: (
      <>
        <div>Engineering solutions.</div>
        <div style={{ display: "flex" }}>
          <span style={{ color: "#A0AAA0" }}>Solving&nbsp;</span>
          <span style={{ color: "#C2FF72" }}>real problems.</span>
        </div>
      </>
    ),
    footer: siteConfig.location,
  });
}
