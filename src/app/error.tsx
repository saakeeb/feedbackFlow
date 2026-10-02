'use client';

import React, { useEffect } from 'react';
import Button from '@/components/ui/Button';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Next.js route error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-4 rounded-lg border border-slate-200 bg-white p-8 shadow-subtle">
        <div className="h-10 w-10 mx-auto rounded-full bg-red-50 flex items-center justify-center text-red-600">
          <AlertCircle className="h-5 w-5" />
        </div>
        <h1 className="text-xl font-bold text-slate-900">
          Something went wrong
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          We encountered an unexpected issue loading this section. Your data is safe.
        </p>
        <div className="pt-2 flex justify-center">
          <Button onClick={() => reset()} size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
