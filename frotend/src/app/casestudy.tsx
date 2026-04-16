import Navbar from "../components/Navbar";
import VoiceConfirmFooter from "../components/footer";
import TestimonialsSection from "../components/(casestudy)/hero";
import TestimonialsGrid from "../components/(casestudy)/testinomials";
import HeroBanner from "../components/(home)/banner";

export default function CaseStudy() {
  return (
    <>
      <Navbar />
      <TestimonialsSection />
      <TestimonialsGrid />
      <HeroBanner/>
      <VoiceConfirmFooter />
    </>
  );
}
