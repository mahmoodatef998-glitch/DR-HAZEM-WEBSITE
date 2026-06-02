import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export const metadata: Metadata = {
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
  ],
  openGraph: {
    title: "Medix Healthcare | Premium Imported Medicines – Dubai, UAE",
    description:
      "Certified pharmaceuticals sourced directly from Spain and the United Kingdom. GCC approved, ISO certified. Based in Dubai, UAE.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Medix Healthcare | Premium Imported Medicines – Dubai, UAE",
    description:
      "Certified pharmaceuticals sourced directly from Spain and the United Kingdom. GCC approved. Dubai, UAE.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
