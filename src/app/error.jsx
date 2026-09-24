"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => { console.error(error); }, [error]);

  return <main className="flex flex-1 items-center justify-center bg-[#F6F5F1] px-4 py-16"><section className="max-w-md text-center"><span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600"><AlertTriangle size={30} /></span><h1 className="mt-6 text-3xl text-[#131F38]" style={{ fontFamily: "var(--font-fraunces, serif)" }}>Something went wrong.</h1><p className="mt-3 text-sm leading-relaxed text-slate-600">We could not load this page. Please try again.</p><button onClick={reset} className="mt-7 rounded-lg bg-[#131F38] px-5 py-3 text-sm font-medium text-white hover:bg-[#1e3056]">Try again</button></section></main>;
}
