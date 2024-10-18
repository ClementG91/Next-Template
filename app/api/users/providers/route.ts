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

    return NextResponse.json(providerData, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error retrieving provider data:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
