import { NextResponse } from 'next/server';
import { transporter } from '@/lib/nodemailer';

const cooldowns = new Map<string, number>();

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Cooldown check
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const lastSubmission = cooldowns.get(ip) || 0;
    const now = Date.now();
    if (now - lastSubmission < 60000) {
      // 60 seconds cooldown
      return NextResponse.json(
        { message: 'Please wait before sending another message.' },
        { status: 429 }
      );
    }

    // Update cooldown
    cooldowns.set(ip, now);

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO, // The email address where you want to receive contact messages
      subject: `New contact message: ${subject}`,
      html: `
        <h1>New contact message</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { message: 'Error sending message' },
      { status: 500 }
    );
  }
}
