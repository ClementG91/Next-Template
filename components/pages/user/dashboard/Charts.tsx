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

interface ChartData {
  name: string;
  value: number;
}

interface GrowthData {
  date: string;
  count: number;
}

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--primary) / 0.8)',
  'hsl(var(--primary) / 0.6)',
  'hsl(var(--primary) / 0.4)',
  'hsl(var(--primary) / 0.2)',
];

export const Charts: React.FC = () => {
  const [userGrowth, setUserGrowth] = useState<ChartData[]>([]);
  const [providerData, setProviderData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [growthResponse, providerResponse] = await Promise.all([
          fetch('/api/users/growth'),
          fetch('/api/users/providers'),
        ]);

        if (!growthResponse.ok || !providerResponse.ok) {
          throw new Error('Error while retrieving data');
        }

        const growthData: GrowthData[] = await growthResponse.json();
        const providerData: ChartData[] = await providerResponse.json();

        setUserGrowth(
          growthData.map((item) => ({
            name: new Date(item.date).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            }),
            value: item.count,
          }))
        );

        setProviderData(providerData);
      } catch (err) {
        setError('Unable to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      <ChartCard
        title="User Growth"
        description="Evolution of user count by month"
      >
        {userGrowth.length > 1 ? (
          <LineChart data={userGrowth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip labelClassName="text-black" />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
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

      <ChartCard
        title="Monthly Activity"
        description="Number of users registered per month"
      >
        {userGrowth.length > 0 ? (
          <BarChart data={userGrowth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip labelClassName="text-black" />
            <Legend />
            <Bar dataKey="value" fill="hsl(var(--primary))" />
          </BarChart>
        ) : (
          <div className="flex items-center justify-center h-full">
            Not enough data to display the chart
          </div>
        )}
      </ChartCard>

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
            <Tooltip />
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
