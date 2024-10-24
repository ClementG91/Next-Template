'use client';

import { useState, useEffect, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useSearchParams } from 'next/navigation';
import {
  verifyEmailSchema,
  VerifyEmailFormValues,
} from '@/lib/schemas/auth/verify-email';
import {
  resendVerificationSchema,
  ResendVerificationFormValues,
} from '@/lib/schemas/auth/resend-verification';

function VerifyEmailFormContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(verifyEmailSchema),
  });

  const email = watch('email');

  useEffect(() => {
    if (searchParams) {
      const emailParam = searchParams.get('email');
      const codeParam = searchParams.get('code');
      if (emailParam) {
        setValue('email', emailParam);
      }
      if (codeParam) {
        setValue('code', codeParam);
      }
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: VerifyEmailFormValues) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Email verified successfully',
        });
        router.push('/auth/signin');
      } else {
        throw new Error(responseData.message || 'Verification failed');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Verification failed',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationCode = async () => {
    if (!email) {
      toast({
        title: 'Error',
        description: 'Please enter an email address',
        variant: 'destructive',
      });
      return;
    }

    setIsResending(true);

    try {
      const resendData: ResendVerificationFormValues = { email };
      const validatedData = resendVerificationSchema.parse(resendData);

      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast({
          title: 'Success',
          description:
            'A new verification code has been sent to your email address',
        });
      } else {
        throw new Error(
          responseData.message || 'Failed to send new verification code'
        );
      }
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'Failed to send new verification code',
        variant: 'destructive',
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-md">
      <h1 className="text-2xl font-bold text-center">Verify Your Email</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input type="email" placeholder="Email" {...register('email')} />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Input
            type="text"
            placeholder="Verification Code"
            {...register('code')}
          />
          {errors.code && (
            <p className="text-red-500 text-sm">{errors.code.message}</p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full text-white"
          disabled={isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify Email'}
        </Button>
      </form>
      <Button
        onClick={resendVerificationCode}
        className="w-full text-white"
        variant="outline"
        disabled={isResending}
      >
        {isResending ? 'Sending...' : 'Resend Verification Code'}
      </Button>
    </div>
  );
}

export default function VerifyEmailForm() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyEmailFormContent />
      </Suspense>
    </div>
  );
}
