import { ArrowUpRight, Download, MapPin } from "lucide-react";
import { CopyButton } from "@/components/contact/copy-button";
import { ButtonLink } from "@/components/ui/button";
import { ContactIcon } from "@/components/ui/contact-icon";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/data/site-config";
import { cvFileName, getContactLinks, getCvPath } from "@/lib/links";

const cardBase =
  "relative flex min-h-40 flex-col justify-between gap-6 rounded-[var(--radius-card)] border border-line bg-surface/60 p-5 sm:p-6";
const linkCard = `group ${cardBase} transition-colors hover:border-lime/40 hover:bg-surface`;
const columns: Record<number, string> = { 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" };

export function ContactSection() {
  const links = getContactLinks();
  const email = links.find((link) => link.id === "email");
  const cvPath = getCvPath();

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line pt-24 sm:pt-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-20rem] left-1/2 -z-10 h-[30rem] w-[min(50rem,120vw)] -translate-x-1/2 rounded-full bg-lime/[0.06] blur-[120px]"
      />
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow flex items-center justify-center gap-3 text-muted">
            <span className="text-lime">05</span>
            <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
            Contact
          </p>
          <h2 id="contact-title" className="text-section mt-6 font-medium text-fg">
            Have a problem <span className="text-lime">worth solving?</span>
          </h2>
          <p className="mt-5 text-lg text-muted">Let&apos;s build something meaningful together.</p>
          {email ? (
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href={email.href} className="h-12 px-7 text-base">
                Let&apos;s Connect
                <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </ButtonLink>
              {cvPath ? (
                <ButtonLink href={cvPath} download={cvFileName} variant="secondary" className="h-12 px-6">
                  <Download aria-hidden="true" className="size-4" />
                  Download CV
                </ButtonLink>
              ) : null}
            </div>
          ) : null}
        </Reveal>

        <ul className={`mt-16 grid gap-4 sm:grid-cols-2 ${columns[links.length + 1] ?? "lg:grid-cols-4"}`}>
          {links.map((link) => (
            <Reveal as="li" key={link.id} className={linkCard}>
              <div className="flex items-center justify-between gap-3">
                <span className="grid size-10 place-items-center rounded-lg border border-line bg-ink text-lime">
                  <ContactIcon id={link.id} className="size-[18px]" />
                </span>
                {link.id === "email" ? (
                  <CopyButton value={link.value} label="Copy" />
                ) : (
                  <ArrowUpRight aria-hidden="true" className="size-5 text-subtle transition-colors group-hover:text-lime" />
                )}
              </div>
              <div className="min-w-0">
                <p className="eyebrow text-subtle">{link.label}</p>
                <a
                  href={link.href}
                  className="mt-2 block font-medium break-words text-fg after:absolute after:inset-0 after:rounded-[var(--radius-card)] group-hover:text-lime"
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {link.value}
                  {link.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                </a>
              </div>
            </Reveal>
          ))}
          <Reveal as="li" className={cardBase}>
            <span className="grid size-10 place-items-center rounded-lg border border-line bg-ink text-lime">
              <MapPin aria-hidden="true" className="size-[18px]" strokeWidth={1.75} />
            </span>
            <div>
              <p className="eyebrow text-subtle">Location</p>
              <p className="mt-2 font-medium text-fg">{siteConfig.location}</p>
            </div>
          </Reveal>
        </ul>
      </Container>
    </section>
  );
}
