'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/layout/navbar/theme-toggle';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Menu,
  Info,
  Mail,
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import Logo from '@/components/Logo';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const NavItems = () => (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center">
            Documentation <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href="/docs">Overview</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/docs/authentication">Authentication</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/docs/database">Database Management</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/docs/api-routes">API Routes</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/docs/deployment">Deployment</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button variant="ghost" asChild>
        <Link href="/about" className="flex items-center">
          <Info className="mr-2 h-4 w-4" />
          About
        </Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/contact" className="flex items-center">
          <Mail className="mr-2 h-4 w-4" />
          Contact
        </Link>
      </Button>
    </>
  );

  const UserMenu = () => {
    const proxyImageUrl = session?.user?.image
      ? `/api/proxy?url=${encodeURIComponent(session.user.image)}`
      : undefined;

    return (
      <>
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={proxyImageUrl}
                  alt={session.user?.name ?? "User's avatar"}
                />
                <AvatarFallback>
                  {session.user?.name?.[0] ?? 'NT'}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="flex items-center">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => signOut()}
                className="flex items-center"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button className="font-semibold text-white" asChild>
            <Link href="/auth/signin">Sign in</Link>
          </Button>
        )}
      </>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-background transition-all duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <Link href="/" className="text-xl font-bold flex items-center">
        <Logo className="h-8 w-8 mr-2" />
        Next Template
      </Link>
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-4">
          <NavItems />
          <UserMenu />
        </div>
        <ThemeToggle />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col items-center space-y-4">
              <UserMenu />
              <NavItems />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
