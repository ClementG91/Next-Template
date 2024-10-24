'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { FaDiscord, FaGoogle, FaGithub } from 'react-icons/fa';
import { signInSchema, SignInFormValues } from '@/lib/schemas/auth/sign-in';

export default function SignInForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormValues) => {
    setIsLoading(true);
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      toast({
        title: 'Error',
        description: 'Incorrect email or password',
        variant: 'destructive',
      });
    } else {
      router.push('/dashboard');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="space-y-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input type="email" placeholder="Email" {...register('email')} />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Sign In'}
          </Button>
        </form>
        <div className="flex justify-between items-center">
          <Button
            onClick={() => signIn('discord', { callbackUrl: '/dashboard' })}
            variant="outline"
            className="flex-1 mr-2"
          >
            <FaDiscord className="mr-2 h-4 w-4" /> Discord
          </Button>
          <Button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            variant="outline"
            className="flex-1 mx-2"
          >
            <FaGoogle className="mr-2 h-4 w-4" /> Google
          </Button>
          <Button
            onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
            variant="outline"
            className="flex-1 ml-2"
          >
            <FaGithub className="mr-2 h-4 w-4" /> GitHub
          </Button>
        </div>
        <p className="text-center">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
