import { ArrowDown, Download } from "lucide-react";
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

        <h1 id="hero-title" className="text-display mt-8 font-medium text-fg">
          <span className="block animate-rise [animation-delay:80ms]">Engineering solutions.</span>
          <span className="block animate-rise text-muted [animation-delay:180ms]">
            Solving <span className="text-lime">real problems.</span>
          </span>
        </h1>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <div className="flex animate-rise flex-col [animation-delay:280ms] lg:col-span-5">
            <p className="font-mono text-xs tracking-wide text-lime">{siteConfig.positioning}</p>
            <p className="mt-4 text-lg leading-relaxed text-fg/90 sm:text-xl">{siteConfig.intro}</p>
            <p className="mt-4 leading-relaxed text-muted">{siteConfig.description}</p>

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
              <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2" aria-label="Social links">
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
        </div>
      </Container>

      <Container className="mt-16 lg:mt-24">
        {/* gap-px over a line-colored background draws even dividers at every breakpoint. */}
        <dl className="grid grid-cols-1 gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-2 bg-ink py-5 sm:px-5">
              <dt className="eyebrow text-subtle">{fact.label}</dt>
              <dd className="font-display text-lg font-medium text-fg">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
