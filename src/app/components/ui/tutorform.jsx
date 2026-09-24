"use client";

const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Programming", "Other"];
const modes = ["Online", "Offline", "Both"];

const inputClass = "mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#131F38] focus:ring-2 focus:ring-[#131F38]/15";

export default function TutorForm({ tutor = {}, onSubmit, saving, submitLabel }) {
  const dateValue = tutor.sessionStartDate ? new Date(tutor.sessionStartDate).toISOString().slice(0, 10) : "";

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <label className="text-sm font-medium text-slate-700">Tutor name<input required name="name" defaultValue={tutor.name || ""} className={inputClass} placeholder="e.g. Alex Morgan" /></label>
      <label className="text-sm font-medium text-slate-700">Photo URL<input name="photo" type="url" defaultValue={tutor.photo || ""} className={inputClass} placeholder="https://…" /></label>
      <label className="text-sm font-medium text-slate-700">Subject<select required name="subject" defaultValue={tutor.subject || ""} className={inputClass}><option value="" disabled>Select a subject</option>{subjects.map((subject) => <option key={subject}>{subject}</option>)}</select></label>
      <label className="text-sm font-medium text-slate-700">Teaching mode<select required name="teachingMode" defaultValue={tutor.teachingMode || ""} className={inputClass}><option value="" disabled>Select a mode</option>{modes.map((mode) => <option key={mode}>{mode}</option>)}</select></label>
      <label className="text-sm font-medium text-slate-700">Available days<input required name="availableDays" defaultValue={tutor.availableDays || ""} className={inputClass} placeholder="Sun – Thu" /></label>
      <label className="text-sm font-medium text-slate-700">Available time<input required name="availableTime" defaultValue={tutor.availableTime || ""} className={inputClass} placeholder="5:00 PM – 8:00 PM" /></label>
      <label className="text-sm font-medium text-slate-700">Hourly fee<input required name="hourlyFee" type="number" min="0" step="0.01" defaultValue={tutor.hourlyFee ?? ""} className={inputClass} placeholder="25" /></label>
      <label className="text-sm font-medium text-slate-700">Total slots<input required name="totalSlot" type="number" min="0" step="1" defaultValue={tutor.totalSlot ?? ""} className={inputClass} placeholder="10" /></label>
      <label className="text-sm font-medium text-slate-700">Session start date<input required name="sessionStartDate" type="date" defaultValue={dateValue} className={inputClass} /></label>
      <label className="text-sm font-medium text-slate-700">Experience (years)<input required name="experience" type="number" min="0" step="0.5" defaultValue={tutor.experience ?? ""} className={inputClass} placeholder="3" /></label>
      <label className="text-sm font-medium text-slate-700">Institution<input required name="institution" defaultValue={tutor.institution || ""} className={inputClass} placeholder="University or school" /></label>
      <label className="text-sm font-medium text-slate-700">Location<input required name="location" defaultValue={tutor.location || ""} className={inputClass} placeholder="Area or city" /></label>
      <div className="sm:col-span-2"><button disabled={saving} className="rounded-lg bg-[#131F38] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#1e3056] disabled:cursor-not-allowed disabled:opacity-60">{saving ? "Saving…" : submitLabel}</button></div>
    </form>
  );
}
