"use client";

import { FormEvent, useMemo, useState } from "react";
import { DEFAULT_LINES, flipLine, getTrigram, type Line } from "@/lib/trigrams";
import { TrigramLines } from "@/components/TrigramLines";

const QUESTIONS = [
  {
    id: "words",
    label: "Treat the classic as a text to memorize.",
    feedback:
      "Words are a handle, not the thing itself. The Tianji opening lesson keeps returning to 象 — the image you can test against life — instead of reciting phrases until they feel true.",
  },
  {
    id: "image",
    label: "Read the image, then check it against what actually happens.",
    feedback:
      "This is the habit the course asks for: form a reading, watch the result, and let the image correct you. Truth here is verified, not inherited from the page.",
  },
  {
    id: "omen",
    label: "Wait for a lucky sign before making any move.",
    feedback:
      "Divination is called a small department of the Yi, not the whole house. Timing matters, but the lesson is still about judgment you can practice — not about postponing life until a sign appears.",
  },
] as const;

const SCENARIOS = [
  {
    id: "begin",
    title: "Open a path",
    prompt: "A plan must start now, while the window is still clear.",
    qian:
      "Qian answers with movement. Heaven does not wait for a complete map; it keeps going, and the image asks whether you can act without turning force into stubbornness.",
    kun: "Kun answers with ground. Before a path is opened, someone has to hold the field — supplies, people, patience — so the first step has somewhere to land.",
  },
  {
    id: "hold",
    title: "Carry the winter",
    prompt: "A household or team must endure a long, unglamorous season.",
    qian:
      "Qian can still serve here as a spine: a clear standard that does not collapse. The risk is pushing the season as if it were summer.",
    kun: "Kun is the closer match in 象: thickness, forbearance, and the capacity to bear weight without needing to shine. Endurance is a form of work.",
  },
  {
    id: "balance",
    title: "Lead without emptying the ground",
    prompt: "A decision is needed, but the people who carry it out are already tired.",
    qian:
      "Qian names the decision itself — direction, timing, the refusal to drift. Used alone, it can spend the last of the group’s strength.",
    kun: "Kun names the load-bearing work after the decision. The pair is the point: initiative without a field becomes noise; a field without initiative becomes drift.",
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
      className="flex h-dvh snap-start items-center justify-center overflow-hidden px-5 py-6 sm:px-8"
    >
      <div className="w-full max-w-3xl">
        <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-amber-800/80">
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
  const [submitted, setSubmitted] = useState(false);

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

  function handleContinue(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="h-dvh overflow-y-auto scroll-smooth snap-y snap-mandatory">
      <SectionShell id="hero" kicker="Lesson 1 · Lines and images">
        <div className="flex min-h-[70dvh] flex-col items-center justify-center text-center">
          <h1 className="max-w-xl font-serif text-4xl leading-tight text-stone-900 sm:text-6xl">
            The Yi is read as image, not as a script to recite.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-stone-600 sm:text-lg">
            This lesson borrows the Tianji opening: a line is yin or yang, eight
            trigrams name a situation, and one changing line is how a picture
            moves. Scroll to build the reading with your hands.
          </p>
        </div>
      </SectionShell>

      <SectionShell id="question" kicker="Section 2 · How do you study">
        <h2 className="font-serif text-2xl text-stone-900 sm:text-4xl">
          What is the first move when you open the classic?
        </h2>
        <p className="mt-2 max-w-xl text-stone-600">
          Choose one approach. There is no score — only a note on what that
          choice tends to produce.
        </p>
        <div className="mt-8 rounded-2xl border border-stone-200 bg-white/80 p-6 shadow-[0_20px_50px_-32px_rgba(28,25,23,0.45)]">
          {question ? (
            <p className="text-lg leading-8 text-stone-800">{question.feedback}</p>
          ) : (
            <div className="grid gap-3">
              {QUESTIONS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setQuestionId(item.id)}
                  className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-4 text-left text-stone-800 transition hover:border-amber-800/40 hover:bg-amber-50"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </SectionShell>

      <SectionShell id="compose" kicker="Section 3 · Compose a trigram">
        <h2 className="font-serif text-2xl text-stone-900 sm:text-4xl">
          One solid line is given. Choose the two above it.
        </h2>
        <p className="mt-2 max-w-xl text-sm text-stone-600 sm:text-base">
          Lines are read from the bottom up. The lowest line is already
          unbroken. Toggle the middle and top, then read the name that the three
          lines make.
        </p>
        <div className="mt-5 grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
          <div className="flex flex-col items-start gap-5">
            <TrigramLines lines={lines} size="lg" labels />
            <div className="grid w-full gap-3">
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
          <div className="rounded-2xl border border-stone-200 bg-white/80 p-6">
            <p className="text-[11px] uppercase tracking-[0.24em] text-amber-800/80">
              Result
            </p>
            <p className="mt-2 font-serif text-4xl text-stone-900">
              {trigram.name}{" "}
              <span className="text-2xl text-stone-500">{trigram.pinyin}</span>
            </p>
            <p className="mt-1 text-sm uppercase tracking-[0.18em] text-stone-500">
              {trigram.nature}
            </p>
            <p className="mt-4 leading-7 text-stone-700">{trigram.description}</p>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="change" kicker="Section 4 · One line changes">
        <h2 className="font-serif text-2xl text-stone-900 sm:text-4xl">
          Keep the trigram, then let one line move.
        </h2>
        <p className="mt-2 max-w-xl text-sm text-stone-600 sm:text-base">
          变易 is not a new drawing from scratch. One line flips, and the image
          becomes another of the eight.
        </p>
        <div className="mt-5 flex flex-col gap-4">
          <button
            type="button"
            onClick={letOneLineChange}
            className="self-start rounded-full bg-stone-900 px-5 py-3 text-sm tracking-wide text-amber-50 transition hover:bg-stone-700"
          >
            Let one line change
          </button>
          <div className="grid grid-cols-2 gap-3">
            <ComparisonCard title="Before" trigramName={trigram}>
              <TrigramLines lines={lines} size="sm" />
            </ComparisonCard>
            <ComparisonCard
              title="After"
              trigramName={afterTrigram}
              empty="The second picture appears after a line changes."
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
        <h2 className="font-serif text-2xl text-stone-900 sm:text-4xl">
          Pair a situation with Heaven or Earth.
        </h2>
        <p className="mt-2 max-w-xl text-sm text-stone-600 sm:text-base">
          First choose a scenario, then click Qian or Kun. The note describes
          the 象 you picked — not a pass or fail.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <TrigramChoiceCard
            title="乾 Qian"
            subtitle="Heaven · creative movement"
            selected={chosenTrigram === "qian"}
            disabled={!scenarioId}
            onClick={() => setChosenTrigram("qian")}
            lines={[1, 1, 1]}
          />
          <TrigramChoiceCard
            title="坤 Kun"
            subtitle="Earth · carrying capacity"
            selected={chosenTrigram === "kun"}
            disabled={!scenarioId}
            onClick={() => setChosenTrigram("kun")}
            lines={[0, 0, 0]}
          />
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {SCENARIOS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setScenarioId(item.id);
                setChosenTrigram(null);
              }}
              className={`rounded-xl border px-4 py-4 text-left transition ${
                scenarioId === item.id
                  ? "border-amber-800 bg-amber-50"
                  : "border-stone-200 bg-white/80 hover:border-amber-800/40"
              }`}
            >
              <p className="font-medium text-stone-900">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                {item.prompt}
              </p>
            </button>
          ))}
        </div>
        {pairingFeedback ? (
          <p className="mt-5 rounded-2xl border border-stone-200 bg-white/80 p-5 leading-7 text-stone-800">
            {pairingFeedback}
          </p>
        ) : (
          <p className="mt-5 text-sm text-stone-500">
            {scenarioId
              ? "Now click Qian or Kun."
              : "Choose a scenario to begin."}
          </p>
        )}
      </SectionShell>

      <SectionShell id="summary" kicker="Section 6 · Carry this forward">
        <h2 className="font-serif text-2xl text-stone-900 sm:text-4xl">
          Three things to keep
        </h2>
        <ol className="mt-5 space-y-3">
          {[
            "Study the image first. The written name is a label for a picture you can test.",
            "Eight trigrams are three lines read from the bottom. Broken and unbroken are enough to name a whole climate.",
            "Change is local: one line turns, and Qian and Kun show the two poles that every later hexagram still depends on.",
          ].map((item, index) => (
            <li key={item} className="flex gap-4 text-stone-800">
              <span className="font-serif text-2xl text-amber-800">
                {index + 1}
              </span>
              <span className="pt-1 leading-7">{item}</span>
            </li>
          ))}
        </ol>
        <form
          onSubmit={handleContinue}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <label className="sr-only" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email for Lesson 2"
            className="h-12 flex-1 rounded-full border border-stone-300 bg-white px-5 text-stone-900 outline-none ring-amber-800/30 placeholder:text-stone-400 focus:ring-2"
          />
          <button
            type="submit"
            className="h-12 rounded-full bg-stone-900 px-6 text-sm text-amber-50 transition hover:bg-stone-700"
          >
            Continue to Lesson 2
          </button>
        </form>
        {submitted ? (
          <p className="mt-4 text-sm text-stone-600">
            Saved for the next sitting. Lesson 2 will pick up from hexagrams —
            two trigrams stacked, still read as image.
          </p>
        ) : null}
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
    <div className="rounded-2xl border border-stone-200 bg-white/80 p-4">
      <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
        {title}
      </p>
      {trigramName ? (
        <>
          <p className="mt-2 font-serif text-2xl text-stone-900">
            {trigramName.name} {trigramName.pinyin}
          </p>
          <div className="mt-4">{children}</div>
        </>
      ) : (
        <p className="mt-4 text-sm leading-6 text-stone-500">{empty}</p>
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
      className={`rounded-2xl border p-4 text-left transition ${
        selected
          ? "border-amber-800 bg-amber-50"
          : "border-stone-200 bg-white/80 hover:border-amber-800/40"
      } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
    >
      <p className="font-serif text-2xl text-stone-900">{title}</p>
      <p className="mt-1 text-sm text-stone-500">{subtitle}</p>
      <div className="mt-4">
        <TrigramLines lines={lines} size="sm" />
      </div>
    </button>
  );
}
