import React, { useEffect } from 'react';
import { useAuth } from '../services/auth-service';
import { router } from 'expo-router';

export const AuthPage: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { token, loading } = useAuth();

  useEffect(() => {
    if (!loading && token) {
      router.navigate('/(tabs)/profile');
    }
  }, [token, loading]);

  if (loading) return null;

  if (token) return null;

  return <>{children}</>;
};
