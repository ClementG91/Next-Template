'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  resetPasswordSchema,
  ResetPasswordFormValues,
} from '@/lib/schemas/auth/reset-password';
import { resetPassword } from '@/actions/auth';

export default function ResetPasswordForm({ token }: { token: string }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setIsLoading(true);
    try {
      const response = await resetPassword(token, data);
      if (response.success) {
        toast({
          title: 'Success',
          description: response.message,
        });
        router.push('/auth/signin');
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold text-center">Reset Your Password</h2>
      <p className="text-gray-600 text-center">
        Please enter your new password below.
      </p>
      <div>
        <Input
          type="password"
          placeholder="New Password"
          {...register('password')}
          className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <div>
        <Input
          type="password"
          placeholder="Confirm Password"
          {...register('confirmPassword')}
          className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <Button type="submit" className="w-full text-white" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Reset Password'}
      </Button>
    </form>
  );
}
