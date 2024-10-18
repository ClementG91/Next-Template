import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <div className="-mt-24 grid h-screen place-content-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-primary">404</h1>

        <p className="text-2xl font-bold tracking-tight text-muted-foreground sm:text-4xl">
          Uh-oh!
        </p>

        <p className="my-2">We can&apos;t find that page.</p>

        <Link
          href="/"
          className=" 
          items-center justify-center"
        >
          <Button className="items-center">Go Back Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
