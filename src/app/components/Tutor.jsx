import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock3, MapPin, Monitor } from "lucide-react";

export function TutorCard({ tutors: tutor }) {
  const {
    _id,
    name,
    photo,
    experience,
    hourlyFee,
    institution,
    location,
    totalSlot,
    teachingMode,
    subject,
    sessionStartDate,
    availableDays,
    availableTime,
  } = tutor;

  const isFull = totalSlot === 0;
  const isLowSlots = totalSlot > 0 && totalSlot <= 3;
  const startDate = sessionStartDate
    ? new Date(sessionStartDate).toLocaleDateString(undefined, { month: "short", day: "numeric" })
    : "TBA";
  const availabilityColor = isFull || isLowSlots ? "text-[#C1543C]" : "text-[#3F6E52]";

  return (
    <article className="group overflow-hidden rounded-xl border border-[#E7E3DA] bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#C9C2B3] hover:shadow-md">
      <Link href={`/tutors/${_id}`} className="flex h-full flex-col sm:flex-row" aria-label={`View ${name}'s profile`}>
        <div className="relative h-52 shrink-0 bg-[#E7E3DA] sm:h-auto sm:w-36">
          {photo ? (
            <Image src={photo} alt={name} fill sizes="(min-width: 640px) 144px, 100vw" className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center bg-[#3F6E52] text-4xl text-white">
              {name?.charAt(0)?.toUpperCase()}
            </div>
          )}
          <span className="absolute left-0 top-4 bg-[#3F6E52] px-2.5 py-1 text-[11px] font-semibold text-white">
            {subject || "Tutoring"}
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col p-5">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl leading-tight text-[#1B2A4A]" style={{ fontFamily: "var(--font-fraunces, serif)" }}>
                  {name}
                </h3>
                <p className="mt-1 text-sm text-[#6B7280]">
                  {institution || "Independent tutor"} · {experience ?? 0} yrs experience
                </p>
              </div>
              <ArrowUpRight size={19} className="shrink-0 text-[#6B7280] transition group-hover:text-[#3F6E52]" />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <Detail Icon={MapPin} label="Location" value={location || "Online"} />
              <Detail Icon={Monitor} label="Mode" value={teachingMode || "Not specified"} />
              <Detail Icon={CalendarDays} label="Available" value={availableDays || "TBA"} />
              <Detail Icon={Clock3} label="Time" value={availableTime || "TBA"} />
            </div>
          </div>

          <div className="mt-5 flex items-end justify-between gap-3 border-t border-dashed border-[#D9D4C8] pt-4">
            <div>
              <p className="text-xs text-[#6B7280]">From {startDate}</p>
              <p className="mt-1 text-lg font-semibold text-[#1B2A4A]">
                ${hourlyFee}<span className="text-sm font-normal text-[#6B7280]"> / hr</span>
              </p>
            </div>
            <div className="text-right">
              <p className={`text-sm font-medium ${availabilityColor}`}>
                {isFull ? "Fully booked" : `${totalSlot} slots left`}
              </p>
              <p className="mt-1 text-xs text-[#6B7280]">View profile</p>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

function Detail({ Icon, label, value }) {
  return (
    <div className="flex min-w-0 gap-2">
      <Icon size={15} className="mt-0.5 shrink-0 text-[#3F6E52]" />
      <div className="min-w-0">
        <p className="text-xs text-[#6B7280]">{label}</p>
        <p className="truncate text-[#1B2A4A]" title={value}>{value}</p>
      </div>
    </div>
  );
}
