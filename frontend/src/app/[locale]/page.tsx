import Hero from '@/components/sections/Hero';
import TrustedPartners from '@/components/sections/TrustedPartners';
import AboutUs from '@/components/sections/AboutUs';
import MissionVision from '@/components/sections/MissionVision';
import Services from '@/components/sections/Services';
import TrackingPreview from '@/components/sections/TrackingPreview';
import Testimonials from '@/components/sections/Testimonials';
import Cta from '@/components/sections/Cta';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedPartners />
      <AboutUs />
      <MissionVision />
      <Services />
      <TrackingPreview />
      <Testimonials />
      <Cta />
    </>
  );
}
