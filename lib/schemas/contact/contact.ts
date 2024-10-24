import * as z from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must contain at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z
    .string()
    .min(5, { message: 'Subject must contain at least 5 characters.' }),
  message: z
    .string()
    .min(10, { message: 'Message must contain at least 10 characters.' }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
