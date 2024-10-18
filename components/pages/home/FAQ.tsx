'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
  {
    question: 'What is Next Auth?',
    answer:
      'Next Auth is a complete authentication solution for Next.js applications. It offers a variety of authentication providers and integrates easily into your project, providing secure and flexible user authentication.',
  },
  {
    question: 'How can I customize the appearance of the authentication?',
    answer:
      'You can customize the appearance by modifying the Shadcn UI components used in the template. Styles can be adjusted via Tailwind CSS or by creating your own components. The template provides a flexible foundation for creating a unique look and feel.',
  },
  {
    question: 'What authentication methods does this template support?',
    answer:
      'This template supports multiple authentication methods, including email/password, as well as social authentication via providers like Google, GitHub, and Discord. You can easily configure and extend these options to suit your project needs.',
  },
  {
    question: 'How does the template handle database management?',
    answer:
      "The template uses Prisma ORM with PostgreSQL for efficient and type-safe database management. This combination provides robust data modeling, migrations, and querying capabilities, making it easy to manage your application's data.",
  },
  {
    question: 'What UI libraries are included in this template?',
    answer:
      'This template incorporates Shadcn UI for core components and Aceternity UI for enhanced visual effects. These libraries work together to provide a rich set of customizable and accessible UI components, allowing for the creation of stunning user interfaces.',
  },
  {
    question: 'How does the template handle form management and validation?',
    answer:
      'The template uses React Hook Form for efficient form management and Zod for robust schema validation. This combination provides a powerful and type-safe approach to handling forms and validating user input throughout the application.',
  },
  {
    question: 'Is the template set up for internationalization?',
    answer:
      "While the template doesn't come pre-configured for internationalization, it's built with Next.js, which has excellent support for i18n. You can easily add internationalization using libraries like next-i18next or react-intl.",
  },
  {
    question: 'How does the template handle state management?',
    answer:
      "The template primarily uses React's built-in state management capabilities. For more complex state management needs, you can easily integrate libraries like Redux or Zustand, as the template provides a flexible foundation.",
  },
  {
    question: 'Does the template include any data visualization tools?',
    answer:
      'Yes, the template includes Recharts, a powerful charting library for React. This allows you to create various types of charts and graphs to visualize data in your dashboard or other parts of your application.',
  },
  {
    question: 'How can I deploy this application?',
    answer:
      'The template is built with Next.js, which offers various deployment options. You can easily deploy to platforms like Vercel, Netlify, or any other service that supports Next.js applications. The project structure and configuration are optimized for smooth deployment processes.',
  },
];

export function FAQ() {
  const midPoint = Math.ceil(faqItems.length / 2);
  const leftColumnItems = faqItems.slice(0, midPoint);
  const rightColumnItems = faqItems.slice(midPoint);

  return (
    <section className="w-full px-4 py-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="grid md:grid-cols-2 md:gap-8">
          <div>
            {leftColumnItems.map((item, index) => (
              <Accordion
                key={index}
                type="single"
                collapsible
                className="w-full mb-4"
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
          <div>
            {rightColumnItems.map((item, index) => (
              <Accordion
                key={index + midPoint}
                type="single"
                collapsible
                className="w-full mb-4"
              >
                <AccordionItem value={`item-${index + midPoint}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
