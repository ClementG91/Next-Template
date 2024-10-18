'use client';

import { useSession } from 'next-auth/react';
import { ProfileCard } from '@/components/pages/user/dashboard/ProfileCard';
import { StatisticsCard } from '@/components/pages/user/dashboard/StatisticsCard';
import { QuickActionsCard } from '@/components/pages/user/dashboard/QuickActionsCard';
import { Charts } from '@/components/pages/user/dashboard/Charts';

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to your Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ProfileCard session={session} />
        <StatisticsCard />
        <QuickActionsCard />
      </div>

      <Charts />
    </div>
  );
}
