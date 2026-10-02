'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/navigation/Sidebar';
import AppHeader from '@/components/navigation/AppHeader';
import { X } from 'lucide-react';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60 font-sans">
      <AppHeader onToggleMobileNav={() => setMobileNavOpen(true)} />

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden md:flex min-h-[calc(100vh-3.5rem)] sticky top-14" />

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
              onClick={() => setMobileNavOpen(false)}
              aria-hidden="true"
            />
            {/* Drawer */}
            <div className="relative w-64 bg-white shadow-xl flex flex-col z-10">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <span className="font-semibold text-slate-900 text-sm">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  aria-label="Close menu"
                  className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div
                className="flex-1 overflow-y-auto"
                onClick={() => setMobileNavOpen(false)}
              >
                <Sidebar className="w-full border-r-0" />
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppShell;
