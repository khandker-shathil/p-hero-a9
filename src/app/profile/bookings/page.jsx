import { auth } from "@/lib/auth";
import { getBookingsForUser } from "@/lib/bookings";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, CalendarDays, Clock3, GraduationCap } from "lucide-react";
import { redirect } from "next/navigation";

export default async function MyBookingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const bookings = await getBookingsForUser(session.user.id);

  return (
    <main className="flex flex-1 bg-[#F6F5F1] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <Link href="/profile" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-[#131F38]"><ArrowLeft size={16} /> Back to profile</Link>
        <div className="mt-6 flex items-center gap-3 text-[#131F38]"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#131F38] text-white"><BookOpen size={21} /></span><div><p className="text-sm font-medium text-slate-500">Your learning plan</p><h1 className="text-3xl" style={{ fontFamily: "var(--font-fraunces, serif)" }}>My bookings</h1></div></div>

        {bookings.length === 0 ? (
          <section className="mt-8 rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm"><span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF3ED] text-[#3F6E52]"><GraduationCap size={27} /></span><h2 className="mt-5 text-2xl text-[#131F38]" style={{ fontFamily: "var(--font-fraunces, serif)" }}>No bookings yet</h2><p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-600">Find a tutor who fits your goals and book your first session.</p><Link href="/tutors" className="mt-6 inline-flex rounded-lg bg-[#131F38] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#1e3056]">Browse tutors</Link></section>
        ) : (
          <div className="mt-8 space-y-4">
            {bookings.map((booking) => {
              const tutor = booking.tutor;
              const bookedDate = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(booking.createdAt));
              return <article key={booking._id.toString()} className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:p-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#3F6E52] text-2xl text-white">{tutor?.photo ? <Image src={tutor.photo} alt={tutor.name || "Tutor"} width={64} height={64} className="h-full w-full object-cover" /> : tutor?.name?.charAt(0)?.toUpperCase() || "T"}</div>
                <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="text-xs font-medium uppercase tracking-wide text-[#3F6E52]">{tutor?.subject || "Tutoring session"}</p><span className="rounded-full bg-[#EAF3ED] px-2 py-0.5 text-xs font-medium text-[#3F6E52]">{booking.status}</span></div><h2 className="mt-1 text-xl text-[#131F38]" style={{ fontFamily: "var(--font-fraunces, serif)" }}>{tutor?.name || "Tutor profile unavailable"}</h2><div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600"><span className="inline-flex items-center gap-1.5"><CalendarDays size={15} /> Booked {bookedDate}</span>{tutor?.availableTime && <span className="inline-flex items-center gap-1.5"><Clock3 size={15} /> {tutor.availableTime}</span>}</div></div>
                {tutor?._id && <Link href={`/tutors/${tutor._id.toString()}`} className="shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50">View tutor</Link>}
              </article>;
            })}
          </div>
        )}
      </div>
    </main>
  );
}
