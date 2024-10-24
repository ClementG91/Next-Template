'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
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
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  profileFormSchema,
  ProfileFormValues,
} from '@/lib/schemas/user/profile';
import { updateProfile, getProfile } from '@/actions/profile';

export function ProfileForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<Partial<ProfileFormValues>>({
    name: '',
    email: '',
    image: '',
  });
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: user,
  });
  const { setValue } = form;
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getProfile().then((response) => {
      if (!response.success) {
        toast({
          title: 'Error',
          description: response.message,
          variant: 'destructive',
        });
        return;
      }
      if (response.user) {
        setUser(response.user as Partial<ProfileFormValues>);
        // Update form values with fetched user data
        Object.keys(response.user).forEach((key) => {
          if (key in profileFormSchema.shape) {
            setValue(
              key as keyof ProfileFormValues,
              response.user[key as keyof ProfileFormValues] as string
            );
          }
        });
      }
      setIsLoading(false);
    });
  }, [setValue, toast]);

  async function onSubmit(data: ProfileFormValues) {
    setIsSubmitting(true);

    try {
      const response = await updateProfile(data);
      if (!response.success) {
        toast({
          title: 'Error',
          description: response.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Profile updated',
          description: 'Your profile has been successfully updated.',
          variant: 'default',
        });
        if (response.user) {
          setUser(response.user as Partial<ProfileFormValues>);
        }
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  <Input {...field} />
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
                      <AvatarFallback>{user.name?.[0] || 'NT'}</AvatarFallback>
                    </Avatar>
                  </div>
                  <Input
                    className="max-w-md"
                    placeholder="Image URL"
                    {...field}
                    value={field.value ?? ''}
                    disabled={isSubmitting}
                  />
                </div>
              </FormControl>
              <FormDescription>
                This is your profile picture. Please enter the URL of an image.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="text-white"
          disabled={isSubmitting || isLoading}
        >
          {isSubmitting ? 'Updating...' : 'Update Profile'}
        </Button>
      </form>
    </Form>
  );
}
