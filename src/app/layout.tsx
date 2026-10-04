import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Ultimate Tyres",
    default: "Ultimate Tyres | Truck and bus tyres, Brisbane",
  },
  description:
    "Ralson, Blacklion and Triangle truck and bus tyres, supplied and fitted across South East Queensland. Branches at Rocklea, Yatala and Bald Hills.",
  icons: {
    icon: "/favicon.ico",
  },
};

// Pinch-zoom stays enabled (WCAG 2.2).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-ink">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
