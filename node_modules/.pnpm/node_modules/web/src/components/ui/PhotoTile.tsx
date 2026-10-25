// src/components/ui/PhotoTile.tsx
import { useState } from "react";

interface PhotoTileProps {
  src: string;
  alt: string;
  /** Emoji shown if the image file is missing or fails to load */
  fallback: string;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Photo header for cards. Reserves its space up front (no layout shift),
 * shows a sage placeholder while loading, lazy-loads, zooms 1.06 when the
 * parent `.group` is hovered, and falls back to the emoji on any error.
 */
export default function PhotoTile({
  src,
  alt,
  fallback,
  width = 640,
  height = 480,
  className = "",
}: PhotoTileProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative aspect-[16/10] overflow-hidden rounded-[14px] bg-sage ${className}`}
      {...(failed ? { role: "img", "aria-label": alt } : {})}
    >
      {failed ? (
        <span
          className="absolute inset-0 grid place-items-center text-5xl"
          aria-hidden="true"
        >
          {fallback}
        </span>
      ) : (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-500 ease-rise group-hover:scale-[1.06] motion-reduce:transform-none"
        />
      )}
    </div>
  );
}
