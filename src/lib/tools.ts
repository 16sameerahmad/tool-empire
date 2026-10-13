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
