import React from 'react';
import Link from 'next/link';
import { footerNav } from '@/config/navigation';

export function MarketingFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900 tracking-tight text-base">
              <div className="h-6 w-6 rounded bg-slate-900 flex items-center justify-center text-white text-xs font-bold">
                F
              </div>
              <span>FeedbackFlow</span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed">
              Quiet productivity and honest workplace communication for teams that value psychological safety and clear action.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2 text-sm">
              {footerNav.product.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-slate-900 transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              {footerNav.company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-slate-900 transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Workspace */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Workspace
            </h4>
            <ul className="space-y-2 text-sm">
              {footerNav.tools.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-slate-900 transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} FeedbackFlow. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-600">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-600">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default MarketingFooter;
