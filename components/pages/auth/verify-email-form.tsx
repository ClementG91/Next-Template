'use client';

import { useState, useEffect, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useSearchParams } from 'next/navigation';

const schema = z.object({
  email: z.string().email('Adresse e-mail invalide'),
  code: z
    .string()
    .length(6, 'Le code de vérification doit contenir 6 caractères'),
});

type FormData = z.infer<typeof schema>;

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
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const email = watch('email');

  useEffect(() => {
    const emailParam = searchParams.get('email');
    const codeParam = searchParams.get('code');
    if (emailParam) {
      setValue('email', emailParam);
    }
    if (codeParam) {
      setValue('code', codeParam);
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: FormData) => {
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
          title: 'Succès',
          description: 'E-mail vérifié avec succès',
        });
        router.push('/auth/signin');
      } else {
        throw new Error(responseData.message || 'La vérification a échoué');
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description:
          error instanceof Error ? error.message : 'La vérification a échoué',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationCode = async () => {
    if (!email) {
      toast({
        title: 'Erreur',
        description: 'Veuillez entrer une adresse e-mail',
        variant: 'destructive',
      });
      return;
    }

    setIsResending(true);

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast({
          title: 'Succès',
          description:
            'Un nouveau code de vérification a été envoyé à votre adresse e-mail',
        });
      } else {
        throw new Error(
          responseData.message || "Échec de l'envoi du nouveau code"
        );
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description:
          error instanceof Error
            ? error.message
            : "Échec de l'envoi du nouveau code",
        variant: 'destructive',
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-md">
      <h1 className="text-2xl font-bold text-center">Vérifiez votre e-mail</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input type="email" placeholder="E-mail" {...register('email')} />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Input
            type="text"
            placeholder="Code de vérification"
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
          {isLoading ? 'Vérification en cours...' : "Vérifier l'e-mail"}
        </Button>
      </form>
      <Button
        onClick={resendVerificationCode}
        className="w-full text-white"
        variant="outline"
        disabled={isResending}
      >
        {isResending ? 'Envoi en cours...' : 'Renvoyer le code de vérification'}
      </Button>
    </div>
  );
}

export default function VerifyEmailForm() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Suspense fallback={<div>Chargement...</div>}>
        <VerifyEmailFormContent />
      </Suspense>
    </div>
  );
}
