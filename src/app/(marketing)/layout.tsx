import React from 'react';
import MarketingHeader from '@/components/navigation/MarketingHeader';
import MarketingFooter from '@/components/layout/MarketingFooter';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#0b0b0b] text-[#f5f3ee]">
      <MarketingHeader />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  );
}
