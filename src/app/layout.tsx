import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'The Lantern Daily — Intelligence for Muslim Founders & AI Builders',
    template: '%s | The Lantern Daily',
  },
  description:
    'Signal over noise. Muslim-built. AI-native. Daily intelligence distilled through the lens of clarity and sovereignty.',
  openGraph: {
    title: 'The Lantern Daily',
    description: 'Signal over noise. Muslim-built. AI-native.',
    siteName: 'The Lantern Daily',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Lantern Daily',
    description: 'Signal over noise. Muslim-built. AI-native.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#07080D] text-[#F7F2EE] antialiased">
        {children}
      </body>
    </html>
  );
}
