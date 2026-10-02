'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { User, AuthContextType } from '@/types/common';
import supabase from '@/lib/supabase/client';
import toast from 'react-hot-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isAuthenticated = useMemo(() => !!user, [user]);

  const loadUserProfile = useCallback(async (userId: string, email: string, defaultName?: string) => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profile) {
        const raw = profile as any;
        setUser({
          id: userId,
          email,
          fullName: raw.full_name || defaultName || email.split('@')[0],
          avatarUrl: raw.avatar_url || null,
        });
      } else {
        // Create initial profile
        await supabase.from('profiles').insert([
          {
            id: userId,
            full_name: defaultName || email.split('@')[0],
            email,
          },
        ] as any);
        setUser({
          id: userId,
          email,
          fullName: defaultName || email.split('@')[0],
        });
      }
    } catch {
      setUser({
        id: userId,
        email,
        fullName: defaultName || email.split('@')[0],
      });
    }
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        await loadUserProfile(
          session.user.id,
          session.user.email || '',
          session.user.user_metadata?.full_name
        );
      } else {
        setUser(null);
      }
    } catch (e) {
      console.error('checkAuth error:', e);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [loadUserProfile]);

  useEffect(() => {
    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await loadUserProfile(
          session.user.id,
          session.user.email || '',
          session.user.user_metadata?.full_name
        );
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [checkAuth, loadUserProfile]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          await loadUserProfile(
            data.user.id,
            data.user.email || email,
            data.user.user_metadata?.full_name
          );
          toast.success('Signed in successfully.');
        }
      } catch (err: unknown) {
        const error = err as Error;
        toast.error(error.message || 'Could not sign in with provided credentials.');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [loadUserProfile]
  );

  const signInWithGoogle = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/app` : undefined,
        },
      });
      if (error) throw error;
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || 'Google sign in failed');
      throw err;
    }
  }, []);

  const signInWithFacebook = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/app` : undefined,
        },
      });
      if (error) throw error;
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || 'Facebook sign in failed');
      throw err;
    }
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, fullName: string) => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

        if (error) throw error;

        if (data.user) {
          toast.success('Account created. Please check your email to verify.');
        }
      } catch (err: unknown) {
        const error = err as Error;
        toast.error(error.message || 'Sign up failed');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const signOut = useCallback(async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      toast.success('Signed out.');
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || 'Error signing out');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo:
          typeof window !== 'undefined'
            ? `${window.location.origin}/reset-password`
            : undefined,
      });
      if (error) throw error;
      toast.success('Password reset link sent to your email.');
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || 'Failed to send reset link');
      throw err;
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      isLoading,
      signIn,
      signInWithGoogle,
      signInWithFacebook,
      signUp,
      signOut,
      checkAuth,
      resetPassword,
    }),
    [
      user,
      isAuthenticated,
      isLoading,
      signIn,
      signInWithGoogle,
      signInWithFacebook,
      signUp,
      signOut,
      checkAuth,
      resetPassword,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthProvider;
