import React from 'react';
import type { Metadata } from 'next';
import Masthead from '@/components/Masthead';
import Footer from '@/components/Footer';
import SourcesConsole from '@/components/sources/SourcesConsole';

export const metadata: Metadata = {
  title: 'Frontier Radar & Sourcing Provenance | The Lantern Daily',
  description:
    'How Keymon Penn and The Lantern Daily scout the frontier: verified data pipelines, 24-hour daily cadence, and deterministic filtering across AI infrastructure and sovereign capital.',
};

export default function SourcesPage() {
  return (
    <div className="min-h-screen bg-[#07080D] text-[#F7F2EE] antialiased">
      <Masthead />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
        <SourcesConsole />
      </main>

      <Footer />
    </div>
  );
}
