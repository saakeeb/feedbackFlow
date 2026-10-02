import React from 'react';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50/70">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 font-semibold text-slate-900 tracking-tight text-lg"
        >
          <div className="h-7 w-7 rounded bg-slate-900 flex items-center justify-center text-white text-sm font-bold">
            F
          </div>
          <span>FeedbackFlow</span>
        </Link>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="rounded-lg border border-slate-200 bg-white p-6 sm:p-8 shadow-subtle">
          {children}
        </div>
      </div>
    </div>
  );
}
