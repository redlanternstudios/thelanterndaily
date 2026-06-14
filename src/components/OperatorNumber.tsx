'use client';
import { useEffect, useState } from 'react';

interface Props {
  number: string;
  label?: string;
  size?: 'large' | 'xlarge';
}

export default function OperatorNumber({ number, label = 'Operator', size = 'large' }: Props) {
  const [display, setDisplay] = useState('0000');
  const fontSize = size === 'xlarge' ? 60 : 40;

  useEffect(() => {
    let frame = 0;
    const maxFrame = 20;
    const interval = setInterval(() => {
      frame++;
      if (frame >= maxFrame) {
        setDisplay(number);
        clearInterval(interval);
      } else {
        setDisplay(number.split('').map((d, i) => {
          if (frame > maxFrame - (4 - i) * 5) return d;
          return String(Math.floor(Math.random() * 10));
        }).join(''));
      }
    }, 50);
    return () => clearInterval(interval);
  }, [number]);

  return (
    <div>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D42535', marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize, fontWeight: 700, color: '#FFFFFF', lineHeight: 1, marginBottom: 8 }}>
        #{display}
      </div>
    </div>
  );
}