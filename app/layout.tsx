import type { Metadata } from 'next';
import { Outfit, DM_Mono, Bricolage_Grotesque } from 'next/font/google';
import './globals.css';
import Cursor from '@/components/Cursor';
import Background from '@/components/Background';

const syne = Outfit({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
});

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-bricolage',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Devanshi Garg — Full Stack Engineer',
  description:
    'Full Stack Engineer specializing in React, Node.js, TypeScript, and AI/LLM integrations. Currently at EXC Managed Services.',
  openGraph: {
    title: 'Devanshi Garg — Full Stack Engineer',
    description:
      'Full Stack Engineer specializing in React, Node.js, TypeScript, and AI/LLM integrations. Currently at EXC Managed Services.',
    type: 'website',
    siteName: 'Devanshi Garg',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devanshi Garg — Full Stack Engineer',
    description:
      'Full Stack Engineer specializing in React, Node.js, TypeScript, and AI/LLM integrations. Currently at EXC Managed Services.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmMono.variable} ${bricolage.variable}`}
    >
      <body>
        <Cursor />
        <Background />
        {children}
      </body>
    </html>
  );
}
