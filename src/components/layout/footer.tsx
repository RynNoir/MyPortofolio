import { cacheLife } from "next/cache";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ContactIcon } from "@/components/ui/contact-icon";
import { navigation, siteConfig } from "@/data/site-config";
import { getContactLinks } from "@/lib/links";

// Cached so the static shell can be prerendered; refreshed daily.
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  const links = getContactLinks();

  return (
    <footer className="mt-24 border-t border-line">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.2fr_1fr_auto] md:items-start">
        <div>
          <p className="font-display text-lg font-medium text-fg">{siteConfig.name}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{siteConfig.positioning}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3">
            {navigation.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/#${item.id}`}
                  className="link-underline inline-flex min-h-8 items-center font-mono text-xs text-muted hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex items-center gap-2">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                aria-label={link.label}
                className="grid size-11 place-items-center rounded-xl border border-line text-muted transition-colors hover:border-lime/60 hover:text-lime"
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <ContactIcon id={link.id} className="size-[18px]" />
              </a>
            </li>
          ))}
        </ul>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-line py-6 font-mono text-xs text-subtle sm:flex-row sm:justify-between">
        <p>
          © <CurrentYear /> {siteConfig.name}. All rights reserved.
        </p>
        <p>Built with Next.js &amp; Tailwind CSS</p>
      </Container>
    </footer>
  );
}
