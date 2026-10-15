import { ProjectExplorer } from "@/components/projects/project-explorer";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getPublishedProjects } from "@/data/projects";

export function ProjectsSection() {
  const projects = getPublishedProjects().sort((a, b) => Number(b.featured) - Number(a.featured));
  if (projects.length === 0) return null;

  return (
    <section id="projects" aria-labelledby="projects-title" className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            id="projects-title"
            index="01"
            label="Projects"
            title="Selected Works"
            description="Selected projects that demonstrate how I design, build, and solve technical problems."
          />
        </Reveal>
        <Reveal className="mt-12">
          <ProjectExplorer projects={projects} />
        </Reveal>
      </Container>
    </section>
  );
}
