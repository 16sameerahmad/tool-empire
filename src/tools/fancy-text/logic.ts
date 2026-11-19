type Style = "Bold" | "Italic" | "Bold Italic" | "Script" | "Bold Script" | "Fraktur" | "Double-struck" | "Monospace" | "Circled" | "Small Caps" | "Fullwidth" | "Squared" | "Parenthesized" | "Negative Squared" | "Upside-Down" | "Strikethrough" | "Underline" | "Spaced Out" | "Sans-Serif Bold" | "Sans-Serif Italic" | "Sans-Serif Bold Italic" | "Bold Fraktur" | "Superscript" | "Subscript";

const upperExceptions: Record<string, string> = { Script: "ℬℭ??ℰℱ??ℋℐ????ℒℳ????ℛ", "Bold Script": "𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩", "Double-struck": "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ" };
const smallCaps: Record<string, string> = { a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ꜰ", g: "ɢ", h: "ʜ", i: "ɪ", j: "ᴊ", k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ", q: "ǫ", r: "ʀ", s: "s", t: "ᴛ", u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ" };

// Rotated-character map for Upside-Down (string is also reversed in styleText).
const upsideDownMap: Record<string, string> = {
  a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ", j: "ɾ", k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z",
  A: "∀", B: "𐐒", C: "Ɔ", D: "ᗡ", E: "Ǝ", F: "Ⅎ", G: "⅁", H: "H", I: "I", J: "ſ", K: "ʞ", L: "˥", M: "W", N: "N", O: "O", P: "Ԁ", Q: "O", R: "ɹ", S: "S", T: "⊥", U: "∩", V: "Λ", W: "M", X: "X", Y: "⅄", Z: "Z",
};

// Superscript letters (capitals only where Unicode defines them; the rest pass through).
const superscriptMap: Record<string, string> = {
  a: "ᵃ", b: "ᵇ", c: "ᶜ", d: "ᵈ", e: "ᵉ", f: "ᶠ", g: "ᵍ", h: "ʰ", i: "ⁱ", j: "ʲ", k: "ᵏ", l: "ˡ", m: "ᵐ", n: "ⁿ", o: "ᵒ", p: "ᵖ", r: "ʳ", s: "ˢ", t: "ᵗ", u: "ᵘ", v: "ᵛ", w: "ʷ", x: "ˣ", y: "ʸ", z: "ᶻ",
  A: "ᴬ", B: "ᴮ", D: "ᴰ", E: "ᴱ", G: "ᴳ", H: "ᴴ", I: "ᴵ", J: "ᴶ", K: "ᴷ", L: "ᴸ", M: "ᴹ", N: "ᴺ", O: "ᴼ", P: "ᴾ", R: "ᴿ", T: "ᵀ", U: "ᵁ", V: "ⱽ", W: "ᵂ",
};

// Subscript letters (only the letters Unicode defines; the rest pass through).
const subscriptMap: Record<string, string> = {
  a: "ₐ", e: "ₑ", o: "ₒ", x: "ₓ", h: "ₕ", k: "ₖ", l: "ₗ", m: "ₘ", n: "ₙ", p: "ₚ", s: "ₛ", t: "ₜ", i: "ᵢ", j: "ⱼ", r: "ᵣ", u: "ᵤ", v: "ᵥ",
};

function mapMath(char: string, style: Style): string {
  const code = char.codePointAt(0) ?? 0;
  const isUpper = code >= 65 && code <= 90;
  const isLower = code >= 97 && code <= 122;
  if (!isUpper && !isLower) return smallCaps[char.toLowerCase()] ?? char;
  if (style === "Small Caps") return smallCaps[char.toLowerCase()] ?? char;
  const bases: Record<string, [number, number]> = {
    Bold: [0x1d400, 0x1d41a], Italic: [0x1d434, 0x1d44e], "Bold Italic": [0x1d468, 0x1d482], Script: [0x1d49c, 0x1d4b6], "Bold Script": [0x1d4d0, 0x1d4ea], Fraktur: [0x1d504, 0x1d51e], "Double-struck": [0x1d538, 0x1d552], Monospace: [0x1d670, 0x1d68a], Circled: [0x24b6, 0x24d0],
    "Sans-Serif Bold": [0x1d5d4, 0x1d5ee], "Sans-Serif Italic": [0x1d608, 0x1d622], "Sans-Serif Bold Italic": [0x1d63c, 0x1d656], "Bold Fraktur": [0x1d56c, 0x1d586],
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

function mapOffset(char: string, upperBase: number, lowerBase: number): string {
  const code = char.codePointAt(0) ?? 0;
  if (code >= 65 && code <= 90) return String.fromCodePoint(upperBase + code - 65);
  if (code >= 97 && code <= 122) return String.fromCodePoint(lowerBase + code - 97);
  return char;
}

export function styleText(text: string, style: Style): string {
  const chars = [...text];
  switch (style) {
    case "Upside-Down":
      return chars.reverse().map((char) => upsideDownMap[char] ?? char).join("");
    case "Strikethrough":
      return chars.map((char) => (/\s/.test(char) ? char : char + "̶")).join("");
    case "Underline":
      return chars.map((char) => (/\s/.test(char) ? char : char + "̲")).join("");
    case "Spaced Out":
      return chars.join(" ");
    case "Fullwidth":
      return chars.map((char) => {
        const code = char.codePointAt(0) ?? 0;
        if (code >= 65 && code <= 90) return String.fromCodePoint(0xff21 + code - 65);
        if (code >= 97 && code <= 122) return String.fromCodePoint(0xff41 + code - 97);
        if (code >= 48 && code <= 57) return String.fromCodePoint(0xff10 + code - 48);
        if (char === " ") return "　";
        return char;
      }).join("");
    case "Squared":
      return chars.map((char) => mapOffset(char, 0x1f130, 0x1f130)).join("");
    case "Parenthesized":
      return chars.map((char) => mapOffset(char, 0x1f110, 0x249c)).join("");
    case "Negative Squared":
      return chars.map((char) => mapOffset(char, 0x1f170, 0x1f170)).join("");
    case "Superscript":
      return chars.map((char) => superscriptMap[char] ?? char).join("");
    case "Subscript":
      return chars.map((char) => subscriptMap[char] ?? char).join("");
    default:
      return chars.map((char) => mapMath(char, style)).join("");
  }
}

export type { Style };
