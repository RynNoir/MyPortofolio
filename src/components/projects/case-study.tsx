import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { ButtonLink, buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getCategoryLabel } from "@/data/projects";
import { cn, usableUrl } from "@/lib/utils";
import type { Project, ProjectFeature } from "@/types/project";
import { ArchitectureDiagram } from "./architecture-diagram";
import { FlowDiagram } from "./flow-diagram";
import { TechList } from "./project-card";
import { ProjectCover } from "./project-cover";

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="grid gap-4 text-lg leading-relaxed text-fg/85">
      {items.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </div>
  );
}

function FeatureGrid({ items }: { items: ProjectFeature[] }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.title} className="bg-surface/70 p-5 sm:[&:last-child:nth-child(odd)]:col-span-2">
          <h3 className="text-lg font-medium text-fg">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed text-fg/85">
          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-[2px] bg-lime" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Builds only the sections that have real content. */
function buildSections(project: Project): Section[] {
  const study = project.caseStudy;
  const repository = usableUrl(project.links.repository);
  const demo = usableUrl(project.links.demo);
  const sections: Section[] = [];

  if (study.overview?.length) sections.push({ id: "overview", title: "Project Overview", content: <Paragraphs items={study.overview} /> });
  if (study.problem?.length) sections.push({ id: "problem", title: "Problem Statement", content: <Paragraphs items={study.problem} /> });
  if (study.solution?.length) sections.push({ id: "solution", title: "Proposed Solution", content: <Paragraphs items={study.solution} /> });
  if (study.features?.length) sections.push({ id: "features", title: "Key Features", content: <FeatureGrid items={study.features} /> });
  if (study.stack?.length) {
    sections.push({
      id: "stack",
      title: "Technology Stack",
      content: (
        <dl className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line">
          {study.stack.map((group) => (
            <div key={group.group} className="grid gap-3 bg-surface/70 p-4 sm:grid-cols-[10rem_1fr] sm:items-center sm:px-5">
              <dt className="eyebrow text-[0.65rem] text-subtle">{group.group}</dt>
              <dd>
                <TechList items={group.items} />
              </dd>
            </div>
          ))}
        </dl>
      ),
    });
  }
  if (study.contribution?.length) {
    sections.push({ id: "contribution", title: "My Role & Contribution", content: <BulletList items={study.contribution} /> });
  }
  if (study.architecture || study.flow) {
    sections.push({
      id: "architecture",
      title: "Architecture Overview",
      content: (
        <div className="grid gap-10">
          {study.architecture ? (
            <ArchitectureDiagram layers={study.architecture.layers} caption={study.architecture.description} />
          ) : null}
          {study.flow ? (
            <div>
              <h3 className="mb-4 text-xl font-medium text-fg">{study.flow.title}</h3>
              <FlowDiagram steps={study.flow.steps} caption={study.flow.description} />
            </div>
          ) : null}
        </div>
      ),
    });
  }
  if (study.challenges?.length) sections.push({ id: "challenges", title: "Technical Challenges", content: <FeatureGrid items={study.challenges} /> });
  if (study.decisions?.length) sections.push({ id: "decisions", title: "Implementation Decisions", content: <FeatureGrid items={study.decisions} /> });
  if (study.results?.length || study.lessons?.length) {
    sections.push({
      id: "results",
      title: "Results & Lessons Learned",
      content: (
        <div className="grid gap-8">
          {study.results?.length ? <BulletList items={study.results} /> : null}
          {study.lessons?.length ? <BulletList items={study.lessons} /> : null}
        </div>
      ),
    });
  }
  if (study.screenshots?.length) {
    sections.push({
      id: "screenshots",
      title: "Screenshots",
      content: (
        <ul className="grid gap-4 sm:grid-cols-2">
          {study.screenshots.map((shot) => (
            <li
              key={shot.src}
              className={cn(
                "overflow-hidden rounded-xl border border-line bg-elevated",
                shot.device === "desktop" ? "sm:col-span-2" : "mx-auto w-full max-w-[280px]",
              )}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                sizes={shot.device === "desktop" ? "(min-width: 1024px) 800px, 100vw" : "280px"}
                className="h-auto w-full"
              />
            </li>
          ))}
        </ul>
      ),
    });
  }
  if (repository || demo) {
    sections.push({
      id: "links",
      title: "Repository & Demo",
      content: (
        <div className="flex flex-wrap gap-3">
          {repository ? (
            <a href={repository} target="_blank" rel="noopener noreferrer" className={buttonStyles("secondary")}>
              <GitHubIcon className="size-4" />
              View source on GitHub
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : null}
          {demo ? (
            <a href={demo} target="_blank" rel="noopener noreferrer" className={buttonStyles("secondary")}>
              <ExternalLink aria-hidden="true" className="size-4" />
              Open live demo
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      ),
    });
  }
  return sections;
}

export function CaseStudy({ project }: { project: Project }) {
  const sections = buildSections(project);
  const repository = usableUrl(project.links.repository);
  const demo = usableUrl(project.links.demo);

  const meta = [
    { label: "Role", value: project.role },
    { label: "Type", value: project.context },
    { label: "Year", value: project.period },
    { label: "Category", value: project.categories.map(getCategoryLabel).join(" · ") },
  ].filter((item): item is { label: string; value: string } => Boolean(item.value));

  return (
    <article className="pt-28 sm:pt-36">
      <Container>
        <Link
          href="/#projects"
          className="inline-flex min-h-10 items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-lime"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          All projects
        </Link>

        <header className="mt-8 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow text-lime">Case study</p>
            <h1 className="mt-4 text-[clamp(2.25rem,1.4rem+3.6vw,4.25rem)] leading-[1.02] font-medium tracking-[-0.04em] text-fg">
              {project.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{project.summary}</p>
            {repository || demo ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {repository ? (
                  <ButtonLink href={repository} external>
                    <GitHubIcon className="size-4" />
                    Source code
                    <span className="sr-only">(opens in a new tab)</span>
                  </ButtonLink>
                ) : null}
                {demo ? (
                  <ButtonLink href={demo} external variant="secondary">
                    <ExternalLink aria-hidden="true" className="size-4" />
                    Live demo
                    <span className="sr-only">(opens in a new tab)</span>
                  </ButtonLink>
                ) : null}
              </div>
            ) : null}
          </div>
          <dl className="grid content-start gap-px self-end overflow-hidden rounded-[var(--radius-card)] border border-line bg-line lg:col-span-4">
            {meta.map((item) => (
              <div key={item.label} className="flex items-baseline justify-between gap-4 bg-surface/70 px-4 py-3">
                <dt className="eyebrow text-[0.65rem] text-subtle">{item.label}</dt>
                <dd className="text-right text-sm text-fg">{item.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <ProjectCover cover={project.cover} priority className="mt-12 h-72 sm:h-96" />
        <TechList items={project.technologies} className="mt-4" />

        <div className="mt-16 grid gap-12 lg:grid-cols-[13rem_1fr] lg:gap-16">
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-28">
              <p className="eyebrow text-subtle">On this page</p>
              <ol className="mt-4 grid gap-1 border-l border-line">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="-ml-px flex gap-2 border-l border-transparent py-1.5 pl-4 text-sm text-muted transition-colors hover:border-lime hover:text-fg"
                    >
                      <span className="font-mono text-xs text-subtle">{String(index + 1).padStart(2, "0")}</span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="grid min-w-0 gap-16 sm:gap-20">
            {sections.map((section, index) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-28">
                <h2 id={`${section.id}-title`} className="mb-6 flex items-baseline gap-4 text-2xl font-medium text-fg sm:text-3xl">
                  <span className="font-mono text-sm text-lime">{String(index + 1).padStart(2, "0")}</span>
                  {section.title}
                </h2>
                {section.content}
              </section>
            ))}
          </div>
        </div>

        <aside className="mt-24 flex flex-col items-start justify-between gap-6 rounded-[var(--radius-card)] border border-line bg-surface/60 p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="font-display text-2xl font-medium text-fg">Have a problem worth solving?</p>
            <p className="mt-2 text-muted">Let&apos;s talk about what you are building.</p>
          </div>
          <ButtonLink href="/#contact">
            Let&apos;s Connect
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </ButtonLink>
        </aside>
      </Container>
    </article>
  );
}
