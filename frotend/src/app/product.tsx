import CompetitiveAnalysis from "../components/(product)/compare";
import HowItWorks from "../components/(product)/herosection";
import OrderConfirmProcess from "../components/(product)/steps";
import TechnicalSpecs from "../components/(product)/technical";
import Navbar from "../components/Navbar";
import VoiceConfirmFooter from "../components/footer";
//import StatsBar from "../components/(home)/stats";
import HeroBanner from "../components/(home)/banner"; 
export default function Product() {
  return (
    <>
      <Navbar />
      <HowItWorks/>
      <OrderConfirmProcess/>
      <CompetitiveAnalysis/>
      <TechnicalSpecs/>
      <HeroBanner/>
      <VoiceConfirmFooter/>
    </>
  );
}