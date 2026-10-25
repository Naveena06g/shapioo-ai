// src/components/ui/PhotoTile.tsx
import { useState } from "react";

interface PhotoTileProps {
  src: string;
  alt: string;
  /** Emoji shown if the image file is missing or fails to load */
  fallback: string;
  width?: number;
  height?: number;
  /**
   * Tailwind aspect class for the frame. Default is 16:10 (landing cards).
   * Pass "" together with a fixed height in `className` (for example "h-40")
   * for dashboard tiles.
   */
  ratio?: string;
  className?: string;
}

/**
 * Photo header for cards. Every photo is cropped into the same fixed frame,
 * whatever its original shape (portrait, square or wide).
 *
 * The <img> is absolutely positioned inside the frame, so it can never push
 * the frame taller; only the frame's size sets the height.
 * Placeholder is sage while loading; lazy-loads; zooms 1.06 when the parent
 * `.group` is hovered; falls back to the emoji on any error.
 */
export default function PhotoTile({
  src,
  alt,
  fallback,
  width = 640,
  height = 480,
  ratio = "aspect-[16/10]",
  className = "",
}: PhotoTileProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative w-full shrink-0 overflow-hidden rounded-[14px] bg-sage ${ratio} ${className}`}
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
          className="absolute inset-0 h-full w-full max-w-none object-cover object-center transition-transform duration-500 ease-rise group-hover:scale-[1.06] motion-reduce:transform-none"
        />
      )}
    </div>
  );
}