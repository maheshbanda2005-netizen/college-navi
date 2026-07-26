import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/layout/Providers';

export const metadata: Metadata = {
  title: 'EduNavigator AI - Smart University & College Finder Portal',
  description: 'AI-powered platform for university discovery, comparison, admissions, scholarships, and career guidance.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
