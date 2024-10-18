'use client';

import { FC } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Github, Mail } from 'lucide-react';

export const AboutContent: FC = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        About Our Next.js Authentication Template
      </motion.h1>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 0.2 }}
      >
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">
              Our Next.js Authentication Template
            </CardTitle>
            <CardDescription className="text-lg">
              Powerful Features, Reusable UI Components, and Stunning Design
              Effects
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <CheckCircle className="mr-2 text-green-500" />
                Key Features
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Secure authentication with Next Auth',
                  'Reusable UI components from Shadcn UI',
                  'Stunning design effects with Magic UI / Aceternity',
                  'Database management with Prisma and PostgreSQL',
                  'Custom email verification',
                  'Role-based access control',
                  'Form management with React Hook Form and Zod',
                  'Theme support and dark mode',
                  'User dashboard with interactive statistics',
                  'Responsive and accessible design with Tailwind CSS',
                  'Animated UI elements with Framer Motion',
                  'Customizable and extensible component library',
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle
                      className="mr-2 text-green-500 flex-shrink-0 mt-1"
                      size={16}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Github className="mr-2" />
                Collaboration
              </h2>
              <p className="mb-4 text-lg">
                We welcome contributions from the community! If you have ideas
                for improvements, new UI components, or exciting design effects,
                don&apos;t hesitate to get involved.
              </p>
              <Button asChild size="lg" className="w-full sm:w-auto text-white">
                <Link
                  href="https://github.com/ClementG91/Next-Template.git"
                  className="flex items-center"
                >
                  <Github className="mr-2" />
                  Contribute on GitHub
                </Link>
              </Button>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Mail className="mr-2" />
                Security
              </h2>
              <p className="mb-4 text-lg">
                Security is our top priority. If you discover any
                vulnerabilities or have suggestions to enhance the security of
                our template, please let us know immediately.
              </p>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link
                  href="mailto:contact@edeveloppe.com"
                  className="flex items-center"
                >
                  <Mail className="mr-2" />
                  Report a Security Issue
                </Link>
              </Button>
            </section>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
