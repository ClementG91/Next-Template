'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { signOut } from 'next-auth/react';

const deleteAccountSchema = z.object({
  confirmText: z.literal('DELETE', {
    errorMap: () => ({ message: "Please type 'DELETE' to confirm" }),
  }),
});

type DeleteAccountFormData = z.infer<typeof deleteAccountSchema>;

export function AccountActions() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DeleteAccountFormData>({
    resolver: zodResolver(deleteAccountSchema),
  });

  const onDeleteAccount = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    toast({
      title: 'Deleting account',
      description: 'Please wait while we process your request.',
    });

    try {
      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toast({
          title: 'Account deleted',
          description: 'Your account has been successfully deleted.',
        });
        await signOut({ callbackUrl: '/' });
      } else {
        throw new Error('Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete account. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      reset();
    }
  };

  const onDownloadData = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    toast({
      title: 'Downloading data',
      description: 'Please wait while we prepare your data.',
    });

    try {
      const response = await fetch('/api/user/data', {
        headers: {
          'Content-Type': 'text/plain',
        },
      });
      if (response.ok) {
        const text = await response.text();
        const blob = new Blob([text], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'user_data.txt';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        toast({
          title: 'Data downloaded',
          description: 'Your account data has been downloaded successfully.',
        });
      } else {
        throw new Error('Failed to download data');
      }
    } catch (error) {
      console.error('Error downloading data:', error);
      toast({
        title: 'Error',
        description: 'Failed to download account data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <Button
          className="text-white"
          onClick={onDownloadData}
          disabled={isDownloading}
        >
          {isDownloading ? 'Downloading...' : 'Download Account Data'}
        </Button>
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to delete your account?
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone. Please type &apos;DELETE&apos; to
                confirm.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onDeleteAccount)}>
              <Input
                {...register('confirmText')}
                placeholder="Type DELETE to confirm"
              />
              {errors.confirmText && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.confirmText.message}
                </p>
              )}
              <DialogFooter className="mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="destructive"
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete Account'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
