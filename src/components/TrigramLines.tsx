import type { Line } from "@/lib/trigrams";

type TrigramLinesProps = {
  lines: readonly Line[];
  changingIndex?: number | null;
  size?: "sm" | "md" | "lg";
  labels?: boolean;
};

const sizeMap = {
  sm: { gap: "gap-5", bar: "h-2.5", width: "w-20" },
  md: { gap: "gap-7", bar: "h-3.5", width: "w-28" },
  lg: { gap: "gap-9", bar: "h-5", width: "w-40" },
};

export function TrigramLines({
  lines,
  changingIndex = null,
  size = "md",
  labels = false,
}: TrigramLinesProps) {
  const s = sizeMap[size];
  const names = ["Bottom", "Middle", "Top"];

  return (
    <div
      className={`flex flex-col-reverse ${s.gap} ${labels ? "pl-16" : ""}`}
      aria-hidden={!labels}
    >
      {lines.map((line, index) => (
        <div key={index} className={`relative flex items-center ${s.width}`}>
          {labels ? (
            <span className="absolute right-full mr-4 whitespace-nowrap text-[10px] uppercase tracking-[0.18em] text-stone-500">
              {names[index]}
            </span>
          ) : null}
          <div
            className={`flex w-full items-center justify-between transition-all duration-700 ease-in-out ${
              changingIndex === index ? "scale-y-110" : "scale-y-100"
            }`}
          >
            <span
              className={`${s.bar} rounded-sm bg-stone-900 transition-all duration-700 ease-in-out ${
                line === 1 ? "w-full" : "w-[42%]"
              }`}
            />
            <span
              className={`${s.bar} rounded-sm bg-stone-900 transition-all duration-700 ease-in-out ${
                line === 1 ? "w-0 opacity-0" : "w-[42%] opacity-100"
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
