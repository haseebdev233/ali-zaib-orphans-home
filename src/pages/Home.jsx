import { lazy, Suspense } from "react";
import Hero from "../Components/Hero";
import LazySection from "../Components/LazySection";

const WhoWeAre = lazy(() => import("../Components/WhoWeAre"));
const ButtonsSection = lazy(() => import("../Components/ButtonsSection"));
const PremiumJoinSection = lazy(() => import("../Components/JoinSection"));
const ExecutiveDirectorMessage = lazy(() => import("../Components/ExecutiveDirectorMessage"));
const Services = lazy(() => import("../Components/Services"));
const PowerSection = lazy(() => import("../Components/PowerSection"));


function Home() {
  return (
    <>
      <Hero />
      <LazySection minHeight={320}>
        <Suspense fallback={null}>
          <WhoWeAre />
        </Suspense>
      </LazySection>
      <LazySection minHeight={200}>
        <Suspense fallback={null}>
          <ButtonsSection />
        </Suspense>
      </LazySection>
      <LazySection minHeight={520}>
        <Suspense fallback={null}>
          <PremiumJoinSection />
        </Suspense>
      </LazySection>
      <LazySection minHeight={520}>
        <Suspense fallback={null}>
          <ExecutiveDirectorMessage />
        </Suspense>
      </LazySection>
      <LazySection minHeight={520}>
        <Suspense fallback={null}>
          <Services />
        </Suspense>
      </LazySection>
      <LazySection minHeight={320}>
        <Suspense fallback={null}>
          <PowerSection />
        </Suspense>
      </LazySection>
    </>
  );
}

export default Home;
