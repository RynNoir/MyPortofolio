import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group/btn inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-lime text-ink hover:bg-[#d4ff9a] shadow-[0_0_0_1px_rgb(194_255_114/0.4),0_8px_30px_-12px_rgb(194_255_114/0.6)]",
  secondary: "border border-line-strong bg-surface/60 text-fg hover:border-lime/60 hover:bg-elevated",
  ghost: "text-fg hover:text-lime",
};

export function buttonStyles(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

interface ButtonLinkProps {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  /** Opens in a new tab with safe rel attributes. */
  external?: boolean;
  /** Suggested filename for downloads. */
  download?: string;
  "aria-label"?: string;
}

export function ButtonLink({ href, variant = "primary", className, children, external, download, ...rest }: ButtonLinkProps) {
  const classes = buttonStyles(variant, className);

  if (external || download || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        download={download}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
