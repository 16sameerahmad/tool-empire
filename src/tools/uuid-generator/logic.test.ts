import { describe, it, expect } from "vitest";
import { generateUuidV4, generateUuidBatch } from "./logic";

describe("UUID Generator Logic", () => {
  it("generates a valid RFC 4122 v4 UUID format", () => {
    const uuid = generateUuidV4();
    expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  it("handles batch count boundaries (1 to 100)", () => {
    const batch = generateUuidBatch({ count: 5 });
    expect(batch.length).toBe(5);
    const unique = new Set(batch);
    expect(unique.size).toBe(5);

    const clampedMax = generateUuidBatch({ count: 150 });
    expect(clampedMax.length).toBe(100);
  });

  it("supports uppercase and no-hyphens formatting", () => {
    const batch = generateUuidBatch({ count: 1, uppercase: true, hyphens: false });
    expect(batch[0]).toMatch(/^[0-9A-F]{32}$/);
  });
});
