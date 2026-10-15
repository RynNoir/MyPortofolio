import Image from "next/image";
import type { ProjectCover as Cover } from "@/types/project";
import { cn } from "@/lib/utils";

const TOKEN =
  /(\/\/.*$)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|(\$\w+)|\b(while|if|else|return|function|switch|case|break|NULL|null|true|false)\b|(\b\d+\b)/gm;

/** Tiny, dependency-free highlighter for short PHP/JS-like snippets. */
function highlight(code: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  for (const match of code.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push(code.slice(last, index));
    const [text, comment, string, variable, keyword] = match;
    const className = comment
      ? "text-subtle italic"
      : string
        ? "text-lime"
        : variable
          ? "text-[#d9e3d6]"
          : keyword
            ? "text-[#9fd45a]"
            : "text-[#f2c879]";
    nodes.push(
      <span key={index} className={className}>
        {text}
      </span>,
    );
    last = index + text.length;
  }
  if (last < code.length) nodes.push(code.slice(last));
  return nodes;
}

export function ProjectCover({ cover, className, priority }: { cover: Cover; className?: string; priority?: boolean }) {
  if (cover.type === "image") {
    return (
      <div className={cn("relative overflow-hidden rounded-xl border border-line bg-elevated", className)}>
        <Image
          src={cover.src}
          alt={cover.alt}
          width={cover.width}
          height={cover.height}
          priority={priority}
          sizes="(min-width: 1024px) 560px, 100vw"
          className="h-auto w-full object-cover"
        />
      </div>
    );
  }

  const lines = cover.code.split("\n");
  return (
    <figure
      className={cn("relative flex flex-col overflow-hidden rounded-xl border border-line bg-[#0c0f0c]", className)}
    >
      <figcaption className="flex items-center justify-between gap-3 border-b border-line bg-surface/80 px-4 py-2.5">
        <span className="truncate font-mono text-[0.7rem] text-muted">{cover.file}</span>
        <span className="shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[0.62rem] text-subtle">
          source
        </span>
      </figcaption>
      <div className="relative flex-1 overflow-hidden">
        <pre className="overflow-hidden px-0 py-4 font-mono text-[0.72rem] leading-[1.6rem] sm:text-[0.76rem]">
          <code className="grid">
            {lines.map((line, index) => (
              <span key={index} className="grid grid-cols-[2.75rem_1fr]">
                <span aria-hidden="true" className="pr-4 text-right text-line-strong select-none">
                  {index + 1}
                </span>
                <span className="whitespace-pre text-muted">{highlight(line)}</span>
              </span>
            ))}
          </code>
        </pre>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0c0f0c] to-transparent"
        />
      </div>
    </figure>
  );
}
