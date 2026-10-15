import { ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { buttonStyles } from "@/components/ui/button";
import { getCategoryLabel } from "@/data/projects";
import { cn, usableUrl } from "@/lib/utils";
import type { Project } from "@/types/project";
import { ProjectCover } from "./project-cover";

export function TechList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Technologies">
      {items.map((item) => (
        <li key={item} className="rounded-md border border-line bg-ink/60 px-2 py-1 font-mono text-[0.7rem] text-muted">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ProjectCard({ project, wide }: { project: Project; wide: boolean }) {
  const repository = usableUrl(project.links.repository);
  const demo = usableUrl(project.links.demo);
  const href = `/projects/${project.slug}`;

  return (
    <article
      className={cn(
        "group relative grid h-full gap-6 rounded-[var(--radius-card)] border border-line bg-surface/70 p-4 transition-[border-color,background-color] duration-300 hover:border-lime/35 hover:bg-surface sm:p-5",
        wide && "lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:p-6",
      )}
    >
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className="block overflow-hidden rounded-xl transition-transform duration-500 ease-out group-hover:-translate-y-1"
      >
        <ProjectCover cover={project.cover} className="h-64 sm:h-72 lg:h-full lg:min-h-[340px]" />
      </Link>

      <div className="flex min-w-0 flex-col">
        <div className="flex flex-wrap items-center gap-2">
          {project.categories.map((category) => (
            <span key={category} className="eyebrow rounded-full border border-lime/25 bg-lime/[0.06] px-2.5 py-1 text-[0.65rem] text-lime">
              {getCategoryLabel(category)}
            </span>
          ))}
          {project.context ? <span className="font-mono text-xs text-subtle">{project.context}</span> : null}
        </div>

        <h3 className="mt-4 text-2xl font-medium text-fg sm:text-[1.75rem] sm:leading-tight">
          <Link href={href} className="transition-colors hover:text-lime">
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>
        {project.role ? (
          <p className="mt-4 font-mono text-xs text-muted">
            <span className="text-subtle">My role · </span>
            {project.role}
          </p>
        ) : null}

        <h4 className="eyebrow mt-6 text-subtle">Highlights</h4>
        <ul className="mt-3 grid gap-2.5">
          {project.highlights.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-fg/85">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-[2px] bg-lime" />
              {item}
            </li>
          ))}
        </ul>

        <TechList items={project.technologies} className="mt-6" />

        <div className="mt-8 flex flex-wrap items-center gap-2 pt-1 lg:mt-auto lg:pt-8">
          <Link href={href} className={buttonStyles("primary")}>
            Read case study
            <span className="sr-only">: {project.title}</span>
            <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Link>
          {repository ? (
            <a href={repository} target="_blank" rel="noopener noreferrer" className={buttonStyles("secondary")}>
              <GitHubIcon className="size-4" />
              Source code
              <span className="sr-only">for {project.title} on GitHub (opens in a new tab)</span>
            </a>
          ) : null}
          {demo ? (
            <a href={demo} target="_blank" rel="noopener noreferrer" className={buttonStyles("secondary")}>
              <ExternalLink aria-hidden="true" className="size-4" />
              Live demo
              <span className="sr-only">for {project.title} (opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
