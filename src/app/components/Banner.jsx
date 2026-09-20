"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const accents = ["#3F6E52", "#C1543C", "#8A6FB0"];

const headlines = [
  { heading: "Find your tutor.", sub: "Book a session in minutes, not emails." },
  { heading: "Learn on your schedule.", sub: "Pick a day, a time, a subject — done." },
  { heading: "Every subject, one place.", sub: "From algebra to advanced statistics." },
];

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function MiniTutorCard({ tutor, accent }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <>
      {tutor.photo && !imgFailed ? (
        <Image
          src={tutor.photo}
          alt={tutor.name}
          width={100}
          height={100}
          onError={() => setImgFailed(true)}
          className="mb-2 h-8 w-8 rounded-full object-cover"
        />
      ) : (
        <div
          className="mb-2 flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium text-white"
          style={{ backgroundColor: accent }}
        >
          {tutor.name?.charAt(0).toUpperCase()}
        </div>
      )}
      <div
        className="mb-2 inline-block px-1.5 py-0.5 text-[10px] font-medium text-white"
        style={{ backgroundColor: accent }}
      >
        {tutor.subject}
      </div>
      <p
        className="text-sm text-[#1B2A4A]"
        style={{ fontFamily: "var(--font-fraunces, serif)" }}
      >
        {tutor.name}
      </p>
    </>
  );
}

export default function BannerSection({ tutors = [] }) {
  const [active, setActive] = useState(0);

  const groups = chunk(tutors, 3).slice(0, 3); // at most 3 slides
  const slideCount = groups.length || 1;

  const prev = () => setActive((i) => (i - 1 + slideCount) % slideCount);
  const next = () => setActive((i) => (i + 1) % slideCount);
  
  useEffect(() => {
    if (slideCount <= 1) return;

    const timer = setInterval(() => {
      setActive((i) => (i + 1) % slideCount);
    }, 5000);

    return () => clearInterval(timer);
  }, [slideCount]);

  if (groups.length === 0) {
    return null; // no tutors yet — nothing to show
  }

  const cards = groups[active];
  const accent = accents[active % accents.length];
  const { heading, sub } = headlines[active % headlines.length];
  const tag = cards[0]?.subject ? `${cards[0].subject}` : "Tutoring";

  return (
    <section className="relative overflow-hidden bg-[#1B2A4A]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent, transparent 27px, #FBFAF7 28px)",
        }}
      />

      <div className="relative mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-6 py-16 md:flex-row md:justify-between md:py-24">
        <div className="min-w-5 text-center md:text-left">
          <span
            className="inline-block px-2 py-1 text-xs font-medium text-white"
            style={{ backgroundColor: accent }}
          >
            {tag}
          </span>

          <h1
            key={heading}
            className="mt-4 text-4xl leading-tight text-[#FBFAF7] md:text-5xl"
            style={{ fontFamily: "var(--font-fraunces, serif)" }}
          >
            {heading}
          </h1>

          <p className="mt-3 text-base text-[#C7CBD6]">{sub}</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <Link
              href="/tutors"
              className="rounded-md bg-[#FBFAF7] px-5 py-2.5 text-sm font-medium text-[#1B2A4A] hover:bg-white"
            >
              Browse tutors
            </Link>
            <Link
              href="/how-it-works"
              className="rounded-md border border-white/25 px-5 py-2.5 text-sm font-medium text-[#FBFAF7] hover:bg-white/10"
            >
              How it works
            </Link>
          </div>

          {groups.length > 1 && (
            <div className="mt-8 flex justify-center gap-2 md:justify-start">
              {groups.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active ? "w-6 bg-[#FBFAF7]" : "w-1.5 bg-white/30"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="relative h-[180px] w-[260px] shrink-0 md:h-[220px] md:w-[320px]">
          {cards.map((tutor, i) => {
            const rotations = [-8, 0, 8];
            const offsets = [0, 14, 28];
            return (
              <div
                key={tutor._id || tutor.name}
                className="absolute left-1/2 top-0 w-44 -translate-x-1/2 rounded-lg bg-[#FBFAF7] p-4 shadow-lg transition-transform duration-500"
                style={{
                  transform: `translateX(-50%) rotate(${rotations[i] ?? 0}deg) translateY(${offsets[i] ?? 0}px)`,
                  zIndex: i === 1 ? 3 : 1,
                }}
              >
                <MiniTutorCard tutor={tutor} accent={accent} />
              </div>
            );
          })}
        </div>

        {groups.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/25 p-2 text-white hover:bg-white/10 md:block"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/25 p-2 text-white hover:bg-white/10 md:block"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>
    </section>
  );
}