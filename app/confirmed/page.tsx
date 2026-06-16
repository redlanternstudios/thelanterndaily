import { Suspense } from 'react';
import { ConfirmedContent } from './ConfirmedContent';

export default function ConfirmedPage() {
  return (
    <Suspense fallback={<ConfirmedSkeleton />}>
      <ConfirmedContent />
    </Suspense>
  );
}

function ConfirmedSkeleton() {
  return (
    <main style={{ minHeight: '100vh', background: '#0A0B0F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ color: '#3D4048', fontSize: '14px', letterSpacing: '0.08em' }}>LOADING...</div>
      </div>
    </main>
  );
}
