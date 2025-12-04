import React, { useEffect } from 'react';
import { useAuth } from '../services/auth-service';
import { router } from 'expo-router';
import { View } from 'react-native';

export const ProtectedPage: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { token, loading } = useAuth();

  useEffect(() => {
    if (!loading && !token) {
      router.replace('/(index)/login');
    }
  }, [token, loading]);

  if (loading || !token) return <View />;

  return <View style={{ flex: 1 }}>{children}</View>;
};
