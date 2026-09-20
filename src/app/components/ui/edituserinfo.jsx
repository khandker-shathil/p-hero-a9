"use client";

import { authClient } from "@/lib/auth-client";
import { ImageIcon, Pencil, UserRound, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export function EditUserModal({ user }) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const editUserInfo = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setSaving(true);
    const { error } = await authClient.updateUser({
      name: formData.get("name"),
      image: formData.get("image") || null,
    });
    setSaving(false);

    if (error) {
      toast.error(error.message || "We couldn't update your profile.");
      return;
    }

    toast.success("Profile updated!");
    setOpen(false);
    router.refresh();
  };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#131F38] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#1e3056]"><Pencil size={16} /> Edit profile</button>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 p-4" role="presentation" onMouseDown={() => !saving && setOpen(false)}>
          <section className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="edit-profile-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4"><div><h2 id="edit-profile-title" className="text-2xl text-[#131F38]" style={{ fontFamily: "var(--font-fraunces, serif)" }}>Edit profile</h2><p className="mt-1 text-sm text-slate-600">Update the details shown across MediQueue.</p></div><button type="button" onClick={() => setOpen(false)} disabled={saving} aria-label="Close edit profile dialog" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 disabled:opacity-50"><X size={20} /></button></div>
            <form className="mt-6 space-y-5" onSubmit={editUserInfo}>
              <label className="block text-sm font-medium text-slate-700">Name<span className="relative mt-1.5 block"><UserRound className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input required name="name" defaultValue={user.name || ""} autoComplete="name" className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-slate-900 outline-none transition focus:border-[#131F38] focus:ring-2 focus:ring-[#131F38]/15" /></span></label>
              <label className="block text-sm font-medium text-slate-700">Profile photo URL <span className="font-normal text-slate-500">(optional)</span><span className="relative mt-1.5 block"><ImageIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input name="image" type="url" defaultValue={user.image || ""} placeholder="https://example.com/photo.jpg" className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#131F38] focus:ring-2 focus:ring-[#131F38]/15" /></span></label>
              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5"><button type="button" onClick={() => setOpen(false)} disabled={saving} className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50">Cancel</button><button type="submit" disabled={saving} className="rounded-lg bg-[#131F38] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#1e3056] disabled:cursor-not-allowed disabled:opacity-60">{saving ? "Saving…" : "Save changes"}</button></div>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
