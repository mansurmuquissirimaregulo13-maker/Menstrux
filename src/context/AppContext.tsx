import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../utils/supabase';

export type UserProfile = {
  id: string;
  name?: string;
  email?: string;
  weight?: number;
  lastPeriodStart?: string;
  periodLength?: number;
  cycleLength?: number;
  goal?: string;
  birthYear?: number;
  // Database fields (for direct mapping from Supabase)
  last_period_start?: string;
  period_length?: number;
  cycle_length?: number;
  birth_year?: number;
};

type AppContextType = {
  user: UserProfile | null;
  isLoading: boolean;
  isOnboarded: boolean;
  completeOnboarding: (data: Partial<UserProfile>) => Promise<void>;
  logout: () => Promise<void>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      let userId = session?.user?.id;
      
      if (!session) {
        // Try anonymous sign-in, but handle failure if it's disabled in Dashboard
        try {
          const { data, error } = await supabase.auth.signInAnonymously();
          if (!error) {
            userId = data.user?.id;
          }
        } catch (e) {
          console.warn('Anonymous sign-in not available');
        }
      }

      if (userId) {
        // Fetch profile
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', userId).single();
        if (profile) {
          setUser(profile);
          setIsOnboarded(!!profile.last_period_start);
        } else {
          // Profile not created yet
          setUser({ id: userId });
          setIsOnboarded(false);
        }
      } else {
        setUser(null);
        setIsOnboarded(false);
      }
    } catch (error) {
      console.error('Error checking user session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async (data: Partial<UserProfile>) => {
    if (!user?.id) return;
    
    try {
      const profileData = {
        id: user.id,
        weight: data.weight,
        last_period_start: data.lastPeriodStart,
        period_length: data.periodLength,
        cycle_length: data.cycleLength,
        goal: data.goal,
        birth_year: data.birthYear
      };

      const { error } = await supabase.from('profiles').upsert(profileData);
      
      if (error) throw error;
      
      setUser({ ...user, ...data });
      setIsOnboarded(true);
    } catch (error) {
      console.error('Error saving onboarding data:', error);
      throw error;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsOnboarded(false);
    checkUser(); // Re-trigger anonymous sign in
  };

  return (
    <AppContext.Provider value={{ user, isLoading, isOnboarded, completeOnboarding, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
