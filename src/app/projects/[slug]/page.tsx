import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CaseStudy } from "@/components/projects/case-study";
import { Container } from "@/components/ui/container";
import { getProjectBySlug, getPublishedProjects } from "@/data/projects";
import { hasConfiguredSiteUrl } from "@/lib/utils";

// Requires at least one published project (Cache Components rejects an empty list).
export function generateStaticParams() {
  return getPublishedProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found", robots: { index: false } };

  const path = `/projects/${project.slug}`;
  return {
    title: project.title,
    description: project.summary,
    alternates: hasConfiguredSiteUrl() ? { canonical: path } : undefined,
    openGraph: {
      type: "article",
      url: path,
      title: project.title,
      description: project.summary,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
    },
  };
}

// Params are read inside <Suspense> so the route keeps a static App Shell.
// Unknown slugs never reach this page: src/proxy.ts answers them with a 404.
async function ProjectContent({ params }: Pick<PageProps<"/projects/[slug]">, "params">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return <CaseStudy project={project} />;
}

function CaseStudySkeleton() {
  return (
    <Container className="pt-36">
      <div aria-busy="true">
        <div className="h-4 w-28 animate-pulse rounded bg-surface" />
        <div className="mt-10 h-14 w-3/4 animate-pulse rounded bg-surface" />
        <div className="mt-6 h-5 w-1/2 animate-pulse rounded bg-surface" />
        <div className="mt-12 h-72 animate-pulse rounded-[var(--radius-card)] bg-surface sm:h-96" />
        <span className="sr-only">Loading case study…</span>
      </div>
    </Container>
  );
}

export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <Suspense fallback={<CaseStudySkeleton />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}
