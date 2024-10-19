import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Server, Code, Zap, Shield } from 'lucide-react';

export const ApiRoutesGuide: FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Working with API Routes</h1>

      <Tabs defaultValue="overview" className="w-full mb-12">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="structure">Structure</TabsTrigger>
          <TabsTrigger value="creation">Creation</TabsTrigger>
          <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="mr-2" /> Introduction to API Routes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                API routes in Next.js allow you to create RESTful API endpoints
                directly within your Next.js application. They are ideal for
                handling server-side requests, interacting with databases, and
                more.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge variant="secondary">Serverless</Badge>
                <Badge variant="secondary">RESTful</Badge>
                <Badge variant="secondary">Integrated</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="structure">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="mr-2" /> API Routes Structure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                In Next.js 13+, API routes are defined in the{' '}
                <code className="bg-muted px-1 py-0.5 rounded">app/api</code>{' '}
                folder. Each file in this folder automatically becomes an API
                route.
              </p>
              <pre className="bg-muted p-4 rounded-md mt-4 overflow-x-auto">
                {`app/api/
  ├── users/
  │   └── route.ts
  └── posts/
      └── route.ts`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="creation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2" /> Creating an API Route
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Here&apos;s an example of a simple API route:
              </p>
              <pre className="bg-muted p-4 rounded-md mt-4 overflow-x-auto">
                {`// app/api/hello/route.ts
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  return NextResponse.json({ message: 'Hello, World!' })
}

export async function POST(request: Request) {
  const body = await request.json()
  return NextResponse.json({ message: 'Data received', data: body })
}`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="best-practices">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2" /> Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Always validate user inputs</li>
                <li>Use middlewares for authentication management</li>
                <li>Handle errors properly and return appropriate responses</li>
                <li>Use CORS headers if necessary for cross-origin requests</li>
                <li>Optimize performance by using caching when possible</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
