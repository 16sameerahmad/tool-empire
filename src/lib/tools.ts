export type Cluster = "Calculators" | "Text" | "Dev" | "Tools" | "Fun";

export type ToolDefinition = {
  id: string;
  title: string;
  cluster: Cluster;
  href: string;
  locale: string;
  description: string;
  keywords: string[];
  related: string[];
  live: boolean;
  /** Intent-rich <title> for search results. Falls back to `${title} | Tulyro`. */
  seoTitle?: string;
  /** Intent-rich meta description. Falls back to the short description. */
  seoDescription?: string;
};

export const tools: ToolDefinition[] = [
  {
    id: "age-calculator",
    title: "Age Calculator",
    cluster: "Calculators",
    href: "/calculators/age-calculator/",
    locale: "en",
    description: "Calculate your exact age in years, months, and days.",
    keywords: ["age", "birthday", "date of birth"],
    related: ["emi-calculator", "bmi-calculator"],
    live: true,
    seoTitle: "Age Calculator — Exact Age in Years, Months & Days | Tulyro",
    seoDescription:
      "Calculate your exact age in years, months and days from your date of birth. See total days lived and your next birthday. Free, browser-only, no signup.",
  },
  {
    id: "emi-calculator",
    title: "EMI Calculator",
    cluster: "Calculators",
    href: "/calculators/emi-calculator/",
    locale: "en-IN",
    description: "Estimate monthly loan payments in Indian rupees.",
    keywords: ["emi", "loan", "interest", "monthly payment"],
    related: ["mortgage-calculator", "age-calculator"],
    live: true,
    seoTitle: "EMI Calculator — Monthly Loan EMI in ₹ | Tulyro",
    seoDescription:
      "Estimate your monthly EMI, total interest and total payment for an Indian loan. Enter amount, rate and tenure. Try it free in your browser — no signup.",
  },
  {
    id: "mortgage-calculator",
    title: "Mortgage Calculator",
    cluster: "Calculators",
    href: "/calculators/mortgage-calculator/",
    locale: "en-US",
    description: "Estimate a US mortgage payment with a clear breakdown.",
    keywords: ["mortgage", "home loan", "loan payment", "interest"],
    related: ["emi-calculator", "bmi-calculator"],
    live: true,
    seoTitle: "Mortgage Calculator — Monthly Home Loan Payment | Tulyro",
    seoDescription:
      "Estimate a US mortgage payment with total interest and total payment. Enter loan amount, rate and term, then compare scenarios. Free, browser-only — no signup.",
  },
  {
    id: "bmi-calculator",
    title: "BMI Calculator",
    cluster: "Calculators",
    href: "/calculators/bmi-calculator/",
    locale: "en",
    description: "Check adult BMI using metric or imperial measurements.",
    keywords: ["bmi", "body mass index", "weight", "height"],
    related: ["age-calculator", "cgpa-to-percentage"],
    live: true,
    seoTitle: "BMI Calculator — Body Mass Index, Metric & Imperial | Tulyro",
    seoDescription:
      "Check adult BMI from height and weight in metric or imperial units, with screening categories explained. Uses WHO adult cutoffs. Free, browser-only — no signup.",
  },
  {
    id: "cgpa-to-percentage",
    title: "CGPA to Percentage",
    cluster: "Calculators",
    href: "/calculators/cgpa-to-percentage/",
    locale: "en",
    description: "Convert a 10-point CGPA using the CBSE 9.5 convention.",
    keywords: ["cgpa", "percentage", "marks", "cbse"],
    related: ["age-calculator", "word-counter"],
    live: true,
    seoTitle: "CGPA to Percentage Calculator (×9.5, CBSE) | Tulyro",
    seoDescription:
      "Convert a 10-point CGPA to an estimated percentage using the CBSE ×9.5 convention. The result is an estimate — confirm your institution's rule. Free, no signup.",
  },
  {
    id: "word-counter",
    title: "Word Counter",
    cluster: "Text",
    href: "/text/word-counter/",
    locale: "en",
    description: "Count words, characters, sentences, and reading time.",
    keywords: ["word count", "character count", "writing", "reading time"],
    related: ["fancy-text-generator", "text-to-speech"],
    live: true,
    seoTitle: "Word Counter — Words, Characters & Reading Time | Tulyro",
    seoDescription:
      "Count words, characters, sentences and reading time as you type. Grapheme-aware character counts, live results. Free, browser-only — no signup. Try it now.",
  },
  {
    id: "text-to-speech",
    title: "Text to Speech",
    cluster: "Text",
    href: "/text/text-to-speech/",
    locale: "en",
    description: "Read text aloud with voices already available in your browser.",
    keywords: ["text to speech", "tts", "read aloud", "voice"],
    related: ["word-counter", "fancy-text-generator"],
    live: true,
    seoTitle: "Text to Speech — Read Text Aloud in Your Browser | Tulyro",
    seoDescription:
      "Listen to text read aloud with voices already in your browser. Adjust speed, pause and resume, up to 10,000 characters. Free — no signup, no download.",
  },
  {
    id: "fancy-text-generator",
    title: "Fancy Text Generator",
    cluster: "Text",
    href: "/text/fancy-text-generator/",
    locale: "en",
    description: "Turn ordinary text into copyable Unicode styles.",
    keywords: ["fancy text", "unicode text", "stylish text", "font"],
    related: ["word-counter", "base64-encoder-decoder"],
    live: true,
    seoTitle: "Fancy Text Generator — Stylish Unicode Text | Tulyro",
    seoDescription:
      "Turn plain text into copyable Unicode styles — bold, italic, script, monospace and more. Paste into bios, posts and messages. Free, browser-only — no signup.",
  },
  {
    id: "base64-encoder-decoder",
    title: "Base64 Encoder/Decoder",
    cluster: "Dev",
    href: "/dev/base64-encoder-decoder/",
    locale: "en",
    description: "Encode or decode UTF-8 text as Base64 in your browser.",
    keywords: ["base64", "encode", "decode", "utf-8", "developer"],
    related: ["word-counter", "fancy-text-generator"],
    live: true,
    seoTitle: "Base64 Encoder / Decoder — Encode & Decode Text | Tulyro",
    seoDescription:
      "Encode UTF-8 text to Base64 or decode Base64 back to text, entirely in your browser. Handles emoji and non-Latin scripts. Free, private — no signup. Try it now.",
  },
  {
    id: "invoice-generator",
    title: "Invoice Generator",
    cluster: "Tools",
    href: "/tools/invoice-generator/",
    locale: "en",
    description: "Create a simple invoice and print it without a watermark.",
    keywords: ["invoice", "bill", "receipt", "print invoice"],
    related: ["fake-text-generator", "emi-calculator"],
    live: true,
    seoTitle: "Invoice Generator — Free, No Watermark, Print PDF | Tulyro",
    seoDescription:
      "Create a simple invoice in your browser and print or save it as PDF — no watermark, no signup. Line items, tax and ₹/$ currency. Try it free — no download.",
  },
  {
    id: "fake-text-generator",
    title: "Fake Text Generator",
    cluster: "Fun",
    href: "/fun/fake-text-generator/",
    locale: "en",
    description: "Make a generic chat mockup for sketches and entertainment.",
    keywords: ["fake text", "chat mockup", "message screenshot", "conversation"],
    related: ["invoice-generator", "fancy-text-generator"],
    live: true,
    seoTitle: "Fake Text Generator — Chat Mockup & Screenshots | Tulyro",
    seoDescription:
      "Make a generic chat mockup for sketches, presentations and entertainment. Add messages, preview, export PNG. No watermark — free, no signup. Try it now.",
  },
];

export const clusters: Cluster[] = ["Calculators", "Text", "Dev", "Tools", "Fun"];

export function getTool(id: string): ToolDefinition {
  const tool = tools.find((entry) => entry.id === id);
  if (!tool) {
    throw new Error(`Unknown tool: ${id}`);
  }
  return tool;
}

export function getToolsByCluster(cluster: Cluster): ToolDefinition[] {
  return tools.filter((tool) => tool.cluster === cluster && tool.live);
}
