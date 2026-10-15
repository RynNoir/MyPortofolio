import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[80dvh] flex-col justify-center pt-32 pb-16">
      <p className="font-mono text-sm text-lime">
        <span aria-hidden="true">$ </span>GET this-page → 404
      </p>
      <h1 className="text-display mt-6 font-medium text-fg">
        Page not <span className="text-muted">found.</span>
      </h1>
      <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
        The page you are looking for does not exist or may have moved. Head back to the portfolio to explore selected
        projects.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/">
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to home
        </ButtonLink>
        <ButtonLink href="/#projects" variant="secondary">
          View projects
        </ButtonLink>
      </div>
    </Container>
  );
}
