import * as z from 'zod';

export const requestPasswordResetSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export type RequestPasswordResetFormValues = z.infer<
  typeof requestPasswordResetSchema
>;
