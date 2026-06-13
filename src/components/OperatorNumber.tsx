'use client';

import { useEffect, useState } from 'react';

interface OperatorNumberProps {
  number: string;
}

export default function OperatorNumber({ number }: OperatorNumberProps) {
  const [display, setDisplay] = useState('0000');
  const target = parseInt(number, 10);

  useEffect(() => {
    if (isNaN(target)) return;
    const duration = 1500;
    const steps = 30;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplay(String(target).padStart(4, '0'));
        clearInterval(timer);
      } else {
        setDisplay(String(Math.floor(current)).padStart(4, '0'));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <span className="font-mono text-6xl sm:text-7xl md:text-8xl font-bold text-lantern-accent tabular-nums tracking-tight">
      #{display}
    </span>
  );
}
