// components/CtaStrip.jsx
import Link from "next/link";

export default function CtaStrip() {
  return (
    <section className="bg-[#1B2A4A] px-6 py-16 md:py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2
            className="text-2xl text-[#FBFAF7] md:text-3xl"
            style={{ fontFamily: "var(--font-fraunces, serif)" }}
          >
            Ready to book your first session?
          </h2>
          <p className="mt-2 text-[#C7CBD6]">
            Create an account and find a tutor in the next five minutes.
          </p>
        </div>

        <Link
          href="/register"
          className="whitespace-nowrap rounded-md bg-[#FBFAF7] px-6 py-3 text-sm font-medium text-[#1B2A4A] hover:bg-white"
        >
          Get started
        </Link>
      </div>
    </section>
  );
}