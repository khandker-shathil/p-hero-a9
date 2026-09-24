"use client";

import { Filter, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { TutorCard } from "./Tutor";

const emptyFilters = { name: "", startDate: "", endDate: "" };

export default function TutorBrowser() {
  const [filters, setFilters] = useState(emptyFilters);
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTutors = async (nextFilters = filters) => {
    setLoading(true);
    setError("");
    const params = new URLSearchParams(Object.entries(nextFilters).filter(([, value]) => value));

    try {
      const response = await fetch(`/api/tutors?${params.toString()}`, { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not load tutors.");
      setTutors(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialTutors = async () => {
      try {
        const response = await fetch("/api/tutors", { cache: "no-store" });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Could not load tutors.");
        setTutors(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    void loadInitialTutors();
  }, []);

  const submit = (event) => {
    event.preventDefault();
    loadTutors();
  };

  const reset = () => {
    setFilters(emptyFilters);
    loadTutors(emptyFilters);
  };

  return <>
    <form onSubmit={submit} className="mb-8 grid gap-3 rounded-xl border border-[#E7E3DA] bg-white p-4 shadow-sm md:grid-cols-[1fr_11rem_11rem_auto]">
      <label className="relative"><span className="sr-only">Search tutors by name</span><Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={filters.name} onChange={(event) => setFilters({ ...filters, name: event.target.value })} placeholder="Search by tutor name" className="w-full rounded-lg border border-slate-300 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#131F38] focus:ring-2 focus:ring-[#131F38]/15" /></label>
      <label><span className="sr-only">Session start date</span><input value={filters.startDate} onChange={(event) => setFilters({ ...filters, startDate: event.target.value })} type="date" className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[#131F38] focus:ring-2 focus:ring-[#131F38]/15" /></label>
      <label><span className="sr-only">Session end date</span><input value={filters.endDate} onChange={(event) => setFilters({ ...filters, endDate: event.target.value })} type="date" className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[#131F38] focus:ring-2 focus:ring-[#131F38]/15" /></label>
      <div className="flex gap-2"><button className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#131F38] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#243759]"><Filter size={16} /> Filter</button><button type="button" onClick={reset} className="rounded-lg border border-slate-200 px-3 text-slate-600 hover:bg-slate-50" aria-label="Clear filters"><X size={17} /></button></div>
    </form>
    {loading ? <div className="flex justify-center py-16"><span className="h-9 w-9 animate-spin rounded-full border-4 border-[#D9D4C8] border-t-[#3F6E52]" aria-label="Loading tutors" /></div> : error ? <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">{error}</div> : tutors.length > 0 ? <><p className="mb-4 text-sm text-[#6B7280]">{tutors.length} tutor{tutors.length === 1 ? "" : "s"} found</p><div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">{tutors.map((tutor) => <TutorCard key={tutor._id} tutors={tutor} />)}</div></> : <div className="rounded-xl border border-dashed border-[#D9D4C8] bg-white px-6 py-14 text-center"><h2 className="text-2xl text-[#1B2A4A]" style={{ fontFamily: "var(--font-fraunces, serif)" }}>No tutors match those filters.</h2><p className="mt-2 text-sm text-[#6B7280]">Try another name or a wider session-date range.</p></div>}
  </>;
}
