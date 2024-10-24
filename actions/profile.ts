'use server';

import { PrismaClient } from '@prisma/client';
import {
  profileFormSchema,
  ProfileFormValues,
} from '@/lib/schemas/user/profile';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';

const prisma = new PrismaClient();

export async function updateProfile(formData: ProfileFormValues) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false, message: 'Unauthorized' };
  }

  try {
    // Server-side validation
    const validatedData = profileFormSchema.parse(formData);

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: validatedData,
    });

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error('Error updating user:', error);
    return { success: false, message: 'Error updating profile' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function getProfile() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false, message: 'Unauthorized' };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    return { success: true, user };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return { success: false, message: 'Error fetching user data' };
  } finally {
    await prisma.$disconnect();
  }
}
