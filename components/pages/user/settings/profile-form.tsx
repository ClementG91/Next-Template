'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { User } from '@prisma/client';
import React from 'react';
import { Session } from 'next-auth';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(30, { message: 'Name must not be longer than 30 characters.' })
    .optional(),
  email: z
    .string()
    .email({ message: 'Please enter a valid email.' })
    .optional(),
  image: z
    .string()
    .url({ message: 'Please enter a valid URL.' })
    .optional()
    .nullable(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

type UpdateUserResponse = {
  user?: User;
  error?: string;
};

async function updatedUser(
  userid: string,
  userData: Partial<User>
): Promise<UpdateUserResponse> {
  try {
    const response = await fetch('/api/user/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    const updatedUser = await response.json();
    return { user: updatedUser };
  } catch {
    return { error: 'Failed to update user due to an unexpected error.' };
  }
}

export { updatedUser };

type ProfileFormProps = {
  session: Session;
};

export function ProfileForm({ session }: ProfileFormProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState<Partial<ProfileFormValues>>({
    name: '',
    email: '',
    image: '',
  });
  const defaultValues: Partial<ProfileFormValues> = user;
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });
  const { setValue } = form;
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function getMe(): Promise<Partial<ProfileFormValues> | null> {
    try {
      const response = await fetch('/api/user/me');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  }

  React.useEffect(() => {
    getMe().then((response) => {
      if (response === null) {
        toast({
          title: 'Error',
          description: "You're not logged in.",
          variant: 'destructive',
        });
        return;
      }
      setUser(response as Partial<ProfileFormValues>);
      // Update form values with fetched user data
      Object.keys(response as Partial<ProfileFormValues>).forEach((key) => {
        setValue(
          key as keyof ProfileFormValues,
          response[key as keyof ProfileFormValues] as string
        );
      });
      setIsLoading(false);
    });
  }, [setValue]);

  async function onSubmit(data: ProfileFormValues) {
    if (!session || !session.user.id) {
      toast({
        title: 'Error',
        description: 'You are not logged in.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await updatedUser(session.user.id, data);
      if (response.error) {
        toast({
          title: 'Error',
          description: response.error,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Profile updated',
          description: 'Your profile has been successfully updated.',
          variant: 'default',
        });
        setUser(response.user as Partial<ProfileFormValues>);
      }
    } catch {
      toast({
        title: 'Error',
        description: 'An error occurred while updating the profile.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
          aria-label="profile-form-title"
        >
          <h1 id="profile-form-title" className="sr-only">
            Profile Form
          </h1>
          {/* Fields */}

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormControl>
                  {isLoading ? (
                    <Skeleton className="h-10 w-full rounded-md" />
                  ) : (
                    <Input {...field} id="name" />
                  )}
                </FormControl>
                <FormDescription>
                  It can be your real name or a pseudonym.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  {isLoading ? (
                    <Skeleton className="h-10 w-full rounded-md" />
                  ) : (
                    <Input placeholder={defaultValues.email} {...field} />
                  )}
                </FormControl>
                <FormDescription>This is your public email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage
                          src={
                            field.value
                              ? `/api/proxy?url=${encodeURIComponent(
                                  field.value
                                )}`
                              : undefined
                          }
                          alt="Profile Picture"
                        />
                        <AvatarFallback>
                          {user.name?.[0] || 'NT'}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <Input
                      className="max-w-md"
                      placeholder="Image URL"
                      value={field.value ?? ''}
                      onChange={(e) => field.onChange(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  This is your profile picture. Please enter the URL of an
                  image.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between items-center">
            <Button
              type="submit"
              className="text-white"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting ? 'Updating...' : 'Update Profile'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
