import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Hazem | Specialist Medical Consultant – Dubai, UAE",
  description:
    "Dr. Hazem is a leading specialist medical consultant based in Dubai, UAE. Trusted by thousands of patients. Book your consultation today.",
  keywords: [
    "Dr Hazem",
    "medical consultant Dubai",
    "specialist doctor UAE",
    "healthcare Dubai",
    "doctor consultation",
  ],
  openGraph: {
    title: "Dr. Hazem | Specialist Medical Consultant – Dubai, UAE",
    description:
      "Dr. Hazem is a leading specialist medical consultant based in Dubai, UAE. Trusted by thousands of patients.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Hazem | Specialist Medical Consultant – Dubai, UAE",
    description:
      "Dr. Hazem is a leading specialist medical consultant based in Dubai, UAE.",
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
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
