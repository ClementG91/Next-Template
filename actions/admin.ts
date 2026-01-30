'use server';

import { PrismaClient, Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { revalidatePath } from 'next/cache';
import { ZodError } from 'zod';
import { userSchema, User } from '@/lib/schemas/admin/users';
import { UserSearchResult } from '@/types/prisma';

const prisma = new PrismaClient();

async function checkAdminRole() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
  return session.user.id;
}

export async function getUsers({
  page = 1,
  pageSize = 10,
  sortColumn = 'email',
  sortDirection = 'asc',
  searchTerm = '',
}: {
  page?: number;
  pageSize?: number;
  sortColumn?: keyof User;
  sortDirection?: 'asc' | 'desc';
  searchTerm?: string;
}) {
  await checkAdminRole();

  try {
    const skip = (page - 1) * pageSize;
    const where: Prisma.UserWhereInput = searchTerm
      ? {
          OR: [
            { name: { contains: searchTerm, mode: Prisma.QueryMode.insensitive } },
            { email: { contains: searchTerm, mode: Prisma.QueryMode.insensitive } },
          ],
        }
      : {};

    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
        orderBy: { [sortColumn]: sortDirection },
        skip,
        take: pageSize,
      }),
      prisma.user.count({ where }),
    ]);

    return {
      users: users.map((user: UserSearchResult) => userSchema.parse(user)),
      totalCount,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Data validation error:', error.errors);
      throw new Error('Invalid user data retrieved from database');
    }
    throw error;
  }
}

export async function updateUserRole(
  userId: string,
  newRole: 'USER' | 'ADMIN' | 'MODERATOR'
) {
  const adminId = await checkAdminRole();

  if (userId === adminId) {
    throw new Error("You can't change your own role");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role: newRole },
  });

  revalidatePath('/admin/users');
}

export async function deleteUser(userId: string) {
  const adminId = await checkAdminRole();

  if (userId === adminId) {
    throw new Error("You can't delete your own account");
  }

  await prisma.user.delete({
    where: { id: userId },
  });

  revalidatePath('/admin/users');
}
