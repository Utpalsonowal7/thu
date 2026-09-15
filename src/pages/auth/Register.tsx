
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { BsGithub, BsGoogle } from "react-icons/bs";

import ThemeToggle from "@/components/ThemeToggle";
import {
    sendRegisterOtp,
    verifyRegisterOtp,
    registerUser,
} from "@/services/auth";

type RegisterStep = "email" | "otp" | "details";

function Register() {
//     const navigate = useNavigate();

    const [step, setStep] = useState<RegisterStep>("email");

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    const [form, setForm] = useState({
        name: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const getErrorMessage = (error: unknown) => {
        const axiosError = error as AxiosError<{
            message?: string;
            detail?: string;
        }>;

        return (
            axiosError.response?.data?.message ??
            axiosError.response?.data?.detail ??
            "Something went wrong"
        );
    };

    const handleEmailSubmit = async (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();

        if (loading) return;

        setErr(null);
        setLoading(true);

        try {
            await sendRegisterOtp(email);

            setStep("otp");
        } catch (error) {
            setErr(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();

        if (loading) return;

        setErr(null);
        setLoading(true);

        try {
            await verifyRegisterOtp(email, otp);

            setStep("details");
        } catch (error) {
            setErr(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    const handleDetailsSubmit = async (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();

        if (loading) return;

        setErr(null);

        if (form.password !== form.confirmPassword) {
            setErr("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            await registerUser({
                email,
                name: form.name,
                password: form.password,
            });

            window.location.href = "/dashboard";
        } catch (error) {
            setErr(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleBack = () => {
        setErr(null);

        if (step === "otp") {
            setStep("email");
            return;
        }

        if (step === "details") {
            setStep("otp");
        }
    };

     const handleGoogleLogIn = () => {
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
     };
     const handleGithubLogIn = () => {
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`;
     };
    return (
         <main className="min-h-screen bg-background text-foreground">
              <div className="grid min-h-screen lg:grid-cols-2">
                   <section className="hidden lg:flex relative flex-col justify-between overflow-hidden bg-card border-r border-border p-10">
                        <div className="relative z-10">
                             <Link
                                  to="/"
                                  className="text-xl font-bold tracking-tight"
                             >
                                  Study Buddy
                             </Link>
                        </div>

                        <div className="relative z-10 max-w-lg">
                             <div className="mb-6 inline-flex rounded-full bg-brand/10 px-4 py-2 text-sm font-medium text-brand">
                                  Study smarter
                             </div>

                             <h1 className="text-5xl font-bold leading-tight tracking-tight">
                                  Build better
                                  <br />
                                  study habits.
                             </h1>

                             <p className="mt-6 max-w-md text-lg leading-8 text-muted">
                                  Organize your studies, stay focused, and keep
                                  track of your progress with Study Buddy.
                             </p>
                        </div>

                        <div className="relative z-10 text-sm text-muted">
                             © {new Date().getFullYear()} Study Buddy
                        </div>

                        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
                        <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-brand/5 blur-3xl" />
                   </section>

                   <section className="relative flex min-h-screen items-center justify-center px-6 py-10 sm:px-10">
                        <div className="absolute right-6 top-6">
                             <ThemeToggle />
                        </div>

                        <div className="w-full max-w-md">
                             {/* Mobile logo */}
                             <div className="mb-10 lg:hidden">
                                  <Link
                                       to="/"
                                       className="text-xl font-bold tracking-tight"
                                  >
                                       Study Buddy
                                  </Link>
                             </div>

                             <div className="mb-8">
                                  <p className="mb-2 text-sm font-medium text-brand">
                                       {step === "email" &&
                                            "Create your account"}
                                       {step === "otp" && "Verify your email"}
                                       {step === "details" && "Almost there"}
                                  </p>

                                  <h2 className="text-3xl font-bold tracking-tight">
                                       {step === "email" && "Get started"}
                                       {step === "otp" && "Check your inbox"}
                                       {step === "details" &&
                                            "Complete your profile"}
                                  </h2>

                                  <p className="mt-2 text-sm text-muted">
                                       {step === "email" &&
                                            "Enter your email to create your Study Buddy account."}

                                       {step === "otp" &&
                                            `We sent a verification code to ${email}.`}

                                       {step === "details" &&
                                            "Add your name and create a password."}
                                  </p>
                             </div>

                             <div className="mb-8 flex items-center gap-2">
                                  <div
                                       className={`h-1.5 flex-1 rounded-full ${
                                            step === "email" ||
                                            step === "otp" ||
                                            step === "details"
                                                 ? "bg-brand"
                                                 : "bg-border"
                                       }`}
                                  />

                                  <div
                                       className={`h-1.5 flex-1 rounded-full ${
                                            step === "otp" || step === "details"
                                                 ? "bg-brand"
                                                 : "bg-border"
                                       }`}
                                  />

                                  <div
                                       className={`h-1.5 flex-1 rounded-full ${
                                            step === "details"
                                                 ? "bg-brand"
                                                 : "bg-border"
                                       }`}
                                  />
                             </div>

                             {err && (
                                  <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                                       {err}
                                  </div>
                             )}

                             {/* STEP 1: EMAIL */}
                             {step === "email" && (
                                  <form
                                       onSubmit={handleEmailSubmit}
                                       className="space-y-5"
                                  >
                                       <div>
                                            <label
                                                 htmlFor="email"
                                                 className="mb-2 block text-sm font-medium"
                                            >
                                                 Email
                                            </label>

                                            <input
                                                 id="email"
                                                 name="email"
                                                 type="email"
                                                 value={email}
                                                 onChange={(e) =>
                                                      setEmail(e.target.value)
                                                 }
                                                 placeholder="you@example.com"
                                                 autoComplete="email"
                                                 required
                                                 disabled={loading}
                                                 className="h-12 w-full rounded-lg border border-input-border bg-input px-4 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:cursor-not-allowed disabled:opacity-60"
                                            />
                                       </div>

                                       <button
                                            type="submit"
                                            disabled={loading}
                                            className="h-12 w-full rounded-lg bg-brand font-medium text-primary-foreground transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60"
                                       >
                                            {loading
                                                 ? "Sending code..."
                                                 : "Continue"}
                                       </button>
                                  </form>
                             )}

                             {step === "otp" && (
                                  <form
                                       onSubmit={handleOtpSubmit}
                                       className="space-y-5"
                                  >
                                       <div>
                                            <label
                                                 htmlFor="otp"
                                                 className="mb-2 block text-sm font-medium"
                                            >
                                                 Verification code
                                            </label>

                                            <input
                                                 id="otp"
                                                 name="otp"
                                                 type="text"
                                                 inputMode="numeric"
                                                 maxLength={6}
                                                 value={otp}
                                                 onChange={(e) =>
                                                      setOtp(
                                                           e.target.value
                                                                .replace(
                                                                     /\D/g,
                                                                     "",
                                                                )
                                                                .slice(0, 6),
                                                      )
                                                 }
                                                 placeholder="Enter 6-digit code"
                                                 autoComplete="one-time-code"
                                                 required
                                                 disabled={loading}
                                                 className="h-12 w-full rounded-lg border border-input-border bg-input px-4 text-center text-lg font-semibold tracking-[0.4em] outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:cursor-not-allowed disabled:opacity-60"
                                            />
                                       </div>

                                       <button
                                            type="submit"
                                            disabled={
                                                 loading || otp.length !== 6
                                            }
                                            className="h-12 w-full rounded-lg bg-brand font-medium text-primary-foreground transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60"
                                       >
                                            {loading
                                                 ? "Verifying..."
                                                 : "Verify email"}
                                       </button>

                                       <button
                                            type="button"
                                            onClick={handleBack}
                                            disabled={loading}
                                            className="w-full text-sm text-muted transition hover:text-foreground"
                                       >
                                            ← Change email
                                       </button>
                                  </form>
                             )}

                             {step === "details" && (
                                  <form
                                       onSubmit={handleDetailsSubmit}
                                       className="space-y-5"
                                  >
                                       <div>
                                            <label
                                                 htmlFor="name"
                                                 className="mb-2 block text-sm font-medium"
                                            >
                                                 Name
                                            </label>

                                            <input
                                                 id="name"
                                                 name="name"
                                                 type="text"
                                                 value={form.name}
                                                 onChange={handleChange}
                                                 placeholder="Your name"
                                                 autoComplete="name"
                                                 required
                                                 disabled={loading}
                                                 className="h-12 w-full rounded-lg border border-input-border bg-input px-4 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:cursor-not-allowed disabled:opacity-60"
                                            />
                                       </div>

                                       <div>
                                            <label
                                                 htmlFor="password"
                                                 className="mb-2 block text-sm font-medium"
                                            >
                                                 Password
                                            </label>

                                            <input
                                                 id="password"
                                                 name="password"
                                                 type="password"
                                                 value={form.password}
                                                 onChange={handleChange}
                                                 placeholder="Create a password"
                                                 autoComplete="new-password"
                                                 required
                                                 disabled={loading}
                                                 className="h-12 w-full rounded-lg border border-input-border bg-input px-4 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:cursor-not-allowed disabled:opacity-60"
                                            />
                                       </div>

                                       <div>
                                            <label
                                                 htmlFor="confirmPassword"
                                                 className="mb-2 block text-sm font-medium"
                                            >
                                                 Confirm password
                                            </label>

                                            <input
                                                 id="confirmPassword"
                                                 name="confirmPassword"
                                                 type="password"
                                                 value={form.confirmPassword}
                                                 onChange={handleChange}
                                                 placeholder="Repeat your password"
                                                 autoComplete="new-password"
                                                 required
                                                 disabled={loading}
                                                 className="h-12 w-full rounded-lg border border-input-border bg-input px-4 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:cursor-not-allowed disabled:opacity-60"
                                            />
                                       </div>

                                       <button
                                            type="submit"
                                            disabled={loading}
                                            className="h-12 w-full rounded-lg bg-brand font-medium text-primary-foreground transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60"
                                       >
                                            {loading
                                                 ? "Creating account..."
                                                 : "Create account"}
                                       </button>

                                       <button
                                            type="button"
                                            onClick={handleBack}
                                            disabled={loading}
                                            className="w-full text-sm text-muted transition hover:text-foreground"
                                       >
                                            ← Back to verification
                                       </button>
                                  </form>
                             )}

                             {step === "email" && (
                                  <>
                                       <div className="my-7 flex items-center gap-4">
                                            <div className="h-px flex-1 bg-border" />
                                            <span className="text-xs text-muted">
                                                 OR
                                            </span>
                                            <div className="h-px flex-1 bg-border" />
                                       </div>

                                       <div className="grid grid-cols-2 gap-3">
                                            <button
                                                 type="button"
                                                 className="flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-card text-sm font-medium transition hover:bg-border"
                                                 onClick={handleGoogleLogIn}
                                            >
                                                 <BsGoogle size={17} />
                                                 Google
                                            </button>

                                            <button
                                                 type="button"
                                                 className="flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-card text-sm font-medium transition hover:bg-border"
                                                 onClick={handleGithubLogIn}
                                            >
                                                 <BsGithub size={17} />
                                                 GitHub
                                            </button>
                                       </div>
                                  </>
                             )}

                             <p className="mt-8 text-center text-sm text-muted">
                                  Already have an account?{" "}
                                  <Link
                                       to="/login"
                                       className="font-medium text-brand hover:text-brand-hover"
                                  >
                                       Sign in
                                  </Link>
                             </p>
                        </div>
                   </section>
              </div>
         </main>
    );
}

export default Register;

