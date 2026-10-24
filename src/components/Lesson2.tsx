"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { HexagramLines } from "@/components/HexagramLines";
import { SiteFooter } from "@/components/SiteFooter";
import { TrigramLines } from "@/components/TrigramLines";
import { getHexagram } from "@/lib/hexagrams";
import { TRIGRAMS, type Line, type TrigramKey } from "@/lib/trigrams";

const TRIGRAM_ORDER: TrigramKey[] = [
  "111",
  "000",
  "100",
  "011",
  "010",
  "101",
  "001",
  "110",
];

const DEMO_LOWER: TrigramKey = "111";
const DEMO_UPPER: TrigramKey = "000";

const STAGES = [
  {
    label: "The first move",
    text: "Conditions are still forming. Start small and stay close to what is real.",
  },
  {
    label: "The inner situation",
    text: "What is inside becomes visible. Notice the pattern you are already in.",
  },
  {
    label: "The turning point",
    text: "The lower trigram ends. This is where the inner situation meets its limit.",
  },
  {
    label: "Stepping outside",
    text: "You enter the outer situation. What you meet now is larger than your starting condition.",
  },
  {
    label: "The decisive position",
    text: "The outer situation is at its strongest. This is the line to read most carefully.",
  },
  {
    label: "The outcome",
    text: "What the movement has become. Read it as a result, not a reward or a punishment.",
  },
];

const TAKEAWAYS = [
  "A hexagram is two trigrams. The lower half is the inner condition; the upper half is the outer situation.",
  "Eight trigrams pair into sixty-four hexagrams. The name is a handle for the whole picture — not a verdict.",
  "The six lines are stages: the first move at the bottom, the outcome at the top.",
];

function linesFor(key: TrigramKey): [Line, Line, Line] {
  return key.split("").map(Number) as [Line, Line, Line];
}

function SectionShell({
  id,
  kicker,
  children,
}: {
  id: string;
  kicker: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="flex min-h-dvh snap-start items-center justify-center px-4 pt-6 pb-20 sm:px-8 sm:pt-12 sm:pb-32"
    >
      <div className="w-full max-w-3xl">
        <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-amber-800/80 sm:text-[11px] sm:tracking-[0.28em]">
          {kicker}
        </p>
        {children}
      </div>
    </section>
  );
}

function StageButton({
  label,
  index,
  selected,
  onSelect,
  compact = false,
}: {
  label: string;
  index: number;
  selected: boolean;
  onSelect: () => void;
  compact?: boolean;
}) {
  const base = `border transition ${
    selected
      ? "border-amber-800 bg-amber-50 text-stone-900"
      : "border-stone-200 bg-white/70 text-stone-600 hover:border-amber-800/40"
  }`;

  if (compact) {
    return (
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        aria-label={`Line ${index + 1}: ${label}`}
        className={`${base} rounded-xl py-2 text-sm font-medium`}
      >
        {index + 1}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`${base} rounded-2xl px-3 py-2 text-left text-xs`}
    >
      <span className="block text-[9px] uppercase tracking-[0.16em] text-stone-400">
        Line {index + 1}
      </span>
      <span className="mt-0.5 block font-medium leading-4">{label}</span>
    </button>
  );
}

export function Lesson2() {
  const [lowerKey, setLowerKey] = useState<TrigramKey>("111");
  const [upperKey, setUpperKey] = useState<TrigramKey>("000");
  const [answer, setAnswer] = useState<"lower" | "upper" | null>(null);
  const [stage, setStage] = useState(0);

  const lower = TRIGRAMS[lowerKey];
  const upper = TRIGRAMS[upperKey];
  const hexagram = getHexagram(lowerKey, upperKey);
  const hexLines = useMemo(
    () => [...linesFor(lowerKey), ...linesFor(upperKey)],
    [lowerKey, upperKey],
  );

  function reviewStack() {
    document
      .getElementById("stack")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="h-dvh overflow-y-auto scroll-smooth snap-y snap-mandatory">
      <SectionShell id="welcome" kicker="Lesson 2 · From trigrams to hexagrams">
        <div className="flex min-h-[70dvh] flex-col items-center justify-center text-center">
          <h1 className="max-w-2xl text-balance font-serif text-3xl leading-[1.15] text-stone-900 sm:text-6xl sm:leading-[1.1]">
            Welcome to Lesson 2
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-sm leading-6 text-stone-600 sm:mt-7 sm:text-lg sm:leading-8">
            Thank you for unlocking the full course! Lesson 2 will dive into how
            two trigrams stack to form a hexagram.
          </p>
          <p className="mt-3 max-w-lg text-pretty text-sm leading-6 text-stone-500 sm:mt-4">
            You already know how to read three lines. Now we add a second
            trigram above them — and read the six-line picture as one situation.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:mt-12">
            <span className="h-px w-12 bg-stone-300" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-stone-400">
              Scroll to begin
            </span>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="halves" kicker="01 · The two halves">
        <div className="mx-auto w-full max-w-2xl">
          <h2 className="text-balance font-serif text-2xl text-stone-900 sm:text-4xl">
            The lower half is the inside. The upper half is the outside.
          </h2>
          <p className="mt-3 max-w-xl text-pretty text-sm leading-6 text-stone-600 sm:text-base">
            Two trigrams, not two readings: lower is the inner condition, upper
            is the outer situation.
          </p>

          <div className="mt-4 rounded-3xl border border-stone-200 bg-white/70 p-3 shadow-[0_20px_50px_-32px_rgba(28,25,23,0.35)] sm:mt-7 sm:p-7">
            <div className="flex flex-col items-center">
              <p className="text-[9px] uppercase tracking-[0.2em] text-stone-500 sm:text-[10px] sm:tracking-[0.22em]">
                Upper trigram · outer situation
              </p>
              <div className="mt-2 sm:mt-3">
                <TrigramLines lines={linesFor(DEMO_UPPER)} size="tight" />
              </div>
              <div className="my-3 h-px w-24 bg-stone-300 sm:my-4" />
              <p className="text-[9px] uppercase tracking-[0.2em] text-stone-500 sm:text-[10px] sm:tracking-[0.22em]">
                Lower trigram · inner condition
              </p>
              <div className="mt-2 sm:mt-3">
                <TrigramLines lines={linesFor(DEMO_LOWER)} size="tight" />
              </div>
              <p className="mt-3 text-xs text-stone-500 sm:mt-4">
                Earth over Heaven · Hexagram 11, Peace
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-3xl border border-stone-200 bg-white/70 p-3.5 sm:mt-6 sm:p-6">
            <p className="font-serif text-base text-stone-900 sm:text-xl">
              Which half describes the outer situation?
            </p>
            <div className="mt-2.5 grid grid-cols-2 gap-2 sm:mt-3">
              {(["lower", "upper"] as const).map((choice) => {
                const selected = answer === choice;
                return (
                  <button
                    key={choice}
                    type="button"
                    onClick={() => setAnswer(choice)}
                    aria-pressed={selected}
                    className={`rounded-2xl border px-3 py-2.5 text-left text-sm transition sm:px-4 sm:py-3 sm:text-base ${
                      selected
                        ? "border-amber-800 bg-amber-50 text-stone-900"
                        : "border-stone-200 bg-stone-50 text-stone-700 hover:border-amber-800/40 hover:bg-amber-50"
                    }`}
                  >
                    {choice === "lower" ? "Lower trigram" : "Upper trigram"}
                  </button>
                );
              })}
            </div>
            {answer ? (
              <p
                role="status"
                className={`mt-3 border-l-2 pl-3 text-xs leading-5 sm:pl-4 sm:text-sm sm:leading-6 ${
                  answer === "upper"
                    ? "border-amber-800/40 text-stone-800"
                    : "border-stone-300 text-stone-600"
                }`}
              >
                {answer === "upper"
                  ? "Yes. The upper half is the outer situation. The lower half is the inner starting point."
                  : "Not quite. The lower half is the inner condition. The upper half is the outer situation."}
              </p>
            ) : null}
          </div>
        </div>
      </SectionShell>

      <SectionShell id="inside" kicker="02 · Choose the inside">
        <div className="mx-auto w-full max-w-3xl">
          <h2 className="text-balance font-serif text-2xl text-stone-900 sm:text-4xl">
            Start with the inner situation.
          </h2>
          <p className="mt-3 max-w-xl text-pretty text-sm leading-6 text-stone-600 sm:text-base">
            Pick one of the eight trigrams. This becomes the lower half of your
            hexagram — the ground the reading stands on.
          </p>

          <div className="mt-4 grid grid-cols-4 gap-2 sm:mt-6 sm:gap-3">
            {TRIGRAM_ORDER.map((key) => {
              const trigram = TRIGRAMS[key];
              const selected = lowerKey === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setLowerKey(key)}
                  aria-pressed={selected}
                  className={`flex flex-col items-center rounded-2xl border p-2 text-center transition sm:p-3 ${
                    selected
                      ? "border-amber-800 bg-amber-50"
                      : "border-stone-200 bg-white/70 hover:border-amber-800/40"
                  }`}
                >
                  <TrigramLines lines={linesFor(key)} size="xs" />
                  <span className="mt-1.5 font-serif text-sm text-stone-900 sm:mt-2 sm:text-lg">
                    {trigram.name}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.14em] text-stone-500 sm:text-[10px]">
                    {trigram.nature}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-3xl border border-amber-800/20 bg-amber-50/60 p-3.5 sm:mt-6 sm:p-6">
            <p className="text-[9px] uppercase tracking-[0.2em] text-amber-900/70 sm:text-[10px] sm:tracking-[0.22em]">
              Your lower trigram
            </p>
            <p className="mt-1.5 font-serif text-lg text-stone-900 sm:mt-2 sm:text-2xl">
              {lower.name}{" "}
              <span className="text-sm text-stone-500 sm:text-base">
                {lower.pinyin}
              </span>{" "}
              <span className="text-stone-400">·</span>{" "}
              <span className="text-stone-600">{lower.nature}</span>
            </p>
            <p className="mt-1.5 max-w-2xl text-pretty text-[13px] leading-5 text-stone-600 sm:mt-2 sm:text-sm sm:leading-6">
              {lower.description}
            </p>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="stack" kicker="03 · Place the outside above">
        <div className="mx-auto w-full max-w-4xl">
          <h2 className="text-balance font-serif text-2xl text-stone-900 sm:text-4xl">
            Now stack the outer situation on top.
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-sm leading-6 text-stone-600 sm:text-base">
            Eight below and eight above make sixty-four hexagrams, each with its
            own name.
          </p>

          <div className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] sm:items-start sm:gap-4">
            <div className="rounded-3xl border border-stone-200 bg-white/70 p-2.5 sm:p-5">
              <p className="text-[9px] uppercase tracking-[0.2em] text-stone-500 sm:text-[10px] sm:tracking-[0.22em]">
                Choose the upper trigram
              </p>
              <div className="mt-2 grid grid-cols-4 gap-2 sm:mt-3">
                {TRIGRAM_ORDER.map((key) => {
                  const trigram = TRIGRAMS[key];
                  const selected = upperKey === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setUpperKey(key)}
                      aria-pressed={selected}
                      className={`flex flex-col items-center rounded-2xl border p-1.5 text-center transition sm:p-2 ${
                        selected
                          ? "border-amber-800 bg-amber-50"
                          : "border-stone-200 bg-stone-50 hover:border-amber-800/40 hover:bg-amber-50"
                      }`}
                    >
                      <TrigramLines lines={linesFor(key)} size="xs" />
                      <span className="mt-1 font-serif text-xs text-stone-900 sm:mt-1.5 sm:text-sm">
                        {trigram.name}
                      </span>
                      <span className="text-[8px] uppercase tracking-[0.1em] text-stone-500 sm:text-[9px] sm:tracking-[0.12em]">
                        {trigram.nature}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 hidden text-[11px] leading-5 text-stone-500 sm:block">
                Tap a trigram to restack the hexagram.
              </p>
            </div>

            <div className="rounded-3xl border border-stone-200 bg-white/70 p-2.5 text-center shadow-[0_20px_50px_-32px_rgba(28,25,23,0.35)] sm:p-6">
              <p className="hidden text-[9px] uppercase tracking-[0.2em] text-stone-500 sm:block sm:text-[10px] sm:tracking-[0.22em]">
                Your hexagram
              </p>
              <p className="text-[9px] uppercase tracking-[0.18em] text-amber-900/70 sm:mt-2 sm:text-[10px] sm:tracking-[0.2em]">
                Hexagram {hexagram.number}
              </p>
              <p className="mt-0.5 font-serif text-2xl text-stone-900 sm:mt-1 sm:text-3xl">
                {hexagram.name}{" "}
                <span className="text-sm text-stone-500 sm:text-base">
                  {hexagram.pinyin}
                </span>
              </p>
              <p className="mt-0.5 text-xs text-amber-900 sm:mt-1 sm:text-sm">
                {hexagram.keyword}
              </p>
              <div className="mt-2.5 flex justify-center sm:mt-4">
                <HexagramLines lines={hexLines} size="sm" labels />
              </div>
              <p className="mt-2.5 text-[9px] uppercase tracking-[0.2em] text-stone-500 sm:mt-4 sm:text-[10px] sm:tracking-[0.22em]">
                {upper.nature} over {lower.nature}
              </p>
              <p className="mt-1.5 hidden text-xs leading-5 text-stone-600 sm:mt-2 sm:block sm:text-sm sm:leading-6">
                Inner {lower.nature.toLowerCase()}, outer{" "}
                {upper.nature.toLowerCase()}.
              </p>
              <p className="mt-1.5 hidden text-xs leading-5 text-stone-500 sm:mt-2 sm:block">
                {lowerKey === upperKey
                  ? "The same trigram appears twice: this hexagram doubles one quality."
                  : "The lower half names what is starting inside; the upper half names what you meet outside."}
              </p>
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="lines" kicker="04 · Read the six lines">
        <div className="mx-auto w-full max-w-3xl">
          <h2 className="text-balance font-serif text-2xl text-stone-900 sm:text-4xl">
            A hexagram is a situation with six stages.
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-sm leading-6 text-stone-600 sm:text-base">
            Line 1 is where things begin. Line 6 is where they end. The trigram
            pair gives the setting; the six lines show how it develops.
          </p>

          <div className="mt-4 flex flex-col items-center gap-4 sm:mt-8 sm:flex-row sm:items-start sm:justify-center sm:gap-10">
            <div className="flex flex-col items-center gap-2">
              <HexagramLines
                lines={hexLines}
                highlightIndex={stage}
                size="md"
                labels
              />
              <p className="text-[9px] uppercase tracking-[0.2em] text-stone-500 sm:text-[10px]">
                {hexagram.name} · {hexagram.keyword}
              </p>
            </div>

            <div className="w-full max-w-sm">
              <div className="grid grid-cols-6 gap-1.5 sm:hidden">
                {STAGES.map((item, index) => (
                  <StageButton
                    key={item.label}
                    compact
                    label={item.label}
                    index={index}
                    selected={stage === index}
                    onSelect={() => setStage(index)}
                  />
                ))}
              </div>

              <div className="hidden grid-cols-3 gap-2 sm:grid">
                {STAGES.map((item, index) => (
                  <StageButton
                    key={item.label}
                    label={item.label}
                    index={index}
                    selected={stage === index}
                    onSelect={() => setStage(index)}
                  />
                ))}
              </div>

              <div
                role="status"
                aria-live="polite"
                className="mt-2.5 rounded-2xl border border-stone-200 bg-white/70 p-3 sm:mt-3 sm:p-4"
              >
                <p className="text-[9px] uppercase tracking-[0.2em] text-amber-900/70 sm:text-[10px]">
                  Line {stage + 1} · {STAGES[stage].label}
                </p>
                <p className="mt-1.5 text-pretty text-[13px] leading-5 text-stone-600 sm:mt-2 sm:text-sm sm:leading-6">
                  {STAGES[stage].text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionShell>

      <section
        id="summary"
        className="flex h-dvh snap-start flex-col"
      >
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pt-8 pb-4 sm:flex sm:flex-col sm:justify-center sm:px-8 sm:pt-12">
          <div className="mx-auto w-full max-w-3xl">
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-amber-800/80 sm:text-[11px] sm:tracking-[0.28em]">
              05 · Keep this
            </p>
            <h2 className="text-balance font-serif text-2xl text-stone-900 sm:text-4xl">
              Three ideas to take with you.
            </h2>

            <div className="mt-4 rounded-3xl border border-stone-200 bg-white/70 p-4 sm:mt-6 sm:p-6">
              {TAKEAWAYS.map((text, index) => (
                <div
                  key={text}
                  className={`flex gap-3 ${
                    index > 0 ? "mt-3 border-t border-stone-200 pt-3" : ""
                  }`}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-stone-300 text-[11px] text-stone-500">
                    {index + 1}
                  </span>
                  <p className="text-pretty text-sm leading-6 text-stone-600">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/"
                className="inline-flex h-11 w-full items-center justify-center rounded-full bg-stone-900 px-5 text-sm font-medium text-amber-50 transition hover:bg-stone-800 sm:w-auto"
              >
                Back to Lesson 1
              </Link>
              <button
                type="button"
                onClick={reviewStack}
                className="inline-flex h-11 w-full items-center justify-center rounded-full border border-stone-300 px-5 text-sm text-stone-700 transition hover:border-stone-400 hover:text-stone-900 sm:w-auto"
              >
                Review the stack ↑
              </button>
            </div>
            <p className="mt-3 text-center text-[11px] text-stone-400">
              Lesson 3 is coming next.
            </p>
          </div>
        </div>
        <SiteFooter compact />
      </section>
    </div>
  );
}
