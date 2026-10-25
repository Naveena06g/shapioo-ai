// // import { useState } from "react";
// // import { useNavigate, Link } from "react-router-dom";
// // import { apiRequest } from "../lib/api";
// // import { useAuth } from "../context/AuthContext";

// // export default function Register() {
// //   const [name, setName] = useState("");
// //   const [phone, setPhone] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [role, setRole] = useState("customer");
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();
// //   const { login } = useAuth();

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError("");
// //     try {
// //       await apiRequest("/auth/register", {
// //         method: "POST",
// //         body: JSON.stringify({ name, phone, password, role }),
// //       });
// //       // Auto-login after registration
// //       await login(phone, password);
// //       navigate("/dashboard"); 
// //     } catch (err: any) {
// //       setError(err.message);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen grid md:grid-cols-2">
// //       <div className="bg-forest p-12 text-white hidden md:flex flex-col justify-center">
// //         <h1 className="text-5xl mb-6">Join <span className="text-saffron">SHAPIOO</span></h1>
// //         <p className="text-lg text-sage mb-8 max-w-md">
// //           Create an account to buy, sell, or grow your business with AI.
// //         </p>
// //       </div>

// //       <div className="flex items-center justify-center p-8 bg-cream">
// //         <div className="w-full max-w-md">
// //           <h2 className="text-3xl font-bold mb-2">Create Account</h2>
// //           <p className="text-mute mb-8">Choose your role to get started.</p>

// //           {error && <div className="bg-red-50 text-tomato p-3 rounded-lg mb-4 text-sm">{error}</div>}

// //           <form onSubmit={handleSubmit} className="space-y-4">
// //             <div>
// //               <label className="block text-sm font-bold mb-1">Full Name</label>
// //               <input
// //                 type="text"
// //                 className="input-field"
// //                 value={name}
// //                 onChange={(e) => setName(e.target.value)}
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-bold mb-1">Mobile Number</label>
// //               <input
// //                 type="tel"
// //                 className="input-field"
// //                 value={phone}
// //                 onChange={(e) => setPhone(e.target.value)}
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-bold mb-1">Password</label>
// //               <input
// //                 type="password"
// //                 className="input-field"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-bold mb-1">I am a...</label>
// //               <select
// //                 className="input-field"
// //                 value={role}
// //                 onChange={(e) => setRole(e.target.value)}
// //               >
// //                 <option value="customer">Customer</option>
// //                 <option value="shop">Shopkeeper</option>
// //                 <option value="farmer">Farmer</option>
// //                 <option value="trader">Trader</option>
// //                 <option value="seeker">Job Seeker</option>
// //                 <option value="admin">Admin</option>
// //               </select>
// //             </div>
// //             <button
// //               type="submit"
// //               className="w-full bg-forest text-white py-3 rounded-xl font-bold hover:bg-leaf transition-colors mt-2"
// //             >
// //               Create Account
// //             </button>
// //           </form>

// //           <p className="text-center text-sm text-mute mt-6">
// //             Already have an account?{" "}
// //             <Link to="/login" className="text-leaf font-bold hover:underline">
// //               Sign in
// //             </Link>
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // src/pages/Register.tsx
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { UserPlus, ArrowRight } from "lucide-react";
// import { apiRequest } from "../lib/api";
// import { useAuth } from "../context/AuthContext";
// import AuthShell from "../components/AuthShell";
// import {
//   Field,
//   TextInput,
//   RolePicker,
//   PasswordHint,
// } from "../components/FormControls";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("customer");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       await apiRequest("/auth/register", {
//         method: "POST",
//         body: JSON.stringify({ name, phone, password, role }),
//       });
//       await login(phone, password);
//       navigate("/dashboard");
//     } catch (err: any) {
//       setError(err.message || "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthShell
//       title="Create account"
//       subtitle="Choose your role to get started."
//       footer={
//         <>
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="font-bold text-leaf2 hover:underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-saffron rounded-sm"
//           >
//             Sign in
//           </Link>
//         </>
//       }
//     >
//       {error && (
//         <div
//           className="mb-5 rounded-xl bg-[#fbdcd5] px-4 py-3 text-[0.8125rem] font-medium leading-snug text-[#9b2c19]"
//           role="alert"
//         >
//           {error}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <Field label="Full Name" htmlFor="name">
//           <TextInput
//             id="name"
//             type="text"
//             autoComplete="name"
//             placeholder="e.g. Ravi Kumar"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             disabled={loading}
//           />
//         </Field>

//         <Field label="Mobile Number" htmlFor="reg-phone">
//           <TextInput
//             id="reg-phone"
//             type="tel"
//             inputMode="numeric"
//             autoComplete="tel"
//             placeholder="10-digit number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             required
//             disabled={loading}
//           />
//         </Field>

//         <Field label="Password" htmlFor="reg-password">
//           <TextInput
//             id="reg-password"
//             type="password"
//             autoComplete="new-password"
//             placeholder="At least 8 characters"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             showPasswordToggle
//             disabled={loading}
//           />
//           <PasswordHint password={password} />
//         </Field>

//         <RolePicker value={role} onChange={setRole} error={undefined} />

//         <button
//           type="submit"
//           disabled={loading}
//           className="btn-s w-full mt-2 inline-flex items-center justify-center gap-2"
//         >
//           {loading ? (
//             <>
//               <svg
//                 className="h-4 w-4 animate-spin"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 aria-hidden="true"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 />
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//                 />
//               </svg>
//               Creating account...
//             </>
//           ) : (
//             <>
//               <UserPlus size={18} aria-hidden="true" />
//               Create Account
//             </>
//           )}
//         </button>
//       </form>

     
//     </AuthShell>
//   );
// }

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