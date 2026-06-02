import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import JsonLd from "@/components/JsonLd";

/* ── next/font: self-hosted Inter via Google CDN — zero layout shift, no duplicate request ── */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://drhazem.ae";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Medix Healthcare | Premium Imported Medicines – Dubai, UAE",
  description:
    "Medix Healthcare imports certified, high-quality pharmaceuticals from licensed manufacturers in Spain and the United Kingdom. GCC approved, ISO certified. Dubai, UAE.",
  keywords: [
    "Medix Healthcare",
    "imported medicines Dubai",
    "pharmaceutical import UAE",
    "licensed medicines UAE",
    "Spain UK medicines Dubai",
    "GCC certified pharmaceuticals",
    "medical import distribution",
    "Dr Hazem Dubai",
    "Dubai Healthcare City",
  ],
  openGraph: {
    title: "Medix Healthcare | Premium Imported Medicines – Dubai, UAE",
    description:
      "Certified pharmaceuticals sourced directly from Spain and the United Kingdom. GCC approved, ISO certified. Based in Dubai, UAE.",
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Medix Healthcare",
    images: [
      {
        url: "/og-image.jpg", // TODO: add a real 1200×630 image to /public
        width: 1200,
        height: 630,
        alt: "Medix Healthcare – Premium Imported Medicines Dubai UAE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medix Healthcare | Premium Imported Medicines – Dubai, UAE",
    description:
      "Certified pharmaceuticals sourced directly from Spain and the United Kingdom. GCC approved. Dubai, UAE.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <JsonLd />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
