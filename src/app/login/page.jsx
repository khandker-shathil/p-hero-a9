"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, GraduationCap, LockKeyhole, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function GoogleIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5"><path fill="#4285F4" d="M21.35 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.51h3.23c1.89-1.74 2.82-4.31 2.82-7.28Z" /><path fill="#34A853" d="M12 21.75c2.63 0 4.84-.87 6.45-2.36L15.22 17c-.9.6-2.05.96-3.22.96-2.54 0-4.7-1.72-5.47-4.02H3.2v2.59A9.75 9.75 0 0 0 12 21.75Z" /><path fill="#FBBC05" d="M6.53 13.94A5.86 5.86 0 0 1 6.22 12c0-.67.11-1.32.31-1.94V7.47H3.2A9.75 9.75 0 0 0 2.25 12c0 1.63.39 3.17.95 4.53l3.33-2.59Z" /><path fill="#EA4335" d="M12 6.04c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.13 14.62 2.25 12 2.25a9.75 9.75 0 0 0-8.8 5.22l3.33 2.59C7.3 7.76 9.46 6.04 12 6.04Z" /></svg>;
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const errorCode = searchParams.get("error");
    if (errorCode) {
      toast.error(errorCode);
      router.replace("/login");
    }
  }, [searchParams, router]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setLoading(true);
    const { error } = await authClient.signIn.email({ email: formData.get("email"), password: formData.get("password") });
    setLoading(false);
    if (error) return toast.error(error.message || "Invalid login credentials");
    toast.success("Welcome back!");
    router.push("/");
    router.refresh();
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    await authClient.signIn.social({ provider: "google", callbackURL: "/", errorCallbackURL: "/login" });
  };

  return (
    <main className="flex flex-1 items-center bg-[#F6F5F1] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 lg:grid-cols-[.9fr_1.1fr]">
        <aside className="hidden bg-[#131F38] p-10 text-[#FBFAF7] lg:flex lg:flex-col lg:justify-between">
          <div><div className="flex items-center gap-2 text-lg" style={{ fontFamily: "var(--font-fraunces, serif)" }}><GraduationCap size={22} /> MediQueue</div><p className="mt-20 text-sm font-medium uppercase tracking-[0.18em] text-[#C7CBD6]">Welcome back</p><h1 className="mt-4 text-4xl leading-tight" style={{ fontFamily: "var(--font-fraunces, serif)" }}>Make progress, one session at a time.</h1><p className="mt-5 max-w-sm leading-relaxed text-[#C7CBD6]">Your next learning milestone is waiting.</p></div>
          <p className="text-sm text-[#C7CBD6]">Learn on your schedule.</p>
        </aside>
        <section className="p-6 sm:p-10 lg:p-12"><div className="mx-auto max-w-sm">
          <Link href="/" className="inline-flex items-center gap-2 text-[#131F38] lg:hidden" style={{ fontFamily: "var(--font-fraunces, serif)" }}><GraduationCap size={22} /> MediQueue</Link>
          <h1 className="mt-8 text-3xl text-[#131F38]" style={{ fontFamily: "var(--font-fraunces, serif)" }}>Sign in</h1><p className="mt-2 text-sm text-slate-600">Welcome back — continue where you left off.</p>
          <form className="mt-8 space-y-5" onSubmit={onSubmit}>
            <label className="block text-sm font-medium text-slate-700">Email address<span className="relative mt-1.5 block"><Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input required name="email" type="email" autoComplete="email" placeholder="you@example.com" className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#131F38] focus:ring-2 focus:ring-[#131F38]/15" /></span></label>
            <label className="block text-sm font-medium text-slate-700">Password<span className="relative mt-1.5 block"><LockKeyhole className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input required name="password" type="password" minLength={8} autoComplete="current-password" placeholder="Enter your password" className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#131F38] focus:ring-2 focus:ring-[#131F38]/15" /></span></label>
            <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#131F38] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#1e3056] disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Signing in…" : <>Sign in <ArrowRight size={17} /></>}</button>
          </form>
          <div className="my-6 flex items-center gap-3"><div className="h-px flex-1 bg-slate-200" /><span className="text-xs text-slate-500">OR</span><div className="h-px flex-1 bg-slate-200" /></div>
          <button type="button" onClick={handleGoogleSignIn} disabled={googleLoading} className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"><GoogleIcon /> {googleLoading ? "Redirecting…" : "Continue with Google"}</button>
          <p className="mt-7 text-center text-sm text-slate-600">New to MediQueue? <Link href="/register" className="font-medium text-[#131F38] underline underline-offset-4 hover:text-[#3F6E52]">Create an account</Link></p>
        </div></section>
      </div>
    </main>
  );
}
