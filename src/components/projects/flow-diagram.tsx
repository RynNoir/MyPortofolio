import type { FlowStep } from "@/types/project";

/** Numbered pipeline: vertical on small screens, a three-column grid on large ones. */
export function FlowDiagram({ steps, caption }: { steps: FlowStep[]; caption?: string }) {
  return (
    <figure>
      <ol className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.label} className="relative flex flex-col gap-2 bg-surface/80 p-5">
            <div className="flex items-center gap-3">
              <span className="grid size-7 place-items-center rounded-md border border-lime/40 bg-lime/10 font-mono text-xs text-lime">
                {index + 1}
              </span>
              <p className="font-display text-lg font-medium text-fg">{step.label}</p>
            </div>
            <p className="text-sm leading-relaxed text-muted">{step.detail}</p>
          </li>
        ))}
      </ol>
      {caption ? <figcaption className="mt-4 text-sm text-subtle">{caption}</figcaption> : null}
    </figure>
  );
}
