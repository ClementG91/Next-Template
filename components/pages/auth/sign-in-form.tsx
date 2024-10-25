'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });

  const showErrorToast = useCallback(
    (errorMessage: string) => {
      toast({
        title: 'Authentication Error',
        description: errorMessage,
        variant: 'destructive',
        duration: 5000,
      });
    },
    [toast]
  );

  useEffect(() => {
    const error = searchParams.get('error');
    const provider = searchParams.get('provider');

    if (error) {
      let errorMessage = '';
      switch (error) {
        case 'existing_password_account':
          errorMessage =
            'You already have an account with a password. Please sign in using your email and password.';
          break;
        case 'existing_provider':
          errorMessage = `You are already registered with ${provider}. Please sign in using that method.`;
          break;
        default:
          errorMessage = 'An authentication error occurred. Please try again.';
      }
      setTimeout(() => {
        showErrorToast(errorMessage);
        // Supprimer l'erreur de l'URL
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('error');
        newUrl.searchParams.delete('provider');
        window.history.replaceState({}, '', newUrl.toString());
      }, 100);
    }
  }, [searchParams, showErrorToast]);

  const onSubmit = async (data: SignInFormValues) => {
    setIsLoading(true);
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        let errorMessage = 'An authentication error occurred.';
        switch (result.error) {
          case 'CredentialsSignin':
            errorMessage = 'Invalid email or password. Please try again.';
            break;
        }
        showErrorToast(errorMessage);
      } else if (result?.ok) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      showErrorToast('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProviderSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: '/dashboard' });
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
            onClick={() => handleProviderSignIn('discord')}
            variant="outline"
            className="flex-1 mr-2"
            disabled={isLoading}
          >
            <FaDiscord className="mr-2 h-4 w-4" /> Discord
          </Button>
          <Button
            onClick={() => handleProviderSignIn('google')}
            variant="outline"
            className="flex-1 mx-2"
            disabled={isLoading}
          >
            <FaGoogle className="mr-2 h-4 w-4" /> Google
          </Button>
          <Button
            onClick={() => handleProviderSignIn('github')}
            variant="outline"
            className="flex-1 ml-2"
            disabled={isLoading}
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
