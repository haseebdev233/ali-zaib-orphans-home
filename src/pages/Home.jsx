import Hero from "../Components/Hero";
import PremiumJoinSection from "../Components/JoinSection";
import Services from "../Components/Services";
import PowerSection from "../Components/PowerSection";
import PremiumCampusAmbassadorSection from "../Components/CampusAmbassadorSection";
import JoinUsSection from '../Components/JoinUsSection';

function Home() {
  return (
    <>
      <Hero />
      <Services />
      <PowerSection />
      <PremiumCampusAmbassadorSection />
      <PremiumJoinSection />
      <JoinUsSection />
    </>
  );
}

export default Home;
