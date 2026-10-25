import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Extra delay in ms, handy for staggering siblings */
  delay?: number;
}

/**
 * Fades + lifts its children into view the first time they scroll on screen.
 * With prefers-reduced-motion (or no IntersectionObserver) content is simply shown.
 */
export default function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (reduced || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-rise ${
        shown ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
