import ThemeToggle from "@/components/ThemeToggle";
import { BsEye, BsEyeSlash, BsGithub, BsGoogle } from "react-icons/bs";
import React, { useState } from "react";

import type { login } from "@/types/auth";
import userlogin from "@/services/auth";
import { AxiosError } from "axios";


function Login() {
     
     const [form, setForm] = useState<login>({
          email: "",
          password: "",
     });
     const [loading, setLoading] = useState<boolean>(false);
     const [err, setErr] = useState<string | null>(null);
     const [showPass, setShowPass] = useState<boolean>(false);

     const handleChage = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { value, name } = e.target;

          setForm((pre) => ({
               ...pre,
               [name]: value,
          }));
     };

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          if (loading) return;

          setLoading(true);

          try {
               await userlogin(form);
               console.log("LOGIN SUCCESS:");
               window.location.href = "/dashboard";
          } catch (err) {
               const e = err as AxiosError<{ message?: string }>;
               setErr(e.response?.data?.message ?? "something went wrong");
          } finally {
               setLoading(false);
          }
     };

 const handleGoogleLogIn = () => {
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
 };

 const handleGithubLogIn = () => {
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`;
 };

     return (
          <div className="min-h-screen bg-background text-foreground">
               {" "}
               <div className="absolute right-6 top-6">
                    {" "}
                    <ThemeToggle />{" "}
               </div>{" "}
               <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
                    {" "}
                    <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:grid-cols-2">
                         {" "}
                         <div className="hidden bg-brand/10 p-10 md:flex md:flex-col md:justify-between">
                              {" "}
                              <div className="text-2xl font-bold">
                                   {" "}
                                   Study Buddy{" "}
                              </div>{" "}
                              <div>
                                   {" "}
                                   <h1 className="text-4xl font-bold leading-tight">
                                        {" "}
                                        Learn smarter. <br /> Study better.{" "}
                                   </h1>{" "}
                                   <p className="mt-4 max-w-md text-muted">
                                        {" "}
                                        Your personal study companion for
                                        learning, understanding, and staying on
                                        track.{" "}
                                   </p>{" "}
                              </div>{" "}
                              <p className="text-sm text-muted">
                                   {" "}
                                   © 2026 Study Buddy{" "}
                              </p>{" "}
                         </div>{" "}
                         <div className="p-8 sm:p-12">
                              {" "}
                              <div className="mx-auto max-w-md">
                                   {" "}
                                   <h2 className="text-3xl font-bold">
                                        {" "}
                                        Welcome back{" "}
                                   </h2>{" "}
                                   <p className="mt-2 text-sm text-muted">
                                        {" "}
                                        Sign in to your account to
                                        continue.{" "}
                                   </p>{" "}
                                   {err && (
                                        <div
                                             role="alert"
                                             className=" mt-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-500  "
                                        >
                                             {err}
                                        </div>
                                   )}
                                   <form
                                        className="mt-8 space-y-3"
                                        onSubmit={handleSubmit}
                                   >
                                        {" "}
                                        <div>
                                             {" "}
                                             <label
                                                  htmlFor="email"
                                                  className="mb-2 block text-sm font-medium"
                                             >
                                                  {" "}
                                                  Email{" "}
                                             </label>{" "}
                                             <input
                                                  id="email"
                                                  name="email"
                                                  type="email"
                                                  value={form.email}
                                                  onChange={handleChage}
                                                  placeholder="you@example.com"
                                                  className="w-full rounded-lg border border-input-border bg-input px-4 py-3 text-foreground outline-none transition placeholder:text-muted focus:border-brand"
                                             />{" "}
                                        </div>{" "}
                                        <div>
                                             {" "}
                                             <div className="mb-2 flex items-center justify-between">
                                                  {" "}
                                                  <label
                                                       htmlFor="password"
                                                       className="block text-sm font-medium"
                                                  >
                                                       {" "}
                                                       Password{" "}
                                                  </label>{" "}
                                                  <a
                                                       href="/forgot-password"
                                                       className="text-sm text-brand hover:text-brand-hover"
                                                  >
                                                       {" "}
                                                       Forgot password?{" "}
                                                  </a>{" "}
                                             </div>{" "}
                                             <div className="relative">
                                                  <input
                                                       id="password"
                                                       name="password"
                                                       type={
                                                            showPass
                                                                 ? "text"
                                                                 : "password"
                                                       }
                                                       value={form.password}
                                                       onChange={handleChage}
                                                       placeholder="••••••••"
                                                       required
                                                       autoComplete="current-password"
                                                       disabled={loading}
                                                       className="w-full rounded-lg border border-input-border bg-input px-4 py-3 pr-12 text-foreground outline-none transition placeholder:text-muted focus:border-brand disabled:cursor-not-allowed disabled:opacity-60"
                                                  />

                                                  <button
                                                       type="button"
                                                       aria-label={
                                                            showPass
                                                                 ? "Hide password"
                                                                 : "Show password"
                                                       }
                                                       onClick={() =>
                                                            setShowPass(
                                                                 (prev) =>
                                                                      !prev,
                                                            )
                                                       }
                                                       className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition hover:text-foreground"
                                                  >
                                                       {showPass ? (
                                                            <BsEyeSlash
                                                                 size={18}
                                                            />
                                                       ) : (
                                                            <BsEye size={18} />
                                                       )}
                                                  </button>
                                             </div>
                                        </div>{" "}
                                        <button
                                             type="submit"
                                             className="w-full rounded-lg bg-brand py-3 font-medium text-white transition hover:bg-brand-hover"
                                        >
                                             {" "}
                                             Sign in{" "}
                                        </button>{" "}
                                   </form>{" "}
                                   <div className="my-6 flex items-center gap-4">
                                        {" "}
                                        <div className="h-px flex-1 bg-border" />{" "}
                                        <span className="text-xs text-muted">
                                             {" "}
                                             OR{" "}
                                        </span>{" "}
                                        <div className="h-px flex-1 bg-border" />{" "}
                                   </div>{" "}
                                   <button
                                        type="button"
                                        className="flex w-full items-center justify-center gap-3 rounded-lg border border-border py-3 font-medium transition hover:bg-border"
                                        onClick={handleGoogleLogIn}
                                   >
                                        {" "}
                                        <BsGoogle /> Continue with Google{" "}
                                   </button>{" "}
                                   <button
                                        type="button"
                                        className="mt-3 flex w-full items-center justify-center gap-3 rounded-lg border border-border py-3 font-medium transition hover:bg-border"
                                        onClick={handleGithubLogIn}
                                   >
                                        {" "}
                                        <BsGithub /> Continue with GitHub{" "}
                                   </button>{" "}
                                   <p className="mt-8 text-center text-sm text-muted">
                                        {" "}
                                        Don't have an account?{" "}
                                        <a
                                             href="/register"
                                             className="font-medium text-brand hover:text-brand-hover"
                                        >
                                             {" "}
                                             Create one{" "}
                                        </a>{" "}
                                   </p>{" "}
                              </div>{" "}
                         </div>{" "}
                    </div>{" "}
               </div>{" "}
          </div>
     );
}
export default Login;
