import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

export const dynamic = "force-dynamic";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#07080D",
};

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-body">
        {children}
      </body>
    </html>
  );
}
