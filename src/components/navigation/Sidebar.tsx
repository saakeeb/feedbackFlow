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
        'w-64 border-r border-slate-200 bg-white flex flex-col justify-between shrink-0 select-none',
        className
      )}
    >
      <div className="p-4 space-y-6">
        {/* Brand header */}
        <Link
          href="/app"
          className="flex items-center gap-2.5 px-3 py-1 font-semibold text-slate-900 tracking-tight text-base"
        >
          <div className="h-6 w-6 rounded bg-slate-900 flex items-center justify-center text-white text-xs font-bold">
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
                  'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-slate-100 text-slate-950 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                )}
              >
                {Icon && (
                  <Icon
                    className={cn(
                      'h-4 w-4 shrink-0',
                      isActive ? 'text-slate-950' : 'text-slate-400'
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
      <div className="p-4 border-t border-slate-100 space-y-1">
        <Link
          href="/features"
          className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-900 rounded-md hover:bg-slate-50 transition-colors"
        >
          <HelpCircle className="h-4 w-4 text-slate-400" />
          <span>Product Guide & Help</span>
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
