import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AlertTriangle } from "lucide-react";

export interface ConfirmOptions {
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** "danger" uses the red button (deletes, cancellations) */
  tone?: "danger" | "default";
}

type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmFn | null>(null);

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [opts, setOpts] = useState<ConfirmOptions | null>(null);
  const resolver = useRef<((v: boolean) => void) | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descId = useId();

  const confirm = useCallback<ConfirmFn>((options) => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setOpts(options);
    return new Promise<boolean>((resolve) => {
      resolver.current = resolve;
    });
  }, []);

  const close = useCallback((result: boolean) => {
    resolver.current?.(result);
    resolver.current = null;
    setOpts(null);
    // Return focus to whatever opened the dialog
    setTimeout(() => lastFocus.current?.focus?.(), 0);
  }, []);

  // Focus the safe option, lock scroll, trap Tab, close on Escape
  useEffect(() => {
    if (!opts) return;
    cancelRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close(false);
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [opts, close]);

  const value = useMemo(() => confirm, [confirm]);
  const danger = opts?.tone === "danger";

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      {opts && (
        <div
          className="fixed inset-0 z-[200] grid place-items-center bg-[rgba(15,30,20,.55)] p-4 animate-rise"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close(false);
          }}
        >
          <div
            ref={dialogRef}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={opts.message ? descId : undefined}
            className="w-full max-w-md rounded-modal bg-paper p-6 shadow-pop"
          >
            <div className="flex items-start gap-4">
              <div
                className={`grid h-11 w-11 flex-none place-items-center rounded-full ${
                  danger ? "bg-[#fbdcd5] text-[#9b2c19]" : "bg-sage text-leaf2"
                }`}
              >
                <AlertTriangle className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h2 id={titleId} className="font-display text-xl text-forest">
                  {opts.title}
                </h2>
                {opts.message && (
                  <p id={descId} className="mt-1 text-sm text-mute">
                    {opts.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                ref={cancelRef}
                type="button"
                className="btn btn-l"
                onClick={() => close(false)}
              >
                {opts.cancelLabel ?? "Cancel"}
              </button>
              <button
                type="button"
                className={`btn ${danger ? "btn-r" : "btn-d"}`}
                onClick={() => close(true)}
              >
                {opts.confirmLabel ?? "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

/** Usage: const confirm = useConfirm(); if (await confirm({ title: "Remove product?", tone: "danger" })) {...} */
export function useConfirm(): ConfirmFn {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm must be used inside <ConfirmProvider>");
  return ctx;
}
