import { ArrowDown, Download } from "lucide-react";
import { Portrait } from "@/components/hero/portrait";
import { Terminal, type TerminalLine } from "@/components/hero/terminal";
import { ButtonLink } from "@/components/ui/button";
import { ContactIcon } from "@/components/ui/contact-icon";
import { Container } from "@/components/ui/container";
import { getPublishedProjects } from "@/data/projects";
import { siteConfig } from "@/data/site-config";
import { getVisibleSkillGroups } from "@/data/skills";
import { timeline } from "@/data/journey";
import { cvFileName, getContactLinks, getCvPath } from "@/lib/links";

function buildTerminalCommands(): Record<string, TerminalLine[]> {
  const projects = getPublishedProjects();
  const contact = getContactLinks();
  return {
    help: [
      { text: "Available commands:", tone: "muted" },
      { text: "  about     who I am" },
      { text: "  projects  selected work" },
      { text: "  skills    technical arsenal" },
      { text: "  contact   how to reach me" },
      { text: "  clear     clear the screen" },
    ],
    about: [
      { text: siteConfig.name, tone: "accent" },
      { text: siteConfig.description },
      { text: `Based in ${siteConfig.location}.`, tone: "muted" },
    ],
    projects: [
      ...projects.map((project) => ({ text: `→ ${project.title}`, href: `/projects/${project.slug}` })),
      { text: `${projects.length} published · more on the way`, tone: "muted" },
    ],
    skills: getVisibleSkillGroups().map((group) => ({
      text: `${group.title.padEnd(20)} ${group.skills.map((skill) => skill.name).join(", ")}`,
    })),
    contact: contact.map((link) => ({ text: `${link.label.padEnd(9)} ${link.value}` })),
    clear: [],
  };
}

export function HeroSection() {
  const cvPath = getCvPath();
  const links = getContactLinks();
  const achievement = timeline.find((item) => item.kind === "achievement");
  const eyebrow =
    siteConfig.education.status === "graduate"
      ? "Information Technology Graduate"
      : "Information Technology Student";

  const facts = [
    { label: "Role", value: siteConfig.role },
    { label: "Focus", value: "Backend · Flutter" },
    { label: "Education", value: siteConfig.education.institution },
    ...(achievement ? [{ label: "Recognition", value: achievement.title.replace(" — ", ", ") }] : []),
  ];

  return (
    <section id="home" aria-labelledby="hero-title" className="relative pt-28 sm:pt-36 lg:pt-40">
      <Container>
        {/*
          Mobile order follows the DOM: intro → portrait → terminal → facts.
          From lg the intro and portrait share a row, and so do the terminal and facts.
        */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-12">
          <div className="flex flex-col justify-center lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow inline-flex animate-rise items-center gap-2.5 rounded-full border border-line bg-surface/70 px-3.5 py-2 text-muted">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-lime" />
                {eyebrow}
              </p>
              {siteConfig.availability.enabled ? (
                <p className="inline-flex animate-rise items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-3.5 py-2 font-mono text-xs text-lime">
                  <span aria-hidden="true" className="size-1.5 animate-pulse-dot rounded-full bg-lime" />
                  {siteConfig.availability.label}
                </p>
              ) : null}
            </div>

            <h1 id="hero-title" className="text-hero mt-7 font-medium text-fg">
              <span className="block animate-rise [animation-delay:80ms]">Engineering solutions.</span>
              <span className="block animate-rise text-muted [animation-delay:180ms]">
                Solving <span className="text-lime">real problems.</span>
              </span>
            </h1>

            <div className="animate-rise [animation-delay:280ms]">
              <p className="mt-7 font-mono text-xs tracking-wide text-lime">{siteConfig.positioning}</p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-fg/90 sm:text-xl">{siteConfig.intro}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/#projects">
                  Explore My Work
                  <ArrowDown aria-hidden="true" className="size-4 transition-transform group-hover/btn:translate-y-0.5" />
                </ButtonLink>
                {cvPath ? (
                  <ButtonLink href={cvPath} download={cvFileName} variant="secondary">
                    <Download aria-hidden="true" className="size-4" />
                    Download CV
                    <span className="font-mono text-[0.7rem] text-subtle">PDF</span>
                  </ButtonLink>
                ) : (
                  <p className="inline-flex min-h-11 items-center rounded-full border border-dashed border-line px-5 text-sm text-muted">
                    CV available on request
                  </p>
                )}
              </div>

              {links.length > 0 ? (
                <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1" aria-label="Social links">
                  {links.map((link) => (
                    <li key={link.id}>
                      <a
                        href={link.href}
                        className="inline-flex min-h-10 items-center gap-2 text-sm text-muted transition-colors hover:text-lime"
                        {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        <ContactIcon id={link.id} className="size-4" />
                        {link.label}
                        {link.external ? <span className="sr-only">(opens in a new tab)</span> : null}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          <div className="animate-rise [animation-delay:200ms] lg:col-span-5">
            <Portrait eyebrow={eyebrow} />
          </div>

          <div className="min-w-0 animate-rise [animation-delay:380ms] lg:col-span-7">
            <Terminal
              prompt="reyhan@portfolio"
              bootCommand="whoami"
              bootOutput={[
                { text: siteConfig.name, tone: "accent" },
                { text: siteConfig.positioning },
                { text: `${siteConfig.education.program} · ${siteConfig.education.institution}`, tone: "muted" },
                { text: " " },
                { text: "Type 'help' or tap a command below.", tone: "muted" },
              ]}
              commands={buildTerminalCommands()}
            />
          </div>

          {/* gap-px over a line-colored background draws even dividers at every breakpoint. */}
          <dl className="grid animate-rise grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line [animation-delay:440ms] sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {facts.map((fact, index) => (
              <div key={fact.label} className="flex items-center justify-between gap-4 bg-surface/80 px-5 py-4 lg:py-0">
                <div className="flex flex-col gap-1.5 lg:py-5">
                  <dt className="eyebrow text-subtle">{fact.label}</dt>
                  <dd className="font-display text-lg leading-snug font-medium text-fg">{fact.value}</dd>
                </div>
                <span aria-hidden="true" className="font-mono text-xs text-line-strong">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
