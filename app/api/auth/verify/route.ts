import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyEmailSchema } from '@/lib/schemas/auth/verify-email';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body
    const result = verifyEmailSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          message: 'Invalid input',
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email, code } = result.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { message: 'Email already verified' },
        { status: 400 }
      );
    }

    if (user.verificationCode !== code) {
      return NextResponse.json(
        { message: 'Invalid verification code' },
        { status: 400 }
      );
    }

    if (
      !user.verificationCodeExpires ||
      user.verificationCodeExpires < new Date()
    ) {
      return NextResponse.json(
        { message: 'Verification code has expired' },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        verificationCode: null,
        verificationCodeExpires: null,
      },
    });

    return NextResponse.json(
      { message: 'Email verified successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error during email verification:', error);
    return NextResponse.json(
      { message: 'Error during email verification' },
      { status: 500 }
    );
  }
}
