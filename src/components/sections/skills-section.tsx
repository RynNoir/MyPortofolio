import { ArrowUpRight, Database, Server, ShieldCheck, Smartphone, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getProjectBySlug } from "@/data/projects";
import { getVisibleSkillGroups, type SkillIcon } from "@/data/skills";

const icons: Record<SkillIcon, LucideIcon> = {
  server: Server,
  smartphone: Smartphone,
  database: Database,
  shield: ShieldCheck,
};

export function SkillsSection() {
  const groups = getVisibleSkillGroups();

  return (
    <section id="skills" aria-labelledby="skills-title" className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            id="skills-title"
            index="03"
            label="Skills"
            title="Technical Arsenal"
            description="Tools and practices I work with. Where a skill has been applied in a published project, it links to the proof."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {groups.map((group) => {
            const Icon = icons[group.icon];
            return (
              <Reveal
                as="article"
                key={group.id}
                className="flex flex-col rounded-[var(--radius-card)] border border-line bg-surface/60 p-5 sm:p-6"
              >
                <header className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs text-subtle">{`// ${group.id}`}</p>
                    <h3 className="mt-2 text-xl font-medium text-fg">{group.title}</h3>
                    <p className="mt-1 text-sm text-muted">{group.description}</p>
                  </div>
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-line bg-ink text-lime">
                    <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.75} />
                  </span>
                </header>

                <ul className="mt-6 grid gap-px overflow-hidden rounded-lg border border-line bg-line">
                  {group.skills.map((skill) => {
                    const project = skill.evidence ? getProjectBySlug(skill.evidence) : undefined;
                    return (
                      <li key={skill.name} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 bg-ink/90 px-4 py-3">
                        <div className="min-w-0">
                          <p className="font-medium text-fg">{skill.name}</p>
                          {skill.note ? <p className="mt-0.5 text-sm text-muted">{skill.note}</p> : null}
                        </div>
                        {project ? (
                          <Link
                            href={`/projects/${project.slug}`}
                            className="inline-flex min-h-8 items-center gap-1 font-mono text-[0.7rem] text-lime/90 hover:text-lime"
                          >
                            <span className="sr-only">{skill.name} is used in </span>
                            {project.slug}
                            <ArrowUpRight aria-hidden="true" className="size-3.5" />
                          </Link>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
