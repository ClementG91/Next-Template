import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BackgroundBeams } from '@/components/ui/aceternityui/background-beams';

export function CallToAction() {
  return (
    <div className="relative overflow-hidden bg-foreground py-24 sm:py-32">
      <BackgroundBeams />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to build your Auth ?
          </h2>
          <p className="mt-6 text-lg leading-8 text-primary-foreground/80">
            Get started with our powerful auth template and build secure,
            scalable web applications in no time.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" variant="secondary">
              <Link href="/docs/getting-started">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/docs">Read the Docs</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
