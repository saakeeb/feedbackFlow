'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/use-auth';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      await resetPassword(email);
      setSubmitted(true);
    } catch {
      // toast in useAuth handles error notification
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1 text-center">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          Reset your password
        </h1>
        <p className="text-xs text-slate-500">
          We will send a password reset link to your email address.
        </p>
      </div>

      {submitted ? (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-center space-y-2">
          <CheckCircle2 className="h-6 w-6 text-emerald-600 mx-auto" />
          <p className="text-xs text-emerald-800 font-medium">
            Reset email sent! Please check your inbox and click the link to proceed.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Work Email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button type="submit" size="md" className="w-full" isLoading={isLoading}>
            Send reset link
          </Button>
        </form>
      )}

      <div className="text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
