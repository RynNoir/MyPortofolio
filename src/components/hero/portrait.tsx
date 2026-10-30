import { MapPin } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/data/site-config";

/**
 * Hero portrait: 4:5 on phones, a 3:2 cover on tablets, and from lg it stretches to
 * the height of the intro column so both sides of the row stay balanced.
 */
export function Portrait({ eyebrow }: { eyebrow: string }) {
  const { photo } = siteConfig;

  return (
    <div className="relative mx-auto h-full w-full max-w-sm sm:max-w-none">
      <div
        aria-hidden="true"
        className="absolute -inset-2.5 hidden rounded-[calc(var(--radius-card)+0.625rem)] border border-dashed border-line-strong/70 lg:block"
      />
      <figure className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-[0_30px_80px_-40px_rgb(0_0_0/0.9)] sm:aspect-[3/2] lg:aspect-auto lg:h-full lg:min-h-[30rem]">
        <Image
          src={photo.portrait}
          alt={photo.alt}
          fill
          placeholder="blur"
          fetchPriority="high"
          sizes="(min-width: 1200px) 460px, (min-width: 1024px) 40vw, (min-width: 640px) 100vw, 384px"
          className="object-cover object-[50%_30%]"
        />
        <p className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-ink/70 px-3 py-1.5 font-mono text-[0.7rem] text-fg backdrop-blur-sm">
          <MapPin aria-hidden="true" className="size-3.5 text-lime" />
          {siteConfig.location}
        </p>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink via-ink/60 to-transparent"
        />
        <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <p className="font-display text-xl font-medium tracking-tight text-fg sm:text-2xl">{siteConfig.name}</p>
          <p className="mt-1 font-mono text-xs text-lime">{eyebrow}</p>
        </figcaption>
      </figure>
    </div>
  );
}
