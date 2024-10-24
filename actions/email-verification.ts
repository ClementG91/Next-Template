'use server';

import { PrismaClient } from '@prisma/client';
import {
  verifyEmailSchema,
  VerifyEmailFormValues,
} from '@/lib/schemas/auth/verify-email';
import {
  resendVerificationSchema,
  ResendVerificationFormValues,
} from '@/lib/schemas/auth/resend-verification';
import { transporter } from '@/lib/nodemailer';
import crypto from 'crypto';

const prisma = new PrismaClient();

export async function verifyEmail(formData: VerifyEmailFormValues) {
  try {
    const validatedData = verifyEmailSchema.parse(formData);
    const { email, code } = validatedData;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    if (user.emailVerified) {
      return { success: false, message: 'Email already verified' };
    }

    if (user.verificationCode !== code) {
      return { success: false, message: 'Invalid verification code' };
    }

    if (
      !user.verificationCodeExpires ||
      user.verificationCodeExpires < new Date()
    ) {
      return { success: false, message: 'Verification code has expired' };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        verificationCode: null,
        verificationCodeExpires: null,
      },
    });

    return { success: true, message: 'Email verified successfully' };
  } catch (error) {
    console.error('Error during email verification:', error);
    return { success: false, message: 'Error during email verification' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function resendVerificationCode(
  formData: ResendVerificationFormValues
) {
  try {
    const validatedData = resendVerificationSchema.parse(formData);
    const { email } = validatedData;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    if (user.emailVerified) {
      return { success: false, message: 'Email already verified' };
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

    return {
      success: true,
      message: 'A new verification code has been sent to your email address',
    };
  } catch (error) {
    console.error('Error sending new verification code:', error);
    return { success: false, message: 'Failed to send new verification code' };
  } finally {
    await prisma.$disconnect();
  }
}
