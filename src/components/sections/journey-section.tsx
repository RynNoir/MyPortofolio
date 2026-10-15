import { ArrowUpRight, Award, BadgeCheck, GraduationCap, Trophy, Users, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getProjectBySlug } from "@/data/projects";
import { certifications, journeyKindLabels, timeline, type JourneyKind } from "@/data/journey";
import { cn, usableUrl } from "@/lib/utils";

const kindIcons: Record<JourneyKind, LucideIcon> = {
  education: GraduationCap,
  organization: Users,
  achievement: Trophy,
  certification: BadgeCheck,
  project: Award,
};

export function JourneySection() {
  return (
    <section id="journey" aria-labelledby="journey-title" className="border-t border-line py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            id="journey-title"
            index="04"
            label="Journey"
            title="Education & Journey"
            description="Education, organizational experience, and recognition along the way."
          />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <ol className="lg:col-span-8">
            {timeline.map((item) => {
              const Icon = kindIcons[item.kind];
              const highlight = item.kind === "achievement";
              return (
                <Reveal
                  as="li"
                  key={`${item.title}-${item.organization}`}
                  className="grid gap-3 border-t border-line py-8 first:border-t-0 first:pt-0 sm:grid-cols-[9.5rem_1fr] sm:gap-8"
                >
                  <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-2">
                    {item.period ? <p className="font-mono text-sm text-fg">{item.period}</p> : null}
                    <p className="eyebrow flex items-center gap-1.5 text-[0.65rem] text-subtle">
                      <Icon aria-hidden="true" className={cn("size-3.5", highlight && "text-lime")} />
                      {journeyKindLabels[item.kind]}
                    </p>
                  </div>
                  <div
                    className={cn(
                      highlight && "rounded-[var(--radius-card)] border border-lime/30 bg-lime/[0.05] p-5 sm:p-6",
                    )}
                  >
                    <h3 className={cn("text-xl font-medium sm:text-2xl", highlight ? "text-lime" : "text-fg")}>
                      {item.title}
                    </h3>
                    <p className="mt-1 text-muted">
                      {item.organization}
                      {item.location ? <span className="text-subtle"> · {item.location}</span> : null}
                    </p>
                    {item.description ? <p className="mt-3 leading-relaxed text-fg/85">{item.description}</p> : null}
                    {item.projectSlug && getProjectBySlug(item.projectSlug) ? (
                      <Link
                        href={`/projects/${item.projectSlug}`}
                        className="mt-4 inline-flex min-h-9 items-center gap-1.5 font-mono text-xs text-lime hover:underline hover:underline-offset-4"
                      >
                        Read the case study
                        <ArrowUpRight aria-hidden="true" className="size-3.5" />
                      </Link>
                    ) : null}
                    {item.points ? (
                      <ul className="mt-4 grid gap-2.5">
                        {item.points.map((point) => (
                          <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                            <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-lime" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </Reveal>
              );
            })}
          </ol>

          {certifications.length > 0 ? (
            <Reveal as="article" className="self-start rounded-[var(--radius-card)] border border-line bg-surface/60 p-5 sm:p-6 lg:sticky lg:top-28 lg:col-span-4">
              <h3 className="eyebrow flex items-center gap-2 text-muted">
                <BadgeCheck aria-hidden="true" className="size-4 text-lime" />
                Certifications
              </h3>
              <ul className="mt-5 grid gap-4">
                {certifications.map((item) => {
                  const credential = usableUrl(item.credentialUrl);
                  return (
                    <li key={item.title} className="border-t border-line pt-4 first:border-t-0 first:pt-0">
                      <p className="font-medium text-fg">{item.title}</p>
                      <p className="mt-1 text-sm text-muted">
                        {item.organization}
                        {item.period ? ` · ${item.period}` : null}
                      </p>
                      {credential ? (
                        <a
                          href={credential}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline mt-2 inline-block font-mono text-xs text-lime"
                        >
                          View credential<span className="sr-only"> for {item.title} (opens in a new tab)</span>
                        </a>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
