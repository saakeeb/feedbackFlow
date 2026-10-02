'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import Button from '@/components/ui/Button';
import { Menu, LogOut, User as UserIcon } from 'lucide-react';

interface AppHeaderProps {
  onToggleMobileNav: () => void;
}

export function AppHeader({ onToggleMobileNav }: AppHeaderProps) {
  const { user, signOut } = useAuth();

  return (
    <header className="h-14 border-b border-slate-200 bg-white px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobileNav}
          aria-label="Open navigation menu"
          className="md:hidden p-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link
          href="/app"
          className="md:hidden flex items-center gap-2 font-semibold text-slate-900 text-sm"
        >
          <div className="h-5 w-5 rounded bg-slate-900 flex items-center justify-center text-white text-xs font-bold">
            F
          </div>
          <span>FeedbackFlow</span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            <Link
              href="/app/settings"
              className="flex items-center gap-2 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              <div className="h-7 w-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-semibold text-xs">
                {user.fullName ? user.fullName[0].toUpperCase() : 'U'}
              </div>
              <span className="hidden sm:inline-block max-w-[120px] truncate">
                {user.fullName || user.email}
              </span>
            </Link>

            <button
              onClick={() => signOut()}
              title="Sign out"
              aria-label="Sign out"
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
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
