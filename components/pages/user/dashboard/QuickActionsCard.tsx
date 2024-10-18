import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Check, Copy, BookOpen } from 'lucide-react';
import Link from 'next/link';

export const QuickActionsCard: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyGitClone = async () => {
    const gitCloneCommand =
      'git clone https://github.com/ClementG91/Next-Template.git';
    try {
      await navigator.clipboard.writeText(gitCloneCommand);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="text-white w-full flex items-center justify-center"
              onClick={handleCopyGitClone}
            >
              {isCopied ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" /> Copy Git Clone Command
                </>
              )}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/docs">
                <BookOpen className="mr-2 h-4 w-4" /> View Documentation
              </Link>
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
