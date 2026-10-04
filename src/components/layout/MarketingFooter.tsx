import React from 'react';
import Link from 'next/link';

export function MarketingFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0b0b0b] text-[#9a9a95]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Col */}
          <div className="md:col-span-6 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-display font-bold text-base text-[#f5f3ee] tracking-tight"
            >
              <div className="h-5 w-5 rounded bg-[#d8ff3e] flex items-center justify-center text-[#0b0b0b] text-[10px] font-black">
                F
              </div>
              <span className="uppercase tracking-widest text-sm">FeedbackFlow</span>
            </Link>
            <p className="text-xl sm:text-2xl font-display font-medium text-[#f5f3ee] tracking-tight max-w-md">
              Say what needs to be said.
            </p>
            <p className="text-sm text-[#9a9a95] max-w-md leading-relaxed">
              Give constructive feedback on any paragraph, idea, decision, document, or conversation — without exposing your identity.
            </p>
          </div>

          {/* Links: Product */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-[#f5f3ee] uppercase tracking-widest">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/features" className="hover:text-[#f5f3ee] transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-[#f5f3ee] transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/anonymous-feedback" className="hover:text-[#f5f3ee] transition-colors">
                  Anonymous feedback
                </Link>
              </li>
              <li>
                <Link href="/meeting-notes" className="hover:text-[#f5f3ee] transition-colors">
                  Meetings
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-[#f5f3ee] transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Links: Company & Legal */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-[#f5f3ee] uppercase tracking-widest">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-[#f5f3ee] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#f5f3ee] transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#f5f3ee] transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#f5f3ee] transition-colors">
                  Workplace thoughts
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6f6f6a] gap-4">
          <p>© {new Date().getFullYear()} FeedbackFlow. Say what needs to be said.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[#9a9a95] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#9a9a95] transition-colors">Terms</Link>
            <Link href="/app" className="hover:text-[#d8ff3e] transition-colors">Open Workspace</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default MarketingFooter;
