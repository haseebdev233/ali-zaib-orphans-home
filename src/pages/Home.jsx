import HadithHeadline from "../Components/HadithHeadline";
import Hero from "../Components/Hero";
import PremiumJoinSection from "../Components/JoinSection";
import ExecutiveDirectorMessage from "../Components/ExecutiveDirectorMessage";
import Services from "../Components/Services";
import PowerSection from "../Components/PowerSection";
import WhoWeAre from "../Components/WhoWeAre";
import ButtonsSection from "../Components/ButtonsSection";


function Home() {
  return (
    <>
      <HadithHeadline />
      <Hero />
      <WhoWeAre />
      <ButtonsSection />
      <PremiumJoinSection />
      <ExecutiveDirectorMessage />
      <Services />
      <PowerSection />
    </>
  );
}

export default Home;
