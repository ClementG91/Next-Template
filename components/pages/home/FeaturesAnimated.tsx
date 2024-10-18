'use client';

import { AnimatedBeam } from '@/components/ui/magicui/animated-beam';
import React, { useRef } from 'react';
import Circle from '@/components/ui/magicui/Circle';
import {
  SiNextdotjs,
  SiPrisma,
  SiTailwindcss,
  SiReact,
  SiTypescript,
  SiPostgresql,
} from 'react-icons/si';
import Logo from '../../Logo';

export function FeaturesAnimated() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex w-full max-w-[500px] items-center justify-center overflow-hidden p-10"
      ref={containerRef}
    >
      <div className="flex h-full w-full flex-col items-stretch justify-between gap-24 text-black">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref} className="ml-24" tooltipContent="Next.js">
            <SiNextdotjs size={26} />
          </Circle>
          <Circle ref={div5Ref} className="mr-24" tooltipContent="Prisma">
            <SiPrisma size={26} />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref} tooltipContent="Tailwind CSS">
            <SiTailwindcss size={26} />
          </Circle>
          <Circle
            ref={div4Ref}
            className="h-20 w-20"
            tooltipContent="Authentification"
          >
            <Logo color="black" className="w-12 h-12" />
          </Circle>
          <Circle ref={div6Ref} tooltipContent="React">
            <SiReact size={26} />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref} className="ml-24" tooltipContent="TypeScript">
            <SiTypescript size={26} />
          </Circle>
          <Circle ref={div7Ref} className="mr-24" tooltipContent="PostgreSQL">
            <SiPostgresql size={26} />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-75}
        reverse
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        reverse
        endYOffset={10}
      />
    </div>
  );
}
