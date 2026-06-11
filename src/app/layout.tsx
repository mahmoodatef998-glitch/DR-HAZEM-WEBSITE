import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import JsonLd from "@/components/JsonLd";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";

/* ── Latin / English font ── */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

/* ── Arabic font — applied via CSS when dir=rtl ── */
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-cairo",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://drhazem.ae";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Medix Healthcare | Premium Imported Medicines – Dubai, UAE",
  description:
    "Medix Healthcare imports certified, high-quality pharmaceuticals directly from licensed manufacturers in Spain and Italy. GCC approved, ISO certified. Dubai, UAE.",
  keywords: [
    "Medix Healthcare",
    "imported medicines Dubai",
    "pharmaceutical import UAE",
    "medicines from Spain UAE",
    "medicines from Italy UAE",
    "Italy Spain medicines Dubai",
    "GCC certified pharmaceuticals",
    "medical import distribution Dubai",
    "Dr Hazem Dubai",
    "أدوية مستوردة دبي",
    "أدوية إسبانيا إيطاليا",
  ],
  openGraph: {
    title: "Medix Healthcare | Premium Imported Medicines – Dubai, UAE",
    description:
      "Certified pharmaceuticals sourced directly from licensed manufacturers in Spain and Italy. GCC approved, ISO certified. Dubai, UAE.",
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Medix Healthcare",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Medix Healthcare – Premium Imported Medicines from Spain & Italy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medix Healthcare | Premium Imported Medicines – Dubai, UAE",
    description: "Certified pharmaceuticals from Spain and Italy. GCC approved. Dubai, UAE.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-AE": BASE_URL,
      "ar-AE": BASE_URL,
      "x-default": BASE_URL,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
  other: {
    "geo.region": "AE-DU",
    "geo.placename": "Dubai",
    "geo.position": "25.2285;55.3273",
    "ICBM": "25.2285, 55.3273",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    /* lang/dir updated client-side by LanguageContext — suppressHydrationWarning prevents mismatch errors */
    <html lang="en" dir="ltr" className={`${inter.variable} ${cairo.variable}`} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <JsonLd />
        <LanguageProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </LanguageProvider>
        <Analytics />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
