'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { appNav } from '@/config/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  MessageSquare,
  Calendar,
  BookOpen,
  BarChart2,
  Settings,
  HelpCircle,
  Shield,
} from 'lucide-react';

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  MessageSquare,
  Calendar,
  BookOpen,
  BarChart2,
  Settings,
};

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'w-64 border-r border-white/10 bg-[#0e0e0e] flex flex-col justify-between shrink-0 select-none text-[#f5f3ee]',
        className
      )}
    >
      <div className="p-5 space-y-6">
        {/* Brand header */}
        <Link
          href="/app"
          className="flex items-center gap-2.5 px-3 py-1 font-display font-bold text-sm tracking-widest uppercase text-[#f5f3ee] hover:opacity-90 transition-opacity"
        >
          <div className="h-5 w-5 rounded bg-[#d8ff3e] flex items-center justify-center text-[#0b0b0b] text-[10px] font-black">
            F
          </div>
          <span>FeedbackFlow</span>
        </Link>

        {/* Navigation items */}
        <nav className="space-y-1">
          {appNav.map((item) => {
            const Icon = item.iconName ? icons[item.iconName] : null;
            const isActive =
              item.href === '/app'
                ? pathname === '/app'
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 text-xs uppercase tracking-wider font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-white/10 text-[#d8ff3e] font-semibold border border-white/10'
                    : 'text-[#9a9a95] hover:text-[#f5f3ee] hover:bg-white/5'
                )}
              >
                {Icon && (
                  <Icon
                    className={cn(
                      'h-4 w-4 shrink-0',
                      isActive ? 'text-[#d8ff3e]' : 'text-[#6f6f6a]'
                    )}
                  />
                )}
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer link */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <div className="px-3 py-2 rounded border border-white/10 bg-white/2 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#d8ff3e]">
            <Shield className="h-3 w-3" />
            <span>Anonymous Guaranteed</span>
          </div>
          <p className="text-[10px] text-[#6f6f6a] leading-tight">
            Submissions strip identifiers and metadata at DB layer.
          </p>
        </div>

        <Link
          href="/anonymous-feedback"
          className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-[#9a9a95] hover:text-[#f5f3ee] rounded-md hover:bg-white/5 transition-colors"
        >
          <HelpCircle className="h-3.5 w-3.5 text-[#6f6f6a]" />
          <span>Trust & Safety Guide</span>
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
