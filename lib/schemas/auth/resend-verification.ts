import * as z from 'zod';

export const resendVerificationSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export type ResendVerificationFormValues = z.infer<
  typeof resendVerificationSchema
>;
