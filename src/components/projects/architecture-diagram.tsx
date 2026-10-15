import { ArrowDown } from "lucide-react";
import type { ArchitectureLayer } from "@/types/project";

/** Layered architecture diagram built from plain HTML so it stays readable and responsive. */
export function ArchitectureDiagram({ layers, caption }: { layers: ArchitectureLayer[]; caption?: string }) {
  return (
    <figure className="rounded-[var(--radius-card)] border border-line bg-[#0c0f0c] p-4 sm:p-6">
      <ol className="grid gap-0">
        {layers.map((layer, index) => (
          <li key={layer.label}>
            {index > 0 ? (
              <div aria-hidden="true" className="flex justify-center py-2 text-line-strong">
                <ArrowDown className="size-4" />
              </div>
            ) : null}
            <div className="grid gap-3 rounded-xl border border-dashed border-line-strong/70 p-3 sm:grid-cols-[9rem_1fr] sm:items-center sm:p-4">
              <p className="eyebrow text-[0.65rem] text-lime">{layer.label}</p>
              <ul className="flex flex-wrap gap-2">
                {layer.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-line bg-surface px-3 py-2 font-mono text-[0.72rem] leading-snug text-fg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      {caption ? <figcaption className="mt-4 text-sm text-subtle">{caption}</figcaption> : null}
    </figure>
  );
}
