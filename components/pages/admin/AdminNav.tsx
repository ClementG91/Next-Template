'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { UsersIcon, Settings, ShieldAlert, Activity, Home } from 'lucide-react';

export default function AdminNav() {
  const pathname = usePathname();

  const navItems = [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: Home,
    },
    {
      title: 'Users',
      href: '/admin/users',
      icon: UsersIcon,
    },
    {
      title: 'Security',
      href: '/admin/security',
      icon: ShieldAlert,
    },
    {
      title: 'Settings',
      href: '/admin/settings',
      icon: Settings,
    },
    {
      title: 'Logs',
      href: '/admin/logs',
      icon: Activity,
    },
  ];

  return (
    <div className="border-b">
      <div className="container mx-auto">
        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'flex items-center gap-2',
                      pathname === item.href && 'bg-accent'
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
