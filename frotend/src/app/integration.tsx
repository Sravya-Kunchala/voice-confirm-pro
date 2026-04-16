
import FallbackAndIntegration from "../components/(features)/fallbackintegrations";
import CRMSection from "../components/(features)/crmsection";
import ConnectsSection from "../components/(integrations)/hero";
import Integrationsection from "../components/(integrations)/int";
import Navbar from "../components/Navbar";
import VoiceConfirmFooter from "../components/footer";
//import StatsBar from "../components/(home)/stats";
export default function Integration() {
  return (
    <>
      <Navbar />
      <ConnectsSection/>
      <Integrationsection/>
      <FallbackAndIntegration/>
      <CRMSection/>
      <VoiceConfirmFooter/>
    </>
  );
}
