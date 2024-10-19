import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Rocket, Settings, Server, Database } from 'lucide-react';

export const DeploymentGuide: FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Deployment Guide</h1>

      <Tabs defaultValue="preparation" className="w-full mb-12">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="preparation">Preparation</TabsTrigger>
          <TabsTrigger value="vercel">Vercel</TabsTrigger>
          <TabsTrigger value="other-platforms">Other Platforms</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
        </TabsList>
        <TabsContent value="preparation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2" /> Deployment Preparation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Before deploying your application, make sure to:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Have all your changes committed to Git</li>
                <li>Have tested your application in production mode locally</li>
                <li>Have configured all necessary environment variables</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="vercel">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Rocket className="mr-2" /> Deploying on Vercel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Vercel is the recommended platform for deploying Next.js
                applications.
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Create a Vercel account if you haven&apos;t already</li>
                <li>Connect your GitHub repository to Vercel</li>
                <li>Select the repository to deploy</li>
                <li>Configure environment variables in the Vercel interface</li>
                <li>Click on &quot;Deploy&quot;</li>
              </ol>
              <p className="mt-4 text-sm text-muted-foreground">
                Vercel will automatically detect that it&apos;s a Next.js
                application and configure the build accordingly.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="other-platforms">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="mr-2" /> Deploying on Other Platforms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                To deploy on other platforms like Heroku, DigitalOcean, or AWS,
                you&apos;ll need to:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  Build your application:{' '}
                  <code className="bg-muted px-1 py-0.5 rounded">
                    npm run build
                  </code>
                </li>
                <li>
                  Start the server:{' '}
                  <code className="bg-muted px-1 py-0.5 rounded">
                    npm start
                  </code>
                </li>
                <li>Configure environment variables on the platform</li>
                <li>Set up a build process if necessary</li>
              </ol>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2" /> Database Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Ensure that your PostgreSQL database is accessible from your
                production environment. You can use a service like Heroku
                Postgres or DigitalOcean Managed Databases.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Don&apos;t forget to update the database-related environment
                variables in your production environment.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
