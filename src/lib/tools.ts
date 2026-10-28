export type Cluster = "Calculators" | "Text" | "Dev" | "Fun" | "Media";

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
  /** Long-form H1 for the tool page. Falls back to `title` (used on cards, breadcrumbs, JSON-LD). */
  h1?: string;
  /** Intent-rich <title> for search results. Falls back to `${title} | Tulyro`. */
  seoTitle?: string;
  /** Intent-rich meta description. Falls back to the short description. */
  seoDescription?: string;
};

export const tools: ToolDefinition[] = [
  {
    id: "gst-calculator",
    title: "GST Calculator (India) — Inclusive & Exclusive with CGST/SGST",
    cluster: "Calculators",
    href: "/calculators/gst-calculator/",
    locale: "en",
    description:
      "Calculate Goods and Services Tax (GST) for India instantly. Supports 5%, 12%, 18%, and 28% tax slabs with inclusive, exclusive, and CGST/SGST splits.",
    keywords: ["gst calculator", "gst calculator india", "inclusive gst calculator", "cgst sgst calculator"],
    related: ["invoice-generator", "percentage-calculator", "emi-calculator"],
    live: true,
    seoTitle: "GST Calculator India — Inclusive & Exclusive CGST SGST | Tulyro",
    seoDescription:
      "Free GST calculator for India. Calculate inclusive and exclusive GST, 5%, 12%, 18%, 28% slabs with CGST and SGST tax breakdown instantly.",
  },
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
    seoTitle: "EMI Calculator — Monthly Loan EMI in ₹, India | Tulyro",
    seoDescription:
      "Estimate your monthly EMI, total interest and total payment for an Indian loan. Enter amount, rate and tenure. Try it free in your browser — no signup.",
  },
  {
    id: "sip-calculator",
    title: "SIP Calculator",
    cluster: "Calculators",
    href: "/calculators/sip-calculator/",
    locale: "en-IN",
    description: "Calculate expected returns on mutual fund SIP investments in Indian rupees.",
    keywords: ["sip", "sip calculator", "mutual fund", "investment", "returns", "wealth"],
    related: ["emi-calculator", "mortgage-calculator"],
    live: true,
    h1: "SIP Calculator — Mutual Fund Investment & Wealth Growth in ₹",
    seoTitle: "SIP Calculator — Systematic Investment Plan Returns in ₹ | Tulyro",
    seoDescription:
      "Calculate your expected mutual fund returns with our free SIP calculator. Enter monthly investment, expected return rate, and time period in years. 100% private.",
  },
  {
    id: "attendance-calculator",
    title: "75% Attendance Calculator",
    cluster: "Calculators",
    href: "/calculators/attendance-calculator/",
    locale: "en-IN",
    description: "Check if your college attendance meets 75% rule. Calculate bunkable classes or required classes to attend.",
    keywords: ["attendance", "75 attendance calculator", "college attendance", "bunk calculator", "attendance shortage"],
    related: ["cgpa-to-percentage", "sgpa-to-cgpa"],
    live: true,
    h1: "75% Attendance Calculator — Safe Bunk & Shortage Planner",
    seoTitle: "75% Attendance Calculator — Bunk & Shortage Planner for College | Tulyro",
    seoDescription:
      "Find out exactly how many classes you can bunk or how many you must attend to maintain 75% attendance. Instant, free, and works offline.",
  },
  {
    id: "ppf-calculator",
    title: "PPF Calculator",
    cluster: "Calculators",
    href: "/calculators/ppf-calculator/",
    locale: "en-IN",
    description: "Calculate Public Provident Fund maturity amount, interest earned, and 15-year wealth growth.",
    keywords: ["ppf", "ppf calculator", "public provident fund", "80c tax saving", "interest calculator"],
    related: ["sip-calculator", "emi-calculator"],
    live: true,
    h1: "PPF Calculator — Public Provident Fund Maturity & Interest in ₹",
    seoTitle: "PPF Calculator — 15-Year Maturity & Interest Calculator in ₹ | Tulyro",
    seoDescription:
      "Calculate your PPF maturity amount and tax-free interest with year-by-year balance breakdown. Supports 15 to 50 years tenure at current 7.1% government rate.",
  },
  {
    id: "sgpa-to-cgpa",
    title: "SGPA to CGPA Calculator",
    cluster: "Calculators",
    href: "/calculators/sgpa-to-cgpa/",
    locale: "en-IN",
    description: "Convert semester SGPA to cumulative CGPA and percentage with credit weighting support.",
    keywords: ["sgpa to cgpa", "sgpa calculator", "semester gpa", "cgpa to percentage", "engineering marks"],
    related: ["cgpa-to-percentage", "attendance-calculator"],
    live: true,
    h1: "SGPA to CGPA Calculator — Semester to Cumulative GPA Converter",
    seoTitle: "SGPA to CGPA Calculator — Convert All Semesters to CGPA & % | Tulyro",
    seoDescription:
      "Convert multiple semester SGPA to cumulative CGPA and equivalent percentage. Supports credit-weighted calculation and standard equal weight.",
  },
  {
    id: "swp-calculator",
    title: "SWP Calculator",
    cluster: "Calculators",
    href: "/calculators/swp-calculator/",
    locale: "en-IN",
    description: "Calculate mutual fund Systematic Withdrawal Plan cash flow, total withdrawals, and final remaining corpus.",
    keywords: ["swp calculator", "systematic withdrawal plan", "mutual fund swp", "monthly pension calculator", "swp return"],
    related: ["sip-calculator", "ppf-calculator", "lumpsum-calculator"],
    live: true,
    h1: "SWP Calculator — Systematic Withdrawal Plan Returns & Balance in ₹",
    seoTitle: "SWP Calculator — Systematic Withdrawal Plan Returns & Balance in ₹ | Tulyro",
    seoDescription:
      "Calculate your mutual fund SWP monthly income, total amount withdrawn, and remaining balance. Plan monthly retirement income with exact compounding math.",
  },
  {
    id: "lumpsum-calculator",
    title: "Lumpsum Calculator",
    cluster: "Calculators",
    href: "/calculators/lumpsum-calculator/",
    locale: "en-IN",
    description: "Calculate mutual fund lumpsum investment returns, wealth gain, and future maturity value.",
    keywords: ["lumpsum calculator", "mutual fund lumpsum", "one time investment calculator", "compound interest", "wealth calculator"],
    related: ["sip-calculator", "swp-calculator", "cagr-calculator"],
    live: true,
    h1: "Lumpsum Calculator — Mutual Fund One-Time Investment Returns in ₹",
    seoTitle: "Lumpsum Calculator — Mutual Fund One-Time Investment Returns in ₹ | Tulyro",
    seoDescription:
      "Calculate wealth growth and maturity value of your one-time lumpsum mutual fund investment. Compare with SIP returns instantly.",
  },
  {
    id: "cagr-calculator",
    title: "CAGR Calculator",
    cluster: "Calculators",
    href: "/calculators/cagr-calculator/",
    locale: "en",
    description: "Calculate Compound Annual Growth Rate (CAGR) and absolute returns across multi-year investments.",
    keywords: ["cagr calculator", "cagr formula", "compound annual growth rate", "annual return calculator", "investment growth"],
    related: ["lumpsum-calculator", "sip-calculator", "percentage-calculator"],
    live: true,
    h1: "CAGR Calculator — Compound Annual Growth Rate & Return Formula",
    seoTitle: "CAGR Calculator — Compound Annual Growth Rate & Formula | Tulyro",
    seoDescription:
      "Find the exact Compound Annual Growth Rate (CAGR) of any stock, mutual fund, or business investment over time. Check annualized growth instantly.",
  },
  {
    id: "percentage-calculator",
    title: "Percentage Calculator",
    cluster: "Calculators",
    href: "/calculators/percentage-calculator/",
    locale: "en",
    description: "Calculate percentage of a number, percentage increase/decrease, and proportion with instant step-by-step math.",
    keywords: ["percentage calculator", "calculate percentage", "percent change", "percentage increase", "discount percentage"],
    related: ["cagr-calculator", "cgpa-to-percentage", "emi-calculator"],
    live: true,
    h1: "Percentage Calculator — Find % of Value, Change & Difference",
    seoTitle: "Percentage Calculator — Quick % of Number, Increase & Decrease | Tulyro",
    seoDescription:
      "Calculate what is X% of Y, percentage increase or decrease, and what percentage X is of Y. Free, private, and works offline.",
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
      "Estimate a US mortgage payment with total interest and total payment. Enter loan amount, rate and term to compare scenarios. Free, browser-only.",
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
    h1: "BMI Calculator — Body Mass Index (WHO & Indian ICMR Scales)",
    seoTitle: "BMI Calculator — WHO & Indian ICMR Scales, Metric & Imperial | Tulyro",
    seoDescription:
      "Check adult BMI from height and weight in metric or imperial units, with WHO and Indian/Asian ICMR screening cutoffs and a healthy weight range. Free, browser-only.",
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
    h1: "CGPA to Percentage Calculator — CBSE 9.5, UGC 10-Point & Indian Universities",
    seoTitle: "CGPA to Percentage Calculator — CBSE ×9.5, VTU, Mumbai & More | Tulyro",
    seoDescription:
      "Convert a 10-point CGPA to an estimated percentage with CBSE ×9.5, UGC ×10, VTU, GTU/BPUT, and Mumbai University formulas. The result is an estimate — confirm your institution's rule. Free.",
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
      "Turn plain text into copyable Unicode styles — bold, italic, script, monospace and more. Paste into bios, posts and messages. Free, browser-only.",
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
      "Encode UTF-8 text to Base64 or decode Base64 back to text, entirely in your browser. Handles emoji and non-Latin scripts. Free, private. Try it now.",
  },
  {
    id: "invoice-generator",
    title: "Invoice Generator",
    cluster: "Fun",
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
  {
    id: "remove-background",
    title: "Background Remover",
    cluster: "Fun",
    href: "/tools/remove-background/",
    locale: "en",
    description: "Remove image background online directly in your browser. 100% private, free, and no watermark.",
    keywords: ["remove background", "bg remover", "transparent background", "transparent png", "remove bg online"],
    related: ["invoice-generator", "base64-encoder-decoder"],
    live: true,
    seoTitle: "Free Background Remover — Transparent PNG in Browser | Tulyro",
    seoDescription:
      "Remove image backgrounds instantly in your browser. Auto-detect backdrop, custom color eyedropper, feather edges, download high-res transparent PNG. Free & private.",
  },
  {
    id: "image-resizer",
    title: "Image Resizer in KB",
    cluster: "Fun",
    href: "/tools/image-resizer/",
    locale: "en",
    description: "Resize and compress images to specific KB (20KB, 50KB, 100KB) for government exam portals, job forms, and passports.",
    keywords: ["image resizer in kb", "reduce image size in kb", "resize image to 20kb", "image compressor online", "ssc photo resize"],
    related: ["remove-background", "base64-encoder-decoder"],
    live: true,
    seoTitle: "Image Resizer in KB — Compress to 20KB, 50KB, 100KB Online | Tulyro",
    seoDescription:
      "Resize and compress JPG, PNG, WEBP images to exact file sizes (20KB, 50KB, 100KB) for online job portals and exam applications. 100% client-side & private.",
  },
  {
    id: "pdf-tools",
    title: "PDF to JPG & Image to PDF Converter",
    cluster: "Media",
    href: "/tools/pdf-tools/",
    locale: "en",
    description: "Convert PDF pages to JPG/PNG images or combine multiple images into a single PDF. 100% browser-based, no upload.",
    keywords: ["pdf to jpg", "pdf to image", "image to pdf", "jpg to pdf", "pdf converter online", "convert pdf to png"],
    related: ["image-resizer", "remove-background", "invoice-generator"],
    live: true,
    h1: "PDF to JPG & Image to PDF Converter — Free, Private, No Upload",
    seoTitle: "PDF to JPG & Image to PDF Converter — Free Online | Tulyro",
    seoDescription:
      "Convert PDF pages to high-quality JPG/PNG images or combine multiple images into one PDF. Runs entirely in your browser — no file uploads, no signup.",
  },
  {
    id: "qr-code-generator",
    title: "QR Code Generator",
    cluster: "Media",
    href: "/tools/qr-code-generator/",
    locale: "en",
    description: "Generate customizable QR codes with logo overlay for URLs, text, WiFi, and vCards. Download as PNG or SVG.",
    keywords: ["qr code generator", "qr code with logo", "free qr code", "qr code maker", "wifi qr code"],
    related: ["invoice-generator", "base64-encoder-decoder", "pdf-tools"],
    live: true,
    h1: "QR Code Generator with Logo — Free, Customizable, Download PNG/SVG",
    seoTitle: "QR Code Generator with Logo — Free Online QR Maker | Tulyro",
    seoDescription:
      "Create free QR codes for URLs, text, WiFi, and vCards with optional logo overlay. Customize colors, download as PNG or SVG. No signup, works offline.",
  },
  {
    id: "income-tax-calculator",
    title: "Income Tax Calculator (India)",
    cluster: "Calculators",
    href: "/calculators/income-tax-calculator/",
    locale: "en-IN",
    description: "Compare Old vs New tax regime for FY 2025-26 (AY 2026-27). Calculate tax liability with deductions under 80C, 80D, HRA and standard deduction.",
    keywords: ["income tax calculator", "income tax calculator india", "old vs new regime", "tax calculator fy 2025-26", "80c deduction calculator"],
    related: ["gst-calculator", "emi-calculator", "percentage-calculator"],
    live: true,
    h1: "Income Tax Calculator India — Old vs New Regime FY 2025-26",
    seoTitle: "Income Tax Calculator India — Old vs New Regime FY 2025-26 | Tulyro",
    seoDescription:
      "Calculate your income tax under Old and New regime for FY 2025-26 (AY 2026-27). Compare tax savings with 80C, 80D, HRA deductions. Free, private, instant.",
  },
];

export const clusters: Cluster[] = ["Calculators", "Text", "Dev", "Fun", "Media"];

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
