import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';

const prisma = new PrismaClient();

export const revalidate = 3600; // Revalidate cache every hour

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userGrowth = await prisma.$queryRaw<{ date: Date; count: number }[]>`
      WITH RECURSIVE dates(date) AS (
        SELECT DATE_TRUNC('month', MIN("createdAt"))::date FROM "User"
        UNION ALL
        SELECT (date + INTERVAL '1 month')::date
        FROM dates
        WHERE date < DATE_TRUNC('month', CURRENT_DATE)
      )
      SELECT dates.date, COALESCE(COUNT(u."id"), 0)::integer AS count
      FROM dates
      LEFT JOIN "User" u ON DATE_TRUNC('month', u."createdAt") = dates.date
      GROUP BY dates.date
      ORDER BY dates.date ASC
      LIMIT 12
    `;

    const formattedUserGrowth = userGrowth.map(({ date, count }) => ({
      date: date.toISOString(),
      count: count,
    }));

    return NextResponse.json(formattedUserGrowth, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error retrieving user growth data:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
