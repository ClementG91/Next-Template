import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Session } from 'next-auth';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Settings } from 'lucide-react';

interface ProfileCardProps {
  session: Session | null;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ session }) => {
  const proxyImageUrl = session?.user?.image
    ? `/api/proxy?url=${encodeURIComponent(session.user.image)}`
    : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Profile</CardTitle>
          <Link
            href="/settings"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Settings size={20} />
          </Link>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={proxyImageUrl}
                alt={session?.user?.name || 'User'}
              />
              <AvatarFallback>
                {session?.user?.name?.[0] || 'NT'}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          <div>
            <p className="text-xl font-medium">{session?.user?.name}</p>
            <p className="text-sm text-muted-foreground">
              {session?.user?.email}
            </p>
            <p className="text-sm text-muted-foreground">
              Role: {session?.user?.role}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
