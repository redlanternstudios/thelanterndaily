<<<<<<< HEAD
import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
=======
import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import TickerStrip from '@/components/TickerStrip'
import Footer from '@/components/Footer'
>>>>>>> origin/main

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "The Lantern Daily — AI & Tech for Muslim Builders",
  description:
    "A Muslim-founded AI and tech newsletter for founders, builders, and operators. Field notes, market signals, and the operator stack. 18,472+ builders, investors, and operators.",
  openGraph: {
    title: "The Lantern Daily",
    description: "AI & tech intelligence for Muslim builders, founders, and operators.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Lantern Daily",
    description: "AI & tech intelligence for Muslim builders, founders, and operators.",
  },
};

export const viewport = {
  themeColor: "#07080f",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-body">
        {children}
=======
  title: 'The Lantern Daily — Signal Before Consensus',
  description: 'The daily intelligence brief for serious Muslim operators and AI-native builders. No noise. No consensus. Just signal.',
  metadataBase: new URL('https://thelanterndaily.com'),
  openGraph: {
    title: 'The Lantern Daily — Signal Before Consensus',
    description: 'The daily intelligence brief for Muslim founders and builders shaping the future of halal tech.',
    type: 'website',
    siteName: 'The Lantern Daily',
  },
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <TickerStrip />
        <main className="pt-[88px]">{children}</main>
        <Footer />
>>>>>>> origin/main
      </body>
    </html>
  )
}