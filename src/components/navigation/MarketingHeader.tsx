'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MarketingHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { title: 'Product', href: '/features' },
    { title: 'How it works', href: '/#how-it-works' },
    { title: 'Anonymous feedback', href: '/anonymous-feedback' },
    { title: 'Resources', href: '/resources' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0b0b0b]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-3 font-display font-bold tracking-tight text-lg text-[#f5f3ee] hover:opacity-90 transition-opacity"
        >
          <div className="h-6 w-6 rounded bg-[#d8ff3e] flex items-center justify-center text-[#0b0b0b] text-xs font-black">
            F
          </div>
          <span className="tracking-wider text-sm font-semibold uppercase">FeedbackFlow</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-xs uppercase tracking-wider font-medium transition-colors hover:text-[#f5f3ee]',
                  isActive ? 'text-[#d8ff3e]' : 'text-[#9a9a95]'
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-xs uppercase tracking-wider font-medium text-[#9a9a95] hover:text-[#f5f3ee] transition-colors"
          >
            Login
          </Link>
          <Link href="/app">
            <Button size="sm" className="gap-1.5 text-xs font-semibold uppercase tracking-wider">
              Start giving feedback
              <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden p-2 text-[#9a9a95] hover:text-[#f5f3ee]"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#0e0e0e] px-6 py-6 space-y-4">
          <nav className="space-y-3">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-[#9a9a95] hover:text-[#f5f3ee]"
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full">
                Login
              </Button>
            </Link>
            <Link href="/app" onClick={() => setMobileMenuOpen(false)}>
              <Button size="sm" className="w-full">
                Start giving feedback
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default MarketingHeader;
