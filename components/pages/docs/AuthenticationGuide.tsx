import { FC } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Lock, Mail, Settings, Users } from 'lucide-react';

export const AuthenticationGuide: FC = () => {
  return (
    <div className="container min-h-[80vh] mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Authentication Guide
      </h1>

      <Tabs defaultValue="overview" className="w-full mb-12">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="providers">Providers</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="mr-2" /> Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                Our authentication system uses Next Auth to provide a robust and
                flexible solution. It supports multiple authentication providers
                and offers advanced features.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge variant="secondary">Secure</Badge>
                <Badge variant="secondary">Flexible</Badge>
                <Badge variant="secondary">Multi-provider</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="configuration">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2" /> Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                The main configuration is located in{' '}
                <code className="bg-muted px-1 py-0.5 rounded">
                  lib/auth.ts
                </code>
                . Follow these steps to customize:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Add or modify authentication providers</li>
                <li>Configure callbacks to customize behavior</li>
                <li>Define custom pages if necessary</li>
              </ol>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="providers">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2" /> Authentication Providers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Currently supported providers:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Google', 'Discord', 'Email/Password'].map((provider) => (
                  <li
                    key={provider}
                    className="flex items-center bg-muted p-3 rounded-lg"
                  >
                    <ArrowRight className="mr-2 h-4 w-4" /> {provider}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2" /> Email Verification and More
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Our system includes custom email verification:
              </p>
              <ol className="list-decimal pl-5 space-y-2 mb-6">
                <li>User signs up with their email</li>
                <li>A verification code is sent to the email address</li>
                <li>User enters the code to verify their account</li>
              </ol>
              <p className="text-sm text-muted-foreground">
                For more information, check out the{' '}
                <Link
                  href="https://next-auth.js.org/getting-started/introduction"
                  className="text-primary hover:underline"
                >
                  official Next Auth documentation
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
