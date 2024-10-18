import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export const PrivacyPolicy: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              1. Information We Collect
            </h2>
            <p>
              We collect information you provide directly to us, such as when
              you create or modify your account, request services, contact
              customer support, or otherwise communicate with us. This
              information may include: name, email, password, and other optional
              profile information. Please note that all passwords are securely
              encrypted and stored using industry-standard hashing algorithms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              2. How We Use Your Information
            </h2>
            <p>
              We use the information we collect to provide, maintain, and
              improve our services, to develop new ones, and to protect our
              company and our users. Your password is never stored in plain text
              and cannot be accessed by our staff.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              3. Information Sharing and Disclosure
            </h2>
            <p>
              We do not share personal information with companies,
              organizations, or individuals outside of our company except in the
              following cases: with your consent, for legal reasons, or to
              protect rights, property, or safety. Under no circumstances do we
              share or expose your encrypted password.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Data Security</h2>
            <p>
              We work hard to protect our users from unauthorized access to or
              unauthorized alteration, disclosure, or destruction of information
              we hold, implementing various security measures. This includes
              using encryption for sensitive data like passwords, and regularly
              updating our security practices to enhance protection.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Your GDPR Rights</h2>
            <p>
              If you are a resident of the European Economic Area (EEA), you
              have certain data protection rights under the GDPR. We aim to take
              reasonable steps to allow you to correct, amend, delete, or limit
              the use of your Personal Information. Your rights include:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>The right to access, update or delete your information</li>
              <li>The right of rectification</li>
              <li>The right to object</li>
              <li>The right of restriction</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, please contact us at{' '}
              <Link
                href="mailto:contact@edeveloppe.com"
                className="text-primary hover:underline"
              >
                contact@edeveloppe.com
              </Link>
              . We will respond to your request within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              6. Changes to This Privacy Policy
            </h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the &quot;Last updated&quot; date at the top of this
              Privacy Policy.
            </p>
            <p className="mt-2">
              You are advised to review this Privacy Policy periodically for any
              changes. Changes to this Privacy Policy are effective when they
              are posted on this page.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};
