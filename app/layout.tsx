import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "The Lantern Daily — Intelligence for Muslim Founders & AI Builders",
    template: "%s | The Lantern Daily",
  },
  description:
    "Signal over noise. Muslim-built. AI-native. Intelligence for founders, operators, and builders in the AI era.",
  openGraph: {
    title: "The Lantern Daily",
    description: "Signal over noise. Muslim-built. AI-native.",
    siteName: "The Lantern Daily",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Lantern Daily",
    description: "Signal over noise. Muslim-built. AI-native.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
