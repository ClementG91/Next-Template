'use client';

import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const Circle = forwardRef<
  HTMLDivElement,
  {
    className?: string;
    children?: React.ReactNode;
    tooltipContent?: React.ReactNode;
  }
>(({ className, children, tooltipContent }, ref) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <div
          ref={ref}
          className={cn(
            'z-[1] flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] hover:scale-125 transition-all duration-300',
            className
          )}
        >
          <TooltipTrigger>
            <div className="flex flex-col justify-center cursor-default">
              {children}
            </div>
          </TooltipTrigger>
        </div>
        <TooltipContent className="text-white">{tooltipContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

Circle.displayName = 'Circle';

export default Circle;
