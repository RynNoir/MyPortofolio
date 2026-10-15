"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useState } from "react";
import { projectCategories } from "@/data/projects";
import { cn } from "@/lib/utils";
import type { Project, ProjectCategory } from "@/types/project";
import { ProjectCard } from "./project-card";

type Filter = "all" | ProjectCategory;

export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  // Only offer filters that have at least one project behind them.
  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All", count: projects.length },
    ...projectCategories
      .map((category) => ({
        id: category.id,
        label: category.label,
        count: projects.filter((project) => project.categories.includes(category.id)).length,
      }))
      .filter((option) => option.count > 0),
  ];

  const visible = filter === "all" ? projects : projects.filter((project) => project.categories.includes(filter));

  // Featured projects span the full row. Regular ones sit two per row, and a
  // leftover regular card is widened so the grid never shows an empty slot.
  const regular = visible.filter((project) => !project.featured);
  const lonely = regular.length % 2 === 1 ? regular[regular.length - 1] : undefined;
  const isWide = (project: Project) => project.featured || project === lonely;

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {filters.map((option) => {
          const active = option.id === filter;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(option.id)}
              className={cn(
                "inline-flex min-h-10 items-center gap-2 rounded-full border px-4 font-mono text-xs transition-colors",
                active
                  ? "border-lime bg-lime text-ink"
                  : "border-line bg-surface/60 text-muted hover:border-line-strong hover:text-fg",
              )}
            >
              {option.label}
              <span className={cn("tabular-nums", active ? "text-ink/70" : "text-subtle")}>{option.count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>

      <ul className="mt-8 grid gap-5 lg:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <m.li
              key={project.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={cn(isWide(project) && "lg:col-span-2")}
            >
              <ProjectCard project={project} wide={isWide(project)} />
            </m.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
