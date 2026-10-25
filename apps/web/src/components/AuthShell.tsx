// src/components/AuthShell.tsx
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
  brandContent?: ReactNode;
}

const pillars = [
  { icon: "🌾", text: "Direct farmer-to-buyer marketplace" },
  { icon: "🏪", text: "Local multi-shop digital storefronts" },
  { icon: "🎓", text: "AI skills and youth employment" },
];

const defaultBrand = (
  <>
    {/* Not an h1: the page's single h1 is the form title on the right */}
    <p className="font-display text-[2.25rem] font-extrabold leading-[1.05] tracking-[-0.02em] text-white md:text-[2.75rem]">
      SHOPPIOO <span className="text-saffron">AI</span>
    </p>
    <p className="mt-4 max-w-md text-[0.9375rem] leading-[1.55] text-sage">
      Better markets for farmers. Affordable food for every family. Employment
      for every community.
    </p>
    <ul className="mt-8 space-y-3 text-[0.9375rem] leading-[1.55] text-sage">
      {pillars.map((p) => (
        <li key={p.text} className="flex items-start gap-2.5">
          <span aria-hidden="true">{p.icon}</span>
          {p.text}
        </li>
      ))}
    </ul>
  </>
);

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
  brandContent,
}: AuthShellProps) {
  return (
    <div className="grid min-h-dvh md:grid-cols-2">
      {/* Left branding panel (hidden below 860px) */}
      <aside
        className="relative hidden overflow-hidden p-12 text-white md:flex md:flex-col md:justify-center"
        style={{ background: "linear-gradient(160deg, #0f3324, #1f6e45)" }}
      >
        <div className="relative z-10">{brandContent ?? defaultBrand}</div>

        {/* Decorative watermark */}
        <div
          className="pointer-events-none absolute -bottom-16 -right-16 select-none text-[18rem] opacity-[0.07]"
          aria-hidden="true"
        >
          🌾
        </div>
        {/* Soft saffron glow, top-right */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(242,163,58,0.5), transparent 70%)",
          }}
          aria-hidden="true"
        />
      </aside>

      {/* Form panel */}
      <main className="flex items-center justify-center bg-cream px-4 py-8 min-[420px]:px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-md motion-safe:animate-rise">
          {/* Compact brand, shown only when the side panel is hidden */}
          <Link
            to="/"
            className="mb-8 inline-flex min-h-11 items-center font-display text-[1.25rem] font-bold leading-[1.2] text-forest md:hidden"
            aria-label="SHOPPIOO AI home"
          >
            SHOPPIOO <span className="ml-1 text-leaf2">AI</span>
          </Link>

          <div className="mb-8">
            <h1 className="font-display text-[1.65rem] font-bold leading-[1.15] tracking-[-0.025em] text-ink md:text-[2.1rem]">
              {title}
            </h1>
            <p className="mt-2 text-[0.9375rem] leading-[1.55] text-mute">
              {subtitle}
            </p>
          </div>

          {children}

          {footer && (
            <p className="mt-6 text-center text-[0.8125rem] leading-[1.5] text-mute">
              {footer}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}