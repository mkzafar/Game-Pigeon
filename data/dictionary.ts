import dictionaryRaw from "./dictionary.txt?raw";

export const DICTIONARY: string[] = dictionaryRaw
  .split("\n")
  .map(w => w.trim().toUpperCase())
  .filter(Boolean);
