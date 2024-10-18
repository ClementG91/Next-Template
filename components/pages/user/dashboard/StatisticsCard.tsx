'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

export const StatisticsCard: React.FC = () => {
  const [userCount, setUserCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch('/api/users/count');
        if (!response.ok) {
          throw new Error('Error while retrieving the number of users');
        }
        const data = await response.json();
        setUserCount(data.count);
      } catch (err) {
        setError('Unable to load statistics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
          <CardDescription>Total number of registered users</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <>
              <Skeleton className="h-9 w-[100px] mb-2" />
              <Skeleton className="h-4 w-[120px]" />
            </>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="text-3xl font-bold"
              >
                {userCount}
              </motion.div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
