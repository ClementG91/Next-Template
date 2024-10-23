import { ContactContent } from '@/components/pages/contact/ContactContent';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
      <ContactContent />
    </div>
  );
}
