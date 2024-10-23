'use client';

import { useState } from 'react';
import { ContactForm } from '@/components/pages/contact/contact-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Code,
  HelpCircle,
  Bug,
  Lightbulb,
  Github,
  MessageCircle,
} from 'lucide-react';

const topics = [
  {
    icon: HelpCircle,
    title: 'Template Usage',
    subject: 'Help with Template Usage',
    description: 'Get assistance with setting up and customizing the template.',
  },
  {
    icon: Bug,
    title: 'Bug Reports',
    subject: 'Bug Report',
    description: 'Report issues or unexpected behavior in the template.',
  },
  {
    icon: Lightbulb,
    title: 'Feature Requests',
    subject: 'Feature Request',
    description: 'Suggest new features or improvements for the template.',
  },
  {
    icon: Github,
    title: 'Contribution Inquiries',
    subject: 'Contribution Inquiry',
    description: 'Learn how you can contribute to the template development.',
  },
  {
    icon: MessageCircle,
    title: 'General Inquiries',
    subject: 'General Inquiry',
    description: 'Ask any other questions about our template or services.',
  },
];

export function ContactContent() {
  const [selectedTopic, setSelectedTopic] = useState('');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto">
      <Card className="w-full lg:order-2 flex flex-col">
        <CardHeader>
          <CardTitle className="text-2xl">Contact Form</CardTitle>
          <CardDescription>
            Send us a message about our Next.js template. We&apos;ll respond
            promptly.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <ContactForm selectedTopic={selectedTopic} />
        </CardContent>
      </Card>
      <Card className="w-full lg:order-1 flex flex-col">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Code className="mr-2" /> Next.js Template Support
          </CardTitle>
          <CardDescription>
            Get help with our Next.js authentication template. Select a topic
            below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 flex-grow">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 cursor-pointer hover:bg-muted p-2 rounded-md transition-colors"
              onClick={() => setSelectedTopic(topic.subject)}
            >
              <topic.icon className="mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">{topic.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {topic.description}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
