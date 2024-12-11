'use server';

import { transporter } from '@/lib/nodemailer';
import {
  contactFormSchema,
  ContactFormValues,
} from '@/lib/schemas/contact/contact';
import { cookies } from 'next/headers';

const COOLDOWN_DURATION = 60000; // 60 seconds

export async function submitContactForm(formData: ContactFormValues) {
  // Validate the form data
  const result = contactFormSchema.safeParse(formData);
  if (!result.success) {
    return {
      success: false,
      message: 'Invalid input',
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { name, email, subject, message } = result.data;

  // Cooldown check
  const cookieStore = await cookies();
  const lastSubmission = cookieStore.get('lastContactSubmission');
  const now = Date.now();
  if (
    lastSubmission &&
    now - parseInt(lastSubmission.value) < COOLDOWN_DURATION
  ) {
    return {
      success: false,
      message: 'Please wait before sending another message.',
    };
  }

  // Update cooldown
  cookieStore.set('lastContactSubmission', now.toString(), {
    maxAge: COOLDOWN_DURATION / 1000,
  });

  try {
    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
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

    return { success: true, message: 'Message sent successfully' };
  } catch (error) {
    console.error('Error sending message:', error);
    return { success: false, message: 'Error sending message' };
  }
}
