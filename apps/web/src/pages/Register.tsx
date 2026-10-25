
// src/pages/Register.tsx
import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { apiRequest } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import AuthShell from "../components/AuthShell";
import {
  Field,
  TextInput,
  RolePicker,
  PasswordHint,
  Spinner,
} from "../components/FormControls";

const PHONE_RE = /^\d{10}$/;
const MIN_PASSWORD = 8;

type FieldErrors = { name?: string; phone?: string; password?: string };

export default function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    if (error) bannerRef.current?.focus();
  }, [error]);

  const clearFieldError = (key: keyof FieldErrors) => {
    if (fieldErrors[key]) setFieldErrors((f) => ({ ...f, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanName = name.trim();
    const cleanPhone = phone.trim();

    const errs: FieldErrors = {};
    if (!cleanName) errs.name = "Enter your full name.";
    if (!PHONE_RE.test(cleanPhone))
      errs.phone = "Enter a 10-digit mobile number.";
    if (password.length < MIN_PASSWORD)
      errs.password = `Password must be at least ${MIN_PASSWORD} characters.`;

    setFieldErrors(errs);
    const firstInvalid = errs.name
      ? "name"
      : errs.phone
      ? "reg-phone"
      : errs.password
      ? "reg-password"
      : null;
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setLoading(true);
    try {
      await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: cleanName,
          phone: cleanPhone,
          password,
          role,
        }),
      });
      await login(cleanPhone, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create account"
      subtitle="Choose your role to get started."
      footer={
        <>
          Already have an account?{" "}
          <Link
            to="/login"
            className="rounded-sm font-bold text-leaf2 hover:underline"
          >
            Sign in
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
        <Field label="Full Name" htmlFor="name" error={fieldErrors.name}>
          <TextInput
            id="name"
            type="text"
            autoComplete="name"
            autoCapitalize="words"
            placeholder="e.g. Ravi Kumar"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearFieldError("name");
            }}
            required
            disabled={loading}
            error={fieldErrors.name}
          />
        </Field>

        <Field
          label="Mobile Number"
          htmlFor="reg-phone"
          error={fieldErrors.phone}
        >
          <TextInput
            id="reg-phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="10-digit number"
            value={phone}
            maxLength={10}
            onChange={(e) => {
              setPhone(e.target.value);
              clearFieldError("phone");
            }}
            required
            disabled={loading}
            error={fieldErrors.phone}
          />
        </Field>

        <Field
          label="Password"
          htmlFor="reg-password"
          error={fieldErrors.password}
        >
          <TextInput
            id="reg-password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              clearFieldError("password");
            }}
            required
            showPasswordToggle
            disabled={loading}
            error={fieldErrors.password}
            aria-describedby="reg-password-hint"
          />
          <PasswordHint id="reg-password-hint" password={password} />
        </Field>

        {/* Admin is intentionally not offered on public sign-up */}
        <RolePicker value={role} onChange={setRole} disabled={loading} />

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
              Creating account...
            </>
          ) : (
            <>
              <UserPlus size={18} aria-hidden="true" />
              Create Account
            </>
          )}
        </button>
      </form>
    </AuthShell>
  );
}