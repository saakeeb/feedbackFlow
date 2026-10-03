import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { defaultMetadata } from '@/config/seo';
import AuthProvider from '@/components/auth/AuthProvider';
import ToastProvider from '@/components/ui/ToastProvider';
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <body className="font-sans antialiased text-slate-900 bg-slate-50/50 min-h-screen">
        <AuthProvider>
          <ToastProvider />
          <Analytics />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
