import { useEffect } from 'react';
import { useAppDispatch } from '../app/store';
import { setUser, checkAuth } from '../features/auth/authSlice';
import { supabase } from '../lib/supabase';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      (() => {
        dispatch(setUser(session?.user ?? null));
      })();
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [dispatch]);

  return <>{children}</>;
}
