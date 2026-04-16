import VoiceConfirm from "../components/(about)/abouthero";
import MeetTheTeam from "../components/(about)/meet";
import Navbar from "../components/Navbar";
import VoiceConfirmFooter from "../components/footer";


export default function About() {
  return (
    <>
      <Navbar />
      <VoiceConfirm/>
      <MeetTheTeam/>
      <VoiceConfirmFooter />
    </>
  );
}
