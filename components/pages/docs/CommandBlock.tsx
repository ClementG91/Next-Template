'use client';
import { FC, useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CommandBlockProps {
  command: string;
}

export const CommandBlock: FC<CommandBlockProps> = ({ command }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="bg-muted p-2 rounded-md mt-2 flex justify-between items-center cursor-pointer hover:bg-muted/80 transition-colors"
      onClick={copyToClipboard}
    >
      <pre className="flex-grow truncate">{command}</pre>
      <div className="flex-shrink-0 ml-2">
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </div>
    </div>
  );
};
