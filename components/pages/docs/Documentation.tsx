'use client';
import { FC } from 'react';
import Link from 'next/link';
import {
  Book,
  Code,
  Database,
  Palette,
  Shield,
  CheckCircle,
} from 'lucide-react';
import { CommandBlock } from '@/components/pages/docs/CommandBlock';

export const Documentation: FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Documentation</h1>

      <section id="prerequisites" className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 flex items-center">
          <CheckCircle className="mr-2" /> Prerequisites
        </h2>
        <p className="mb-4">
          Before getting started, make sure you have the following installed and
          configured on your system:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Node.js</strong> (version 14 or higher) -{' '}
            <a
              href="https://nodejs.org/"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Node.js
            </a>
          </li>
          <li>
            <strong>npm</strong> (usually installed with Node.js) or{' '}
            <strong>yarn</strong>
          </li>
          <li>
            <strong>Git</strong> -{' '}
            <a
              href="https://git-scm.com/"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Git
            </a>
          </li>
          <li>
            A code editor like <strong>Visual Studio Code</strong> -{' '}
            <a
              href="https://code.visualstudio.com/"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download VS Code
            </a>
          </li>
          <li>
            A <strong>PostgreSQL</strong> account (you can use a service like{' '}
            <a
              href="https://neon.tech/"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Neon
            </a>{' '}
            for a hosted PostgreSQL database)
          </li>
        </ul>
        <p className="mt-4">
          Also, ensure you have a basic understanding of React, Next.js, and
          TypeScript to make the most of this template.
        </p>
      </section>

      <section id="getting-started" className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 flex items-center">
          <Shield className="mr-2" /> Getting Started
        </h2>
        <ol className="list-decimal pl-5 space-y-4">
          <li>
            Clone the repository:
            <CommandBlock command="git clone https://github.com/ClementG91/Next-Template.git" />
          </li>
          <li>
            Navigate to the project directory:
            <CommandBlock command="cd Next-Template" />
          </li>
          <li>
            Install dependencies:
            <CommandBlock command="npm install" />
          </li>
          <li>
            Configure environment variables:
            <p className="mt-2">
              Copy the <code>.env.example</code> file to <code>.env</code> and
              fill in the necessary values:
            </p>
            <CommandBlock command="cp .env.example .env" />
            <p className="mt-2">
              Open the <code>.env</code> file and update the following
              variables:
            </p>
            <ul className="list-disc pl-5 mt-2">
              <li>
                <code>POSTGRES_URL</code>, <code>POSTGRES_PRISMA_URL</code>,{' '}
                <code>POSTGRES_URL_NO_SSL</code>,{' '}
                <code>POSTGRES_URL_NON_POOLING</code>: Your PostgreSQL database
                URLs
              </li>
              <li>
                <code>POSTGRES_USER</code>, <code>POSTGRES_HOST</code>,{' '}
                <code>POSTGRES_PASSWORD</code>, <code>POSTGRES_DATABASE</code>:
                Your PostgreSQL connection information
              </li>
              <li>
                <code>NEXTAUTH_SECRET</code>: A random string for NextAuth.js
              </li>
              <li>
                <code>NEXTAUTH_URL</code>, <code>NEXT_PUBLIC_BASE_URL</code>:
                Your application&apos;s URL
              </li>
              <li>
                <code>DISCORD_CLIENT_ID</code>,{' '}
                <code>DISCORD_CLIENT_SECRET</code>: Your Discord client
                credentials
              </li>
              <li>
                <code>GOOGLE_CLIENT_ID</code>, <code>GOOGLE_CLIENT_SECRET</code>
                : Your Google client credentials
              </li>
              <li>
                <code>EMAIL_SERVER_HOST</code>, <code>EMAIL_SERVER_PORT</code>,{' '}
                <code>EMAIL_SERVER_USER</code>,{' '}
                <code>EMAIL_SERVER_PASSWORD</code>, <code>EMAIL_FROM</code>,{' '}
                <code>EMAIL_TO</code>: Your SMTP server configuration for
                sending emails
              </li>
            </ul>
          </li>
          <li>
            Set up the database:
            <CommandBlock command="npx prisma db push" />
            <CommandBlock command="npx prisma generate" />
          </li>
          <li>
            Start the development server:
            <CommandBlock command="npm run dev" />
          </li>
          <p className="mt-4">
            Your application should now be running on{' '}
            <a
              href="http://localhost:3000"
              className="text-primary hover:underline"
            >
              http://localhost:3000
            </a>
            .
          </p>
          <li>
            Build the application:
            <CommandBlock command="npm run build" />
          </li>
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 flex items-center">
          <Code className="mr-2" /> Key Technologies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Next.js 14', url: 'https://nextjs.org/' },
            { name: 'React 18', url: 'https://reactjs.org/' },
            { name: 'TypeScript', url: 'https://www.typescriptlang.org/' },
            { name: 'Next Auth', url: 'https://next-auth.js.org/' },
            { name: 'Prisma', url: 'https://www.prisma.io/' },
            { name: 'PostgreSQL', url: 'https://www.postgresql.org/' },
            { name: 'Tailwind CSS', url: 'https://tailwindcss.com/' },
            { name: 'Shadcn UI', url: 'https://ui.shadcn.com/' },
            { name: 'Aceternity UI', url: 'https://ui.aceternity.com/' },
            { name: 'Zod', url: 'https://zod.dev/' },
            { name: 'React Hook Form', url: 'https://react-hook-form.com/' },
            { name: 'Framer Motion', url: 'https://www.framer.com/motion/' },
          ].map((tech, index) => (
            <a
              key={index}
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-muted p-3 rounded-md hover:bg-muted/80 transition-colors"
            >
              {tech.name}
            </a>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 flex items-center">
          <Database className="mr-2" /> Project Structure
        </h2>
        <ul className="space-y-2">
          <li>
            <code>app/</code>: Next.js 13+ App Router structure
            <ul className="list-disc pl-5 mt-2">
              <li>
                <code>layout.tsx</code>: Root layout component
              </li>
              <li>
                <code>page.tsx</code>: Home page component
              </li>
              <li>
                <code>(auth)/</code>: Authentication-related pages
              </li>
              <li>
                <code>(user)/</code>: User-related pages (e.g., dashboard)
              </li>
            </ul>
          </li>
          <li>
            <code>components/</code>: Reusable React components
            <ul className="list-disc pl-5 mt-2">
              <li>
                <code>ui/</code>: UI components (buttons, cards, etc.)
              </li>
              <li>
                <code>layout/</code>: Layout components (navbar, footer)
              </li>
              <li>
                <code>pages/</code>: Page-specific components
              </li>
            </ul>
          </li>
          <li>
            <code>lib/</code>: Utility functions and configurations
            <ul className="list-disc pl-5 mt-2">
              <li>
                <code>prisma.ts</code>: Prisma client instance
              </li>
              <li>
                <code>auth.ts</code>: NextAuth.js configuration
              </li>
            </ul>
          </li>
          <li>
            <code>prisma/</code>: Database schema and migrations
            <ul className="list-disc pl-5 mt-2">
              <li>
                <code>schema.prisma</code>: Prisma schema file
              </li>
            </ul>
          </li>
          <li>
            <code>public/</code>: Static assets
          </li>
          <li>
            <code>types/</code>: TypeScript type definitions
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 flex items-center">
          <Palette className="mr-2" /> Customization
        </h2>
        <p className="mb-4">
          This template is designed to be highly customizable. Here are some key
          areas you can modify:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Tailwind CSS configuration:
            <p className="mt-2">
              Edit <code>tailwind.config.js</code> to customize colors, fonts,
              and other design tokens.
            </p>
          </li>
          <li>
            Authentication providers:
            <p className="mt-2">
              Modify <code>lib/authOptions.ts</code> to add or remove
              authentication providers.
            </p>
          </li>
          <li>
            API routes:
            <p className="mt-2">
              Add or modify API routes in the <code>app/api</code> directory.
            </p>
          </li>
          <li>
            Database schema:
            <p className="mt-2">
              Extend the Prisma schema in <code>prisma/schema.prisma</code> for
              new data models.
            </p>
          </li>
          <li>
            UI components:
            <p className="mt-2">
              Customize existing components or add new ones in the{' '}
              <code>components/ui</code> directory.
            </p>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-4 flex items-center">
          <Book className="mr-2" /> Further Reading
        </h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="/docs/authentication"
              className="text-primary hover:underline"
            >
              Authentication Guide
            </Link>
            : Detailed explanation of the authentication system and how to
            customize it.
          </li>
          <li>
            <Link
              href="/docs/database"
              className="text-primary hover:underline"
            >
              Database Management with Prisma
            </Link>
            : How to work with the database, create migrations, and extend the
            schema.
          </li>
          <li>
            <Link
              href="/docs/api-routes"
              className="text-primary hover:underline"
            >
              Working with API Routes
            </Link>
            : Guide on creating and using API routes in Next.js.
          </li>
          <li>
            <Link
              href="/docs/deployment"
              className="text-primary hover:underline"
            >
              Deployment Guide
            </Link>
            : Steps to deploy your application to various platforms.
          </li>
        </ul>
      </section>
    </div>
  );
};
