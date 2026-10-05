import { HeroSlider } from '@/components/sections/home/HeroSlider';
import { FeatureSlideshow } from '@/components/sections/home/FeatureSlideshow';
import { ProgramsSlider } from '@/components/sections/home/ProgramsSlider';
import { PrincipalMessage } from '@/components/sections/home/PrincipalMessage';
import { PhilosophyEditorial } from '@/components/sections/home/PhilosophyEditorial';
import { StatsBar } from '@/components/sections/home/StatsBar';
import { NewsSection } from '@/components/sections/home/NewsSection';
import { TestimonialsSection } from '@/components/sections/home/TestimonialsSection';

export default function Home() {
  return (
    <>
      <HeroSlider />
      <FeatureSlideshow />
      <ProgramsSlider />
      <PrincipalMessage />
      <PhilosophyEditorial />
      <StatsBar />
      <NewsSection />
      <TestimonialsSection />
    </>
  );
}
