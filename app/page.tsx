import { Hero } from '@/components/pages/home/Hero';
import { Features } from '@/components/pages/home/Features';
import { CallToAction } from '@/components/pages/home/CallToAction';
import { FAQ } from '@/components/pages/home/FAQ';

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <CallToAction />
      <FAQ />
    </main>
  );
}
