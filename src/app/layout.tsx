import type { Metadata } from "next";
<<<<<<< HEAD
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
=======
import { Playfair_Display, Inter, Space_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Lantern Daily — Signal Before Consensus",
  description:
    "Daily intelligence and analysis for the discerning operator. Signal before consensus.",
  openGraph: {
    title: "The Lantern Daily — Signal Before Consensus",
    description:
      "Daily intelligence and analysis for the discerning operator.",
    siteName: "The Lantern Daily",
    type: "website",
  },
>>>>>>> 1b0c004 (feat: The Lantern Daily — all 6 pages, 8 components, API routes, design system)
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<<<<<<< HEAD
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
=======
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${spaceMono.variable}`}
    >
      <body>
        <Nav />
        <main className="min-h-screen pt-16 pb-20">{children}</main>
        <Footer />
>>>>>>> 1b0c004 (feat: The Lantern Daily — all 6 pages, 8 components, API routes, design system)
      </body>
    </html>
  );
}
