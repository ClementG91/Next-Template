import { NextResponse } from 'next/server';
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import { transporter } from '@/lib/nodemailer';
import crypto from 'crypto';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: 'This email is already in use' },
        { status: 400 }
      );
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

      // Create the user only after successfully sending the email
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

      return NextResponse.json(
        {
          message:
            'User created successfully. Check your email for the verification code.',
          userId: newUser.id,
        },
        { status: 201 }
      );
    } catch (emailError) {
      console.error('Error sending verification email:', emailError);
      return NextResponse.json(
        {
          message: 'Registration failed. Unable to send verification email.',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json(
      { message: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}
