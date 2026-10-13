type Style = "Bold" | "Italic" | "Bold Italic" | "Script" | "Bold Script" | "Fraktur" | "Double-struck" | "Monospace" | "Circled" | "Small Caps";

const upperExceptions: Record<string, string> = { Script: "ℬℭ??ℰℱ??ℋℐ????ℒℳ????ℛ", "Bold Script": "𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩", "Double-struck": "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ" };
const smallCaps: Record<string, string> = { a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ꜰ", g: "ɢ", h: "ʜ", i: "ɪ", j: "ᴊ", k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ", q: "ǫ", r: "ʀ", s: "s", t: "ᴛ", u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ" };

function mapMath(char: string, style: Style): string {
  const code = char.codePointAt(0) ?? 0;
  const isUpper = code >= 65 && code <= 90;
  const isLower = code >= 97 && code <= 122;
  if (!isUpper && !isLower) return smallCaps[char.toLowerCase()] ?? char;
  if (style === "Small Caps") return smallCaps[char.toLowerCase()] ?? char;
  const bases: Record<string, [number, number]> = {
    Bold: [0x1d400, 0x1d41a], Italic: [0x1d434, 0x1d44e], "Bold Italic": [0x1d468, 0x1d482], Script: [0x1d49c, 0x1d4b6], "Bold Script": [0x1d4d0, 0x1d4ea], Fraktur: [0x1d504, 0x1d51e], "Double-struck": [0x1d538, 0x1d552], Monospace: [0x1d670, 0x1d68a], Circled: [0x24b6, 0x24d0],
  };
  const [upperBase, lowerBase] = bases[style];
  const offset = (isUpper ? code - 65 : code - 97);
  if (style === "Script" && char === "B") return "ℬ";
  if (style === "Double-struck" && char === "R") return "ℝ";
  const exceptions = upperExceptions[style];
  if (isUpper && exceptions && exceptions[offset] && !["?"].includes(exceptions[offset])) return exceptions[offset];
  if (style === "Italic" && char === "h") return "ℎ";
  return String.fromCodePoint((isUpper ? upperBase : lowerBase) + offset);
}

export function styleText(text: string, style: Style): string {
  return [...text].map((char) => mapMath(char, style)).join("");
}

export type { Style };
