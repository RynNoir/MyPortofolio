"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

type Status = "idle" | "copied" | "failed";

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timer = window.setTimeout(() => setStatus("idle"), 2000);
    return () => window.clearTimeout(timer);
  }, [status]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="relative z-10 inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line px-3 font-mono text-xs text-muted transition-colors hover:border-lime/60 hover:text-lime"
    >
      {status === "copied" ? (
        <Check aria-hidden="true" className="size-3.5 text-lime" />
      ) : (
        <Copy aria-hidden="true" className="size-3.5" />
      )}
      <span aria-live="polite">
        {status === "copied" ? "Copied" : status === "failed" ? "Copy failed" : label}
      </span>
    </button>
  );
}
