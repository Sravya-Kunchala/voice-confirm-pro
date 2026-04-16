import Navbar from "../components/Navbar";
import VoiceConfirmFooter from "../components/footer";
import FeaturesHero from "../components/(features)/hero";
import FeaturesPage from "../components/(features)/featurecontent";
//import StatsBar from "../components/(home)/stats";
export default function Feature() {
  return (
    <>
      <Navbar />
      <FeaturesHero />
      <FeaturesPage/>
      <VoiceConfirmFooter />
    </>
  );
}
