// // import { useState } from "react";
// // import { useNavigate, Link } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";

// // export default function Login() {
// //   const [phone, setPhone] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");
// //   const { login } = useAuth();
// //   const navigate = useNavigate();

// //     const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError("");
// //     try {
// //       await login(phone, password);
// //       navigate("/dashboard"); // <-- Make sure this says /dashboard
// //     } catch (err: any) {
// //       setError(err.message);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen grid md:grid-cols-2">
// //       {/* Left Side - Branding (Hidden on mobile) */}
// //       <div className="bg-forest p-12 text-white hidden md:flex flex-col justify-center relative overflow-hidden">
// //         <div className="relative z-10">
// //           <h1 className="text-5xl mb-6">SHAPIOO <span className="text-saffron">AI</span></h1>
// //           <p className="text-lg text-sage mb-8 max-w-md">
// //             Better markets for farmers. Affordable food for every family. Employment for every community.
// //           </p>
// //           <ul className="space-y-4 text-sage">
// //             <li>🌾 Direct farmer-to-buyer marketplace</li>
// //             <li>🏪 Local multi-shop digital storefronts</li>
// //             <li>🎓 AI skills and youth employment</li>
// //           </ul>
// //         </div>
// //         {/* Decorative background element */}
// //         <div className="absolute -bottom-10 -right-10 text-[15rem] opacity-10 pointer-events-none">
// //           🌾
// //         </div>
// //       </div>

// //       {/* Right Side - Login Form */}
// //       <div className="flex items-center justify-center p-8 bg-cream">
// //         <div className="w-full max-w-md">
// //           <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
// //           <p className="text-mute mb-8">Sign in to access your dashboard.</p>

// //           {error && (
// //             <div className="bg-red-50 text-tomato p-3 rounded-lg mb-4 text-sm border border-red-100">
// //               {error}
// //             </div>
// //           )}

// //           <form onSubmit={handleSubmit} className="space-y-4">
// //             <div>
// //               <label className="block text-sm font-bold mb-1">Mobile Number</label>
// //               <input
// //                 type="tel"
// //                 className="input-field"
// //                 placeholder="10-digit number"
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
// //                 placeholder="••••••••"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 required
// //               />
// //             </div>
// //             <button
// //               type="submit"
// //               className="w-full bg-forest text-white py-3 rounded-xl font-bold hover:bg-leaf transition-colors mt-2"
// //             >
// //               Sign In
// //             </button>
// //           </form>

// //           <p className="text-center text-sm text-mute mt-6">
// //             Don't have an account?{" "}
// //             <Link to="/register" className="text-leaf font-bold hover:underline">
// //               Create one
// //             </Link>
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // src/pages/Login.tsx
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { LogIn, ArrowRight } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import AuthShell from "../components/AuthShell";
// import { Field, TextInput } from "../components/FormControls";

// export default function Login() {
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
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
//       title="Welcome back"
//       subtitle="Sign in to access your dashboard."
//       footer={
//         <>
//           Don&apos;t have an account?{" "}
//           <Link
//             to="/register"
//             className="font-bold text-leaf2 hover:underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-saffron rounded-sm"
//           >
//             Create one
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
//         <Field label="Mobile Number" htmlFor="phone" error={error ? "" : undefined}>
//           <TextInput
//             id="phone"
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

//         <Field label="Password" htmlFor="password">
//           <TextInput
//             id="password"
//             type="password"
//             autoComplete="current-password"
//             placeholder="••••••••"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             showPasswordToggle
//             disabled={loading}
//           />
//         </Field>

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
//               Signing in...
//             </>
//           ) : (
//             <>
//               <LogIn size={18} aria-hidden="true" />
//               Sign In
//             </>
//           )}
//         </button>
//       </form>

      
//     </AuthShell>
//   );
// }

// src/pages/Login.tsx
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