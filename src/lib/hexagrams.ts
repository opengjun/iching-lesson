import type { TrigramKey } from "./trigrams";

export type Hexagram = {
  number: number;
  name: string;
  pinyin: string;
  keyword: string;
  lower: TrigramKey;
  upper: TrigramKey;
};

/** Keyed by lower trigram + upper trigram, each as three lines read bottom-up. */
export const HEXAGRAMS: Record<string, Hexagram> = {
  "111111": { number: 1, name: "乾", pinyin: "qián", keyword: "The Creative", lower: "111", upper: "111" },
  "000000": { number: 2, name: "坤", pinyin: "kūn", keyword: "The Receptive", lower: "000", upper: "000" },
  "100010": { number: 3, name: "屯", pinyin: "zhūn", keyword: "Difficulty at the Beginning", lower: "100", upper: "010" },
  "010001": { number: 4, name: "蒙", pinyin: "méng", keyword: "Youthful Folly", lower: "010", upper: "001" },
  "111010": { number: 5, name: "需", pinyin: "xū", keyword: "Waiting", lower: "111", upper: "010" },
  "010111": { number: 6, name: "讼", pinyin: "sòng", keyword: "Conflict", lower: "010", upper: "111" },
  "010000": { number: 7, name: "师", pinyin: "shī", keyword: "The Army", lower: "010", upper: "000" },
  "000010": { number: 8, name: "比", pinyin: "bǐ", keyword: "Holding Together", lower: "000", upper: "010" },
  "111011": { number: 9, name: "小畜", pinyin: "xiǎo chù", keyword: "The Taming Power of the Small", lower: "111", upper: "011" },
  "110111": { number: 10, name: "履", pinyin: "lǚ", keyword: "Treading", lower: "110", upper: "111" },
  "111000": { number: 11, name: "泰", pinyin: "tài", keyword: "Peace", lower: "111", upper: "000" },
  "000111": { number: 12, name: "否", pinyin: "pǐ", keyword: "Standstill", lower: "000", upper: "111" },
  "101111": { number: 13, name: "同人", pinyin: "tóng rén", keyword: "Fellowship", lower: "101", upper: "111" },
  "111101": { number: 14, name: "大有", pinyin: "dà yǒu", keyword: "Great Possession", lower: "111", upper: "101" },
  "001000": { number: 15, name: "谦", pinyin: "qiān", keyword: "Modesty", lower: "001", upper: "000" },
  "000100": { number: 16, name: "豫", pinyin: "yù", keyword: "Enthusiasm", lower: "000", upper: "100" },
  "100110": { number: 17, name: "随", pinyin: "suí", keyword: "Following", lower: "100", upper: "110" },
  "011001": { number: 18, name: "蛊", pinyin: "gǔ", keyword: "Repairing Decay", lower: "011", upper: "001" },
  "110000": { number: 19, name: "临", pinyin: "lín", keyword: "Approach", lower: "110", upper: "000" },
  "000011": { number: 20, name: "观", pinyin: "guān", keyword: "Contemplation", lower: "000", upper: "011" },
  "100101": { number: 21, name: "噬嗑", pinyin: "shì kè", keyword: "Biting Through", lower: "100", upper: "101" },
  "101001": { number: 22, name: "贲", pinyin: "bì", keyword: "Grace", lower: "101", upper: "001" },
  "000001": { number: 23, name: "剥", pinyin: "bō", keyword: "Splitting Apart", lower: "000", upper: "001" },
  "100000": { number: 24, name: "复", pinyin: "fù", keyword: "Return", lower: "100", upper: "000" },
  "100111": { number: 25, name: "无妄", pinyin: "wú wàng", keyword: "Innocence", lower: "100", upper: "111" },
  "111001": { number: 26, name: "大畜", pinyin: "dà chù", keyword: "The Taming Power of the Great", lower: "111", upper: "001" },
  "100001": { number: 27, name: "颐", pinyin: "yí", keyword: "Nourishment", lower: "100", upper: "001" },
  "011110": { number: 28, name: "大过", pinyin: "dà guò", keyword: "Preponderance of the Great", lower: "011", upper: "110" },
  "010010": { number: 29, name: "坎", pinyin: "kǎn", keyword: "The Abyss", lower: "010", upper: "010" },
  "101101": { number: 30, name: "离", pinyin: "lí", keyword: "The Clinging", lower: "101", upper: "101" },
  "001110": { number: 31, name: "咸", pinyin: "xián", keyword: "Influence", lower: "001", upper: "110" },
  "011100": { number: 32, name: "恒", pinyin: "héng", keyword: "Duration", lower: "011", upper: "100" },
  "001111": { number: 33, name: "遁", pinyin: "dùn", keyword: "Retreat", lower: "001", upper: "111" },
  "111100": { number: 34, name: "大壮", pinyin: "dà zhuàng", keyword: "The Power of the Great", lower: "111", upper: "100" },
  "000101": { number: 35, name: "晋", pinyin: "jìn", keyword: "Progress", lower: "000", upper: "101" },
  "101000": { number: 36, name: "明夷", pinyin: "míng yí", keyword: "The Darkening of the Light", lower: "101", upper: "000" },
  "101011": { number: 37, name: "家人", pinyin: "jiā rén", keyword: "The Family", lower: "101", upper: "011" },
  "110101": { number: 38, name: "睽", pinyin: "kuí", keyword: "Opposition", lower: "110", upper: "101" },
  "001010": { number: 39, name: "蹇", pinyin: "jiǎn", keyword: "Obstruction", lower: "001", upper: "010" },
  "010100": { number: 40, name: "解", pinyin: "xiè", keyword: "Deliverance", lower: "010", upper: "100" },
  "110001": { number: 41, name: "损", pinyin: "sǔn", keyword: "Decrease", lower: "110", upper: "001" },
  "100011": { number: 42, name: "益", pinyin: "yì", keyword: "Increase", lower: "100", upper: "011" },
  "111110": { number: 43, name: "夬", pinyin: "guài", keyword: "Breakthrough", lower: "111", upper: "110" },
  "011111": { number: 44, name: "姤", pinyin: "gòu", keyword: "Coming to Meet", lower: "011", upper: "111" },
  "000110": { number: 45, name: "萃", pinyin: "cuì", keyword: "Gathering Together", lower: "000", upper: "110" },
  "011000": { number: 46, name: "升", pinyin: "shēng", keyword: "Pushing Upward", lower: "011", upper: "000" },
  "010110": { number: 47, name: "困", pinyin: "kùn", keyword: "Oppression", lower: "010", upper: "110" },
  "011010": { number: 48, name: "井", pinyin: "jǐng", keyword: "The Well", lower: "011", upper: "010" },
  "101110": { number: 49, name: "革", pinyin: "gé", keyword: "Revolution", lower: "101", upper: "110" },
  "011101": { number: 50, name: "鼎", pinyin: "dǐng", keyword: "The Cauldron", lower: "011", upper: "101" },
  "100100": { number: 51, name: "震", pinyin: "zhèn", keyword: "The Arousing", lower: "100", upper: "100" },
  "001001": { number: 52, name: "艮", pinyin: "gèn", keyword: "Keeping Still", lower: "001", upper: "001" },
  "001011": { number: 53, name: "渐", pinyin: "jiàn", keyword: "Development", lower: "001", upper: "011" },
  "110100": { number: 54, name: "归妹", pinyin: "guī mèi", keyword: "The Marrying Maiden", lower: "110", upper: "100" },
  "101100": { number: 55, name: "丰", pinyin: "fēng", keyword: "Abundance", lower: "101", upper: "100" },
  "001101": { number: 56, name: "旅", pinyin: "lǚ", keyword: "The Wanderer", lower: "001", upper: "101" },
  "011011": { number: 57, name: "巽", pinyin: "xùn", keyword: "The Gentle", lower: "011", upper: "011" },
  "110110": { number: 58, name: "兑", pinyin: "duì", keyword: "The Joyous", lower: "110", upper: "110" },
  "010011": { number: 59, name: "涣", pinyin: "huàn", keyword: "Dispersion", lower: "010", upper: "011" },
  "110010": { number: 60, name: "节", pinyin: "jié", keyword: "Limitation", lower: "110", upper: "010" },
  "110011": { number: 61, name: "中孚", pinyin: "zhōng fú", keyword: "Inner Truth", lower: "110", upper: "011" },
  "001100": { number: 62, name: "小过", pinyin: "xiǎo guò", keyword: "Preponderance of the Small", lower: "001", upper: "100" },
  "101010": { number: 63, name: "既济", pinyin: "jì jì", keyword: "After Completion", lower: "101", upper: "010" },
  "010101": { number: 64, name: "未济", pinyin: "wèi jì", keyword: "Before Completion", lower: "010", upper: "101" },
};

export function getHexagram(
  lower: TrigramKey,
  upper: TrigramKey,
): Hexagram {
  return HEXAGRAMS[lower + upper] ?? HEXAGRAMS["111111"];
}
