import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return <main className="flex flex-1 items-center justify-center bg-[#F6F5F1] px-4 py-16"><section className="max-w-md text-center"><span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF3ED] text-[#3F6E52]"><SearchX size={30} /></span><p className="mt-6 text-sm font-medium uppercase tracking-[0.18em] text-[#3F6E52]">404 error</p><h1 className="mt-3 text-4xl text-[#131F38]" style={{ fontFamily: "var(--font-fraunces, serif)" }}>That page is unavailable.</h1><p className="mt-4 text-sm leading-relaxed text-slate-600">The page may have moved, the tutor listing may no longer exist, or the link may be incorrect.</p><Link href="/" className="mt-7 inline-flex rounded-lg bg-[#131F38] px-5 py-3 text-sm font-medium text-white hover:bg-[#1e3056]">Return home</Link></section></main>;
}
