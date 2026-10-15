import { getProjectBySlug, getPublishedProjects } from "@/data/projects";
import { ogSize, renderOgImage } from "@/lib/og-image";

export const alt = "Project case study";
export const size = ogSize;
export const contentType = "image/png";

export default async function ProjectOpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return renderOgImage({
    eyebrow: "Case study",
    title: <div style={{ display: "flex" }}>{project?.title ?? "Project"}</div>,
    footer: project?.technologies.slice(0, 4).join(" · ") ?? "",
  });
}

export function generateStaticParams() {
  return getPublishedProjects().map((project) => ({ slug: project.slug }));
}
