import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

type ToastKind = "success" | "error" | "info";

interface ToastItem {
  id: number;
  kind: ToastKind;
  message: string;
}

interface ToastApi {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

const DURATION = 3500;
const MAX_VISIBLE = 4;

const STYLES: Record<ToastKind, { border: string; icon: string }> = {
  success: { border: "border-l-leaf", icon: "text-[#8fd08a]" },
  error: { border: "border-l-tomato", icon: "text-[#ff9b86]" },
  info: { border: "border-l-saffron", icon: "text-saffron" },
};

function ToastCard({ toast, onClose }: { toast: ToastItem; onClose: (id: number) => void }) {
  const remaining = useRef(DURATION);
  const startedAt = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = useCallback(() => {
    if (timer.current) clearTimeout(timer.current); // never run two timers
    startedAt.current = Date.now();
    timer.current = setTimeout(() => onClose(toast.id), remaining.current);
  }, [onClose, toast.id]);

  const pause = useCallback(() => {
    if (!timer.current) return; // already paused
    clearTimeout(timer.current);
    timer.current = null;
    remaining.current = Math.max(800, remaining.current - (Date.now() - startedAt.current));
  }, []);

  useEffect(() => {
    start();
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [start]);

  const Icon = toast.kind === "success" ? CheckCircle2 : toast.kind === "error" ? AlertCircle : Info;
  const s = STYLES[toast.kind];

  return (
    <div
      role={toast.kind === "error" ? "alert" : "status"}
      onMouseEnter={pause}
      onMouseLeave={start}
      onFocus={pause}
      onBlur={start}
      className={`animate-rise pointer-events-auto flex items-start gap-3 rounded-2xl border-l-[5px] ${s.border} bg-forest px-4 py-3 text-white shadow-pop w-full md:w-[360px]`}
    >
      <Icon className={`mt-0.5 h-5 w-5 flex-none ${s.icon}`} aria-hidden="true" />
      <p className="flex-1 text-sm font-medium leading-snug">{toast.message}</p>
      <button
        type="button"
        onClick={() => onClose(toast.id)}
        aria-label="Dismiss notification"
        className="-mr-1 -mt-1 grid h-8 w-8 flex-none place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(1);

  const close = useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const push = useCallback((kind: ToastKind, message: string) => {
    const id = nextId.current++;
    setToasts((list) => [...list.slice(-(MAX_VISIBLE - 1)), { id, kind, message }]);
  }, []);

  const api = useMemo<ToastApi>(
    () => ({
      success: (m) => push("success", m),
      error: (m) => push("error", m),
      info: (m) => push("info", m),
    }),
    [push]
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      {/* Bottom-center above the mobile nav, bottom-right on desktop */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-3 bottom-20 z-[300] flex flex-col items-center gap-2 md:inset-x-auto md:bottom-6 md:right-6 md:items-end"
      >
        {toasts.map((t) => (
          <ToastCard key={t.id} toast={t} onClose={close} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
