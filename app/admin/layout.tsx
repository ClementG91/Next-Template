import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { SidebarNav } from '@/components/ui/sidebar-nav';
import { Separator } from '@/components/ui/separator';

const sidebarNavItems = [
  {
    title: 'Dashboard',
    href: '/admin',
  },
  {
    title: 'Users',
    href: '/admin/users',
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen container mx-auto">
      <div className="space-y-6 p-10 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Admin Dashboard</h2>
          <p className="text-muted-foreground">
            Manage your application, users, and system settings.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-4xl">
            <Suspense
              fallback={
                <div className="space-y-4">
                  <Skeleton className="h-8 w-[200px]" />
                  <Skeleton className="h-[500px] w-full" />
                </div>
              }
            >
              {children}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
