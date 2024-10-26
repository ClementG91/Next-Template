'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  requestPasswordResetSchema,
  RequestPasswordResetFormValues,
} from '@/lib/schemas/auth/request-password-reset';
import { requestPasswordReset } from '@/actions/auth';
import { FaEnvelope } from 'react-icons/fa';

export default function RequestPasswordResetForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const [remainingTime, setRemainingTime] = useState(30);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestPasswordResetFormValues>({
    resolver: zodResolver(requestPasswordResetSchema),
  });

  const onSubmit = async (data: RequestPasswordResetFormValues) => {
    if (isCooldown) return;
    setIsCooldown(true);
    setRemainingTime(30);
    setIsLoading(true);
    try {
      const response = await requestPasswordReset(data);
      if (response.success) {
        toast({
          title: 'Success',
          description: response.message,
        });
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
      setTimeout(() => setIsCooldown(false), 30000);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCooldown) {
      timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCooldown]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
      <h2 className="text-xl font-semibold text-center">Reset Your Password</h2>
      <p className="text-foreground/60 text-center">
        Please enter your email address to receive a password reset link.
      </p>
      <div>
        <Input type="email" placeholder="Email" {...register('email')} />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <Button
        type="submit"
        className="w-full text-white"
        disabled={isLoading || isCooldown}
      >
        {isLoading ? 'Loading...' : 'Send Reset Link'}
      </Button>
      {isCooldown && (
        <p className="text-center text-red-500">
          Please wait {remainingTime} seconds before requesting again.
        </p>
      )}
      <div className="flex items-center justify-center">
        <FaEnvelope className="mr-2 text-foreground/50" />
        <span className="text-foreground/50">
          We will send you an email with instructions.
        </span>
      </div>
    </form>
  );
}
