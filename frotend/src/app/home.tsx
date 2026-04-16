import Navbar from "../components/Navbar";
import HeroSection from "../components/(home)/hero";
import ProblemSolution from "../components/(home)/problem";
import WhoItIsFor from "../components/(home)/cards";
import HowItWorks from "../components/(home)/howitworks";
import FeatureHighlights from "../components/(home)/feature";
import CompetitiveAnalysis from "../components/(home)/compare";
import Testimonials from "../components/(home)/testinomials";
import CaseStudy from "../components/(home)/casestudy";
import Pricing from "../components/(home)/pricing";
import FAQ from "../components/(home)/faq";
import HeroBanner from "../components/(home)/banner";
import VoiceConfirmFooter from "../components/footer";
//import StatsBar from "../components/(home)/stats";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ProblemSolution/>
      <WhoItIsFor/>
      <HowItWorks/>
      <FeatureHighlights/>
      <CompetitiveAnalysis/>
      <Testimonials/>
      <CaseStudy/>
      <Pricing/>
      <FAQ/>
      <HeroBanner/>
      <VoiceConfirmFooter/>
    </>
  );
}