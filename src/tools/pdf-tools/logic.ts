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

export function loadScript(src: string): Promise<void> {
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
 * Convert one or more images to a single PDF (100% client-side via pdf-lib).
 * Supports ALL web image formats (JPEG, PNG, WebP, GIF, BMP, SVG, AVIF, etc.)
 * by drawing into an off-screen canvas and embedding as high-quality JPEG/PNG.
 * Returns a Blob of the PDF.
 */
export async function imagesToPdf(
  images: { dataUrl: string; width: number; height: number }[],
  opts: { pageSize?: "a4" | "letter" | "fit"; onProgress?: (done: number, total: number) => void } = {}
): Promise<Blob> {
  if (images.length === 0) throw new Error("No images provided to convert");
  const { pageSize = "fit", onProgress } = opts;

  await loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js");

  // @ts-expect-error PDFLib global from script
  const { PDFDocument, PageSizes } = window.PDFLib;
  const pdfDoc = await PDFDocument.create();

  for (let i = 0; i < images.length; i++) {
    const imgData = images[i];

    // Convert any image dataUrl (including webp, svg, avif, etc.) to a clean JPEG arraybuffer
    const jpegBytes = await new Promise<Uint8Array>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || imgData.width;
        canvas.height = img.naturalHeight || imgData.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas context unavailable"));
          return;
        }
        // White background for transparent PNG/WebP/GIF/SVG
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          async (blob) => {
            if (!blob) {
              reject(new Error("Failed to rasterize image"));
              return;
            }
            const buf = await blob.arrayBuffer();
            resolve(new Uint8Array(buf));
          },
          "image/jpeg",
          0.92
        );
      };
      img.onerror = () => reject(new Error(`Failed to load image ${i + 1}`));
      img.src = imgData.dataUrl;
    });

    const embeddedImage = await pdfDoc.embedJpg(jpegBytes);
    const { width: imgW, height: imgH } = embeddedImage;

    if (pageSize === "fit") {
      // 1pt ≈ 1px * 0.75
      const pageW = imgW * 0.75;
      const pageH = imgH * 0.75;
      const page = pdfDoc.addPage([pageW, pageH]);
      page.drawImage(embeddedImage, {
        x: 0,
        y: 0,
        width: pageW,
        height: pageH,
      });
    } else {
      // Standard A4 or Letter
      const targetSize = pageSize === "a4" ? PageSizes.A4 : PageSizes.Letter;
      const page = pdfDoc.addPage(targetSize);
      const [pageW, pageH] = targetSize;
      const margin = 28; // ~10mm margin
      const maxW = pageW - margin * 2;
      const maxH = pageH - margin * 2;
      const scale = Math.min(maxW / imgW, maxH / imgH);
      const drawW = imgW * scale;
      const drawH = imgH * scale;
      const drawX = margin + (maxW - drawW) / 2;
      const drawY = margin + (maxH - drawH) / 2;

      page.drawImage(embeddedImage, {
        x: drawX,
        y: drawY,
        width: drawW,
        height: drawH,
      });
    }

    onProgress?.(i + 1, images.length);
  }

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
}

/**
 * Merge multiple PDF files into one single PDF (100% client-side via pdf-lib).
 */
export async function mergePdfs(
  pdfBuffers: ArrayBuffer[],
  onProgress?: (done: number, total: number) => void
): Promise<Blob> {
  if (pdfBuffers.length === 0) throw new Error("No PDFs provided to merge");
  await loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js");

  // @ts-expect-error PDFLib global from script
  const { PDFDocument } = window.PDFLib;
  const mergedPdf = await PDFDocument.create();

  for (let i = 0; i < pdfBuffers.length; i++) {
    const srcDoc = await PDFDocument.load(pdfBuffers[i]);
    const copiedPages = await mergedPdf.copyPages(srcDoc, srcDoc.getPageIndices());
    for (const page of copiedPages) {
      mergedPdf.addPage(page);
    }
    onProgress?.(i + 1, pdfBuffers.length);
  }

  const mergedPdfBytes = await mergedPdf.save();
  return new Blob([mergedPdfBytes], { type: "application/pdf" });
}

/**
 * Split a PDF file by extracting selected 1-based page numbers.
 */
export async function splitPdf(
  pdfBuffer: ArrayBuffer,
  selectedPages: number[],
  onProgress?: (done: number, total: number) => void
): Promise<Blob> {
  if (selectedPages.length === 0) throw new Error("No pages selected to extract");
  await loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js");

  // @ts-expect-error PDFLib global from script
  const { PDFDocument } = window.PDFLib;
  const srcDoc = await PDFDocument.load(pdfBuffer);
  const outDoc = await PDFDocument.create();

  const totalSrcPages = srcDoc.getPageCount();
  // Filter valid 1-based pages and convert to 0-based indices
  const zeroBasedIndices = selectedPages
    .filter((p) => p >= 1 && p <= totalSrcPages)
    .map((p) => p - 1);

  if (zeroBasedIndices.length === 0) {
    throw new Error("None of the specified page numbers exist in the PDF");
  }

  const copiedPages = await outDoc.copyPages(srcDoc, zeroBasedIndices);
  for (let i = 0; i < copiedPages.length; i++) {
    outDoc.addPage(copiedPages[i]);
    onProgress?.(i + 1, copiedPages.length);
  }

  const outBytes = await outDoc.save();
  return new Blob([outBytes], { type: "application/pdf" });
}

/**
 * Compress a PDF by re-encoding pages through Canvas at optimized resolution and JPEG quality.
 * Client-side only with zero cloud uploads.
 */
export async function compressPdf(
  pdfBuffer: ArrayBuffer,
  options: {
    scale?: number; // scale factor (e.g., 1.0 = standard, 1.25 = high, 0.75 = aggressive)
    quality?: number; // 0.1 to 0.95
    onProgress?: (done: number, total: number) => void;
  } = {}
): Promise<{ blob: Blob; originalSize: number; compressedSize: number }> {
  const { scale = 1.2, quality = 0.65, onProgress } = options;

  const pdfjsVersion = "3.11.174";
  const cdnBase = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}`;
  await loadScript(`${cdnBase}/pdf.min.js`);
  await loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js");

  // @ts-expect-error pdfjsLib is global
  const pdfjsLib = window.pdfjsLib;
  pdfjsLib.GlobalWorkerOptions.workerSrc = `${cdnBase}/pdf.worker.min.js`;

  // @ts-expect-error PDFLib global
  const { PDFDocument } = window.PDFLib;

  const loadingTask = pdfjsLib.getDocument({ data: pdfBuffer });
  const srcDoc = await loadingTask.promise;
  const totalPages = srcDoc.numPages;

  const outDoc = await PDFDocument.create();

  for (let i = 1; i <= totalPages; i++) {
    const page = await srcDoc.getPage(i);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d")!;
    // Render white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({ canvasContext: ctx, viewport }).promise;

    const imgDataUrl = canvas.toDataURL("image/jpeg", quality);
    const imgBytes = await fetch(imgDataUrl).then((r) => r.arrayBuffer());
    const embeddedImg = await outDoc.embedJpg(imgBytes);

    // Maintain standard PDF point dimensions (viewport at scale 1.0)
    const baseViewport = page.getViewport({ scale: 1.0 });
    const pdfPage = outDoc.addPage([baseViewport.width, baseViewport.height]);
    pdfPage.drawImage(embeddedImg, {
      x: 0,
      y: 0,
      width: baseViewport.width,
      height: baseViewport.height,
    });

    onProgress?.(i, totalPages);
  }

  const outBytes = await outDoc.save();
  const blob = new Blob([outBytes], { type: "application/pdf" });

  return {
    blob,
    originalSize: pdfBuffer.byteLength,
    compressedSize: outBytes.byteLength,
  };
}

/**
 * Rotate PDF pages permanently by 90, 180, or 270 degrees.
 * 100% client-side via pdf-lib. Zero server upload.
 */
export async function rotatePdf(
  pdfBuffer: ArrayBuffer,
  rotationDegrees: 90 | 180 | 270,
  pageNumbers?: number[]
): Promise<Blob> {
  await loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js");
  // @ts-expect-error PDFLib is global from script
  const { PDFDocument, degrees } = window.PDFLib;
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const pages = pdfDoc.getPages();

  pages.forEach((page: { getRotation: () => { angle: number }; setRotation: (deg: unknown) => void }, idx: number) => {
    if (!pageNumbers || pageNumbers.includes(idx + 1)) {
      const current = page.getRotation().angle;
      page.setRotation(degrees((current + rotationDegrees) % 360));
    }
  });

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
