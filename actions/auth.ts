'use server';

import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import { transporter } from '@/lib/nodemailer';
import crypto from 'crypto';
import { signUpSchema, SignUpFormValues } from '@/lib/schemas/auth/sign-up';
import { RequestPasswordResetFormValues } from '@/lib/schemas/auth/request-password-reset';
import { ResetPasswordFormValues } from '@/lib/schemas/auth/reset-password';

const prisma = new PrismaClient();

export async function signUp(formData: SignUpFormValues) {
  try {
    const validatedData = signUpSchema.parse(formData);
    const { name, email, password } = validatedData;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return {
        success: false,
        message: 'This email address is already in use',
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = crypto.randomInt(100000, 999999).toString();
    const verificationCodeExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

    const verificationLink = `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/auth/verify-email?email=${encodeURIComponent(
      email
    )}&code=${verificationCode}`;

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Verify your email address',
        html: `
          <p>Your verification code is: <strong>${verificationCode}</strong>. It will expire in 24 hours.</p>
          <p>You can also click on the following link to verify your email: 
          <a href="${verificationLink}">Verify my email</a></p>
        `,
      });

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          verificationCode,
          verificationCodeExpires,
          role: Role.USER,
        },
      });

      return {
        success: true,
        message:
          'User created successfully. Check your email for the verification code.',
        userId: newUser.id,
      };
    } catch (emailError) {
      console.error('Error sending verification email:', emailError);
      return {
        success: false,
        message: 'Registration failed. Unable to send verification email.',
      };
    }
  } catch (error) {
    console.error('Error during registration:', error);
    return { success: false, message: 'An error occurred during registration' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function requestPasswordReset(
  formData: RequestPasswordResetFormValues
) {
  const { email } = formData;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return {
      success: true,
      message:
        'If this email is registered, you will receive a password reset link.',
    };
  }
  if (!user.password) {
    return {
      success: false,
      message:
        'Password reset is not available for accounts created with a provider.',
    };
  }

  let resetToken;
  let existingUser;

  do {
    resetToken = crypto.randomBytes(32).toString('hex');
    existingUser = await prisma.user.findUnique({
      where: { resetToken },
    });
  } while (existingUser);

  const resetTokenExpires = new Date(Date.now() + 3600000); // 1 heure

  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetToken,
      resetTokenExpires,
    },
  });

  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?token=${resetToken}`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Password Reset Request',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });

  return { success: true, message: 'Password reset email sent' };
}

export async function resetPassword(
  token: string,
  formData: ResetPasswordFormValues
) {
  const { password } = formData;

  const user = await prisma.user.findUnique({
    where: { resetToken: token },
  });

  if (!user || !user.resetTokenExpires || user.resetTokenExpires < new Date()) {
    return { success: false, message: 'Invalid or expired token' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpires: null,
    },
  });

  return { success: true, message: 'Password has been reset successfully' };
}
