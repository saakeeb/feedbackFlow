import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import '@/styles/globals.css';
import { defaultMetadata } from '@/config/seo';
import AuthProvider from '@/components/auth/AuthProvider';
import ToastProvider from '@/components/ui/ToastProvider';
import { Analytics } from "@vercel/analytics/next";

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

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
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      <body className="font-sans antialiased text-[#f5f3ee] bg-[#0b0b0b] min-h-screen selection:bg-[#d8ff3e] selection:text-[#0b0b0b]">
        <AuthProvider>
          <ToastProvider />
          <Analytics />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

