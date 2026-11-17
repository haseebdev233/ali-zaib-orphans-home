import { lazy, Suspense } from 'react';
import Hero from '../Components/Hero';
import LazySection from '../Components/LazySection';
import ProgramManagerMessage from '../Components/ProgramManagerMessage';
import DonationAccounts from '../Components/DonationAccounts';
import { homeDefaults } from '../data/siteContent';
import { useDonationDetails } from '../data/useDonationDetails';
import { usePageContent } from '../data/usePageContent';

const WhoWeAre = lazy(() => import('../Components/WhoWeAre'));
const ButtonsSection = lazy(() => import('../Components/ButtonsSection'));
const PremiumJoinSection = lazy(() => import('../Components/JoinSection'));
const ExecutiveDirectorMessage = lazy(() => import('../Components/ExecutiveDirectorMessage'));
const Services = lazy(() => import('../Components/Services'));

export default function Home() {
  const content = usePageContent('home', homeDefaults);
  const details = useDonationDetails();
  return (
    <main>
      <Hero content={content} />
      <LazySection minHeight={320}>
        <Suspense fallback={null}><WhoWeAre content={content} /></Suspense>
      </LazySection>
      <LazySection minHeight={200}>
        <Suspense fallback={null}><ButtonsSection /></Suspense>
      </LazySection>
      <LazySection minHeight={520}>
        <Suspense fallback={null}><PremiumJoinSection content={content} /></Suspense>
      </LazySection>
      <LazySection minHeight={520}>
        <Suspense fallback={null}><ExecutiveDirectorMessage content={content} /></Suspense>
      </LazySection>
      <ProgramManagerMessage content={content} />
      <LazySection minHeight={520}>
        <Suspense fallback={null}><Services content={content} /></Suspense>
      </LazySection>
      <div className="py-5 bg-light">
        <div className="container"><DonationAccounts details={details} heading="Bank Details" /></div>
      </div>
    </main>
  );
}
