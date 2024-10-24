import * as z from 'zod';

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must contain at least 6 characters'),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
