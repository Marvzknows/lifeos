"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { AuthUser } from "@/lib/api/services/auth.services";
import { authKeys, useMe } from "@/lib/api/services/hooks/auth.hooks";

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  refetchUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const { data, isLoading, refetch } = useMe();
  const lastUserId = useRef<string | null>(null);

  useEffect(() => {
    lastUserId.current = data?.user?.id ?? null;
  }, [data?.user?.id]);

  useEffect(() => {
    const supabase = createClient();
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          lastUserId.current = null;
          queryClient.setQueryData(authKeys.me, { user: null });
          return;
        }

        if (event === "SIGNED_IN") {
          const newUserId = session?.user?.id ?? null;

          // Supabase re-emits SIGNED_IN on tab refocus even when the
          // session hasn't actually changed. Only refetch if the
          // authenticated user is actually different.
          if (newUserId !== lastUserId.current) {
            queryClient.invalidateQueries({ queryKey: authKeys.me });
          }
          return;
        }

        // TOKEN_REFRESHED, etc. — no action needed
      },
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, [queryClient]);

  const refetchUser = async () => {
    await refetch();
  };

  return (
    <AuthContext.Provider
      value={{ user: data?.user ?? null, isLoading, refetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
