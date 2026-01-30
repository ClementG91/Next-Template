import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { ChartCard } from '@/components/pages/user/dashboard/ChartCard';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { getUserGrowth, getProviderData } from '@/actions/user-stats';
import { UserGrowthResult } from '@/types/prisma';

// Define interfaces for chart data
interface ChartData {
  name: string;
  value: number;
}

// Define colors for the pie chart
const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--primary) / 0.8)',
  'hsl(var(--primary) / 0.6)',
  'hsl(var(--primary) / 0.4)',
  'hsl(var(--primary) / 0.2)',
];

export const Charts: React.FC = () => {
  // State variables for chart data and loading/error states
  const [userGrowth, setUserGrowth] = useState<ChartData[]>([]);
  const [providerData, setProviderData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [growthData, providerData] = await Promise.all([
          getUserGrowth(),
          getProviderData(),
        ]);

        setUserGrowth(
          growthData
            .map((item: UserGrowthResult): ChartData => ({
              name: item.date,
              value: item.count,
            }))
            .sort(
              (a: ChartData, b: ChartData) => new Date(a.name).getTime() - new Date(b.name).getTime()
            )
        );

        setProviderData(providerData);
      } catch (err) {
        console.error(err);
        toast({
          title: 'Error',
          description: 'Unable to load chart data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  // Function to format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  // Function to format numbers
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  // Display loading skeletons while data is being fetched
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Skeleton for User Growth chart */}
        <ChartCard
          title="User Growth"
          description="Evolution of user count by month"
        >
          <div className="w-full h-[300px] flex flex-col justify-between">
            <Skeleton className="h-[200px] w-full" />
            <div className="flex justify-between mt-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-8" />
              ))}
            </div>
            <Skeleton className="h-4 w-full mt-2" />
          </div>
        </ChartCard>
        {/* Skeleton for Monthly Activity chart */}
        <ChartCard
          title="Monthly Activity"
          description="Number of users registered per month"
        >
          <div className="w-full h-[300px] flex items-end justify-between">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-[150px] w-[15%]" />
            ))}
          </div>
        </ChartCard>
        {/* Skeleton for Provider Distribution chart */}
        <ChartCard
          title="Provider Distribution"
          description="Breakdown of login methods"
        >
          <div className="w-full h-[300px] flex items-center justify-center">
            <Skeleton className="h-[200px] w-[200px] rounded-full" />
          </div>
        </ChartCard>
      </motion.div>
    );
  }

  // Render charts when data is available
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      {/* User Growth Line Chart */}
      <ChartCard
        title="User Growth"
        description="Evolution of user count by month"
      >
        {userGrowth.length > 1 ? (
          <LineChart data={userGrowth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tickFormatter={formatDate}
              angle={-45}
              textAnchor="end"
              height={70}
            />
            <YAxis tickFormatter={formatNumber} />
            <Tooltip
              labelFormatter={formatDate}
              formatter={(value: number) => [formatNumber(value), 'Users']}
              labelClassName="text-black"
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              name="Users"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
            />
          </LineChart>
        ) : (
          <div className="flex items-center justify-center h-full">
            Not enough data to display the chart
          </div>
        )}
      </ChartCard>

      {/* Monthly Activity Bar Chart */}
      <ChartCard
        title="Monthly Activity"
        description="Number of users registered per month"
      >
        {userGrowth.length > 0 ? (
          <BarChart data={userGrowth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tickFormatter={formatDate}
              angle={-45}
              textAnchor="end"
              height={70}
            />
            <YAxis tickFormatter={formatNumber} />
            <Tooltip
              labelFormatter={formatDate}
              formatter={(value: number) => [formatNumber(value), 'Users']}
              labelClassName="text-black"
            />
            <Legend />
            <Bar dataKey="value" name="Users" fill="hsl(var(--primary))" />
          </BarChart>
        ) : (
          <div className="flex items-center justify-center h-full">
            Not enough data to display the chart
          </div>
        )}
      </ChartCard>

      {/* Provider Distribution Pie Chart */}
      <ChartCard
        title="Provider Distribution"
        description="Breakdown of login methods"
      >
        {providerData.length > 0 ? (
          <PieChart>
            <Pie
              data={providerData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="hsl(var(--primary))"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {providerData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [formatNumber(value), 'Users']}
            />
            <Legend />
          </PieChart>
        ) : (
          <div className="flex items-center justify-center h-full">
            Not enough data to display the chart
          </div>
        )}
      </ChartCard>
    </motion.div>
  );
};
