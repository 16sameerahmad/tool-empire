import type { Config } from "tailwindcss";

/**
 * Executive Precision — Google Stitch design system, implemented exactly
 * from stitch_tool_empire_ui_redesign/executive_precision/DESIGN.md.
 *
 * Token notes (documented mappings, see task report):
 * - `primary` (#493EE5) is the DESIGN.md M3 primary used for text/icon accents.
 *   The CTA violet is `primary-container` (#635BFF) per the Stitch screens.
 * - `secondary` (#005AB5) is the DESIGN.md M3 secondary; `action` (#3A8DFF)
 *   is the DESIGN.md prose "Action Blue" used for icon accents.
 * - Body background is DESIGN.md `background` (#FAF8FF) per the Stitch code;
 *   `canvas` (#F4F6FC) is the DESIGN.md workspace shade, available as a token.
 * - Radii follow DESIGN.md: sm .25rem, DEFAULT .5rem, md .75rem, lg 1rem,
 *   xl 1.5rem; `2xl` is pinned to 1.5rem so Stitch rounded-2xl panels match.
 */
const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // M3-ish tokens from DESIGN.md
        surface: "#FAF8FF",
        "surface-dim": "#D2D9F4",
        "surface-bright": "#FAF8FF",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#F2F3FF",
        "surface-container": "#EAEDFF",
        "surface-container-high": "#E2E7FF",
        "surface-container-highest": "#DAE2FD",
        "surface-variant": "#DAE2FD",
        "surface-tint": "#4C42E9",
        "on-surface": "#131B2E",
        "on-surface-variant": "#464555",
        "inverse-surface": "#283044",
        "inverse-on-surface": "#EEF0FF",
        outline: "#777587",
        "outline-variant": "#C7C4D8",
        primary: "#493EE5",
        "on-primary": "#FFFFFF",
        "primary-container": "#635BFF",
        "on-primary-container": "#FEFAFF",
        "inverse-primary": "#C3C0FF",
        "primary-fixed": "#E2DFFF",
        "primary-fixed-dim": "#C3C0FF",
        "on-primary-fixed": "#0F0069",
        "on-primary-fixed-variant": "#321ED2",
        secondary: "#005AB5",
        "on-secondary": "#FFFFFF",
        "secondary-container": "#0072E2",
        "on-secondary-container": "#FEFCFF",
        "secondary-fixed": "#D7E3FF",
        "secondary-fixed-dim": "#AAC7FF",
        "on-secondary-fixed": "#001B3E",
        "on-secondary-fixed-variant": "#00458E",
        tertiary: "#4F5B79",
        "on-tertiary": "#FFFFFF",
        "tertiary-container": "#687393",
        "on-tertiary-container": "#FCFAFF",
        "tertiary-fixed": "#D9E2FF",
        "tertiary-fixed-dim": "#BAC6E9",
        "on-tertiary-fixed": "#0E1B36",
        "on-tertiary-fixed-variant": "#3B4664",
        error: "#BA1A1A",
        "on-error": "#FFFFFF",
        "error-container": "#FFDAD6",
        "on-error-container": "#93000A",
        background: "#FAF8FF",
        "on-background": "#131B2E",
        // Hardcoded Stitch screen hexes
        midnight: "#07142F",
        "midnight-deep": "#0C1E45",
        canvas: "#F4F6FC",
        ink: "#0F172A",
        muted: "#61708B",
        action: "#3A8DFF",
        "accent-violet": "#8B7BFF",
        "primary-hover": "#534AE6",
        success: "#059669",
      },
      fontFamily: {
        display: ["var(--font-display)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-hero": ["56px", { lineHeight: "64px", letterSpacing: "-0.03em", fontWeight: "800" }],
        "display-hero-mobile": ["32px", { lineHeight: "38px", letterSpacing: "-0.02em", fontWeight: "800" }],
        "headline-lg": ["36px", { lineHeight: "44px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-lg-mobile": ["26px", { lineHeight: "32px", letterSpacing: "-0.015em", fontWeight: "700" }],
        "headline-md": ["24px", { lineHeight: "32px", letterSpacing: "-0.015em", fontWeight: "700" }],
        "headline-sm": ["18px", { lineHeight: "24px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "result-metric": ["28px", { lineHeight: "34px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "body-lg": ["16px", { lineHeight: "26px", fontWeight: "400" }],
        "body-md": ["14px", { lineHeight: "22px", fontWeight: "400" }],
        "body-sm": ["12px", { lineHeight: "18px", fontWeight: "400" }],
        "label-md": ["13px", { lineHeight: "16px", letterSpacing: "0.01em", fontWeight: "600" }],
        "label-sm": ["11px", { lineHeight: "14px", letterSpacing: "0.04em", fontWeight: "600" }],
        "code-data": ["13px", { lineHeight: "20px", fontWeight: "500" }],
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "1.5rem",
        full: "9999px",
      },
      spacing: {
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2.5rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,23,42,.04), 0 4px 12px rgba(15,23,42,.03)",
        "card-hover": "0 8px 24px rgba(15,23,42,.06)",
        "button-glow": "0 4px 14px rgba(99,91,255,.3)",
        sm: "0 1px 2px rgba(15,23,42,0.06)",
        md: "0 4px 12px rgba(15,23,42,0.08)",
        lg: "0 12px 32px rgba(15,23,42,0.12)",
      },
      maxWidth: {
        shell: "1240px",
      },
    },
  },
  plugins: [],
};

export default config;
