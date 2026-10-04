'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import Button from '@/components/ui/Button';
import { Menu, LogOut } from 'lucide-react';

interface AppHeaderProps {
  onToggleMobileNav: () => void;
}

export function AppHeader({ onToggleMobileNav }: AppHeaderProps) {
  const { user, signOut } = useAuth();

  return (
    <header className="h-14 border-b border-white/10 bg-[#0e0e0e] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 text-[#f5f3ee]">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobileNav}
          aria-label="Open navigation menu"
          className="md:hidden p-1.5 rounded-md text-[#9a9a95] hover:text-[#f5f3ee] hover:bg-white/5 transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link
          href="/app"
          className="md:hidden flex items-center gap-2 font-display font-bold text-xs uppercase tracking-widest text-[#f5f3ee]"
        >
          <div className="h-5 w-5 rounded bg-[#d8ff3e] flex items-center justify-center text-[#0b0b0b] text-[10px] font-black">
            F
          </div>
          <span>FeedbackFlow</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <Link
              href="/app/settings"
              className="flex items-center gap-2 text-xs font-mono text-[#9a9a95] hover:text-[#f5f3ee] transition-colors"
            >
              <div className="h-7 w-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[#f5f3ee] font-semibold text-xs">
                {user.fullName ? user.fullName[0].toUpperCase() : 'U'}
              </div>
              <span className="hidden sm:inline-block max-w-[140px] truncate">
                {user.fullName || user.email}
              </span>
            </Link>

            <button
              onClick={() => signOut()}
              title="Sign out"
              aria-label="Sign out"
              className="p-1.5 rounded-md text-[#9a9a95] hover:text-[#f5f3ee] hover:bg-white/5 transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get started</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default AppHeader;
