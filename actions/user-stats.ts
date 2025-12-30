'use server';

import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { UserGrowthData } from '@/types/prisma';

const prisma = new PrismaClient();

export async function getUserCount() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    const count = await prisma.user.count();
    return count;
  } catch (error) {
    console.error('Error retrieving user count:', error);
    throw new Error('Server error');
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUserGrowth() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    const userGrowth = await prisma.$queryRaw<{ date: Date; count: number }[]>`
      WITH RECURSIVE dates(date) AS (
        SELECT DATE_TRUNC('month', MIN("createdAt"))::date FROM "User"
        UNION ALL
        SELECT (date + INTERVAL '1 month')::date
        FROM dates
        WHERE date <= DATE_TRUNC('month', CURRENT_DATE)
      )
      SELECT dates.date, COALESCE(COUNT(u."id"), 0)::integer AS count
      FROM dates
      LEFT JOIN "User" u ON DATE_TRUNC('month', u."createdAt") = dates.date
      GROUP BY dates.date
      ORDER BY dates.date ASC
      LIMIT 13
    `;

    return userGrowth.map(({ date, count }: UserGrowthData) => ({
      date: date.toISOString(),
      count,
    }));
  } catch (error) {
    console.error('Error retrieving user growth data:', error);
    throw new Error('Server error');
  } finally {
    await prisma.$disconnect();
  }
}

export async function getProviderData() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    const providerData = await prisma.$queryRaw<
      { name: string; value: number }[]
    >`
      SELECT 
        COALESCE(provider, 'credentials') AS name, 
        COUNT(*)::integer AS value
      FROM (
        SELECT provider FROM "Account"
        UNION ALL
        SELECT 'credentials' AS provider FROM "User" WHERE "User"."password" IS NOT NULL
      ) AS combined_providers
      GROUP BY COALESCE(provider, 'credentials')
    `;

    return providerData;
  } catch (error) {
    console.error('Error retrieving provider data:', error);
    throw new Error('Server error');
  } finally {
    await prisma.$disconnect();
  }
}

export async function getAdminStats() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  try {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const yesterday = new Date(now.setDate(now.getDate() - 1));

    const [totalUsers, activeSessions, securityStats, monthlyStats] =
      await Promise.all([
        // Total users count
        prisma.user.count(),

        // Active sessions count (not expired)
        prisma.session.count({
          where: {
            expires: {
              gt: new Date(),
            },
          },
        }),

        // Security related stats
        prisma.user.aggregate({
          _count: {
            _all: true,
            verificationToken: true,
            resetToken: true,
          },
          where: {
            OR: [
              {
                verificationToken: { not: null },
                verificationCodeExpires: { gt: yesterday },
              },
              {
                resetToken: { not: null },
                resetTokenExpires: { gt: yesterday },
              },
            ],
          },
        }),

        // Monthly growth stats
        prisma.user.aggregate({
          _count: {
            _all: true,
          },
          where: {
            createdAt: {
              gte: firstDayOfMonth,
            },
          },
        }),
      ]);

    // Calculate percentages and trends
    const activeSessionsPercentage = (
      (activeSessions / totalUsers) *
      100
    ).toFixed(1);

    return {
      totalUsers,
      activeSessions: {
        count: activeSessions,
        percentage: `${activeSessionsPercentage}%`,
      },
      securityAlerts: {
        total: securityStats._count._all,
        pendingVerifications: securityStats._count.verificationToken,
        pendingResets: securityStats._count.resetToken,
      },
      userGrowth: {
        thisMonth: monthlyStats._count._all,
        percentage:
          totalUsers > 0
            ? ((monthlyStats._count._all / totalUsers) * 100).toFixed(1) + '%'
            : '0%',
      },
    };
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    throw new Error('Failed to fetch admin statistics');
  } finally {
    await prisma.$disconnect();
  }
}
