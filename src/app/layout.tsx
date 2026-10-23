import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const isProductionDeployment = process.env.VERCEL_ENV === "production";
const GA_MEASUREMENT_ID = "G-V4TWQ2FWSX";
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter", weight: ["400", "500", "600", "700"] });
const display = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap", variable: "--font-display", weight: ["600", "700", "800"] });
const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-mono", weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://tulyro.online"),
  title: "Tulyro",
  description: "Browser-only tools with no signup and no watermark.",
  verification: {
    google: ["tJrMNOm9hTGetu1cicfDoSof6pWc3QL-1deNputt3_g", "rjO2TsnneYtKHGFfwlaymfRz62e-xuvUCGfRIGymAFU"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Tulyro",
    description: "Browser-only tools with no signup and no watermark.",
    siteName: "Tulyro",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tulyro — Free browser-only tools. No signup. No watermark.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tulyro",
    description: "Browser-only tools with no signup and no watermark.",
    images: ["/og-image.png"],
  },
  robots: {
    index: isProductionDeployment,
    follow: isProductionDeployment,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${inter.variable} ${display.variable} ${mono.variable}`}>
        {isProductionDeployment && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`,
              }}
            />
          </>
        )}
        {children}
      </body>
    </html>
  );
}
