// components/Footer.jsx
import Link from "next/link";
import { Mail, MapPin, Phone, GraduationCap } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const XIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const learningLinks = [
  { label: "Browse tutors", href: "/tutors" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Become a tutor", href: "/add-tutor" },
  { label: "My booked sessions", href: "/my-booked-sessions" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of service", href: "/terms" },
];

const socials = [
  { label: "Facebook", href: "#", Icon: FaFacebookF },
  { label: "Instagram", href: "#", Icon: FaInstagram },
  { label: "LinkedIn", href: "#", Icon: FaLinkedinIn },
  { label: "X", href: "#", Icon: XIcon },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#131F38] px-6 py-14 text-[#C7CBD6]">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-[#FBFAF7]">
              <GraduationCap size={20} />
              <span
                className="text-lg"
                style={{ fontFamily: "var(--font-fraunces, serif)" }}
              >
                MediQueue
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">
              Find a tutor, book a slot, start learning — without the back-and-forth emails.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-[#C7CBD6] hover:border-white/40 hover:text-[#FBFAF7]"
                >
                  <Icon size={14} />
                </Link>
              ))}
            </div>
          </div>

          {/* Learning links */}
          <div>
            <h3 className="text-sm font-medium text-[#FBFAF7]">Learning</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {learningLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-[#FBFAF7]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-sm font-medium text-[#FBFAF7]">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-[#FBFAF7]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-medium text-[#FBFAF7]">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Mail size={16} className="mt-0.5 shrink-0" />
                <span>support@mediqueue.app</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone size={16} className="mt-0.5 shrink-0" />
                <span>+1 (215) 555-0148</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>Philadelphia, PA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs sm:flex-row">
          <span>© {new Date().getFullYear()} MediQueue. All rights reserved.</span>
          <span>Built for learning, not lorem ipsum.</span>
        </div>
      </div>
    </footer>
  );
}