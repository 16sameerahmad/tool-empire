export type WordStats = { words: number; characters: number; charactersWithoutSpaces: number; sentences: number; readingTime: string };

function graphemes(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    return [...segmenter.segment(text)].map((part) => part.segment);
  }
  return [...text];
}

function sentenceCount(text: string): number {
  if (!text.trim()) return 0;
  const endings = text.match(/(?:^|\s)(?:[^.!?]|\d\.)*?[.!?](?=\s|$)/g);
  return Math.max(1, endings?.length ?? 0);
}

export function wordStats(text: string): WordStats {
  const words = text.trim() ? text.trim().split(/\s+/u).length : 0;
  const characters = graphemes(text).length;
  const charactersWithoutSpaces = graphemes(text.replace(/\s/gu, "")).length;
  const seconds = Math.round(words / 200 * 60);
  const readingTime = seconds < 60 ? `${seconds} sec` : `${Math.floor(seconds / 60)} min${seconds % 60 ? ` ${seconds % 60} sec` : ""}`;
  return { words, characters, charactersWithoutSpaces, sentences: sentenceCount(text), readingTime };
}
