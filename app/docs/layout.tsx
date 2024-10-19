import { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';
import { SidebarNav } from '@/components/pages/user/settings/sidebar-nav';

export const metadata: Metadata = {
  title: 'Next Template - Documentation',
  description: 'Documentation for the Next Template project.',
};

const sidebarNavItems = [
  {
    title: 'Overview',
    href: '/docs',
  },
  {
    title: 'Authentication',
    href: '/docs/authentication',
  },
  {
    title: 'Database',
    href: '/docs/database',
  },
  {
    title: 'API Routes',
    href: '/docs/api-routes',
  },
  {
    title: 'Deployment',
    href: '/docs/deployment',
  },
];

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="min-h-screen container mx-auto">
      <div className="space-y-6 p-10 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Documentation</h2>
          <p className="text-muted-foreground">
            Comprehensive guide for the Next Template project.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
