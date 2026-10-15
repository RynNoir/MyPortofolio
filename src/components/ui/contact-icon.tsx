import { Mail } from "lucide-react";
import type { ContactLinkId } from "@/lib/links";
import { GitHubIcon, LinkedInIcon } from "./brand-icons";

export function ContactIcon({ id, className }: { id: ContactLinkId; className?: string }) {
  if (id === "github") return <GitHubIcon className={className} />;
  if (id === "linkedin") return <LinkedInIcon className={className} />;
  return <Mail aria-hidden="true" className={className} strokeWidth={1.75} />;
}
