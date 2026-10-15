import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  {
    title: "Understand the Problem",
    description:
      "Clarify who the users are, what they need to achieve, and which constraints the solution has to respect before writing any code.",
    outputs: ["Requirements", "User flows", "Constraints"],
  },
  {
    title: "Design the Solution",
    description:
      "Shape the architecture, data model, API contracts, and application flow so the build starts from a clear structure.",
    outputs: ["Architecture", "Data model", "API contract"],
  },
  {
    title: "Build & Validate",
    description:
      "Implement features in small steps, check them against the requirements, and fix problems as they surface.",
    outputs: ["Features", "Tests", "Fixes"],
  },
  {
    title: "Measure & Improve",
    description:
      "Evaluate the result with the data or feedback that is available, then refine the solution where it matters most.",
    outputs: ["Feedback", "Iterations", "Notes"],
  },
];

export function ApproachSection() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="border-y border-line bg-surface/30 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            id="approach-title"
            index="02"
            label="Approach"
            title={
              <>
                How I Think, <span className="text-muted">Build &amp; Solve</span>
              </>
            }
            description="Good software starts with understanding the problem, designing a thoughtful solution, and validating the result."
          />
        </Reveal>

        <ol className="relative mt-16 grid gap-0 md:grid-cols-2 lg:grid-cols-4">
          {/* Connector line behind the step markers (desktop). */}
          <span aria-hidden="true" className="absolute top-[0.4rem] right-0 left-0 hidden h-px bg-line-strong lg:block" />
          {steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              className="relative border-l border-line pb-12 pl-6 last:pb-0 md:pb-12 lg:border-l-0 lg:pr-8 lg:pb-0 lg:pl-0"
            >
              <span
                aria-hidden="true"
                className="absolute top-[0.1rem] -left-[0.3rem] size-[0.6rem] rounded-full border border-lime bg-ink lg:top-0 lg:left-0 lg:size-[0.85rem]"
              />
              <p className="font-display text-6xl font-medium tracking-tighter text-line-strong lg:mt-10 lg:text-7xl" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-xl font-medium text-fg">
                <span className="sr-only">Step {index + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{step.description}</p>
              <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-subtle" aria-label="Typical outputs">
                {step.outputs.map((output) => (
                  <li key={output} className="before:mr-1.5 before:text-lime before:content-['›']">
                    {output}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
