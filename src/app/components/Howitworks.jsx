// components/HowItWorks.jsx
const steps = [
  {
    label: "01",
    accent: "#3F6E52",
    title: "Browse tutors",
    body: "Filter by subject, availability, and price until you find someone who fits your schedule.",
  },
  {
    label: "02",
    accent: "#C1543C",
    title: "Book a slot",
    body: "Pick an open date and time. Your seat is held the moment you confirm — no back-and-forth email.",
  },
  {
    label: "03",
    accent: "#8A6FB0",
    title: "Start learning",
    body: "Join your session at the scheduled time. Reschedule or cancel anytime from your dashboard.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2
          className="max-w-lg text-3xl text-[#1B2A4A] md:text-4xl"
          style={{ fontFamily: "var(--font-fraunces, serif)" }}
        >
          How MediQueue works
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step) => (
            <div key={step.label} className="border-l-2 border-[#EDEAE1] pl-5">
              <span
                className="inline-block px-2 py-0.5 text-xs font-semibold text-white"
                style={{ backgroundColor: step.accent }}
              >
                {step.label}
              </span>
              <h3 className="mt-3 text-lg font-medium text-[#1B2A4A]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}