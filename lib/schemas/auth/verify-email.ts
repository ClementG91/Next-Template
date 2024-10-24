import * as z from 'zod';

export const verifyEmailSchema = z.object({
  email: z.string().email('Invalid email address'),
  code: z.string().length(6, 'Verification code must contain 6 characters'),
});

export type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;
