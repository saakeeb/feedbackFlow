import {
  createContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { AuthContextType, User } from "../types";
import supabase from "../lib/supabase";
import toast from "react-hot-toast";

const resetPasswordRedirectUrl = `${
  import.meta.env.VITE_HOSTNAME
}/reset-password`;

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isAuthenticated = useMemo(() => !!user, [user]);

  const getUserAnalytics = () => {
    return {
      ip_address: null, // Will be captured by Supabase
      browser: navigator.userAgent,
      operating_system: navigator.platform,
      device_type: /Mobile|Tablet|iPad|iPhone|Android/.test(navigator.userAgent)
        ? "mobile"
        : "desktop",
      referrer: document.referrer,
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      pages_visited: [window.location.pathname],
      time_of_visit: new Date().toISOString(),
      time_spent: 0, // Will be updated during session
    };
  };

  const createProfile = useCallback(
    async (userId: string, email: string, fullName?: string) => {
      try {
        const analytics = getUserAnalytics();

        const { error: profileError } = await supabase.from("profiles").insert({
          id: userId,
          full_name: fullName || email.split("@")[0],
          email,
          ...analytics,
        });

        if (profileError) throw profileError;

        return await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();
      } catch (error) {
        console.error("Error creating profile:", error);
        throw error;
      }
    },
    []
  );

  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        try {
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (!profile || error) {
            const { data: newProfile } = await createProfile(
              session.user.id,
              session.user.email || "",
              session.user.user_metadata?.full_name
            );

            setUser({
              id: session.user.id,
              email: session.user.email || "",
              fullName: newProfile?.full_name || undefined,
              avatarUrl: newProfile?.avatar_url || undefined,
            });
          } else {
            setUser({
              id: session.user.id,
              email: session.user.email || "",
              fullName: profile.full_name || undefined,
              avatarUrl: profile.avatar_url || undefined,
            });
          }
        } catch (error) {
          console.error("Error handling profile:", error);
          setUser({
            id: session.user.id,
            email: session.user.email || "",
          });
          toast.error("Error loading profile data");
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [createProfile]);

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
          try {
            const { data: profile, error: profileError } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", data.user.id)
              .single();

            if (!profile || profileError) {
              const { data: newProfile } = await createProfile(
                data.user.id,
                data.user.email || "",
                data.user.user_metadata?.full_name
              );

              setUser({
                id: data.user.id,
                email: data.user.email || "",
                fullName: newProfile?.full_name || undefined,
                avatarUrl: newProfile?.avatar_url || undefined,
              });
            } else {
              setUser({
                id: data.user.id,
                email: data.user.email || "",
                fullName: profile.full_name || undefined,
                avatarUrl: profile.avatar_url || undefined,
              });
            }
          } catch (error) {
            console.error("Error handling profile during sign in:", error);
            setUser({
              id: data.user.id,
              email: data.user.email || "",
            });
            toast.error("Error loading profile data");
          }

          toast.success("Successfully signed in!");
        }
      } catch (error) {
        console.error("Error signing in:", error);
        toast.error("Failed to sign in. Please check your credentials.");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [createProfile]
  );

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error("Failed to sign in with Google");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithFacebook = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error signing in with Facebook:", error);
      toast.error("Failed to sign in with Facebook");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

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
            emailRedirectTo: `${window.location.origin}/verify`,
          },
        });

        if (error) throw error;

        if (data.user) {
          try {
            const { data: profile } = await createProfile(
              data.user.id,
              email,
              fullName
            );

            setUser({
              id: data.user.id,
              email: data.user.email || "",
              fullName: profile?.full_name || fullName,
              avatarUrl: profile?.avatar_url,
            });

            toast.success("Please check your email to verify your account!");
          } catch (error) {
            console.error("Error creating profile during signup:", error);
            setUser({
              id: data.user.id,
              email: data.user.email || "",
              fullName,
            });
            toast.error("Error creating profile");
          }
        }
      } catch (error) {
        console.error("Error signing up:", error);
        toast.error("Failed to create account");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [createProfile]
  );

  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: resetPasswordRedirectUrl,
      });
      if (error) throw error;

      toast.success("Password reset link sent to your email!");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to send reset password link";
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      setUser(null);
      toast.success("Successfully signed out");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue = useMemo(
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
    [user, isAuthenticated, isLoading, checkAuth, signIn, signUp]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
