export type Line = 0 | 1;

export type TrigramKey = `${Line}${Line}${Line}`;

export type Trigram = {
  key: TrigramKey;
  name: string;
  pinyin: string;
  nature: string;
  description: string;
};

/** Bottom → middle → top. 1 = unbroken (yang), 0 = broken (yin). */
export const TRIGRAMS: Record<TrigramKey, Trigram> = {
  "111": {
    key: "111",
    name: "乾",
    pinyin: "Qián",
    nature: "Heaven",
    description:
      "Three unbroken lines. Qian is creative force, initiative, and the sky’s unceasing movement. In the Tianji lessons, this is the 象 of acting while the moment is still open.",
  },
  "110": {
    key: "110",
    name: "兑",
    pinyin: "Duì",
    nature: "Lake",
    description:
      "Two yang lines below an open yin line. Dui is joy, speech, and exchange — a surface that reflects, not a wall that closes.",
  },
  "101": {
    key: "101",
    name: "离",
    pinyin: "Lí",
    nature: "Fire",
    description:
      "Yang on the outside, yin in the middle. Li is brightness that depends on what it clings to. Clarity here is relational, not isolated.",
  },
  "100": {
    key: "100",
    name: "震",
    pinyin: "Zhèn",
    nature: "Thunder",
    description:
      "A single yang line stirring beneath two yin lines. Zhen is the first movement after stillness — a shock that starts a process, not the whole process.",
  },
  "011": {
    key: "011",
    name: "巽",
    pinyin: "Xùn",
    nature: "Wind",
    description:
      "Yin at the root, yang above. Xun is entering, influencing, and following the grain of a situation rather than forcing a straight line through it.",
  },
  "010": {
    key: "010",
    name: "坎",
    pinyin: "Kǎn",
    nature: "Water",
    description:
      "Yang hidden between two yin lines. Kan is the pit and the current: danger that is also the path, if you keep moving with the water.",
  },
  "001": {
    key: "001",
    name: "艮",
    pinyin: "Gèn",
    nature: "Mountain",
    description:
      "Yang resting on two yin lines. Gen is stopping in the right place — a boundary that holds form, not a freeze that never resumes.",
  },
  "000": {
    key: "000",
    name: "坤",
    pinyin: "Kūn",
    nature: "Earth",
    description:
      "Three broken lines. Kun is receptivity, carrying capacity, and the field that lets things grow. Without Kun, Qian has nowhere to land.",
  },
};

export const DEFAULT_LINES: [Line, Line, Line] = [1, 1, 1];

export function toKey(lines: readonly Line[]): TrigramKey {
  return lines.join("") as TrigramKey;
}

export function getTrigram(lines: readonly Line[]): Trigram {
  return TRIGRAMS[toKey(lines)] ?? TRIGRAMS["111"];
}

export function flipLine(line: Line): Line {
  return line === 1 ? 0 : 1;
}
