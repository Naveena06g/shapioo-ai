
import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import AuthShell from "../components/AuthShell";
import { Field, TextInput, Spinner } from "../components/FormControls";

const PHONE_RE = /^\d{10}$/;

type FieldErrors = { phone?: string; password?: string };

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Move focus to the server error so screen-reader users hear it
  useEffect(() => {
    if (error) bannerRef.current?.focus();
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const errs: FieldErrors = {};
    if (!PHONE_RE.test(phone.trim())) {
      errs.phone = "Enter your 10-digit mobile number.";
    }
    if (!password) {
      errs.password = "Enter your password.";
    }
    setFieldErrors(errs);
    if (errs.phone || errs.password) {
      document.getElementById(errs.phone ? "phone" : "password")?.focus();
      return;
    }

    setLoading(true);
    try {
      await login(phone.trim(), password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to access your dashboard."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="rounded-sm font-bold text-leaf2 hover:underline"
          >
            Create one
          </Link>
        </>
      }
    >
      {error && (
        <div
          ref={bannerRef}
          tabIndex={-1}
          role="alert"
          className="alert-error mb-5 motion-safe:animate-shake"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Field label="Mobile Number" htmlFor="phone" error={fieldErrors.phone}>
          <TextInput
            id="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="10-digit number"
            value={phone}
            maxLength={10}
            onChange={(e) => {
              setPhone(e.target.value);
              if (fieldErrors.phone)
                setFieldErrors((f) => ({ ...f, phone: undefined }));
            }}
            required
            disabled={loading}
            error={fieldErrors.phone}
          />
        </Field>

        <Field label="Password" htmlFor="password" error={fieldErrors.password}>
          <TextInput
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (fieldErrors.password)
                setFieldErrors((f) => ({ ...f, password: undefined }));
            }}
            required
            showPasswordToggle
            disabled={loading}
            error={fieldErrors.password}
          />
        </Field>

        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
        //   className="btn-s mt-2 inline-flex w-full items-center justify-center gap-2"
        className="btn btn-s mt-2 w-full"
        >
          {loading ? (
            <>
              <Spinner />
              Signing in...
            </>
          ) : (
            <>
              <LogIn size={18} aria-hidden="true" />
              Sign In
            </>
          )}
        </button>
      </form>
    </AuthShell>
  );
}