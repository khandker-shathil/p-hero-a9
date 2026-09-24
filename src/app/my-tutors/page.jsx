import { auth } from "@/lib/auth";
import { getTutorsByOwner } from "@/lib/managed-tutors";
import { headers } from "next/headers";
import Link from "next/link";
import { Plus, UsersRound } from "lucide-react";
import { redirect } from "next/navigation";
import MyTutorsTable from "../components/ui/mytutorstable";

export const metadata = { title: "My tutors" };

export default async function MyTutorsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const tutors = await getTutorsByOwner(session.user.id);
  const safeTutors = tutors.map((tutor) => ({ ...tutor, id: tutor._id.toString(), sessionStartDate: tutor.sessionStartDate?.toISOString() }));

  return <main className="flex flex-1 bg-[#F6F5F1] px-4 py-10 sm:px-6"><div className="mx-auto w-full max-w-6xl"><div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div className="flex items-center gap-3 text-[#131F38]"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#131F38] text-white"><UsersRound size={21} /></span><div><p className="text-sm font-medium text-slate-500">Tutor management</p><h1 className="text-3xl" style={{ fontFamily: "var(--font-fraunces, serif)" }}>My tutors</h1></div></div><Link href="/add-tutor" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#131F38] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#1e3056]"><Plus size={17} /> Add tutor</Link></div><p className="mt-4 text-sm text-slate-600">Only listings created by you appear here.</p><div className="mt-7"><MyTutorsTable initialTutors={safeTutors} /></div></div></main>;
}
