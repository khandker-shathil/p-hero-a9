// components/FeaturedTutors.jsx
import Link from "next/link";
import { TutorCard } from "./Tutor";

export default function FeaturedTutors({ tutors = [] }) {
  const featured = tutors.slice(0, 6);

  if (featured.length === 0) return null;

  return (
    <section className="bg-[#FBFAF7] px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2
              className="text-3xl text-[#1B2A4A] md:text-4xl"
              style={{ fontFamily: "var(--font-fraunces, serif)" }}
            >
              Featured tutors
            </h2>
            <p className="mt-2 max-w-md text-[#6B7280]">
              A few of the people currently taking students, across the subjects people ask for most.
            </p>
          </div>
          <Link
            href="/tutors"
            className="whitespace-nowrap text-sm font-medium text-[#1B2A4A] underline decoration-[#D9D4C8] underline-offset-4 hover:decoration-[#1B2A4A]"
          >
            View all tutors
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((tutor) => (
            <TutorCard key={tutor._id} tutors={tutor} />
          ))}
        </div>
      </div>
    </section>
  );
}