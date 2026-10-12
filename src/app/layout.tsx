import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { BASE_KEYWORDS, DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";

/*
 * Fonts are bundled in src/fonts (SIL Open Font License), so the site builds and runs on
 * localhost with no internet connection. No request goes to Google Fonts.
 */
const barlowCondensed = localFont({
  src: [
    { path: "../fonts/barlow-condensed-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/barlow-condensed-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../fonts/barlow-condensed-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-barlow-condensed",
  display: "swap",
  fallback: ["Arial Narrow", "Arial", "sans-serif"],
});

const inter = localFont({
  src: [
    { path: "../fonts/inter-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/inter-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/inter-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/inter-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
  fallback: ["-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: "Ultimate Tyres | Truck and bus tyres, Brisbane",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: BASE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Automotive",
  openGraph: {
    siteName: SITE_NAME,
    locale: "en_AU",
    type: "website",
    title: "Ultimate Tyres | Truck and bus tyres, Brisbane",
    description: DEFAULT_DESCRIPTION,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
  },
};

// Pinch-zoom stays enabled (WCAG 2.2).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1C1F22",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={`${barlowCondensed.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-ink">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
