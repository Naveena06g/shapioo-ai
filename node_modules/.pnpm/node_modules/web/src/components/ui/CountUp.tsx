import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface CountUpProps {
  /** Final numeric value */
  value: number;
  /** Text shown before the number, e.g. "₹" */
  prefix?: string;
  /** Text shown after the number, e.g. " kg" */
  suffix?: string;
  /** Animation length in ms */
  duration?: number;
  /** Decimal places to show */
  decimals?: number;
}

/**
 * Animates a number from 0 to `value` once when it first appears.
 * Respects prefers-reduced-motion (shows the final value immediately).
 * Uses en-IN grouping so ₹1,25,000 reads naturally.
 */
export default function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 850,
  decimals = 0,
}: CountUpProps) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState<number>(reduced ? value : 0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (reduced || value === 0) {
      setDisplay(value);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setDisplay(value * eased);
      if (p < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [value, duration, reduced]);

  const text = display.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span aria-label={`${prefix}${value.toLocaleString("en-IN")}${suffix}`}>
      <span aria-hidden="true">
        {prefix}
        {text}
        {suffix}
      </span>
    </span>
  );
}
