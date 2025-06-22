'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { useSupabase } from "./useSupabase";
import { useUser } from "./useUser";

export type CreateHouseholdDTO = Pick<Household, 'name' | 'city'>;

export type Household = {
  id: number,
  name: string,
  city: string,
  owner_id: string,
  created_at: string
};

// Create a context for the user
const HouseholdsContext = createContext<{
  households: Household[] | null;
  isLoading: boolean;
  error: Error | null;
  addHousehold: (params: CreateHouseholdDTO) => Promise<void>;
  isAdding: boolean
}>({
  households: null,
  isLoading: true,
  error: null,
  addHousehold: async () => {
    console.log('aha')
  },
  isAdding: false,
});

// Provider component that wraps your app and makes user object available to any child component
export function HouesholdsProvider({ 
  children,
}: { 
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}) {
  const supabaseClient = useSupabase();
  const { user } = useUser();
  const [households, setHouseholds] = useState<Household[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Function to fetch user data
  const fetchHouseholds = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabaseClient.from('households').select()
      console.log(data, error);
      
      if (error) {
        throw error;
      }
      setHouseholds(data);
    } catch (err) {
      console.log(err)
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  const addHousehold = async(params: CreateHouseholdDTO) => {
    try {
      console.log('A')
      setError(null);
      setIsAdding(true);
      console.log('B')
      if (!user?.id) {
        throw new Error("Broken session. Sign in again")
      }
      console.log('C')
      const { data, error } = await supabaseClient
        .from('households')
        .insert({
          ...params,
          owner_id: user.id
        })
        .select()
      console.log('D')
      console.log(data, error);
      
      if (error) {
        throw error;
      }
      setHouseholds([
        ...(households || []),
        ...data
      ]);
    } catch (err) {
      console.log(err)
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setIsAdding(false);
    }
  }

  // Fetch user data on mount
  useEffect(() => {
    fetchHouseholds();
  }, []);

  const value = {
    households,
    isLoading,
    error,
    addHousehold,
    isAdding
  };

  return (
    <HouseholdsContext.Provider value={value}>
      {children}
    </HouseholdsContext.Provider>
  );
}

// Hook for child components to get the user object and re-render when it changes
export const useHouseholds = () => {
  const context = useContext(HouseholdsContext);
  
  if (context === undefined) {
    throw new Error('useHouseholds must be used within a UserProvider');
  }
  
  return context;
};
