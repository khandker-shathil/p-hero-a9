import getSession from "@/lib/session";
import Link from "next/link";
import { GraduationCap, Menu, X } from "lucide-react";
import UserMenu from "./ui/usermenu";

const baseLinks = [
  { href: "/", label: "Home" },
  { href: "/tutors", label: "Tutors" },
];

function NavigationLinks({ user, mobile = false }) {
  const links = user
    ? [...baseLinks, { href: "/profile", label: "Profile" }]
    : baseLinks;

  return links.map(({ href, label }) => (
    <li key={href}>
      <Link
        href={href}
        className={
          mobile
            ? "block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#131F38]"
            : "rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-[#131F38]"
        }
      >
        {label}
      </Link>
    </li>
 ));
}

export default async function NavBar() {
  const session = await getSession();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center gap-2 text-[#131F38]" aria-label="MediQueue home">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#131F38] text-white">
            <GraduationCap size={19} aria-hidden="true" />
          </span>
          <span className="text-xl leading-none" style={{ fontFamily: "var(--font-fraunces, serif)" }}>
            MediQueue
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          <NavigationLinks user={user} />
        </ul>

        <div className="hidden items-center gap-1 md:flex">
          {user ? (
            <UserMenu user={user} />
          ) : (
            <>
              <Link href="/login" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-[#131F38]">
                Log in
              </Link>
              <Link href="/register" className="rounded-lg bg-[#131F38] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1e3056]">
                Get started
              </Link>
            </>
          )}
        </div>

        <details className="relative md:hidden">
          <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 [&::-webkit-details-marker]:hidden">
            <Menu className="details-open:hidden" size={22} aria-hidden="true" />
            <X className="hidden details-open:block" size={22} aria-hidden="true" />
            <span className="sr-only">Toggle navigation menu</span>
          </summary>
          <div className="absolute right-0 top-12 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
            <ul className="space-y-1">
              <NavigationLinks user={user} mobile />
            </ul>
            <div className="mt-2 border-t border-slate-100 p-2">
              {user ? (
                <UserMenu user={user} />
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/login" className="rounded-lg border border-slate-200 px-3 py-2 text-center text-sm font-medium text-slate-700 hover:bg-slate-50">
                    Log in
                  </Link>
                  <Link href="/register" className="rounded-lg bg-[#131F38] px-3 py-2 text-center text-sm font-medium text-white hover:bg-[#1e3056]">
                    Get started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </details>
      </nav>
    </header>
  );
}
