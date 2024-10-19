import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database, Code, GitBranch, Zap } from 'lucide-react';

export const DatabaseManagement: FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Database Management with Prisma</h1>

      <Tabs defaultValue="overview" className="w-full mb-12">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2" /> Introduction to Prisma
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                Prisma is a modern ORM for Node.js and TypeScript. It simplifies
                database access and provides an excellent development experience
                with its type-safe client.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge variant="secondary">Type-safe</Badge>
                <Badge variant="secondary">Performant</Badge>
                <Badge variant="secondary">Easy to use</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="configuration">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="mr-2" /> Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Prisma configuration is located in the{' '}
                <code className="bg-muted px-1 py-0.5 rounded">
                  prisma/schema.prisma
                </code>{' '}
                file. This is where you define your data models and database
                connection.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Make sure that the environment variables for database connection
                are properly configured in your{' '}
                <code className="bg-muted px-1 py-0.5 rounded">.env</code> file.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="models">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GitBranch className="mr-2" /> Data Models
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Data models are defined in{' '}
                <code className="bg-muted px-1 py-0.5 rounded">
                  schema.prisma
                </code>
                . Here&apos;s a simplified example:
              </p>
              <pre className="bg-muted p-4 rounded-md mt-4 overflow-x-auto">
                {`model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="usage">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2" /> Using Prisma
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Here&apos;s how to use Prisma in your API routes or server
                components:
              </p>
              <pre className="bg-muted p-4 rounded-md mt-4 overflow-x-auto">
                {`import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const users = await prisma.user.findMany({
    include: { posts: true }
  });

  return new Response(JSON.stringify(users), {
    headers: { 'Content-Type': 'application/json' },
  });
}`}
              </pre>
              <p className="mt-4 text-sm text-muted-foreground">
                Remember to close the Prisma connection after use in a
                serverless environment.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
