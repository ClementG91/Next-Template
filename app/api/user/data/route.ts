import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Convert user data to a formatted text string
    const userDataText = Object.entries(user)
      .map(([key, value]) => {
        if (key === 'emailVerified' || key === 'createdAt') {
          return `${key}: ${
            value ? new Date(value).toLocaleString() : 'Not set'
          }`;
        }
        return `${key}: ${value || 'Not set'}`;
      })
      .join('\r\n');

    const gdprInfo = `
GDPR Information:
- You have the right to access your personal data.
- You have the right to rectify your data if it's inaccurate or incomplete.
- You have the right to request the deletion of your personal data.
- You have the right to restrict or object to the processing of your data.
- You have the right to data portability.
- You have the right to withdraw your consent at any time.

For any questions or requests regarding your personal data, please contact our Data Protection Officer at dpo@example.com.
    `.replace(/\n/g, '\r\n');

    const fullText = `Your Personal Data:\r\n\r\n${userDataText}\r\n\r\n${gdprInfo}`;

    return new NextResponse(fullText, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': 'attachment; filename=user_data.txt',
      },
    });
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
