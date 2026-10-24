import { Fragment } from "react";
import type { Line } from "@/lib/trigrams";

type HexagramLinesProps = {
  lines: readonly Line[];
  highlightIndex?: number | null;
  size?: "sm" | "md" | "lg";
  labels?: boolean;
};

const sizeMap = {
  sm: { width: "w-28", bar: "h-2", gap: "gap-2", split: "h-4", labelGap: "mr-3" },
  md: { width: "w-36", bar: "h-2.5", gap: "gap-3", split: "h-7", labelGap: "mr-3" },
  lg: {
    width: "w-40 sm:w-48",
    bar: "h-3",
    gap: "gap-3",
    split: "h-8",
    labelGap: "mr-4",
  },
};

export function HexagramLines({
  lines,
  highlightIndex = null,
  size = "md",
  labels = false,
}: HexagramLinesProps) {
  const s = sizeMap[size];

  return (
    <div
      className={`flex flex-col-reverse ${s.gap} ${labels ? "pl-8" : ""}`}
      aria-hidden={!labels}
    >
      {lines.map((line, index) => (
        <Fragment key={index}>
          {index === 3 ? (
            <div className={s.split} aria-hidden="true" />
          ) : null}
          <div className={`relative flex items-center ${s.width}`}>
            {labels ? (
              <span
                className={`absolute right-full ${s.labelGap} text-[10px] tabular-nums text-stone-400`}
              >
                {index + 1}
              </span>
            ) : null}
            <div
              className={`flex w-full items-center justify-between transition-all duration-500 ease-in-out ${
                highlightIndex === index ? "scale-y-110" : "scale-y-100"
              }`}
            >
              <span
                className={`${s.bar} rounded-sm transition-colors duration-500 ${
                  highlightIndex === index ? "bg-amber-700" : "bg-stone-900"
                } ${line === 1 ? "w-full" : "w-[42%]"}`}
              />
              <span
                className={`${s.bar} rounded-sm transition-colors duration-500 ${
                  highlightIndex === index ? "bg-amber-700" : "bg-stone-900"
                } ${line === 1 ? "w-0 opacity-0" : "w-[42%] opacity-100"}`}
              />
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
