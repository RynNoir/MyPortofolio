export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

const PLACEHOLDER_HOSTS = ["example.com", "example.org", "your-domain.com", "placeholder"];

/**
 * Returns the URL only when it is a real, absolute http(s) link.
 * Placeholder or empty values return null so they are never rendered.
 */
export function usableUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
    if (PLACEHOLDER_HOSTS.some((host) => parsed.hostname.includes(host))) return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

/**
 * Base URL for metadata, sitemap, and robots.
 * Order: SITE_URL → Vercel production domain → Vercel preview URL → localhost.
 */
export function getSiteUrl(): URL {
  const candidates = [
    process.env.SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
    process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
  ];
  for (const candidate of candidates) {
    if (!candidate) continue;
    try {
      return new URL(candidate);
    } catch {
      // Ignore malformed values and fall through to the next candidate.
    }
  }
  return new URL("http://localhost:3000");
}

/** True when a production domain is explicitly configured. */
export function hasConfiguredSiteUrl(): boolean {
  return Boolean(process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL);
}
