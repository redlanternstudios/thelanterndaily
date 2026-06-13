import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import TickerStrip from '@/components/TickerStrip'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'The Lantern Daily — Signal Before Consensus',
  description: 'The daily intelligence brief for serious Muslim operators and AI-native builders. No noise. No consensus. Just signal.',
  metadataBase: new URL('https://thelanterndaily.com'),
  openGraph: {
    title: 'The Lantern Daily — Signal Before Consensus',
    description: 'The daily intelligence brief for Muslim founders and builders shaping the future of halal tech.',
    type: 'website',
    siteName: 'The Lantern Daily',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <TickerStrip />
        <main className="pt-[88px]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}