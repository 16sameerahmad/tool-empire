/**
 * Lightweight, zero-dependency Markdown to safe HTML compiler for live preview.
 * Handles headings, bold/italic, code blocks, inline code, blockquotes, lists, links, hr.
 */
export function renderMarkdown(markdown: string): string {
  if (!markdown) return "";

  // Escape HTML entities to prevent injection
  let escaped = markdown
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Code blocks: ```lang\ncode\n```
  escaped = escaped.replace(/```([\s\S]*?)```/g, (_match, code) => {
    return `<pre class="bg-slate-900 text-slate-100 p-4 rounded-lg my-3 overflow-x-auto text-sm"><code>${code.trim()}</code></pre>`;
  });

  // Inline code: `code`
  escaped = escaped.replace(/`([^`]+)`/g, '<code class="bg-slate-200 dark:bg-slate-800 text-pink-600 dark:text-pink-400 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>');

  // Headings: ### H3, ## H2, # H1
  escaped = escaped.replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>');
  escaped = escaped.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-5 mb-2">$1</h2>');
  escaped = escaped.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-extrabold mt-6 mb-3">$1</h1>');

  // Blockquotes: > quote
  escaped = escaped.replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-indigo-500 pl-4 py-1 italic my-2 text-slate-600 dark:text-slate-300">$1</blockquote>');

  // Horizontal rules: ---
  escaped = escaped.replace(/^---$/gim, '<hr class="my-6 border-slate-300 dark:border-slate-700" />');

  // Bold & Italic: **bold**, *italic*
  escaped = escaped.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  escaped = escaped.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // Unordered list items: - item
  escaped = escaped.replace(/^- (.*$)/gim, '<li class="ml-5 list-disc my-1">$1</li>');

  // Links: [text](url) — allow only safe protocols (http, https, mailto, relative)
  escaped = escaped.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]+|mailto:[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 underline">$1</a>');

  // Paragraphs: split by double newlines
  const paragraphs = escaped.split(/\n\s*\n/);
  return paragraphs
    .map((p) => {
      const trimmed = p.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h1") ||
        trimmed.startsWith("<h2") ||
        trimmed.startsWith("<h3") ||
        trimmed.startsWith("<pre") ||
        trimmed.startsWith("<blockquote") ||
        trimmed.startsWith("<hr") ||
        trimmed.startsWith("<li")
      ) {
        return trimmed;
      }
      return `<p class="my-2 leading-relaxed">${trimmed.replace(/\n/g, "<br />")}</p>`;
    })
    .join("\n");
}
