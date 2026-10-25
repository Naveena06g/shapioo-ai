import type { CSSProperties } from "react";

interface SkeletonProps {
  className?: string;
  style?: CSSProperties;
}

/** A single shimmering block. Size it with className (e.g. "h-4 w-32"). */
export function Skeleton({ className = "", style }: SkeletonProps) {
  return <div className={`skeleton ${className}`} style={style} aria-hidden="true" />;
}

/** Skeleton shaped like a row of KPI cards. */
export function KpiRowSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
      role="status"
      aria-label="Loading numbers"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="kpi">
          <Skeleton className="h-3 w-20 mb-3" />
          <Skeleton className="h-7 w-16" />
        </div>
      ))}
    </div>
  );
}

/** Skeleton shaped like a grid of cards. */
export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-3"
      role="status"
      aria-label="Loading content"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card">
          <Skeleton className="h-10 w-10 mb-3" />
          <Skeleton className="h-4 w-2/3 mb-2" />
          <Skeleton className="h-3 w-full mb-1.5" />
          <Skeleton className="h-3 w-4/5" />
        </div>
      ))}
    </div>
  );
}

/** Full-page skeleton used while the session is being checked. */
export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-cream p-6 md:p-10" role="status" aria-label="Loading SHOPIOO">
      <Skeleton className="h-9 w-64 mb-3" />
      <Skeleton className="h-4 w-80 max-w-full mb-8" />
      <KpiRowSkeleton />
      <CardGridSkeleton />
      <span className="sr-only">Loading SHOPIOO…</span>
    </div>
  );
}
