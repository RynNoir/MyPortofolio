import { NextResponse, type NextRequest } from "next/server";
import { getPublishedProjects } from "@/data/projects";

const knownSlugs = new Set(getPublishedProjects().map((project) => project.slug));

/**
 * Case-study pages stream from a prerendered shell, so an unknown slug would
 * otherwise reach the browser with status 200. Rewriting to a path that has no
 * route renders the app's not-found page with a real 404 status.
 */
function decode(segment: string): string | null {
  try {
    return decodeURIComponent(segment);
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const segment = request.nextUrl.pathname.split("/")[2];
  const slug = segment ? decode(segment) : null;
  if (segment && (!slug || !knownSlugs.has(slug))) {
    return NextResponse.rewrite(new URL("/__project-not-found", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/projects/:slug",
};
