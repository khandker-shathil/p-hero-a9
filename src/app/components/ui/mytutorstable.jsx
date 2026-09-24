"use client";

import { Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import TutorForm from "./tutorform";

export default function MyTutorsTable({ initialTutors }) {
  const [tutors, setTutors] = useState(initialTutors);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [saving, setSaving] = useState(false);

  const update = async (event) => {
    event.preventDefault();
    setSaving(true);
    const values = Object.fromEntries(new FormData(event.currentTarget));

    try {
      const response = await fetch(`/api/tutors/${editing.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not update tutor.");
      setTutors((items) => items.map((tutor) => tutor.id === editing.id ? { ...result, id: result._id.toString() } : tutor));
      setEditing(null);
      toast.success("Tutor updated successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/tutors/${deleting.id}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not delete tutor.");
      setTutors((items) => items.filter((tutor) => tutor.id !== deleting.id));
      setDeleting(null);
      toast.success("Tutor listing deleted.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (tutors.length === 0) return <section className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center"><h2 className="text-2xl text-[#131F38]" style={{ fontFamily: "var(--font-fraunces, serif)" }}>No tutor listings yet</h2><p className="mt-2 text-sm text-slate-600">Create your first listing to make it available to students.</p></section>;

  return <>
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm"><table className="min-w-full divide-y divide-slate-200 text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-4">Tutor</th><th className="px-5 py-4">Subject</th><th className="px-5 py-4">Availability</th><th className="px-5 py-4">Fee / slots</th><th className="px-5 py-4 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{tutors.map((tutor) => <tr key={tutor.id}><td className="px-5 py-4"><p className="font-medium text-[#131F38]">{tutor.name}</p><p className="mt-1 text-xs text-slate-500">{tutor.institution}</p></td><td className="px-5 py-4 text-slate-700">{tutor.subject}</td><td className="px-5 py-4 text-slate-700"><p>{tutor.availableDays}</p><p className="mt-1 text-xs text-slate-500">{tutor.availableTime}</p></td><td className="px-5 py-4 text-slate-700">${tutor.hourlyFee}/hr <span className="text-slate-400">·</span> {tutor.totalSlot} left</td><td className="px-5 py-4"><div className="flex justify-end gap-2"><button onClick={() => setEditing(tutor)} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 font-medium text-slate-700 hover:bg-slate-50"><Pencil size={14} /> Edit</button><button onClick={() => setDeleting(tutor)} className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-2 font-medium text-red-700 hover:bg-red-50"><Trash2 size={14} /> Delete</button></div></td></tr>)}</tbody></table></div>
    {editing && <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/45 p-4"><section className="mx-auto my-8 w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl sm:p-8"><div className="flex items-start justify-between gap-4"><div><p className="text-sm font-medium text-[#3F6E52]">Tutor listing</p><h2 className="text-2xl text-[#131F38]" style={{ fontFamily: "var(--font-fraunces, serif)" }}>Edit {editing.name}</h2></div><button aria-label="Close edit dialog" onClick={() => setEditing(null)} disabled={saving} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X size={20} /></button></div><div className="mt-7"><TutorForm key={editing.id} tutor={editing} onSubmit={update} saving={saving} submitLabel="Save changes" /></div></section></div>}
    {deleting && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 p-4"><section role="dialog" aria-modal="true" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"><h2 className="text-2xl text-[#131F38]" style={{ fontFamily: "var(--font-fraunces, serif)" }}>Delete tutor?</h2><p className="mt-3 text-sm leading-relaxed text-slate-600">This permanently removes <span className="font-medium text-slate-800">{deleting.name}</span> from the tutor list. This action cannot be undone.</p><div className="mt-6 flex justify-end gap-3"><button onClick={() => setDeleting(null)} disabled={saving} className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100">Cancel</button><button onClick={remove} disabled={saving} className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60">{saving ? "Deleting…" : "Delete tutor"}</button></div></section></div>}
  </>;
}
