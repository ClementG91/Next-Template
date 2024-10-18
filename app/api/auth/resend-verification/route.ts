import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { transporter } from '@/lib/nodemailer';
import crypto from 'crypto';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { message: 'Email already verified' },
        { status: 400 }
      );
    }

    const verificationCode = crypto.randomInt(100000, 999999).toString();
    const verificationCodeExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

    await prisma.user.update({
      where: { id: user.id },
      data: { verificationCode, verificationCodeExpires },
    });

    const verificationLink = `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/auth/verify-email?email=${encodeURIComponent(
      email
    )}&code=${verificationCode}`;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'New verification code',
      html: `
        <p>Your new verification code is: <strong>${verificationCode}</strong>. It will expire in 24 hours.</p>
        <p>You can also click on the following link to verify your email: 
        <a href="${verificationLink}">Verify my email</a></p>
      `,
    });

    return NextResponse.json(
      { message: 'New verification code sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error resending verification code:', error);
    return NextResponse.json(
      {
        message: 'An error occurred while resending the verification code',
      },
      { status: 500 }
    );
  }
}
