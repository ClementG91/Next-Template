'use server';

import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';

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

    return userGrowth.map(({ date, count }) => ({
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
