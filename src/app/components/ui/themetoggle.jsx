"use client";

import { Moon } from "lucide-react";
import { useEffect } from "react";

export default function ThemeToggle() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("mediqueue-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const useDark = savedTheme ? savedTheme === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", useDark);
  }, []);

  const toggle = () => {
    const nextTheme = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextTheme);
    localStorage.setItem("mediqueue-theme", nextTheme ? "dark" : "light");
  };

  return <button type="button" onClick={toggle} className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-[#131F38]" aria-label="Toggle color theme" title="Toggle light and dark theme"><Moon size={18} /></button>;
}
