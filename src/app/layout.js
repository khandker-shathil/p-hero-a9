import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar";
import "./globals.css";
import { Fraunces } from "next/font/google";
import Footer from "./components/Footer";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });

export const metadata = {
  title: {
    default: "MediQueue | Tutor Booking System",
    template: "%s | MediQueue",
  },
  description: "Find a tutor, reserve a learning session, and manage your bookings with MediQueue.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${fraunces.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <NavBar />
        {children}
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
