import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: React.ReactNode;
  description?: string;
  id?: string;
  className?: string;
}

export function SectionHeading({ index, label, title, description, id, className }: SectionHeadingProps) {
  return (
    <div className={cn("grid gap-6 lg:grid-cols-12 lg:items-end", className)}>
      <div className="lg:col-span-7">
        <p className="eyebrow mb-5 flex items-center gap-3 text-muted">
          <span className="text-lime">{index}</span>
          <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
          {label}
        </p>
        <h2 id={id} className="text-section font-medium text-fg">
          {title}
        </h2>
      </div>
      {description ? (
        <p className="max-w-md text-base leading-relaxed text-muted lg:col-span-5 lg:justify-self-end">{description}</p>
      ) : null}
    </div>
  );
}
