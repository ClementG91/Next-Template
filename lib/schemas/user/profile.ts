import * as z from 'zod';

export const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must contain at least 2 characters.' })
    .max(30, { message: 'Name must not exceed 30 characters.' })
    .optional(),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address.' })
    .optional(),
  image: z
    .string()
    .url({ message: 'Please enter a valid URL.' })
    .optional()
    .nullable(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
