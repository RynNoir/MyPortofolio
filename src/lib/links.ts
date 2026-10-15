import { siteConfig } from "@/data/site-config";
import { usableUrl } from "@/lib/utils";

export type ContactLinkId = "email" | "github" | "linkedin";

export interface ContactLink {
  id: ContactLinkId;
  label: string;
  href: string;
  /** Human-readable value, e.g. the email address or profile handle. */
  value: string;
  external: boolean;
}

function handleFromUrl(url: string): string {
  const path = new URL(url).pathname.replace(/\/+$/, "");
  return path.split("/").filter(Boolean).pop() ?? url;
}

/** Contact and social links that are actually configured. Unset links are left out. */
export function getContactLinks(): ContactLink[] {
  const links: ContactLink[] = [];
  const github = usableUrl(siteConfig.social.github);
  const linkedin = usableUrl(siteConfig.social.linkedin);

  if (siteConfig.email) {
    links.push({
      id: "email",
      label: "Email",
      href: `mailto:${siteConfig.email}`,
      value: siteConfig.email,
      external: false,
    });
  }
  if (github) {
    links.push({ id: "github", label: "GitHub", href: github, value: `@${handleFromUrl(github)}`, external: true });
  }
  if (linkedin) {
    // LinkedIn handles carry a numeric suffix, so show the name instead.
    links.push({ id: "linkedin", label: "LinkedIn", href: linkedin, value: siteConfig.name, external: true });
  }
  return links;
}

export function getCvPath(): string | null {
  return siteConfig.cvPath && siteConfig.cvPath.startsWith("/") ? siteConfig.cvPath : null;
}

export const cvFileName = `${siteConfig.name.replace(/\s+/g, "-")}-CV.pdf`;
