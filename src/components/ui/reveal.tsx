import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}

/**
 * Fades content up as it scrolls into view using a CSS scroll-driven animation
 * (see `.reveal` in globals.css). No JavaScript is involved, so content can never
 * get stuck hidden; browsers without support simply show it immediately.
 */
export function Reveal({ children, className, as: Component = "div" }: RevealProps) {
  return <Component className={cn("reveal", className)}>{children}</Component>;
}
