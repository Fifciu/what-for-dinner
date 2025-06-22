'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { useSupabase } from "./useSupabase";

// Create a context for the user
const UserContext = createContext<{
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  refreshUser: () => Promise<void>;
}>({
  user: null,
  isLoading: true,
  error: null,
  refreshUser: async () => {},
});

// Provider component that wraps your app and makes user object available to any child component
export function UserProvider({ 
  children,
  requireAuth = false,
  redirectTo = "/auth/login"
}: { 
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}) {
  const supabaseClient = useSupabase();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Function to fetch user data
  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabaseClient.auth.getUser();
      
      if (error) {
        throw error;
      }
      
      setUser(data?.user || null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  // Function to refresh user data
  const refreshUser = async () => {
    await fetchUser();
  };

  // Fetch user data on mount
  useEffect(() => {
    fetchUser();

    // Set up auth state change listener
    const setupAuthListener = async () => {
      const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user || null);
        }
      );

      // Cleanup subscription on unmount
      return () => {
        subscription.unsubscribe();
      };
    };

    const unsubscribe = setupAuthListener();
    
    return () => {
      unsubscribe.then(fn => fn && fn());
    };
  }, []);

  // Handle redirect if authentication is required but user is not authenticated
  useEffect(() => {
    if (requireAuth && !isLoading && !user) {
      redirect(redirectTo);
    }
  }, [requireAuth, isLoading, user, redirectTo]);

  const value = {
    user,
    isLoading,
    error,
    refreshUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Hook for child components to get the user object and re-render when it changes
export const useUser = () => {
  const context = useContext(UserContext);
  
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
};
