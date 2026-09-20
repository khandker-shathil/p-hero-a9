import { BookOpenCheck, Users } from "lucide-react";
import { TutorCard } from "../components/Tutor";
import { getTutors } from "@/lib/tutors";

export default async function TutorsPage() {
  const tutors = await getTutors();

  return (
    <main className="min-h-screen bg-[#FBFAF7]">
      <section className="relative overflow-hidden bg-[#1B2A4A]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent, transparent 27px, #FBFAF7 28px)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="text-sm font-medium text-[#A9CFB5]">Find your next tutor</p>
          <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h1
                className="text-4xl leading-tight text-[#FBFAF7] md:text-5xl"
                style={{ fontFamily: "var(--font-fraunces, serif)" }}
              >
                Learn with someone who gets it.
              </h1>
              <p className="mt-3 max-w-xl text-[#C7CBD6]">
                Explore tutors by subject, schedule, teaching mode, and price—then choose the right fit for you.
              </p>
            </div>
            <div className="flex w-fit items-center gap-3 border border-white/15 bg-white/5 px-4 py-3 text-sm text-[#FBFAF7]">
              <Users size={18} className="text-[#A9CFB5]" />
              <span><strong>{tutors.length}</strong> tutors available</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="mb-8 flex items-start gap-3 border-l-2 border-[#3F6E52] pl-4">
          <BookOpenCheck size={21} className="mt-0.5 shrink-0 text-[#3F6E52]" />
          <div>
            <h2 className="text-xl text-[#1B2A4A]" style={{ fontFamily: "var(--font-fraunces, serif)" }}>
              Browse all tutors
            </h2>
            <p className="mt-1 text-sm text-[#6B7280]">Select a tutor to view their full profile and session availability.</p>
          </div>
        </div>

        {tutors.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {tutors.map((tutor) => (
              <TutorCard key={tutor._id} tutors={tutor} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-[#D9D4C8] bg-white px-6 py-14 text-center">
            <h2 className="text-2xl text-[#1B2A4A]" style={{ fontFamily: "var(--font-fraunces, serif)" }}>
              No tutors are available yet.
            </h2>
            <p className="mt-2 text-sm text-[#6B7280]">Please check back soon for new tutors and open session slots.</p>
          </div>
        )}
      </section>
    </main>
  );
}
