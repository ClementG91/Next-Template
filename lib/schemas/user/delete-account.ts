import * as z from 'zod';

export const deleteAccountSchema = z.object({
  confirmText: z.literal('DELETE', {
    errorMap: () => ({ message: "Please type 'DELETE' to confirm" }),
  }),
});

export type DeleteAccountFormData = z.infer<typeof deleteAccountSchema>;
