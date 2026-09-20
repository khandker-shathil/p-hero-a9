import { getFeaturedTutors } from "@/lib/tutors";
import BannerSection from "./components/Banner";
import FeaturedTutors from "./components/Featured";
import HowItWorks from "./components/Howitworks";
import CtaStrip from "./components/Ctastrip";

export default async function Home() {
  const tutors = await getFeaturedTutors()
  return (
    <div>
      <BannerSection tutors={tutors.slice(0, 9)} />
      <FeaturedTutors tutors={tutors} />
      <HowItWorks />
      <CtaStrip />
    </div>
  );
}
