"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import TutorForm from "./tutorform";

export default function AddTutorForm() {
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    const data = Object.fromEntries(new FormData(event.currentTarget));

    try {
      const response = await fetch("/api/tutors", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not add tutor.");
      toast.success("Tutor added successfully!");
      router.push("/my-tutors");
      router.refresh();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  return <TutorForm onSubmit={submit} saving={saving} submitLabel="Add tutor" />;
}
