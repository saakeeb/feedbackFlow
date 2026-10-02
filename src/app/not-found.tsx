import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="max-w-md w-full text-center space-y-4 rounded-lg border border-slate-200 bg-white p-8 shadow-subtle">
        <div className="h-10 w-10 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-semibold text-sm">
          404
        </div>
        <h1 className="text-xl font-bold text-slate-900">Page not found</h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          The page you are looking for might have been moved, renamed, or is temporarily unavailable.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link href="/app">
            <Button size="sm" className="gap-2">
              <Home className="h-4 w-4" />
              Go to Workspace
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
