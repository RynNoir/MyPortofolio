"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface TerminalLine {
  text: string;
  tone?: "default" | "muted" | "accent";
  href?: string;
}

interface TerminalProps {
  prompt: string;
  bootCommand: string;
  bootOutput: TerminalLine[];
  /** Fixed set of supported commands. Input is only ever used as a lookup key. */
  commands: Record<string, TerminalLine[]>;
}

interface Entry {
  id: number;
  command: string;
  output: TerminalLine[];
}

const toneClass: Record<NonNullable<TerminalLine["tone"]>, string> = {
  default: "text-fg",
  muted: "text-muted",
  accent: "text-lime",
};

function Output({ lines }: { lines: TerminalLine[] }) {
  return (
    <>
      {lines.map((line, index) => (
        <p key={index} className={cn("min-h-6 break-words whitespace-pre-wrap", toneClass[line.tone ?? "default"])}>
          {line.href ? (
            <Link href={line.href} className="underline decoration-line-strong underline-offset-4 hover:text-lime">
              {line.text}
            </Link>
          ) : (
            line.text
          )}
        </p>
      ))}
    </>
  );
}

export function Terminal({ prompt, bootCommand, bootOutput, commands }: TerminalProps) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [value, setValue] = useState("");
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);
  const inputId = useId();
  const quickCommands = Object.keys(commands).filter((name) => name !== "clear");

  // Keep the newest output in view.
  useEffect(() => {
    const el = scrollRef.current;
    if (el && entries.length > 0) el.scrollTop = el.scrollHeight;
  }, [entries]);

  function run(raw: string) {
    const command = raw.trim().toLowerCase();
    setValue("");
    setHistoryIndex(null);
    if (command === "") return;
    if (command === "clear") {
      setEntries([]);
      return;
    }
    const output = Object.hasOwn(commands, command)
      ? commands[command]
      : [{ text: `command not found: ${command.slice(0, 40)}. Type 'help' to see available commands.`, tone: "muted" as const }];
    setEntries((current) => [...current.slice(-30), { id: nextId.current++, command, output }]);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const past = entries.map((entry) => entry.command);
    if (event.key === "ArrowUp" && past.length > 0) {
      event.preventDefault();
      const index = historyIndex === null ? past.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(index);
      setValue(past[index]);
    } else if (event.key === "ArrowDown" && historyIndex !== null) {
      event.preventDefault();
      const index = historyIndex + 1;
      if (index >= past.length) {
        setHistoryIndex(null);
        setValue("");
      } else {
        setHistoryIndex(index);
        setValue(past[index]);
      }
    }
  }

  return (
    <section
      aria-label="Interactive terminal"
      className="relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface/90 shadow-[0_30px_80px_-40px_rgb(0_0_0/0.9)] transition-colors has-[input:focus-visible]:border-lime/60"
    >
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-lime/80" />
        </div>
        <p className="truncate font-mono text-xs text-subtle">{prompt}: ~</p>
        <span className="font-mono text-[0.7rem] text-subtle" aria-hidden="true">
          bash
        </span>
      </div>

      <div
        ref={scrollRef}
        className="h-[300px] overflow-y-auto px-4 py-4 font-mono text-[0.8rem] leading-6 sm:h-[340px] sm:px-5 sm:text-[0.82rem]"
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
      >
        <div role="log" aria-live="polite" aria-relevant="additions">
          <p className="flex gap-2">
            <span className="shrink-0 text-lime" aria-hidden="true">
              $
            </span>
            <span className="typing" style={{ "--chars": bootCommand.length } as React.CSSProperties}>
              {bootCommand}
            </span>
          </p>
          <div className="animate-rise [animation-delay:1.5s]">
            <Output lines={bootOutput} />
          </div>

          {entries.map((entry) => (
            <div key={entry.id} className="mt-3">
              <p className="flex gap-2">
                <span className="shrink-0 text-lime" aria-hidden="true">
                  $
                </span>
                <span className="break-all text-fg">{entry.command}</span>
              </p>
              <Output lines={entry.output} />
            </div>
          ))}
        </div>

        <form
          className="mt-3 flex items-center gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            run(value);
          }}
        >
          <label htmlFor={inputId} className="shrink-0 text-lime">
            <span aria-hidden="true">$</span>
            <span className="sr-only">Terminal command. Type help to list commands.</span>
          </label>
          <input
            ref={inputRef}
            id={inputId}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={onKeyDown}
            maxLength={40}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder="type 'help'"
            className="h-8 min-w-0 flex-1 bg-transparent text-fg caret-lime outline-none placeholder:text-subtle focus-visible:outline-none"
          />
        </form>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-line px-4 py-3">
        {quickCommands.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => run(name)}
            className="min-h-9 rounded-full border border-line px-3 font-mono text-xs text-muted transition-colors hover:border-lime/60 hover:text-lime"
          >
            {name}
          </button>
        ))}
      </div>
    </section>
  );
}
