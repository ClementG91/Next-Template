import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UsersIcon, Settings, ShieldAlert, TrendingUp } from 'lucide-react';
import { getAdminStats } from '@/actions/user-stats';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';

async function AdminStats() {
  const stats = await getAdminStats();

  const adminStats = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: UsersIcon,
      description: 'Registered users',
    },
    {
      title: 'Active Sessions',
      value: stats.activeSessions.count.toLocaleString(),
      icon: Settings,
      description: `${stats.activeSessions.percentage} of users online`,
    },
    {
      title: 'Security Alerts',
      value: stats.securityAlerts.total.toString(),
      icon: ShieldAlert,
      description: `${stats.securityAlerts.pendingVerifications} verifications, ${stats.securityAlerts.pendingResets} resets`,
    },
    {
      title: 'Monthly Growth',
      value: stats.userGrowth.thisMonth.toString(),
      icon: TrendingUp,
      description: `${stats.userGrowth.percentage} growth this month`,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {adminStats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function AdminStatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-[60px] mb-2" />
            <Skeleton className="h-3 w-[140px]" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<AdminStatsSkeleton />}>
        <AdminStats />
      </Suspense>
    </div>
  );
}
