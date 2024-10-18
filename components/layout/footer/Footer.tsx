import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-background p-6 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Next Template. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/privacy">Privacy Policy</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/terms">Terms of Use</Link>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
