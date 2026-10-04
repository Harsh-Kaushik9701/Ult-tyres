import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Ultimate Tyres Australia",
    default: "Ultimate Tyres — Heavy Truck & Commercial Tyre Wholesalers & Fleet Solutions",
  },
  description:
    "Authorised Australian distributor for Ralson, Blacklion & Triangle commercial truck and bus tyres. Rapid RFQ dealer portal, 24/7 mobile fleet breakdown, and precision wheel alignment in Brisbane (Rocklea, Yatala, Bald Hills).",
  keywords: [
    "commercial tyres Brisbane",
    "truck tyres Rocklea",
    "Ralson truck tyres Australia",
    "Blacklion truck tyres",
    "Triangle truck tyres",
    "heavy wheel alignment Brisbane",
    "fleet tyre management",
    "Ultimate ReadyFit",
  ],
  authors: [{ name: "Ultimate Tyres" }],
  icons: {
    icon: "/favicon.ico",
  },
};

// WCAG 2.2 AA compliant viewport: allow pinch-to-zoom (user-scalable=yes)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#1C1F22",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-[#121416] text-[#E9ECEF]">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
