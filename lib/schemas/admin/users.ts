import * as z from 'zod';

export const roleSchema = z.enum(['USER', 'ADMIN', 'MODERATOR']);

export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().email(),
  role: roleSchema,
});

export type User = z.infer<typeof userSchema>;
export type Role = z.infer<typeof roleSchema>;
