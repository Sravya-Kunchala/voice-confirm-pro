
import FAQ from "../components/(pricing)/FAQ";
import PricingPage from "../components/(pricing)/pricingpage";
import Navbar from "../components/Navbar";
import VoiceConfirmFooter from "../components/footer";
//import StatsBar from "../components/(home)/stats";
 
export default function Pricing() {
  return (
    <>
      <Navbar />
     <PricingPage/>
     <FAQ/>
      <VoiceConfirmFooter/>
    </>
  );
}