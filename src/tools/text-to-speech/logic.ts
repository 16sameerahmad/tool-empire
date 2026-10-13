export function chunkText(text: string, maxLen = 200): string[] {
  const normalized = text.trim();
  if (!normalized) return [];
  const chunks: string[] = [];
  let remaining = normalized;
  while (remaining.length > maxLen) {
    const candidate = remaining.slice(0, maxLen + 1);
    const sentenceBreak = Math.max(candidate.lastIndexOf(". "), candidate.lastIndexOf("! "), candidate.lastIndexOf("? ")) + 1;
    const spaceBreak = candidate.lastIndexOf(" ");
    const breakAt = sentenceBreak > 0 ? sentenceBreak : spaceBreak > 0 ? spaceBreak : maxLen;
    chunks.push(remaining.slice(0, breakAt).trim());
    remaining = remaining.slice(breakAt).trim();
  }
  if (remaining) chunks.push(remaining);
  return chunks;
}
