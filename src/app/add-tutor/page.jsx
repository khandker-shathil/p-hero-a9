import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { GraduationCap } from "lucide-react";
import AddTutorForm from "../components/ui/addtutorform";

export const metadata = { title: "Add tutor" };

export default async function AddTutorPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  return <main className="flex flex-1 bg-[#F6F5F1] px-4 py-10 sm:px-6"><section className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10"><div className="flex items-center gap-3 text-[#131F38]"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#131F38] text-white"><GraduationCap size={21} /></span><div><p className="text-sm font-medium text-slate-500">Create a tutor listing</p><h1 className="text-3xl" style={{ fontFamily: "var(--font-fraunces, serif)" }}>Add a tutor</h1></div></div><p className="mt-6 border-y border-slate-100 py-4 text-sm text-slate-600">You are creating this listing as <span className="font-medium text-slate-800">{session.user.name}</span>. You can edit or delete it later from My Tutors.</p><div className="mt-7"><AddTutorForm /></div></section></main>;
}
