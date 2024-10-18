import { Separator } from '@/components/ui/separator';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { AccountActions } from '@/components/pages/user/settings/AccountActions';

export default async function SettingsAccountPage() {
  const session = await getServerSession(authOptions);
  if (!session) return notFound();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Download your data or delete your account.
        </p>
      </div>
      <Separator />
      <AccountActions />
    </div>
  );
}
