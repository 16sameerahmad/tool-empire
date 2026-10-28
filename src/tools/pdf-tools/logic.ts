/**
 * PDF ⇄ Image conversion utilities.
 * Uses browser-native Canvas API for image→PDF and
 * pdf.js (loaded lazily) for PDF→image extraction.
 *
 * ponytail: no server upload, client-side only.
 * Upgrade path: add password-protected PDF support when pdf.js exposes it.
 */

export type PdfPageImage = {
  pageNumber: number;
  dataUrl: string;
  width: number;
  height: number;
};

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

/**
 * Render each page of a PDF to a JPEG/PNG data URL using pdf.js (CDN).
 * Returns an array of page images.
 */
export async function pdfToImages(
  file: ArrayBuffer,
  opts: {
    format?: "jpeg" | "png";
    scale?: number;
    onProgress?: (done: number, total: number) => void;
  } = {}
): Promise<PdfPageImage[]> {
  const { format = "jpeg", scale = 2, onProgress } = opts;

  const pdfjsVersion = "3.11.174";
  const cdnBase = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}`;
  await loadScript(`${cdnBase}/pdf.min.js`);

  // @ts-expect-error pdfjsLib is global from script
  const pdfjsLib = window.pdfjsLib;
  pdfjsLib.GlobalWorkerOptions.workerSrc = `${cdnBase}/pdf.worker.min.js`;

  const doc = await pdfjsLib.getDocument({ data: file }).promise;
  const totalPages = doc.numPages;
  const pages: PdfPageImage[] = [];

  for (let i = 1; i <= totalPages; i++) {
    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d")!;
    await page.render({ canvasContext: ctx, viewport }).promise;

    pages.push({
      pageNumber: i,
      dataUrl: canvas.toDataURL(`image/${format}`, format === "jpeg" ? 0.92 : undefined),
      width: viewport.width,
      height: viewport.height,
    });

    onProgress?.(i, totalPages);
  }

  return pages;
}

/**
 * Convert one or more images to a single PDF (client-side).
 * Uses jsPDF loaded lazily from CDN.
 * Returns a Blob of the PDF.
 */
export async function imagesToPdf(
  images: { dataUrl: string; width: number; height: number }[],
  opts: { pageSize?: "a4" | "letter" | "fit"; onProgress?: (done: number, total: number) => void } = {}
): Promise<Blob> {
  const { pageSize = "fit", onProgress } = opts;

  await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.2/jspdf.umd.min.js");

  // @ts-expect-error jspdf global
  const { jsPDF } = window.jspdf;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let pdf: any = null;

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const imgW = img.width;
    const imgH = img.height;

    if (pageSize === "fit") {
      // Page sized to image (in pt, 1px ≈ 0.75pt)
      const wPt = imgW * 0.75;
      const hPt = imgH * 0.75;
      if (i === 0) {
        pdf = new jsPDF({ unit: "pt", format: [wPt, hPt] });
      } else {
        pdf!.addPage([wPt, hPt]);
      }
      pdf!.addImage(img.dataUrl, "JPEG", 0, 0, wPt, hPt);
    } else {
      // Fixed page size, scale image to fit
      if (i === 0) {
        pdf = new jsPDF({ unit: "mm", format: pageSize });
      } else {
        pdf!.addPage(pageSize);
      }
      const pageW = pdf!.internal.pageSize.getWidth();
      const pageH = pdf!.internal.pageSize.getHeight();
      const margin = 10; // mm
      const maxW = pageW - 2 * margin;
      const maxH = pageH - 2 * margin;
      const ratio = Math.min(maxW / (imgW * 0.264583), maxH / (imgH * 0.264583));
      const w = imgW * 0.264583 * ratio;
      const h = imgH * 0.264583 * ratio;
      const x = (pageW - w) / 2;
      const y = (pageH - h) / 2;
      pdf!.addImage(img.dataUrl, "JPEG", x, y, w, h);
    }

    onProgress?.(i + 1, images.length);
  }

  return pdf!.output("blob") as Blob;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
