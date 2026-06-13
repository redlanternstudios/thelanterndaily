import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Lantern Daily — Signal Before Consensus",
  description:
    "The daily intelligence brief for serious Muslim operators and AI-native builders. No noise. No consensus. Just signal.",
  openGraph: {
    title: "The Lantern Daily",
    description: "Signal Before Consensus — Muslim-built. AI-native.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Lantern Daily",
    description: "Signal Before Consensus — Muslim-built. AI-native.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col" style={{ background: '#07080F', color: '#E8E9EF' }}>
        {children}
      </body>
    </html>
  );
}
