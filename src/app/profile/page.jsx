import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { CalendarDays, GraduationCap, Mail, ShieldCheck } from "lucide-react";
import { EditUserModal } from "../components/ui/edituserinfo";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const { user } = session;
  const joinedDate = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date(user.createdAt));
  const initial = user.name?.trim().charAt(0).toUpperCase() || "M";

  return (
    <main className="flex flex-1 bg-[#F6F5F1] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-7 flex items-center gap-3 text-[#131F38]">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#131F38] text-white"><GraduationCap size={22} /></span>
          <div><p className="text-sm font-medium text-slate-500">Account settings</p><h1 className="text-3xl" style={{ fontFamily: "var(--font-fraunces, serif)" }}>Your profile</h1></div>
        </div>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="h-28 bg-[#131F38] sm:h-36" />
          <div className="relative px-6 pb-7 sm:px-10">
            <div className="absolute -top-14 flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-[#3F6E52] text-4xl text-white shadow-sm">
              {user.image ? <Image src={user.image} alt={`${user.name}'s profile photo`} width={112} height={112} className="h-full w-full object-cover" priority /> : initial}
            </div>
            <div className="flex flex-col gap-5 pt-20 sm:flex-row sm:items-start sm:justify-between sm:pt-7">
              <div><h2 className="text-2xl text-[#131F38]" style={{ fontFamily: "var(--font-fraunces, serif)" }}>{user.name}</h2><p className="mt-1 text-sm text-slate-600">Manage your MediQueue account details.</p></div>
              <EditUserModal user={user} />
            </div>
            <dl className="mt-8 grid gap-3 border-t border-slate-100 pt-6 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4"><Mail size={19} className="shrink-0 text-[#3F6E52]" /><div><dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Email address</dt><dd className="mt-1 break-all text-sm font-medium text-slate-800">{user.email}</dd></div></div>
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4"><CalendarDays size={19} className="shrink-0 text-[#3F6E52]" /><div><dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Member since</dt><dd className="mt-1 text-sm font-medium text-slate-800">{joinedDate}</dd></div></div>
            </dl>
          </div>
        </section>
        <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-slate-500"><ShieldCheck size={15} className="text-[#3F6E52]" /> Your account information is securely managed by MediQueue.</p>
      </div>
    </main>
  );
}
