"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function MyBookingsTable({ initialBookings }) {
  const [bookings, setBookings] = useState(initialBookings);
  const [cancelling, setCancelling] = useState(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const cancelBooking = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/bookings/${cancelling.id}`, { method: "PATCH" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not cancel booking.");
      setBookings((items) => items.map((booking) => booking.id === cancelling.id ? { ...booking, status: "cancelled" } : booking));
      setCancelling(null);
      toast.success("Booking cancelled. The tutor slot is available again.");
      router.refresh();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (bookings.length === 0) {
    return <section className="mt-8 rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm"><h2 className="text-2xl text-[#131F38]" style={{ fontFamily: "var(--font-fraunces, serif)" }}>No bookings yet</h2><p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-600">Find a tutor who fits your goals and book your first session.</p><Link href="/tutors" className="mt-6 inline-flex rounded-lg bg-[#131F38] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#1e3056]">Browse tutors</Link></section>;
  }

  return <>
    <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm"><table className="min-w-[760px] w-full divide-y divide-slate-200 text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-4">Tutor</th><th className="px-5 py-4">Student</th><th className="px-5 py-4">Email</th><th className="px-5 py-4">Booked on</th><th className="px-5 py-4">Status</th><th className="px-5 py-4 text-right">Action</th></tr></thead><tbody className="divide-y divide-slate-100">{bookings.map((booking) => <tr key={booking.id}><td className="px-5 py-4"><p className="font-medium text-[#131F38]">{booking.tutorName}</p><p className="mt-1 text-xs text-slate-500">{booking.subject}</p></td><td className="px-5 py-4 text-slate-700">{booking.studentName}</td><td className="px-5 py-4 text-slate-700">{booking.studentEmail}</td><td className="px-5 py-4 text-slate-700">{booking.bookedDate}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${booking.status === "confirmed" ? "bg-[#EAF3ED] text-[#3F6E52]" : "bg-slate-100 text-slate-600"}`}>{booking.status}</span></td><td className="px-5 py-4 text-right">{booking.status === "confirmed" ? <button onClick={() => setCancelling(booking)} className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50">Cancel</button> : <Link href={`/tutors/${booking.tutorId}`} className="text-sm font-medium text-[#131F38] hover:text-[#3F6E52]">View tutor</Link>}</td></tr>)}</tbody></table></div>
    {cancelling && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 p-4"><section role="dialog" aria-modal="true" aria-labelledby="cancel-booking-title" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"><h2 id="cancel-booking-title" className="text-2xl text-[#131F38]" style={{ fontFamily: "var(--font-fraunces, serif)" }}>Cancel this booking?</h2><p className="mt-3 text-sm leading-relaxed text-slate-600">You are cancelling your session with <span className="font-medium text-slate-800">{cancelling.tutorName}</span>. Its reserved tutor slot will become available again.</p><div className="mt-6 flex justify-end gap-3"><button onClick={() => setCancelling(null)} disabled={saving} className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100">Keep booking</button><button onClick={cancelBooking} disabled={saving} className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60">{saving ? "Cancelling…" : "Cancel booking"}</button></div></section></div>}
  </>;
}
