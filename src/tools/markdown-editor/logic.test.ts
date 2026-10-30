import { describe, it, expect } from "vitest";
import { renderMarkdown } from "./logic";

describe("Markdown Editor Logic", () => {
  it("renders headings, bold, italic, and lists", () => {
    const md = "# Title\n\n**bold** and *italic*\n\n- item 1\n- item 2";
    const html = renderMarkdown(md);
    expect(html).toContain("<h1");
    expect(html).toContain("<strong>bold</strong>");
    expect(html).toContain("<em>italic</em>");
    expect(html).toContain("<li");
  });

  it("escapes malicious scripts and html tags", () => {
    const md = '<script>alert("xss")</script>';
    const html = renderMarkdown(md);
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });

  it("renders safe links and code blocks", () => {
    const md = "```ts\nconst x = 1;\n```\n\n[Google](https://google.com)";
    const html = renderMarkdown(md);
    expect(html).toContain("<pre");
    expect(html).toContain('href="https://google.com"');
  });
});
