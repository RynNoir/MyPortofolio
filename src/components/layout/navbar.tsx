"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation, siteConfig, type SectionId } from "@/data/site-config";
import { cn } from "@/lib/utils";

function useActiveSection(enabled: boolean): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    // Mark a section active while it crosses a band just below the navbar.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(isHome);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <nav
        aria-label="Primary"
        className="mx-auto max-w-[1200px] rounded-2xl border border-line bg-ink/75 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.8)] backdrop-blur-md"
      >
        <div className="flex h-14 items-center justify-between gap-4 pr-2 pl-3 sm:h-16 sm:pl-4">
          <Link href="/#home" className="group flex items-center gap-3 rounded-md" onClick={() => setOpen(false)}>
            <span
              aria-hidden="true"
              className="grid size-8 place-items-center rounded-lg bg-lime font-mono text-[0.7rem] font-medium tracking-tight text-ink transition-transform duration-300 group-hover:-rotate-6"
            >
              {siteConfig.initials}
            </span>
            <span className="font-display text-[0.95rem] font-medium tracking-tight text-fg">{siteConfig.name}</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "link-underline px-2.5 py-1 font-mono text-[0.78rem] transition-colors lg:px-3",
                      isActive ? "text-lime" : "text-muted hover:text-fg",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/#contact"
              className="hidden min-h-10 items-center rounded-full bg-lime px-4 text-sm font-medium text-ink transition-colors hover:bg-[#d4ff9a] lg:inline-flex"
            >
              Let&apos;s Connect
            </Link>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-xl text-fg transition-colors hover:bg-elevated md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open ? (
            <m.div
              id="mobile-menu"
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden md:hidden"
            >
              <ul className="grid gap-1 border-t border-line px-3 py-3">
                {navigation.map((item, index) => (
                  <li key={item.id}>
                    <Link
                      href={`/#${item.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={active === item.id ? "true" : undefined}
                      className={cn(
                        "flex min-h-12 items-center justify-between rounded-xl px-3 text-base transition-colors hover:bg-elevated",
                        active === item.id ? "text-lime" : "text-fg",
                      )}
                    >
                      {item.label}
                      <span aria-hidden="true" className="font-mono text-xs text-subtle">
                        0{index + 1}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </m.div>
          ) : null}
        </AnimatePresence>
      </nav>
    </header>
  );
}
