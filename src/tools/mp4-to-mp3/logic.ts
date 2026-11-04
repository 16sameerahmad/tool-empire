/**
 * MP4 to MP3 audio extraction — 100% client-side via FFmpeg WASM.
 * Single-thread core (no COOP/COEP headers needed).
 * Lazy-loads ~25MB WASM on first use, cached by browser afterwards.
 *
 * ponytail: single-thread only, no multi-thread.
 * Upgrade path: add COOP/COEP headers + @ffmpeg/core-mt for 2-3× speed.
 */

export type ConversionProgress = {
  ratio: number; // 0..1
  time: number; // seconds processed
  duration: number; // total duration
};

/**
 * Extract audio from a video file and return an MP3 Blob.
 * FFmpeg WASM is loaded lazily from unpkg CDN (single-thread core).
 */
export async function videoToMp3(
  file: File,
  options: {
    bitrate?: string; // e.g. "192k", "128k", "320k"
    onProgress?: (progress: ConversionProgress) => void;
    onLog?: (msg: string) => void;
  } = {}
): Promise<Blob> {
  const { bitrate = "192k", onProgress, onLog } = options;

  const { FFmpeg } = await import("@ffmpeg/ffmpeg");
  const { fetchFile } = await import("@ffmpeg/util");

  const ffmpeg = new FFmpeg();

  if (onLog) {
    ffmpeg.on("log", ({ message }) => onLog(message));
  }

  if (onProgress) {
    ffmpeg.on("progress", ({ progress, time }) => {
      onProgress({
        ratio: Math.min(progress, 1),
        time: time / 1_000_000, // microseconds → seconds
        duration: 0, // ffmpeg doesn't always report total duration
      });
    });
  }

  // Load single-thread core from unpkg CDN
  const coreBaseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
  await ffmpeg.load({
    coreURL: `${coreBaseURL}/ffmpeg-core.js`,
    wasmURL: `${coreBaseURL}/ffmpeg-core.wasm`,
  });

  const inputName = "input" + getExtension(file.name);
  const outputName = "output.mp3";

  await ffmpeg.writeFile(inputName, await fetchFile(file));
  await ffmpeg.exec([
    "-i", inputName,
    "-vn",           // strip video
    "-c:a", "libmp3lame",
    "-b:a", bitrate,
    outputName,
  ]);

  const data = await readOutput(ffmpeg, outputName);
  // Clean up
  await ffmpeg.deleteFile(inputName);
  await ffmpeg.deleteFile(outputName).catch(() => {});
  ffmpeg.terminate();

  // Create clean buffer to avoid SharedArrayBuffer type conflict
  const buffer = typeof data === "string" ? new TextEncoder().encode(data) : new Uint8Array(data as Uint8Array);
  if (buffer.length === 0) {
    throw new Error("No audio track found in this file — nothing to extract.");
  }
  return new Blob([buffer], { type: "audio/mpeg" });
}

async function readOutput(ffmpeg: { readFile: (name: string) => Promise<unknown> }, name: string): Promise<unknown> {
  try {
    return await ffmpeg.readFile(name);
  } catch {
    throw new Error("No audio track found in this file — extraction produced no output.");
  }
}

function getExtension(filename: string): string {
  const dot = filename.lastIndexOf(".");
  return dot >= 0 ? filename.slice(dot).toLowerCase() : ".mp4";
}
