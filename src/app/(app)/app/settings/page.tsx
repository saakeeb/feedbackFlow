'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import supabase from '@/lib/supabase/client';
import toast from 'react-hot-toast';
import { User, Bell, Shield, LogOut } from 'lucide-react';

export default function SettingsPage() {
  const { user, signOut } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [isSaving, setIsSaving] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [anonymousReminder, setAnonymousReminder] = useState(true);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setIsSaving(true);
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName.trim(),
          updated_at: new Date().toISOString(),
        } as any)
        .eq('id', user.id);

      if (error) throw error;
      toast.success('Profile changes saved.');
    } catch {
      toast.error('Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Account & Workspace Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your personal details, privacy defaults, and notification preferences.
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4 text-slate-500" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Your public identity when you submit named responses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <Input
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
              />

              <Input
                label="Work Email"
                value={user?.email || ''}
                disabled
                helperText="Email is managed via authentication credentials and cannot be changed here."
              />

              <div className="flex justify-end pt-2">
                <Button type="submit" size="sm" isLoading={isSaving}>
                  Save changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Privacy & Anonymity Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4 text-slate-500" />
              Privacy & Anonymity Defaults
            </CardTitle>
            <CardDescription>
              Configure how feedback submission safeguards are presented to you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={anonymousReminder}
                onChange={(e) => setAnonymousReminder(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
              />
              <div className="text-xs">
                <span className="font-medium text-slate-900 block">
                  Show explicit anonymity indicators on forms
                </span>
                <span className="text-slate-500 block">
                  Displays whether your feedback is tagged anonymously or linked to your account before submission.
                </span>
              </div>
            </label>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-4 w-4 text-slate-500" />
              Notification Settings
            </CardTitle>
            <CardDescription>
              Choose when FeedbackFlow notifies you about team discussions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
              />
              <div className="text-xs">
                <span className="font-medium text-slate-900 block">
                  Email summaries of new topic responses
                </span>
                <span className="text-slate-500 block">
                  Receive a consolidated daily digest when colleagues comment on your feedback topics.
                </span>
              </div>
            </label>
          </CardContent>
        </Card>

        {/* Danger / Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base text-red-600 flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Session & Sign Out
            </CardTitle>
            <CardDescription>
              End your active session on this device.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              size="sm"
              onClick={() => signOut()}
              className="text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200"
            >
              Sign out of FeedbackFlow
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
