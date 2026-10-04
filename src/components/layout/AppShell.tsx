'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/navigation/Sidebar';
import AppHeader from '@/components/navigation/AppHeader';
import { X } from 'lucide-react';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0b0b] text-[#f5f3ee] font-sans">
      <AppHeader onToggleMobileNav={() => setMobileNavOpen(true)} />

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden md:flex min-h-[calc(100vh-3.5rem)] sticky top-14" />

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-xs"
              onClick={() => setMobileNavOpen(false)}
              aria-hidden="true"
            />
            {/* Drawer */}
            <div className="relative w-64 bg-[#141414] border-r border-white/10 shadow-2xl flex flex-col z-10">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <span className="font-semibold font-display text-[#f5f3ee] text-xs uppercase tracking-wider">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  aria-label="Close menu"
                  className="p-1 rounded text-[#9a9a95] hover:text-[#f5f3ee] hover:bg-white/5"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div
                className="flex-1 overflow-y-auto"
                onClick={() => setMobileNavOpen(false)}
              >
                <Sidebar className="w-full border-r-0 bg-transparent" />
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppShell;
