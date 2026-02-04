import HadithHeadline from "../Components/HadithHeadline";
import Hero from "../Components/Hero";
import PremiumJoinSection from "../Components/JoinSection";
import ExecutiveDirectorMessage from "../Components/ExecutiveDirectorMessage";
import Services from "../Components/Services";
import PowerSection from "../Components/PowerSection";
import WhoWeAre from "../Components/WhoWeAre";


function Home() {
  return (
    <>
      <HadithHeadline />
      <Hero />
      <WhoWeAre />
      <PremiumJoinSection />
      <ExecutiveDirectorMessage />
      <Services />
      <PowerSection />
    </>
  );
}

export default Home;
