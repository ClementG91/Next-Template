'use server';

import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import {
  deleteAccountSchema,
  DeleteAccountFormData,
} from '@/lib/schemas/user/delete-account';

const prisma = new PrismaClient();

export async function deleteAccount(formData: DeleteAccountFormData) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { success: false, message: 'Unauthorized' };
  }

  try {
    const validatedData = deleteAccountSchema.parse(formData);

    if (validatedData.confirmText !== 'DELETE') {
      return { success: false, message: 'Invalid confirmation' };
    }

    await prisma.user.delete({
      where: { id: session.user.id },
    });

    return { success: true, message: 'Account deleted successfully' };
  } catch (error) {
    console.error('Error deleting user account:', error);
    return { success: false, message: 'Error deleting account' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function downloadAccountData() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { success: false, message: 'Unauthorized' };
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
      return { success: false, message: 'User not found' };
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

    return {
      success: true,
      data: fullText,
      filename: 'user_data.txt',
      contentType: 'text/plain; charset=utf-8',
    };
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return { success: false, message: 'Internal server error' };
  } finally {
    await prisma.$disconnect();
  }
}
