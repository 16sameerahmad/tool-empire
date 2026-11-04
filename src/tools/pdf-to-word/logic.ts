/**
 * PDF to Word (DOCX) conversion — 100% client-side.
 * Uses pdf.js to extract text layer, then `docx` npm lib to build .docx.
 *
 * ponytail: text-only extraction; no OCR for scanned PDFs.
 * Upgrade path: add tesseract.js lazy-load when no text layer detected.
 */

import { loadScript } from "../pdf-tools/logic";

export type PdfTextBlock = {
  text: string;
  fontSize: number;
  fontName: string;
  bold: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type PdfPageText = {
  pageNumber: number;
  blocks: PdfTextBlock[];
  width: number;
  height: number;
};

/**
 * Extract structured text from each PDF page using pdf.js text layer.
 */
export async function extractPdfText(
  file: ArrayBuffer,
  onProgress?: (done: number, total: number) => void
): Promise<PdfPageText[]> {
  const pdfjsVersion = "3.11.174";
  const cdnBase = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}`;
  await loadScript(`${cdnBase}/pdf.min.js`);

  // @ts-expect-error pdfjsLib is global from script
  const pdfjsLib = window.pdfjsLib;
  pdfjsLib.GlobalWorkerOptions.workerSrc = `${cdnBase}/pdf.worker.min.js`;

  const doc = await pdfjsLib.getDocument({ data: file }).promise;
  const totalPages = doc.numPages;
  const pages: PdfPageText[] = [];

  for (let i = 1; i <= totalPages; i++) {
    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale: 1.0 });
    const textContent = await page.getTextContent();

    const blocks: PdfTextBlock[] = textContent.items
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((item: any) => item.str && item.str.trim().length > 0)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((item: any) => ({
        text: item.str as string,
        fontSize: Math.abs(item.transform?.[0] ?? 12) as number,
        fontName: (item.fontName ?? "") as string,
        bold: /bold/i.test(item.fontName ?? ""),
        x: (item.transform?.[4] ?? 0) as number,
        y: (item.transform?.[5] ?? 0) as number,
        width: (item.width ?? 0) as number,
        height: (item.height ?? 0) as number,
      }));

    pages.push({
      pageNumber: i,
      blocks,
      width: viewport.width,
      height: viewport.height,
    });
    onProgress?.(i, totalPages);
  }

  return pages;
}

/**
 * Group text blocks on a page into logical lines based on Y-position proximity.
 */
function groupBlocksIntoLines(blocks: PdfTextBlock[]): PdfTextBlock[][] {
  if (blocks.length === 0) return [];

  // Sort by Y (descending = top-first in PDF coords), then X
  const sorted = [...blocks].sort((a, b) => b.y - a.y || a.x - b.x);
  const lines: PdfTextBlock[][] = [];
  let currentLine: PdfTextBlock[] = [sorted[0]];
  let currentY = sorted[0].y;

  for (let i = 1; i < sorted.length; i++) {
    const block = sorted[i];
    // Same line if Y within tolerance (fontSize-dependent)
    if (Math.abs(block.y - currentY) < block.fontSize * 0.5) {
      currentLine.push(block);
    } else {
      currentLine.sort((a, b) => a.x - b.x);
      lines.push(currentLine);
      currentLine = [block];
      currentY = block.y;
    }
  }
  currentLine.sort((a, b) => a.x - b.x);
  lines.push(currentLine);

  return lines;
}

/**
 * Convert extracted PDF pages to a DOCX Blob using the `docx` library.
 */
export async function pdfTextToDocx(
  pages: PdfPageText[],
  onProgress?: (done: number, total: number) => void
): Promise<Blob> {
  const { Document, Packer, Paragraph, TextRun, PageBreak, HeadingLevel } =
    await import("docx");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sections: any[] = [];

  for (let p = 0; p < pages.length; p++) {
    const page = pages[p];
    const lines = groupBlocksIntoLines(page.blocks);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const children: any[] = [];

    for (const lineBlocks of lines) {
      const avgFontSize =
        lineBlocks.reduce((s, b) => s + b.fontSize, 0) / lineBlocks.length;
      const allBold = lineBlocks.every((b) => b.bold);

      // Heuristic: large text = heading
      let heading: (typeof HeadingLevel)[keyof typeof HeadingLevel] | undefined;
      if (avgFontSize >= 20) heading = HeadingLevel.HEADING_1;
      else if (avgFontSize >= 16) heading = HeadingLevel.HEADING_2;
      else if (avgFontSize >= 13) heading = HeadingLevel.HEADING_3;

      const runs = lineBlocks.map(
        (b) =>
          new TextRun({
            text: b.text,
            bold: b.bold,
            size: Math.round(b.fontSize * 2), // docx uses half-points
            font: b.fontName.replace(/[^a-zA-Z\s-]/g, "") || "Calibri",
          })
      );

      children.push(
        new Paragraph({
          children: runs,
          heading,
          ...(allBold && !heading ? { bold: true } : {}),
        })
      );
    }

    // Add page break between pages (except last)
    if (p < pages.length - 1 && children.length > 0) {
      children.push(new Paragraph({ children: [new PageBreak()] }));
    }

    // Empty page fallback
    if (children.length === 0) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: "(No extractable text on this page)", italics: true })],
        })
      );
    }

    sections.push({ children });
    onProgress?.(p + 1, pages.length);
  }

  const doc = new Document({
    sections,
    creator: "Tulyro PDF to Word",
    title: "Converted Document",
  });

  return await Packer.toBlob(doc);
}
