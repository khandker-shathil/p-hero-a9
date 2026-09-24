import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  Clock3,
  GraduationCap,
  MapPin,
  Monitor,
  MoveLeft,
  Users,
} from "lucide-react";
import { getTutorDetails } from "@/lib/tutors";
import BookingButton from "@/app/components/ui/bookinbutton";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const tutor = await getTutorDetails(id);
  return { title: tutor ? `${tutor.name} — Tutor` : "Tutor not found" };
}

export default async function TutorDetailsPage({ params }) {
  const { id } = await params;
  const tutor = await getTutorDetails(id);

  if (!tutor) notFound();

  const isFull = tutor.totalSlot === 0;
  const startDate = tutor.sessionStartDate
    ? new Date(tutor.sessionStartDate).toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "To be confirmed";
  const details = [
    { Icon: GraduationCap, label: "Institution", value: tutor.institution || "Not specified" },
    { Icon: MapPin, label: "Location", value: tutor.location || "Not specified" },
    { Icon: Monitor, label: "Teaching mode", value: tutor.teachingMode || "Not specified" },
    { Icon: CalendarDays, label: "Available days", value: tutor.availableDays || "To be confirmed" },
    { Icon: Clock3, label: "Available time", value: tutor.availableTime || "To be confirmed" },
    { Icon: Users, label: "Session starts", value: startDate },
  ];

  return (
    <main className="min-h-screen bg-[#FBFAF7]">
      <section className="border-b border-[#E7E3DA] bg-[#1B2A4A]">
        <div className="mx-auto max-w-6xl px-6 py-7">
          <Link href="/tutors" className="inline-flex items-center gap-2 text-sm text-[#C7CBD6] transition hover:text-white">
            <MoveLeft size={16} /> Back to tutors
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <article className="overflow-hidden rounded-xl border border-[#E7E3DA] bg-white">
            <div className="grid md:grid-cols-[15rem_minmax(0,1fr)]">
              <div className="relative min-h-72 bg-[#E7E3DA] md:min-h-full">
                {tutor.photo ? (
                  <Image src={tutor.photo} alt={tutor.name} fill priority sizes="(min-width: 768px) 240px, 100vw" className="object-cover" />
                ) : (
                  <div className="flex h-full min-h-72 items-center justify-center bg-[#3F6E52] text-7xl text-white" aria-hidden="true">
                    {tutor.name?.charAt(0)?.toUpperCase()}
                  </div>
                )}
                <span className="absolute left-4 top-4 bg-[#3F6E52] px-2.5 py-1 text-xs font-semibold text-white">
                  {tutor.subject || "Tutoring"}
                </span>
              </div>

              <div className="p-6 md:p-8">
                <p className="text-sm font-medium text-[#3F6E52]">Tutor profile</p>
                <h1 className="mt-2 text-4xl leading-tight text-[#1B2A4A] md:text-5xl" style={{ fontFamily: "var(--font-fraunces, serif)" }}>
                  {tutor.name}
                </h1>
                <p className="mt-3 text-base text-[#6B7280]">
                  {tutor.experience ?? 0} years of teaching experience{tutor.institution ? ` · ${tutor.institution}` : ""}
                </p>

                <div className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                  {details.map(({ Icon, label, value }) => (
                    <div key={label} className="flex gap-3">
                      <Icon size={18} className="mt-0.5 shrink-0 text-[#3F6E52]" />
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">{label}</p>
                        <p className="mt-1 text-sm text-[#1B2A4A]">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <aside className="rounded-xl border border-[#E7E3DA] bg-white p-6 shadow-sm lg:sticky lg:top-6">
            <p className="text-sm text-[#6B7280]">Session rate</p>
            <p className="mt-1 text-4xl font-semibold text-[#1B2A4A]">
              ${tutor.hourlyFee}<span className="text-base font-normal text-[#6B7280]"> / hour</span>
            </p>
            <div className="mt-6 border-y border-dashed border-[#D9D4C8] py-4">
              <p className={`text-sm font-medium ${isFull ? "text-[#C1543C]" : "text-[#3F6E52]"}`}>
                {isFull ? "This tutor is fully booked" : `${tutor.totalSlot} slots currently available`}
              </p>
              <p className="mt-1 text-sm text-[#6B7280]">Choose a session time that fits your schedule.</p>
            </div>
            <BookingButton tutorId={tutor._id.toString()} isFull={isFull} />
            <p className="mt-3 text-center text-xs text-[#6B7280]">You’ll choose your time before confirming.</p>
          </aside>
        </div>
      </section>
    </main>
  );
}
