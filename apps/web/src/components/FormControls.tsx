// src/components/FormControls.tsx
import {
  forwardRef,
  useId,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
} from "react";
import { Eye, EyeOff } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Field wrapper: label above, error below (linked via aria-describedby) */
/* ------------------------------------------------------------------ */
interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}

export function Field({ label, htmlFor, error, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="block text-[0.82rem] font-bold leading-[1.3] text-ink"
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${htmlFor}-error`}
          className="text-[0.78rem] font-medium leading-[1.3] text-tomato"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Spinner used inside loading buttons                                 */
/* ------------------------------------------------------------------ */
export function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Text input with optional password toggle                            */
/* ------------------------------------------------------------------ */
interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  showPasswordToggle?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      error,
      showPasswordToggle,
      type,
      id,
      className = "",
      "aria-describedby": describedByProp,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && visible ? "text" : type;
    const hasError = Boolean(error);

    const describedBy =
      [hasError && id ? `${id}-error` : null, describedByProp]
        .filter(Boolean)
        .join(" ") || undefined;

    return (
      <div className="relative">
        <input
          ref={ref}
          id={id}
          type={inputType}
          className={`input-field w-full ${
            isPassword && showPasswordToggle ? "pr-12" : ""
          } ${
            hasError
              ? "border-tomato focus:border-tomato focus:ring-tomato/[.12]"
              : ""
          } ${className}`}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          {...props}
        />
        {showPasswordToggle && isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute right-0.5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-mute transition-colors hover:text-ink"
            aria-label="Show password"
            aria-pressed={visible}
            disabled={props.disabled}
          >
            {visible ? (
              <EyeOff size={18} aria-hidden="true" />
            ) : (
              <Eye size={18} aria-hidden="true" />
            )}
          </button>
        )}
      </div>
    );
  }
);
TextInput.displayName = "TextInput";

/* ------------------------------------------------------------------ */
/* Select                                                              */
/* ------------------------------------------------------------------ */
interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
}

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  (
    {
      error,
      id,
      className = "",
      "aria-describedby": describedByProp,
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(error);
    const describedBy =
      [hasError && id ? `${id}-error` : null, describedByProp]
        .filter(Boolean)
        .join(" ") || undefined;

    return (
      <select
        ref={ref}
        id={id}
        className={`input-field w-full appearance-none bg-no-repeat bg-[right_1rem_center] pr-10 ${
          hasError
            ? "border-tomato focus:border-tomato focus:ring-tomato/[.12]"
            : ""
        } ${className}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23667064' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
        }}
        aria-invalid={hasError || undefined}
        aria-describedby={describedBy}
        {...props}
      />
    );
  }
);
SelectInput.displayName = "SelectInput";

/* ------------------------------------------------------------------ */
/* Role picker: visually-hidden radios keep keyboard access            */
/* ------------------------------------------------------------------ */
interface RolePickerProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

const roles = [
  { value: "customer", label: "Customer", desc: "Buy affordable food" },
  { value: "shop", label: "Shopkeeper", desc: "Run your storefront" },
  { value: "farmer", label: "Farmer", desc: "Sell directly to buyers" },
  { value: "trader", label: "Trader", desc: "Trade in bulk" },
  { value: "seeker", label: "Job Seeker", desc: "Find work nearby" },
  { value: "admin", label: "Admin", desc: "Manage the platform" },
] as const;

export function RolePicker({
  value,
  onChange,
  error,
  disabled,
}: RolePickerProps) {
  const groupId = useId();
  return (
    <fieldset className="space-y-2" disabled={disabled}>
      <legend className="block text-[0.82rem] font-bold leading-[1.3] text-ink">
        I am a...
      </legend>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {roles.map((role) => {
          const checked = value === role.value;
          const inputId = `${groupId}-${role.value}`;
          return (
            <div key={role.value} className="relative">
              <input
                type="radio"
                id={inputId}
                name={`${groupId}-role`}
                value={role.value}
                checked={checked}
                onChange={() => onChange(role.value)}
                className="peer sr-only"
              />
              <label
                htmlFor={inputId}
                className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border p-3 transition-all duration-200 peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-saffron peer-disabled:cursor-not-allowed peer-disabled:opacity-[.45] ${
                  checked
                    ? "border-leaf bg-sage ring-1 ring-leaf/30"
                    : "border-line bg-white hover:border-leaf/50 hover:bg-sage/30"
                }`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    checked ? "border-leaf bg-leaf" : "border-mute/40"
                  }`}
                  aria-hidden="true"
                >
                  {checked && (
                    <span className="block h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </span>
                <span className="flex flex-col">
                  <span
                    className={`text-sm font-bold leading-tight ${
                      checked ? "text-forest" : "text-ink"
                    }`}
                  >
                    {role.label}
                  </span>
                  {/* mute fails 4.5:1 on sage, so selected tiles use leaf2 */}
                  <span
                    className={`text-[0.72rem] leading-tight ${
                      checked ? "text-leaf2" : "text-mute"
                    }`}
                  >
                    {role.desc}
                  </span>
                </span>
              </label>
            </div>
          );
        })}
      </div>
      {error && (
        <p
          className="text-[0.78rem] font-medium leading-[1.3] text-tomato"
          role="alert"
        >
          {error}
        </p>
      )}
    </fieldset>
  );
}

/* ------------------------------------------------------------------ */
/* Password hint (announced politely, never colour-only)               */
/* ------------------------------------------------------------------ */
export function PasswordHint({
  password,
  id,
}: {
  password: string;
  id?: string;
}) {
  if (!password) return null;
  const strong = password.length >= 8;
  return (
    <p
      id={id}
      aria-live="polite"
      className={`text-[0.72rem] leading-tight ${
        strong ? "text-leaf2" : "text-mute"
      }`}
    >
      {strong ? "✓ Password looks good" : "Use at least 8 characters"}
    </p>
  );
}