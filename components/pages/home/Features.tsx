import { InfiniteMovingCards } from '@/components/ui/aceternityui/infinite-moving-cards';
import { FeaturesAnimated } from './FeaturesAnimated';

const features = [
  {
    quote: 'Security and flexibility for user authentication.',
    name: 'Next Auth',
    title: 'Authentication',
  },
  {
    quote: 'Accessible and customizable UI components.',
    name: 'Shadcn UI',
    title: 'UI Framework',
  },
  {
    quote: 'Captivating UI effects for enhanced user experience.',
    name: 'Aceternity UI / Magic UI',
    title: 'UI Effects',
  },
  {
    quote: 'Smooth and performant animations for dynamic interfaces.',
    name: 'Framer Motion',
    title: 'Animations',
  },
  {
    quote: 'Powerful schema validation and strong typing.',
    name: 'Zod',
    title: 'Data Validation',
  },
  {
    quote: 'Efficient form management with React.',
    name: 'React Hook Form',
    title: 'Form Management',
  },
  {
    quote: 'Type-safe ORM for simplified database access and migrations.',
    name: 'Prisma',
    title: 'ORM',
  },
  {
    quote: 'Robust and scalable database solution.',
    name: 'PostgreSQL',
    title: 'Database',
  },
  {
    quote: 'Flexible charting library for data visualization.',
    name: 'Recharts',
    title: 'Data Visualization',
  },
  {
    quote: 'Simplified theme and dark mode management.',
    name: 'Next Themes',
    title: 'Theming',
  },
];

export function Features() {
  return (
    <div>
      <div className="flex justify-center pt-12">
        <FeaturesAnimated />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 antialiased">
        <InfiniteMovingCards items={features} direction="right" speed="slow" />
      </div>
    </div>
  );
}
