import { Separator } from '@/components/ui/separator';
import { ProfileForm } from '@/components/pages/user/settings/profile-form';
import { notFound } from 'next/navigation';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export default async function SettingsProfilePage() {
  const session = (await getServerSession(authOptions)) as Session & {
    isOAuth: boolean;
  };
  if (!session) return notFound();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm session={session} />
    </div>
  );
}
