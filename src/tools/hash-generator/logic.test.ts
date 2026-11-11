import { describe, it, expect } from "vitest";
import { hashBytes, hashText, md5Bytes } from "./logic";

const encoder = new TextEncoder();

describe("Hash Generator Logic", () => {
  it("computes MD5 test vectors", () => {
    expect(md5Bytes(encoder.encode(""))).toBe("d41d8cd98f00b204e9800998ecf8427e");
    expect(md5Bytes(encoder.encode("abc"))).toBe("900150983cd24fb0d6963f7d28e17f72");
    expect(md5Bytes(encoder.encode("hello"))).toBe("5d41402abc4b2a76b9719d911017c592");
    expect(md5Bytes(encoder.encode("The quick brown fox jumps over the lazy dog"))).toBe(
      "9e107d9d372bb6826bd81d3542a419d6"
    );
  });

  it("computes MD5 for input spanning multiple 64-byte blocks", () => {
    // 1000 'a' characters crosses block boundaries and padding rules.
    expect(md5Bytes(encoder.encode("a".repeat(1000)))).toBe("cabe45dcc9ae5b66ba86600cca6b8ba8");
  });

  it("computes SHA-1, SHA-256, and SHA-512 via Web Crypto", async () => {
    expect(await hashText("hello", "SHA-1")).toBe("aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d");
    expect(await hashText("hello", "SHA-256")).toBe(
      "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
    );
    expect(await hashText("", "SHA-256")).toBe(
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    );
    expect(await hashText("hello", "SHA-512")).toBe(
      "9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043"
    );
  });

  it("hashes raw bytes identically to text for SHA-256", async () => {
    const bytes = encoder.encode("hello");
    expect(await hashBytes(bytes, "SHA-256")).toBe(await hashText("hello", "SHA-256"));
    expect(await hashBytes(bytes, "MD5")).toBe(await hashText("hello", "MD5"));
  });
});
