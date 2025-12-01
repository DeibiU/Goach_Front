import React, { useEffect } from 'react';
import { useAuth } from '../services/auth-service';
import { router } from 'expo-router';

export const ProtectedPage: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { token, loading } = useAuth();

  useEffect(() => {
    if (!loading && !token) {
      router.navigate('/(index)/login');
    }
  }, [token, loading]);

  if (loading || !token) return null;

  return <>{children}</>; 
};
