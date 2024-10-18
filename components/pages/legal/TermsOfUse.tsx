import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export const TermsOfUse: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Terms of Use</CardTitle>
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using our service, you agree to be bound by these
              Terms. If you disagree with any part of the terms, then you may
              not access the service. These Terms of Use constitute a legally
              binding agreement made between you and eDeveloppe, concerning your
              access to and use of our website and services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              2. Use of the Service
            </h2>
            <p>
              You agree to use the service only for purposes that are permitted
              by these Terms and any applicable law, regulation, or generally
              accepted practices or guidelines in the relevant jurisdictions.
              You may not:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Use the service for any illegal or unauthorized purpose</li>
              <li>
                Attempt to gain unauthorized access to any portion of the
                service
              </li>
              <li>
                Interfere with or disrupt the service or servers or networks
                connected to the service
              </li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. User Accounts</h2>
            <p>
              When you create an account with us, you must provide information
              that is accurate, complete, and current at all times. Failure to
              do so constitutes a breach of the Terms, which may result in
              immediate termination of your account on our service.
            </p>
            <p className="mt-2">
              You are responsible for safeguarding the password that you use to
              access the service and for any activities or actions under your
              password. You agree not to disclose your password to any third
              party. You must notify us immediately upon becoming aware of any
              breach of security or unauthorized use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              4. Intellectual Property
            </h2>
            <p>
              The service and its original content, features, and functionality
              are and will remain the exclusive property of eDeveloppe and its
              licensors. The service is protected by copyright, trademark, and
              other laws. Our trademarks and trade dress may not be used in
              connection with any product or service without the prior written
              consent of eDeveloppe.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without
              prior notice or liability, for any reason whatsoever, including
              without limitation if you breach the Terms. Upon termination, your
              right to use the service will immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              6. Limitation of Liability
            </h2>
            <p>
              In no event shall eDeveloppe, nor its directors, employees,
              partners, agents, suppliers, or affiliates, be liable for any
              indirect, incidental, special, consequential or punitive damages,
              including without limitation, loss of profits, data, use,
              goodwill, or other intangible losses, resulting from your access
              to or use of or inability to access or use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. What constitutes a material change will
              be determined at our sole discretion. By continuing to access or
              use our service after those revisions become effective, you agree
              to be bound by the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at{' '}
              <Link
                href="mailto:contact@edeveloppe.com"
                className="text-primary hover:underline"
              >
                contact@edeveloppe.com
              </Link>
              .
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};
