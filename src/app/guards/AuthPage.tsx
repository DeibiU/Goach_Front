import React, { useEffect } from 'react';
import { useAuth } from '../services/auth-service';
import { router } from 'expo-router';
import { View } from 'react-native';

export const AuthPage: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { token, loading } = useAuth();

  useEffect(() => {
    if (!loading && token) {
      router.replace('/(tabs)/profile');
    }
  }, [token, loading]);

  if (loading) return <View />;

  return <View style={{ flex: 1 }}>{!token ? children : null}</View>;
};
