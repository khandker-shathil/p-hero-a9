import { auth } from "@/lib/auth";
import { getBookingsForUser } from "@/lib/bookings";
import { headers } from "next/headers";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { redirect } from "next/navigation";
import MyBookingsTable from "../../components/ui/mybookingstable";

export const metadata = { title: "My bookings" };

export default async function MyBookingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const bookings = await getBookingsForUser(session.user.id);
  const safeBookings = bookings.map((booking) => ({
    id: booking._id.toString(),
    tutorId: booking.tutorId.toString(),
    tutorName: booking.tutor?.name || "Tutor profile unavailable",
    subject: booking.tutor?.subject || "Tutoring session",
    studentName: session.user.name,
    studentEmail: session.user.email,
    status: booking.status,
    bookedDate: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(booking.createdAt)),
  }));

  return <main className="flex flex-1 bg-[#F6F5F1] px-4 py-10 sm:px-6"><div className="mx-auto w-full max-w-6xl"><Link href="/profile" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-[#131F38]"><ArrowLeft size={16} /> Back to profile</Link><div className="mt-6 flex items-center gap-3 text-[#131F38]"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#131F38] text-white"><BookOpen size={21} /></span><div><p className="text-sm font-medium text-slate-500">Your learning plan</p><h1 className="text-3xl" style={{ fontFamily: "var(--font-fraunces, serif)" }}>My booked sessions</h1></div></div><p className="mt-4 text-sm text-slate-600">Only sessions booked from your MediQueue account are listed here.</p><MyBookingsTable initialBookings={safeBookings} /></div></main>;
}
