import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { TextGenerateEffect } from '../../ui/text-generate-effect';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-background pt-16 sm:pt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-6">
            <TextGenerateEffect words="Next Template" />
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            Powerful authentication solution with Next Auth, Shadcn UI,
            Aceternity UI, Prisma, and PostgreSQL.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button className="font-semibold text-white" asChild>
              <Link href="/auth/signin">Try Auth Demo</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://github.com/ClementG91/Next-Template.git">
                View on GitHub
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
