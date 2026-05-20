import { useEffect, useState } from 'react';
import { getCountdown } from '../utils/countdown';
import type { CountdownParts } from '../types/event';

export function useCountdown(targetIso: string | null): CountdownParts | null {
  const [parts, setParts] = useState<CountdownParts | null>(
    targetIso ? getCountdown(targetIso) : null
  );

  useEffect(() => {
    if (!targetIso) {
      setParts(null);
      return;
    }

    const tick = () => setParts(getCountdown(targetIso));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [targetIso]);

  return parts;
}
