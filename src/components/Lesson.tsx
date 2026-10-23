"use client";

import { FormEvent, useMemo, useState } from "react";
import { DEFAULT_LINES, flipLine, getTrigram, type Line } from "@/lib/trigrams";
import { supabase } from "@/lib/supabase";
import { TrigramLines } from "@/components/TrigramLines";

const QUESTIONS = [
  {
    id: "words",
    label: "Memorize the text first, then try to understand it.",
    feedback:
      "Words are a handle, not the thing itself. This course keeps returning to xiang (象) — the image you can test against real life — rather than reciting phrases until they sound true.",
  },
  {
    id: "image",
    label: "Read the image, then check it against what actually happens.",
    feedback:
      "This is the habit the course is built around: form a reading, watch what happens, and let the image correct you. Truth here is something you verify, not something you inherit from the page.",
  },
  {
    id: "omen",
    label: "Wait for a lucky sign before making any move.",
    feedback:
      "Divination is one small part of the Yi, not the whole of it. Timing matters, but the real lesson is judgment you can practice — not putting your life on hold until a sign appears.",
  },
] as const;

const SCENARIOS = [
  {
    id: "begin",
    title: "Start something new",
    prompt: "A plan has to begin now, while the window is still open.",
    qian:
      "Qian answers with movement. Heaven doesn't wait for a perfect plan — it keeps moving. The real question is whether you can act without letting momentum turn into stubbornness.",
    kun: "Kun answers with ground. Before a path opens, someone has to prepare the field — resources, people, patience — so the first step has somewhere to land.",
  },
  {
    id: "hold",
    title: "Get through a hard season",
    prompt: "A household or team has to get through a long, unglamorous stretch.",
    qian:
      "Qian can still work here as a backbone: a clear standard that doesn't collapse under pressure. The risk is pushing the season as if it were summer.",
    kun: "Kun is the closer match: patience, resilience, and the ability to carry weight without needing to shine. Endurance is a form of work.",
  },
  {
    id: "balance",
    title: "Lead without burning people out",
    prompt: "A decision is needed, but the people who will carry it out are already exhausted.",
    qian:
      "Qian names the decision itself — direction, timing, and the refusal to drift. Used on its own, it can spend the last of the team's energy.",
    kun: "Kun names the load-bearing work that follows the decision. The pair is the point: initiative without support becomes noise; support without initiative becomes drift.",
  },
] as const;

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
      className="flex min-h-dvh snap-start items-center justify-center px-4 pt-8 pb-24 sm:px-8 sm:pt-12 sm:pb-32"
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

export function Lesson() {
  const [questionId, setQuestionId] = useState<string | null>(null);
  const [lines, setLines] = useState<[Line, Line, Line]>(DEFAULT_LINES);
  const [changedLines, setChangedLines] = useState<[Line, Line, Line] | null>(
    null,
  );
  const [changingIndex, setChangingIndex] = useState<number | null>(null);
  const [scenarioId, setScenarioId] = useState<string | null>(null);
  const [chosenTrigram, setChosenTrigram] = useState<"qian" | "kun" | null>(
    null,
  );
  const [email, setEmail] = useState("");
  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const trigram = useMemo(() => getTrigram(lines), [lines]);
  const afterTrigram = useMemo(
    () => (changedLines ? getTrigram(changedLines) : null),
    [changedLines],
  );
  const question = QUESTIONS.find((item) => item.id === questionId);
  const scenario = SCENARIOS.find((item) => item.id === scenarioId);
  const pairingFeedback =
    scenario && chosenTrigram ? scenario[chosenTrigram] : null;

  function setUpperLine(index: 1 | 2, value: Line) {
    setLines((current) => {
      const next: [Line, Line, Line] = [...current];
      next[index] = value;
      return next;
    });
    setChangedLines(null);
    setChangingIndex(null);
  }

  function letOneLineChange() {
    const index = Math.floor(Math.random() * 3);
    const next: [Line, Line, Line] = [...lines];
    next[index] = flipLine(next[index]);
    setChangingIndex(index);
    setChangedLines(next);
  }

  async function handleContinue(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitState === "submitting" || submitState === "success") {
      return;
    }

    setSubmitState("submitting");

    const { error } = await supabase
      .from("lesson_signups")
      .insert({ email: email.trim() });

    if (error) {
      setSubmitState("error");
      return;
    }

    setSubmitState("success");
  }

  return (
    <div className="h-dvh overflow-y-auto scroll-smooth snap-y snap-mandatory">
      <SectionShell id="hero" kicker="Lesson 1 · Lines and images">
        <div className="flex min-h-[70dvh] flex-col items-center justify-center text-center">
          <h1 className="max-w-2xl text-balance font-serif text-3xl leading-[1.15] text-stone-900 sm:text-6xl sm:leading-[1.1]">
            Read the Yi as an image, not a script to recite.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-sm leading-6 text-stone-600 sm:mt-7 sm:text-lg sm:leading-8">
            This lesson builds on the Tianji opening: each line is yin or yang,
            the eight trigrams each describe a situation, and a single changing
            line is what sets the picture in motion. Scroll down to build a
            reading yourself.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:mt-12">
            <span className="h-px w-12 bg-stone-300" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-stone-400">
              Scroll to begin
            </span>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="question" kicker="Section 2 · How you approach the text">
        <div className="mx-auto w-full max-w-2xl">
          <h2 className="text-balance font-serif text-2xl text-stone-900 sm:text-4xl">
            When you open the Yi, where do you start?
          </h2>
          <p className="mt-3 max-w-xl text-pretty text-sm text-stone-600 sm:text-base">
            Pick the approach that feels closest to yours. There’s no score —
            just a note on where that approach tends to lead.
          </p>
          <div className="mt-6 rounded-3xl border border-stone-200 bg-white/70 p-4 shadow-[0_20px_50px_-32px_rgba(28,25,23,0.35)] sm:mt-10 sm:p-7">
            {question ? (
              <p className="border-l-2 border-amber-800/40 pl-4 text-base leading-7 text-stone-800 sm:pl-5 sm:text-lg sm:leading-8">
                {question.feedback}
              </p>
            ) : (
              <div className="grid gap-3">
                {QUESTIONS.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setQuestionId(item.id)}
                    className="group flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3.5 text-left text-sm text-stone-800 transition hover:border-amber-800/40 hover:bg-amber-50 sm:gap-4 sm:px-5 sm:py-4 sm:text-base"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-stone-300 text-xs text-stone-500 transition group-hover:border-amber-800/40 group-hover:text-amber-900">
                      {index + 1}
                    </span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </SectionShell>

      <SectionShell id="compose" kicker="Section 3 · Compose a trigram">
        <h2 className="text-balance font-serif text-2xl text-stone-900 sm:text-4xl">
          The bottom line is set. Choose the two above it.
        </h2>
        <p className="mt-3 max-w-xl text-pretty text-sm text-stone-600 sm:text-base">
          Trigrams are read from the bottom up. Toggle the middle and top lines,
          then see which of the eight names the three lines form.
        </p>
        <div className="mt-6 grid gap-6 sm:mt-8 sm:gap-8 md:grid-cols-[auto_1fr] md:items-center">
          <div className="flex flex-col items-center gap-5 sm:gap-7">
            <TrigramLines lines={lines} size="lg" labels />
            <div className="grid w-full max-w-xs gap-3">
              <LineToggle
                label="Middle line"
                value={lines[1]}
                onChange={(value) => setUpperLine(1, value)}
              />
              <LineToggle
                label="Top line"
                value={lines[2]}
                onChange={(value) => setUpperLine(2, value)}
              />
            </div>
          </div>
          <div className="rounded-3xl border border-stone-200 bg-white/70 p-5 sm:p-7">
            <p className="text-[10px] uppercase tracking-[0.24em] text-amber-800/80">
              Your trigram
            </p>
            <p className="mt-2 font-serif text-3xl text-stone-900 sm:text-4xl">
              {trigram.name}{" "}
              <span className="text-xl text-stone-500 sm:text-2xl">{trigram.pinyin}</span>
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-stone-500 sm:text-sm">
              {trigram.nature}
            </p>
            <p className="mt-3 text-sm leading-6 text-stone-700 sm:mt-4 sm:text-base sm:leading-7">{trigram.description}</p>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="change" kicker="Section 4 · One line changes">
        <h2 className="text-balance font-serif text-2xl text-stone-900 sm:text-4xl">
          Keep the trigram, then change one line.
        </h2>
        <p className="mt-3 max-w-xl text-pretty text-sm text-stone-600 sm:text-base">
          Change (变易, biànyì) isn’t about starting over. One line flips, and the
          image becomes one of the other eight.
        </p>
        <div className="mt-5 flex flex-col gap-4 sm:mt-7 sm:gap-5">
          <button
            type="button"
            onClick={letOneLineChange}
            className="self-start rounded-full bg-stone-900 px-5 py-3 text-sm tracking-wide text-amber-50 transition hover:bg-stone-700"
          >
            Change one line
          </button>
          <div className="flex flex-col gap-4 md:flex-row">
            <ComparisonCard title="Before" trigramName={trigram}>
              <TrigramLines lines={lines} size="sm" />
            </ComparisonCard>
            <ComparisonCard
              title="After"
              trigramName={afterTrigram}
              empty="The new trigram appears here after a line changes."
            >
              {changedLines ? (
                <TrigramLines
                  lines={changedLines}
                  changingIndex={changingIndex}
                  size="sm"
                />
              ) : null}
            </ComparisonCard>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="pair" kicker="Section 5 · Qian and Kun">
        <h2 className="text-balance font-serif text-2xl text-stone-900 sm:text-4xl">
          Match a situation with Heaven or Earth.
        </h2>
        <p className="mt-3 max-w-xl text-pretty text-sm text-stone-600 sm:text-base">
          Choose a scenario, then pick Qian or Kun. The note explains the image
          you chose — it isn’t a pass or fail.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:mt-5 md:flex-row md:gap-4">
          <TrigramChoiceCard
            title="乾 Qian"
            subtitle="Heaven · creative energy"
            selected={chosenTrigram === "qian"}
            disabled={!scenarioId}
            onClick={() => setChosenTrigram("qian")}
            lines={[1, 1, 1]}
          />
          <TrigramChoiceCard
            title="坤 Kun"
            subtitle="Earth · receptive strength"
            selected={chosenTrigram === "kun"}
            disabled={!scenarioId}
            onClick={() => setChosenTrigram("kun")}
            lines={[0, 0, 0]}
          />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {SCENARIOS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setScenarioId(item.id);
                setChosenTrigram(null);
              }}
              className={`rounded-xl border px-4 py-3.5 text-left transition sm:py-4 ${
                scenarioId === item.id
                  ? "border-amber-800 bg-amber-50"
                  : "border-stone-200 bg-white/80 hover:border-amber-800/40"
              }`}
            >
              <p className="text-sm font-medium text-stone-900 sm:text-base">{item.title}</p>
              <p className="mt-1.5 text-sm leading-6 text-stone-600 sm:mt-2">
                {item.prompt}
              </p>
            </button>
          ))}
        </div>
        {pairingFeedback ? (
          <p className="mt-4 rounded-3xl border border-stone-200 bg-white/70 p-4 text-sm leading-6 text-stone-800 sm:mt-5 sm:p-5 sm:text-base sm:leading-7">
            {pairingFeedback}
          </p>
        ) : (
          <p className="mt-4 text-sm text-stone-500 sm:mt-5">
            {scenarioId
              ? "Now choose Qian or Kun."
              : "Choose a scenario to begin."}
          </p>
        )}
      </SectionShell>

      <SectionShell id="summary" kicker="Section 6 · Carry this forward">
        <h2 className="text-balance font-serif text-2xl text-stone-900 sm:text-4xl">
          Three ideas to take with you
        </h2>
        <div className="mt-6 grid gap-5 sm:mt-8 sm:gap-6 md:grid-cols-[1.15fr_0.85fr] md:items-start">
          <ol className="divide-y divide-stone-200 overflow-hidden rounded-3xl border border-stone-200 bg-white/70">
            {[
              "Start with the image. The written name is just a label for a picture you can test.",
              "The eight trigrams are three lines read from the bottom up. Broken and unbroken lines are enough to describe a whole situation.",
              "Change happens one line at a time. Flip a single line and you get a different trigram — while Qian and Kun remain the two poles every later hexagram builds on.",
            ].map((item, index) => (
              <li key={item} className="flex gap-3 px-4 py-3.5 text-stone-800 sm:gap-4 sm:px-5 sm:py-4">
                <span className="font-serif text-lg text-amber-800 sm:text-xl">
                  {index + 1}
                </span>
                <span className="pt-0.5 text-sm leading-6 sm:text-base sm:leading-7">
                  {item}
                </span>
              </li>
            ))}
          </ol>
          <form
            onSubmit={handleContinue}
            className="flex flex-col gap-3 rounded-3xl border border-stone-200 bg-white/70 p-4 sm:p-5"
          >
            <label
              className="text-[10px] uppercase tracking-[0.24em] text-stone-500"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              disabled={
                submitState === "submitting" || submitState === "success"
              }
              className="h-11 w-full rounded-full border border-stone-300 bg-white px-5 text-stone-900 outline-none ring-amber-800/30 placeholder:text-stone-400 focus:ring-2 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={
                submitState === "submitting" || submitState === "success"
              }
              className="h-11 w-full rounded-full bg-stone-900 px-6 text-sm text-amber-50 transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitState === "submitting"
                ? "Saving..."
                : "Continue to Lesson 2"}
            </button>
            {submitState === "success" ? (
              <p className="mt-1 text-sm leading-6 text-stone-600">
                You’re all set for the next session. Lesson 2 moves on to
                hexagrams — two trigrams stacked, still read as an image.
              </p>
            ) : null}
            {submitState === "error" ? (
              <p className="mt-1 text-sm leading-6 text-red-700">
                Something went wrong. Please try again.
              </p>
            ) : null}
          </form>
        </div>
      </SectionShell>
    </div>
  );
}

function LineToggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: Line;
  onChange: (value: Line) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm text-stone-600">{label}</span>
      <div className="flex rounded-full border border-stone-200 p-1">
        <button
          type="button"
          onClick={() => onChange(1)}
          className={`rounded-full px-3 py-1 text-xs tracking-wide transition ${
            value === 1 ? "bg-stone-900 text-amber-50" : "text-stone-600"
          }`}
        >
          Unbroken
        </button>
        <button
          type="button"
          onClick={() => onChange(0)}
          className={`rounded-full px-3 py-1 text-xs tracking-wide transition ${
            value === 0 ? "bg-stone-900 text-amber-50" : "text-stone-600"
          }`}
        >
          Broken
        </button>
      </div>
    </div>
  );
}

function ComparisonCard({
  title,
  trigramName,
  empty,
  children,
}: {
  title: string;
  trigramName: ReturnType<typeof getTrigram> | null;
  empty?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col rounded-3xl border border-stone-200 bg-white/70 p-4 text-center sm:p-5 md:flex-1">
      <p className="text-[10px] uppercase tracking-[0.24em] text-stone-500">
        {title}
      </p>
      {trigramName ? (
        <>
          <p className="mt-2 font-serif text-xl text-stone-900 sm:text-2xl">
            {trigramName.name}{" "}
            <span className="text-sm text-stone-500 sm:text-base">
              {trigramName.pinyin}
            </span>
          </p>
          <div className="mt-4 flex flex-1 items-center justify-center sm:mt-5">
            {children}
          </div>
        </>
      ) : (
        <p className="mt-4 flex flex-1 items-center justify-center px-2 text-sm leading-6 text-stone-500 sm:mt-5">
          {empty}
        </p>
      )}
    </div>
  );
}

function TrigramChoiceCard({
  title,
  subtitle,
  selected,
  disabled,
  onClick,
  lines,
}: {
  title: string;
  subtitle: string;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
  lines: [Line, Line, Line];
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex w-full flex-col items-center rounded-3xl border p-4 text-center transition sm:p-5 md:flex-1 ${
        selected
          ? "border-amber-800 bg-amber-50"
          : "border-stone-200 bg-white/70 hover:border-amber-800/40"
      } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
    >
      <p className="font-serif text-xl text-stone-900 sm:text-2xl">{title}</p>
      <p className="mt-1 text-sm text-stone-500">{subtitle}</p>
      <div className="mt-4 flex flex-1 items-center justify-center sm:mt-5">
        <TrigramLines lines={lines} size="sm" />
      </div>
    </button>
  );
}
