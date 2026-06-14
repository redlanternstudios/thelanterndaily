import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";

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
      className={`${inter.variable} ${spaceMono.variable} bg-background antialiased`}
    >
      <body className="min-h-screen bg-background text-[var(--color-text)] font-body">
        {children}
      </body>
    </html>
  );
}
